param([switch]$Quiet)

$ErrorActionPreference = 'Stop'
$site = Split-Path -Parent $PSScriptRoot
$errors = [Collections.Generic.List[string]]::new()
$indexablePages = 0

function Get-Attribute([string]$tag, [string]$name) {
  $pattern = '(?is)\b' + [regex]::Escape($name) + '\s*=\s*(["''])(.*?)\1'
  $match = [regex]::Match($tag, $pattern)
  if ($match.Success) { return [Net.WebUtility]::HtmlDecode($match.Groups[2].Value) }
  return ''
}

function Get-MetaContent([string]$html, [string]$attribute, [string]$key) {
  foreach ($match in [regex]::Matches($html, '(?is)<meta\b[^>]*>')) {
    if ((Get-Attribute $match.Value $attribute) -eq $key) { return Get-Attribute $match.Value 'content' }
  }
  return ''
}

foreach ($file in Get-ChildItem $site -Recurse -File -Filter '*.html' | Where-Object { $_.FullName -notlike '*\hero-archive\*' }) {
  $html = [IO.File]::ReadAllText($file.FullName, [Text.Encoding]::UTF8)
  if ((Get-MetaContent $html 'name' 'robots') -match 'noindex') { continue }
  if ($html -match '(?is)<meta[^>]+http-equiv=["'']refresh') { continue }

  $indexablePages++
  $relativePath = $file.FullName.Substring($site.Length + 1)
  $titleMatch = [regex]::Match($html, '(?is)<title>(.*?)</title>')
  $title = [Net.WebUtility]::HtmlDecode(([regex]::Replace($titleMatch.Groups[1].Value, '<[^>]+>', '')).Trim())
  $description = Get-MetaContent $html 'name' 'description'

  if ($title.Length -lt 20 -or $title.Length -gt 65) { $errors.Add("$relativePath -> title length $($title.Length)") }
  if ($description.Length -lt 70 -or $description.Length -gt 165) { $errors.Add("$relativePath -> description length $($description.Length)") }
  foreach ($property in @('og:type', 'og:title', 'og:description', 'og:url', 'og:image')) {
    if (!(Get-MetaContent $html 'property' $property)) { $errors.Add("$relativePath -> missing $property") }
  }
  foreach ($name in @('twitter:card', 'twitter:title', 'twitter:description', 'twitter:image')) {
    if (!(Get-MetaContent $html 'name' $name)) { $errors.Add("$relativePath -> missing $name") }
  }
}

$result = [ordered]@{ indexablePages = $indexablePages; errors = @($errors) }
if (!$Quiet) { $result | ConvertTo-Json -Depth 3 }
if ($errors.Count) { exit 1 }
