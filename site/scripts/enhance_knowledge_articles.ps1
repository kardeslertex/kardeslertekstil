$ErrorActionPreference = 'Stop'
$site = Split-Path -Parent $PSScriptRoot
$knowledge = Join-Path $site 'bilgi-merkezi'

function Html([string]$value) { [Net.WebUtility]::HtmlEncode($value) }
function Json($value) { $value | ConvertTo-Json -Depth 10 -Compress }
function Meta([string]$html, [string]$name) {
  $escaped = [regex]::Escape($name)
  $match = [regex]::Match($html, "(?is)<meta[^>]+name=[`"']$escaped[`"'][^>]+content=[`"']([^`"']*)")
  if (!$match.Success) { $match = [regex]::Match($html, "(?is)<meta[^>]+content=[`"']([^`"']*)[`"'][^>]+name=[`"']$escaped[`"']") }
  return [Net.WebUtility]::HtmlDecode($match.Groups[1].Value)
}
function Cluster([string]$slug, [string]$title) {
  $text = "$slug $title".ToLowerInvariant()
  if ($text -match 'yikama|bakim|leke|kurutma|utu|temiz') { return 'Bakım ve Kullanım' }
  if ($text -match 'kumas|penye|gabardin|ripstop|polyester|pamuk|elyaf|iplik|gsm|gramaj|hasligi|apre') { return 'Kumaş ve Malzeme' }
  if ($text -match 'beden|kalip|ergonomi|hareket|olcu|paca|manset') { return 'Beden ve Ergonomi' }
  if ($text -match 'logo|nakis|baski|transfer|serigrafi|arma|markalama') { return 'Logo ve Kurumsal Kimlik' }
  if ($text -match 'tedarik|satin|teklif|maliyet|stok|siparis|butce|teslimat|zimmet|iade|tedarikci') { return 'Satın Alma ve Operasyon' }
  if ($text -match 'test|standart|kalite|kontrol|aql|sertifika|uygunluk') { return 'Kalite ve Standartlar' }
  if ($text -match 'personel|ekip|sektor|fabrika|otel|restoran|lojistik|belediye|saha|atolye|uretim') { return 'Sektörel Çözümler' }
  return 'Ürün ve Üretim'
}
function ProductTarget([string]$slug, [string]$title) {
  $text = "$slug $title".ToLowerInvariant()
  if ($text -match 'pantolon|paca|diz') { return @{ slug='is-pantolonu'; name='İş Pantolonu' } }
  if ($text -match 'softshell') { return @{ slug='softshell-is-montu'; name='Softshell İş Montu' } }
  if ($text -match 'yelek|reflektor|gorunurluk|ikaz') { return @{ slug='reflektorlu-is-yelegi'; name='Reflektörlü İş Yeleği' } }
  if ($text -match 'polar') { return @{ slug='polar-is-montu'; name='Polar İş Montu' } }
  if ($text -match 'sweat|hoodie') { return @{ slug='kurumsal-is-sweatshirtu'; name='Kurumsal İş Sweatshirtü' } }
  if ($text -match 'asci|mutfak|onluk|restoran|gida') { return @{ slug='asci-kiyafeti-is-onlugu'; name='Aşçı Kıyafeti ve İş Önlüğü' } }
  if ($text -match 'tulum|salopet') { return @{ slug='is-tulumu'; name='İş Tulumu' } }
  if ($text -match 'mont|kaban|parka|kapuson') { return @{ slug='is-montu-kaban'; name='İş Montu ve Kaban' } }
  if ($text -match 'baret|ayakkabi|isg|guvenlik ekipman') { return @{ slug='is-guvenligi-ekipmanlari'; name='İş Güvenliği Ekipmanları' } }
  return @{ slug='polo-yaka-is-tisortu'; name='Polo Yaka İş Tişörtü' }
}
function LocationTarget([string]$slug, [string]$title) {
  $targets = @(
    @{ key='pendik'; slug='pendik-is-elbiseleri'; name='Pendik İş Elbiseleri' },
    @{ key='tuzla'; slug='tuzla-is-elbiseleri'; name='Tuzla İş Elbiseleri' },
    @{ key='kartal'; slug='kartal-is-elbiseleri'; name='Kartal İş Elbiseleri' },
    @{ key='maltepe'; slug='maltepe-is-elbiseleri'; name='Maltepe İş Elbiseleri' },
    @{ key='umraniye'; slug='umraniye-is-elbiseleri'; name='Ümraniye İş Elbiseleri' },
    @{ key='sancaktepe'; slug='sancaktepe-is-elbiseleri'; name='Sancaktepe İş Elbiseleri' },
    @{ key='atasehir'; slug='atasehir-is-elbiseleri'; name='Ataşehir İş Elbiseleri' }
  )
  $text = "$slug $title".ToLowerInvariant()
  foreach ($target in $targets) { if ($text -match $target.key) { return $target } }
  return @{ slug='istanbul-is-elbiseleri'; name='İstanbul İş Elbiseleri' }
}

$articles = @()
foreach ($dir in Get-ChildItem $knowledge -Directory) {
  $path = Join-Path $dir.FullName 'index.html'
  if (!(Test-Path $path)) { continue }
  $html = [IO.File]::ReadAllText($path, [Text.Encoding]::UTF8)
  $title = [Net.WebUtility]::HtmlDecode([regex]::Match($html, '(?is)<h1[^>]*>(.*?)</h1>').Groups[1].Value)
  $title = [regex]::Replace($title, '<[^>]+>', ' ')
  $articles += [pscustomobject]@{ slug=$dir.Name; title=$title; cluster=(Cluster $dir.Name $title); path=$path }
}
$byCluster = $articles | Group-Object cluster -AsHashTable -AsString
$utf8 = New-Object Text.UTF8Encoding($false)
$changed = 0

foreach ($article in $articles) {
  $html = [IO.File]::ReadAllText($article.path, [Text.Encoding]::UTF8)
  if ($html -match 'data-seo-enhancement="knowledge-v1"') { continue }
  $description = Meta $html 'description'
  $canonical = [regex]::Match($html, '(?is)<link[^>]+rel=["'']canonical["''][^>]+href=["'']([^"'']+)').Groups[1].Value
  if (!$canonical) { $canonical = "https://kardeslertekstil.com.tr/bilgi-merkezi/$($article.slug)/" }
  $product = ProductTarget $article.slug $article.title
  $location = LocationTarget $article.slug $article.title
  $imagePath = switch ($product.slug) {
    'is-pantolonu' { 'pantolon/kt-pt-021-gri-diz-takviyeli-is-pantolonu.webp' }
    'softshell-is-montu' { 'softshell/kt-ss-015-antrasit-kapusonlu-softshell-mont.webp' }
    'reflektorlu-is-yelegi' { 'yelek/kt-yl-014-siyah-softshell-is-yelegi.webp' }
    'polar-is-montu' { 'polar/kt-pl-015-antrasit-omuz-garnili-polar-mont.webp' }
    'asci-kiyafeti-is-onlugu' { 'onluk/01.webp' }
    'is-tulumu' { 'tulum/kt-tl-015-saks-mavi-bahcivan-tulumu.webp' }
    'is-montu-kaban' { 'montkaban/01.webp' }
    default { 'tshirt/siyah-polo-yaka-tisort.webp' }
  }
  $image = "https://kardeslertekstil.com.tr/assets/products/gallery/$imagePath"
  $headAdd = ''
  if ($html -notmatch '<meta\s+property=["'']og:image["'']') { $headAdd += "<meta property=`"og:image`" content=`"$image`"><meta property=`"og:image:alt`" content=`"$(Html $article.title)`">" }
  if ($html -notmatch '<meta\s+name=["'']twitter:card["'']') { $headAdd += "<meta name=`"twitter:card`" content=`"summary_large_image`"><meta name=`"twitter:title`" content=`"$(Html $article.title)`"><meta name=`"twitter:description`" content=`"$(Html $description)`"><meta name=`"twitter:image`" content=`"$image`">" }
  if ($html -notmatch '"@type"\s*:\s*"BlogPosting"') {
    $published = [regex]::Match($html, '"datePublished"\s*:\s*"([^"]+)"').Groups[1].Value
    if (!$published) { $published = '2026-08-02' }
    $blog = [ordered]@{'@context'='https://schema.org';'@type'='BlogPosting';headline=$article.title;description=$description;url=$canonical;mainEntityOfPage=@{'@type'='WebPage';'@id'=$canonical};image=@($image);datePublished=$published;dateModified='2026-08-02';inLanguage='tr-TR';articleSection=$article.cluster;author=@{'@type'='Organization';name='Kardeşler Tekstil';url='https://kardeslertekstil.com.tr/hakkimizda'};publisher=@{'@type'='Organization';name='Kardeşler Tekstil';'@id'='https://kardeslertekstil.com.tr/#organization'}}
    $headAdd += "<script type=`"application/ld+json`">$(Json $blog)</script>"
  }
  if ($html -notmatch '"@type"\s*:\s*"BreadcrumbList"') {
    $breadcrumb = [ordered]@{'@context'='https://schema.org';'@type'='BreadcrumbList';itemListElement=@(@{'@type'='ListItem';position=1;name='Ana Sayfa';item='https://kardeslertekstil.com.tr/'},@{'@type'='ListItem';position=2;name='Bilgi Merkezi';item='https://kardeslertekstil.com.tr/bilgi-merkezi/'},@{'@type'='ListItem';position=3;name=$article.title;item=$canonical})}
    $headAdd += "<script type=`"application/ld+json`">$(Json $breadcrumb)</script>"
  }
  if ($headAdd) { $html = $html.Replace('</head>', "$headAdd</head>") }
  $peers = @($byCluster[$article.cluster] | Where-Object slug -ne $article.slug | Sort-Object slug | Select-Object -First 3)
  $peerLinks = ($peers | ForEach-Object { "<a href=`"../$($_.slug)/`">$(Html $_.title)</a>" }) -join ''
  $block = @"
<section class="knowledge-seo-links" data-seo-enhancement="knowledge-v1" aria-label="İlgili ürün ve rehberler"><div class="eyebrow eyebrow-accent">İLGİLİ ÇÖZÜMLER</div><h2>Bilgiyi üretim planına dönüştürün</h2><p>Bu rehber, Kardeşler Tekstil üretim ekibinin kurumsal iş kıyafeti planlama yaklaşımı esas alınarak hazırlanmış ve içerik bütünlüğü açısından kontrol edilmiştir.</p><div class="knowledge-seo-link-grid"><a href="../../$($product.slug)/"><strong>$(Html $product.name)</strong><span>Ürün, kumaş ve logo seçeneklerini inceleyin.</span></a><a href="../../$($location.slug)/"><strong>$(Html $location.name)</strong><span>Bölgesel üretim ve teslimat yaklaşımını inceleyin.</span></a></div><nav class="knowledge-related-links" aria-label="Aynı konudaki rehberler"><strong>$(Html $article.cluster)</strong>$peerLinks</nav><p class="knowledge-review-note">Hazırlayan ve kontrol eden: <a href="../../hakkimizda">Kardeşler Tekstil Üretim Ekibi</a></p></section>
"@
  $index = $html.IndexOf('</article>', [StringComparison]::OrdinalIgnoreCase)
  if ($index -ge 0) { $html = $html.Insert($index, $block) } else { $html = $html.Replace('</main>', "$block</main>") }
  [IO.File]::WriteAllText($article.path, $html, $utf8)
  $changed++
}
Write-Output "Enhanced $changed knowledge articles across $($byCluster.Keys.Count) clusters."
