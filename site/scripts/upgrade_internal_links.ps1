param([string]$SiteRoot)
$ErrorActionPreference = 'Stop'
$siteRoot = if ($SiteRoot) { (Resolve-Path $SiteRoot).Path } else { Split-Path $PSScriptRoot -Parent }
$knowledgeRoot = Join-Path $siteRoot 'bilgi-merkezi'
$utf8 = [Text.UTF8Encoding]::new($false)

function Decode([string]$value) { [Net.WebUtility]::HtmlDecode($value) }
function Encode([string]$value) { [Net.WebUtility]::HtmlEncode($value) }
function Plain([string]$value) { return (Decode ([regex]::Replace($value, '<[^>]+>', ' ')) -replace '\s+', ' ').Trim() }

function Topic([string]$slug) {
    if ($slug -match 'scrub|hastane|klinik|hemsire|saglik-personeli|laboratuvar|ilac-uretimi') { return @{ category='scrub-takimi'; prefixes=@('KT-ON'); term='scrub' } }
    if ($slug -match 'pantolon|paca|diz|bel-') { return @{ category='is-pantolonu'; prefixes=@('KT-PT','KT-SS'); term='pantolon' } }
    if ($slug -match 'tisort|polo|penye|suprem|lakost') { return @{ category='polo-yaka-is-tisortu'; prefixes=@('KT-TS'); term=('ti' + [char]0x015F + [char]0x00F6 + 'rt') } }
    if ($slug -match 'polar') { return @{ category='polar-is-montu'; prefixes=@('KT-PL'); term='polar' } }
    if ($slug -match 'sweat|hoodie|uc-iplik') { return @{ category='kurumsal-is-sweatshirtu'; prefixes=@('KT-SW'); term='sweatshirt' } }
    if ($slug -match 'tulum|salopet') { return @{ category='is-tulumu'; prefixes=@('KT-TL'); term='tulum' } }
    if ($slug -match 'yelek|reflektor|gorunurluk|ikaz') { return @{ category='reflektorlu-is-yelegi'; prefixes=@('KT-YL'); term='yelek' } }
    if ($slug -match 'onluk|asci|mutfak|sef|laboratuvar|medikal') { return @{ category='asci-kiyafeti-is-onlugu'; prefixes=@('KT-ON'); term=('iş ' + [char]0x00F6 + 'nl' + [char]0x00FC + [char]0x011F + [char]0x00FC) } }
    if ($slug -match 'mont|kaban|parka|softshell|yagmurluk|soguk') { return @{ category='is-montu-kaban'; prefixes=@('KT-MK','KT-SS'); term=('iş montu') } }
    return @{ category='urunlerimiz'; prefixes=@('KT-TS','KT-PT','KT-SW','KT-MK','KT-YL','KT-TL','KT-PL','KT-ON','KT-SS'); term=('iş kıyafeti') }
}

$categories = @{}
foreach ($slug in @('is-pantolonu','polo-yaka-is-tisortu','polar-is-montu','kurumsal-is-sweatshirtu','is-tulumu','reflektorlu-is-yelegi','asci-kiyafeti-is-onlugu','scrub-takimi','is-montu-kaban')) {
    $path = Join-Path $siteRoot "$slug\index.html"
    $source = [IO.File]::ReadAllText($path, [Text.Encoding]::UTF8)
    $categories[$slug] = Plain ([regex]::Match($source, '<h1[^>]*>(.*?)</h1>', 'IgnoreCase,Singleline').Groups[1].Value)
}
$categories['urunlerimiz'] = Decode 'İş Kıyafeti Modelleri'

