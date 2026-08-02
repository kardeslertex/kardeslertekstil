$ErrorActionPreference = 'Stop'

$siteRoot = Split-Path -Parent $PSScriptRoot
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$changed = 0

foreach ($file in Get-ChildItem -LiteralPath $siteRoot -Recurse -Filter '*.html') {
  $path = $file.FullName
  $html = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
  $match = [regex]::Match($html, '<title>(.*?)</title>', 'Singleline')
  if (-not $match.Success) { continue }

  $title = [System.Net.WebUtility]::HtmlDecode($match.Groups[1].Value).Trim()
  if ($title.Length -le 60) { continue }

  $shortTitle = [regex]::Replace(
    $title,
    '\s*(?:\u2014|\||-)\s*[^<>]{1,30}Tekstil\s*$',
    ''
  ).Trim()

  if ($shortTitle.Length -gt 60) {
    $candidate = $shortTitle.Substring(0, 60)
    $lastSpace = $candidate.LastIndexOf(' ')
    if ($lastSpace -ge 35) { $candidate = $candidate.Substring(0, $lastSpace) }
    $shortTitle = $candidate.TrimEnd(' ', ',', ';', ':', '-', [char]0x2014)
  }

  if ($shortTitle -eq $title) { continue }

  $encodedTitle = [System.Net.WebUtility]::HtmlEncode($shortTitle)
  $nextHtml = $html.Substring(0, $match.Groups[1].Index) +
    $encodedTitle +
    $html.Substring($match.Groups[1].Index + $match.Groups[1].Length)

  [System.IO.File]::WriteAllText($path, $nextHtml, $utf8NoBom)
  $script:changed += 1
}

Write-Output "Shortened knowledge page titles: $changed"
