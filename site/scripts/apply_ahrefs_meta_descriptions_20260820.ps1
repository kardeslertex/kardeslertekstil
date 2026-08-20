$ErrorActionPreference = 'Stop'

$siteRoot = Split-Path -Parent $PSScriptRoot
$utf8NoBom = [Text.UTF8Encoding]::new($false)
$descriptions = [ordered]@{
  'bilgi-merkezi/cok-subeli-is-kiyafeti-siparis-yonetimi/index.html' = 'Çok şubeli firmalarda iş kıyafeti siparişlerini merkezileştirin; ürün, beden, stok, teslimat ve tekrar sipariş süreçlerini düzenli yönetin.'
  'bilgi-merkezi/iso-9001-is-kiyafeti-tedarik-standardi/index.html' = 'ISO 9001 ile iş kıyafeti tedarik sürecini standartlaştırın; şartname, numune, kalite kontrol, kayıt ve iyileştirme adımlarını planlayın.'
  'urun/kt-ss-018-petrol-bej-asimetrik-softshell-yelek/index.html' = 'Petrol, bej ve siyah panelli iç dolgusuz softshell iş yeleğini inceleyin; kurumsal renk, logo ve toplu üretim seçenekleriyle teklif alın.'
  'urun/kt-on-031-antrasit-kiremit-asimetrik-sef-ceketi/index.html' = 'Antrasit gövde, kiremit yaka ve manşet biyeli asimetrik şef ceketini inceleyin; kurumsal renk, logo ve toplu üretim için teklif alın.'
  'urun/kt-ss-019-tas-gri-lacivert-cepli-softshell-yelek/index.html' = 'Taş gri üst gövdeli, lacivert alt panelli ve cepli softshell iş yeleğini inceleyin; kurumsal logo ve toplu üretim seçenekleriyle teklif alın.'
  'bilgi-merkezi/is-kiyafeti-rol-bazli-urun-seti-mimarisi/index.html' = 'Görev ve departman bazlı iş kıyafeti setleri oluşturun; ürün, beden, renk, kullanım ve tekrar sipariş standartlarını birlikte planlayın.'
  'urun/kt-sw-016-saks-mavi-reflektorlu-polo-yaka-sweatshirt/index.html' = 'Saks mavi, reflektörlü polo yaka iş sweatshirtünü inceleyin; kurumsal renk, logo, beden planı ve toplu üretim seçenekleriyle teklif alın.'
  'urun/kt-ss-016-petrol-antrasit-asimetrik-softshell-mont/index.html' = 'Petrol ve antrasit renk bloklu, kapüşonsuz softshell iş montunu inceleyin; kurumsal logo, beden planı ve toplu üretim için teklif alın.'
  'bilgi-merkezi/is-kiyafeti-kullanim-disiplin-endeksi-kde-modeli/index.html' = 'İş kıyafeti kullanım disiplinini ölçün; uygunluk, bakım ve çalışan alışkanlıklarını puanlayarak takip ve iyileştirme planı oluşturun.'
  'bilgi-merkezi/is-kiyafeti-persona-haritasi-ile-beden-planlama/index.html' = 'Persona haritasıyla iş kıyafeti beden dağılımını planlayın; görev, vücut yapısı, kalıp, değişim ve iade verilerini birlikte değerlendirin.'
  'bilgi-merkezi/is-kiyafeti-urun-kodlama-standardi-nasil-kurulur/index.html' = 'İş kıyafetleri için ürün kodlama standardı kurun; model, kumaş, renk, beden, stok, sipariş ve zimmet kayıtlarında hataları azaltın.'
  'bilgi-merkezi/is-kiyafeti-yikama-dongusu-izleme-karti/index.html' = 'Yıkama döngüsü izleme kartıyla iş kıyafetlerinin bakımını takip edin; ürün ömrü, hasar, değişim zamanı ve yıkama kalitesini ölçün.'
  'urun/kt-on-033-antrasit-adacayi-asimetrik-sef-ceketi/index.html' = 'Antrasit gövde, adaçayı yaka ve kol manşetli kısa kollu şef ceketini inceleyin; kurumsal renk, logo ve toplu üretim için teklif alın.'
  'bilgi-merkezi/is-kiyafetinde-kalem-cebi-tasarimi/index.html' = 'İş kıyafetinde kalem cebini doğru planlayın; boy, bölme genişliği, kapak, sızıntı riski, erişim ve görev ergonomisini birlikte değerlendirin.'
  'urun/kt-ss-021-bej-kahverengi-teknik-softshell-pantolon/index.html' = 'Bej gövdeli, kahverengi diz takviyeli teknik softshell iş pantolonunu inceleyin; kurumsal logo, beden ve toplu üretim için teklif alın.'
  'bilgi-merkezi/is-kiyafetinde-cep-torbasi-kumasi/index.html' = 'İş kıyafetinde cep torbası kumaşını doğru seçin; aşınma, yük, tüylenme, renk verme, yıkama ve taşınan ekipmanı birlikte değerlendirin.'
  'bilgi-merkezi/is-pantolonunda-koruklu-kargo-cep/index.html' = 'İş pantolonunda körüklü kargo cebi doğru tasarlayın; hacim, kapak, yük dağılımı, diz hareketi, erişim ve araç kullanımını dengeleyin.'
  'urun/kt-ss-017-bordo-lacivert-reflektif-softshell-mont/index.html' = 'Bordo gövdeli, lacivert panelli reflektif softshell iş montunu inceleyin; kurumsal logo, beden planı ve toplu üretim için teklif alın.'
  'bilgi-merkezi/is-kiyafeti-termin-krizi-icin-acil-alternatif-model-plani/index.html' = 'İş kıyafeti termin gecikmelerine karşı alternatif model planı kurun; ürün, kumaş, logo, onay, stok ve teslimat risklerini yönetin.'
  'bilgi-merkezi/is-kiyafeti-deneme-gunu-pilotu-nasil-kurulur/index.html' = 'Toplu iş kıyafeti siparişi öncesinde deneme günü pilotu kurun; beden, kalıp, hareket, görev uyumu ve çalışan geri bildirimini doğrulayın.'
}

foreach ($entry in $descriptions.GetEnumerator()) {
  $description = [string]$entry.Value
  if ($description.Length -lt 120 -or $description.Length -gt 155) {
    throw "Description length must be 120-155: $($entry.Key) ($($description.Length))"
  }
}

$changed = 0
foreach ($entry in $descriptions.GetEnumerator()) {
  $description = [string]$entry.Value
  $path = Join-Path $siteRoot ($entry.Key.Replace('/', [IO.Path]::DirectorySeparatorChar))
  if (!(Test-Path -LiteralPath $path)) { throw "Target not found: $path" }
  $html = [IO.File]::ReadAllText($path, [Text.Encoding]::UTF8)
  $pattern = '(<meta\s+name="description"\s+content=")([^"]*)(")'
  $matches = [regex]::Matches($html, $pattern, 'IgnoreCase')
  if ($matches.Count -ne 1) { throw "Expected one meta description: $path ($($matches.Count))" }

  $encoded = [Net.WebUtility]::HtmlEncode($description)
  $nextHtml = [regex]::Replace($html, $pattern, "`$1$encoded`$3", 'IgnoreCase')
  if ($nextHtml -eq $html) { continue }
  [IO.File]::WriteAllText($path, $nextHtml, $utf8NoBom)
  $changed++
}

Write-Output "Updated Ahrefs meta descriptions: $changed"
