param([switch]$Quiet, [switch]$Live)

$ErrorActionPreference = 'Stop'
$siteRoot = Split-Path $PSScriptRoot -Parent
$robotsPath = Join-Path $siteRoot 'robots.txt'
$errors = [System.Collections.Generic.List[string]]::new()

if (-not (Test-Path -LiteralPath $robotsPath)) {
    $errors.Add('robots.txt is missing.')
} else {
    $content = Get-Content -LiteralPath $robotsPath -Raw
    $lines = @($content -split "`r?`n" | ForEach-Object { $_.Trim() } | Where-Object { $_ -and -not $_.StartsWith('#') })

    if (@($lines | Where-Object { $_ -ieq 'User-agent: *' }).Count -ne 1) {
        $errors.Add('robots.txt must contain exactly one global user-agent group.')
    }
    if (@($lines | Where-Object { $_ -ieq 'Allow: /' }).Count -lt 1) {
        $errors.Add('The public site root must be crawlable.')
    }

    $expectedSitemap = 'Sitemap: https://kardeslertekstil.com.tr/sitemap.xml'
    if (@($lines | Where-Object { $_ -ieq $expectedSitemap }).Count -ne 1) {
        $errors.Add('The canonical sitemap declaration is missing or duplicated.')
    }

    foreach ($line in $lines | Where-Object { $_ -imatch '^(Allow|Disallow):' }) {
        if ($line -imatch '\.(css|js|webp|avif|png|jpe?g|svg|woff2?)(\$|\?|/|$)') {
            $errors.Add("A render resource appears to be blocked: $line")
        }
    }
}

$workerPath = Join-Path $siteRoot '_worker.js'
$worker = if (Test-Path $workerPath) { Get-Content -LiteralPath $workerPath -Raw } else { '' }
if ($worker -notmatch '\.pages\.dev' -or $worker -notmatch 'PREVIEW_AUTH_TOKEN' -or $worker -notmatch 'status:\s*401') {
    $errors.Add('Preview deployments must fail closed behind authentication.')
}
$requiredParameters = @('q', 'tag', 'kategori', 'urun', 'adet', 'mesaj')
foreach ($parameter in $requiredParameters) {
    if ($worker -notmatch "[`"']$parameter[`"']" -or $worker -notmatch 'X-Robots-Tag[`"'']\s*,\s*[`"'']noindex, follow') {
        $errors.Add("Query parameter must receive an edge noindex header: $parameter")
    }
}

$parameterLinkCount = 0
$fragmentStateLinkCount = 0
foreach ($file in Get-ChildItem -LiteralPath $siteRoot -Filter '*.html' -File -Recurse) {
    $html = Get-Content -LiteralPath $file.FullName -Raw
    foreach ($match in [regex]::Matches($html, 'href=["''](?<href>[^"'']+)["'']', 'IgnoreCase')) {
        $href = [Net.WebUtility]::HtmlDecode($match.Groups['href'].Value)
        $question = $href.IndexOf('?')
        if ($question -lt 0 -or $href -notmatch '\?(?:q|tag|kategori|urun|adet|mesaj)=') { continue }
        $fragment = $href.IndexOf('#')
        if ($fragment -ge 0 -and $fragment -lt $question) { $fragmentStateLinkCount++ }
        else { $parameterLinkCount++ }
    }
}
if ($worker -notmatch 'if\s*\(catalogProductMatch\)\s*headers\.set\(["'']X-Robots-Tag["''],\s*["'']noindex, follow["'']\)') {
    $errors.Add('Catalog modal routes must receive an edge noindex header.')
}

$liveChecks = 0
if ($Live) {
    $targets = @(
        @{ Url='https://kardeslertekstil.com.tr/robots.txt'; Type='text/plain' },
        @{ Url='https://kardeslertekstil.com.tr/sitemap.xml'; Type='xml' },
        @{ Url='https://kardeslertekstil.com.tr/styles.css'; Type='text/css' },
        @{ Url='https://kardeslertekstil.com.tr/site.js'; Type='javascript' },
        @{ Url='https://kardeslertekstil.com.tr/assets/logo-kit-badge.webp'; Type='image/webp' }
    )
    foreach ($target in $targets) {
        $headers = & curl.exe -sS -I -A 'Googlebot' $target.Url
        $status = [regex]::Match(($headers -join "`n"), 'HTTP/\S+\s+(\d{3})').Groups[1].Value
        $type = [regex]::Match(($headers -join "`n"), '(?im)^content-type:\s*([^\r\n]+)').Groups[1].Value
        if ($status -ne '200') { $errors.Add("Live Googlebot request failed: $($target.Url) -> $status") }
        if ($type -notmatch [regex]::Escape($target.Type)) { $errors.Add("Unexpected live content type: $($target.Url) -> $type") }
        $liveChecks++
    }
}

$result = [ordered]@{
    robotsFile = $robotsPath
    noindexQueryParameters = $requiredParameters.Count
    crawlableParameterLinks = $parameterLinkCount
    fragmentStateLinks = $fragmentStateLinkCount
    liveGooglebotChecks = $liveChecks
    errors = @($errors)
}

if (-not $Quiet) {
    'ROBOTS_AUDIT'
    $result | ConvertTo-Json -Depth 4
}

if ($errors.Count -gt 0) { exit 1 }
