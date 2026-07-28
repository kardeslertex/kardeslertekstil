(function () {
  "use strict";

  const posts = [
    {
      slug: "is-kiyafeti-uretiminde-kumas-kesim-sureci",
      title: "İş Kıyafeti Üretiminde Kumaş Kesim Süreci",
      summary: "Pastal hazırlama, kalıp yerleşimi, kumaş yönü, kesim kalitesi, fire ve parça takibi dahil kesim sürecini inceleyin.",
      category: "Üretim Rehberi",
      tags: ["Kumaş Kesim Süreci", "Pastal Hazırlama", "Kalıp Yerleşimi", "Tekstil Kesim", "Kumaş Firesi"],
      searchTerms: ["iş kıyafeti kesimi", "pastal nedir", "kumaş kesim hataları", "parça takibi"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "is-kiyafetlerinde-kalip-ve-beden-serileme-rehberi",
      title: "İş Kıyafetlerinde Kalıp ve Beden Serileme Rehberi",
      summary: "Temel kalıp, beden serileme, ölçü tablosu, kadın-erkek kalıpları, hareket payı ve toleransları inceleyin.",
      category: "Üretim Rehberi",
      tags: ["İş Kıyafeti Kalıbı", "Beden Serileme", "Ölçü Tablosu", "Beden Seti", "Kalıp Toleransı"],
      searchTerms: ["iş kıyafeti kalıbı", "beden serileme nedir", "tekstil ölçü tablosu", "beden seti"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "toplu-is-kiyafeti-siparisi-nasil-planlanir",
      title: "Toplu İş Kıyafeti Siparişi Nasıl Planlanır?",
      summary: "Personel listesi, beden dağılımı, ürün seçimi, numune, bütçe, termin ve teslimat dahil sipariş planlamasını inceleyin.",
      category: "Üretim Rehberi",
      tags: ["Toplu İş Kıyafeti Siparişi", "İş Kıyafeti Satın Alma", "Beden Dağılımı", "Sipariş Planlama"],
      searchTerms: ["toplu iş kıyafeti siparişi", "personel kıyafeti alımı", "beden dağılımı", "iş kıyafeti satın alma"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "is-kiyafeti-uretiminde-termin-suresi",
      title: "İş Kıyafeti Üretiminde Termin Süresi",
      summary: "Kumaş temini, numune, beden dağılımı, logo uygulaması ve sevkiyatın üretim süresine etkisini inceleyin.",
      category: "Üretim Rehberi",
      tags: ["İş Kıyafeti Termin Süresi", "Üretim Süresi", "Teslimat Planı", "Kumaş Temini"],
      searchTerms: ["iş kıyafeti kaç günde üretilir", "üretim termin süresi", "sipariş teslim süresi"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "kurumsal-is-kiyafetlerinde-renk-standardi-ve-parti-farki",
      title: "Kurumsal İş Kıyafetlerinde Renk Standardı ve Parti Farkı",
      summary: "Kumaş lotları, renk kodu, ışık koşulları, tolerans ve tekrar siparişlerde renk devamlılığını inceleyin.",
      category: "Üretim Rehberi",
      tags: ["Kumaş Renk Standardı", "Kumaş Parti Farkı", "Renk Toleransı", "Kurumsal Renk"],
      searchTerms: ["kumaş ton farkı", "kumaş lot farkı", "kurumsal renk standardı", "renk toleransı"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "is-kiyafetlerinde-nakis-uretim-sureci",
      title: "İş Kıyafetlerinde Nakış Üretim Süreci",
      summary: "Logo dijitalleştirme, iplik ve tela seçimi, prova, makine ayarı, seri üretim ve kalite kontrol aşamalarını inceleyin.",
      category: "Üretim Rehberi",
      tags: ["Nakış Üretim Süreci", "Logo Nakış", "Nakış Programı", "Nakış İpliği"],
      searchTerms: ["logo nakış nasıl yapılır", "nakış üretimi", "nakış programı", "iş kıyafeti nakışı"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "is-kiyafetlerinde-baski-uretim-sureci",
      title: "İş Kıyafetlerinde Baskı Üretim Süreci",
      summary: "DTF, serigrafi ve transfer baskıda dosya, kumaş uyumu, prova, uygulama, fikse ve kalite kontrolü inceleyin.",
      category: "Üretim Rehberi",
      tags: ["Baskı Üretim Süreci", "DTF Baskı", "Serigrafi Baskı", "Transfer Baskı"],
      searchTerms: ["iş kıyafeti baskısı", "DTF üretim süreci", "serigrafi baskı", "logo baskı"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "is-kiyafetlerinde-paketleme-ve-sevkiyat-planlamasi",
      title: "İş Kıyafetlerinde Paketleme ve Sevkiyat Planlaması",
      summary: "Beden etiketleri, personel ve departman bazlı paketleme, koli planı, şube dağıtımı ve teslimat kontrolünü inceleyin.",
      category: "Üretim Rehberi",
      tags: ["İş Kıyafeti Paketleme", "Sevkiyat Planlaması", "Personel Bazlı Paketleme", "Koli Planı"],
      searchTerms: ["personel bazlı paketleme", "iş kıyafeti sevkiyatı", "beden etiketi", "şube dağıtımı"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "is-kiyafeti-tekrar-siparis-yonetimi",
      title: "İş Kıyafeti Tekrar Sipariş Yönetimi",
      summary: "Tekrar siparişlerde aynı kumaş, renk, kalıp, beden ve logoyu korumak; yeni personel ve stoku planlamak için rehber.",
      category: "Üretim Rehberi",
      tags: ["İş Kıyafeti Tekrar Sipariş", "Kumaş Devamlılığı", "Renk Devamlılığı", "Yedek Stok"],
      searchTerms: ["tekrar iş kıyafeti siparişi", "kumaş devamlılığı", "personel kıyafeti stoku"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "is-kiyafeti-uretiminde-sik-karsilasilan-hatalar",
      title: "İş Kıyafeti Üretiminde Sık Karşılaşılan Hatalar",
      summary: "Ölçü, kumaş, renk, dikiş, aksesuar, baskı, nakış, etiket ve paketleme hatalarının nedenlerini inceleyin.",
      category: "Üretim Rehberi",
      tags: ["İş Kıyafeti Üretim Hataları", "Dikiş Hataları", "Ölçü Hatası", "Baskı Hatası"],
      searchTerms: ["iş kıyafeti hataları", "dikiş hataları", "tekstil üretim sorunu", "ölçü hatası"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "gida-uretimi-is-kiyafeti-rehberi",
      title: "Gıda Üretimi İçin İş Kıyafeti Rehberi",
      summary: "Gıda üretim alanlarında hijyen, kumaş, renk, model ve yıkama koşullarına göre doğru personel kıyafetini seçin.",
      category: "Sektörel Çözümler",
      tags: ["Gıda Sektörü İş Kıyafetleri", "Gıda Personeli Kıyafetleri", "Hijyen Kıyafetleri"],
      searchTerms: ["gıda üretim kıyafetleri", "gıda önlüğü", "gıda fabrikası personel kıyafeti"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "lojistik-depo-personeli-is-kiyafeti-rehberi",
      title: "Lojistik ve Depo Personeli İçin İş Kıyafeti Rehberi",
      summary: "Görünürlük, hareket rahatlığı, cepler ve mevsime göre lojistik ve depo personeli iş kıyafeti seçimi.",
      category: "Sektörel Çözümler",
      tags: ["Depo İş Kıyafetleri", "Lojistik Personeli", "Reflektörlü Yelek"],
      searchTerms: ["depo personel kıyafeti", "lojistik iş kıyafeti", "forklift görünürlük kıyafeti"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "insaat-santiye-is-kiyafeti-rehberi",
      title: "İnşaat ve Şantiye Çalışanları İçin İş Kıyafeti Rehberi",
      summary: "Dayanıklılık, görünürlük, saha koşulları ve mevsime göre şantiye iş kıyafetlerini planlayın.",
      category: "Sektörel Çözümler",
      tags: ["Şantiye İş Kıyafetleri", "İnşaat İş Kıyafetleri", "Reflektörlü İş Kıyafeti"],
      searchTerms: ["inşaat personeli kıyafeti", "şantiye kıyafetleri", "şantiye iş elbisesi"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "teknik-servis-montaj-is-kiyafeti-rehberi",
      title: "Teknik Servis ve Montaj Ekipleri İçin İş Kıyafeti Seçimi",
      summary: "Esnek kumaş, işlevsel cepler, yüzey dostu aksesuarlar ve kurumsal görünümle teknik ekip kıyafetlerini seçin.",
      category: "Sektörel Çözümler",
      tags: ["Teknik Servis Kıyafetleri", "Montaj Personeli", "Servis İş Kıyafeti"],
      searchTerms: ["teknik ekip kıyafeti", "montaj iş elbisesi", "servis personeli kıyafeti"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "otomotiv-sektoru-is-kiyafeti-rehberi",
      title: "Otomotiv Sektörü İçin İş Kıyafeti Rehberi",
      summary: "Üretim hattı, bakım ve servis ekipleri için çizmez aksesuar, kumaş, cep ve kurumsal model seçimi.",
      category: "Sektörel Çözümler",
      tags: ["Otomotiv İş Kıyafetleri", "Servis Kıyafetleri", "Üretim Personeli"],
      searchTerms: ["otomotiv personeli kıyafeti", "oto servis kıyafeti", "çizmez iş kıyafeti"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "soguk-hava-deposu-is-kiyafeti-rehberi",
      title: "Soğuk Hava Deposu Çalışanları İçin İş Kıyafeti Rehberi",
      summary: "Termal katmanlama, mont, pantolon, hareket ve görünürlüğe göre soğuk depo kıyafetlerini planlayın.",
      category: "Sektörel Çözümler",
      tags: ["Soğuk Hava Deposu Kıyafetleri", "Termal İş Kıyafeti", "Soğuk Depo Montu"],
      searchTerms: ["soğuk depo kıyafeti", "termal iş elbisesi", "soğuk hava montu"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "temizlik-personeli-is-kiyafeti-rehberi",
      title: "Temizlik Personeli İçin İş Kıyafeti Seçim Rehberi",
      summary: "Kolay bakım, hareket, kumaş, cep, renk ve kimyasal risklere göre temizlik personeli kıyafetlerini seçin.",
      category: "Sektörel Çözümler",
      tags: ["Temizlik Personeli Kıyafetleri", "Temizlik İş Kıyafeti", "Personel Tuniği"],
      searchTerms: ["temizlikçi kıyafeti", "temizlik personeli forması", "temizlik tuniği"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "restoran-kafe-mutfak-personeli-kiyafet-rehberi",
      title: "Restoran, Kafe ve Mutfak Personeli Kıyafetleri Rehberi",
      summary: "Aşçı ceketi, önlük, servis kıyafeti, kumaş ve leke yönetimiyle yiyecek-içecek ekibinizi planlayın.",
      category: "Sektörel Çözümler",
      tags: ["Mutfak Personeli Kıyafetleri", "Aşçı Ceketi", "Restoran Önlüğü", "Servis Kıyafeti"],
      searchTerms: ["kafe personeli kıyafeti", "restoran personel kıyafeti", "aşçı kıyafeti"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "koruyucu-is-kiyafetleri-bakim-kullanim-omru",
      title: "Koruyucu İş Kıyafetlerinin Bakımı ve Kullanım Ömrü",
      summary: "Yıkama, kontrol, onarım, saklama ve hizmet dışı bırakma süreçleriyle koruyucu kıyafet performansını nasıl sürdüreceğinizi inceleyin.",
      category: "İş Güvenliği",
      tags: ["İş Kıyafeti Bakımı", "Koruyucu Kıyafet Yıkama", "Kullanım Ömrü"],
      searchTerms: ["iş kıyafeti yıkama", "koruyucu kıyafet kontrolü", "iş kıyafeti onarımı"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "is-guvenligi-kiyafetlerinde-beden-ergonomi",
      title: "İş Güvenliği Kıyafetlerinde Beden ve Ergonomi",
      summary: "Koruyucu iş kıyafetlerinde doğru beden, kalıp, hareket özgürlüğü, katmanlama ve diğer KKD'lerle uyumu inceleyin.",
      category: "İş Güvenliği",
      tags: ["İş Kıyafeti Bedeni", "Koruyucu Kıyafet Ergonomisi", "İş Kıyafeti Kalıbı"],
      searchTerms: ["iş kıyafeti beden seçimi", "kkd ergonomisi", "kadın iş kıyafeti kalıbı"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "reflektor-serit-secimi-ve-bakimi",
      title: "İş Kıyafetlerinde Reflektör Şerit Seçimi ve Bakımı",
      summary: "Reflektif şeritlerin çalışma prensibini, doğru yerleşimini, uygulamasını, yıkama dayanımını ve kontrolünü inceleyin.",
      category: "İş Güvenliği",
      tags: ["Reflektör Şerit", "Reflektif Bant", "Yüksek Görünürlük"],
      searchTerms: ["reflektör bakımı", "reflektif bant yıkama", "reflektör yerleşimi"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "su-gecirmez-is-kiyafetleri-en-343",
      title: "Su Geçirmez İş Kıyafetleri ve EN 343",
      summary: "Su geçirmezlik, nefes alabilirlik, dikiş bandı, kapüşon ve katmanlama açısından doğru iş yağmurluğunu seçin.",
      category: "İş Güvenliği",
      tags: ["EN 343", "Su Geçirmez İş Kıyafeti", "İş Yağmurluğu"],
      searchTerms: ["iş yağmurluğu", "su itici su geçirmez farkı", "nefes alabilir yağmurluk"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "soguk-hava-soguk-depo-is-kiyafetleri",
      title: "Soğuk Hava ve Soğuk Depo İş Kıyafetleri",
      summary: "EN 342, yalıtım, katmanlama, beden, ter yönetimi ve bakım açısından soğuk ortam kıyafetlerini inceleyin.",
      category: "İş Güvenliği",
      tags: ["Soğuk Depo Kıyafeti", "EN 342", "Kışlık İş Kıyafeti"],
      searchTerms: ["soğuk hava iş kıyafeti", "termal iş kıyafeti", "soğuk depo tulumu"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "kimyasallara-karsi-koruyucu-kiyafetler-tip-6",
      title: "Kimyasallara Karşı Koruyucu İş Kıyafetleri",
      summary: "EN 13034, Tip 6 ve PB[6] kapsamında sınırlı kimyasal sıçramaya karşı ürün seçimi ve kullanımını inceleyin.",
      category: "İş Güvenliği",
      tags: ["Kimyasal Koruyucu Kıyafet", "EN 13034", "Tip 6"],
      searchTerms: ["kimyasal sıçrama kıyafeti", "pb6 kıyafet", "kimyasal koruyucu tulum"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "antistatik-is-kiyafeti-rehberi-2026",
      title: "Antistatik İş Kıyafeti Rehberi 2026",
      summary: "EN 1149-5 kapsamında elektrostatik yük, kumaş, topraklama sistemi, kullanım ve bakım ayrıntılarını inceleyin.",
      category: "İş Güvenliği",
      tags: ["Antistatik İş Kıyafeti", "EN 1149-5", "Elektrostatik Koruma"],
      searchTerms: ["karbon iplikli kumaş", "patlayıcı ortam kıyafeti", "atex iş kıyafeti"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "yuksek-gorunurluklu-is-kiyafetleri-siniflari",
      title: "Yüksek Görünürlüklü İş Kıyafetleri Sınıfları",
      summary: "EN ISO 20471 Sınıf 1, 2 ve 3 arasındaki farkları; görünür alan, tasarım, kullanım ve bakım açısından inceleyin.",
      category: "İş Güvenliği",
      tags: ["EN ISO 20471", "Yüksek Görünürlük", "Reflektörlü İş Kıyafeti"],
      searchTerms: ["sınıf 1 2 3", "yüksek görünürlük sınıfları", "fosforlu iş kıyafeti"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "kaynakci-kiyafetleri-secim-rehberi-2026",
      title: "Kaynakçı Kıyafetleri Seçim Rehberi 2026",
      summary: "EN ISO 11611, kumaş, model, sıçrama riski, bakım ve diğer KKD'lerle uyuma göre kaynakçı kıyafeti seçin.",
      category: "İş Güvenliği",
      tags: ["Kaynakçı Kıyafeti", "EN ISO 11611", "Kaynakçı Tulumu"],
      searchTerms: ["kaynakçı elbisesi", "kaynakçı tulumu", "kaynak kıvılcımı kıyafeti"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "alev-geciktirici-is-kiyafetleri-rehberi-2026",
      title: "Alev Geciktirici İş Kıyafetleri Rehberi 2026",
      summary: "EN ISO 11612, koruyucu kumaşlar, performans kodları, model ayrıntıları ve bakım süreçlerini inceleyin.",
      category: "İş Güvenliği",
      tags: ["Alev Geciktirici İş Kıyafeti", "EN ISO 11612", "Isı ve Alev Koruması"],
      searchTerms: ["yanmaz iş elbisesi", "alev geciktirici tulum", "ısı koruyucu kıyafet"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "is-kiyafetlerinde-kalite-kontrol-sureci",
      title: "İş Kıyafetlerinde Kalite Kontrol Süreci",
      summary: "Kumaş girişinden dikime, ölçü kontrolünden logo, paketleme ve sevkiyata kadar iş kıyafeti kalite kontrol adımlarını inceleyin.",
      category: "Üretim Rehberi",
      tags: ["İş Kıyafeti Kalite Kontrolü", "Tekstil Kalite Kontrol", "Üretim Kalitesi", "Ölçü Kontrolü", "Dikiş Kontrolü", "Final Kontrol"],
      searchTerms: ["iş kıyafeti kalite kontrol süreci", "tekstil final kontrol", "dikiş kalite kontrol", "logo kontrolü", "ürün ölçü toleransı"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "fabrika-uretim-tesisleri-is-kiyafeti-rehberi",
      title: "Fabrika ve Üretim Tesisleri İçin İş Kıyafeti Rehberi",
      summary: "Üretim personeli için kumaş, model, departman, mevsim, güvenlik ve kurumsal kimlik seçimlerini kapsamlı şekilde inceleyin.",
      category: "Sektörel Çözümler",
      tags: ["Fabrika İş Kıyafetleri", "Üretim Personeli İş Kıyafeti", "Sanayi İş Kıyafetleri", "Kurumsal İş Kıyafeti"],
      searchTerms: ["fabrika personel kıyafetleri", "üretim tesisi iş kıyafeti", "fabrika iş elbiseleri", "sanayi personel kıyafeti", "logolu fabrika kıyafeti"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "is-guvenligi-kiyafetleri-rehberi-2026",
      title: "İş Güvenliği Kıyafetleri Rehberi 2026",
      summary: "Risklere, sektörlere ve standartlara göre doğru koruyucu iş kıyafeti seçimini, kullanımını ve bakımını inceleyin.",
      category: "İş Güvenliği",
      tags: ["İş Güvenliği Kıyafetleri", "Koruyucu İş Kıyafeti", "Kişisel Koruyucu Donanım", "KKD", "EN ISO 20471", "ISO 13688"],
      searchTerms: ["koruyucu kıyafet", "yüksek görünürlük", "alev geciktirici", "kimyasal koruma", "antistatik kıyafet"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "is-kiyafetlerinde-numune-ve-onay-sureci",
      title: "İş Kıyafetlerinde Numune ve Onay Süreci",
      summary: "Toplu üretim öncesinde kumaş, kalıp, beden, renk ve logo uygulamasını numune üzerinden nasıl doğrulayacağınızı adım adım inceleyin.",
      category: "Üretim Rehberi",
      tags: ["İş Kıyafeti Numunesi", "Numune Onayı", "Üretim Onayı", "Logo Numunesi", "Beden Seti", "Toplu İş Kıyafeti Üretimi"],
      searchTerms: ["iş kıyafeti numune süreci", "üretim öncesi numune", "kumaş onayı", "nakış onayı", "baskı onayı", "beden seti"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "softshell-mont-rehberi",
      title: "Softshell Mont Rehberi: Softshell Kumaş Nedir, Özellikleri ve Kullanım Alanları",
      summary: "Softshell kumaşın katman yapısından su ve rüzgâr direncine, kullanım alanlarından doğru mont seçimine kadar tüm ayrıntıları inceleyin.",
      category: "Ürün Rehberleri",
      tags: ["Softshell Mont", "Softshell Kumaş", "Softshell Mont Özellikleri", "İş Montu", "Kurumsal Softshell Mont", "Su İtici Mont"],
      searchTerms: ["softshell nedir", "softshell mont su geçirir mi", "softshell mont sıcak tutar mı", "softshell mont hangi mevsimde giyilir", "logolu softshell mont"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "is-yelegi-secim-rehberi-2026",
      title: "İş Yeleği Seçim Rehberi 2026",
      summary: "Kumaş, model, cep yapısı, reflektör ve kullanım alanına göre doğru iş yeleği seçimini adım adım inceleyin.",
      category: "Ürün Rehberleri",
      tags: ["İş Yeleği", "İş Yeleği Seçimi", "Reflektörlü İş Yeleği", "Çok Cepli İş Yeleği", "Kışlık İş Yeleği", "Kurumsal İş Yeleği"],
      searchTerms: ["fileli iş yeleği", "softshell yelek", "iş yeleği kumaşı", "iş yeleği bedeni", "logolu iş yeleği"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "polo-yaka-tisort-rehberi-2026",
      title: "Polo Yaka Tişört Rehberi: Kumaş, Pike Türleri, Baskı ve Nakış Seçimi (2026)",
      summary: "Lakost ve pike kumaş türlerinden gramaj, kalıp, baskı ve nakış seçimine kadar doğru polo yaka tişörtü kapsamlı şekilde inceleyin.",
      category: "Ürün Rehberleri",
      tags: ["Polo Yaka Tişört", "Polo Yaka İş Tişörtü", "Lakost Kumaş", "Pike Kumaş", "Mikro Pike", "Nakış", "Baskı"],
      searchTerms: ["kurumsal polo tişört", "logolu polo tişört", "polo yaka gramaj", "polo tişört nakış", "polo tişört baskı"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "is-pantolonu-secim-rehberi-2026",
      title: "İş Pantolonu Seçim Rehberi 2026",
      summary: "Kumaş, model, gramaj, cep yapısı ve kullanım alanına göre doğru iş pantolonu seçimini adım adım inceleyin.",
      category: "Ürün Rehberleri",
      tags: ["İş Pantolonu", "İş Pantolonu Seçimi", "Gabardin İş Pantolonu", "Kargo İş Pantolonu", "Reflektörlü İş Pantolonu", "Yazlık İş Pantolonu"],
      searchTerms: ["streç iş pantolonu", "ripstop pantolon", "iş pantolonu kumaşı", "iş pantolonu bedeni", "diz cepli pantolon"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "is-kiyafeti-fiyatlari-2026",
      title: "İş Kıyafeti Fiyatları 2026: Fiyatları Neler Belirler?",
      summary: "İş kıyafeti fiyatlarını etkileyen kumaş, gramaj, logo, sipariş adedi ve üretim detaylarını kapsamlı şekilde inceleyin.",
      category: "İş Kıyafeti Rehberi",
      tags: ["İş Kıyafeti Fiyatları", "İş Kıyafeti Fiyatları 2026", "İş Kıyafeti", "Kumaş Gramajı", "Logo Uygulaması", "Toplu Sipariş"],
      searchTerms: ["iş kıyafeti maliyeti", "iş elbisesi fiyatları", "nakış fiyatı", "baskı fiyatı", "iş kıyafeti teklifi"],
      published: "2026-07-28",
      views: 0
    },
    {
      slug: "is-kiyafeti-kumas-rehberi",
      title: "İş Kıyafeti Kumaş Rehberi (2026)",
      summary: "Örme, dokuma ve teknik kumaş türlerini; mevsime ve sektöre göre doğru kumaş seçimini kapsamlı şekilde inceleyin.",
      category: "Kumaş Bilgileri",
      tags: ["İş Kıyafeti Kumaşları", "Kumaş Rehberi", "Lakost Kumaş", "Gabardin Kumaş", "Softshell", "Polar", "Pamuk Polyester"],
      searchTerms: ["pike", "süprem", "interlok", "ripstop", "Oxford", "polyamid", "viskon", "kumaş gramajı"],
      published: "2026-07-27",
      views: 0
    },
    {
      slug: "is-kiyafeti-terimleri-sozlugu",
      title: "İş Kıyafeti Terimleri Sözlüğü",
      summary: "Kumaş, dikim, baskı, nakış ve iş kıyafeti üretiminde kullanılan 229 terimi A'dan Z'ye açıklayan kapsamlı sözlük.",
      category: "Tekstil Sözlüğü",
      tags: ["İş Kıyafeti Terimleri", "Tekstil Terimleri", "Kumaş", "Dikim", "Nakış", "Baskı", "İş Kıyafeti Üretimi"],
      searchTerms: ["alpaka", "gabardin", "lakost", "penye", "softshell", "reflektör", "pastal", "reçme", "DTF"],
      published: "2026-07-27",
      views: 0
    },
    {
      slug: "is-kiyafeti-secerken-nelere-dikkat-edilmeli",
      title: "İş Kıyafeti Seçerken Nelere Dikkat Edilmeli?",
      summary: "Kumaş, model, beden, mevsim, logo uygulaması ve kullanım alanına göre doğru iş kıyafeti seçimi.",
      category: "İş Kıyafeti Rehberi",
      tags: ["İş Kıyafeti", "Kurumsal İş Kıyafeti", "Kumaş Seçimi", "Logolu İş Kıyafeti", "İş Güvenliği"],
      published: "2026-07-25",
      views: 100
    },
    {
      slug: "logolu-is-kiyafeti-uretimi",
      title: "Logolu İş Kıyafeti Üretimi",
      summary: "Doğru ürün seçimi, nakış ve baskı, logo yerleşimi, numune ve üretim aşamalarına yönelik rehber.",
      category: "Ürün Rehberleri",
      tags: ["Logolu İş Kıyafeti", "Kurumsal İş Kıyafeti", "Nakış", "Baskı", "İş Kıyafeti Üretimi"],
      published: "2026-07-24",
      views: 82
    },
    {
      slug: "gabardin-kumas-nedir",
      title: "Gabardin Kumaş Nedir? Özellikleri, Çeşitleri ve Kullanım Alanları",
      summary: "Gabardin kumaşın çeşitlerini, gramajını, esneklik ve dayanıklılık özelliklerini, iş kıyafetlerinde kullanım alanlarını inceleyin.",
      category: "Kumaş Bilgileri",
      tags: ["Gabardin Kumaş", "İş Kıyafeti Kumaşları", "İş Pantolonu", "Pamuklu Gabardin", "Likralı Gabardin", "İş Kıyafeti Üretimi", "Kumaş Seçimi"],
      published: "2026-07-27",
      views: 94
    },
    {
      slug: "reflektorlu-is-kiyafeti-nedir",
      title: "Reflektörlü İş Kıyafeti Nedir? Özellikleri, Standartları ve Kullanım Alanları",
      summary: "Reflektörlü iş kıyafetlerinin çalışma prensibini, EN ISO 20471 sınıflarını, kullanım alanlarını ve doğru ürün seçimini inceleyin.",
      category: "İş Güvenliği",
      tags: ["Reflektörlü İş Kıyafeti", "Yüksek Görünürlüklü İş Kıyafeti", "İş Güvenliği", "Reflektörlü Yelek", "Reflektörlü Mont", "Reflektörlü İş Pantolonu", "EN ISO 20471", "Kişisel Koruyucu Donanım", "Saha İş Kıyafetleri", "Reflektör", "Yüksek Görünürlük", "İkaz Yeleği", "Mühendis Yeleği"],
      published: "2026-07-27",
      views: 78
    },
    {
      slug: "nakis-mi-baski-mi",
      title: "Nakış mı, Baskı mı? İş Kıyafetlerinde Doğru Logo Uygulaması Nasıl Seçilir?",
      summary: "Nakış, DTF, serigrafi ve transfer baskı yöntemlerini; dayanıklılık, görünüm, maliyet ve ürün uyumu açısından karşılaştırın.",
      category: "Sektörel Çözümler",
      tags: ["Nakış mı Baskı mı", "İş Kıyafetinde Nakış", "İş Kıyafetinde Baskı", "Logo Uygulaması", "DTF Baskı", "Serigrafi Baskı", "Kurumsal İş Kıyafeti", "Logolu İş Kıyafeti", "Nakış Baskı Farkı"],
      searchTerms: ["logo baskısı", "nakış kartı", "polo yaka nakış", "polar nakış"],
      published: "2026-07-27",
      views: 88
    },
    {
      slug: "is-kiyafeti-uretim-sureci",
      title: "İş Kıyafeti Üretim Süreci",
      summary: "İhtiyaç analizinden teslimata uzanan kurumsal iş kıyafeti üretim adımları.",
      category: "Üretim Rehberi",
      tags: ["İş Kıyafeti", "Kumaş", "Nakış", "Baskı"],
      published: "2026-07-20",
      views: 70
    }
  ];

  const normalize = (value) => value.toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const postUrl = (post, onIndex) => onIndex ? `${post.slug}/` : `../${post.slug}/`;
  const tagUrl = (tag, onIndex) => onIndex ? `?tag=${encodeURIComponent(tag)}` : `../?tag=${encodeURIComponent(tag)}`;

  function tagList(post, onIndex) {
    const list = document.createElement("div");
    list.className = "knowledge-tags";
    list.setAttribute("aria-label", "Etiketler");
    post.tags.forEach((tag) => {
      const link = document.createElement("a");
      link.href = tagUrl(tag, onIndex);
      link.textContent = tag;
      link.dataset.tag = tag;
      list.appendChild(link);
    });
    return list;
  }

  function renderRankedList(target, source, label, onIndex) {
    target.replaceChildren();
    source.slice(0, 3).forEach((post, index) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = postUrl(post, onIndex);
      const marker = document.createElement("span");
      marker.textContent = label === "Yeni" ? label : String(index + 1).padStart(2, "0");
      const title = document.createElement("strong");
      title.textContent = post.title;
      link.append(marker, title);
      item.appendChild(link);
      target.appendChild(item);
    });
  }

  function initIndex() {
    const cards = Array.from(document.querySelectorAll(".knowledge-card[data-post-slug]"));
    const search = document.querySelector("#knowledge-search");
    const status = document.querySelector("#knowledge-search-status");
    const clear = document.querySelector("#knowledge-filter-clear");
    const tagHeading = document.querySelector("#knowledge-active-filter");
    let activeTag = new URLSearchParams(window.location.search).get("tag") || "";

    document.querySelectorAll("[data-category-count]").forEach((counter) => {
      const category = counter.dataset.categoryCount;
      const count = posts.filter((post) => post.category === category).length;
      counter.textContent = `${count} yazı`;
    });

    renderRankedList(
      document.querySelector("#popular-posts"),
      [...posts].sort((a, b) => b.views - a.views),
      "Sıra",
      true
    );
    renderRankedList(
      document.querySelector("#latest-posts"),
      [...posts].sort((a, b) => b.published.localeCompare(a.published)),
      "Yeni",
      true
    );

    cards.forEach((card) => {
      const post = posts.find((item) => item.slug === card.dataset.postSlug);
      if (post) card.insertBefore(tagList(post, true), card.querySelector(".read-more"));
    });

    function filterPosts() {
      const term = normalize(search.value.trim());
      let visibleCount = 0;
      cards.forEach((card) => {
        const post = posts.find((item) => item.slug === card.dataset.postSlug);
        const searchable = normalize([post.title, post.summary, post.category, ...post.tags, ...(post.searchTerms || [])].join(" "));
        const visible = (!term || searchable.includes(term)) && (!activeTag || post.tags.includes(activeTag));
        card.hidden = !visible;
        if (visible) visibleCount += 1;
      });
      document.querySelectorAll(".knowledge-category[data-category]").forEach((section) => {
        section.hidden = !section.querySelector(".knowledge-card:not([hidden])");
      });
      status.textContent = `${visibleCount} yazı gösteriliyor`;
      tagHeading.textContent = activeTag ? `Etiket: ${activeTag}` : "";
      clear.hidden = !activeTag && !term;
    }

    search.addEventListener("input", filterPosts);
    document.querySelector(".knowledge-index").addEventListener("click", (event) => {
      const tag = event.target.closest("[data-tag]");
      if (!tag) return;
      event.preventDefault();
      activeTag = tag.dataset.tag;
      window.history.replaceState({}, "", `?tag=${encodeURIComponent(activeTag)}`);
      filterPosts();
    });
    clear.addEventListener("click", () => {
      activeTag = "";
      search.value = "";
      window.history.replaceState({}, "", window.location.pathname);
      filterPosts();
    });
    filterPosts();
  }

  function initArticle(slug) {
    const current = posts.find((post) => post.slug === slug);
    const article = document.querySelector(".knowledge-article-main");
    if (!current || !article) return;

    const anchor = article.querySelector(".knowledge-article-meta") || article.querySelector(".intro");
    anchor.insertAdjacentElement("afterend", tagList(current, false));

    const similar = posts
      .filter((post) => post.slug !== current.slug)
      .map((post) => ({
        post,
        categoryMatch: post.category === current.category ? 1 : 0,
        sharedTags: post.tags.filter((tag) => current.tags.includes(tag)).length
      }))
      .filter((item) => item.categoryMatch || item.sharedTags)
      .sort((a, b) => b.categoryMatch - a.categoryMatch || b.sharedTags - a.sharedTags || b.post.published.localeCompare(a.post.published))
      .slice(0, 3);

    const section = document.createElement("section");
    section.className = "knowledge-related";
    const heading = document.createElement("h2");
    heading.textContent = "Benzer Yazılar";
    const grid = document.createElement("div");
    grid.className = "knowledge-related-grid";
    similar.forEach(({ post }) => {
      const link = document.createElement("a");
      link.href = postUrl(post, false);
      const category = document.createElement("span");
      category.textContent = post.category;
      const title = document.createElement("strong");
      title.textContent = post.title;
      link.append(category, title);
      grid.appendChild(link);
    });
    section.append(heading, grid);
    const navigation = article.querySelector(".knowledge-post-nav");
    article.insertBefore(section, navigation);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const index = document.querySelector("[data-knowledge-index]");
    if (index) initIndex();
    const article = document.body.dataset.postSlug;
    if (article) initArticle(article);
  });
})();
