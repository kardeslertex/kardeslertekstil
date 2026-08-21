param([switch]$Quiet)

$ErrorActionPreference = 'Stop'
$siteRoot = Split-Path -Parent $PSScriptRoot
$origin = 'https://kardeslertekstil.com.tr'
$organizationId = "$origin/#organization"
$errors = [Collections.Generic.List[string]]::new()
$counts = [ordered]@{ jsonLdBlocks = 0; blogPostings = 0; products = 0; collections = 0; breadcrumbs = 0; services = 0; faqPages = 0 }

function Add-Error([string]$path, [string]$message) { $errors.Add("$path -> $message") }
function Plain-Text([string]$value) {
    $withoutMarkup = [regex]::Replace($value, '<[^>]+>', ' ')
    return ([Net.WebUtility]::HtmlDecode($withoutMarkup) -replace '\s+', ' ').Trim()
}

$htmlFiles = Get-ChildItem -LiteralPath $siteRoot -Recurse -File -Filter '*.html' | Where-Object {
    $_.FullName -notlike '*\hero-archive\*'
}
$canonicalSet = @{}
foreach ($file in $htmlFiles) {
    $source = [IO.File]::ReadAllText($file.FullName, [Text.Encoding]::UTF8)
    $match = [regex]::Match($source, '<link[^>]+rel=["'']canonical["''][^>]+href=["'']([^"'']+)', 'IgnoreCase')
    if ($match.Success) { $canonicalSet[[Net.WebUtility]::HtmlDecode($match.Groups[1].Value)] = $true }
}