$products = @()
foreach ($file in Get-ChildItem -LiteralPath (Join-Path $siteRoot 'urun') -Filter 'index.html' -File -Recurse) {
    $source = [IO.File]::ReadAllText($file.FullName, [Text.Encoding]::UTF8)
    foreach ($match in [regex]::Matches($source, '<script[^>]*type=["'']application/ld\+json["''][^>]*>(.*?)</script>', 'IgnoreCase,Singleline')) {
        try { $schema = $match.Groups[1].Value | ConvertFrom-Json } catch { continue }
        if ($schema.'@type' -eq 'Product') { $products += [pscustomobject]@{ sku=[string]$schema.sku; name=[string]$schema.name; url=[string]$schema.url; path=$file.FullName }; break }
    }
}

$articles = @()
foreach ($file in Get-ChildItem -LiteralPath $knowledgeRoot -Filter 'index.html' -File -Recurse | Where-Object { $_.DirectoryName -ne $knowledgeRoot }) {
    $source = [IO.File]::ReadAllText($file.FullName, [Text.Encoding]::UTF8)
    $slug = Split-Path $file.DirectoryName -Leaf
    $title = Plain ([regex]::Match($source, '<h1[^>]*>(.*?)</h1>', 'IgnoreCase,Singleline').Groups[1].Value)
    $clusterMatch = [regex]::Match($source, '<nav class=["'']knowledge-related-links["''][^>]*>\s*<strong>(.*?)</strong>', 'IgnoreCase,Singleline')
    $cluster = if ($clusterMatch.Success) { Plain $clusterMatch.Groups[1].Value } else { 'Genel Rehberler' }
    $articles += [pscustomobject]@{ slug=$slug; title=$title; cluster=$cluster; path=$file.FullName }
}
$articles = @($articles | Sort-Object slug)
$byCluster = $articles | Group-Object cluster -AsHashTable -AsString
$articleBySlug = @{}; foreach ($article in $articles) { $articleBySlug[$article.slug] = $article }
$changedArticles = 0

