# Yayın Öncesi QA ve Mobil Test — 7 Ağustos 2026

## Kapsam ve sonuç

Bu kontrol; ana sayfa, ürün kataloğu, ürün detayı, Bilgi Merkezi, makale detayı, lokasyon ve iletişim şablonlarını hem 390 × 844 mobil cihaz emülasyonunda hem 1440 × 1000 masaüstü görünümünde kapsar. Statik site bütünlüğü, SEO bileşenleri, 238 öncelikli içerik, responsive davranış ve favicon seti birlikte doğrulandı.

Yayın engelleyici açık hata kalmadı. Tasarım dili, renkler, tipografi ve bileşen yerleşimi korunmuştur. QA sırasında bulunan iki responsive hata sınırlı biçimde düzeltildi:

- Bilgi Merkezi kart ve kategori başlıklarının uzun metinde grid dışına taşması engellendi.
- Mobil çerez tercih panelinin dar ekranda viewport dışına genişlemesi engellendi.

Katalog lightbox'ındaki boş `src` değeri kaldırılarak sayfanın kendisine yapılan gereksiz görsel isteği önlendi.

## 238 kısa içerik

- Başlangıç kümesi: ana içerik uzunluğu 450 kelimenin altında kalan 238 makale.
- Geliştirilen makale: 238 / 238.
- Konu sınıfları: bakım, kumaş, kalıp/beden, logo uygulaması, güvenlik, operasyon, sektör ve ürün seçimi.
- Eklenen uzmanlık sinyalleri: ölçülebilir seçim kriteri, numune ve kabul adımı, kanıt/izlenebilirlik, teknik sınır ve güvenlik notu.
- Gerçek editoryal değişiklik yapılan bu 238 sayfada görünür güncelleme tarihi, `BlogPosting.dateModified` ve sitemap `lastmod` birlikte 2026-08-07 olarak güncellendi.
- Son kalite denetimi: 622 makalenin 622'si yapısal olarak geçerli; 450 ana içerik kelimesinin altında kalan makale sayısı 0.

İçerik modülü satış iddiası veya doğrulanmamış fiyat üretmez. Kumaş ve kullanım önerileri numune/kabul sürecine bağlanır; koruyucu donanım veya sertifika yerine geçtiği izlenimi verilmez.

## Mobil ve masaüstü render testi

Gerçek Chromium DevTools Protocol cihaz metrikleri kullanıldı. Her şablonda sayfa başlığı, H1, doküman genişliği, kırık görsel, yinelenen ID ve form etiketleri çalışma zamanında kontrol edildi; ekran görüntüleri ayrıca görsel olarak incelendi.

| Şablon | Mobil yatay taşma | Masaüstü yatay taşma | Kırık görsel | Yinelenen ID | Sonuç |
|---|---:|---:|---:|---:|---|
| Ana sayfa | Yok | Yok | 0 | 0 | Geçti |
| Ürün kataloğu | Yok | Yok | 0 | 0 | Geçti |
| Ürün detayı | Yok | Yok | 0 | 0 | Geçti |
| Bilgi Merkezi | Yok | Yok | 0 | 0 | Geçti |
| Makale detayı | Yok | Yok | 0 | 0 | Geçti |
| Lokasyon | Yok | Yok | 0 | 0 | Geçti |
| İletişim | Yok | Yok | 0 | 0 | Geçti |

İletişim formundaki görünmez spam tuzağı `aria-hidden` ve klavye sırası dışında tutulduğu için erişilebilir form alanı olarak değerlendirilmez. Ana sayfadaki gizli logo yükleme kontrolü de yalnızca ilgili araç açıldığında görünür hale gelir.

## Site bütünlüğü ve SEO regresyonu

`audit_site_integrity.ps1` ve çağırdığı tüm alt denetimler son favicon değişikliğinden sonra yeniden çalıştırıldı.

- Taranan genel HTML: 823; kapsam dışı arşiv HTML: 1.
- Legacy yönlendirme: 74; geçersiz hedef: 0.
- İndekslenebilir canonical: 747; sitemap URL: 747.
- Sitemap eksiği, sitemap dışı hedef, kırık iç link, yetim canonical ve eksik `site.js`: 0.
- Meta denetimi: 747 indekslenebilir sayfa, hata 0.
- Schema denetimi: 2.031 JSON-LD bloğu; 622 BlogPosting, 90 Product, 21 Collection, 747 Breadcrumb, hata 0.
- İç link denetimi: 622 makale, 593 bağlamsallaştırılmış makale, rehbere geri bağlanan 90 ürün, 8 kategori hub'ı, en düşük gelen makale linki 3, hata 0.
- Analytics olay ve başarı sayfası işaretleri: tüm kontroller geçti.

## Core Web Vitals hazırlığı

Kod tabanındaki otomatik CWV kontrolleri geçti:

- LCP görsel boyutları ayrılmıştır.
- Kritik LCP görselinde yüksek fetch önceliği vardır.
- Üç video kaynağı ertelenmiştir.
- Mobil açılışta intro video/splash atlanır.
- Test edilen yedi mobil şablonda doküman genişliği viewport'u aşmaz.

Bu çalışma yerel ve yayın öncesi olduğu için PageSpeed Insights ile Search Console/CrUX saha verisi yeni sürüm adına henüz oluşamaz. Lighthouse CLI bu çalışma ortamında kurulu değildir. Bu nedenle LCP, INP ve CLS'nin gerçek kullanıcı başarısı hakkında kesin saha sonucu ileri sürülmemiştir. Yayından sonra URL grupları PageSpeed Insights ve Search Console CWV raporunda aynı yedi şablon üzerinden izlenmelidir; anlamlı saha değerlendirmesi için 28 günlük CrUX penceresi esas alınmalıdır.

## Favicon doğrulaması

Favicon son adımda, ana sayfanın sol üstünde kullanılan `assets/logo-kit-badge.webp` dosyası tek kaynak alınarak yeniden üretildi:

- PNG: 16 × 16, 32 × 32, 48 × 48.
- ICO: 16, 32 ve 48 px çoklu boyut.
- Apple Touch: 180 × 180.
- Android/PWA: 192 × 192 ve 512 × 512.
- SVG: 64 × 64 içinde aynı kaynak logonun gömülü raster temsili.

747 indekslenebilir sayfadaki favicon ve manifest referansları `v=13` olarak eşitlendi; eski sürüm referansı kalmadı. Manifest ikon dosyaları ve bildirilen ölçüler fiziksel dosya ölçüleriyle aynıdır.

## Yayın sonrası takip

Commit ve push sonrası otomatik deployment tamamlandığında şu dış kontroller tekrarlanmalıdır:

1. Production `robots.txt`, sitemap ve canonical yanıtlarının HTTP 200/redirect davranışı.
2. Rich Results Test ve Schema.org validator'ın canlı URL sonuçları.
3. PageSpeed Insights'ın yedi şablon için mobil ve masaüstü laboratuvar sonuçları.
4. Search Console sitemap işleme, seçilen canonical ve CWV saha verisi.

Bu maddeler yerel kod doğrulamasının eksikliği değil, yalnızca canlı altyapı ve zamanla oluşan saha verisi gerektiren yayın sonrası kontrollerdir.
