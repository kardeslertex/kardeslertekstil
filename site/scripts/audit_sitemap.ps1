param([switch]$Quiet)

$ErrorActionPreference = 'Stop'
$site = Split-Path -Parent $PSScriptRoot
$origin = 'https://kardeslertekstil.com.tr'
$sitemapPath = Join-Path $site 'sitemap.xml'
$errors = [Collections.Generic.List[string]]::new()
$seen = [Collections.Generic.HashSet[string]]::new([StringComparer]::OrdinalIgnoreCase)

function Resolve-PageFile([Uri]$uri) {
  $relative = [Uri]::UnescapeDataString($uri.AbsolutePath).Trim('/')
  if (!$relative) { return Join-Path $site 'index.html' }
  $localPath = $relative -replace '/', [IO.Path]::DirectorySeparatorChar
  $directoryIndex = Join-Path (Join-Path $site $localPath) 'index.html'
  if (Test-Path -LiteralPath $directoryIndex) { return $directoryIndex }
  $htmlFile = Join-Path $site "$localPath.html"
  if (Test-Path -LiteralPath $htmlFile) { return $htmlFile }
  return ''
}

try { [xml]$xml = [IO.File]::ReadAllText($sitemapPath, [Text.Encoding]::UTF8) }
catch { $errors.Add('sitemap.xml -> invalid XML'); $xml = $null }

$urls = if ($xml) { @($xml.urlset.url) } else { @() }
if (!$urls.Count) { $errors.Add('sitemap.xml -> URL list is empty') }
if ($urls.Count -gt 50000) { $errors.Add("sitemap.xml -> URL limit exceeded: $($urls.Count)") }

foreach ($entry in $urls) {
  $location = [string]$entry.loc
  if (!$seen.Add($location)) { $errors.Add("$location -> duplicate URL") }

  try { $uri = [Uri]$location }
  catch { $errors.Add("$location -> invalid URL"); continue }

  if ($uri.Scheme -ne 'https' -or $uri.Host -ne 'kardeslertekstil.com.tr') { $errors.Add("$location -> non-canonical origin") }
  if ($uri.Query -or $uri.Fragment) { $errors.Add("$location -> query or fragment is not allowed") }

  $lastmod = [string]$entry.lastmod
  $parsedDate = [datetime]::MinValue
  if (!$lastmod -or ![datetime]::TryParseExact($lastmod, 'yyyy-MM-dd', [Globalization.CultureInfo]::InvariantCulture, [Globalization.DateTimeStyles]::None, [ref]$parsedDate)) {
    $errors.Add("$location -> invalid lastmod")
  } elseif ($parsedDate.Date -gt [datetime]::UtcNow.Date) {
    $errors.Add("$location -> future lastmod")
  }

  $pageFile = Resolve-PageFile $uri
  if (!$pageFile) { $errors.Add("$location -> page file missing"); continue }
  $html = [IO.File]::ReadAllText($pageFile, [Text.Encoding]::UTF8)
  if ($html -match '(?is)<meta[^>]+name=["'']robots["''][^>]+content=["''][^"'']*noindex') { $errors.Add("$location -> noindex page in sitemap") }
  if ($html -match '(?is)<meta[^>]+http-equiv=["'']refresh') { $errors.Add("$location -> redirect page in sitemap") }

  $canonicalMatch = [regex]::Match($html, '<link[^>]+rel=["'']canonical["''][^>]+href=["'']([^"'']+)', 'IgnoreCase')
  if (!$canonicalMatch.Success) { $canonicalMatch = [regex]::Match($html, '<link[^>]+href=["'']([^"'']+)["''][^>]+rel=["'']canonical["'']', 'IgnoreCase') }
  $canonical = if ($canonicalMatch.Success) { [Net.WebUtility]::HtmlDecode($canonicalMatch.Groups[1].Value) } else { '' }
  if ($canonical -ne $location) { $errors.Add("$location -> canonical mismatch: $canonical") }
}

$result = [ordered]@{
  sitemapUrls = $urls.Count
  uniqueUrls = $seen.Count
  errors = @($errors)
}
if (!$Quiet) { $result | ConvertTo-Json -Depth 3 }
if ($errors.Count) { exit 1 }
