$ErrorActionPreference = 'Stop'

$site = Split-Path -Parent $PSScriptRoot
$utf8NoBom = New-Object Text.UTF8Encoding($false)
$fallbackImage = 'https://kardeslertekstil.com.tr/assets/logo-kit-badge.webp'
$updatedFiles = 0

function Get-Attribute([string]$tag, [string]$name) {
  $pattern = '(?is)\b' + [regex]::Escape($name) + '\s*=\s*(["''])(.*?)\1'
  $match = [regex]::Match($tag, $pattern)
  if ($match.Success) { return [Net.WebUtility]::HtmlDecode($match.Groups[2].Value) }
  return ''
}

function Get-MetaContent([string]$html, [string]$attribute, [string]$key) {
  foreach ($match in [regex]::Matches($html, '(?is)<meta\b[^>]*>')) {
    if ((Get-Attribute $match.Value $attribute) -eq $key) {
      return Get-Attribute $match.Value 'content'
    }
  }
  return ''
}

function Encode([string]$value) { return [Net.WebUtility]::HtmlEncode($value) }

foreach ($file in Get-ChildItem $site -Recurse -File -Filter '*.html' | Where-Object { $_.FullName -notlike '*\hero-archive\*' }) {
  $html = [IO.File]::ReadAllText($file.FullName, [Text.Encoding]::UTF8)
  if ((Get-MetaContent $html 'name' 'robots') -match 'noindex') { continue }
  if ($html -match '(?is)<meta[^>]+http-equiv=["'']refresh') { continue }

  $titleMatch = [regex]::Match($html, '(?is)<title>(.*?)</title>')
  $title = [Net.WebUtility]::HtmlDecode(([regex]::Replace($titleMatch.Groups[1].Value, '<[^>]+>', '')).Trim())
  $description = Get-MetaContent $html 'name' 'description'
  $canonicalMatch = [regex]::Match($html, '<link[^>]+rel=["'']canonical["''][^>]+href=["'']([^"'']+)', 'IgnoreCase')
  $canonical = if ($canonicalMatch.Success) { [Net.WebUtility]::HtmlDecode($canonicalMatch.Groups[1].Value) } else { '' }
  $image = Get-MetaContent $html 'property' 'og:image'
  if (!$image) { $image = $fallbackImage }

  $additions = [Collections.Generic.List[string]]::new()
  if (!(Get-MetaContent $html 'property' 'og:type')) { $additions.Add('<meta property="og:type" content="website">') }
  if (!(Get-MetaContent $html 'property' 'og:title')) { $additions.Add("<meta property=`"og:title`" content=`"$(Encode $title)`">") }
  if (!(Get-MetaContent $html 'property' 'og:description')) { $additions.Add("<meta property=`"og:description`" content=`"$(Encode $description)`">") }
  if (!(Get-MetaContent $html 'property' 'og:url') -and $canonical) { $additions.Add("<meta property=`"og:url`" content=`"$(Encode $canonical)`">") }
  if (!(Get-MetaContent $html 'property' 'og:image')) { $additions.Add("<meta property=`"og:image`" content=`"$(Encode $image)`">") }
  if (!(Get-MetaContent $html 'name' 'twitter:card')) { $additions.Add('<meta name="twitter:card" content="summary_large_image">') }
  if (!(Get-MetaContent $html 'name' 'twitter:title')) { $additions.Add("<meta name=`"twitter:title`" content=`"$(Encode $title)`">") }
  if (!(Get-MetaContent $html 'name' 'twitter:description')) { $additions.Add("<meta name=`"twitter:description`" content=`"$(Encode $description)`">") }
  if (!(Get-MetaContent $html 'name' 'twitter:image')) { $additions.Add("<meta name=`"twitter:image`" content=`"$(Encode $image)`">") }

  if ($additions.Count) {
    $html = $html.Replace('</head>', (($additions -join '') + '</head>'))
    [IO.File]::WriteAllText($file.FullName, $html, $utf8NoBom)
    $updatedFiles++
  }
}

[ordered]@{ updatedFiles = $updatedFiles } | ConvertTo-Json