for ($articleIndex = 0; $articleIndex -lt $articles.Count; $articleIndex++) {
    $article = $articles[$articleIndex]
    $source = [IO.File]::ReadAllText($article.path, [Text.Encoding]::UTF8)
    $topic = Topic $article.slug
    $categoryName = $categories[$topic.category]
    $matchingProducts = @($products | Where-Object { $sku=$_.sku; @($topic.prefixes | Where-Object { $sku.StartsWith($_) }).Count -gt 0 } | Sort-Object sku)
    if ($matchingProducts.Count -lt 2) { $matchingProducts = $products }
    $productStart = $articleIndex % $matchingProducts.Count
    $selectedProducts = @($matchingProducts[$productStart], $matchingProducts[($productStart + 1) % $matchingProducts.Count])

    $clusterArticles = @($byCluster[$article.cluster] | Sort-Object slug)
    $clusterIndex = [array]::IndexOf($clusterArticles.slug, $article.slug)
    $peers = for ($offset=1; $offset -le [Math]::Min(3, $clusterArticles.Count - 1); $offset++) { $clusterArticles[($clusterIndex + $offset) % $clusterArticles.Count] }
    $peerLinks = for ($peerIndex=0; $peerIndex -lt $peers.Count; $peerIndex++) {
        $peer = $peers[$peerIndex]
        $anchor = switch (($articleIndex + $peerIndex) % 3) { 0 { $peer.title }; 1 { "$($peer.title) rehberi" }; default { "$($peer.title): ayrıntılı bilgi" } }
        '<a data-link-role="guide" href="../' + $peer.slug + '/">' + (Encode $anchor) + '</a>'
    }
    $productCards = for ($productIndex=0; $productIndex -lt $selectedProducts.Count; $productIndex++) {
        $product = $selectedProducts[$productIndex]
        $relativeUrl = '../../' + ([uri]$product.url).AbsolutePath.TrimStart('/')
        $label = if (($articleIndex + $productIndex) % 2) { $product.name } else { 'Model: ' + $product.name }
        '<a data-link-role="product" href="' + $relativeUrl + '"><strong>' + (Encode $label) + '</strong><span>Teknik model ve üretim ayrıntılarını inceleyin.</span></a>'
    }
    $categoryAnchor = if ($articleIndex % 2) { $categoryName } else { "$categoryName seçenekleri" }
    $block = '<section class="knowledge-seo-links" data-seo-enhancement="knowledge-v3" aria-label="İlgili ürün ve rehberler"><div class="eyebrow eyebrow-accent">İLGİLİ ÇÖZÜMLER</div><h2>Bilgiyi üretim planına dönüştürün</h2><p>Bu rehber, Kardeşler Tekstil üretim ekibinin kurumsal iş kıyafeti planlama yaklaşımı esas alınarak hazırlanmış ve içerik bütünlüğü açısından kontrol edilmiştir.</p><div class="knowledge-seo-link-grid"><a data-link-role="category" href="../../' + $topic.category + '/"><strong>' + (Encode $categoryAnchor) + '</strong><span>Kategori seçeneklerini ve üretim kapsamını inceleyin.</span></a>' + ($productCards -join '') + '</div><nav class="knowledge-related-links" aria-label="Aynı konudaki rehberler"><strong>' + (Encode $article.cluster) + '</strong>' + ($peerLinks -join '') + '</nav><p class="knowledge-review-note">Hazırlayan ve kontrol eden: <a href="../../hakkimizda">Kardeşler Tekstil Üretim Ekibi</a> · <a data-link-role="quote" href="../../iletisim#teklif-formu">Projeniz için teklif isteyin</a></p></section>'

    if ($source -match 'data-seo-enhancement=["'']knowledge-v[123]["'']') {
        $source = [regex]::Replace($source, '(?s)<section class="knowledge-seo-links" data-seo-enhancement="knowledge-v[123]".*?</section>', [Text.RegularExpressions.MatchEvaluator]{ param($match) $block }, 1)
    } else {
        $source = $source.Replace('</article>', "$block</article>")
    }

    if ($topic.term -and $source -notmatch 'data-contextual-category') {
        $paragraphs = [regex]::Matches($source, '<p(?<attrs>[^>]*)>(?<body>.*?)</p>', 'IgnoreCase,Singleline')
        foreach ($paragraph in $paragraphs) {
            $body = $paragraph.Groups['body'].Value
            if ($body -match '<a\b') { continue }
            $termMatch = [regex]::Match($body, [regex]::Escape($topic.term), 'IgnoreCase')
            if (!$termMatch.Success) { continue }
            $linkedBody = $body.Substring(0,$termMatch.Index) + '<a data-contextual-category href="../../' + $topic.category + '/">' + $termMatch.Value + '</a>' + $body.Substring($termMatch.Index + $termMatch.Length)
            $replacement = '<p' + $paragraph.Groups['attrs'].Value + '>' + $linkedBody + '</p>'
            $source = $source.Substring(0,$paragraph.Index) + $replacement + $source.Substring($paragraph.Index + $paragraph.Length)
            break
        }
    }
    [IO.File]::WriteAllText($article.path, $source, $utf8)
    $changedArticles++
}

