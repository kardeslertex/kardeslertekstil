$ErrorActionPreference = 'Stop'

$site = Split-Path -Parent $PSScriptRoot
$articleRoot = Join-Path $site 'bilgi-merkezi'
$utf8NoBom = New-Object Text.UTF8Encoding($false)
$schemaPattern = '<script[^>]+type=["'']application/ld\+json["''][^>]*>(?<json>.*?)</script>'
$publisherId = 'https://kardeslertekstil.com.tr/#organization'
$fallbackImage = 'https://kardeslertekstil.com.tr/assets/logo-kit-badge.webp'
$brandName = [Net.WebUtility]::HtmlDecode('Karde&#351;ler Tekstil')
$updatedFiles = 0
$removedDuplicateArticles = 0

function Set-SchemaProperty($schema, [string]$name, $value) {
  if ($schema.PSObject.Properties.Name -contains $name) {
    $schema.$name = $value
  } else {
    $schema | Add-Member -NotePropertyName $name -NotePropertyValue $value
  }
}

foreach ($file in Get-ChildItem $articleRoot -Directory | ForEach-Object { Join-Path $_.FullName 'index.html' } | Where-Object { Test-Path $_ }) {
  $html = [IO.File]::ReadAllText($file, [Text.Encoding]::UTF8)
  $matches = [regex]::Matches($html, $schemaPattern, 'IgnoreCase,Singleline')
  $hasBlogPosting = $false

  foreach ($match in $matches) {
    try {
      $schema = $match.Groups['json'].Value | ConvertFrom-Json
      if ($schema.'@type' -eq 'BlogPosting') { $hasBlogPosting = $true }
    } catch {
      throw "Geçersiz JSON-LD: $file"
    }
  }

  if (!$hasBlogPosting) { continue }

  $canonicalMatch = [regex]::Match($html, '<link[^>]+rel=["'']canonical["''][^>]+href=["'']([^"'']+)', 'IgnoreCase')
  if (!$canonicalMatch.Success) { throw "Canonical bulunamadı: $file" }
  $canonical = [Net.WebUtility]::HtmlDecode($canonicalMatch.Groups[1].Value)

  $imageMatch = [regex]::Match($html, '<meta[^>]+property=["'']og:image["''][^>]+content=["'']([^"'']+)', 'IgnoreCase')
  if (!$imageMatch.Success) { $imageMatch = [regex]::Match($html, '<meta[^>]+content=["'']([^"'']+)["''][^>]+property=["'']og:image["'']', 'IgnoreCase') }
  $image = if ($imageMatch.Success) { [Net.WebUtility]::HtmlDecode($imageMatch.Groups[1].Value) } else { $fallbackImage }

  $next = [regex]::Replace($html, $schemaPattern, [Text.RegularExpressions.MatchEvaluator]{
    param($match)
    $schema = $match.Groups['json'].Value | ConvertFrom-Json

    if ($schema.'@type' -eq 'Article') {
      $script:removedDuplicateArticles++
      return ''
    }
    if ($schema.'@type' -ne 'BlogPosting') { return $match.Value }

    Set-SchemaProperty $schema '@id' "$canonical#article"
    Set-SchemaProperty $schema 'url' $canonical
    Set-SchemaProperty $schema 'mainEntityOfPage' ([ordered]@{
      '@type' = 'WebPage'
      '@id' = $canonical
    })
    Set-SchemaProperty $schema 'image' @($image)
    Set-SchemaProperty $schema 'author' ([ordered]@{
      '@type' = 'Organization'
      '@id' = $publisherId
      'name' = $brandName
      'url' = 'https://kardeslertekstil.com.tr/hakkimizda'
    })
    Set-SchemaProperty $schema 'publisher' ([ordered]@{
      '@type' = 'Organization'
      '@id' = $publisherId
      'name' = $brandName
    })

    $json = $schema | ConvertTo-Json -Depth 12 -Compress
    return "<script type=`"application/ld+json`">$json</script>"
  }, 'IgnoreCase,Singleline')

  if ($next -ne $html) {
    [IO.File]::WriteAllText($file, $next, $utf8NoBom)
    $updatedFiles++
  }
}

[ordered]@{
  updatedFiles = $updatedFiles
  removedDuplicateArticles = $removedDuplicateArticles
} | ConvertTo-Json
