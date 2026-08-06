param([string]$SiteRoot)

$ErrorActionPreference = 'Stop'
$siteRoot = if ($SiteRoot) { (Resolve-Path $SiteRoot).Path } else { Split-Path $PSScriptRoot -Parent }
$knowledgeRoot = Join-Path $siteRoot 'bilgi-merkezi'
$sitemapPath = Join-Path $siteRoot 'sitemap.xml'
$utf8 = [Text.UTF8Encoding]::new($false)
$editorialDate = '2026-08-07'
$editorialDateText = '7 Ağustos 2026'

function Decode([string]$value) { [Net.WebUtility]::HtmlDecode($value) }
function Encode([string]$value) { [Net.WebUtility]::HtmlEncode($value) }
function Plain([string]$value) { return (Decode ([regex]::Replace($value, '<[^>]+>', ' ')) -replace '\s+', ' ').Trim() }
function Core-WordCount([string]$html) {
    $body = [regex]::Replace($html, '(?is)<section class=["'']knowledge-seo-links["''].*?</section>', ' ')
    $body = [regex]::Replace($body, '(?is)<section[^>]+data-content-enhancement=["'']expert-v1["''].*?</section>', ' ')
    $body = [regex]::Replace($body, '(?is)<(script|style|nav|footer)\b.*?</\1>', ' ')
    $body = [regex]::Replace($body, '<[^>]+>', ' ')
    return @((Decode $body) -split '\s+' | Where-Object { $_ }).Count
}
function Theme([string]$slug) {
    if ($slug -match 'yikama|bakim|leke|kurutma|utu|temiz|onarim') { return 'care' }
    if ($slug -match 'kumas|penye|gabardin|ripstop|polyester|pamuk|elyaf|iplik|gramaj|gsm|apre|dokuma|orme') { return 'fabric' }
    if ($slug -match 'beden|kalip|olcu|ergonomi|hareket|paca|bel-|boylu|hamile') { return 'fit' }
    if ($slug -match 'logo|nakis|baski|transfer|serigrafi|arma|pantone|renk') { return 'branding' }
    if ($slug -match 'standart|en-|iso-|sertifika|kkd|koruyucu|guvenlik|risk|kimyasal|alev|antistatik|reflekt') { return 'safety' }
    if ($slug -match 'siparis|tedarik|stok|maliyet|butce|teklif|onay|teslim|zimmet|iade|kpi|politika|prosedur|plan|matris') { return 'operations' }
    if ($slug -match 'personel|ekip|sektor|fabrika|tesis|otel|restoran|depo|saha|atolye|uretim') { return 'sector' }
    return 'product'
}

