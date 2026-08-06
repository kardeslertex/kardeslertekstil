param([switch]$Quiet)

$ErrorActionPreference = 'Stop'
$siteRoot = Split-Path $PSScriptRoot -Parent
$knowledgeRoot = Join-Path $siteRoot 'bilgi-merkezi'
$origin = 'https://kardeslertekstil.com.tr'
$errors = [Collections.Generic.List[string]]::new()
$incoming = @{}
$contextualized = 0
$anchorMap = @{}

$htmlFiles = Get-ChildItem -LiteralPath $siteRoot -Filter '*.html' -File -Recurse | Where-Object { $_.FullName -notlike '*\hero-archive\*' }
foreach ($file in $htmlFiles) {
    $html = [IO.File]::ReadAllText($file.FullName, [Text.Encoding]::UTF8)
    $canonicalMatch = [regex]::Match($html, '<link[^>]+rel=["'']canonical["''][^>]+href=["'']([^"'']+)', 'IgnoreCase')
    if (!$canonicalMatch.Success) { continue }
    $baseUrl = [uri][Net.WebUtility]::HtmlDecode($canonicalMatch.Groups[1].Value)
    foreach ($link in [regex]::Matches($html, '<a[^>]+href=["'']([^"''#]+)["''][^>]*>(.*?)</a>', 'IgnoreCase,Singleline')) {
        try { $target = [uri]::new($baseUrl, [Net.WebUtility]::HtmlDecode($link.Groups[1].Value)).GetLeftPart([UriPartial]::Path) } catch { continue }
        if (!$target.StartsWith($origin)) { continue }
        if (!$incoming[$target]) { $incoming[$target] = 0 }
        $incoming[$target]++
        $anchor = ([Net.WebUtility]::HtmlDecode([regex]::Replace($link.Groups[2].Value, '<[^>]+>', ' ')) -replace '\s+', ' ').Trim().ToLowerInvariant()
        if (!$anchorMap[$target]) { $anchorMap[$target] = [Collections.Generic.HashSet[string]]::new() }
        [void]$anchorMap[$target].Add($anchor)
    }
}

$articles = Get-ChildItem -LiteralPath $knowledgeRoot -Filter 'index.html' -File -Recurse | Where-Object { $_.DirectoryName -ne $knowledgeRoot }
foreach ($file in $articles) {
    $slug = Split-Path $file.DirectoryName -Leaf
    $html = [IO.File]::ReadAllText($file.FullName, [Text.Encoding]::UTF8)
    if ($html -notmatch 'data-seo-enhancement=["'']knowledge-v3["'']') { $errors.Add("Article link block is outdated: $slug") }
    $categoryCount = [regex]::Matches($html, 'data-link-role=["'']category["'']', 'IgnoreCase').Count
    $productCount = [regex]::Matches($html, 'data-link-role=["'']product["'']', 'IgnoreCase').Count
    $guideCount = [regex]::Matches($html, 'data-link-role=["'']guide["'']', 'IgnoreCase').Count
    $quoteCount = [regex]::Matches($html, 'data-link-role=["'']quote["'']', 'IgnoreCase').Count
    if ($categoryCount -ne 1) { $errors.Add("Article needs one category link: $slug") }
    if ($productCount -lt 1 -or $productCount -gt 3) { $errors.Add("Article product link count is outside 1-3: $slug") }
    if ($guideCount -lt 2 -or $guideCount -gt 4) { $errors.Add("Article guide link count is outside 2-4: $slug") }
    if ($quoteCount -ne 1) { $errors.Add("Article needs one quote link: $slug") }
    if ($html -match 'data-contextual-category') { $contextualized++ }
    $url = "$origin/bilgi-merkezi/$slug/"
    if ([int]$incoming[$url] -lt 3) { $errors.Add("Article has fewer than three incoming links: $slug") }
}

$productPages = 0
foreach ($file in Get-ChildItem -LiteralPath (Join-Path $siteRoot 'urun') -Filter 'index.html' -File -Recurse) {
    $html = [IO.File]::ReadAllText($file.FullName, [Text.Encoding]::UTF8)
    if ($html -notmatch '"@type"\s*:\s*"Product"') { continue }
    $productPages++
    if ($html -notmatch 'data-internal-links=["'']product-guides-v1["'']') { $errors.Add("Product guide links are missing: $($file.Directory.Name)") }
}

$categorySlugs = @('is-pantolonu','polo-yaka-is-tisortu','kurumsal-is-sweatshirtu','polar-is-montu','is-tulumu','reflektorlu-is-yelegi','is-montu-kaban','asci-kiyafeti-is-onlugu')
foreach ($slug in $categorySlugs) {
    $html = [IO.File]::ReadAllText((Join-Path $siteRoot "$slug\index.html"), [Text.Encoding]::UTF8)
    if ($html -notmatch 'data-internal-links=["'']category-guides-v1["'']') { $errors.Add("Category guide hub is missing: $slug") }
    $url = "$origin/$slug/"
    if ($anchorMap[$url] -and $anchorMap[$url].Count -lt 2) { $errors.Add("Category anchor text lacks variation: $slug") }
}

$knowledgeIndex = [IO.File]::ReadAllText((Join-Path $knowledgeRoot 'index.html'), [Text.Encoding]::UTF8)
if ($knowledgeIndex -notmatch 'data-internal-links=["'']knowledge-hubs-v1["'']') { $errors.Add('Knowledge center topic hubs are missing.') }
if ($contextualized -lt 500) { $errors.Add("Too few contextual article links: $contextualized") }

$result = [ordered]@{ articles=$articles.Count; contextualizedArticles=$contextualized; productPagesWithGuideLinks=$productPages; categoryHubs=$categorySlugs.Count; minimumArticleIncomingLinks=3; errors=@($errors) }
if (!$Quiet) { 'INTERNAL_LINK_AUDIT'; $result | ConvertTo-Json -Depth 4 }
if ($errors.Count) { exit 1 }
