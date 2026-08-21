$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$utf8 = New-Object System.Text.UTF8Encoding($false)
$changedFiles = 0
$catalogSlashLinks = 0
$catalogHashLinks = 0
$contactStateLinks = 0
$knowledgeStateLinks = 0
$catalogStateLinks = 0

Get-ChildItem -LiteralPath $root -Recurse -File -Filter '*.html' |
  Where-Object { $_.FullName -notlike "*$([IO.Path]::DirectorySeparatorChar)hero-archive$([IO.Path]::DirectorySeparatorChar)*" } |
  ForEach-Object {
    $file = $_.FullName
    $html = [IO.File]::ReadAllText($file, [Text.Encoding]::UTF8)
    $original = $html
    $html = [regex]::Replace($html, 'href="([^"]+)"', {
      param($match)
      $href = $match.Groups[1].Value

      if ($href -match '(^|/)urunlerimiz#') {
        $script:catalogHashLinks++
        return 'href="' + $href.Replace('urunlerimiz#', 'urunlerimiz/#') + '"'
      }
      if ($href -match '(^|/)urunlerimiz$') {
        $script:catalogSlashLinks++
        return 'href="' + $href + '/"'
      }
      if ($href -match '^(.*(?:^|/)iletisim)\?([^#]+)(?:#teklif-formu)?$') {
        $script:contactStateLinks++
        return 'href="' + $matches[1] + '#teklif-formu?' + $matches[2] + '"'
      }
      if ($href -match '^(.*(?:^|/)bilgi-merkezi/)\?([^#]+)$') {
        $script:knowledgeStateLinks++
        return 'href="' + $matches[1] + '#filtre?' + $matches[2] + '"'
      }
      if ($href -match '^(.*(?:^|/)urunlerimiz)/?\?([^#]+)(?:#.*)?$') {
        $script:catalogStateLinks++
        return 'href="' + $matches[1] + '/#filtre?' + $matches[2] + '"'
      }
      return $match.Value
    })

    if ($html -cne $original) {
      [IO.File]::WriteAllText($file, $html, $utf8)
      $script:changedFiles++
    }
  }

if ($catalogSlashLinks -gt 0 -and $catalogSlashLinks -lt 800) { throw "Expected at least 800 catalog slash fixes, found $catalogSlashLinks" }
if ($contactStateLinks -gt 0 -and $contactStateLinks -lt 150) { throw "Expected at least 150 contact state fixes, found $contactStateLinks" }
Write-Host "Changed files: $changedFiles"
Write-Host "Catalog slash links: $catalogSlashLinks"
Write-Host "Catalog hash links: $catalogHashLinks"
Write-Host "Contact state links: $contactStateLinks"
Write-Host "Knowledge state links: $knowledgeStateLinks"
Write-Host "Catalog state links: $catalogStateLinks"
