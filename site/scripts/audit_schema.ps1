param([switch]$Quiet)

$ErrorActionPreference = 'Stop'
$site = Split-Path -Parent $PSScriptRoot
$publisherId = 'https://kardeslertekstil.com.tr/#organization'
$errors = [Collections.Generic.List[string]]::new()
$counts = [ordered]@{
  jsonLdBlocks = 0
  blogPostings = 0
  products = 0
  breadcrumbs = 0
}

function Add-Error([string]$relativePath, [string]$message) {
  $errors.Add("$relativePath -> $message")
}

$htmlFiles = Get-ChildItem $site -Recurse -File -Filter '*.html' | Where-Object {
  $_.FullName -notlike '*\hero-archive\*'
}

foreach ($file in $htmlFiles) {
  $relativePath = $file.FullName.Substring($site.Length + 1)
  $html = [IO.File]::ReadAllText($file.FullName, [Text.Encoding]::UTF8)
  $canonicalMatch = [regex]::Match($html, '<link[^>]+rel=["'']canonical["''][^>]+href=["'']([^"'']+)', 'IgnoreCase')
  $canonical = if ($canonicalMatch.Success) { [Net.WebUtility]::HtmlDecode($canonicalMatch.Groups[1].Value) } else { '' }
  $blogPostingCount = 0

  foreach ($match in [regex]::Matches($html, '<script(?<attrs>[^>]*)type=["'']application/ld\+json["''](?<attrsAfter>[^>]*)>(?<json>.*?)</script>', 'IgnoreCase,Singleline')) {
    $counts.jsonLdBlocks++
    try {
      $schema = $match.Groups['json'].Value | ConvertFrom-Json
    } catch {
      Add-Error $relativePath 'invalid JSON-LD'
      continue
    }

    $type = $schema.'@type'
    if (!$type) {
      $attributes = $match.Groups['attrs'].Value + $match.Groups['attrsAfter'].Value
      if ($attributes -notmatch 'id=["'']productCatalogJsonLd["'']') { Add-Error $relativePath 'schema type missing' }
      continue
    }

    if ($type -eq 'Article') {
      Add-Error $relativePath 'legacy Article duplicates BlogPosting'
      continue
    }

    if ($type -eq 'BlogPosting') {
      $counts.blogPostings++
      $blogPostingCount++
      foreach ($field in @('headline', 'description', 'datePublished', 'dateModified', 'image', 'author', 'publisher', 'mainEntityOfPage', 'url', '@id')) {
        if (!$schema.$field) { Add-Error $relativePath "BlogPosting missing $field" }
      }
      if ($canonical -and $schema.url -ne $canonical) { Add-Error $relativePath 'BlogPosting URL differs from canonical' }
      if ($canonical -and $schema.mainEntityOfPage.'@id' -ne $canonical) { Add-Error $relativePath 'mainEntityOfPage differs from canonical' }
      if ($schema.publisher.'@id' -ne $publisherId) { Add-Error $relativePath 'publisher ID is inconsistent' }
      if ($schema.author.'@id' -ne $publisherId) { Add-Error $relativePath 'author ID is inconsistent' }
      continue
    }

    if ($type -eq 'Product') {
      $counts.products++
      foreach ($field in @('name', 'description', 'image', 'sku', 'brand')) {
        if (!$schema.$field) { Add-Error $relativePath "Product missing $field" }
      }
      continue
    }

    if ($type -eq 'BreadcrumbList') {
      $counts.breadcrumbs++
      $items = @($schema.itemListElement)
      if (!$items.Count) {
        Add-Error $relativePath 'BreadcrumbList is empty'
        continue
      }
      for ($index = 0; $index -lt $items.Count; $index++) {
        if ($items[$index].position -ne ($index + 1)) { Add-Error $relativePath 'BreadcrumbList positions are not sequential'; break }
        if (!$items[$index].name -or !$items[$index].item) { Add-Error $relativePath 'BreadcrumbList item is incomplete'; break }
      }
    }
  }

  if ($html -match '<body[^>]+data-post-slug=' -and $blogPostingCount -ne 1) {
    Add-Error $relativePath "expected one BlogPosting, found $blogPostingCount"
  }
}

$result = [ordered]@{
  jsonLdBlocks = $counts.jsonLdBlocks
  blogPostings = $counts.blogPostings
  products = $counts.products
  breadcrumbs = $counts.breadcrumbs
  errors = @($errors)
}

if (!$Quiet) { $result | ConvertTo-Json -Depth 4 }
if ($errors.Count) { exit 1 }