$content = @{
    care = @{
        intro='Bakım talimatı hazırlanırken yalnız yıkama sıcaklığını yazmak yeterli değildir. Kullanılan kumaş, logo yöntemi, kir türü, yıkama sıklığı ve kurutma biçimi aynı kayıt üzerinde değerlendirilmelidir.'
        items=@('Ürünün bakım etiketindeki sembolleri ve üretici talimatını referans alın.','Deterjan, sıcaklık, program süresi ve kurutma yöntemini deneme partisinde kaydedin.','Logo, reflektif yüzey, kaplama ve aksesuarları yıkama öncesi ve sonrası ayrı kontrol edin.','Çekme, dönme, renk farkı ve yüzey bozulmasını aynı ışık ve ölçüm yöntemiyle karşılaştırın.','Uygunsuz parçayı yeniden kullanıma vermeden önce onarım veya ayırma kararını sorumlu kişiyle belgeleyin.')
        sample='İlk bakım denemesi, seri kullanımın küçük ölçekli doğrulamasıdır. Numune ölçüleri işlem öncesinde kaydedilmeli; aynı noktalar işlem sonrasında tekrar ölçülmelidir. Görsel değerlendirme tek başına yeterli olmadığında fotoğraf, çevrim sayısı ve ölçü farkı kayıt altına alınmalıdır.'
        limit='Tek bir başarılı yıkama, ürünün tüm kullanım ömrünü kanıtlamaz. Koruyucu özellik taşıyan giysilerde bakım işlemi sertifikalı yapıyı etkileyebilir; kullanım sınırı ve yenileme kararı ilgili üretici belgesi ile iş güvenliği değerlendirmesine dayanmalıdır.'
    }
    fabric = @{
        intro='Kumaş kararı ticari isimle değil, ölçülebilir teknik tanımla verilmelidir. Lif karışımı, gramaj, örgü veya dokuma yapısı, terbiye işlemi ve hedef kullanım koşulu birlikte yazıldığında numune ile seri üretim aynı ölçüt üzerinden karşılaştırılabilir.'
        items=@('Lif bileşimini ve toleransını tedarikçi teknik föyüyle doğrulayın.','Gramajı numune koşullandırıldıktan sonra tanımlı yöntemle karşılaştırın.','Çekme, dönme, renk haslığı ve boncuklanma beklentisini kullanım ve bakım sıklığına göre belirleyin.','Kumaş eni, lot numarası ve renk bandını kesim planına bağlayın.','Logo ve dikiş denemesini gerçek üretim kumaşı üzerinde yapın; farklı yüzeydeki sonucu eşdeğer kabul etmeyin.')
        sample='Numune değerlendirmesinde yalnız ilk dokunuş veya görünüm değil, hareket sırasında yüzey davranışı ve bakım sonrası değişim izlenmelidir. Onay kartında kumaş kodu, renk, lot, gramaj ve test edilen bakım çevrimi bulunursa tekrar siparişte yorum farkı azalır.'
        limit='Gramaj veya lif oranı tek başına dayanıklılık, nefes alabilirlik ya da koruma garantisi değildir. İddia edilen performansın kapsamı ilgili test raporunda aranmalı; bitmiş giysinin dikiş, aksesuar ve tasarım etkisi ayrıca değerlendirilmelidir.'
    }
    fit = @{
        intro='Beden ve kalıp kararı yalnız boy-kilo tahminiyle verilmemelidir. Vücut ölçüsü, iç katman, görev hareketi, cep yükü ve oturarak ya da ayakta çalışma biçimi aynı prova senaryosunda değerlendirilmelidir.'
        items=@('Ölçüm noktasını ve mezura uygulamasını tüm çalışanlarda aynı yöntemle kullanın.','Beden setini gerçek kullanıcı grubunun uç ölçülerini kapsayacak biçimde seçin.','Çömelme, uzanma, merdiven çıkma ve oturma gibi görev hareketlerini provaya ekleyin.','İçlik veya koruyucu ekipmanla birlikte giyilecekse katman payını ayrıca kontrol edin.','Onaylanan beden tablosu, kalıp kodu ve izin verilen toleransı sipariş dosyasında saklayın.')
        sample='Prova sonucunu “uydu” veya “uymadı” şeklinde bırakmak yerine bölge ve hareket bazında kaydetmek gerekir. Bel, basen, iç bacak, kol ve gövde gibi ilgili ölçüler ile kullanıcının hareket notu birlikte tutulduğunda kalıp revizyonu ölçülebilir hâle gelir.'
        limit='Kişisel rahatlık geri bildirimi önemlidir fakat tek başına teknik kabul değildir. Çok bol veya dar kalıp hareketli makine, görünürlük ekipmanı ya da katmanlı giyimle yeni risk oluşturabilir; son karar görev analizi ve iş güvenliği gereklilikleriyle birlikte verilmelidir.'
    }
    branding = @{
        intro='Logo uygulamasında ekrandaki görünüm doğrudan üretim onayı sayılmamalıdır. Dosya yapısı, gerçek ölçü, renk referansı, kumaş yüzeyi, uygulama yöntemi ve bakım koşulu fiziksel numunede birlikte kontrol edilmelidir.'
        items=@('Vektörel ana dosyayı, yazı tiplerini ve minimum detay kalınlığını arşivleyin.','Pantone veya onaylı fiziksel renk referansını ekran görüntüsünden ayrı tutun.','Logo en-boy ölçüsü ile ürün üzerindeki konumu santimetre olarak kayıt altına alın.','Nakış, transfer, DTF veya serigrafi kararını kumaş yüzeyi ve kullanım koşuluna göre verin.','Numuneyi farklı ışıkta, hareket hâlinde ve bakım denemesi sonrasında tekrar değerlendirin.')
        sample='Onay kartında uygulama dosyası sürümü, iplik veya boya referansı, ölçü, konum ve numune fotoğrafı bulunmalıdır. Aynı logo farklı ürün gruplarında kullanılacaksa her kumaş ve panel yapısı için ayrı uygulama sınırı tanımlanması tekrar siparişte tutarlılığı artırır.'
        limit='Küçük yazı, ince çizgi, geniş dolgu ve esnek kumaş aynı yöntemle eşit sonuç vermez. Koruyucu veya su geçirmez ürünlerde uygulama dikişi ya da ısısı performansı etkileyebilir; sertifikalı özellik hakkında üretici onayı olmadan eşdeğerlik iddiası yapılmamalıdır.'
    }
    safety = @{
        intro='Koruyucu kıyafet seçimi ürün adından veya tek bir standart numarasından çıkarılamaz. Tehlikenin türü, maruziyet düzeyi ve süresi, çalışma ortamı, birlikte kullanılan ekipman ve bitmiş giysinin belge kapsamı önceden doğrulanmalıdır.'
        items=@('İşin tehlike ve maruziyet senaryosunu yazılı risk değerlendirmesinden alın.','Standart numarasıyla birlikte sürüm, sınıf, test kapsamı ve ürün modelini kontrol edin.','Kumaş raporunu bitmiş giysi sertifikası yerine kullanmayın.','Beden, kapama, cep ve logo değişikliklerinin koruyucu yapıya etkisini üreticiyle doğrulayın.','Kullanım öncesi kontrol, temizlik, saklama ve hizmetten çıkarma ölçütlerini çalışan talimatına ekleyin.')
        sample='Numune yalnız görünüş ve rahatlık için değil, görev hareketi ve diğer kişisel koruyucularla uyum için denenmelidir. Deneme kaydında ürün modeli, beden, test edilen görev, kullanıcı geri bildirimi ve tespit edilen açıklık ya da çakışmalar belirtilmelidir.'
        limit='Bu içerik ürün seçimini destekleyen genel bir çerçevedir; risk değerlendirmesi, uygunluk belgesi veya yetkili iş güvenliği kararının yerine geçmez. Kimyasal, ısı, alev, elektrik arkı veya görünürlük riskinde kesin koruma düzeyi yalnız doğrulanmış ürün dokümanından alınmalıdır.'
    }
    operations = @{
        intro='Operasyon sürecinin sürdürülebilir olması için karar, sorumlu kişi, ürün kodu, adet, tarih ve istisna nedeni aynı kayıt zincirinde tutulmalıdır. Sözlü onaylar kısa vadede hız sağlasa da tekrar sipariş ve uygunsuzluk incelemesinde iz bırakmaz.'
        items=@('Sürecin başlangıç ve bitiş koşulunu, sorumlusunu ve onay yetkisini tanımlayın.','Ürün kodu, beden, adet, departman ve teslimat noktasını tek veri tablosunda eşleştirin.','Normal akış ile acil durum veya istisna akışını birbirinden ayırın.','Termin, hata oranı, değişim talebi veya stok seviyesi için ölçülebilir takip alanı belirleyin.','Karar değiştiğinde eski sürümü silmek yerine tarih ve gerekçeyle revizyon kaydı oluşturun.')
        sample='Pilot uygulama küçük fakat gerçek bir kullanıcı grubu üzerinde yürütülmelidir. Başlangıç verisi ile sonuç aynı ölçü birimiyle karşılaştırılmalı; gecikme, yanlış beden, eksik paket veya tekrar işlem gibi sapmalar sorumlu ve kapanış tarihiyle kaydedilmelidir.'
        limit='Tek bir eşik bütün işletmelere uygulanamaz. Minimum stok, termin tamponu, onay seviyesi ve kabul oranı; çalışan sayısı, tedarik süresi, görev kritiklik düzeyi ve geçmiş tüketim verisine göre belirlenmeli, veri değiştikçe yeniden gözden geçirilmelidir.'
    }
    sector = @{
        intro='Sektör adı tek başına doğru kıyafeti tarif etmez. Aynı işletmede üretim, bakım, sevkiyat, temizlik ve müşteri teması görevlerinin hareket, kirlenme, görünürlük ve kurumsal temsil gereksinimleri farklı olabilir.'
        items=@('Görevleri bölüm adı yerine yapılan hareket ve maruziyet üzerinden gruplandırın.','Ortam sıcaklığı, açık-kapalı alan, vardiya süresi ve yıkama sıklığını kaydedin.','Cep, kapama, reflektif alan ve katman ihtiyacını her görev grubu için ayrı değerlendirin.','Kurumsal renk ve logo kararını bakım dayanımı ve görünürlük gereksinimiyle birlikte test edin.','Teslimat paketini departman, çalışan veya vardiya koduyla ayrıştırarak dağıtım hatasını ölçün.')
        sample='Saha numunesi, ürünü gerçek vardiya boyunca kullanacak temsilci çalışanlarla denenmelidir. Denemede hareket kısıtı, ısı konforu, cep erişimi, kirlenme noktaları ve diğer ekipmanlarla çakışma gözlenip görev bazında not edilmelidir.'
        limit='Sektörel örnekler başlangıç noktasıdır; işletmeye özgü risk analizinin yerine geçmez. Koruyucu özellik gereken görevlerde kumaş veya model benzerliği yeterli değildir; bitmiş ürünün uygunluğu belge ve saha koşuluyla ayrıca doğrulanmalıdır.'
    }
    product = @{
        intro='Ürün seçimi görünüşten önce kullanım senaryosuyla başlamalıdır. Çalışma ortamı, hareket, katmanlama, bakım sıklığı, gerekli cepler ve kurumsal uygulamalar yazılı hâle getirildiğinde farklı modeller aynı teknik temel üzerinden karşılaştırılabilir.'
        items=@('Görev, ortam ve kullanım süresini ürün talebinin başında tanımlayın.','Kumaş, gramaj, kalıp, aksesuar ve renk bilgilerini model koduna bağlayın.','Cep ve kapama noktalarını gerçek görev hareketiyle deneyin.','Logo yöntemini kumaş yüzeyi ve bakım programıyla birlikte numunede doğrulayın.','Onaylanan numuneyi ölçü, fotoğraf ve revizyon bilgisiyle tekrar sipariş referansı olarak saklayın.')
        sample='Numune kontrolü farklı bedenlerden temsilci kullanıcılarla yapılmalı; yalnız ayna karşısındaki görünüm değil oturma, uzanma, eğilme ve ekipman kullanma hareketleri de gözlenmelidir. Bulgular ürün bölgesi ve önerilen düzeltmeyle kaydedilmelidir.'
        limit='Bir modelin başka işletmede iyi sonuç vermesi aynı performansın her koşulda tekrarlanacağını göstermez. Kumaş lotu, kalıp, aksesuar, logo ve bakım programı değiştiğinde onay kapsamı yeniden değerlendirilmelidir.'
    }
}

