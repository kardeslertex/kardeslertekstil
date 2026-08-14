param(
  [switch]$Write,
  [switch]$Quiet
)

$ErrorActionPreference = 'Stop'
$site = Split-Path -Parent $PSScriptRoot
$sitemapPath = Join-Path $site 'sitemap.xml'
$origin = 'https://kardeslertekstil.com.tr'
$errors = [Collections.Generic.List[string]]::new()

[xml]$currentXml = [IO.File]::ReadAllText($sitemapPath, [Text.Encoding]::UTF8)
$current = [ordered]@{}
foreach ($entry in @($currentXml.urlset.url)) {
  $current[[string]$entry.loc] = [string]$entry.lastmod
}

$generated = [ordered]@{}
$htmlFiles = Get-ChildItem -LiteralPath $site -Filter '*.html' -File -Recurse | Where-Object {
  $_.FullName -notlike "$(Join-Path $site 'hero-archive')*"
}

foreach ($file in $htmlFiles) {
  $html = [IO.File]::ReadAllText($file.FullName, [Text.Encoding]::UTF8)
  if ($html -match '(?is)<meta[^>]+name=["'']robots["''][^>]+content=["''][^"'']*noindex') { continue }
  if ($html -match '(?is)<meta[^>]+http-equiv=["'']refresh') { continue }

  $match = [regex]::Match($html, '<link[^>]+rel=["'']canonical["''][^>]+href=["'']([^"'']+)', 'IgnoreCase')
  if (!$match.Success) { $match = [regex]::Match($html, '<link[^>]+href=["'']([^"'']+)["''][^>]+rel=["'']canonical["'']', 'IgnoreCase') }
  if (!$match.Success) { $errors.Add("$($file.FullName) -> indexable page has no canonical"); continue }
  $url = [Net.WebUtility]::HtmlDecode($match.Groups[1].Value)
  if (!$url.StartsWith("$origin/")) { $errors.Add("$url -> invalid canonical origin"); continue }
  if ($generated.Contains($url)) { $errors.Add("$url -> duplicate canonical source"); continue }

  $dateModified = ''
  foreach ($jsonMatch in [regex]::Matches($html, '(?is)<script[^>]+type=["'']application/ld\+json["''][^>]*>(.*?)</script>')) {
    try {
      $data = $jsonMatch.Groups[1].Value | ConvertFrom-Json
      $items = if ($data.'@graph') { @($data.'@graph') } else { @($data) }
      foreach ($item in $items) {
        if ($item.'@type' -contains 'BlogPosting' -or $item.'@type' -eq 'BlogPosting') {
          if ($item.dateModified -match '^\d{4}-\d{2}-\d{2}$') { $dateModified = [string]$item.dateModified }
        }
      }
    } catch { }
  }
  $lastmod = if ($dateModified) { $dateModified } elseif ($current.Contains($url)) { $current[$url] } else { '' }
  if (!$lastmod) {
    $errors.Add("$url -> new URL needs an explicit meaningful lastmod/dateModified")
    continue
  }
  $generated[$url] = $lastmod
}

foreach ($url in $current.Keys) {
  if (!$generated.Contains($url) -and !$Write) { $errors.Add("$url -> exists in sitemap but not in indexable canonical page source") }
}
foreach ($url in $generated.Keys) {
  if (!$current.Contains($url) -and !$Write) { $errors.Add("$url -> missing from sitemap") }
  elseif ($current.Contains($url) -and $current[$url] -ne $generated[$url] -and !$Write) {
    $errors.Add("$url -> lastmod differs; sitemap=$($current[$url]), source=$($generated[$url])")
  }
}

if ($Write -and !$errors.Count) {
  $builder = [Text.StringBuilder]::new()
  [void]$builder.AppendLine('<?xml version="1.0" encoding="utf-8"?>')
  [void]$builder.AppendLine('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
  foreach ($url in @($generated.Keys | Sort-Object)) {
    $escapedUrl = [Security.SecurityElement]::Escape($url)
    [void]$builder.AppendLine("  <url><loc>$escapedUrl</loc><lastmod>$($generated[$url])</lastmod></url>")
  }
  [void]$builder.AppendLine('</urlset>')
  [IO.File]::WriteAllText($sitemapPath, $builder.ToString(), [Text.UTF8Encoding]::new($false))
}

$result = [ordered]@{ sourcePages = $generated.Count; sitemapUrls = $current.Count; errors = @($errors) }
if (!$Quiet) { 'SITEMAP_SOURCE_AUDIT'; $result | ConvertTo-Json -Depth 3 }
if ($errors.Count) { exit 1 }
