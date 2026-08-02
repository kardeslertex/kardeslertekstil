$ErrorActionPreference = 'Stop'

$siteRoot = Split-Path -Parent $PSScriptRoot
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$changed = 0

function ConvertTo-PlainText([string] $value) {
  $withoutTags = [regex]::Replace($value, '<[^>]+>', ' ')
  $decoded = [System.Net.WebUtility]::HtmlDecode($withoutTags)
  return [regex]::Replace($decoded, '\s+', ' ').Trim()
}

function Get-WordBoundaryExcerpt([string] $value, [int] $maxLength) {
  if ($value.Length -le $maxLength) { return $value }
  $candidate = $value.Substring(0, $maxLength - 3)
  $lastSpace = $candidate.LastIndexOf(' ')
  if ($lastSpace -ge 70) { $candidate = $candidate.Substring(0, $lastSpace) }
  return $candidate.TrimEnd(' ', ',', ';', ':', '-', [char]0x2014) + '...'
}

foreach ($file in Get-ChildItem -LiteralPath $siteRoot -Recurse -Filter '*.html') {
  $path = $file.FullName
  $html = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
  $metaPattern = '<meta\s+name="description"\s+content="([^"]*)"'
  $metaMatch = [regex]::Match($html, $metaPattern, 'IgnoreCase')
  if (-not $metaMatch.Success) { continue }

  $description = [System.Net.WebUtility]::HtmlDecode($metaMatch.Groups[1].Value).Trim()
  if ($description.Length -ge 70 -and $description.Length -le 155) { continue }

  $nextDescription = ''
  if ($description.Length -gt 155) {
    $sentence = [regex]::Match($description, '^.{70,155}?[.!?](?:\s|$)').Value.Trim()
    if ($sentence.Length -ge 70) { $nextDescription = $sentence }
  }

  if (-not $nextDescription) {
    $mainStart = $html.IndexOf('<main', [System.StringComparison]::OrdinalIgnoreCase)
    $searchHtml = if ($mainStart -ge 0) { $html.Substring($mainStart) } else { $html }
    foreach ($paragraphMatch in [regex]::Matches($searchHtml, '<p(?:\s[^>]*)?>(.*?)</p>', 'IgnoreCase,Singleline')) {
      $paragraph = ConvertTo-PlainText $paragraphMatch.Groups[1].Value
      if ($paragraph.Length -ge 70) {
        $nextDescription = Get-WordBoundaryExcerpt $paragraph 155
        break
      }
    }
  }

  if (-not $nextDescription) {
    $nextDescription = Get-WordBoundaryExcerpt $description 155
  }

  if ($nextDescription.Length -gt 155) {
    $nextDescription = Get-WordBoundaryExcerpt $nextDescription 155
  }

  if ($nextDescription.Length -lt 70 -or $nextDescription -eq $description) { continue }

  $encoded = [System.Net.WebUtility]::HtmlEncode($nextDescription)
  $nextHtml = $html.Remove($metaMatch.Groups[1].Index, $metaMatch.Groups[1].Length).Insert($metaMatch.Groups[1].Index, $encoded)

  foreach ($attribute in @('og:description', 'twitter:description')) {
    $pattern = "(<meta[^>]+(?:property|name)=`"$([regex]::Escape($attribute))`"[^>]+content=`")([^`"]*)(`"[^>]*>)"
    $nextHtml = [regex]::Replace($nextHtml, $pattern, "`$1$encoded`$3", 'IgnoreCase')
  }

  [System.IO.File]::WriteAllText($path, $nextHtml, $utf8NoBom)
  $script:changed += 1
}

Write-Output "Normalized meta descriptions: $changed"
