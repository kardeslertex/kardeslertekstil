param([string]$SiteRoot)
$ErrorActionPreference = 'Stop'
$root = if ($SiteRoot) { (Resolve-Path $SiteRoot).Path } else { Split-Path $PSScriptRoot -Parent }
$utf8 = [Text.UTF8Encoding]::new($false)
$replacements = @(
  @{ file='urunlerimiz/index.html'; old='/products-data-20260809-webp1.js'; new='/products-data-20260809-kt-on-040-white1.js' },
  @{ file='urunlerimiz/index.html'; old='/catalog-ui-20260809-uniformfit3.js'; new='/catalog-ui-20260809-esd-symbol2.js' },
  @{ file='urunlerimiz/index.html'; old='/catalog-styles-20260809-uniformfit3.css'; new='/catalog-styles-20260809-esd-symbol2.css' }
)
foreach ($entry in $replacements) {
  $path = Join-Path $root $entry.file
  $source = [IO.File]::ReadAllText($path, [Text.Encoding]::UTF8)
  if (-not $source.Contains($entry.old) -and -not $source.Contains($entry.new)) { throw "Asset path missing: $($entry.file)" }
  $source = $source.Replace($entry.old, $entry.new)
  [IO.File]::WriteAllText($path, $source, $utf8)
}
'Updated homepage and catalog release paths.'
