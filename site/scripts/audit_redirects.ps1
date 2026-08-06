param([switch]$Quiet, [switch]$Live)

$ErrorActionPreference = 'Stop'
$site = Split-Path -Parent $PSScriptRoot
$origin = 'https://kardeslertekstil.com.tr'
$errors = [Collections.Generic.List[string]]::new()
$routes = @{}
$liveRouteDefinitions = [Collections.Generic.List[object]]::new()

foreach ($line in Get-Content -LiteralPath (Join-Path $site '_redirects')) {
  $line = $line.Trim()
  if (!$line -or $line.StartsWith('#')) { continue }
  $parts = $line -split '\s+'
  if ($parts.Count -lt 3 -or $parts[2] -notin @('301','308')) { continue }
  $liveRouteDefinitions.Add([pscustomobject]@{ Source=$parts[0]; Target=$parts[1]; Status=$parts[2] })
  $source = $parts[0].TrimEnd('/')
  if (!$source) { $source = '/' }
  $target = $parts[1]
  if ($routes.ContainsKey($source) -and $routes[$source] -ne $target) { $errors.Add("$source -> conflicting redirect targets") }
  $routes[$source] = $target
}

foreach ($source in $routes.Keys) {
  $visited = [Collections.Generic.HashSet[string]]::new([StringComparer]::OrdinalIgnoreCase)
  $cursor = $source
  while ($routes.ContainsKey($cursor)) {
    if (!$visited.Add($cursor)) { $errors.Add("$source -> redirect loop"); break }
    $next = $routes[$cursor].TrimEnd('/'); if (!$next) { $next = '/' }
    if ($routes.ContainsKey($next)) { $errors.Add("$source -> redirect chain through $next"); break }
    $cursor = $next
  }

  $targetUri = [Uri]::new([Uri]$origin, $routes[$source])
  $relative = $targetUri.AbsolutePath.Trim('/')
  $file = if (!$relative) { Join-Path $site 'index.html' } else {
    $index = Join-Path (Join-Path $site ($relative -replace '/', '\')) 'index.html'
    $flat = Join-Path $site (($relative -replace '/', '\') + '.html')
    if (Test-Path $index) { $index } elseif (Test-Path $flat) { $flat } else { '' }
  }
  if (!$file) { $errors.Add("$source -> redirect target page missing: $($routes[$source])"); continue }
  $html = [IO.File]::ReadAllText($file, [Text.Encoding]::UTF8)
  $canonicalMatch = [regex]::Match($html, '<link[^>]+rel=["'']canonical["''][^>]+href=["'']([^"'']+)', 'IgnoreCase')
  if (!$canonicalMatch.Success) { $canonicalMatch = [regex]::Match($html, '<link[^>]+href=["'']([^"'']+)["''][^>]+rel=["'']canonical["'']', 'IgnoreCase') }
  if (!$canonicalMatch.Success -or $canonicalMatch.Groups[1].Value -ne $targetUri.AbsoluteUri) {
    $errors.Add("$source -> redirect target differs from HTML canonical")
  }
}

$legacyInternalLinks = 0
foreach ($file in Get-ChildItem -LiteralPath $site -Filter '*.html' -File -Recurse) {
  $html = [IO.File]::ReadAllText($file.FullName, [Text.Encoding]::UTF8)
  foreach ($href in [regex]::Matches($html, 'href=["'']([^"''#]+)', 'IgnoreCase')) {
    try { $path = ([Uri]::new([Uri]$origin, [Net.WebUtility]::HtmlDecode($href.Groups[1].Value))).AbsolutePath.TrimEnd('/') } catch { continue }
    if (!$path) { $path = '/' }
    if ($routes.ContainsKey($path)) { $legacyInternalLinks++; $errors.Add("$($file.Name) -> internal link uses redirect path: $path") }
  }
}

$liveRedirects = 0
if ($Live) {
  foreach ($definition in $liveRouteDefinitions) {
    $headers = (& curl.exe -sS -I --max-redirs 0 "$origin$($definition.Source)") -join "`n"
    $status = [regex]::Match($headers, 'HTTP/\S+\s+(\d{3})').Groups[1].Value
    $location = [regex]::Match($headers, '(?im)^location:\s*([^\r\n]+)').Groups[1].Value.Trim()
    $resolvedLocation = if ($location) { [Uri]::new([Uri]$origin, $location).AbsoluteUri } else { '' }
    $expected = [Uri]::new([Uri]$origin, $definition.Target).AbsoluteUri
    if ($status -ne $definition.Status) { $errors.Add("$($definition.Source) -> live redirect status is $status") }
    if ($resolvedLocation -ne $expected) { $errors.Add("$($definition.Source) -> live redirect target differs: $location") }
    $liveRedirects++
  }
}

$worker = [IO.File]::ReadAllText((Join-Path $site '_worker.js'), [Text.Encoding]::UTF8)
foreach ($path in @('/about','/products','/contact','/references')) {
  if (!$routes.ContainsKey($path) -or $worker -notmatch [regex]::Escape("[`"$path`",")) { $errors.Add("$path -> Worker/_redirects mapping is not synchronized") }
}

$result = [ordered]@{ permanentRoutes = $routes.Count; internalLegacyLinks = $legacyInternalLinks; liveRedirects = $liveRedirects; errors = @($errors) }
if (!$Quiet) { 'REDIRECT_AUDIT'; $result | ConvertTo-Json -Depth 3 }
if ($errors.Count) { exit 1 }
