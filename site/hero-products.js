(function () {
  "use strict";

  var sharedColors = [
    { name: "Lacivert", value: "#18324a" },
    { name: "Antrasit", value: "#454b52" },
    { name: "Saks Mavisi", value: "#1769aa" },
    { name: "Turuncu", value: "#e6662a" },
    { name: "Siyah", value: "#17191c" },
    { name: "Kırmızı", value: "#a92f2f" },
    { name: "Bordo", value: "#682c3a" },
    { name: "Haki", value: "#66704a" },
    { name: "Bej", value: "#c2a77c" },
    { name: "Beyaz", value: "#f4f1e9" }
  ];
  var colorSlugs = ["lacivert", "antrasit", "saks-mavisi", "turuncu", "siyah", "kirmizi", "bordo", "haki", "bej", "beyaz"];
  function colorsFor(folder, code, version) {
    return sharedColors.map(function (color, index) {
      return { name: color.name, value: color.value, image: "assets/products/hero/" + folder + "/" + code + "-" + colorSlugs[index] + ".webp" + (version ? "?v=" + version : "") };
    });
  }
  var tshirtColors = colorsFor("tshirt", "kt-ts-040");
  var sweatColors = colorsFor("sweat", "kt-sw-034");
  var pantolonColors = colorsFor("pantolon", "kt-pt-001");
  var tulumColors = colorsFor("tulum", "kt-tl-020");
  var montkabanColors = colorsFor("montkaban", "kt-mk-001");
  var polarColors = colorsFor("polar", "kt-pl-008");
  var yelekColors = colorsFor("yelek", "kt-yl-005");
  var softshellColors = colorsFor("softshell", "kt-ss-022");
  var tshirtAltColors = colorsFor("tshirt", "kt-ts-037");
  var sweatAltColors = colorsFor("sweat", "kt-sw-036");
  var pantolonAltColors = colorsFor("pantolon", "kt-pt-029");
  var tulumAltColors = colorsFor("tulum", "kt-tl-022");
  var montkabanAltColors = colorsFor("montkaban", "kt-mk-029");
  var polarAltColors = colorsFor("polar", "kt-pl-028");
  var yelekAltColors = colorsFor("yelek", "kt-yl-010");
  var softshellAltColors = colorsFor("softshell", "kt-ss-020");
  var tshirtLegacyColors = colorsFor("tshirt", "kt-ts-035");
  var tshirtLegacyAltColors = colorsFor("tshirt", "kt-ts-036");
  var sweatLegacyColors = colorsFor("sweat", "kt-sw-016");
  var sweatLegacyAltColors = colorsFor("sweat", "kt-sw-028");
  var pantolonLegacyColors = colorsFor("pantolon", "kt-pt-020");
  var pantolonLegacyAltColors = colorsFor("pantolon", "kt-pt-015");
  var tulumLegacyColors = colorsFor("tulum", "kt-tl-017");
  var tulumLegacyAltColors = colorsFor("tulum", "kt-tl-001");
  var montLegacyColors = colorsFor("montkaban", "kt-mk-022");
  var montLegacyAltColors = colorsFor("montkaban", "kt-mk-023");
  var polarLegacyColors = colorsFor("polar", "kt-pl-009");
  var polarLegacyAltColors = colorsFor("polar", "kt-pl-023");
  var yelekLegacyColors = colorsFor("yelek", "kt-yl-017");
  var yelekLegacyAltColors = colorsFor("yelek", "kt-yl-009");
  var softshellLegacyColors = colorsFor("softshell", "kt-ss-001");
  var softshellLegacyAltColors = colorsFor("softshell", "kt-ss-016");

  window.HERO_PRODUCTS = [
    {
      id: "tshirt",
      name: "Tişört",
      description: "V yaka, kontrast omuz robası, ince biye ve fermuarlı göğüs cebiyle teknik ekipler için hazırlanan iş tişörtü.",
      image: "assets/products/hero/tshirt/kt-ts-040-lacivert.webp",
      imageAlt: "KT-TS-040 V yaka teknik iş tişörtü",
      href: "urunlerimiz#tshirt",
      colors: tshirtColors,
      code: "KT-TS-040",
      alternates: [{ code:"KT-TS-037", productName:"Fermuar Cepli Polo İş Tişörtü", description:"Kontrast omuz paneli, biye ve fermuarlı göğüs cebiyle teknik ekipler için hazırlanan polo iş tişörtü.", imageAlt:"KT-TS-037 fermuar cepli polo iş tişörtü", colors:tshirtAltColors, fabric:"40/1 Compak Full Lycra Pike", weight:"170–180 g/m²", composition:"%94 pamuk, %6 lycra", useArea:"Servis, bakım ve saha ekipleri", logoOptions:"Nakış, serigrafi ve transfer baskı", minimumOrder:"50 adet", wash:"30 °C hassas yıkama; tersten yıkayın." }, { code:"KT-TS-035", productName:"Fermuarlı Cepli Teknik Polo Tişört", description:"Petrol mavisi gövde, kontrast paneller ve fermuarlı göğüs cebiyle teknik polo model.", imageAlt:"KT-TS-035 teknik polo tişört", colors:tshirtLegacyColors }, { code:"KT-TS-036", productName:"Fosfor Garnili Bisiklet Yaka İş Tişörtü", description:"Fosfor omuz ve yan panellerle görünürlüğü destekleyen iş tişörtü.", imageAlt:"KT-TS-036 fosfor garnili iş tişörtü", colors:tshirtLegacyAltColors }],
      productName: "V Yaka Teknik İş Tişörtü",
      fabric: "40/1 Compak Full Lycra Pike",
      weight: "170–180 g/m²",
      composition: "%94 pamuk, %6 lycra",
      useArea: "Üretim, servis ve saha ekipleri",
      logoOptions: "Nakış, serigrafi ve transfer baskı",
      minimumOrder: "50 adet",
      wash: "30 °C hassas yıkama; tersten yıkayın, düşük ısıda ütüleyin.",
      seoDescription: "KT-TS-035 teknik polo, kurumsal iş kıyafeti ve personel kıyafeti projeleri için dayanıklı bir iş elbisesi alternatifidir. Logo baskılı ürün ve nakış uygulamalarına uygun yapısıyla promosyon tekstil ve kurumsal tekstil siparişlerinde marka bütünlüğü sağlar."
    },
    {
      id: "sweat", name: "Sweatshirt & Hoodie",
      description: "Serin çalışma ortamlarında ekip bütünlüğünü koruyan, baskı ve nakışa uygun kurumsal sweatshirt modelleri.",
      image: "assets/products/hero/sweat/kt-sw-034-lacivert.webp", imageAlt: "KT-SW-034 yarım fermuarlı teknik sweatshirt", href: "urunlerimiz#sweat", colors: sweatColors,
      code: "KT-SW-034",
      alternates: [{ code:"KT-SW-036", productName:"Cepli Polo Sweatshirt", description:"Kontrast panelleri ve işlevsel göğüs cebiyle kurumsal ekip kullanımı için hazırlanan polo sweatshirt.", imageAlt:"KT-SW-036 cepli polo sweatshirt", colors:sweatAltColors, fabric:"Üç iplik sweatshirt kumaşı", weight:"310–330 g/m²", composition:"%65 pamuk, %35 polyester", useArea:"Bakım, üretim ve teknik servis ekipleri", logoOptions:"Nakış, serigrafi ve transfer baskı", minimumOrder:"50 adet", wash:"30 °C tersten yıkama; düşük ısıda ütüleyin." }, { code:"KT-SW-016", productName:"Reflektörlü Polo Yaka Sweatshirt", description:"Reflektif bantlarıyla kurumsal saha ekiplerine uygun sweatshirt.", imageAlt:"KT-SW-016 reflektörlü sweatshirt", colors:sweatLegacyColors }, { code:"KT-SW-028", productName:"Yarım Fermuarlı Teknik Sweatshirt", description:"Turuncu biyeler ve takviyelerle hazırlanan teknik sweatshirt.", imageAlt:"KT-SW-028 teknik sweatshirt", colors:sweatLegacyAltColors }],
      productName: "Yarım Fermuarlı Teknik İş Sweatshirtü", fabric: "Compak 30/70/10 şardonsuz üç iplik kumaş", weight: "310–330 g/m²", composition: "%65 pamuk, %35 polyester", useArea: "Depo, üretim ve servis ekipleri", logoOptions: "Nakış, serigrafi ve transfer baskı", minimumOrder: "50 adet", wash: "30 °C tersten yıkama; düşük ısıda ütüleyin.", seoDescription: "KT-SW-034, serin çalışma alanlarında kurumsal iş kıyafeti ve personel kıyafeti ihtiyacını karşılayan teknik bir iş sweatshirtüdür."
    },
    {
      id: "pantolon", name: "Pantolon",
      description: "Hareketli işlere uygun cep düzenleri, dayanıklı kumaşlar ve kurumsal renklerle hazırlanan iş pantolonları.",
      image: "assets/products/hero/pantolon/kt-pt-001-lacivert.webp", imageAlt: "KT-PT-001 çok cepli diz takviyeli iş pantolonu", href: "urunlerimiz#pantolon", colors: pantolonColors,
      code: "KT-PT-001",
      alternates: [{ code:"KT-PT-029", productName:"Panelli Teknik İş Pantolonu", description:"Kontrast panelleri, kargo cepleri ve takviyeli yapısıyla yoğun saha kullanımına uygun teknik pantolon.", imageAlt:"KT-PT-029 panelli teknik iş pantolonu", colors:pantolonAltColors, fabric:"Gabardin dokuma", weight:"245 (±%5) g/m²", composition:"%100 pamuk", useArea:"Montaj, bakım, üretim ve saha", logoOptions:"Nakış, arma ve transfer baskı", minimumOrder:"50 adet", wash:"40 °C yıkama; ağartıcı kullanmayın." }, { code:"KT-PT-020", productName:"Reflektörlü İş Pantolonu", description:"Kontrast detayları ve reflektörleriyle saha kullanımına uygun pantolon.", imageAlt:"KT-PT-020 reflektörlü iş pantolonu", colors:pantolonLegacyColors }, { code:"KT-PT-015", productName:"Diz Takviyeli Teknik İş Pantolonu", description:"Çoklu cepleri ve diz takviyeleriyle yoğun kullanıma uygun pantolon.", imageAlt:"KT-PT-015 teknik iş pantolonu", colors:pantolonLegacyAltColors }],
      productName: "Çok Cepli Diz Takviyeli İş Pantolonu", fabric: "Gabardin dokuma", weight: "245 (±%5) g/m²", composition: "%100 pamuk", useArea: "Teknik servis, üretim ve saha", logoOptions: "Nakış ve transfer baskı", minimumOrder: "50 adet", wash: "40 °C yıkama; ağartıcı kullanmayın.", seoDescription: "KT-PT-001 çok cepli iş pantolonu, kurumsal ekiplerin saha kullanımı için dayanıklı ve işlevsel bir modeldir."
    },
    {
      id: "tulum", name: "İş Tulumu",
      description: "Üretim, bakım ve saha ekipleri için hareket özgürlüğü ve işlevsel detayları bir araya getiren iş tulumları.",
      image: "assets/products/hero/tulum/kt-tl-020-lacivert.webp", imageAlt: "KT-TL-020 panelli bahçıvan tulumu", href: "urunlerimiz#tulum", colors: tulumColors,
      code: "KT-TL-020",
      alternates: [{ code:"KT-TL-022", productName:"Takviyeli Teknik İş Tulumu", description:"Kontrast takviyeleri, fermuarlı ön yapısı ve çoklu cepleriyle üretim ve bakım ekiplerine uygun iş tulumu.", imageAlt:"KT-TL-022 takviyeli teknik iş tulumu", colors:tulumAltColors, fabric:"Gabardin dokuma", weight:"245 (±%5) g/m²", composition:"%100 pamuk", useArea:"Bakım, montaj, otomotiv ve üretim", logoOptions:"Nakış, baskı ve arma", minimumOrder:"50 adet", wash:"40 °C yıkama; fermuarları kapatın ve ağartıcı kullanmayın." }, { code:"KT-TL-017", productName:"Panelli Teknik İş Tulumu", description:"Kontrast panelleriyle üretim ve bakım ekiplerine uygun iş tulumu.", imageAlt:"KT-TL-017 teknik iş tulumu", colors:tulumLegacyColors }, { code:"KT-TL-001", productName:"Diz Takviyeli Bahçıvan Tulumu", description:"Ayarlanabilir askıları, cepleri ve diz takviyeleriyle bahçıvan tulumu.", imageAlt:"KT-TL-001 bahçıvan tulumu", colors:tulumLegacyAltColors }],
      productName: "Panelli Bahçıvan İş Tulumu", fabric: "Gabardin dokuma", weight: "245 (±%5) g/m²", composition: "%100 pamuk", useArea: "Bakım, montaj ve üretim hatları", logoOptions: "Nakış ve transfer baskı", minimumOrder: "50 adet", wash: "40 °C yıkama; tokaları kapatın, ağartıcı kullanmayın.", seoDescription: "KT-TL-020 bahçıvan tulumu, bakım ve üretim ekipleri için çok cepli kurumsal iş kıyafeti çözümüdür."
    },
    {
      id: "montkaban", name: "Mont",
      description: "Soğuk hava ve saha koşullarına yönelik, kurumsal görünüm ile koruyucu detayları buluşturan dış giyim ürünleri.",
      image: "assets/products/hero/montkaban/kt-mk-001-lacivert.webp", imageAlt: "KT-MK-001 reflektörlü iş montu", href: "urunlerimiz#montkaban", colors: montkabanColors,
      code: "KT-MK-001",
      alternates: [{ code:"KT-MK-029", productName:"Kapüşonlu Teknik İş Montu", description:"Kontrast panelleri, kapüşonu ve fermuarlı cepleriyle açık saha ekiplerine yönelik teknik iş montu.", imageAlt:"KT-MK-029 kapüşonlu teknik iş montu", colors:montkabanAltColors, fabric:"Su itici teknik dokuma", weight:"190 (±%5) g/m²", composition:"%100 polyester dış yüzey", useArea:"Açık saha, lojistik ve teknik ekipler", logoOptions:"Nakış, arma ve transfer baskı", minimumOrder:"50 adet", wash:"30 °C hassas yıkama; yumuşatıcı kullanmayın." }, { code:"KT-MK-022", productName:"Panelli Teknik İş Montu", description:"Koruyucu panellerle açık saha koşullarına uygun teknik mont.", imageAlt:"KT-MK-022 teknik iş montu", colors:montLegacyColors }, { code:"KT-MK-023", productName:"Fosfor Panelli Kapüşonlu İş Montu", description:"Fosfor paneller ve reflektörlerle görünürlüğü destekleyen mont.", imageAlt:"KT-MK-023 kapüşonlu iş montu", colors:montLegacyAltColors }],
      productName: "Reflektörlü Teknik İş Montu", fabric: "Bonding su itici kaplamalı dokuma", weight: "190 (±%5) g/m²", composition: "%100 polyester dış yüzey", useArea: "Açık saha, sevkiyat ve teknik ekipler", logoOptions: "Nakış, arma ve transfer baskı", minimumOrder: "50 adet", wash: "30 °C hassas yıkama; yumuşatıcı ve tamburlu kurutma kullanmayın.", seoDescription: "KT-MK-001 reflektörlü teknik mont, açık saha ekipleri için koruyucu kurumsal iş kıyafeti çözümüdür."
    },
    {
      id: "polar", name: "Polar",
      description: "Katmanlı giyime uygun, sıcak tutan ve firma logosuyla özelleştirilebilen hafif polar modelleri.",
      image: "assets/products/hero/polar/kt-pl-008-lacivert.webp", imageAlt: "KT-PL-008 yarım fermuarlı reflektif iş poları", href: "urunlerimiz#polar", colors: polarColors,
      code: "KT-PL-008",
      alternates: [{ code:"KT-PL-028", productName:"Takviyeli Polar Mont", description:"Kontrast omuz takviyeleri ve fermuarlı cepleriyle katmanlı iş giyimine uygun polar mont.", imageAlt:"KT-PL-028 takviyeli polar mont", colors:polarAltColors, fabric:"Anti-pilling polar ve dokuma takviye", weight:"260–280 g/m²", composition:"%100 polyester", useArea:"Depo, lojistik, servis ve güvenlik", logoOptions:"Nakış ve arma uygulaması", minimumOrder:"50 adet", wash:"30 °C hassas yıkama; ütülemeyin." }, { code:"KT-PL-009", productName:"Reflektörlü Polar Mont", description:"Reflektör bantları ve cepleriyle katmanlı iş giyimine uygun polar.", imageAlt:"KT-PL-009 reflektörlü polar", colors:polarLegacyColors }, { code:"KT-PL-023", productName:"Kapüşonlu Polar Mont", description:"Dokuma kapüşonu, takviyeleri ve kanguru cebiyle iş poları.", imageAlt:"KT-PL-023 kapüşonlu polar", colors:polarLegacyAltColors }],
      productName: "Yarım Fermuarlı Reflektif İş Poları", fabric: "Anti-pilling şardonlu ve tıraşlı polar", weight: "260–280 g/m²", composition: "%100 polyester", useArea: "Depo, servis ve katmanlı giyim", logoOptions: "Nakış ve arma uygulaması", minimumOrder: "50 adet", wash: "30 °C hassas yıkama; düşük devirde sıkın, ütülemeyin.", seoDescription: "KT-PL-008 yarım fermuarlı polar, soğuk çalışma alanlarında kurumsal iş kıyafeti katmanı olarak kullanılır."
    },
    {
      id: "yelek", name: "Yelek",
      description: "Depo, sevkiyat ve saha ekipleri için fonksiyonel ceplerle tasarlanan kurumsal iş yelekleri.",
      image: "assets/products/hero/yelek/kt-yl-005-lacivert.webp", imageAlt: "KT-YL-005 kapitone iş yeleği", href: "urunlerimiz#yelek", colors: yelekColors,
      code: "KT-YL-005",
      alternates: [{ code:"KT-YL-010", productName:"Kontrast Panelli Çok Cepli İş Yeleği", description:"Omuz ve yan kontrast panelleriyle, kapaklı göğüs cepleri bulunan işlevsel iş yeleği.", imageAlt:"KT-YL-010 kontrast panelli çok cepli iş yeleği", colors:yelekAltColors, fabric:"İnce gabardin dokuma", weight:"245 (±%5) g/m²", composition:"%100 pamuk", useArea:"Depo, bakım, sevkiyat ve saha", logoOptions:"Nakış ve transfer baskı", minimumOrder:"50 adet", wash:"40 °C yıkama; cepleri boşaltın." }, { code:"KT-YL-017", productName:"Teknik Yazlık İş Yeleği", description:"Kontrast detayları ve çoklu cepleriyle hafif iş yeleği.", imageAlt:"KT-YL-017 teknik iş yeleği", colors:yelekLegacyColors }, { code:"KT-YL-009", productName:"Fosfor Şeritli Çok Cepli İş Yeleği", description:"Fosfor şeritleri ve çoklu cepleriyle saha ekiplerine uygun yelek.", imageAlt:"KT-YL-009 iş yeleği", colors:yelekLegacyAltColors }],
      productName: "Kapitone İş Yeleği", fabric: "Kapitone dokuma", weight: "245 (±%5) g/m²", composition: "%100 polyester dış yüzey", useArea: "Depo, sevkiyat ve saha ekipleri", logoOptions: "Nakış ve transfer baskı", minimumOrder: "50 adet", wash: "30 °C hassas yıkama; fermuarları kapatın.", seoDescription: "KT-YL-005 kapitone yelek, serin çalışma alanlarında kurumsal personel kıyafeti olarak kullanılır."
    },
    {
      id: "softshell", name: "Softshell",
      description: "Değişken hava koşullarında hareket özgürlüğü sağlayan, su itici ve nefes alabilen softshell ürünler.",
      image: "assets/products/hero/softshell/kt-ss-022-lacivert.webp", imageAlt: "KT-SS-022 iç dolgusuz softshell yelek", href: "urunlerimiz#softshell", colors: softshellColors,
      code: "KT-SS-022",
      alternates: [{ code:"KT-SS-020", productName:"Diz Takviyeli Softshell Pantolon", description:"Kontrast diz takviyeleri ve işlevsel cepleriyle hareketli saha kullanımı için hazırlanan softshell pantolon.", imageAlt:"KT-SS-020 diz takviyeli softshell pantolon", colors:softshellAltColors, fabric:"Üç katmanlı softshell", weight:"300 (±%5) g/m²", composition:"%100 polyester streç", useArea:"Teknik servis, bakım ve açık saha", logoOptions:"Nakış ve transfer baskı", minimumOrder:"50 adet", wash:"30 °C hassas yıkama; yumuşatıcı kullanmayın." }, { code:"KT-SS-001", productName:"Çift Renk Kapüşonlu Softshell Kaban", description:"Çıkarılabilir kapüşonu ve cepleriyle koruyucu softshell kaban.", imageAlt:"KT-SS-001 softshell kaban", colors:softshellLegacyColors }, { code:"KT-SS-016", productName:"Asimetrik Panelli Softshell Mont", description:"Asimetrik paneli ve fermuarlı cepleriyle teknik softshell mont.", imageAlt:"KT-SS-016 softshell mont", colors:softshellLegacyAltColors }],
      productName: "İç Dolgusuz Softshell İş Yeleği", fabric: "Üç katmanlı softshell", weight: "300 (±%5) g/m²", composition: "%100 polyester streç", useArea: "Değişken hava koşulları ve açık saha", logoOptions: "Nakış ve transfer baskı", minimumOrder: "50 adet", wash: "30 °C hassas yıkama; yumuşatıcı kullanmayın.", seoDescription: "KT-SS-022 softshell yelek, değişken hava koşullarında hareketli ekipler için kurumsal iş kıyafeti çözümüdür."
    }
  ];
})();
