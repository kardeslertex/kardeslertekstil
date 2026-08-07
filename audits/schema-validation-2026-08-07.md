# Schema doğrulama kaydı

Tarih: 7 Ağustos 2026

## Otomatik yerel doğrulama

`site/scripts/audit_schema.ps1`, bütün yayın HTML dosyalarındaki JSON-LD bloklarını ayrıştırır ve aşağıdaki kontrolleri build seviyesinde uygular:

- JSON-LD söz dizimi ve zorunlu tip alanları
- Google Product alanları: `name`, `image`, `description`, `sku`, `brand`
- Product alanlarının görünür sayfa içeriğiyle eşleşmesi
- Fiyat varsa `offers.price`, `priceCurrency` ve görünür fiyat eşleşmesi
- Canonical, Product kimliği ve Breadcrumb URL eşleşmesi
- Tek Organization kimliği: `https://kardeslertekstil.com.tr/#organization`
- İlçe sayfalarında fiziksel şube yerine `Service`, gerçek işletme sağlayıcısı ve ayrı `areaServed`
- BlogPosting alanları, canonical ve yayın/güncelleme tarihleri
- FAQ soru ve cevaplarının görünür metinle bire bir eşleşmesi
- Ana sayfada Organization + WebSite; iletişimde ContactPage; hakkımızda sayfasında AboutPage
- Kategori sayfalarında CollectionPage + gömülü ItemList

Sonuç: 2.028 JSON-LD bloğu hatasız; 622 BlogPosting, 90 gerçek Product, 21 CollectionPage, 744 BreadcrumbList, 9 Service ve 532 FAQPage doğrulandı.

## Resmî çevrim içi doğrulayıcı sınırı

Google Rich Results Test için resmî bir toplu doğrulama API'si bulunmuyor. Araç URL veya kodu etkileşimli olarak kabul ediyor. Schema.org Markup Validator da yayın URL'sini veya gönderilen kodu doğruluyor. Bu değişiklikler henüz push/deploy edilmediği için çevrim içi araçların eriştiği canlı sayfalar yeni kodu temsil etmiyor.

Bu nedenle çevrim içi test geçti şeklinde yanlış bir kayıt oluşturulmadı. Deployment sonrasında ana sayfa, ürün, kategori, makale, iletişim, hakkımızda ve hizmet sayfası şablonlarından en az birer URL iki resmî araçta çalıştırılmalı; sonuçlar bu dosyaya tarih ve test URL'siyle eklenmelidir.

- Google Rich Results Test: `https://search.google.com/test/rich-results`
- Schema.org Validator: `https://validator.schema.org/`

## ProductGroup kararı

Mevcut renk görselleri ve kategori seçenekleri, ayrı canonical URL'leri ve doğrulanmış varyant SKU ilişkileri bulunan satın alınabilir varyantlar değildir. Bu nedenle `ProductGroup`, `hasVariant` veya `isVariantOf` eklenmedi. Satış sistemi ileride ana ürün–varyant ilişkisini kalıcı SKU, URL ve gerçek stok/fiyat alanlarıyla sağladığında bu model yeniden değerlendirilecek.

## Offers kararı

Ürünler sipariş adedi, kumaş, uygulama ve proje kapsamına göre teklifleniyor; sayfalarda sabit ve görünür satış fiyatı bulunmuyor. Bu nedenle hiçbir Product nesnesine uydurma `offers`, fiyat, stok veya puan eklenmedi.

## Search Console Product sonucu — 7 Ağustos 2026

Kullanıcının sağladığı Search Console ürün geliştirme görüntüsünde `KT-MK-019` için bir geçersiz rich-result öğesi raporlandı: `offers`, `review` veya `aggregateRating` belirtilmesi gerekiyor. Tarama 3 Ağustos 2026 17:44:19 tarihinde başarıyla tamamlanmış; `name`, `image`, `description`, `sku`, `brand`, `category`, `url` ve gerçek ürün özellikleri algılanmıştır.

Bu hata sayfanın normal Google dizinine girmesini engellemez; yalnızca Product zengin sonucu uygunluğunu etkiler. İşletmede sabit, görünür ürün fiyatı ve doğrulanabilir müşteri yorum kaynağı bulunmadığı için şu aşamada:

- Sahte `Offer`, fiyat veya stok eklenmeyecek.
- Kurgu `Review`/`AggregateRating` üretilmeyecek.
- Gerçek fiyat kataloğu veya görünür/doğrulanmış yorum sistemi oluştuğunda schema aynı görünür veriden üretilecek.

Bu karar Google Product snippet gereksinimi ile schema içeriğinin görünür sayfayla uyuşması şartını birlikte korur.
