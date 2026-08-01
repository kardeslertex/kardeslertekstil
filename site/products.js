/* =====================================================================
   ÜRÜN KATALOĞU VERİSİ — urunlerimiz.html bu dosyadan beslenir
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
   - id       : bölümün linki (urunlerimiz.html#id) — değiştirme, diğer sayfalar link veriyor
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
      { img: "kt-ts-030-lacivert-fosfor-detayli-polo-tisort.jpeg", code: "KT-TS-030", name: "Lacivert Fosfor Detaylı Polo Tişört", tags: "Lacivert | Fosfor sarı biye | Göğüs cep detayı | Polo yaka | Kısa kol" }
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
      { img: "16.png",  name: "Saks Mavi Reflektörlü Polo Yaka Sweatshirt",    tags: "Polo Yaka | Reflektörlü | Saks Mavi" },
      { img: "17.png",  name: "Gri Bisiklet Yaka Sweatshirt",                  tags: "Bisiklet Yaka | Klasik Kesim | Gri" },
      { img: "18.jpeg", name: "Saks Mavi İki Renk Polo Yaka Sweatshirt",       tags: "Polo Yaka | İki Renk Tasarım | Saks Mavi" },
      { img: "19.jpeg", name: "Saks Mavi Fosfor Kollu Polo Yaka Sweatshirt",   tags: "Polo Yaka | Fosfor Kol Detayı | Saks Mavi" },
      { img: "20.jpeg", name: "Lacivert Bisiklet Yaka Sweatshirt",             tags: "Bisiklet Yaka | Klasik Kesim | Lacivert" },
      { img: "21.jpg",  name: "Siyah Reflektörlü Bisiklet Yaka Sweatshirt",    tags: "Bisiklet Yaka | Reflektörlü | Siyah" },
      { img: "beyaz-siyah-raglan-bisiklet-yaka-sweatshirt.png", code: "KT-SW-024", name: "Beyaz Siyah Raglan Kollu Bisiklet Yaka Sweatshirt", tags: "Beyaz | Siyah raglan kollu | Bisiklet yaka | Uzun kol" },
      { img: "kt-sw-025-siyah-gri-omuz-garnili-sweatshirt.jpeg", code: "KT-SW-025", name: "Siyah Gri Omuz Garnili Sweatshirt", tags: "Siyah | Gri omuz paneli | Kırmızı biye | Göğüs şerit detayı | Bisiklet yaka | Uzun kol" },
      { img: "kt-sw-026-beyaz-siyah-cepli-sweatshirt.jpeg", code: "KT-SW-026", name: "Beyaz Siyah Garnili Cepli Sweatshirt", tags: "Beyaz | Siyah omuz ve kol garnisi | Fermuarlı göğüs cebi | Bisiklet yaka | Uzun kol" },
      { img: "kt-sw-027-gri-siyah-polo-yaka-sweatshirt.jpeg", code: "KT-SW-027", name: "Gri Siyah Garnili Polo Yaka Sweatshirt", tags: "Gri | Siyah omuz paneli | Göğüs şerit detayı | Polo yaka | Uzun kol" }
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
      { img: "16.jpg",  name: "Reflektörlü Kargo Pantolon — Bej, Siyah Diz Takviyeli, Cep Kapaklı Taktik Pantolon", tags: "Bej | Siyah diz takviyeli | Cep kapaklı | Reflektör: yok | İş/kurumsal" },
      { img: "17.png",  name: "Reflektörlü İş Pantolonu — Lacivert, Diz Reflektörlü Bantlı, Yan Cep Kapaklı", tags: "Lacivert | Reflektörlü diz bandı | Yan cep kapaklı | Kurumsal/iş" },
      { img: "18.png",  name: "Reflektörlü Kot Pantolon — Koyu Mavi, Diz Reflektörlü Bantlı, Yan Cep Kapaklı", tags: "Koyu mavi | Reflektörlü diz bandı | Yan cep kapaklı | Denim" },
      { img: "kt-pt-019-antrasit-kargo-cepli-is-pantolonu.jpeg", code: "KT-PT-019", name: "Antrasit Kargo Cepli İş Pantolonu", tags: "Antrasit | Yan kargo cebi | Düz paça | Kurumsal iş modeli | Reflektör: yok" },
      { img: "kt-pt-020-antrasit-reflektorlu-is-pantolonu.jpeg", code: "KT-PT-020", name: "Antrasit Turuncu Detaylı Reflektörlü İş Pantolonu", tags: "Antrasit | Turuncu cep garnisi | Çift reflektif paça bandı | Kargo cepli | İş güvenliği" },
      { img: "kt-pt-021-gri-diz-takviyeli-is-pantolonu.jpeg", code: "KT-PT-021", name: "Gri Siyah Diz Takviyeli İş Pantolonu", tags: "Gri | Siyah diz takviyesi | Kargo cebi | Esnek bel paneli | Teknik iş pantolonu" }
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
      { img: "02.jpg", name: "Siyah Reflektörlü İş Tulumu", tags: "Siyah | Göğüs, kol ve paçada reflektif bant | Çok cepli | Elastik bel | Gizli fermuarlı ön kapama" },
      { img: "04.jpg", name: "Lacivert Reflektörlü İş Tulumu", tags: "Lacivert | Göğüs ve paçada reflektif bant | Fermuarlı göğüs cepleri | Yan cepler | Gizli fermuarlı ön kapama" },
      { img: "09.jpeg", name: "Lacivert Fermuarlı Klasik İş Tulumu", tags: "Lacivert | Tam boy fermuarlı | Fermuarlı göğüs cepleri | Yan kargo cebi | Reflektörsüz klasik model" },
      { img: "10.jpeg", name: "Turuncu Reflektif Biyeli İş Tulumu", tags: "Turuncu | Göğüs ceplerinde reflektif biye | Paçada reflektif şerit | Çok cepli | Tam boy fermuarlı" },
      { img: "11.jpg", name: "Gri Reflektörlü Çok Cepli İş Tulumu", tags: "Gri | Göğüs ve paçada reflektif bant | Fermuarlı göğüs cepleri | Yan kargo cebi | Gizli fermuarlı ön kapama" },
      { img: "12.jpeg", name: "Haki Siyah Takviyeli İş Tulumu", tags: "Haki | Siyah dirsek ve diz takviyesi | Fosfor sarı fermuar detayı | Çok cepli | Dik yaka" },
      { img: "kt-tl-013-saks-mavi-reflektorlu-is-tulumu.jpeg", code: "KT-TL-013", name: "Saks Mavi Reflektörlü İş Tulumu", tags: "Saks mavi | Siyah omuz ve göğüs garnisi | Kol ve paça reflektörü | Çok cepli | Tam boy fermuarlı" },
      { img: "kt-tl-014-siyah-cift-reflektorlu-is-tulumu.jpeg", code: "KT-TL-014", name: "Siyah Çift Reflektörlü İş Tulumu", tags: "Siyah | Göğüs reflektif biyeli | Çift reflektif paça bandı | Çok cepli | Tam boy fermuarlı" },
      { img: "kt-tl-015-saks-mavi-bahcivan-tulumu.jpeg", code: "KT-TL-015", name: "Saks Mavi Reflektörlü Bahçıvan Tulumu", tags: "Saks mavi | Ayarlanabilir askı | Göğüs ve yan cepler | Reflektif paça bandı | Bahçıvan tulumu" }
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
      { img: "02.jpg", name: "Askılı Önlük Modeli 1" },
      { img: "03.jpg", name: "Askılı Önlük Modeli 2" },
      { img: "05.jpg", name: "Askılı Önlük Modeli 3" },
      { img: "06.jpg", name: "Askılı Önlük Modeli 4" },
      { img: "14.jpeg", name: "Askılı Önlük Modeli 5" },
      { img: "15.jpeg", name: "Askılı Önlük Modeli 6" },
      { img: "01.jpg", name: "Şef Ceketi Modeli 1" },
      { img: "07.jpg", name: "Şef Ceketi Modeli 2" },
      { img: "13.jpeg", name: "Belden Bağlama Önlük Modeli 1" },
      { img: "16.jpeg", name: "Belden Bağlama Önlük Modeli 2" },
      { img: "09.jpg", name: "PVC Askılı Önlük Modeli 1" },
      { img: "kt-on-019-antrasit-kruvaze-sef-ceketi.jpeg", code: "KT-ON-019", name: "Antrasit Kruvaze Şef Ceketi", tags: "Antrasit | Hakim yaka | Kruvaze düğme | Kol cepli | Profesyonel mutfak" },
      { img: "kt-on-020-siyah-boyundan-askili-mutfak-onlugu.jpeg", code: "KT-ON-020", name: "Siyah Boyundan Askılı Mutfak Önlüğü", tags: "Siyah | Ayarlanabilir boyun askısı | Göğüs cebi | Bölmeli alt cep | Mutfak önlüğü" },
      { img: "kt-on-021-siyah-beyaz-biyeli-sef-ceketi.jpeg", code: "KT-ON-021", name: "Siyah Beyaz Biyeli Şef Ceketi", tags: "Siyah | Beyaz biye | Hakim yaka | Kruvaze düğme | Kol cepli" }
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
      { img: "03.jpg", name: "Saks Mavi Siyah Reflektörlü İş Kabanı", tags: "Saks mavi | Siyah yaka, yan panel ve kol detayı | Göğüste reflektif şerit | Çift kapaklı göğüs cep | Fermuarlı yan cepler | İş kabanı" },
      { img: "05.jpg", name: "Fosfor Sarı Lacivert Reflektörlü Uzun Parka", tags: "Fosfor sarı | Lacivert alt panel | Dikey ve yatay reflektör bantlar | Kapaklı göğüs cep | Alt kapaklı cepler | Yüksek görünürlüklü uzun parka" },
      { img: "06.jpg", name: "Turuncu Lacivert Reflektörlü Uzun Parka", tags: "Turuncu | Lacivert alt panel | Dikey ve yatay reflektör bantlar | Kapaklı göğüs cep | Alt kapaklı cepler | Yüksek görünürlüklü uzun parka" },
      { img: "07.jpg", name: "Saks Mavi Bomber Kaban", tags: "Saks mavi | Bomber kesim | Ribanalı yaka, etek ve manşet | Fermuarlı göğüs cep | Fermuarlı yan cepler | Hafif kışlık kaban" },
      { img: "11.jpeg", name: "Lacivert Gri Çıkarılabilir Kollu Kaban", tags: "Lacivert | Gri omuz ve kol paneli | Saks şerit detayı | Çıkarılabilir kollu | Gizli ön pat | Çok amaçlı iş kabanı" },
      { img: "12.jpeg", name: "Fosfor Sarı Reflektörlü Uzun Yağmurluk", tags: "Fosfor sarı | Uzun kesim | Gövde ve kollarda çift reflektör bant | Kapaklı alt cepler | Çıtçıt kapamalı | Yüksek görünürlüklü yağmurluk" },
      { img: "15.jpeg", name: "Lacivert Turuncu Reflektörlü Kapüşonlu Parka", tags: "Lacivert | Turuncu kapüşon ve kol paneli | Göğüs ve kollarda reflektör bant | Büyük kapaklı alt cepler | Kapüşonlu | Kışlık parka" },
      { img: "16.jpeg", name: "Gri Turuncu Reflektörlü Kapüşonlu Parka", tags: "Gri | Turuncu omuz ve kapüşon paneli | Göğüs ve kollarda reflektör bant | Büyük kapaklı alt cepler | Kapüşonlu | Kışlık parka" },
      { img: "kt-mk-019-lacivert-kapusonlu-reflektorlu-is-montu.jpeg", code: "KT-MK-019", name: "Lacivert Kapüşonlu Reflektörlü İş Montu", tags: "Lacivert | Kapüşonlu | Siyah omuz garnisi | Reflektif kol bandı | Kışlık iş montu" },
      { img: "kt-mk-020-lacivert-uzun-is-parkasi.jpeg", code: "KT-MK-020", name: "Lacivert Uzun İş Parkası", tags: "Lacivert | Uzun kesim | Kapüşonlu | Göğüs ve alt kapaklı cepler | Kışlık parka" },
      { img: "kt-mk-021-lacivert-reflektorlu-is-montu.jpeg", code: "KT-MK-021", name: "Lacivert Reflektörlü İş Montu", tags: "Lacivert | Göğüs ve kol reflektörü | Kapaklı göğüs cepleri | Ribanalı manşet | Kışlık iş montu" }
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
      { img: "09.jpg", name: "Lacivert Polar Mont Kolları ve Beden Reflektör Bantlı Üç Cepli Fermuarlar Turuncu Reflektif", tags: "Lacivert | Reflektör bantlı | Üç cepli | Fermuarlar turuncu reflektif | Polar mont" },
      { img: "10.jpg", name: "Kırmızı Renk Klasik İki Cepli Polar Mont", tags: "Kırmızı | Klasik | İki cepli | Polar mont" },
      { img: "11.jpeg", name: "Siyah Renk Üç Cepli Taktik Polar Mont Fermuarlar Reflektif", tags: "Siyah | Üç cepli | Taktik | Fermuarlar reflektif | Polar mont" },
      { img: "12.jpeg", name: "Siyah Renk Klasik Üç Cepli Polar Mont", tags: "Siyah | Klasik | Üç cepli | Polar mont" },
      { img: "kt-pl-013-siyah-reflektif-biyeli-polar-mont.jpeg", code: "KT-PL-013", name: "Siyah Reflektif Biyeli Polar Mont", tags: "Siyah | Reflektif göğüs biyesi | Üç fermuarlı cep | Dik yaka | Polar mont" },
      { img: "kt-pl-014-lacivert-cepli-polar-mont.jpeg", code: "KT-PL-014", name: "Lacivert Siyah Cepli Polar Mont", tags: "Lacivert | Siyah göğüs cep paneli | Turuncu fermuar detayı | Üç cepli | Polar mont" },
      { img: "kt-pl-015-antrasit-omuz-garnili-polar-mont.jpeg", code: "KT-PL-015", name: "Antrasit Omuz Garnili Polar Mont", tags: "Antrasit | Siyah omuz garnisi | Turuncu fermuar detayı | Üç cepli | Polar mont" }
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
      { img: "kt-yl-015-lacivert-polar-is-yelegi.jpeg", code: "KT-YL-015", name: "Lacivert Siyah Cepli Polar İş Yeleği", tags: "Lacivert | Polar kumaş | Siyah göğüs cep paneli | Turuncu fermuar detayı | Dik yaka" }
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
      { img: "01.jpg", name: "Softshell Kaban Çift Renk Çıkarılabilir Kapüşonlu Üç Cepli", tags: "Çift renk | Çıkarılabilir kapüşon | Üç cepli | Softshell" },
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
      { img: "kt-ss-015-antrasit-kapusonlu-softshell-mont.jpeg", code: "KT-SS-015", name: "Antrasit Kapüşonlu Softshell Mont", tags: "Antrasit | Siyah omuz garnisi | Kapüşonlu | Fermuarlı göğüs cebi | Üç cepli" }
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
