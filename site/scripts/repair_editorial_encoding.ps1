param([string]$SiteRoot)
$ErrorActionPreference = 'Stop'
$root = if ($SiteRoot) { (Resolve-Path $SiteRoot).Path } else { Split-Path $PSScriptRoot -Parent }
$utf8 = [Text.UTF8Encoding]::new($false)
$win1252 = [Text.Encoding]::GetEncoding(1252)
$files = Get-ChildItem -LiteralPath (Join-Path $root 'bilgi-merkezi') -Filter 'index.html' -File -Recurse
$changed = 0
foreach ($file in $files) {
  $html = [IO.File]::ReadAllText($file.FullName, [Text.Encoding]::UTF8)
  $matches = [regex]::Matches($html, '(?s)<section data-editorial-strengthening="20260809">.*?</section>|<p data-editorial-followup="20260809">.*?</p>')
  if (-not $matches.Count) { continue }
  foreach ($match in @($matches | Sort-Object Index -Descending)) {
    if ($match.Value -notmatch '&#19[3-7];') { continue }
    $decoded = [Net.WebUtility]::HtmlDecode($match.Value)
    $repaired = [Text.Encoding]::UTF8.GetString($win1252.GetBytes($decoded))
    $encodedText = [regex]::Replace($repaired, '>([^<]+)<', { param($m) '>' + [Net.WebUtility]::HtmlEncode($m.Groups[1].Value) + '<' })
    $html = $html.Substring(0, $match.Index) + $encodedText + $html.Substring($match.Index + $match.Length)
  }
  [IO.File]::WriteAllText($file.FullName, $html, $utf8)
  $changed++
}
$titleFiles = 0
foreach ($file in $files) {
  $html = [IO.File]::ReadAllText($file.FullName, [Text.Encoding]::UTF8)
  $titleMatch = [regex]::Match($html, '(?s)<title>(.*?)</title>')
  if (-not $titleMatch.Success -or $titleMatch.Groups[1].Value -notmatch '&#19[3-7];') { continue }
  $decoded = [Net.WebUtility]::HtmlDecode($titleMatch.Groups[1].Value)
  $repaired = [Text.Encoding]::UTF8.GetString($win1252.GetBytes($decoded))
  $replacement = '<title>' + [Net.WebUtility]::HtmlEncode($repaired) + '</title>'
  $html = $html.Substring(0, $titleMatch.Index) + $replacement + $html.Substring($titleMatch.Index + $titleMatch.Length)
  [IO.File]::WriteAllText($file.FullName, $html, $utf8)
  $titleFiles++
}
"Repaired editorial encoding in $changed files."
"Repaired title encoding in $titleFiles files."
