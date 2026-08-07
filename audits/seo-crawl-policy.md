# SEO tarama, indeksleme ve ortam erişim politikası

## Production

- Tek kanonik origin `https://kardeslertekstil.com.tr` adresidir.
- `robots.txt` production ortamında taramaya izin verir; yalnızca arama, filtre ve teklif formu parametreleri için crawl kuralları içerir.
- CSS, JavaScript, font ve gerekli görseller robots ile engellenmez. `audit_robots.ps1 -Live` bu kaynakları Googlebot user-agent ile production üzerinden sınar.
- Sitemap yalnızca self-canonical, indexlenebilir sayfa kaynağından üretilir. Bir sayfanın `noindex` veya redirect olması sitemap dışında kalmasına neden olur.

## Preview ve özel yollar

- `*.pages.dev` preview dağıtımları `PREVIEW_AUTH_TOKEN` ortam sırrı ve `Authorization: Bearer …` olmadan 401 döndürür. Token repoda tutulmaz.
- Admin veya API yolları ileride eklendiğinde robots kuralı erişim kontrolü sayılmaz; oturum/rol doğrulaması zorunludur.
- `/hero-archive/` ve `/scripts/` public içerik değildir; 404 ve `X-Robots-Tag: noindex, nofollow` döner.

## İndeksten kaldırma

`robots.txt` bir URL'yi indeksten kaldırmaz ve gizlilik sağlamaz. Public fakat indekslenmemesi gereken yanıtlar `noindex` meta etiketi veya `X-Robots-Tag` kullanır. Gizli içerikler authentication ile korunur. Kalıcı olarak taşınan URL'ler tek adımlı 301/308 ile canonical hedefe gider.

## Search Console kontrolleri

Gönderilecek tek adres `https://kardeslertekstil.com.tr/sitemap.xml` olmalıdır. Hesap erişimi olan yayın sorumlusu dağıtımdan sonra Sitemaps ekranında bu tam adresi, son okunma zamanını ve 747 keşfedilen URL'yi doğrular. URL sayısı 50.000 sınırından çok uzakta olduğu için bugün sitemap index gerekmiyor; içerik türleri operasyonel olarak ayrıştığında `pages`, `products`, `articles` ve `locations` sitemap'leri bir index altında üretilecektir.

### Son manuel doğrulama — 7 Ağustos 2026

Search Console Sitemaps ekranının kullanıcı tarafından sağlanan görüntüsü aşağıdaki production durumunu doğruladı:

- Gönderilen adres: `https://kardeslertekstil.com.tr/sitemap.xml`
- Gönderim tarihi: 2 Ağustos 2026
- Son okunma tarihi: 6 Ağustos 2026
- Durum: Başarılı
- Keşfedilen sayfa: 747
- Keşfedilen video: 0

Bu kanıtla Search Console sitemap adresi ve okuma durumu doğrulanmıştır. Hesap/API yetkisi repoda tutulmaz; sonraki kontroller yine yetkili kullanıcının ekran görüntüsü veya dışa aktarımıyla kayda alınır.

### Ana sayfa canonical doğrulaması — 7 Ağustos 2026

Kullanıcının sağladığı Search Console URL Denetimi görüntüsü `https://kardeslertekstil.com.tr/` için şunları doğruladı:

- Dizin durumu: Sayfa dizine eklendi
- Son tarama: 6 Ağustos 2026 14:09:26
- Tarama aracı: Googlebot akıllı telefon
- Taramaya izin: Evet
- Sayfa getirme: Başarılı
- Dizine eklenmesine izin: Evet
- Kullanıcı tarafından bildirilen canonical: `https://kardeslertekstil.com.tr/`
- Google tarafından seçilen canonical: İncelenen URL

Ana sayfada Google-selected canonical ile HTML'de bildirilen canonical aynıdır. Görüntüdeki harici “yönlendiren sayfa” keşif kaynağıdır; canonical kararını değiştirmemiştir ve tek başına site güvenlik ihlali kanıtı sayılmaz.

### Ürün katalog canonical doğrulaması — 7 Ağustos 2026

Kullanıcının sağladığı Search Console URL Denetimi görüntüsü `https://kardeslertekstil.com.tr/urunlerimiz` için şunları doğruladı:

- Dizin durumu: Sayfa dizine eklendi
- Keşif kaynağı: `https://kardeslertekstil.com.tr/sitemap.xml`
- Son tarama: 4 Ağustos 2026 21:41:14
- Tarama aracı: Googlebot akıllı telefon
- Taramaya izin: Evet
- Sayfa getirme: Başarılı
- Dizine eklenmesine izin: Evet
- Kullanıcı tarafından bildirilen canonical: `https://kardeslertekstil.com.tr/urunlerimiz`
- Google tarafından seçilen canonical: İncelenen URL

Ürün katalog şablonunda Google-selected canonical ile HTML canonical aynıdır.

### Ürün detay canonical doğrulaması — 7 Ağustos 2026

Kullanıcının sağladığı Search Console URL Denetimi görüntüsü `https://kardeslertekstil.com.tr/urun/kt-mk-019-lacivert-kapusonlu-reflektorlu-s-montu/` için şunları doğruladı:

- Dizin durumu: Sayfa dizine eklendi
- Son tarama: 3 Ağustos 2026 17:44:19
- Tarama aracı: Googlebot akıllı telefon
- Taramaya izin: Evet
- Sayfa getirme: Başarılı
- Dizine eklenmesine izin: Evet
- Kullanıcı tarafından bildirilen canonical: İncelenen ürün URL'si
- Google tarafından seçilen canonical: İncelenen URL
- Keşif bağlantısı: `https://kardeslertekstil.com.tr/urunlerimiz`

Ürün detay şablonunda Google-selected canonical ile HTML canonical aynıdır. URL Denetimi görüntüsünde sitemap keşif alanında “Geçici işleme hatası” metni de görünmektedir; ancak sitemap genel raporu başarılıdır, ürün dizindedir ve sayfa başarıyla getirilmiştir. Bu nedenle durum anlık Search Console işleme notu olarak izlenecek, kalıcı hata kanıtı sayılmayacaktır.

### Bilgi merkezi indeksleme durumu — 7 Ağustos 2026

Kullanıcının sağladığı Search Console URL Denetimi görüntüsünde `https://kardeslertekstil.com.tr/bilgi-merkezi/` için “URL Google'da yok / URL Google tarafından bilinmiyor” sonucu görüldü. Henüz tarama, sitemap ilişkilendirmesi veya canonical seçimi oluşmamıştır.

Aynı anda yapılan canlı ve yerel doğrulamalar şunları gösterdi:

- Production yanıtı: HTTP 200
- Meta robots: `index,follow,max-image-preview:large`
- Self-canonical: `https://kardeslertekstil.com.tr/bilgi-merkezi/`
- Sitemap üyeliği: Var (`lastmod` 30 Temmuz 2026)
- Sitemap genel durumu: Başarılı, son okuma 6 Ağustos 2026
- Doğrudan iç link: Ana sayfa, ürün kataloğu, iletişim, hakkımızda ve referanslar dahil ana navigasyonlarda var

Kod veya crawl politikası kaynaklı bir engel bulunmadı. Bu durum Search Console keşif/işleme gecikmesi olarak sınıflandırıldı. URL için bir kez “Dizine eklenmesini iste” kullanılmalı; ardından yeniden istek göndermeden Google'ın tarama sonucu beklenmelidir.
