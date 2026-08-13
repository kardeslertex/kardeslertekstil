param([switch]$Quiet)

$ErrorActionPreference = 'Stop'
$siteRoot = Split-Path $PSScriptRoot -Parent
$homeHtml = Get-Content -LiteralPath (Join-Path $siteRoot 'index.html') -Raw
$siteJs = Get-Content -LiteralPath (Join-Path $siteRoot 'site.js') -Raw
$errors = [System.Collections.Generic.List[string]]::new()
$staticImages = 0
$imagesMissingDimensions = 0

$heroImage = [regex]::Match($homeHtml, '<img\s+[^>]*data-showcase-image[^>]*>', 'IgnoreCase').Value
if (-not $heroImage) { $errors.Add('The home LCP candidate is missing.') }
if ($heroImage -notmatch '\bwidth=["'']\d+["'']' -or $heroImage -notmatch '\bheight=["'']\d+["'']') {
    $errors.Add('The home LCP candidate must reserve width and height.')
}
if ($heroImage -notmatch '\bfetchpriority=["'']high["'']') {
    $errors.Add('The home LCP candidate must use high fetch priority.')
}

$videoSources = [regex]::Matches($homeHtml, '<source\s+[^>]*type=["'']video/mp4["''][^>]*>', 'IgnoreCase')
foreach ($source in $videoSources) {
    if ($source.Value -notmatch '\bdata-src=') { $errors.Add('A home video source loads eagerly.') }
}
if ($homeHtml -notmatch 'compactViewport\s*=\s*window\.matchMedia\("\(max-width: 767px\)"\)\.matches') {
    $errors.Add('The inline mobile intro guard is missing.')
}
if ($siteJs -notmatch 'compactViewport\s*&&\s*!window\.__ktForceHomeIntro') {
    $errors.Add('The runtime mobile intro guard is missing.')
}
if ($homeHtml -match 'knowledge-center\.js') { $errors.Add('The article catalog bundle must not load on the home page.') }

foreach ($file in Get-ChildItem -LiteralPath $siteRoot -Filter '*.html' -File -Recurse | Where-Object {
    $_.FullName -notlike "$(Join-Path $siteRoot 'hero-archive')*" -and
    $_.FullName -notlike "$(Join-Path $siteRoot '_inceleme_v14')*"
}) {
    $html = Get-Content -LiteralPath $file.FullName -Raw
    foreach ($image in [regex]::Matches($html, '<img\b[^>]*>', 'IgnoreCase')) {
        if ($image.Value -notmatch '\b(?:src|data-src)=["''][^"'']+') { continue }
        $staticImages++
        if ($image.Value -notmatch '\bwidth=["'']\d+["'']' -or $image.Value -notmatch '\bheight=["'']\d+["'']') {
            $imagesMissingDimensions++
        }
    }
}
if ($imagesMissingDimensions) { $errors.Add("Static images missing intrinsic dimensions: $imagesMissingDimensions") }

$catalogJs = Get-Content -LiteralPath (Join-Path $siteRoot 'catalog.js') -Raw
if ($catalogJs -notmatch 'catalogImageObserver' -or $catalogJs -notmatch 'img\.dataset\.src') {
    $errors.Add('Catalog images must use viewport-proximity loading.')
}

$result = [ordered]@{
    lcpDimensionsReserved = $errors -notcontains 'The home LCP candidate must reserve width and height.'
    lcpFetchPriorityHigh = $errors -notcontains 'The home LCP candidate must use high fetch priority.'
    deferredVideoSources = $videoSources.Count
    mobileIntroBypassed = ($errors -notcontains 'The inline mobile intro guard is missing.') -and ($errors -notcontains 'The runtime mobile intro guard is missing.')
    staticImagesChecked = $staticImages
    imagesMissingDimensions = $imagesMissingDimensions
    catalogViewportLoading = ($errors -notcontains 'Catalog images must use viewport-proximity loading.')
    errors = @($errors)
}
if (-not $Quiet) {
    'CORE_WEB_VITALS_AUDIT'
    $result | ConvertTo-Json -Depth 4
}
if ($errors.Count -gt 0) { exit 1 }
