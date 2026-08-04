(function () {
  "use strict";

  var placeholder = "assets/products/default.svg";
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
  function colorsFor(folder, code) {
    return sharedColors.map(function (color, index) {
      return { name: color.name, value: color.value, image: "assets/products/hero/" + folder + "/" + code + "-" + colorSlugs[index] + ".png" };
    });
  }
  var tshirtColors = colorsFor("tshirt", "kt-ts-035");
  var sweatColors = colorsFor("sweat", "kt-sw-016");
  var pantolonColors = colorsFor("pantolon", "kt-pt-020");
  var tulumColors = colorsFor("tulum", "kt-tl-017");
  var montkabanColors = colorsFor("montkaban", "kt-mk-022");
  var polarColors = colorsFor("polar", "kt-pl-009");
  var yelekColors = colorsFor("yelek", "kt-yl-017");
  var softshellColors = colorsFor("softshell", "kt-ss-001");

  window.HERO_PRODUCTS = [
    {
      id: "tshirt",
      name: "Tişört",
      description: "Petrol mavisi gövde, lacivert omuz ve yan paneller ile fermuarlı göğüs cebini birleştiren teknik polo yaka model.",
      image: "assets/products/hero/tshirt/kt-ts-035-lacivert.png",
      imageAlt: "KT-TS-035 lacivert teknik polo tişört",
      href: "urunlerimiz#tshirt",
      colors: tshirtColors,
      code: "KT-TS-035",
      productName: "Petrol Mavisi Fermuarlı Cepli Teknik Polo Tişört",
      fabric: "40/1 Compak Full Lycra süprem kumaş",
      weight: "160–170 g/m²",
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
      image: "assets/products/hero/sweat/kt-sw-016-lacivert.png", imageAlt: "KT-SW-016 reflektif şeritli polo yaka sweatshirt", href: "urunlerimiz#sweat", colors: sweatColors,
      code: "KT-SW-016",
      productName: "Reflektif Şeritli Polo Yaka İş Sweatshirtü", fabric: "Compak 30/70/10 şardonsuz üç iplik kumaş", weight: "310–330 g/m²", composition: "%65 pamuk, %35 polyester", useArea: "Depo, üretim ve servis ekipleri", logoOptions: "Nakış, serigrafi ve transfer baskı", minimumOrder: "50 adet", wash: "30 °C tersten yıkama; reflektif alanlara doğrudan ütü uygulamayın.", seoDescription: "KT-SW-016, serin çalışma alanlarında kurumsal iş kıyafeti ve personel kıyafeti ihtiyacını karşılayan reflektif detaylı bir iş elbisesidir. Logo baskılı ürün, promosyon tekstil ve kurumsal tekstil projelerine baskı veya nakışla uyarlanabilir."
    },
    {
      id: "pantolon", name: "Pantolon",
      description: "Hareketli işlere uygun cep düzenleri, dayanıklı kumaşlar ve kurumsal renklerle hazırlanan iş pantolonları.",
      image: "assets/products/hero/pantolon/kt-pt-020-lacivert.png", imageAlt: "KT-PT-020 reflektörlü teknik iş pantolonu", href: "urunlerimiz#pantolon", colors: pantolonColors,
      code: "KT-PT-020",
      productName: "Reflektörlü Teknik İş Pantolonu", fabric: "Gabardin dokuma", weight: "245 (±%5) g/m²", composition: "%100 pamuk", useArea: "Teknik servis, üretim ve saha", logoOptions: "Nakış ve transfer baskı", minimumOrder: "50 adet", wash: "40 °C yıkama; ağartıcı kullanmayın, reflektörleri tersten ütüleyin.", seoDescription: "KT-PT-020 reflektörlü iş pantolonu, kurumsal iş kıyafeti ve personel kıyafeti setlerinde hareket konforunu destekleyen dayanıklı bir iş elbisesidir. Logo baskılı ürün, promosyon tekstil ve kurumsal tekstil uygulamalarına uygun cepli yapıda üretilir."
    },
    {
      id: "tulum", name: "İş Tulumu",
      description: "Üretim, bakım ve saha ekipleri için hareket özgürlüğü ve işlevsel detayları bir araya getiren iş tulumları.",
      image: "assets/products/hero/tulum/kt-tl-017-lacivert.png", imageAlt: "KT-TL-017 panelli teknik iş tulumu", href: "urunlerimiz#tulum", colors: tulumColors,
      code: "KT-TL-017",
      productName: "Panelli Çok Cepli Teknik İş Tulumu", fabric: "Gabardin dokuma", weight: "245 (±%5) g/m²", composition: "%100 pamuk", useArea: "Bakım, montaj ve üretim hatları", logoOptions: "Nakış ve transfer baskı", minimumOrder: "50 adet", wash: "40 °C yıkama; fermuarları kapatın, ağartıcı kullanmayın.", seoDescription: "KT-TL-017 teknik tulum, bakım ve üretim ekipleri için kurumsal iş kıyafeti, personel kıyafeti ve bütüncül iş elbisesi çözümüdür. Logo baskılı ürün olarak nakışla kişiselleştirilebilir; promosyon tekstil ve kurumsal tekstil programlarına uyarlanır."
    },
    {
      id: "montkaban", name: "Mont",
      description: "Soğuk hava ve saha koşullarına yönelik, kurumsal görünüm ile koruyucu detayları buluşturan dış giyim ürünleri.",
      image: "assets/products/hero/montkaban/kt-mk-022-lacivert.png", imageAlt: "KT-MK-022 lacivert antrasit panelli teknik iş montu", href: "urunlerimiz#montkaban", colors: montkabanColors,
      code: "KT-MK-022",
      productName: "Panelli Teknik İş Montu", fabric: "Bonding su itici kaplamalı dokuma (en 150 ±3 cm)", weight: "190 (±%5) g/m²", composition: "%100 polyester dış yüzey", useArea: "Açık saha, sevkiyat ve teknik ekipler", logoOptions: "Nakış, arma ve transfer baskı", minimumOrder: "50 adet", wash: "30 °C hassas yıkama; yumuşatıcı ve tamburlu kurutma kullanmayın.", seoDescription: "KT-MK-022 teknik mont, açık saha ekipleri için koruyucu kurumsal iş kıyafeti ve personel kıyafeti çözümüdür. Logo baskılı ürün olarak hazırlanabilen bu iş elbisesi, promosyon tekstil ve kurumsal tekstil koleksiyonlarını tamamlar."
    },
    {
      id: "polar", name: "Polar",
      description: "Katmanlı giyime uygun, sıcak tutan ve firma logosuyla özelleştirilebilen hafif polar modelleri.",
      image: "assets/products/hero/polar/kt-pl-009-lacivert.png", imageAlt: "KT-PL-009 lacivert reflektif şeritli fermuarlı iş poları", href: "urunlerimiz#polar", colors: polarColors,
      code: "KT-PL-009",
      productName: "Reflektif Şeritli Fermuarlı İş Poları", fabric: "Anti-pilling şardonlu ve tıraşlı polar", weight: "260–280 g/m²", composition: "%100 polyester", useArea: "Depo, servis ve katmanlı giyim", logoOptions: "Nakış ve arma uygulaması", minimumOrder: "50 adet", wash: "30 °C hassas yıkama; düşük devirde sıkın, ütülemeyin.", seoDescription: "KT-PL-009 fermuarlı polar, soğuk çalışma alanlarında kurumsal iş kıyafeti ve personel kıyafeti katmanı olarak kullanılır. Nakışlı veya logo baskılı ürün seçeneğiyle iş elbisesi, promosyon tekstil ve kurumsal tekstil ihtiyaçlarına cevap verir."
    },
    {
      id: "yelek", name: "Yelek",
      description: "Depo, sevkiyat ve saha ekipleri için fonksiyonel ceplerle tasarlanan kurumsal iş yelekleri.",
      image: "assets/products/hero/yelek/kt-yl-017-lacivert.png", imageAlt: "KT-YL-017 lacivert turuncu teknik yazlık iş yeleği", href: "urunlerimiz#yelek", colors: yelekColors,
      code: "KT-YL-017",
      productName: "Çok Cepli Teknik Yazlık İş Yeleği", fabric: "İnce gabardin dokuma", weight: "245 (±%5) g/m²", composition: "%100 pamuk", useArea: "Depo, sevkiyat ve saha ekipleri", logoOptions: "Nakış ve transfer baskı", minimumOrder: "50 adet", wash: "40 °C yıkama; cepleri boşaltın ve fermuarları kapatın.", seoDescription: "KT-YL-017 yazlık yelek, cep organizasyonu gereken ekiplerde kurumsal iş kıyafeti ve personel kıyafeti olarak öne çıkar. Logo baskılı ürün ve nakış seçenekleriyle iş elbisesi, promosyon tekstil ve kurumsal tekstil siparişlerine hazırlanır."
    },
    {
      id: "softshell", name: "Softshell",
      description: "Değişken hava koşullarında hareket özgürlüğü sağlayan, su itici ve nefes alabilen softshell ürünler.",
      image: "assets/products/hero/softshell/kt-ss-001-lacivert.png", imageAlt: "KT-SS-001 lacivert siyah kapüşonlu softshell iş montu", href: "urunlerimiz#softshell", colors: softshellColors,
      code: "KT-SS-001",
      productName: "Kapüşonlu İki Renkli Softshell İş Montu", fabric: "Üç katmanlı, su ve rüzgâr geçirmez softshell", weight: "300 (±%5) g/m²", composition: "%100 polyester streç", useArea: "Değişken hava koşulları ve açık saha", logoOptions: "Nakış ve transfer baskı", minimumOrder: "50 adet", wash: "30 °C hassas yıkama; yumuşatıcı kullanmayın, düşük ısıda kurutun.", seoDescription: "KT-SS-001 kapüşonlu softshell, değişken hava koşullarında kurumsal iş kıyafeti ve personel kıyafeti standardını korur. Esnek iş elbisesi yapısı; logo baskılı ürün, promosyon tekstil ve kurumsal tekstil projeleri için kişiselleştirilebilir."
    }
  ];
})();
