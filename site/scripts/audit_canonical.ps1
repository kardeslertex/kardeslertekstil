param([switch]$Quiet, [switch]$Live)

$ErrorActionPreference = 'Stop'
$siteRoot = Split-Path $PSScriptRoot -Parent
$origin = 'https://kardeslertekstil.com.tr'
$errors = [System.Collections.Generic.List[string]]::new()
$indexableCount = 0
$redirectCount = 0

[xml]$sitemapXml = Get-Content -LiteralPath (Join-Path $siteRoot 'sitemap.xml') -Raw
$sitemapUrls = @($sitemapXml.urlset.url | ForEach-Object { [string]$_.loc })
$sitemapSet = @{}
foreach ($url in $sitemapUrls) { $sitemapSet[$url] = $true }

$htmlFiles = Get-ChildItem -LiteralPath $siteRoot -Filter '*.html' -File -Recurse | Where-Object {
    $_.FullName -notlike "$(Join-Path $siteRoot 'hero-archive')*"
}

foreach ($file in $htmlFiles) {
    $html = Get-Content -LiteralPath $file.FullName -Raw
    $relative = $file.FullName.Substring($siteRoot.Length).TrimStart('\').Replace('\', '/')
    $canonicalMatches = [regex]::Matches($html, '<link\s+[^>]*rel=["'']canonical["''][^>]*href=["'']([^"'']+)["''][^>]*>', 'IgnoreCase')
    $isNoIndex = $html -match '<meta\s+[^>]*name=["'']robots["''][^>]*content=["''][^"'']*noindex'
    $refreshMatch = [regex]::Match($html, '<meta\s+[^>]*http-equiv=["'']refresh["''][^>]*content=["''][^"'']*url=([^"'']+)', 'IgnoreCase')

    if ($refreshMatch.Success) {
        $redirectCount++
        if ($canonicalMatches.Count -ne 1) {
            $errors.Add("Redirect must have one canonical: $relative")
            continue
        }
        $target = $refreshMatch.Groups[1].Value.Trim()
        if ($canonicalMatches[0].Groups[1].Value -ne $target) {
            $errors.Add("Redirect canonical differs from target: $relative")
        }
        continue
    }

    if ($isNoIndex) { continue }
    $indexableCount++
    if ($canonicalMatches.Count -ne 1) {
        $errors.Add("Indexable page must have one canonical: $relative")
        continue
    }

    $canonical = $canonicalMatches[0].Groups[1].Value
    $expectedPath = if ($relative -eq 'index.html') { '/' } elseif ($relative.EndsWith('/index.html')) { '/' + $relative.Substring(0, $relative.Length - 10) } else { '/' + $relative.Substring(0, $relative.Length - 5) }
    $expected = $origin + $expectedPath

    if ($canonical -ne $expected) { $errors.Add("Canonical is not self-referencing: $relative -> $canonical") }
    if ($canonical -notmatch '^https://kardeslertekstil\.com\.tr/' -or $canonical -match '[?#]') {
        $errors.Add("Canonical host or format is invalid: $relative -> $canonical")
    }
    if (-not $sitemapSet.ContainsKey($canonical)) { $errors.Add("Canonical is absent from sitemap: $relative") }

    $ogMatch = [regex]::Match($html, '<meta\s+[^>]*property=["'']og:url["''][^>]*content=["'']([^"'']+)', 'IgnoreCase')
    if (!$ogMatch.Success) { $ogMatch = [regex]::Match($html, '<meta\s+[^>]*content=["'']([^"'']+)["''][^>]*property=["'']og:url["'']', 'IgnoreCase') }
    if (!$ogMatch.Success -or [Net.WebUtility]::HtmlDecode($ogMatch.Groups[1].Value) -ne $canonical) { $errors.Add("OG URL differs from canonical: $relative") }

    foreach ($jsonMatch in [regex]::Matches($html, '(?is)<script[^>]+type=["'']application/ld\+json["''][^>]*>(.*?)</script>')) {
        try {
            $data = $jsonMatch.Groups[1].Value | ConvertFrom-Json
            $items = if ($data.'@graph') { @($data.'@graph') } else { @($data) }
            foreach ($item in $items) {
                if ($item.'@type' -eq 'BreadcrumbList' -and $item.itemListElement.Count) {
                    $lastItem = @($item.itemListElement | Sort-Object position)[-1]
                    $breadcrumbUrl = if ($lastItem.item -is [string]) { $lastItem.item } elseif ($lastItem.item.'@id') { $lastItem.item.'@id' } else { '' }
                    if ($breadcrumbUrl -and $breadcrumbUrl -ne $canonical) { $errors.Add("Breadcrumb URL differs from canonical: $relative") }
                }
            }
        } catch { $errors.Add("Invalid JSON-LD while checking canonical: $relative") }
    }
}

& (Join-Path $PSScriptRoot 'audit_redirects.ps1') -Quiet -Live:$Live
if (!$?) { $errors.Add('Redirect audit failed') }

$liveParameterChecks = 0
if ($Live) {
    $parameterCases = [ordered]@{
        'https://kardeslertekstil.com.tr/urunlerimiz?q=polar&kategori=polar' = 'https://kardeslertekstil.com.tr/urunlerimiz'
        'https://kardeslertekstil.com.tr/bilgi-merkezi/?q=kumas&tag=dayanim' = 'https://kardeslertekstil.com.tr/bilgi-merkezi/'
        'https://kardeslertekstil.com.tr/iletisim?urun=KT-TEST&adet=50&mesaj=teklif' = 'https://kardeslertekstil.com.tr/iletisim'
    }
    foreach ($requestUrl in $parameterCases.Keys) {
        $body = (& curl.exe -sS --max-time 30 $requestUrl) -join "`n"
        $match = [regex]::Match($body, '<link[^>]+rel=["'']canonical["''][^>]+href=["'']([^"'']+)', 'IgnoreCase')
        if (!$match.Success) { $match = [regex]::Match($body, '<link[^>]+href=["'']([^"'']+)["''][^>]+rel=["'']canonical["'']', 'IgnoreCase') }
        if (!$match.Success -or [Net.WebUtility]::HtmlDecode($match.Groups[1].Value) -ne $parameterCases[$requestUrl]) {
            $errors.Add("Live parameter canonical mismatch: $requestUrl")
        }
        $liveParameterChecks++
    }
}

$result = [ordered]@{
    indexablePages = $indexableCount
    redirectPages = $redirectCount
    sitemapUrls = $sitemapUrls.Count
    liveParameterChecks = $liveParameterChecks
    errors = @($errors)
}
if (-not $Quiet) {
    'CANONICAL_AUDIT'
    $result | ConvertTo-Json -Depth 4
}
if ($errors.Count -gt 0) { exit 1 }
