$ErrorActionPreference = 'Stop'

$siteRoot = Split-Path -Parent $PSScriptRoot
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$changes = @(
  @{
    Path = 'urun\kt-sw-029-lacivert-saks-tam-fermuarli-kapusonlu-sweatshirt\index.html'
    New = 'Lacivert Saks Fermuarl&#305; Kap&#252;&#351;onlu Sweatshirt | KT-SW-029'
  },
  @{
    Path = 'bilgi-merkezi\laboratuvar-onlugu-secim-rehberi\index.html'
    New = 'Laboratuvar &#214;nl&#252;&#287;&#252; Se&#231;im Rehberi | Kuma&#351; ve Koruma'
  },
  @{
    Path = 'bilgi-merkezi\modakrilik-kumas-nedir\index.html'
    New = 'Modakrilik Kuma&#351; Nedir? Alev Koruyucu Kullan&#305;m&#305;'
  }
)

foreach ($change in $changes) {
  $path = Join-Path $siteRoot $change.Path
  $html = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
  $newTitle = '<title>' + $change.New + '</title>'
  if (-not [regex]::IsMatch($html, '<title>[^<]*</title>')) {
    throw "Title element was not found: $path"
  }
  $nextHtml = [regex]::Replace($html, '<title>[^<]*</title>', $newTitle, 1)
  [System.IO.File]::WriteAllText($path, $nextHtml, $utf8NoBom)
}

Write-Output 'Updated title width candidates: 3'
