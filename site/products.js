/* =====================================================================
   ÜRÜN KATALOĞU VERİSİ — urunlerimiz bu dosyadan beslenir
   =====================================================================

   YENİ ÜRÜN EKLEMEK İÇİN:
   1. Ürün fotoğrafını assets/products/gallery/<kategori>/ klasörüne koy.
   2. Aşağıda ilgili kategorinin "urunler" listesine dosya adını ekle.
      - Sadece dosya adı yazarsan isim otomatik üretilir
        (örn. "22.jpg" → "Tişört Modeli 22", kod → KT-TS-022).
      - Özel isim/etiket istersen obje yaz:
        { img: "22.jpg", name: "Lacivert Polo Tişört", tags: "Polo Yaka | Lacivert" }
   3. Kaydet, bitti. Sayfadaki "N model" sayıları ve üst özet otomatik güncellenir.

   YENİ KATEGORİ EKLEMEK İÇİN: aşağıdaki bloklardan birini kopyala,
   id / nav / title / prefix / baseName alanlarını değiştir.

   ALANLAR:
   - id       : bölümün linki (urunlerimiz#id) — değiştirme, diğer sayfalar link veriyor
   - nav      : üstteki yapışkan menüde görünen kısa ad
   - eyebrow  : başlığın üstündeki küçük turuncu yazı
   - title    : bölüm başlığı
   - desc     : bölüm açıklaması
   - prefix   : ürün kodu ön eki (KT-TS-001 gibi)
   - baseName : otomatik isim kalıbı ("Tişört Modeli" → "Tişört Modeli 5")
   - tags     : varsayılan etiketler (ürün objesinde tags yazarsan onu kullanır)
   - keywords : arama kutusunun bu kategoriyi bulmasını sağlayan ek kelimeler
   - unit     : sayaç birimi ("model" veya "ürün")
   ===================================================================== */

