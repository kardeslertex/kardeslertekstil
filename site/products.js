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
    baseName: "Tişört Modeli",
    tags: "Baskı | Nakış | Özel Renk",
    keywords: "tişört tshirt polo lakos bisiklet yaka",
    unit: "model",
    urunler: [
      "01.jpeg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg",
      "08.jpg", "09.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpeg",
      "15.jpeg", "16.jpeg", "17.jpg", "18.jpeg", "19.jpg", "20.jpg", "21.jpg"
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
    baseName: "Sweatshirt Modeli",
    tags: "Kapüşonlu | Fermuarlı | Reflektörlü",
    keywords: "sweat sweatshirt hoodie kapüşonlu fermuarlı yarım fermuarlı tam fermuarlı polo yaka bisiklet yaka reflektörlü fosforlu",
    unit: "model",
    urunler: [
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
      { img: "21.jpg",  name: "Siyah Reflektörlü Bisiklet Yaka Sweatshirt",    tags: "Bisiklet Yaka | Reflektörlü | Siyah" }
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
      "01.jpeg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg",
      "09.jpg", "10.jpg", "11.jpeg", "12.jpeg", "13.jpeg", "14.jpeg", "15.jpeg", "16.jpg", "17.png", "16.png"
    ]
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
      "01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpeg", "06.jpg",
      "07.jpeg", "08.jpeg", "09.jpeg", "10.jpeg", "11.jpg", "12.jpeg"
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
      "01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg",
      "09.jpg", "10.jpg", "11.jpg", "12.jpeg", "13.jpeg", "14.jpeg", "15.jpeg", "16.jpeg"
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
      "01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg",
      "09.jpg", "10.jpg", "11.jpeg", "12.jpeg", "13.jpeg", "14.jpeg", "15.jpeg", "16.jpeg", "17.png", "18.png"
    ]
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
      "01.jpg", "02.jpg", "03.jpg", "04.jpeg", "05.jpg", "06.jpg",
      "07.jpg", "08.jpg", "09.jpg", "10.jpg", "11.jpeg", "12.jpeg"
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
      "01.jpg", "02.jpg", "03.jpeg", "04.jpg", "05.jpg", "06.jpg",
      "07.jpg", "08.jpg", "09.jpg", "10.jpg", "11.jpg", "12.jpeg"
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
      "01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg",
      "07.jpg", "08.jpg", "09.jpg", "10.jpeg", "11.jpeg", "12.jpeg"
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
  }
];
