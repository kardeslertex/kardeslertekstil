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
function Normalized-Text([string]$value) {
    return ((Plain-Text $value).ToLowerInvariant() -replace '[^\p{L}\p{N}]+', ' ').Trim()
}
function Test-Visible([string]$visibleText, [string]$value) {
    $needle = Normalized-Text $value
    if (!$needle) { return $false }
    return (Normalized-Text $visibleText).Contains($needle)
}
function Test-SiteUrl([string]$value) {
    if (!$value) { return $false }
    try {
        $uri = [uri]$value
        return $uri.Scheme -eq 'https' -and $uri.Host -eq 'kardeslertekstil.com.tr'
    } catch { return $false }
}
function Test-LocalAsset([string]$value) {
    if (!(Test-SiteUrl $value)) { return $true }
    $uri = [uri]$value
    $relative = [Net.WebUtility]::UrlDecode($uri.AbsolutePath.TrimStart('/')).Replace('/', [IO.Path]::DirectorySeparatorChar)
    if (!$relative) { return $true }
    return Test-Path -LiteralPath (Join-Path $siteRoot $relative) -PathType Leaf
}
function Test-DateValue([string]$value, [ref]$parsed) {
    $date = [datetime]::MinValue
    $valid = $value -match '^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})?)?$' -and [datetime]::TryParse($value, [Globalization.CultureInfo]::InvariantCulture, [Globalization.DateTimeStyles]::RoundtripKind, [ref]$date)
    $parsed.Value = $date
    return $valid
}
function Test-StringQuality([object]$node, [string]$path, [string]$location) {
    if ($null -eq $node) { return }
    if ($node -is [string]) {
        $value = [string]$node
        $hasReplacement = $value.IndexOf([char]0xFFFD) -ge 0
        $hasMojibakeLead = $value.IndexOf([char]0x00C3) -ge 0 -or $value.IndexOf([char]0x00C5) -ge 0
        if ($hasReplacement -or $hasMojibakeLead -or $value -match '<\/?[a-z][^>]*>') { Add-Error $location "suspicious or marked-up schema value at $path" }
        return
    }
    if ($node -is [Collections.IEnumerable] -and $node -isnot [Management.Automation.PSCustomObject]) {
        $index = 0
        foreach ($item in $node) { Test-StringQuality $item "$path[$index]" $location; $index++ }
        return
    }
    if ($node -is [Management.Automation.PSCustomObject]) {
        foreach ($property in $node.PSObject.Properties) { Test-StringQuality $property.Value "$path.$($property.Name)" $location }
    }
}