window.KATALOG = [

  /* ---------------- TİŞÖRT ---------------- */
  {
    id: "tshirt",
    nav: "Tişört",
    eyebrow: "Pamuklu · baskı · nakış",
    title: "Tişört Modellerimiz",
    desc: "Kurumsal kullanıma uygun bisiklet yaka ve polo yaka tişört modelleri.",
    prefix: "KT-TS",
    codeStart: 1,
    baseName: "Tişört Modeli",
    tags: "Baskı | Nakış | Özel Renk",
    keywords: "tişört tshirt polo lakos bisiklet yaka",
    unit: "model",
    urunler: [
      { img: "siyah-polo-yaka-tisort.png", name: "Siyah Polo Yaka Tişört", tags: "40/1 Full Likralı Lakost | Siyah | Polo yaka | Ribanalı kol bantlı" },
      { img: "beyaz-polo-yaka-tisort.png", name: "Beyaz Polo Yaka Tişört", tags: "40/1 Full Likralı Lakost | Beyaz | Polo yaka | Ribanalı kol bantlı" },
      { img: "beyaz-bisiklet-yaka-tisort.png", name: "Siyah Bisiklet Yaka Tişört", tags: "30/1 Penye Süprem | Siyah | Bisiklet yaka | Regular fit" },
      { img: "siyah-bisiklet-yaka-tisort.png", name: "Beyaz Bisiklet Yaka Tişört", tags: "30/1 Penye Süprem | Beyaz | Bisiklet yaka | Regular fit" },
      { img: "01.jpeg", name: "Polo Tişört — Siyah, Turuncu Detaylar, Dikey Fermuarlı Göğüs Cep, Kısa Kollu", tags: "Siyah | Turuncu detaylar | Polo yaka | Kısa kol | Dikey fermuarlı göğüs cebi | Kontrast fermuar | İş kıyafeti | Reflektör: yok" },
      { img: "02.jpg",  name: "Oversize Tişört — Siyah, Bordo Garni, Bisiklet Yaka, Kısa Kollu, Reflektörlü Kol Şeridi", tags: "Siyah | Bordo garni | Bisiklet yaka | Kısa kol | Reflektörlü kol şeridi | Spor/performans" },
      { img: "03.jpg",  name: "Tişört Hi‑Vis — Siyah, Omuz ve Kol Reflektörlü Bantlar", tags: "Siyah | Hi‑Vis bant | Omuz reflektörlü bant | Kol reflektörlü bant | İş güvenliği | Kısa kol" },
      { img: "04.jpg",  name: "Polo Tişört — Kırmızı / Siyah Kontrast Yaka, Kısa Kollu", tags: "Kırmızı | Siyah kontrast yaka | Polo yaka | Kısa kol | Kurumsal/iş modeli | Reflektör: yok" },
      { img: "05.jpg",  name: "Gri, Kırmızı Yan Garnili Polo Yaka Tişört — Kısa Kollu", tags: "Gri | Kırmızı yan garni | Polo yaka | Kısa kol | Kontrast detaylar | Reflektör: yok" },
      { img: "06.jpg",  name: "V‑Yaka Tişört — Gri, Siyah Omuz Garnili, Kısa Kollu", tags: "Gri | Siyah omuz garni | V‑yaka | Kısa kol | Spor | Reflektör: yok" },
      { img: "07.jpg",  name: "Gri, Kırmızı Yaka ve Kol Manşetli, Kısa Kollu", tags: "Gri | Kırmızı yaka | Kırmızı kol manşeti | V‑yaka | Kısa kol | Spor" },
      { img: "08.jpg",  name: "Uzun Kollu Polo — Antrasit, Siyah Kontrast Yaka", tags: "Antrasit | Siyah kontrast yaka | Polo yaka | Uzun kol | Reflektör: yok" },
      { img: "09.jpg",  name: "Polo Tişört — Lacivert, Kol/Omuz/Etekte Gri Reflektörlü Şeritler, Kısa Kollu", tags: "Lacivert | Gri reflektörlü şeritler | Polo yaka | Kısa kol | İş/güvenlik unsuru" },
      { img: "10.jpg",  name: "Polo Tişört — Siyah, Düz, Kısa Kollu", tags: "Siyah | Düz tasarım | Polo yaka | Kısa kol | Temel iş modeli" },
      { img: "11.jpg",  name: "Polo Tişört — Gri, Kırmızı Raglan Kollu, Polo Yaka, Kısa Kollu", tags: "Gri | Kırmızı raglan kollu | Polo yaka | Kısa kol | Kurumsal" },
      { img: "12.jpg",  name: "Bisiklet Yaka Tişört — Gri, Kol ve Omuzda Saks Garnili, Kısa Kollu", tags: "Gri | Saks garni (kol/omuz) | Bisiklet yaka | Kısa kol | Kontrast detay" },
      { img: "13.jpg",  name: "Polo Tişört — Lacivert, Kırmızı Garnili Omuz Şeridi, Kısa Kollu", tags: "Lacivert | Kırmızı garni | Polo yaka | Kısa kol" },
      { img: "14.jpeg", name: "Polo Tişört — Haki, Siyah Göğüs Cep (Dikey Fermuarlı, Yeşil Fermuar Detayı), Kısa Kollu", tags: "Haki | Siyah göğüs cep | Dikey fermuar | Yeşil fermuar detayı | Polo yaka | Kısa kol" },
      { img: "15.jpeg", name: "Bisiklet Yaka Tişört — Siyah, Dikey Fermuarlı Göğüs Cep, Turuncu Detaylar", tags: "Siyah | Dikey fermuarlı göğüs cebi | Turuncu detaylar | Bisiklet yaka | Kısa kol" },
      { img: "16.jpeg", name: "Polo Tişört — Siyah, Turuncu Ense Biyeli, Kısa Kollu", tags: "Siyah | Turuncu ense biyeli | Polo yaka | Kısa kol" },
      { img: "17.jpg",  name: "Uzun Kollu Tişört — Siyah, Omuz ve Kol Reflektörlü, Polo Yaka", tags: "Siyah | Reflektörlü (omuz/kol) | Uzun kol | İş güvenliği" },
      { img: "18.jpeg", name: "Uzun Kollu Polo — Haki, Ense Biyeli, Pat Altı Reflektörlü Detay", tags: "Haki | Ense biyeli | Pat altı reflektörlü detay | Uzun kol | İş/teknik detay" },
      { img: "19.jpg",  name: "Uzun Kollu V‑Yaka Tişört — Gri, Mavi Garnili Omuz ve Kol Şeridi", tags: "Gri | Mavi garni | V‑yaka | Uzun kol | Spor/performans" },
      { img: "20.jpg",  name: "Uzun Kollu V‑Yaka Tişört — Gri, Kırmızı Garnili V‑Yaka ve Manşet", tags: "Gri | Kırmızı garni | V‑yaka | Uzun kol" },
      { img: "21.jpg",  name: "Polo Tişört — Gri, Yeşil Yan Garni, Polo Yaka, Uzun Kollu", tags: "Gri | Yeşil yan garni | Polo yaka | Uzun kol" },
      { img: "beyaz-siyah-raglan-bisiklet-yaka-tisort.png", code: "KT-TS-026", name: "Beyaz Siyah Raglan Kollu Bisiklet Yaka Tişört", tags: "Beyaz | Siyah raglan kollu | Bisiklet yaka | Kısa kol" },
      { img: "beyaz-siyah-raglan-polo-yaka-tisort.png", code: "KT-TS-027", name: "Beyaz Siyah Raglan Kollu Polo Yaka Tişört", tags: "Beyaz | Siyah raglan kollu | Polo yaka | Kısa kol" },
      { img: "kt-ts-028-lacivert-geometrik-garnili-is-tisortu.jpeg", code: "KT-TS-028", name: "Lacivert Geometrik Garnili İş Tişörtü", tags: "Lacivert | Gri geometrik gövde paneli | Reflektif biye | Bisiklet yaka | Kısa kol" },
      { img: "kt-ts-029-beyaz-lacivert-garnili-polo-tisort.jpeg", code: "KT-TS-029", name: "Beyaz Lacivert Garnili Polo Tişört", tags: "Beyaz | Lacivert omuz ve yaka garnisi | Göğüs şerit detayı | Polo yaka | Kısa kol" },
      { img: "kt-ts-030-lacivert-fosfor-detayli-polo-tisort.jpeg", code: "KT-TS-030", name: "Lacivert Fosfor Detaylı Polo Tişört", tags: "Lacivert | Fosfor sarı biye | Göğüs cep detayı | Polo yaka | Kısa kol" },
      { img: "kt-ts-031-lacivert-biyeli-polo-yaka-is-tisortu.webp", code: "KT-TS-031", name: "Lacivert Biyeli Polo Yaka İş Tişörtü", tags: "Lacivert | Polo yaka | Gri omuz biyesi | Kontrast iç pat | Kısa kol", description: "Lacivert gövde, gri iç pat ve omuz biyeleriyle sade bir kurumsal görünüm sunan polo yaka iş tişörtü. Ofis, teknik servis, mağaza ve saha ekiplerinin günlük kullanımı için uygundur. Lakost kumaş, ribanalı yaka ve üç düğmeli pat yapısıyla üretilebilir. Firma logosu göğüs veya kol bölümüne nakış ve baskı yöntemleriyle uygulanabilir." },
      { img: "kt-ts-032-antrasit-turuncu-garnili-polo-yaka-is-tisortu.webp", code: "KT-TS-032", name: "Antrasit Turuncu Garnili Polo Yaka İş Tişörtü", tags: "Antrasit | Turuncu yan paneller | Polo yaka | Kontrast iç pat | Kısa kol", description: "Antrasit ana renk ile turuncu yan garnileri birleştiren, ekip görünürlüğünü ve kurumsal renk kullanımını destekleyen polo yaka model. Yan paneller ayrı kumaş parçalarıyla dikilerek üretilebilir. Üretim, lojistik, teknik servis ve saha operasyonlarında kullanılabilir. Göğüs, sırt veya kol bölümüne logo uygulanabilir." },
      { img: "kt-ts-033-lacivert-saks-raglan-kollu-is-tisortu.webp", code: "KT-TS-033", name: "Lacivert Saks Raglan Kollu İş Tişörtü", tags: "Lacivert gövde | Saks mavisi raglan kol | Kontrast biye | Bisiklet yaka | Kısa kol", description: "Lacivert gövde, saks mavisi raglan kollar ve kontrast biyelerle hareketli fakat düzenli bir görünüm sağlayan bisiklet yaka iş tişörtü. Raglan kol yapısı omuz hareketlerini destekler. Teknik ekipler, depo çalışanları, saha personeli ve organizasyon ekipleri için değerlendirilebilir. Biye malzemesi proje ihtiyacına göre standart veya reflektif olarak planlanabilir." },
      { img: "kt-ts-034-gri-siyah-robali-cepli-is-tisortu.webp", code: "KT-TS-034", name: "Gri Siyah Robalı Cepli İş Tişörtü", tags: "Gri gövde | Siyah omuz robası | Siyah kısa kol | Göğüs cebi | Bisiklet yaka", description: "Gri gövdeyi siyah omuz robası, kollar ve göğüs cebiyle tamamlayan bisiklet yaka iş tişörtü. Kontrast göğüs cebi küçük ekipman, kart veya kalem taşımaya yardımcı olur. Üretim, bakım, depo ve teknik servis ekipleri için işlevsel bir seçenektir. Logo uygulaması göğüs cebinin karşısına, kola veya sırt bölümüne konumlandırılabilir." },
      { img: "kt-ts-035-petrol-mavisi-fermuarli-cepli-teknik-polo-tisort.webp", code: "KT-TS-035", name: "Petrol Mavisi Fermuarlı Cepli Teknik Polo Tişört", tags: "Petrol mavisi | Lacivert omuz ve yan panel | Fermuarlı göğüs cebi | Polo yaka | Turuncu fermuar detayı", description: "Petrol mavisi gövde, lacivert omuz ve yan paneller ile fermuarlı göğüs cebinden oluşan teknik polo yaka model. Cep yapısı küçük ekipman ve kartların daha kontrollü taşınmasını sağlar. Teknik servis, montaj, bakım ve saha ekiplerinin kurumsal kullanımı için tasarlanabilir. Logo ölçüsü ve konumu cep yapısı dikkate alınarak numune üzerinde belirlenir." },
      { img: "kt-ts-036-siyah-fosfor-garnili-bisiklet-yaka-is-tisortu.webp", code: "KT-TS-036", name: "Siyah Fosfor Garnili Bisiklet Yaka İş Tişörtü", tags: "Siyah gövde | Fosfor sarısı omuz parçaları | Fosfor sarısı yan paneller | Bisiklet yaka | Kısa kol", description: "Siyah ana gövdeyi fosfor sarısı omuz ve yan panellerle tamamlayan yüksek kontrastlı bisiklet yaka iş tişörtü. Lojistik, depo, saha ve teknik ekiplerde çalışan grupların birbirinden kolay ayrılması ve kurumsal görünümün desteklenmesi için kullanılabilir. Fosforlu paneller görünürlüğü destekler; reflektif özellik isteniyorsa ayrıca uygun reflektif malzeme planlanır." }
    ]
  },

  /* ---------------- SWEATSHIRT & HOODIE ---------------- */
  {
    id: "sweat",
    nav: "Sweatshirt",
    eyebrow: "Kapüşonlu · fermuarlı · reflektörlü",
    title: "Sweatshirt & Hoodie Modellerimiz",
    desc: "Kurumsal kullanım için bisiklet yaka, polo yaka, fermuarlı ve kapüşonlu sweatshirt modelleri.",
    prefix: "KT-SW",
    codeStart: 1,
    baseName: "Sweatshirt Modeli",
    tags: "Kapüşonlu | Fermuarlı | Reflektörlü",
    keywords: "sweat sweatshirt hoodie kapüşonlu fermuarlı yarım fermuarlı tam fermuarlı polo yaka bisiklet yaka reflektörlü fosforlu",
    unit: "model",
    urunler: [
      { img: "siyah-polo-yaka-sweatshirt.png", name: "Siyah Polo Yaka Sweatshirt", tags: "Polo yaka | Uzun kol | Siyah" },
      { img: "beyaz-bisiklet-yaka-sweatshirt.png", name: "Beyaz Bisiklet Yaka Sweatshirt", tags: "Bisiklet yaka | Uzun kol | Beyaz" },
      { img: "1.png",   name: "Saks Mavi Reflektörlü Kapüşonlu Hoodie",        tags: "Kapüşonlu | Reflektörlü | Saks Mavi" },
      { img: "2.png",   name: "Yeşil Reflektörlü Kapüşonlu Hoodie",            tags: "Kapüşonlu | Reflektörlü | Yeşil" },
      { img: "3.png",   name: "Kırmızı Tam Fermuarlı Hoodie",                  tags: "Kapüşonlu | Tam Fermuarlı | Kırmızı" },
      { img: "4.png",   name: "Sarı Reflektörlü Tam Fermuarlı Hoodie",         tags: "Kapüşonlu | Tam Fermuarlı | Reflektörlü" },
      { img: "5.png",   name: "Kırmızı Reflektörlü Tam Fermuarlı Hoodie",      tags: "Kapüşonlu | Tam Fermuarlı | Reflektörlü" },
      { img: "6.png",   name: "Gri Yarım Fermuarlı Hoodie",                    tags: "Kapüşonlu | Yarım Fermuarlı | Gri" },
      { img: "7.png",   name: "Gri Reflektörlü Yarım Fermuarlı Hoodie",        tags: "Kapüşonlu | Yarım Fermuarlı | Reflektörlü" },
      { img: "8.png",   name: "Saks Mavi Reflektörlü Yarım Fermuarlı Hoodie",  tags: "Kapüşonlu | Yarım Fermuarlı | Reflektörlü" },
      { img: "9.png",   name: "Siyah Klasik Hoodie",                           tags: "Kapüşonlu | Klasik Kesim | Siyah" },
      { img: "10.png",  name: "Gri Reflektörlü Polo Yaka Sweatshirt",          tags: "Polo Yaka | Reflektörlü | Gri" },
      { img: "11.png",  name: "Beyaz Reflektörlü Polo Yaka Sweatshirt",        tags: "Polo Yaka | Reflektörlü | Beyaz" },
      { img: "12.png",  name: "Beyaz Reflektörlü Bisiklet Yaka Sweatshirt",    tags: "Bisiklet Yaka | Reflektörlü | Beyaz" },
      { img: "13.png",  name: "Siyah Reflektörlü Bisiklet Yaka Sweatshirt",    tags: "Bisiklet Yaka | Reflektörlü | Siyah" },
      { img: "14.png",  name: "Siyah Reflektörlü Polo Yaka Sweatshirt",        tags: "Polo Yaka | Reflektörlü | Siyah" },
      { img: "15.png",  name: "Saks Mavi Reflektörlü Bisiklet Yaka Sweatshirt", tags: "Bisiklet Yaka | Reflektörlü | Saks Mavi" },
      { img: "16.png", code: "KT-SW-016", name: "Saks Mavi Reflektörlü Polo Yaka Sweatshirt", tags: "Polo Yaka | Reflektörlü | Saks Mavi" },
      { img: "17.png",  name: "Gri Bisiklet Yaka Sweatshirt",                  tags: "Bisiklet Yaka | Klasik Kesim | Gri" },
      { img: "18.jpeg", name: "Saks Mavi İki Renk Polo Yaka Sweatshirt",       tags: "Polo Yaka | İki Renk Tasarım | Saks Mavi" },
      { img: "19.jpeg", name: "Saks Mavi Fosfor Kollu Polo Yaka Sweatshirt",   tags: "Polo Yaka | Fosfor Kol Detayı | Saks Mavi" },
      { img: "20.jpeg", name: "Lacivert Bisiklet Yaka Sweatshirt",             tags: "Bisiklet Yaka | Klasik Kesim | Lacivert" },
      { img: "21.jpg",  name: "Siyah Reflektörlü Bisiklet Yaka Sweatshirt",    tags: "Bisiklet Yaka | Reflektörlü | Siyah" },
      { img: "beyaz-siyah-raglan-bisiklet-yaka-sweatshirt.png", code: "KT-SW-024", name: "Beyaz Siyah Raglan Kollu Bisiklet Yaka Sweatshirt", tags: "Beyaz | Siyah raglan kollu | Bisiklet yaka | Uzun kol" },
      { img: "kt-sw-025-siyah-gri-omuz-garnili-sweatshirt.jpeg", code: "KT-SW-025", name: "Siyah Gri Omuz Garnili Sweatshirt", tags: "Siyah | Gri omuz paneli | Kırmızı biye | Göğüs şerit detayı | Bisiklet yaka | Uzun kol" },
      { img: "kt-sw-026-beyaz-siyah-cepli-sweatshirt.jpeg", code: "KT-SW-026", name: "Beyaz Siyah Garnili Cepli Sweatshirt", tags: "Beyaz | Siyah omuz ve kol garnisi | Fermuarlı göğüs cebi | Bisiklet yaka | Uzun kol" },
      { img: "kt-sw-027-gri-siyah-polo-yaka-sweatshirt.jpeg", code: "KT-SW-027", name: "Gri Siyah Garnili Polo Yaka Sweatshirt", tags: "Gri | Siyah omuz paneli | Göğüs şerit detayı | Polo yaka | Uzun kol" },
      { img: "kt-sw-028-grafit-turuncu-yarim-fermuarli-teknik-sweatshirt.webp", code: "KT-SW-028", name: "Grafit Turuncu Yarım Fermuarlı Teknik Sweatshirt", tags: "Grafit | Turuncu omuz biyesi | Yarım fermuarlı dik yaka | Fermuarlı göğüs cebi | Siyah kol takviyesi", description: "Grafit sweatshirt kumaşını turuncu omuz biyeleri, siyah kol takviyeleri, dik yaka ve fermuarlı göğüs cebiyle tamamlayan bakım ve teknik servis ekiplerine yönelik yarım fermuarlı modeldir." },
      { img: "kt-sw-029-lacivert-saks-tam-fermuarli-kapusonlu-sweatshirt.webp", code: "KT-SW-029", name: "Lacivert Saks Tam Fermuarlı Kapüşonlu Sweatshirt", tags: "Lacivert | Saks geometrik yan paneller | Tam fermuarlı | Kapüşonlu | Fermuarlı el ve kol cepleri", description: "Lacivert ana kumaşı saks mavi geometrik yan paneller, tam boy fermuar, kapüşon ve üç fermuarlı ceple birleştiren kurumsal ekip kullanımına uygun ağır gramajlı sweatshirt modelidir." },
      { img: "kt-sw-030-petrol-antrasit-cepli-bisiklet-yaka-sweatshirt.webp", code: "KT-SW-030", name: "Petrol Antrasit Cepli Bisiklet Yaka Sweatshirt", tags: "Petrol mavisi | Antrasit omuz ve yan paneller | Bisiklet yaka | Fermuarlı göğüs cebi | Dirsek takviyesi", description: "Petrol mavisi gövdesi, antrasit kavisli omuz paneli, dikiş hattına yerleştirilen göğüs cebi ve ton sür ton dirsek takviyeleriyle hareketli işlere yönelik bisiklet yaka sweatshirt modelidir." },
      { img: "kt-sw-031-bej-kahverengi-cepli-polo-yaka-sweatshirt.webp", code: "KT-SW-031", name: "Bej Kahverengi Cepli Polo Yaka Sweatshirt", tags: "Bej | Kahverengi polo yaka ve omuz detayı | Üç düğmeli pat | Fermuarlı göğüs cebi | Ribanalı etek", description: "Bej sweatshirt kumaşını kahverengi polo yaka, omuz şeritleri ve düşük profilli fermuarlı göğüs cebiyle tamamlayan servis ve saha koordinasyon ekiplerine yönelik kurumsal modeldir." },
      { img: "kt-sw-032-bordo-antrasit-kanguru-cepli-kapusonlu-sweatshirt.webp", code: "KT-SW-032", name: "Bordo Antrasit Kanguru Cepli Kapüşonlu Sweatshirt", tags: "Bordo | Antrasit omuz robası ve kapüşon | Fermuarlı bölmeli kanguru cep | Kol cebi | Reflektif biye", description: "Bordo gövdesi, antrasit omuz robası ve kapüşonu, fermuarla bölünmüş kanguru cebi ve kol cebiyle depo ve üretim ekipleri için işlevsel bir kapüşonlu sweatshirt modelidir." },
      { img: "kt-sw-033-lacivert-fosfor-reflektif-yarim-fermuarli-sweatshirt.webp", code: "KT-SW-033", name: "Lacivert Fosfor Reflektif Yarım Fermuarlı Sweatshirt", tags: "Lacivert | Fosfor sarı asimetrik omuz paneli | Yarım fermuarlı dik yaka | Dikey reflektif kol detayı | Siyah kol takviyesi", description: "Lacivert ana kumaşı fosfor sarı asimetrik omuz paneli, siyah kol takviyeleri ve dikey segment reflektörlerle tamamlayan görünürlük odaklı yarım fermuarlı iş sweatshirtüdür." }
    ]
  },

  /* ---------------- PANTOLON ---------------- */
  {
    id: "pantolon",
    nav: "Pantolon",
    eyebrow: "İş pantolonu · kargo cepli · reflektörlü",
    title: "Pantolon Modellerimiz",
    desc: "Saha ve üretim kullanımı için dayanıklı, cepli ve reflektörlü iş pantolonları.",
    prefix: "KT-PT",
    baseName: "Pantolon Modeli",
    tags: "Kargo Cep | Reflektör | Gabardin",
    keywords: "pantolon iş pantolonu kargo cepli reflektörlü",
    unit: "model",
    urunler: [
      { img: "01.jpeg", name: "Çok Cepli İş Pantolonu — Haki, Siyah Diz Takviye, Çoklu Kargo Cepler, Dikey Fermuarlı Detay", tags: "Haki | Siyah diz takviye | Çoklu kargo cepleri | Dikey fermuarlı cep | İş/teknik | Reflektör: yok" },
      { img: "02.jpg",  name: "Kargo Pantolon — Lacivert, Elastik Bel, Çoklu Kargo Cepler, Reflektörlü Üst Şerit", tags: "Lacivert | Elastik bel | Çoklu kargo cepleri | Reflektörlü üst şerit | Fonksiyonel" },
      { img: "03.jpg",  name: "Klasik İş Pantolonu — Antrasit, Saks Cep Kapaklı Yan Cepli, Elastik Bel", tags: "Antrasit | Saks cep kapaklı | Elastik bel | Yan cep | Kurumsal" },
      { img: "04.jpg",  name: "Kontrast Panelli İş Pantolonu — Açık Gri / Koyu Gri, Fermuarlı Cep, Diz Panelleri", tags: "Açık gri | Koyu gri kontrast paneller | Fermuarlı cep | Diz takviye panelleri" },
      { img: "05.jpg",  name: "Reflektörlü Kargo Pantolon — Gri, Dizlik Reflektör Şeridi, Kargo Cep", tags: "Gri | Dizlik reflektör şeridi | Kargo cepli | İş güvenliği unsuru" },
      { img: "06.jpg",  name: "Reflektörlü Kargo Pantolon — Açık Gri, Elastik Bel, Kargo Cep Kapaklı, Reflektörlü Diz Şeridi", tags: "Açık gri | Elastik bel | Kargo cep kapaklı | Diz reflektörlü şerit | İş güvenliği" },
      { img: "07.jpg",  name: "Kargo Pantolon — Gri, Kırmızı Garnili Cep Kapaklı, Elastik Bel", tags: "Gri | Kırmızı garni | Cep kapaklı | Elastik bel | Kurumsal" },
      { img: "08.jpg",  name: "Kargo Pantolon — Koyu Gri, Kırmızı Garnili Cep Kapaklı, Elastik Bel", tags: "Koyu gri | Kırmızı garni | Cep kapaklı | Elastik bel | Fonksiyonel" },
      { img: "09.jpg",  name: "Çok Cepli İş Pantolonu — Siyah, Diz Takviyeli, Kargo Cep Kapaklı", tags: "Siyah | Çok cepli | Diz takviye | Kargo cep kapaklı | İş/teknik" },
      { img: "10.jpg",  name: "Kargo Pantolon — Mavi Kot Kumaştan, Elastik Bel, Büyük Kargo Cepler, Dizlik Panelleri", tags: "Mavi kot | Elastik bel | Büyük kargo cepler | Dizlik panelleri | Kurumsal/teknik" },
      { img: "11.jpeg", name: "Reflektörlü Kargo Pantolon — Gri, Turuncu Reflektör Şeritli, Çoklu Cep, Diz Takviyeli", tags: "Gri | Turuncu reflektör şeritli | Çoklu cep | Diz takviye | İş güvenliği" },
      { img: "12.jpeg", name: "Koyu Gri Kot Kumaşından Kargo Pantolon, Gri Kontrast Cep Kapakları, Fermuarlı Yan Cep, Diz Takviyeli", tags: "Koyu gri kot | Gri kontrast cep kapakları | Fermuarlı yan cep | Diz takviyeli | Fonksiyonel" },
      { img: "13.jpeg", name: "Denim Kargo Pantolon — Koyu Mavi, Siyah Diz Takviyeli, Cep Kapaklı, Çoklu Cep", tags: "Koyu mavi | Siyah diz takviyeli | Cep kapaklı | Çoklu cep | Denim" },
      { img: "14.jpeg", name: "Reflektörlü Kargo Pantolon — Gri, Fosfor Detaylı, Diz Takviyeli", tags: "Gri | Fosfor detaylı | Diz takviyeli | Reflektörlü detay | İş güvenliği" },
      { img: "15.jpeg", name: "Reflektörlü Kargo Pantolon — Bej, Siyah Diz Takviyeli, Cep Kapaklı", tags: "Bej | Siyah diz takviyeli | Cep kapaklı | Reflektör: yok | İş/kurumsal" },
      { img: "kt-pt-016-lacivert-kirmizi-reflektorlu-is-pantolonu.png", keepFormat: true, code: "KT-PT-016", name: "Lacivert Kırmızı Detaylı Reflektörlü İş Pantolonu", tags: "Lacivert | Kırmızı cep ve biye detayları | Tek sıra reflektif paça bandı | Elastik bel | İş güvenliği", description: "Lacivert gövdeyi kırmızı cep ve biye ayrıntılarıyla tamamlayan, iki paçada reflektif bant bulunan kurumsal iş pantolonudur. Üretim, saha, lojistik ve teknik servis ekipleri için firma renklerine göre uyarlanabilir." },
      { img: "17.png",  name: "Reflektörlü İş Pantolonu — Lacivert, Diz Reflektörlü Bantlı, Yan Cep Kapaklı", tags: "Lacivert | Reflektörlü diz bandı | Yan cep kapaklı | Kurumsal/iş" },
      { img: "18.png",  name: "Reflektörlü Kot Pantolon — Koyu Mavi, Diz Reflektörlü Bantlı, Yan Cep Kapaklı", tags: "Koyu mavi | Reflektörlü diz bandı | Yan cep kapaklı | Denim" },
      { img: "kt-pt-019-antrasit-kargo-cepli-is-pantolonu.jpeg", code: "KT-PT-019", name: "Antrasit Kargo Cepli İş Pantolonu", tags: "Antrasit | Yan kargo cebi | Düz paça | Kurumsal iş modeli | Reflektör: yok" },
      { img: "kt-pt-020-antrasit-reflektorlu-is-pantolonu.jpeg", code: "KT-PT-020", name: "Antrasit Turuncu Detaylı Reflektörlü İş Pantolonu", tags: "Antrasit | Turuncu cep garnisi | Çift reflektif paça bandı | Kargo cepli | İş güvenliği" },
      { img: "kt-pt-021-gri-diz-takviyeli-is-pantolonu.jpeg", code: "KT-PT-021", name: "Gri Siyah Diz Takviyeli İş Pantolonu", tags: "Gri | Siyah diz takviyesi | Kargo cebi | Esnek bel paneli | Teknik iş pantolonu" },
      { img: "kt-pt-022-lacivert-kapak-cepli-diz-takviyeli-is-pantolonu.webp", code: "KT-PT-022", name: "Lacivert Kapak Cepli Diz Takviyeli İş Pantolonu", tags: "Lacivert | Kapaklı kargo cepleri | Ton sür ton diz takviyesi | Düz paça | Reflektör: yok", description: "Lacivert ana kumaşı, iki kapaklı kargo cebi ve aynı renkte diz takviyeleriyle saha ekiplerine işlevsel, dengeli ve kurumsal bir görünüm sunan iş pantolonudur." },
      { img: "kt-pt-023-lacivert-saks-biyeli-servis-is-pantolonu.webp", code: "KT-PT-023", name: "Lacivert Saks Biyeli Servis İş Pantolonu", tags: "Lacivert | Saks biye detayı | Fermuarlı baldır cebi | Sade kesim | Reflektör: yok", description: "Kargo cep hacmi oluşturmayan sade kesimi, saks biyeleri ve fermuarlı baldır cebiyle servis, teknik destek ve saha koordinasyon ekipleri için planlanan kurumsal iş pantolonudur." },
      { img: "kt-pt-024-siyah-fosfor-panelli-reflektorlu-is-pantolonu.webp", code: "KT-PT-024", name: "Siyah Fosfor Panelli Reflektörlü İş Pantolonu", tags: "Siyah | Fosfor sarı yan paneller | Kargo cebi | Çift reflektif paça bandı | Yüksek görünürlük", description: "Siyah zemin üzerindeki fosfor sarı üst panelleri, kargo cebi ve çift sıra paça reflektörleriyle görünürlüğün öncelikli olduğu saha görevlerine yönelik teknik iş pantolonudur." },
      { img: "kt-pt-025-lacivert-fosfor-panelli-dikey-reflektorlu-is-pantolonu.webp", code: "KT-PT-025", name: "Lacivert Fosfor Panelli Dikey Reflektörlü İş Pantolonu", tags: "Lacivert | Fosfor sarı üst panel | Dikey reflektif paça detayı | Fermuarlı cep | Diz takviyesi", description: "Lacivert gövdeyi fosfor sarı bel panelleri, aşınmaya dayanıklı diz parçaları ve dikey reflektif paça detaylarıyla birleştiren özgün yüksek görünürlüklü iş pantolonudur." },
      { img: "kt-pt-026-grafit-asimetrik-panelli-teknik-is-pantolonu.webp", code: "KT-PT-026", name: "Grafit Asimetrik Panelli Teknik İş Pantolonu", tags: "Grafit | Asimetrik siyah paneller | Fermuarlı cep | Tek kargo cebi | Diz takviyesi", description: "Asimetrik siyah üst panelleri, tek kapaklı kargo cebi, dikey fermuarlı cebi ve geniş diz takviyeleriyle hareketli teknik görevler için geliştirilen grafit iş pantolonudur." },
      { img: "kt-pt-027-bej-kahverengi-panelli-teknik-is-pantolonu.webp", code: "KT-PT-027", name: "Bej Kahverengi Panelli Teknik İş Pantolonu", tags: "Bej | Kahverengi yan paneller | Gizli fermuarlı cepler | Ton sür ton diz formu | Ayarlanabilir paça", description: "Sıcak bej gövde, kahverengi yan paneller, dikiş hattına yerleştirilen fermuarlı cepler ve ayarlanabilir paçalarla sade görünümü teknik ayrıntılarla tamamlayan iş pantolonudur." }
    ]
  },

  /* ---------------- İŞ TULUMU ---------------- */
  {
    id: "tulum",
    nav: "İş Tulumu",
    eyebrow: "Teknik kumaş · ağır iş · cepli",
    title: "İş Tulumu Modellerimiz",
    desc: "Üretim, bakım ve saha ekipleri için fonksiyonel iş tulumu seçenekleri.",
    prefix: "KT-TL",
    baseName: "İş Tulumu Modeli",
    tags: "Ağır İş | Çok Cepli | Teknik Kumaş",
    keywords: "tulum iş tulumu teknik kumaş ağır iş",
    unit: "model",
    urunler: [
      { img: "01.jpg", name: "Antrasit Turuncu Detaylı Bahçıvan Tulumu", tags: "Antrasit | Turuncu kontrast detay | Siyah diz takviyesi | Çok cepli | Ayarlanabilir askı" },
      { img: "03.jpg", name: "Lacivert Saks Detaylı Bahçıvan Tulumu", tags: "Lacivert | Saks mavi fermuar detayı | Fermuarlı göğüs cebi | Yan kargo cebi | Ayarlanabilir askı" },
      { img: "05.jpeg", name: "Haki Siyah Diz Takviyeli Bahçıvan Tulumu", tags: "Haki | Siyah diz takviyesi | Fosfor sarı fermuar detayı | Çok cepli | Ayarlanabilir askı" },
      { img: "06.jpg", name: "Gri Kırmızı Garnili Bahçıvan Tulumu", tags: "Gri | Kırmızı göğüs ve diz garnisi | Kapaklı göğüs cebi | Yan kargo cebi | Ayarlanabilir askı" },
      { img: "07.jpeg", name: "Lacivert Çok Cepli Bahçıvan Tulumu", tags: "Lacivert | Fermuarlı göğüs cebi | Çoklu kargo cepleri | Düz paça | Ayarlanabilir askı" },
      { img: "08.jpeg", name: "Saks Mavi Klasik Bahçıvan Tulumu", tags: "Saks mavi | Kapaklı göğüs cebi | Yan kargo cebi | Düz paça | Ayarlanabilir askı" },
      { img: "kt-tl-015-saks-mavi-bahcivan-tulumu.jpeg", code: "KT-TL-015", name: "Saks Mavi Reflektörlü Bahçıvan Tulumu", tags: "Saks mavi | Ayarlanabilir askı | Göğüs ve yan cepler | Reflektif paça bandı | Bahçıvan tulumu" },
      { img: "kt-tl-019-bej-kahverengi-panelli-bahcivan-tulumu.webp", code: "KT-TL-019", name: "Bej Kahverengi Panelli Bahçıvan Tulumu", tags: "Bej | Kahverengi yan paneller | Fermuarlı göğüs cebi | Ton sür ton diz formu | Ayarlanabilir askı", description: "Bej ana kumaşı, kahverengi yan panelleri, yatay fermuarlı göğüs cebi ve düşük hacimli cep düzeniyle servis ve saha ekipleri için planlanan modern bahçıvan tulumudur." },
      { img: "kt-tl-020-antrasit-saks-panelli-bahcivan-tulumu.webp", code: "KT-TL-020", name: "Antrasit Saks Panelli Bahçıvan Tulumu", tags: "Antrasit | Saks göğüs paneli | Çift fermuarlı göğüs cebi | Siyah petek diz takviyesi | Ayarlanabilir askı", description: "Antrasit gövdeyi saks mavi göğüs paneli, çift fermuarlı cep ve petek dokulu geniş diz takviyeleriyle birleştiren atölye ve montaj ekiplerine yönelik bahçıvan tulumudur." },
      { img: "kt-tl-021-lacivert-fosfor-panelli-reflektorlu-bahcivan-tulumu.webp", code: "KT-TL-021", name: "Lacivert Fosfor Panelli Reflektörlü Bahçıvan Tulumu", tags: "Lacivert | Fosfor sarı göğüs panelleri | Siyah diz takviyesi | Dikey reflektif paça detayı | Ayarlanabilir askı", description: "Lacivert kumaşı fosfor sarı göğüs panelleri, siyah diz takviyeleri ve dikey segment reflektörlerle tamamlayan, lojistik ve açık saha ekipleri için yüksek görünürlüklü bahçıvan tulumudur." },
      { img: "02.jpg", name: "Siyah Reflektörlü İş Tulumu", tags: "Siyah | Göğüs, kol ve paçada reflektif bant | Çok cepli | Elastik bel | Gizli fermuarlı ön kapama" },
      { img: "04.jpg", name: "Lacivert Reflektörlü İş Tulumu", tags: "Lacivert | Göğüs ve paçada reflektif bant | Fermuarlı göğüs cepleri | Yan cepler | Gizli fermuarlı ön kapama" },
      { img: "09.jpeg", name: "Lacivert Fermuarlı Klasik İş Tulumu", tags: "Lacivert | Tam boy fermuarlı | Fermuarlı göğüs cepleri | Yan kargo cebi | Reflektörsüz klasik model" },
      { img: "10.jpeg", name: "Turuncu Reflektif Biyeli İş Tulumu", tags: "Turuncu | Göğüs ceplerinde reflektif biye | Paçada reflektif şerit | Çok cepli | Tam boy fermuarlı" },
      { img: "11.jpg", name: "Gri Reflektörlü Çok Cepli İş Tulumu", tags: "Gri | Göğüs ve paçada reflektif bant | Fermuarlı göğüs cepleri | Yan kargo cebi | Gizli fermuarlı ön kapama" },
      { img: "12.jpeg", name: "Haki Siyah Takviyeli İş Tulumu", tags: "Haki | Siyah dirsek ve diz takviyesi | Fosfor sarı fermuar detayı | Çok cepli | Dik yaka" },
      { img: "kt-tl-013-saks-mavi-reflektorlu-is-tulumu.jpeg", code: "KT-TL-013", name: "Saks Mavi Reflektörlü İş Tulumu", tags: "Saks mavi | Siyah omuz ve göğüs garnisi | Kol ve paça reflektörü | Çok cepli | Tam boy fermuarlı" },
      { img: "kt-tl-014-siyah-cift-reflektorlu-is-tulumu.jpeg", code: "KT-TL-014", name: "Siyah Çift Reflektörlü İş Tulumu", tags: "Siyah | Göğüs reflektif biyeli | Çift reflektif paça bandı | Çok cepli | Tam boy fermuarlı" },
      { img: "kt-tl-016-lacivert-gri-robali-kollu-is-tulumu.webp", code: "KT-TL-016", name: "Lacivert Gri Robalı Kollu İş Tulumu", tags: "Lacivert | Gri omuz robası | Dikey fermuarlı göğüs cebi | Kapaklı yan cep | Reflektör: yok", description: "Lacivert ana kumaşı, gri omuz robası, gizli ön kapaması ve dengeli cep yerleşimiyle bakım, üretim ve teknik servis ekiplerine sade bir kurumsal görünüm sunan kollu iş tulumudur." },
      { img: "kt-tl-017-grafit-turuncu-panelli-teknik-is-tulumu.webp", code: "KT-TL-017", name: "Grafit Turuncu Panelli Teknik İş Tulumu", tags: "Grafit | Turuncu geometrik paneller | Siyah dirsek ve diz takviyesi | Segment reflektif detay | Fermuarlı cepler", description: "Grafit gövdeyi turuncu geometrik omuz parçaları, siyah dirsek ve diz takviyeleri ile segment reflektif detaylarla birleştiren, hareketli bakım görevlerine yönelik teknik iş tulumudur." },
      { img: "kt-tl-018-petrol-antrasit-panelli-teknik-is-tulumu.webp", code: "KT-TL-018", name: "Petrol Antrasit Panelli Teknik İş Tulumu", tags: "Petrol mavisi | Antrasit yan paneller | Kavisli fermuarlı göğüs cepleri | Takviyeli dirsek | Reflektif biye", description: "Petrol mavisi gövdesi, antrasit yan panelleri, kavisli göğüs cepleri ve ince reflektif biyeleriyle teknik işlevi daha rafine bir ekip görünümüyle tamamlayan kollu iş tulumudur." }
    ]
  },

  /* ---------------- ÖNLÜK ---------------- */
  {
    id: "onluk",
    nav: "Önlük",
    eyebrow: "Mutfak · üretim · ofis",
    title: "Önlük Modellerimiz",
    desc: "Mutfak, gıda üretimi, laboratuvar ve kurumsal hizmet alanlarına uygun önlükler.",
    prefix: "KT-ON",
    baseName: "Önlük Modeli",
    tags: "Mutfak | Üretim | Ofis",
    keywords: "önlük mutfak aşçı üretim laboratuvar ofis",
    unit: "model",
    urunler: [
      { img: "04.jpg", name: "İş Önlük Modeli 1" },
      { img: "08.jpg", name: "İş Önlük Modeli 2" },
      { img: "10.jpg", name: "İş Önlük Modeli 3" },
      { img: "mavi-kareli-is-onlugu.png", code: "KT-ON-004", name: "Mavi Kareli İş Önlüğü", tags: "Mavi beyaz kareli | Kontrast yaka ve manşet | Üç cepli | Uzun kol" },
      { img: "beyaz-dik-yaka-is-onlugu.png", code: "KT-ON-005", name: "Beyaz Dik Yaka İş Önlüğü", tags: "Beyaz | Dik yaka | Çıtçıtlı | Üç cepli | Uzun kol" },
      { img: "11.jpg", name: "ESD İş Önlük Modeli 1" },
      { img: "12.jpeg", name: "ESD İş Önlük Modeli 2" },
      { img: "kt-on-022-gri-lacivert-robali-teknik-is-onlugu.webp", code: "KT-ON-022", name: "Gri Lacivert Robalı Teknik İş Önlüğü", tags: "Açık gri | Lacivert omuz robası ve manşet | Fermuarlı göğüs cebi | İki alt cep | Gizli kapama", description: "Açık gri gövdesi, lacivert omuz robası ve manşetleri, dikey fermuarlı göğüs cebi ile geniş alt cepleri sayesinde üretim ve kalite ekiplerine düzenli bir görünüm sunan uzun kollu iş önlüğüdür." },
      { img: "kt-on-023-petrol-antrasit-panelli-teknik-is-onlugu.webp", code: "KT-ON-023", name: "Petrol Antrasit Panelli Teknik İş Önlüğü", tags: "Petrol mavisi | Antrasit yan paneller | Kavisli fermuarlı cepler | Reflektif biye | Ayarlanabilir manşet", description: "Petrol mavisi ana kumaşı, antrasit kavisli yan panelleri ve dikiş hatlarına yerleştirilen fermuarlı cepleriyle elektronik, kalite kontrol ve hafif üretim ekiplerine yönelik teknik iş önlüğüdür." },
      { img: "02.jpg", name: "Askılı Önlük Modeli 1" },
      { img: "03.jpg", name: "Askılı Önlük Modeli 2" },
      { img: "05.jpg", name: "Askılı Önlük Modeli 3" },
      { img: "06.jpg", name: "Askılı Önlük Modeli 4" },
      { img: "14.jpeg", name: "Askılı Önlük Modeli 5" },
      { img: "15.jpeg", name: "Askılı Önlük Modeli 6" },
      { img: "09.jpg", name: "PVC Askılı Önlük Modeli 1" },
      { img: "kt-on-020-siyah-boyundan-askili-mutfak-onlugu.jpeg", code: "KT-ON-020", name: "Siyah Boyundan Askılı Mutfak Önlüğü", tags: "Siyah | Ayarlanabilir boyun askısı | Göğüs cebi | Bölmeli alt cep | Mutfak önlüğü" },
      { img: "kt-on-025-lacivert-denim-capraz-askili-onluk.webp", code: "KT-ON-025", name: "Lacivert Denim Çapraz Askılı Önlük", tags: "Lacivert denim | Çapraz sırt askısı | Deri görünümlü köşe detayları | Fermuarlı göğüs cebi | Üç bölmeli alt cep", description: "Lacivert denim yüzeyi, çapraz sırt askıları, fermuarlı göğüs cebi ve üç bölmeli alt cebiyle kafe, barista ve butik üretim ekipleri için dayanıklı bir askılı önlük modelidir." },
      { img: "kt-on-026-kiremit-antrasit-asimetrik-askili-onluk.webp", code: "KT-ON-026", name: "Kiremit Antrasit Asimetrik Askılı Önlük", tags: "Kiremit | Antrasit asimetrik panel | Ayarlanabilir boyun askısı | Gizli fermuarlı cep | Kalem bölmesi", description: "Kiremit gövde üzerindeki antrasit asimetrik paneli, gizli fermuarlı cebi ve ayarlanabilir boyun askısıyla açık mutfak ve restoran ekiplerine çağdaş bir görünüm kazandıran askılı önlüktür." },
      { img: "kt-on-027-adacayi-bej-uzun-askili-onluk.webp", code: "KT-ON-027", name: "Adaçayı Bej Uzun Askılı Önlük", tags: "Adaçayı yeşili | Bej göğüs robası | Kavisli yan cepler | Ayarlanabilir askı | Ön hareket yırtmacı", description: "Adaçayı yeşili kumaşı, bej göğüs robası, kavisli yan cepleri ve hareket kolaylığı sağlayan ön yırtmacıyla otel, fırın ve servis ekiplerine yönelik uzun askılı önlüktür." },
      { img: "01.jpg", name: "Şef Ceketi Modeli 1" },
      { img: "07.jpg", name: "Şef Ceketi Modeli 2" },
      { img: "kt-on-019-antrasit-kruvaze-sef-ceketi.jpeg", code: "KT-ON-019", name: "Antrasit Kruvaze Şef Ceketi", tags: "Antrasit | Hakim yaka | Kruvaze düğme | Kol cepli | Profesyonel mutfak" },
      { img: "kt-on-021-siyah-beyaz-biyeli-sef-ceketi.jpeg", code: "KT-ON-021", name: "Siyah Beyaz Biyeli Şef Ceketi", tags: "Siyah | Beyaz biye | Hakim yaka | Kruvaze düğme | Kol cepli" },
      { img: "kt-on-024-ekru-zeytin-asimetrik-sef-ceketi.webp", code: "KT-ON-024", name: "Ekru Zeytin Asimetrik Şef Ceketi", tags: "Ekru | Zeytin yeşili asimetrik biye | Gizli çıtçıt | Hakim yaka | Kol cebi", description: "Ekru ana kumaşı, zeytin yeşili asimetrik kapama çizgisi, gizli çıtçıtları ve nefes alan yan parçalarıyla profesyonel mutfak ekipleri için rafine bir şef ceketidir." },
      { img: "kt-on-028-lacivert-bakir-detayli-sef-ceketi.webp", code: "KT-ON-028", name: "Lacivert Bakır Detaylı Şef Ceketi", tags: "Lacivert | Bakır renk omuz ve manşet detayı | Asimetrik gizli kapama | File yan panel | Kol cebi", description: "Lacivert gövdeyi bakır renkli omuz ve manşet detayları, asimetrik gizli kapama ve nefes alan yan panellerle tamamlayan modern profesyonel şef ceketidir." },
      { img: "13.jpeg", name: "Belden Bağlama Önlük Modeli 1" },
      { img: "16.jpeg", name: "Belden Bağlama Önlük Modeli 2" },
      { img: "kt-on-029-bordo-antrasit-kruvaze-bel-onlugu.webp", code: "KT-ON-029", name: "Bordo Antrasit Kruvaze Bel Önlüğü", tags: "Bordo | Antrasit bel bandı ve bağlar | Kruvaze ön panel | Gizli fermuarlı cep | Diz boyu", description: "Bordo kumaşı, antrasit bel bandı, çapraz bindirmeli ön paneli ve gizli fermuarlı cebiyle restoran, bar ve servis ekiplerine düzenli bir siluet sunan belden bağlama önlüktür." },
      { img: "kt-on-030-camel-yesil-cok-cepli-bel-onlugu.webp", code: "KT-ON-030", name: "Camel Yeşil Çok Cepli Bel Önlüğü", tags: "Camel | Koyu yeşil alt panel | Üç farklı cep | Metal perçin detayı | Kısa servis modeli", description: "Camel kanvas gövdesi, koyu yeşil kavisli alt paneli ve farklı ölçülerde üç cebiyle kafe, fırın ve perakende hizmet ekipleri için işlevsel kısa bel önlüğüdür." }
    ]
  },

  /* ---------------- MONT & KABAN ---------------- */
  {
    id: "montkaban",
    nav: "Mont",
    eyebrow: "Kapüşonlu · reflektörlü · kışlık",
    title: "Mont & Kaban Modellerimiz",
    desc: "Soğuk hava ve saha şartları için kurumsal mont ve kaban çözümleri.",
    prefix: "KT-MK",
    baseName: "Mont & Kaban Modeli",
    tags: "Kışlık | Kapüşon | Reflektör",
    keywords: "mont kaban kışlık kapüşonlu reflektörlü",
    unit: "model",
    urunler: [
      { img: "01.jpg", name: "Antrasit Siyah Reflektörlü İş Montu", tags: "Antrasit | Siyah omuz paneli | Gri reflektif göğüs bandı | Turuncu biyeli çift kapaklı göğüs cep | Siyah dirsek takviyesi | Kışlık iş montu" },
      { img: "02.jpg", name: "Siyah Haki Şişme İş Montu", tags: "Siyah | Haki gövde paneli | Şişme dolgulu | Dik yaka | Fermuarlı yan cepler | Günlük saha montu" },
      { img: "04.jpg", code: "KT-MK-003", name: "Siyah Gri Enine dikişli Şişme Mont", tags: "Siyah | Gri V kesim gövde paneli | Enine ray dikişli şişme yapı | Çıtçıt kapamalı ön pat | Yan cepler | Kışlık mont" },
      { img: "08.jpg", code: "KT-MK-004", name: "Saks Mavi Reflektörlü İş Montu", tags: "Saks mavi | Siyah yaka, yan panel ve kol detayı | Göğüste reflektif şerit | Çift kapaklı göğüs cep | Fermuarlı yan cepler | İş montu" },
      { img: "09.jpg", name: "Siyah Gri Reflektör Şeritli İş Montu", tags: "Siyah | Göğüs ve kollarda gri reflektör şerit | Çift kapaklı göğüs cep | Dik yaka | Yan cepler | İş montu" },
      { img: "10.jpg", name: "Siyah Enine Ray Şişme Mont", tags: "Siyah | Enine ray dikişli şişme yapı | Dik yaka | Fermuarlı yan cepler | Sade tasarım | Kışlık mont" },
      { img: "13.jpeg", name: "Saks Mavi Sportif Kışlık Mont", tags: "Saks mavi | Omuz ve göğüste beyaz reflektif desen | Dikey fermuarlı göğüs cep | Yan reflektif cep detayı | Dik yaka | Kışlık saha montu" },
      { img: "14.jpeg", name: "Siyah Kapüşonlu Teknik Mont", tags: "Siyah | Kapüşonlu | Dikey fermuarlı göğüs cep | Fermuarlı yan cepler | Cırt ayarlı manşet | Teknik kışlık mont" },
      { img: "17.png", name: "Lacivert Kırmızı Reflektörlü İş Montu", tags: "Lacivert | Kırmızı omuz paneli | Geniş reflektif göğüs bandı | Çift kapaklı göğüs cep | Lastikli etek ve manşet | İş montu" },
      { img: "18.png", name: "Gri Saks Reflektörlü İş Montu", tags: "Gri | Saks omuz paneli | Geniş reflektif göğüs bandı | Çift kapaklı göğüs cep | Lastikli etek ve manşet | İş montu" },
      { img: "kt-mk-019-lacivert-kapusonlu-reflektorlu-is-montu.jpeg", code: "KT-MK-019", name: "Lacivert Kapüşonlu Reflektörlü İş Montu", tags: "Lacivert | Kapüşonlu | Siyah omuz garnisi | Reflektif kol bandı | Kışlık iş montu" },
      { img: "kt-mk-021-lacivert-reflektorlu-is-montu.jpeg", code: "KT-MK-021", name: "Lacivert Reflektörlü İş Montu", tags: "Lacivert | Göğüs ve kol reflektörü | Kapaklı göğüs cepleri | Ribanalı manşet | Kışlık iş montu" },
      { img: "kt-mk-022-petrol-antrasit-panelli-teknik-is-montu.webp", code: "KT-MK-022", name: "Petrol Antrasit Panelli Teknik İş Montu", tags: "Petrol mavisi | Antrasit yan ve dirsek panelleri | Dört fermuarlı cep | Reflektif omuz biyesi | Ayarlanabilir manşet", description: "Petrol mavisi gövdesi, antrasit yan ve dirsek panelleri, suya dayanıklı fermuarlı cepleri ve hafif yalıtımıyla teknik saha ekiplerine yönelik kalça hizasında iş montudur." },
      { img: "kt-mk-023-grafit-fosfor-panelli-kapusonlu-is-montu.webp", code: "KT-MK-023", name: "Grafit Fosfor Panelli Kapüşonlu İş Montu", tags: "Grafit | Fosfor sarı omuz paneli | Kapüşonlu | Segment reflektif kol detayı | Fermuarlı cepler", description: "Grafit teknik kumaşı fosfor sarı omuz ve cep panelleriyle tamamlayan, kapüşonlu yapısı ve segment kol reflektörleriyle görünürlüğü destekleyen kısa iş montudur." },
      { img: "kt-mk-024-tas-gri-lacivert-hibrit-is-montu.webp", code: "KT-MK-024", name: "Taş Gri Lacivert Hibrit İş Montu", tags: "Taş gri | Lacivert omuz ve kol panelleri | Dikey kanallı hafif dolgu | Fermuarlı göğüs cebi | Ribanalı iç manşet", description: "Dikey kanallı taş gri dolgulu gövdeyi lacivert dokuma omuz ve kol parçalarıyla birleştiren, depo, servis ve saha koordinasyon ekipleri için kalça hizasında hibrit iş montudur." },
      { img: "03.jpg", name: "Saks Mavi Siyah Reflektörlü İş Kabanı", tags: "Saks mavi | Siyah yaka, yan panel ve kol detayı | Göğüste reflektif şerit | Çift kapaklı göğüs cep | Fermuarlı yan cepler | İş kabanı" },
      { img: "05.jpg", name: "Fosfor Sarı Lacivert Reflektörlü Uzun Parka", tags: "Fosfor sarı | Lacivert alt panel | Dikey ve yatay reflektör bantlar | Kapaklı göğüs cep | Alt kapaklı cepler | Yüksek görünürlüklü uzun parka" },
      { img: "06.jpg", name: "Turuncu Lacivert Reflektörlü Uzun Parka", tags: "Turuncu | Lacivert alt panel | Dikey ve yatay reflektör bantlar | Kapaklı göğüs cep | Alt kapaklı cepler | Yüksek görünürlüklü uzun parka" },
      { img: "07.jpg", name: "Saks Mavi Bomber Kaban", tags: "Saks mavi | Bomber kesim | Ribanalı yaka, etek ve manşet | Fermuarlı göğüs cep | Fermuarlı yan cepler | Hafif kışlık kaban" },
      { img: "11.jpeg", name: "Lacivert Gri Çıkarılabilir Kollu Kaban", tags: "Lacivert | Gri omuz ve kol paneli | Saks şerit detayı | Çıkarılabilir kollu | Gizli ön pat | Çok amaçlı iş kabanı" },
      { img: "12.jpeg", name: "Fosfor Sarı Reflektörlü Uzun Yağmurluk", tags: "Fosfor sarı | Uzun kesim | Gövde ve kollarda çift reflektör bant | Kapaklı alt cepler | Çıtçıt kapamalı | Yüksek görünürlüklü yağmurluk" },
      { img: "15.jpeg", name: "Lacivert Turuncu Reflektörlü Kapüşonlu Parka", tags: "Lacivert | Turuncu kapüşon ve kol paneli | Göğüs ve kollarda reflektör bant | Büyük kapaklı alt cepler | Kapüşonlu | Kışlık parka" },
      { img: "16.jpeg", name: "Gri Turuncu Reflektörlü Kapüşonlu Parka", tags: "Gri | Turuncu omuz ve kapüşon paneli | Göğüs ve kollarda reflektör bant | Büyük kapaklı alt cepler | Kapüşonlu | Kışlık parka" },
      { img: "kt-mk-020-lacivert-uzun-is-parkasi.jpeg", code: "KT-MK-020", name: "Lacivert Uzun İş Parkası", tags: "Lacivert | Uzun kesim | Kapüşonlu | Göğüs ve alt kapaklı cepler | Kışlık parka" },
      { img: "kt-mk-025-haki-siyah-uzun-kapusonlu-is-kabani.webp", code: "KT-MK-025", name: "Haki Siyah Uzun Kapüşonlu İş Kabanı", tags: "Haki | Siyah omuz ve kol panelleri | Diz üstü uzun kesim | Kapüşonlu | Dört cepli", description: "Haki suya dayanıklı gövdesi, siyah takviye panelleri, sabit kapüşonu ve diz üstüne uzanan yalıtımlı kesimiyle soğuk hava saha çalışmaları için geliştirilen uzun iş kabanıdır." },
      { img: "kt-mk-026-lacivert-camel-uzun-kislik-is-kabani.webp", code: "KT-MK-026", name: "Lacivert Camel Uzun Kışlık İş Kabanı", tags: "Lacivert | Camel omuz robası | Diz üstü uzun kesim | Kapüşonlu | Alt kapaklı cepler", description: "Lacivert ana kumaşı, camel omuz robası, aşağı konumlandırılmış geniş cepleri ve diz üstü yalıtımlı gövdesiyle depo, tesis ve açık saha ekiplerine yönelik uzun kışlık iş kabanıdır." },
      { img: "kt-mk-027-bordo-antrasit-uzun-teknik-is-kabani.webp", code: "KT-MK-027", name: "Bordo Antrasit Uzun Teknik İş Kabanı", tags: "Bordo | Antrasit kapüşon ve omuz paneli | Diz üstü uzun kesim | Gizli fermuarlı cepler | Reflektif biye", description: "Bordo gövdeyi antrasit omuz, kapüşon ve kol panelleriyle birleştiren; diz üstüne uzanan kesimi, gizli cepleri ve ince reflektif biyeleriyle kurumsal teknik ekipler için tasarlanan uzun iş kabanıdır." }
    ]
  },

  /* ---------------- POLAR ---------------- */
  {
    id: "polar",
    nav: "Polar",
    eyebrow: "Fermuarlı · polar kumaş · rüzgar geçirmez",
    title: "Polar & Mont",
    desc: "Katmanlı giyim için hafif, sıcak tutan ve logolamaya uygun polar modelleri.",
    prefix: "KT-PL",
    baseName: "Polar Modeli",
    tags: "Polar Kumaş | Fermuarlı | Sıcak Tutar",
    keywords: "polar mont fermuarlı sıcak",
    unit: "model",
    urunler: [
      { img: "01.jpg", name: "Çift Renk Üç Cepli Polar Mont", tags: "Çift renk | Üç cepli | Polar mont" },
      { img: "02.jpg", name: "Siyah Polar Mont Omuz ve Yanlar Saks Garnili", tags: "Siyah | Omuz ve yanlar | Saks garnili | Polar mont" },
      { img: "03.jpg", name: "Bordo Polar Mont Ön Çift Cepli Sol Kol Fermuarlı Cepli Omuzlar Siyah Garnili", tags: "Bordo | Ön çift cepli | Sol kol fermuarlı cepli | Omuzlar siyah garnili | Polar mont" },
      { img: "04.jpeg", name: "Taktik Polar Mont Haki Yeşil Ön Çift, Sol Göğüs Fermuar Cepli", tags: "Taktik | Haki | Yeşil | Ön çift cepli | Sol göğüs fermuar cepli | Polar mont" },
      { img: "05.jpg", name: "Lacivert Klasik Üç Cepli Polar Mont", tags: "Lacivert | Klasik | Üç cepli | Polar mont" },
      { img: "06.jpg", name: "Çift Renk Polar Mont", tags: "Çift renk | Polar mont" },
      { img: "07.jpg", name: "Çift Renk Polar Mont", tags: "Çift renk | Polar mont" },
      { img: "08.jpg", name: "Saks Renk Polar Mont Yarım Fermuar Sağ Göğüs ve Omuzlar Fosfor Biyeli", tags: "Saks renk | Yarım fermuar | Sağ göğüs | Omuzlar fosfor biyeli | Polar mont" },
      { img: "09.jpg", code: "KT-PL-009", name: "Lacivert Polar Mont Kolları ve Beden Reflektör Bantlı Üç Cepli Fermuarlar Turuncu Reflektif", tags: "Lacivert | Reflektör bantlı | Üç cepli | Fermuarlar turuncu reflektif | Polar mont" },
      { img: "10.jpg", name: "Kırmızı Renk Klasik İki Cepli Polar Mont", tags: "Kırmızı | Klasik | İki cepli | Polar mont" },
      { img: "11.jpeg", name: "Siyah Renk Üç Cepli Taktik Polar Mont Fermuarlar Reflektif", tags: "Siyah | Üç cepli | Taktik | Fermuarlar reflektif | Polar mont" },
      { img: "12.jpeg", name: "Siyah Renk Klasik Üç Cepli Polar Mont", tags: "Siyah | Klasik | Üç cepli | Polar mont" },
      { img: "kt-pl-013-siyah-reflektif-biyeli-polar-mont.jpeg", code: "KT-PL-013", name: "Siyah Reflektif Biyeli Polar Mont", tags: "Siyah | Reflektif göğüs biyesi | Üç fermuarlı cep | Dik yaka | Polar mont" },
      { img: "kt-pl-014-lacivert-cepli-polar-mont.jpeg", code: "KT-PL-014", name: "Lacivert Siyah Cepli Polar Mont", tags: "Lacivert | Siyah göğüs cep paneli | Turuncu fermuar detayı | Üç cepli | Polar mont" },
      { img: "kt-pl-015-antrasit-omuz-garnili-polar-mont.jpeg", code: "KT-PL-015", name: "Antrasit Omuz Garnili Polar Mont", tags: "Antrasit | Siyah omuz garnisi | Turuncu fermuar detayı | Üç cepli | Polar mont" },
      { img: "kt-pl-016-petrol-antrasit-panelli-teknik-polar-mont.webp", code: "KT-PL-016", name: "Petrol Antrasit Panelli Teknik Polar Mont", tags: "Düz petrol polar | Antrasit omuz, yan ve kol panelleri | Tam fermuarlı | Üç fermuarlı cep | Ayarlanabilir etek", description: "Düz petrol renk anti-pilling polar kumaşı, antrasit dokuma takviye panelleri ve üç fermuarlı cebiyle teknik servis ve saha ekipleri için geliştirilen tam fermuarlı polar monttur." },
      { img: "kt-pl-017-tas-gri-lacivert-hibrit-polar-mont.webp", code: "KT-PL-017", name: "Taş Gri Lacivert Hibrit Polar Mont", tags: "Taş gri polar | Lacivert dikey kanallı göğüs paneli | Tam fermuarlı | Fermuarlı göğüs cebi | Ayarlanabilir etek", description: "Taş gri polar gövde ve kolları lacivert hafif dolgulu göğüs paneliyle birleştiren, depo ve iç-dış ortam geçişlerinde katmanlı kullanım için planlanan hibrit polar monttur." },
      { img: "kt-pl-018-grafit-turuncu-yarim-fermuarli-polar-mont.webp", code: "KT-PL-018", name: "Grafit Turuncu Yarım Fermuarlı Polar Mont", tags: "Grafit polar | Turuncu omuz detayı | Yarım fermuarlı dik yaka | Fermuarlı göğüs cebi | Siyah kol takviyesi", description: "Grafit anti-pilling polar kumaşı turuncu omuz detayları, siyah kol takviyeleri ve iki farklı fermuarlı cep çözümüyle tamamlayan yarım fermuarlı teknik polar modelidir." },
      { img: "kt-pl-019-bordo-antrasit-kapusonlu-polar-mont.webp", code: "KT-PL-019", name: "Bordo Antrasit Kapüşonlu Polar Mont", tags: "Bordo polar | Antrasit kapüşon, omuz ve alt cep paneli | Tam fermuarlı | Üç fermuarlı cep | Reflektif biye", description: "Bordo polar gövdeyi antrasit kapüşon, omuz robası ve alt cep paneliyle birleştiren; üç fermuarlı cebiyle soğuk depo ve açık saha destek ekiplerine yönelik kapüşonlu polar monttur." },
      { img: "kt-pl-020-lacivert-fosfor-reflektif-polar-mont.webp", code: "KT-PL-020", name: "Lacivert Fosfor Reflektif Polar Mont", tags: "Lacivert polar | Fosfor sarı asimetrik omuz paneli | Dikey reflektif kol detayı | Siyah kol takviyesi | Tam fermuarlı", description: "Lacivert polar kumaşı fosfor sarı asimetrik paneller, siyah kol takviyeleri ve dikey segment reflektörlerle tamamlayan görünürlük odaklı tam fermuarlı polar monttur." },
      { img: "kt-pl-021-camel-kahverengi-duz-polar-mont.webp", code: "KT-PL-021", name: "Camel Kahverengi Düz Polar Mont", tags: "Düz camel polar | Kahverengi yaka, omuz ve dirsek takviyesi | Tam fermuarlı | Üç cepli | Reflektör: yok", description: "Düz camel renk kısa tüylü anti-pilling polar kumaşı, kahverengi dokuma yaka ve takviye parçalarıyla tamamlayan servis ve kurumsal saha ekiplerine yönelik sıcak tutan polar monttur." },
      { img: "kt-pl-022-antrasit-saks-kapusonlu-polar-mont.webp", code: "KT-PL-022", name: "Antrasit Saks Kapüşonlu Polar Mont", tags: "Antrasit polar | Saks yan paneller ve kapüşon astarı | Kapüşonlu | Tam fermuarlı | Siyah kol takviyesi", description: "Antrasit anti-pilling polar gövdesi, saks mavi kavisli yan panelleri ve kapüşon astarıyla ekip renklerini öne çıkaran, üç fermuarlı cepli kapüşonlu polar monttur." },
      { img: "kt-pl-023-yesil-siyah-yarim-fermuarli-kapusonlu-polar-mont.webp", code: "KT-PL-023", name: "Yeşil Siyah Yarım Fermuarlı Kapüşonlu Polar Mont", tags: "Orman yeşili polar | Siyah kapüşon ve omuz robası | Yarım fermuarlı | Bölmeli kanguru cep | Kol takviyesi", description: "Orman yeşili polar kumaşı siyah dokuma kapüşon, omuz ve kol takviyeleriyle birleştiren; bölmeli kanguru cepli yarım fermuarlı kapüşonlu iş polar montudur." },
      { img: "kt-pl-024-tas-gri-lacivert-kapusonlu-hibrit-polar-mont.webp", code: "KT-PL-024", name: "Taş Gri Lacivert Kapüşonlu Hibrit Polar Mont", tags: "Taş gri polar | Lacivert kapüşon ve dolgulu göğüs paneli | Tam fermuarlı | Fermuarlı göğüs cebi | Dirsek takviyesi", description: "Taş gri polar gövde ve kolları lacivert kapüşonlu hafif dolgulu göğüs paneliyle tamamlayan, iç ve dış çalışma alanları arasında dengeli ısı sağlayan hibrit polar monttur." }
    ]
  },

  /* ---------------- YELEK ---------------- */
  {
    id: "yelek",
    nav: "Yelek",
    eyebrow: "Reflektörlü · cepli · şişme",
    title: "Yelek Modellerimiz",
    desc: "Depo, saha, sevkiyat ve teknik ekipler için fonksiyonel yelek modelleri.",
    prefix: "KT-YL",
    baseName: "Yelek Modeli",
    tags: "Reflektör | Çok Cepli | Şişme",
    keywords: "yelek reflektörlü şişme çok cepli",
    unit: "model",
    urunler: [
      { img: "01.jpg", name: "Gri Renk Ön Çift Cepli Sağ ve Sol Göğüs Cep Kapaklı Cepli Fermuarlı Omuz Garnileri Turuncu Detaylı Yelek", tags: "Gri | Ön çift cepli | Göğüs cep kapaklı | Cepli fermuarlı | Omuz garnileri turuncu detaylı" },
      { img: "02.jpg", name: "Siyah Renk Baklava Desenli Çift Cepli Yelek", tags: "Siyah | Baklava desenli | Çift cepli | İş yeleği" },
      { img: "03.jpeg", name: "Haki Renk Reflektif Fermuarlı Taktik Yelek", tags: "Haki | Reflektif | Fermuarlı | Taktik" },
      { img: "04.jpg", name: "Siyah Renk Baklava Desenli Çift Cepli Yelek", tags: "Siyah | Baklava desenli | Çift cepli | İş yeleği" },
      { img: "05.jpg", name: "Lacivert Renk Kontrast Biyeli Baklava Desenli Çift Cepli Yelek", tags: "Lacivert | Kontrast biyeli | Baklava desenli | Çift cepli" },
      { img: "06.jpg", name: "Turuncu Renk Üç Cepli Göğüs Reflektör Şeritli Yelek", tags: "Turuncu | Üç cepli | Göğüs reflektör şeritli | İş yeleği" },
      { img: "07.jpg", name: "Siyah Renk Enine Ray Dokumalı Çift Cepli Yelek", tags: "Siyah | Enine ray dokumalı | Çift cepli | İş yeleği" },
      { img: "08.jpg", name: "Gri Renk Turuncu Reflektör Bantlı Çok Cepli Taktik İş Yeleği", tags: "Gri | Turuncu reflektör bantlı | Çok cepli | Taktik" },
      { img: "09.jpg", name: "Siyah Renk Sarı Reflektör Bantlı Çok Cepli Taktik İş Yeleği", tags: "Siyah | Sarı reflektör bantlı | Çok cepli | Taktik" },
      { img: "10.jpg", name: "Kırmızı Renk Göğüs Bölgesi Çift Cep Kapaklı Cepli Omuzlar ve Yanlar Siyah Garnili Yelek", tags: "Kırmızı | Çift cep kapaklı | Cepli | Siyah garnili | Omuz ve yan detaylı" },
      { img: "11.jpg", name: "Siyah Üç Cepli Enine Dokumalı Yelek", tags: "Siyah | Üç cepli | Enine dokumalı | İş yeleği" },
      { img: "12.jpeg", name: "Siyah Renk Fermuarları Turuncu Reflektif Sol Göğüs Fermuarlı Cepli Taktik Yelek", tags: "Siyah | Turuncu reflektif fermuar | Sol göğüs cepli | Taktik" },
      { img: "kt-yl-013-siyah-dolgulu-is-yelegi.jpeg", code: "KT-YL-013", name: "Siyah Çok Cepli Dolgulu İş Yeleği", tags: "Siyah | Dolgulu | Çok cepli | Fermuarlı göğüs cebi | Soğuk ortam iş yeleği" },
      { img: "kt-yl-014-siyah-softshell-is-yelegi.jpeg", code: "KT-YL-014", name: "Siyah Reflektif Biyeli Softshell İş Yeleği", tags: "Siyah | Softshell kumaş | Reflektif göğüs biyesi | Üç fermuarlı cep | Dik yaka" },
      { img: "kt-yl-015-lacivert-polar-is-yelegi.jpeg", code: "KT-YL-015", name: "Lacivert Siyah Cepli Polar İş Yeleği", tags: "Lacivert | Polar kumaş | Siyah göğüs cep paneli | Turuncu fermuar detayı | Dik yaka" },
      { img: "kt-yl-016-lacivert-gri-cok-cepli-yazlik-is-yelegi.png", code: "KT-YL-016", name: "Lacivert Gri Çok Cepli Yazlık İş Yeleği", tags: "Lacivert ve gri | İç dolgusuz | Hafif dokuma kumaş | Dört kapaklı cep | Yazlık kullanım", description: "Lacivert ve gri renk bloklarıyla hazırlanan, astarsız ve iç dolgusuz yazlık işçi yeleğidir. Dört kapaklı cebi ve kalem bölmesi; üretim, bakım, depo ve saha ekiplerinin küçük ekipmanlarını düzenli taşımasına yardımcı olur." },
      { img: "kt-yl-017-grafit-turuncu-teknik-yazlik-is-yelegi.png", code: "KT-YL-017", name: "Grafit Turuncu Teknik Yazlık İş Yeleği", tags: "Grafit ve siyah | İç dolgusuz | Turuncu biye | Fermuarlı göğüs cepleri | Yazlık kullanım", description: "İç dolgusuz, hafif dokuma kumaştan planlanan grafit yazlık işçi yeleği; turuncu biye, kimlik bölmesi ve çoklu fermuarlı cepleriyle teknik ekipler için işlevsel bir katman sunar." },
      { img: "kt-yl-018-bej-kahverengi-cepli-yazlik-is-yelegi.png", code: "KT-YL-018", name: "Bej Kahverengi Cepli Yazlık İş Yeleği", tags: "Bej ve kahverengi | İç dolgusuz | Hafif dokuma kumaş | Reflektif biye | Çok cepli", description: "Bej ve kahverengi renkli, astarsız ve iç dolgusuz yazlık iş yeleğidir. Geniş alt cepler, eğimli göğüs cebi ve sınırlı reflektif biye; servis, montaj ve saha görevlerinde düzenli kullanım sağlar." },
      { img: "kt-yl-019-lacivert-saks-silikon-dolgulu-kislik-is-yelegi.png", code: "KT-YL-019", name: "Lacivert Saks Silikon Dolgulu Kışlık İş Yeleği", tags: "Lacivert ve saks | Silikon elyaf dolgulu | Kapitone | Yüksek yaka | Fermuarlı cepler", description: "Silikon elyaf dolgulu lacivert kışlık iş yeleği, yatay kapitone kanalları ve yüksek yakasıyla serin depo, sevkiyat ve açık alan görevlerinde gövde ısısını destekler. Saks omuz paneli ekip görünümünü belirginleştirir." },
      { img: "kt-yl-020-haki-siyah-kapitone-kislik-is-yelegi.png", code: "KT-YL-020", name: "Haki Siyah Kapitone Kışlık İş Yeleği", tags: "Haki ve siyah | Silikon elyaf dolgulu | Baklava kapitone | Omuz takviyesi | Fermuarlı cepler", description: "Silikon elyaf dolgulu haki kışlık iş yeleği; baklava kapitone gövdesi, siyah omuz takviyeleri ve fermuarlı alt cepleriyle soğuk çalışma alanlarında dayanıklı katmanlı kullanım için tasarlanmıştır." },
      { img: "kt-yl-021-bordo-antrasit-reflektif-kislik-is-yelegi.png", code: "KT-YL-021", name: "Bordo Antrasit Reflektif Kışlık İş Yeleği", tags: "Bordo ve antrasit | Silikon elyaf dolgulu | Kapitone | Reflektif biye | Fırtına patı", description: "Bordo ve antrasit renkli, silikon elyaf dolgulu kışlık iş yeleğidir. Yüksek yaka, fermuar koruyucu pat, reflektif göğüs biyesi ve fermuarlı cepler; kış dönemindeki saha ve sevkiyat ekipleri için koruyucu bir yapı oluşturur." }
    ]
  },

  /* ---------------- SOFTSHELL ---------------- */
  {
    id: "softshell",
    nav: "Softshell",
    eyebrow: "Su itici · nefes alabilen · esnek",
    title: "Softshell Ürünlerimiz",
    desc: "Hareket özgürlüğü sağlayan, su itici ve kurumsal kullanıma uygun softshell ürünler.",
    prefix: "KT-SS",
    baseName: "Softshell Modeli",
    tags: "Su İtici | Esnek | Nefes Alır",
    keywords: "softshell soft shell su itici esnek nefes alan",
    unit: "model",
    urunler: [
      { img: "01.jpg", code: "KT-SS-001", name: "Softshell Kaban Çift Renk Çıkarılabilir Kapüşonlu Üç Cepli", tags: "Çift renk | Çıkarılabilir kapüşon | Üç cepli | Softshell" },
      { img: "02.jpg", name: "Softshell Pantolon Sağ Tarafta Kargo Cepli Paçalar Çift Sıra Gri Fosfor Şeritli", tags: "Softshell pantolon | Sağ kargo cep | Çift sıra gri fosfor şerit | Paçalar" },
      { img: "03.jpg", name: "Softshell Pantolon Sağ Tarafta Kargo Cepli Paçalar Çift Sıra Gri Fosfor Şeritli Kargo Cep Fosfor ve Mavi Biye Detaylı", tags: "Softshell pantolon | Kargo cep | Fosfor detay | Mavi biye | Gri fosfor şerit" },
      { img: "04.jpg", name: "Lacivert Renk Softshell Mont Ön Fermuarlı Çift Cep Sol Göğüs Yatay Fermuarlı Cepli Hi-Vis Sarı ve Gri Reflektör Detaylı", tags: "Lacivert | Ön fermuarlı | Çift cep | Yatay fermuarlı göğüs cep | Hi-Vis reflektör" },
      { img: "05.jpg", name: "Siyah Renk Softshell Yelek Ön Çift ve Sol Göğüs Cepli Dik Fermuar Detaylı Hi-Vis Turuncu ve Gri Reflektör Detaylı", tags: "Siyah | Ön çift cepli | Sol göğüs cepli | Dik fermuar | Hi-Vis turuncu ve gri reflektör" },
      { img: "06.jpg", name: "Siyah Klasik Üç Cepli Softshell Mont", tags: "Siyah | Klasik | Üç cepli | Softshell mont" },
      { img: "07.jpg", name: "Kırmızı Renk Üç Cepli Klasik Softshell Mont", tags: "Kırmızı | Klasik | Üç cepli | Softshell mont" },
      { img: "08.jpg", name: "Siyah Renk Üç Cepli Klasik Model Softshell Yelek", tags: "Siyah | Üç cepli | Klasik model | Softshell yelek" },
      { img: "09.jpg", name: "Siyah Renk Omuzlar Kırmızı Garnili Yaka İçi Kırmızı Renk Detaylı Üç Cepli Klasik Softshell Yelek", tags: "Siyah | Kırmızı garnili omuz | Yaka içi kırmızı detay | Üç cepli | Klasik model" },
      { img: "10.jpeg", name: "Haki Yeşil Kollar ve Sol Göğüs Cebi Siyah Detaylı Üç Dikey Cepli Kapşonlu Taktik Softshell Mont", tags: "Haki yeşil | Sol göğüs cebi | Siyah detay | Üç dikey cepli | Kapşonlu taktik" },
      { img: "11.jpeg", name: "Haki Renk Dört Cepli Üç Cep Fermuarlı Bir Cep Cep Kapaklı Diz Takviyeli Taktik Softshell Pantolon", tags: "Haki | Dört cepli | Üç cep fermuarlı | Cep kapaklı | Diz takviyeli | Taktik" },
      { img: "12.jpeg", name: "Siyah Renk Kollar ve Sol Göğüs Cebi Siyah Detaylı Üç Dikey Cepli Turuncu Reflektif Detaylı Fermuarlı Softshell Yelek", tags: "Siyah | Turuncu reflektif | Üç dikey cepli | Fermuarlı | Softshell yelek" },
      { img: "kt-ss-013-antrasit-softshell-pantolon.jpeg", code: "KT-SS-013", name: "Antrasit Fermuarlı Cepli Softshell Pantolon", tags: "Antrasit | Softshell kumaş | Fermuarlı kargo cebi | Diz formu | Esnek iş pantolonu" },
      { img: "kt-ss-014-haki-kapusonlu-softshell-mont.jpeg", code: "KT-SS-014", name: "Haki Kapüşonlu Taktik Softshell Mont", tags: "Haki | Siyah omuz garnisi | Kapüşonlu | Kol cepli | Dikey göğüs cepli" },
      { img: "kt-ss-015-antrasit-kapusonlu-softshell-mont.jpeg", code: "KT-SS-015", name: "Antrasit Kapüşonlu Softshell Mont", tags: "Antrasit | Siyah omuz garnisi | Kapüşonlu | Fermuarlı göğüs cebi | Üç cepli" },
      { img: "kt-ss-016-petrol-antrasit-asimetrik-softshell-mont.png", code: "KT-SS-016", name: "Petrol Antrasit Asimetrik Softshell Mont", tags: "Petrol ve antrasit | Kapüşonsuz | Asimetrik göğüs paneli | Turuncu biye | Fermuarlı cepler", description: "Petrol ve antrasit renk bloklarıyla hazırlanan kapüşonsuz softshell iş montudur. Asimetrik göğüs paneli, turuncu biye, ayarlanabilir manşetler ve üç fermuarlı cep; teknik ekipler için hareket rahatlığıyla düzenli görünümü birleştirir." },
      { img: "kt-ss-017-bordo-lacivert-reflektif-softshell-mont.png", code: "KT-SS-017", name: "Bordo Lacivert Reflektif Softshell Mont", tags: "Bordo ve lacivert | Kapüşonsuz | Reflektif omuz biyesi | Fırtına patı | Kol takviyesi", description: "Bordo gövde, lacivert omuz ve yan panellerle tasarlanan kapüşonsuz softshell monttur. Fermuar koruyucu patı, reflektif omuz biyesi, ön kol takviyeleri ve kapalı cepleriyle servis ve saha ekiplerine uygundur." },
      { img: "kt-ss-018-petrol-bej-asimetrik-softshell-yelek.png", code: "KT-SS-018", name: "Petrol Bej Asimetrik Softshell Yelek", tags: "Petrol, bej ve siyah | İç dolgusuz | Asimetrik panel | Dikey göğüs cebi | Fermuarlı alt cepler", description: "Petrol, bej ve siyah panellerle ayrışan iç dolgusuz softshell iş yeleğidir. Kavisli kesim hatları, radyo askısı, dikey göğüs cebi ve gizli alt cepler; hafif saha ve servis kullanımı için işlevsel bir katman oluşturur." },
      { img: "kt-ss-019-tas-gri-lacivert-cepli-softshell-yelek.png", code: "KT-SS-019", name: "Taş Gri Lacivert Cepli Softshell Yelek", tags: "Taş gri ve lacivert | İç dolgusuz | Asimetrik fermuar | Kapaklı göğüs cebi | Bakır biye", description: "Taş gri üst gövde ve lacivert alt panelden oluşan iç dolgusuz softshell yelektir. Asimetrik ön fermuarı, kapaklı göğüs cebi, bakır renkli ince biyeleri ve dikey alt cepleriyle kurumsal servis ekiplerine farklı bir seçenek sunar." },
      { img: "kt-ss-020-lacivert-saks-diz-takviyeli-softshell-pantolon.png", code: "KT-SS-020", name: "Lacivert Saks Diz Takviyeli Softshell Pantolon", tags: "Lacivert ve saks | Esnek softshell | Formlu diz takviyesi | Kargo ve cetvel cepleri | Reflektif biye", description: "Lacivert esnek softshell kumaş ve saks renkli formlu diz panelleriyle tasarlanan teknik iş pantolonudur. Kargo cebi, cetvel bölmesi, reflektif diz biyesi ve iç paça takviyeleri yoğun hareket gerektiren görevleri destekler." },
      { img: "kt-ss-021-bej-kahverengi-teknik-softshell-pantolon.png", code: "KT-SS-021", name: "Bej Kahverengi Teknik Softshell Pantolon", tags: "Bej ve kahverengi | Esnek softshell | Geniş diz takviyesi | Katmanlı alet cebi | Fermuarlı kargo cebi", description: "Bej gövde ve kahverengi diz takviyeleriyle hazırlanan esnek softshell iş pantolonudur. Katmanlı alet cebi, eğimli fermuarlı kargo cebi ve iç paça panelleri; montaj, bakım ve saha personeli için dayanıklı kullanım sağlar." }
    ]
  },

  /* ---------------- İŞ GÜVENLİĞİ (alt gruplu) ----------------
     Bu kategori 3 alt gruptan oluşur; her grubun kendi kod ön eki var.
     "kind" alanı lightbox'taki açıklama metnini seçer
     (catalog.js içindeki featureSets: ikaz / ayakkabi / baret).      */
  {
    id: "isg",
    nav: "İş Güvenliği",
    eyebrow: "İkaz yeleği · iş ayakkabısı · baret",
    title: "İş Güvenliği Ekipmanları",
    desc: "Kurumsal iş kıyafetlerini tamamlayan ikaz yeleği, iş ayakkabısı ve baret seçenekleri.",
    keywords: "iş güvenliği isg ikaz yeleği reflektörlü iş ayakkabısı ayakkabı bot baret yds arısan mekap gpp05 el170 1090",
    unit: "ürün",
    sectionClass: "isg-section",
    gruplar: [
      {
        title: "İkaz Yelekleri",
        desc: "Yüksek görünürlük, reflektör ve kurumsal logo uygulaması seçenekleri.",
        cssClass: "isg-vests",
        prefix: "KT-IY",
        baseName: "İkaz Yeleği Modeli",
        kind: "ikaz",
        tags: "Yüksek Görünürlük | Reflektör | Logo Uygulaması",
        search: "ikaz yeleği reflektörlü mühendis yeleği sarı turuncu iş güvenliği",
        urunler: ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png"]
      },
      {
        title: "İş Ayakkabıları",
        desc: "YDS, Arısan ve Mekap marka iş ayakkabısı ve bot seçenekleri.",
        cssClass: "isg-shoes",
        prefix: "KT-IA",
        baseName: "İş Ayakkabısı",
        kind: "ayakkabi",
        tags: "İş Ayakkabısı | Beden Seçenekleri | Kurumsal Tedarik",
        search: "yds arısan mekap gpp05 gpp 05 el170 el 170 1090 157 106 ayakkabı bot",
        urunler: [
          { img: "11.png", name: "YDS GPP 05 İş Ayakkabısı" },
          { img: "12.png", name: "YDS EL170 İş Botu" },
          { img: "13.png", name: "YDS 1090 İş Ayakkabısı" },
          { img: "14.png", name: "Arısan Süet İş Ayakkabısı" },
          { img: "15.png", name: "Arısan Deri İş Ayakkabısı" },
          { img: "16.png", name: "Mekap 157 İş Ayakkabısı" },
          { img: "17.png", name: "Mekap 106 İş Ayakkabısı" }
        ]
      },
      {
        title: "Baretler",
        desc: "Farklı renk seçenekleriyle kurumsal iş güvenliği baretleri.",
        cssClass: "isg-helmets",
        prefix: "KT-BR",
        baseName: "Baret Modeli",
        kind: "baret",
        tags: "Baret | Renk Seçenekleri | Kurumsal Tedarik",
        search: "baret iş güvenliği baş koruma beyaz sarı turuncu",
        urunler: ["18.png", "19.png", "20.png"]
      }
    ]
  },

  /* ---------------- PROMOSYON ---------------- */
  {
    id: "promosyon",
    nav: "PROMOSYON",
    eyebrow: "PROMOSYON",
    title: "Promosyon Ürünleri",
    desc: "Firmanıza özel logolu promosyon ürünleri kurumsal kimliğinize uygun olarak üretilmektedir.",
    prefix: "KT-PR",
    baseName: "Promosyon Ürünü",
    tags: "Promosyon | Kurumsal | Logolu",
    keywords: "promosyon promosyon ürünleri kurumsal promosyon hediyelik kurumsal hediye ajanda kalem kupa termos powerbank usb bellek anahtarlık şapka çanta",
    unit: "ürün",
    urunler: [
      { img: "promosyon-triko-bere.png", name: "Promosyon Triko Bere" },
      { img: "promosyon-sapka.png", name: "Promosyon Şapka" },
      { img: "promosyon-polar-sal.png", name: "Promosyon Polar Şal" },
      { img: "promosyon-polar-atki.png", name: "Promosyon Polar Atkı" },
      { img: "promosyon-polar-boyunluk.png", name: "Promosyon Polar Boyunluk" },
      { img: "promosyon-triko-eldiven.png", name: "Promosyon Triko Eldiven" }
    ]
  }
];
