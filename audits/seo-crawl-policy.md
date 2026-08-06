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

Search Console hesap/API yetkisi repoda bulunmadığından gönderilmiş sitemap durumu yerel kodla kanıtlanamaz; ekran doğrulaması yayın kontrol listesinin manuel kapısıdır.
