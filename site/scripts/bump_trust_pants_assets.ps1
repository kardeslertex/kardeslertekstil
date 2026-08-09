param([string]$SiteRoot)
$ErrorActionPreference = 'Stop'
$root = if ($SiteRoot) { (Resolve-Path $SiteRoot).Path } else { Split-Path $PSScriptRoot -Parent }
$utf8 = [Text.UTF8Encoding]::new($false)
$replacements = @(
  @{ file='index.html'; old='/home-styles-20260807-20.css'; new='/home-styles-20260809-trust8.css' },
  @{ file='urunlerimiz.html'; old='/catalog-ui-20260809-pantolonfilter1.js'; new='/catalog-ui-20260809-technicalpants2.js' },
  @{ file='urunlerimiz.html'; old='/catalog-ui-20260809-technicalpants2.js'; new='/catalog-ui-20260809-uniformfit3.js' },
  @{ file='urunlerimiz.html'; old='/catalog-styles-20260809-uniform1.css'; new='/catalog-styles-20260809-uniformfit3.css' }
)
foreach ($entry in $replacements) {
  $path = Join-Path $root $entry.file
  $source = [IO.File]::ReadAllText($path, [Text.Encoding]::UTF8)
  if (-not $source.Contains($entry.old) -and -not $source.Contains($entry.new)) { throw "Asset path missing: $($entry.file)" }
  $source = $source.Replace($entry.old, $entry.new)
  [IO.File]::WriteAllText($path, $source, $utf8)
}
'Updated homepage and catalog release paths.'