foreach ($file in $htmlFiles) {
    $relativePath = $file.FullName.Substring($siteRoot.Length + 1)
    $html = [IO.File]::ReadAllText($file.FullName, [Text.Encoding]::UTF8)
    $visibleText = Plain-Text ([regex]::Replace($html, '(?is)<(script|style)\b.*?</\1>', ' '))
    $canonicalMatch = [regex]::Match($html, '<link[^>]+rel=["'']canonical["''][^>]+href=["'']([^"'']+)', 'IgnoreCase')
    $canonical = if ($canonicalMatch.Success) { [Net.WebUtility]::HtmlDecode($canonicalMatch.Groups[1].Value) } else { '' }
    $pageTypes = [Collections.Generic.List[string]]::new()
    $blogPostingCount = 0

    foreach ($idMatch in [regex]::Matches($html, '["'']@id["'']\s*:\s*["'']([^"'']*#organization)["'']', 'IgnoreCase')) {
        if ($idMatch.Groups[1].Value -ne $organizationId) { Add-Error $relativePath 'Organization uses a non-canonical @id' }
    }
    if ($html -match '#localbusiness') { Add-Error $relativePath 'duplicate LocalBusiness identity remains' }

    foreach ($match in [regex]::Matches($html, '<script(?<attrs>[^>]*)type=["'']application/ld\+json["''](?<after>[^>]*)>(?<json>.*?)</script>', 'IgnoreCase,Singleline')) {
        $counts.jsonLdBlocks++
        try { $schema = $match.Groups['json'].Value | ConvertFrom-Json } catch { Add-Error $relativePath 'invalid JSON-LD'; continue }
        $schemaTypes = @($schema.'@type')
        if (!$schemaTypes.Count) {
            $attributes = $match.Groups['attrs'].Value + $match.Groups['after'].Value
            if ($attributes -notmatch 'id=["'']productCatalogJsonLd["'']') { Add-Error $relativePath 'schema type missing' }
            continue
        }
        foreach ($schemaType in $schemaTypes) { $pageTypes.Add([string]$schemaType) }
        $type = [string]$schemaTypes[0]

        if ($type -eq 'Article') { Add-Error $relativePath 'legacy Article duplicates BlogPosting'; continue }
        if ($type -eq 'BlogPosting') {
            $counts.blogPostings++; $blogPostingCount++
            foreach ($field in @('headline','description','datePublished','dateModified','image','author','publisher','mainEntityOfPage','url','@id')) {
                if (!$schema.$field) { Add-Error $relativePath "BlogPosting missing $field" }
            }
            if ($schema.url -ne $canonical -or $schema.mainEntityOfPage.'@id' -ne $canonical) { Add-Error $relativePath 'BlogPosting URL differs from canonical' }
            if ($schema.publisher.'@id' -ne $organizationId -or $schema.author.'@id' -ne $organizationId) { Add-Error $relativePath 'BlogPosting organization identity is inconsistent' }
            if ($visibleText -notlike "*$($schema.headline)*") { Add-Error $relativePath 'BlogPosting headline is not visible' }
            continue
        }
        if ($type -eq 'Product') {
            $counts.products++
            foreach ($field in @('name','description','image','sku','brand','manufacturer','material','category','url','@id')) { if (!$schema.$field) { Add-Error $relativePath "Product missing $field" } }
            $material = ([string]$schema.material -replace '\s+', ' ').Trim()
            if ($material.Length -gt 80 -or $material -match '[{}<>]') { Add-Error $relativePath 'Product material is malformed or overly long' }
            if ($schema.url -ne $canonical -or $schema.'@id' -ne "$canonical#product") { Add-Error $relativePath 'Product identity differs from canonical' }
            foreach ($field in @('name','description','sku')) { if ($schema.$field -and $visibleText -notlike "*$($schema.$field)*") { Add-Error $relativePath "Product $field is not visible" } }
            foreach ($image in @($schema.image)) { $leaf = Split-Path ([uri]$image).AbsolutePath -Leaf; if ($html -notlike "*$leaf*") { Add-Error $relativePath 'Product image is not visible' } }
            if ($schema.brand.name -and $visibleText -notlike "*$($schema.brand.name)*") { Add-Error $relativePath 'Product brand is not visible' }
            if ($schema.offers) {
                if (!$schema.offers.price -or !$schema.offers.priceCurrency) { Add-Error $relativePath 'Offer lacks a real price or currency' }
                if ($visibleText -notlike "*$($schema.offers.price)*") { Add-Error $relativePath 'Offer price is not visible' }
            }
            continue
        }
        if ($type -eq 'BreadcrumbList') {
            $counts.breadcrumbs++
            $items = @($schema.itemListElement)
            if (!$items.Count) { Add-Error $relativePath 'BreadcrumbList is empty'; continue }
            for ($index = 0; $index -lt $items.Count; $index++) {
                $item = $items[$index]
                if ($item.position -ne ($index + 1) -or !$item.name -or !$item.item) { Add-Error $relativePath 'BreadcrumbList item is incomplete or unordered'; break }
                if (-not $canonicalSet.ContainsKey([string]$item.item)) { Add-Error $relativePath "Breadcrumb item is not a canonical URL: $($item.item)"; break }
            }
            if ($canonical -and $items[-1].item -ne $canonical) { Add-Error $relativePath 'Final breadcrumb URL differs from canonical' }
            continue
        }
        if ($type -eq 'CollectionPage') {
            $counts.collections++
            if ($schema.url -and $schema.url -ne $canonical) { Add-Error $relativePath 'CollectionPage URL differs from canonical' }
            if ($schema.mainEntity.'@type' -ne 'ItemList') { Add-Error $relativePath 'CollectionPage requires an embedded ItemList' }
            else {
                $listItems = @($schema.mainEntity.itemListElement)
                if ([int]$schema.mainEntity.numberOfItems -ne $listItems.Count) { Add-Error $relativePath 'ItemList count is inconsistent' }
                foreach ($listItem in $listItems) {
                    $itemUrl = [string]$listItem.url
                    if (!$itemUrl -and $listItem.item) { $itemUrl = [string]$listItem.item.url }
                    if ($itemUrl -and -not $canonicalSet.ContainsKey($itemUrl)) {
                        Add-Error $relativePath "ItemList URL is not canonical: $itemUrl"
                        break
                    }
                    if ($itemUrl -and $itemUrl -eq $canonical) {
                        Add-Error $relativePath "ItemList item points back to its collection page: $itemUrl"
                        break
                    }
                    if ($relativePath.Replace('\', '/') -eq 'urunlerimiz/index.html' -and $itemUrl -and $itemUrl -notlike "$origin/urun/*") {
                        Add-Error $relativePath "Catalog ItemList must point to a product detail page: $itemUrl"
                        break
                    }
                }
            }
            continue
        }
        if ($type -eq 'Service') {
            $counts.services++
            if ($schema.provider.'@id' -ne $organizationId -or !$schema.areaServed -or $schema.address) { Add-Error $relativePath 'Service must separate provider address from service area' }
            if ($schema.url -ne $canonical) { Add-Error $relativePath 'Service URL differs from canonical' }
            continue
        }
        if ($type -eq 'FAQPage') {
            $counts.faqPages++
            foreach ($question in @($schema.mainEntity)) {
                $questionText = Plain-Text ([string]$question.name)
                $answerText = Plain-Text ([string]$question.acceptedAnswer.text)
                if (-not $visibleText.Contains($questionText) -or -not $visibleText.Contains($answerText)) { Add-Error $relativePath 'FAQ schema differs from visible content'; break }
            }
        }
    }

    if ($html -match '<body[^>]+data-post-slug=' -and $blogPostingCount -ne 1) { Add-Error $relativePath "expected one BlogPosting, found $blogPostingCount" }
    if ($relativePath -eq 'index.html' -and (($pageTypes -notcontains 'Organization') -or ($pageTypes -notcontains 'LocalBusiness') -or ($pageTypes -notcontains 'WebSite'))) { Add-Error $relativePath 'home requires Organization, LocalBusiness and WebSite' }
    if ($relativePath -eq 'iletisim.html' -and $pageTypes -notcontains 'ContactPage') { Add-Error $relativePath 'contact page requires ContactPage' }
    if ($relativePath -eq 'hakkimizda.html' -and $pageTypes -notcontains 'AboutPage') { Add-Error $relativePath 'about page requires AboutPage' }
}

$result = [ordered]@{ jsonLdBlocks=$counts.jsonLdBlocks; blogPostings=$counts.blogPostings; products=$counts.products; collections=$counts.collections; breadcrumbs=$counts.breadcrumbs; services=$counts.services; faqPages=$counts.faqPages; errors=@($errors) }
if (!$Quiet) { 'SCHEMA_AUDIT'; $result | ConvertTo-Json -Depth 5 }
if ($errors.Count) { exit 1 }
