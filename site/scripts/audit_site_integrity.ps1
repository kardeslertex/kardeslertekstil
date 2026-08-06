$ErrorActionPreference = 'Stop'
$site = Split-Path -Parent $PSScriptRoot
$origin = 'https://kardeslertekstil.com.tr'

function Test-SiteTarget([string]$urlPath) {
  $decoded = [Uri]::UnescapeDataString($urlPath).TrimStart('/').TrimEnd('/')
  if (!$decoded) { return Test-Path (Join-Path $site 'index.html') }
  $direct = Join-Path $site ($decoded -replace '/', [IO.Path]::DirectorySeparatorChar)
  return (Test-Path $direct) -or (Test-Path "$direct.html") -or (Test-Path (Join-Path $direct 'index.html'))
}

$sitemapText = [IO.File]::ReadAllText((Join-Path $site 'sitemap.xml'), [Text.Encoding]::UTF8)
$sitemapUrls = [Collections.Generic.HashSet[string]]::new([StringComparer]::OrdinalIgnoreCase)
foreach ($match in [regex]::Matches($sitemapText, '<loc>([^<]+)</loc>')) { [void]$sitemapUrls.Add($match.Groups[1].Value) }

$canonicals = [Collections.Generic.HashSet[string]]::new([StringComparer]::OrdinalIgnoreCase)
$brokenLinks = [Collections.Generic.HashSet[string]]::new([StringComparer]::OrdinalIgnoreCase)
$missingSiteJs = [Collections.Generic.List[string]]::new()
$pageMetadataErrors = [Collections.Generic.List[string]]::new()
$invalidLegacyRedirects = [Collections.Generic.List[string]]::new()
$legacyRedirectCount = 0
$incomingLinks = @{}
$allHtmlFiles = Get-ChildItem $site -Recurse -File -Filter '*.html'
$htmlFiles = @($allHtmlFiles | Where-Object {
  $relativePath = $_.FullName.Substring($site.Length + 1)
  !$relativePath.StartsWith('hero-archive\', [StringComparison]::OrdinalIgnoreCase)
})

foreach ($file in $htmlFiles) {
  $html = [IO.File]::ReadAllText($file.FullName, [Text.Encoding]::UTF8)
  $relativePath = $file.FullName.Substring($site.Length + 1)
  $canonicalMatch = [regex]::Match($html, '<link[^>]+rel=["'']canonical["''][^>]+href=["'']([^"'']+)', 'IgnoreCase')
  if (!$canonicalMatch.Success) { $canonicalMatch = [regex]::Match($html, '<link[^>]+href=["'']([^"'']+)["''][^>]+rel=["'']canonical["'']', 'IgnoreCase') }
  $canonical = if ($canonicalMatch.Success) { $canonicalMatch.Groups[1].Value } else { '' }
  $noindex = [regex]::IsMatch($html, '<meta[^>]+name=["'']robots["''][^>]+content=["''][^"'']*noindex', 'IgnoreCase')

  $refreshMatch = [regex]::Match($html, '<meta[^>]+http-equiv=["'']refresh["''][^>]+content=["''][^"'']*url=([^"'']+)', 'IgnoreCase')
  if ($refreshMatch.Success) {
    $legacyRedirectCount++
    try {
      $sourceUrl = if ($canonical) { [Uri]$canonical } else { [Uri]"$origin/" }
      $redirectTarget = [Uri]::new($sourceUrl, $refreshMatch.Groups[1].Value)
      if ($redirectTarget.Host -notmatch '^(www\.)?kardeslertekstil\.com\.tr$' -or !(Test-SiteTarget $redirectTarget.AbsolutePath)) {
        $invalidLegacyRedirects.Add("$relativePath -> $($refreshMatch.Groups[1].Value)")
      }
    } catch {
      $invalidLegacyRedirects.Add("$relativePath -> $($refreshMatch.Groups[1].Value)")
    }
    continue
  }

  if (!$noindex) {
    if (![regex]::IsMatch($html, '<title>\s*[^<]+\s*</title>', 'IgnoreCase')) { $pageMetadataErrors.Add("$relativePath -> missing title") }
    if (![regex]::IsMatch($html, '<meta[^>]+name=["'']description["'']', 'IgnoreCase')) { $pageMetadataErrors.Add("$relativePath -> missing description") }
    if (!$canonical) { $pageMetadataErrors.Add("$relativePath -> missing canonical") }
    if (![regex]::IsMatch($html, '<h1\b', 'IgnoreCase')) { $pageMetadataErrors.Add("$relativePath -> missing h1") }
  }
  if ($canonical -and !$noindex) { [void]$canonicals.Add($canonical) }
  if (!$noindex -and ![regex]::IsMatch($html, '<script[^>]+src=["''][^"'']*site\.js(?:\?[^"'']*)?["'']', 'IgnoreCase')) {
    $missingSiteJs.Add($relativePath)
  }

  $baseUrl = if ($canonical) { [Uri]$canonical } else { [Uri]"$origin/" }
  foreach ($match in [regex]::Matches($html, '<a\b[^>]*href=["'']([^"'']+)["'']', 'IgnoreCase')) {
    $href = $match.Groups[1].Value.Trim()
    if (!$href -or $href -match '^(#|mailto:|tel:|javascript:)') { continue }
    try { $target = [Uri]::new($baseUrl, $href) } catch { continue }
    if ($target.Host -notmatch '^(www\.)?kardeslertekstil\.com\.tr$') { continue }
    if (!(Test-SiteTarget $target.AbsolutePath)) {
      [void]$brokenLinks.Add("$relativePath -> $href")
    } else {
      $targetPath = if ($target.AbsolutePath -eq '/') { '/' } else { $target.AbsolutePath.TrimEnd('/') }
      if (!$incomingLinks.ContainsKey($targetPath)) { $incomingLinks[$targetPath] = 0 }
      $incomingLinks[$targetPath]++
    }
  }
}

# Bilgi Merkezi ve katalog kartları JavaScript ile oluşturulur. Bu kartların
# ürettiği gerçek site içi bağlantıları da gelen bağlantı hesabına dahil et.
$knowledgeScript = [IO.File]::ReadAllText((Join-Path $site 'bilgi-merkezi\knowledge-center.js'), [Text.Encoding]::UTF8)
foreach ($match in [regex]::Matches($knowledgeScript, '(?:["'']?slug["'']?\s*:\s*["''])([^"'']+)')) {
  $renderedPath = "/bilgi-merkezi/$($match.Groups[1].Value)"
  if (!$incomingLinks.ContainsKey($renderedPath)) { $incomingLinks[$renderedPath] = 0 }
  $incomingLinks[$renderedPath]++
}
$catalogScript = [IO.File]::ReadAllText((Join-Path $site 'catalog.js'), [Text.Encoding]::UTF8)
$seoPagesBlock = [regex]::Match($catalogScript, 'var\s+seoPages\s*=\s*\{(?<body>.*?)\};', 'Singleline').Groups['body'].Value
foreach ($match in [regex]::Matches($seoPagesBlock, ':\s*["'']([^"'']+?)/["'']')) {
  $renderedPath = "/$($match.Groups[1].Value)"
  if (!$incomingLinks.ContainsKey($renderedPath)) { $incomingLinks[$renderedPath] = 0 }
  $incomingLinks[$renderedPath]++
}

$missingInSitemap = @($canonicals | Where-Object { !$sitemapUrls.Contains($_) })
$invalidSitemapUrls = @($sitemapUrls | Where-Object { try { !(Test-SiteTarget ([Uri]$_).AbsolutePath) } catch { $true } })
$orphanCanonicals = @($canonicals | Where-Object {
  $canonicalPath = ([Uri]$_).AbsolutePath
  if ($canonicalPath -ne '/') { $canonicalPath = $canonicalPath.TrimEnd('/') }
  !$incomingLinks.ContainsKey($canonicalPath)
})
$siteScript = [IO.File]::ReadAllText((Join-Path $site 'site.js'), [Text.Encoding]::UTF8)
$contactHtml = [IO.File]::ReadAllText((Join-Path $site 'iletisim.html'), [Text.Encoding]::UTF8)
$successHtml = [IO.File]::ReadAllText((Join-Path $site 'tesekkur.html'), [Text.Encoding]::UTF8)
$analyticsChecks = [ordered]@{
  measurementId = $siteScript.Contains('G-6LMDSV9GBZ')
  whatsappEvent = $siteScript.Contains('whatsapp_click')
  emailEvent = $siteScript.Contains('email_channel_selected')
  quoteSubmitEvent = $siteScript.Contains('quote_form_submit')
  leadEvent = $siteScript.Contains('generate_lead')
  successMarker = $successHtml.Contains('data-conversion="quote-success"')
  formSuccessRedirect = $contactHtml.Contains('name="_next" value="https://kardeslertekstil.com.tr/tesekkur.html"')
}
$failedAnalyticsChecks = @($analyticsChecks.GetEnumerator() | Where-Object { !$_.Value } | ForEach-Object { $_.Key })
$result = [ordered]@{
  scannedPublicHtmlFiles = $htmlFiles.Count
  excludedArchiveHtmlFiles = $allHtmlFiles.Count - $htmlFiles.Count
  legacyRedirects = $legacyRedirectCount
  indexableCanonicals = $canonicals.Count
  sitemapUrls = $sitemapUrls.Count
  missingInSitemap = $missingInSitemap
  invalidSitemapUrls = $invalidSitemapUrls
  invalidLegacyRedirects = @($invalidLegacyRedirects)
  pageMetadataErrors = @($pageMetadataErrors)
  brokenLinks = @($brokenLinks)
  orphanCanonicals = $orphanCanonicals
  missingSiteJs = @($missingSiteJs)
  analyticsChecks = $analyticsChecks
}
$result | ConvertTo-Json -Depth 4
if ($missingInSitemap.Count -or $invalidSitemapUrls.Count -or $invalidLegacyRedirects.Count -or $pageMetadataErrors.Count -or $brokenLinks.Count -or $orphanCanonicals.Count -or $missingSiteJs.Count -or $failedAnalyticsChecks.Count) { exit 1 }

& (Join-Path $PSScriptRoot 'audit_schema.ps1') -Quiet
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

& (Join-Path $PSScriptRoot 'audit_meta.ps1') -Quiet
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

& (Join-Path $PSScriptRoot 'audit_sitemap.ps1') -Quiet
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

& (Join-Path $PSScriptRoot 'audit_robots.ps1') -Quiet
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

& (Join-Path $PSScriptRoot 'audit_canonical.ps1') -Quiet
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

& (Join-Path $PSScriptRoot 'audit_core_web_vitals.ps1') -Quiet
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

& (Join-Path $PSScriptRoot 'audit_content_quality.ps1') -Quiet
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

& (Join-Path $PSScriptRoot 'audit_internal_links.ps1') -Quiet
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