$candidates = @()
foreach ($file in Get-ChildItem -LiteralPath $knowledgeRoot -Filter 'index.html' -File -Recurse | Where-Object { $_.DirectoryName -ne $knowledgeRoot }) {
    $html = [IO.File]::ReadAllText($file.FullName, [Text.Encoding]::UTF8)
    $words = Core-WordCount $html
    if ($words -lt 450) { $candidates += [pscustomobject]@{ file=$file; html=$html; words=$words; slug=(Split-Path $file.DirectoryName -Leaf) } }
}
if ($candidates.Count -ne 238) { throw "Expected 238 short articles, found $($candidates.Count)." }

$sitemap = [IO.File]::ReadAllText($sitemapPath, [Text.Encoding]::UTF8)
foreach ($candidate in $candidates) {
    $html = $candidate.html
    $title = Plain ([regex]::Match($html, '<h1[^>]*>(.*?)</h1>', 'IgnoreCase,Singleline').Groups[1].Value)
    $themeName = Theme $candidate.slug
    $copy = $content[$themeName]
    $variant = [Math]::Abs($candidate.slug.GetHashCode()) % 3
    $heading = @('Uygulama ve doğrulama planı','Sahada karar ve kabul çerçevesi','Teknik değerlendirme notları')[$variant]
    $evidenceFocus = switch ($themeName) {
        'care' { 'bakım çevrimi, işlem öncesi ve sonrası ölçü ile yüzey fotoğrafı' }
        'fabric' { 'kumaş lotu, teknik föy, numune ölçümü ve bakım sonrası karşılaştırma' }
        'fit' { 'beden seti, prova hareketi, ölçü noktası ve kullanıcı geri bildirimi' }
        'branding' { 'logo dosyası sürümü, fiziksel renk referansı, uygulama ölçüsü ve yıkama numunesi' }
        'safety' { 'risk senaryosu, ürün modeli, uygunluk belgesi kapsamı ve kullanım öncesi kontrol' }
        'operations' { 'sorumlu kişi, tarih, ürün kodu, miktar, sapma nedeni ve kapanış kaydı' }
        'sector' { 'görev grubu, ortam koşulu, vardiya süresi, numune gözlemi ve dağıtım sonucu' }
        default { 'ürün kodu, kullanım senaryosu, numune sonucu, revizyon ve tekrar sipariş referansı' }
    }
    $evidence = "${title} için kararın doğrulanabilir olması, yalnız sonuç cümlesinin değil dayanak verisinin de saklanmasına bağlıdır. Proje dosyasında $evidenceFocus birlikte tutulmalıdır. Denemeyi yapan kişi, tarih, kullanılan numune ve kabul ya da ret gerekçesi yazılmadığında sonraki siparişte aynı koşulların tekrarlandığı kanıtlanamaz. Fotoğraf kullanılacaksa ışık, açı ve ürün bölgesi mümkün olduğunca sabitlenmeli; ölçüm yapılacaksa aynı araç ve aynı referans noktası seçilmelidir. Bulgular çalışan adı yerine gerekli olduğunda anonim görev veya beden koduyla izlenebilir. Böyle bir kayıt düzeni, tek bir numuneden genelleme yapılmasını önler; satın alma, üretim ve kullanıcı ekiplerinin aynı kanıt üzerinden karar vermesini sağlar."
    $list = @($copy.items | ForEach-Object { '<li>' + (Encode $_) + '</li>' }) -join ''
    $module = '<section data-content-enhancement="expert-v1"><h2>' + (Encode "${title}: $heading") + '</h2><p>' + (Encode $copy.intro) + '</p><h3>Karar dosyasında bulunması gerekenler</h3><ul>' + $list + '</ul><h3>Kanıt ve izlenebilirlik</h3><p>' + (Encode $evidence) + '</p><h3>Numune ve kabul kaydı</h3><p>' + (Encode $copy.sample) + '</p><h3>Teknik sınır ve sorumluluk</h3><p>' + (Encode $copy.limit) + '</p></section>'
    if ($html -match 'data-content-enhancement=["'']expert-v1["'']') { $html = [regex]::Replace($html, '(?s)<section[^>]+data-content-enhancement=["'']expert-v1["''].*?</section>', [Text.RegularExpressions.MatchEvaluator]{param($m)$module}, 1) }
    else { $html = $html.Replace('<section class="knowledge-seo-links"', "$module<section class=`"knowledge-seo-links`"") }

    $html = [regex]::Replace($html, '(<span>Son güncelleme:\s*<time datetime=")[^"]+("[^>]*>)[^<]+(</time>)', "`${1}$editorialDate`${2}$editorialDateText`${3}", 'IgnoreCase')
    $html = [regex]::Replace($html, '("dateModified"\s*:\s*")[^"]+("\s*)', "`${1}$editorialDate`${2}", 'IgnoreCase')
    [IO.File]::WriteAllText($candidate.file.FullName, $html, $utf8)

    $canonical = [Net.WebUtility]::HtmlDecode([regex]::Match($html, '<link[^>]+rel=["'']canonical["''][^>]+href=["'']([^"'']+)', 'IgnoreCase').Groups[1].Value)
    $escapedUrl = [regex]::Escape($canonical)
    $sitemap = [regex]::Replace($sitemap, "(<loc>$escapedUrl</loc>\s*<lastmod>)[^<]+(</lastmod>)", "`${1}$editorialDate`${2}")
}
[IO.File]::WriteAllText($sitemapPath, $sitemap, $utf8)
"Enhanced $($candidates.Count) short articles with editorial date $editorialDate."