function U([string]$value) { return [regex]::Unescape($value) }
$allowedProductMaterials = @(
    (U 'lakost \u00f6rme kuma\u015f'), (U 'penye \u00f6rme kuma\u015f'), (U 'iki veya \u00fc\u00e7 iplik sweatshirt kuma\u015f\u0131'),
    (U 'polar kuma\u015f'), (U 'lamineli softshell kuma\u015f'), (U 'i\u015f giysilik dokuma kuma\u015f'),
    (U 'denim dokuma kuma\u015f'), (U '\u00f6nl\u00fck ve a\u015f\u00e7\u0131 giyimine uygun dokuma kuma\u015f'),
    (U 'montluk d\u0131\u015f kuma\u015f, astar ve \u0131s\u0131 yal\u0131t\u0131m dolgusu'),
    (U 'd\u0131\u015f kuma\u015f ve \u0131s\u0131 yal\u0131t\u0131m dolgusu')
)

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
        Test-StringQuality $schema '$' $relativePath
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
            if (!(Test-Visible $visibleText ([string]$schema.headline))) { Add-Error $relativePath 'BlogPosting headline is not visible' }
            $published = [datetime]::MinValue; $modified = [datetime]::MinValue
            $publishedValid = Test-DateValue ([string]$schema.datePublished) ([ref]$published)
            $modifiedValid = Test-DateValue ([string]$schema.dateModified) ([ref]$modified)
            if (!$publishedValid -or !$modifiedValid) { Add-Error $relativePath 'BlogPosting date format is invalid' }
            elseif ($modified -lt $published) { Add-Error $relativePath 'BlogPosting dateModified precedes datePublished' }
            foreach ($image in @($schema.image)) { if (!(Test-LocalAsset ([string]$image))) { Add-Error $relativePath "BlogPosting image file is missing: $image" } }
            continue
        }
        if ($type -eq 'Product') {
            $counts.products++
            foreach ($field in @('name','description','image','sku','brand','manufacturer','material','category','url','@id')) { if (!$schema.$field) { Add-Error $relativePath "Product missing $field" } }
            $material = ([string]$schema.material -replace '\s+', ' ').Trim()
            if ($material.Length -gt 80 -or $material -match '[{}<>]') { Add-Error $relativePath 'Product material is malformed or overly long' }
            if ($material -and $allowedProductMaterials -notcontains $material) { Add-Error $relativePath "Product material is outside the verified vocabulary: $material" }
            if ($schema.url -ne $canonical -or $schema.'@id' -ne "$canonical#product") { Add-Error $relativePath 'Product identity differs from canonical' }
            foreach ($field in @('name','description','sku','material')) { if ($schema.$field -and !(Test-Visible $visibleText ([string]$schema.$field))) { Add-Error $relativePath "Product $field is not visible" } }
            foreach ($image in @($schema.image)) {
                $leaf = Split-Path ([uri]$image).AbsolutePath -Leaf
                if ($html -notlike "*$leaf*") { Add-Error $relativePath 'Product image is not visible' }
                if (!(Test-LocalAsset ([string]$image))) { Add-Error $relativePath "Product image file is missing: $image" }
            }
            if ($schema.brand.name -and !(Test-Visible $visibleText ([string]$schema.brand.name))) { Add-Error $relativePath 'Product brand is not visible' }
            if ($schema.brand.name -ne (U 'Karde\u015fler Tekstil') -or $schema.manufacturer.'@id' -ne $organizationId) { Add-Error $relativePath 'Product brand or manufacturer identity is inconsistent' }
            $folderSku = [IO.Path]::GetFileName([IO.Path]::GetDirectoryName($file.FullName)).Split('-')[0..2] -join '-'
            if ($folderSku -and ([string]$schema.sku).ToLowerInvariant() -ne $folderSku.ToLowerInvariant()) { Add-Error $relativePath "Product SKU differs from its URL: $($schema.sku)" }
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
            $seenQuestions = @{}
            foreach ($question in @($schema.mainEntity)) {
                $questionText = Plain-Text ([string]$question.name)
                $answerText = Plain-Text ([string]$question.acceptedAnswer.text)
                $questionKey = Normalized-Text $questionText
                if (!$questionText -or !$answerText -or $answerText.Length -lt 20) { Add-Error $relativePath 'FAQ contains an empty or trivial question/answer'; break }
                if ($seenQuestions.ContainsKey($questionKey)) { Add-Error $relativePath 'FAQ contains a duplicate question'; break }
                $seenQuestions[$questionKey] = $true
                if (!(Test-Visible $visibleText $questionText) -or !(Test-Visible $visibleText $answerText)) { Add-Error $relativePath 'FAQ schema differs from visible content'; break }
            }
        }
        if ($type -eq 'Organization' -or $schemaTypes -contains 'LocalBusiness') {
            if ($schema.'@id' -ne $organizationId -or $schema.url -ne "$origin/") { Add-Error $relativePath 'Organization identity differs from the canonical entity' }
            if ($schema.name -ne (U 'Karde\u015fler Tekstil')) { Add-Error $relativePath 'Organization name is inconsistent' }
            if ($relativePath -eq 'index.html' -and (!$schema.telephone -or !$schema.address)) { Add-Error $relativePath 'Primary Organization identity fields are incomplete' }
            foreach ($sameAs in @($schema.sameAs)) {
                $sameAsValue = [string]$sameAs
                if ($sameAsValue -match 'google\.[^/]+/search|/search\?' -and $sameAsValue -notlike '*kgmid=/g/1tf8j9_f*') {
                    Add-Error $relativePath 'Organization sameAs contains a generic search-result URL'
                }
            }
        }
        if ($type -eq 'WebSite') {
            if ($schema.'@id' -ne "$origin/#website" -or $schema.url -ne "$origin/" -or $schema.publisher.'@id' -ne $organizationId) { Add-Error $relativePath 'WebSite identity is inconsistent' }
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