$guideMap = @{
    'KT-PT'=@('is-pantolonu-secim-rehberi-2026','gabardin-is-pantolonu-rehberi','is-kiyafetlerinde-beden-kalip-rehberi')
    'KT-TS'=@('polo-yaka-tisort-rehberi-2026','kurumsal-personel-tisortu-rehberi','polo-tisortte-logo-yerlesimi')
    'KT-SW'=@('sweatshirt-is-kiyafeti-rehberi','uc-iplik-kumas-nedir','nakisli-is-kiyafeti-yikama')
    'KT-PL'=@('polar-mont-ceket-rehberi','polar-kumas-nedir','polar-is-kiyafeti-yikama-tuylenme')
    'KT-TL'=@('is-tulumu-secim-rehberi','is-tulumu-govde-boyu-ag-derinligi','is-kiyafetlerinde-dikis-turleri')
    'KT-YL'=@('is-yelegi-secim-rehberi-2026','cok-cepli-is-yelegi-rehberi','reflektorlu-is-yelegi-secim-rehberi')
    'KT-MK'=@('is-montu-secim-rehberi','is-montunda-astar-secimi','is-montunda-logo-yerlesimi')
    'KT-ON'=@('is-onlugu-secim-rehberi','asci-ceketi-secim-rehberi','nakis-mi-baski-mi')
    'KT-SS'=@('softshell-mont-rehberi','softshell-kumas-nedir','softshell-is-kiyafeti-yikama')
}
$changedProducts = 0
foreach ($product in $products) {
    $prefix = ($guideMap.Keys | Where-Object { $product.sku.StartsWith($_) } | Select-Object -First 1)
    if (!$prefix) { continue }
    $links = @($guideMap[$prefix] | ForEach-Object { $guide=$articleBySlug[$_]; if ($guide) { '<a class="local-product-card" data-link-role="guide" href="../../bilgi-merkezi/' + $guide.slug + '/"><h3>' + (Encode $guide.title) + '</h3><p>Kullanım, seçim ve bakım ayrıntılarını inceleyin.</p><strong>Rehbere gidin →</strong></a>' } })
    $section = '<section class="local-section" data-internal-links="product-guides-v1"><div class="container"><h2>İlgili seçim ve bakım rehberleri</h2><div class="local-product-grid">' + ($links -join '') + '</div></div></section>'
    $source = [IO.File]::ReadAllText($product.path, [Text.Encoding]::UTF8)
    if ($source -match 'data-internal-links=["'']product-guides-v1["'']') { $source = [regex]::Replace($source, '(?s)<section class="local-section" data-internal-links="product-guides-v1".*?</section>', [Text.RegularExpressions.MatchEvaluator]{param($m)$section}, 1) }
    else { $source = $source.Replace('<section class="local-section"><div class="container local-faq">', "$section<section class=`"local-section`"><div class=`"container local-faq`">") }
    [IO.File]::WriteAllText($product.path, $source, $utf8)
    $changedProducts++
}

$categoryGuideMap = @{
    'is-pantolonu'='KT-PT'; 'polo-yaka-is-tisortu'='KT-TS'; 'kurumsal-is-sweatshirtu'='KT-SW';
    'polar-is-montu'='KT-PL'; 'is-tulumu'='KT-TL'; 'reflektorlu-is-yelegi'='KT-YL';
    'is-montu-kaban'='KT-MK'; 'asci-kiyafeti-is-onlugu'='KT-ON'
}
$changedCategories = 0
foreach ($categorySlug in $categoryGuideMap.Keys) {
    $prefix = $categoryGuideMap[$categorySlug]
    $links = @($guideMap[$prefix] | ForEach-Object { $guide=$articleBySlug[$_]; if ($guide) { '<a class="local-product-card" data-link-role="guide" href="../bilgi-merkezi/' + $guide.slug + '/"><h3>' + (Encode $guide.title) + '</h3><p>Seçim, kullanım ve teknik planlama bilgisini inceleyin.</p><strong>Rehbere gidin →</strong></a>' } })
    $section = '<section class="local-section" data-internal-links="category-guides-v1"><div class="container"><h2>Bu ürün grubuyla ilgili rehberler</h2><p>Model seçimini kumaş, beden, kullanım ve bakım gereksinimleriyle birlikte değerlendirin.</p><div class="local-product-grid">' + ($links -join '') + '</div></div></section>'
    $path = Join-Path $siteRoot "$categorySlug\index.html"
    $source = [IO.File]::ReadAllText($path, [Text.Encoding]::UTF8)
    if ($source -match 'data-internal-links=["'']category-guides-v1["'']') { $source = [regex]::Replace($source, '(?s)<section class="local-section" data-internal-links="category-guides-v1".*?</section>', [Text.RegularExpressions.MatchEvaluator]{param($m)$section}, 1) }
    elseif ($source -match '<section class="local-section"><div class="container local-faq">') { $source = $source.Replace('<section class="local-section"><div class="container local-faq">', "$section<section class=`"local-section`"><div class=`"container local-faq`">") }
    else { $source = $source.Replace('</main>', "$section</main>") }
    [IO.File]::WriteAllText($path, $source, $utf8)
    $changedCategories++
}

$knowledgeIndexPath = Join-Path $knowledgeRoot 'index.html'
$knowledgeIndex = [IO.File]::ReadAllText($knowledgeIndexPath, [Text.Encoding]::UTF8)
$hubSlugs = @('is-pantolonu-secim-rehberi-2026','polo-yaka-tisort-rehberi-2026','sweatshirt-is-kiyafeti-rehberi','polar-mont-ceket-rehberi','is-tulumu-secim-rehberi','is-yelegi-secim-rehberi-2026','is-montu-secim-rehberi','is-onlugu-secim-rehberi')
$hubLinks = @($hubSlugs | ForEach-Object { $guide=$articleBySlug[$_]; '<a class="local-product-card" href="' + $guide.slug + '/"><h3>' + (Encode $guide.title) + '</h3><p>Ürün seçimi, malzeme ve kullanım kararları için başlangıç rehberi.</p><strong>Rehberi inceleyin →</strong></a>' })
$hubSection = '<section class="local-section" data-internal-links="knowledge-hubs-v1"><div class="container"><div class="eyebrow eyebrow-accent">KONU MERKEZLERİ</div><h2>Önemli iş kıyafeti rehberleri</h2><p>Ürün grubunu seçin; bağlantılı kumaş, beden, bakım ve uygulama rehberlerine konu kümeleri üzerinden ilerleyin.</p><div class="local-product-grid">' + ($hubLinks -join '') + '</div></div></section>'
if ($knowledgeIndex -match 'data-internal-links=["'']knowledge-hubs-v1["'']') { $knowledgeIndex = [regex]::Replace($knowledgeIndex, '(?s)<section class="local-section" data-internal-links="knowledge-hubs-v1".*?</section>', [Text.RegularExpressions.MatchEvaluator]{param($m)$hubSection}, 1) }
else { $knowledgeIndex = $knowledgeIndex.Replace('</main>', "$hubSection</main>") }
[IO.File]::WriteAllText($knowledgeIndexPath, $knowledgeIndex, $utf8)

foreach ($pageName in @('cerez-politikasi.html','gizlilik-ve-kvkk.html','tesekkur.html')) {
    $path = Join-Path $siteRoot $pageName
    $source = [IO.File]::ReadAllText($path, [Text.Encoding]::UTF8)
    if ($source -match '"@type"\s*:\s*"BreadcrumbList"') { continue }
    $canonical = [Net.WebUtility]::HtmlDecode([regex]::Match($source, '<link[^>]+rel=["'']canonical["''][^>]+href=["'']([^"'']+)', 'IgnoreCase').Groups[1].Value)
    $title = Plain ([regex]::Match($source, '<h1[^>]*>(.*?)</h1>', 'IgnoreCase,Singleline').Groups[1].Value)
    if (!$title) { $title = Plain ([regex]::Match($source, '<title[^>]*>(.*?)</title>', 'IgnoreCase,Singleline').Groups[1].Value) }
    $breadcrumb = [ordered]@{ '@context'='https://schema.org'; '@type'='BreadcrumbList'; itemListElement=@([ordered]@{ '@type'='ListItem'; position=1; name='Ana Sayfa'; item='https://kardeslertekstil.com.tr/' },[ordered]@{ '@type'='ListItem'; position=2; name=$title; item=$canonical }) }
    $json = $breadcrumb | ConvertTo-Json -Compress -Depth 6
    $source = $source.Replace('</head>', '<script type="application/ld+json">' + $json + '</script></head>')
    [IO.File]::WriteAllText($path, $source, $utf8)
}

"Upgraded $changedArticles articles, $changedProducts product pages, and $changedCategories category hubs."
