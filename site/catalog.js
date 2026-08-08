/* =====================================================================
   KATALOG MOTORU — urunlerimiz
   =====================================================================
   Bu dosya products.js içindeki KATALOG verisini okuyup sayfayı çizer:
   - Kategori menüsü (yapışkan nav) ve bölümler otomatik oluşur
   - "N model" sayaçları ve üstteki özet otomatik hesaplanır
   - Lightbox (ürün inceleme), arama ve aktif bölüm takibi burada

   Ürün eklemek/değiştirmek için bu dosyaya DOKUNMANA GEREK YOK —
   sadece products.js dosyasını düzenle.
   ===================================================================== */
(function () {
  "use strict";

  var WHATSAPP = "902163961988";
  var GALLERY_PATH = "assets/products/gallery/";
  var NEW_PRODUCT_IMAGES = {
    "KT-TS-040": "assets/products/hero/tshirt/kt-ts-040-lacivert.webp", "KT-TS-037": "assets/products/hero/tshirt/kt-ts-037-lacivert.webp",
    "KT-SW-034": "assets/products/hero/sweat/kt-sw-034-lacivert.webp", "KT-SW-036": "assets/products/hero/sweat/kt-sw-036-lacivert.webp",
    "KT-PT-001": "assets/products/hero/pantolon/kt-pt-001-lacivert.webp", "KT-PT-029": "assets/products/hero/pantolon/kt-pt-029-lacivert.webp",
    "KT-TL-020": "assets/products/hero/tulum/kt-tl-020-lacivert.webp", "KT-TL-022": "assets/products/hero/tulum/kt-tl-022-lacivert.webp",
    "KT-MK-001": "assets/products/hero/montkaban/kt-mk-001-lacivert.webp", "KT-MK-029": "assets/products/hero/montkaban/kt-mk-029-lacivert.webp",
    "KT-PL-008": "assets/products/hero/polar/kt-pl-008-lacivert.webp", "KT-PL-028": "assets/products/hero/polar/kt-pl-028-lacivert.webp",
    "KT-YL-005": "assets/products/hero/yelek/kt-yl-005-lacivert.webp", "KT-YL-010": "assets/products/hero/yelek/kt-yl-010-lacivert.webp",
    "KT-SS-022": "assets/products/hero/softshell/kt-ss-022-lacivert.webp", "KT-SS-020": "assets/products/hero/softshell/kt-ss-020-lacivert.webp"
  };
  var categoryInsights = {
    tshirt: ["Üretim, depo ve saha ekipleri", "Baskı veya nakış", "Kurumsal renge özel seri üretim"],
    sweat: ["Depo, servis ve saha ekipleri", "Göğüs ve sırt logo uygulaması", "Mevsimlik katmanlı üretim"],
    pantolon: ["Üretim, bakım ve teknik ekipler", "Cep üstü logo seçenekleri", "Göreve uygun cep ve kumaş planı"],
    tulum: ["Bakım, üretim ve ağır iş ekipleri", "Göğüs ve sırt logo uygulaması", "Hareket ve dayanıklılık odaklı üretim"],
    onluk: ["Gıda, mutfak ve laboratuvar", "Nakış ve transfer baskı", "Hijyen ve görev bazlı modelleme"],
    montkaban: ["Saha, lojistik ve dış ortam", "Nakış ve reflektif baskı", "İklim koşullarına uygun katmanlama"],
    polar: ["Servis, depo ve saha ekipleri", "Göğüs nakışı ve baskı", "Kurumsal renklerde mevsimlik üretim"],
    yelek: ["Teknik servis ve saha operasyonları", "Baskı, nakış ve reflektör", "Cep düzenine göre fonksiyonel üretim"],
    softshell: ["Dış saha ve mobil ekipler", "Göğüs ve kol logo uygulaması", "Rüzgâr ve hareket konforu odaklı üretim"],
    reflektor: ["Üretim, şantiye ve gece çalışan ekipler", "Ürüne uygun renk ve en seçenekleri", "İhtiyaca göre reflektif malzeme uygulaması"],
    isg: ["Şantiye, üretim ve iş güvenliği", "Ürüne uygun kurumsal işaretleme", "İhtiyaca göre ürün ve beden tedariki"],
    promosyon: ["Etkinlik, saha ve kurumsal tanıtım", "Logo baskı seçenekleri", "Kampanya ve ekip ihtiyacına göre planlama"]
  };

  /* Lightbox'taki açıklama kutusu + özellik listesi.
     Ürünün "kind" alanına göre seçilir; yoksa "default" kullanılır. */
  var featureSets = {
    default: {
      title: "Firmanıza özel üretim",
      text: "Renk, kumaş, cep, reflektör, baskı ve nakış detayları üretim öncesinde birlikte planlanır.",
      features: [
        "Logo baskı ve nakış uygulaması",
        "Kurumsal renge özel üretim",
        "Minimum 50 adet sipariş",
        "Firmanıza özel tasarım desteği"
      ]
    },
    ikaz: {
      title: "Kurumsal ikaz yeleği çözümleri",
      text: "Renk, reflektör, cep ve logo uygulaması seçeneklerini ihtiyacınıza göre birlikte planlayabiliriz.",
      features: [
        "Yüksek görünürlük seçenekleri",
        "Reflektör ve cep alternatifleri",
        "Logo baskı uygulaması",
        "Kurumsal toplu sipariş"
      ]
    },
    ayakkabi: {
      title: "İş ayakkabısı tedariki",
      text: "Model ve beden seçenekleri için güncel stok ve fiyat bilgisini WhatsApp üzerinden öğrenebilirsiniz.",
      features: [
        "YDS, Arısan ve Mekap seçenekleri",
        "Farklı model ve beden aralıkları",
        "Kurumsal toplu sipariş",
        "İş kıyafetleriyle birlikte teklif"
      ]
    },
    baret: {
      title: "İş güvenliği bareti tedariki",
      text: "Renk ve adet ihtiyacınıza uygun baret seçenekleri için güncel stok ve fiyat bilgisi sunuyoruz.",
      features: [
        "Farklı renk seçenekleri",
        "Kurumsal toplu sipariş",
        "İş güvenliği ürünleriyle birlikte teklif",
        "Hızlı fiyat ve stok bilgisi"
      ]
    },
    reflektor: {
      title: "Reflektör uygulama seçenekleri",
      text: "Reflektör türü, parlaklık değeri, renk ve şerit eni ürün modeline ve kullanım alanına göre birlikte belirlenir.",
      features: [
        "Farklı CD parlaklık değerleri",
        "2 cm, 2,5 cm, 3 cm ve 5 cm en seçenekleri",
        "Gümüş, gri ve renkli reflektör alternatifleri",
        "İş kıyafetine özel uygulama planlaması"
      ]
    }
  };

  /* ---------------------------------------------------------------
     1) VERİYİ NORMALLEŞTİR
     products.js'teki kısa yazımı ("01.jpg" gibi) tam ürün objesine çevir.
     --------------------------------------------------------------- */
  function pad3(n) { return ("00" + n).slice(-3); }
  function webpSource(filename) {
    return String(filename || "").replace(/\.(png|jpe?g)$/i, ".webp");
  }

  function normalizeProducts(cat) {
    var flat = [];
    var groups = cat.gruplar
      ? cat.gruplar
      : [{ prefix: cat.prefix, baseName: cat.baseName, tags: cat.tags, kind: "", search: "", urunler: cat.urunler }];

    // Explicit product codes may belong to items displayed later in the list.
    // Reserve them first so automatically generated codes can never duplicate them.
    var reservedCodes = {};
    var nextCodeByPrefix = {};
    groups.forEach(function (group) {
      group.urunler.forEach(function (raw) {
        if (typeof raw !== "string" && raw.code) reservedCodes[raw.code] = true;
      });
    });

    function nextAvailableCode(prefix) {
      var next = nextCodeByPrefix[prefix] || (cat.codeStart || 1);
      var candidate = prefix + "-" + pad3(next);
      while (reservedCodes[candidate]) {
        next += 1;
        candidate = prefix + "-" + pad3(next);
      }
      reservedCodes[candidate] = true;
      nextCodeByPrefix[prefix] = next + 1;
      return candidate;
    }

    groups.forEach(function (group) {
      group.urunler = group.urunler.slice().sort(function (a, b) {
        var aCode = typeof a === "string" ? "" : (a.code || "");
        var bCode = typeof b === "string" ? "" : (b.code || "");
        return (NEW_PRODUCT_IMAGES[bCode] ? 1 : 0) - (NEW_PRODUCT_IMAGES[aCode] ? 1 : 0);
      });
      group.items = group.urunler.map(function (raw, idx) {
        var p = typeof raw === "string" ? { img: raw } : raw;
        var code = p.code || nextAvailableCode(group.prefix);
        var item = {
          src: NEW_PRODUCT_IMAGES[code] || (GALLERY_PATH + cat.id + "/" + (p.keepFormat ? p.img : webpSource(p.img))),
          code: code,
          name: p.name || group.baseName + " " + (idx + 1),
          tags: (p.tags || group.tags || "").split("|").map(function (t) { return t.trim(); }).filter(Boolean),
          kind: p.kind || group.kind || "",
          search: [p.search, group.search].filter(Boolean).join(" "),
          cat: cat.id,
          i: flat.length
        };
        flat.push(item);
        return item;
      });
    });

    cat.groups = groups;
    cat.items = flat;
    return cat;
  }

  var CATALOG = window.KATALOG.map(normalizeProducts);
  var galleries = {};
  CATALOG.forEach(function (cat) { galleries[cat.id] = cat.items; });

  /* ---------------------------------------------------------------
     2) SAYFAYI ÇİZ — menü, bölümler, ürün kartları, özet sayıları
     --------------------------------------------------------------- */
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function loadCatalogImage(img) {
    var source = img.dataset.src;
    if (!source) return;
    delete img.dataset.src;
    img.src = source;
  }

  var catalogImageObserver = "IntersectionObserver" in window
    ? new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          loadCatalogImage(entry.target);
        });
      }, { rootMargin: "500px 0px", threshold: 0.01 })
    : null;

  function buildItemButton(item) {
    var btn = el("button", "gitem");
    btn.type = "button";
    btn.setAttribute("aria-label", item.code + " " + item.name + " ürününü incele");
    btn.dataset.cat = item.cat;
    btn.dataset.code = item.code;
    btn.dataset.i = item.i;
    // Stable ID so external links can deep-link to this product card
    try {
      var fname = (item.src || '').split('/').pop().replace(/\.[^/.]+$/, '');
      var safe = (item.cat || 'cat') + '-' + fname.replace(/[^a-z0-9\-]/gi, '-').toLowerCase();
      btn.id = 'product-' + safe;
    } catch (e) { /* ignore id if something fails */ }

    var img = el("img");
    img.alt = item.code + " " + item.name;
    img.loading = "lazy";
    img.decoding = "async";
    img.setAttribute("fetchpriority", "low");
    img.addEventListener("load", function () { normalizeProductScale(img, item); });
    var isInitialCatalogImage = item.cat === "tshirt" && item.i < 6;
    if (isInitialCatalogImage || !catalogImageObserver) {
      img.src = item.src;
    } else {
      img.dataset.src = item.src;
      catalogImageObserver.observe(img);
    }

    var visual = el("span", "gitem-visual");
    var overlay = el("span", "gitem-overlay");
    var purchase = el("span", "gitem-purchase-info");
    ["Min. Sipariş: 50 Adet", "Baskıya Uygun", "Nakışa Uygun"].forEach(function (text) {
      purchase.appendChild(el("span", "gitem-purchase-badge", text));
    });
    var meta = el("span", "gitem-meta");
    meta.appendChild(el("span", "gitem-code", item.code));
    meta.appendChild(el("span", "gitem-action", "İncele"));
    overlay.appendChild(meta);

    visual.appendChild(img);
    visual.appendChild(overlay);
    btn.appendChild(visual);
    btn.appendChild(purchase);
    btn.addEventListener("click", function () { openLightbox(item.cat, item.i, btn); });
    return btn;
  }

  /*
     Her kaynak görseldeki gerçek ürün sınırını bulur. Ölçek ve konum,
     kartın üst/yan güvenli alanları ile alttaki model kodu ve İncele alanı
     dikkate alınarak ürün bazında hesaplanır. Böylece uzun ve kısa modeller
     aynı ölçeğe zorlanmaz; ürünün hiçbir kenarı kart dışında kalmaz.
  */
  function productBounds(img) {
    var longest = 240;
    var ratio = Math.min(1, longest / Math.max(img.naturalWidth, img.naturalHeight));
    var width = Math.max(1, Math.round(img.naturalWidth * ratio));
    var height = Math.max(1, Math.round(img.naturalHeight * ratio));
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0, width, height);
    var px = ctx.getImageData(0, 0, width, height).data;
    var samples = [];
    var patch = Math.max(6, Math.round(Math.min(width, height) * .07));

    function sampleCorner(x0, y0) {
      for (var y = y0; y < Math.min(height, y0 + patch); y += 2) {
        for (var x = x0; x < Math.min(width, x0 + patch); x += 2) {
          var i = (y * width + x) * 4;
          if (px[i + 3] > 16) samples.push([px[i], px[i + 1], px[i + 2]]);
        }
      }
    }

    sampleCorner(0, 0);
    sampleCorner(Math.max(0, width - patch), 0);
    sampleCorner(0, Math.max(0, height - patch));
    sampleCorner(Math.max(0, width - patch), Math.max(0, height - patch));
    if (!samples.length) return null;

    samples.sort(function (a, b) {
      return (a[0] + a[1] + a[2]) - (b[0] + b[1] + b[2]);
    });
    var bg = samples[Math.floor(samples.length / 2)];
    var rows = new Array(height).fill(0);
    var cols = new Array(width).fill(0);

    for (var yy = 0; yy < height; yy++) {
      for (var xx = 0; xx < width; xx++) {
        var p = (yy * width + xx) * 4;
        var dr = px[p] - bg[0];
        var dg = px[p + 1] - bg[1];
        var db = px[p + 2] - bg[2];
        var different = px[p + 3] < 245 || (dr * dr + dg * dg + db * db) > 625;
        if (different) {
          rows[yy]++;
          cols[xx]++;
        }
      }
    }

    var minimumRow = Math.max(2, Math.ceil(width * .016));
    var minimumCol = Math.max(2, Math.ceil(height * .016));
    var top = rows.findIndex(function (n) { return n >= minimumRow; });
    var left = cols.findIndex(function (n) { return n >= minimumCol; });
    var bottom = height - 1;
    var right = width - 1;
    while (bottom >= 0 && rows[bottom] < minimumRow) bottom--;
    while (right >= 0 && cols[right] < minimumCol) right--;
    if (top < 0 || left < 0 || bottom <= top || right <= left) return null;

    return {
      left: left / width,
      top: top / height,
      right: (right + 1) / width,
      bottom: (bottom + 1) / height
    };
  }

  function applyProductFit(img, item, bounds) {
    if (!bounds) return;
    var elementWidth = img.clientWidth;
    var elementHeight = img.clientHeight;
    if (!elementWidth || !elementHeight) {
      requestAnimationFrame(function () { applyProductFit(img, item, bounds); });
      return;
    }

    /* object-fit:contain ile oluşan gerçek görsel dikdörtgeni */
    var objectScale = Math.min(elementWidth / img.naturalWidth, elementHeight / img.naturalHeight);
    var objectWidth = img.naturalWidth * objectScale;
    var objectHeight = img.naturalHeight * objectScale;
    var objectLeft = (elementWidth - objectWidth) / 2;
    var objectTop = (elementHeight - objectHeight) / 2;

    var left = (objectLeft + bounds.left * objectWidth) / elementWidth;
    var top = (objectTop + bounds.top * objectHeight) / elementHeight;
    var right = (objectLeft + bounds.right * objectWidth) / elementWidth;
    var bottom = (objectTop + bounds.bottom * objectHeight) / elementHeight;
    var contentWidth = Math.max(.01, right - left);
    var contentHeight = Math.max(.01, bottom - top);
    var contentCenterX = (left + right) / 2;
    var contentCenterY = (top + bottom) / 2;

    /* Alt yüzde 18 model kodu / İncele alanına ayrılır. */
    var safe = { left: .075, top: .055, right: .925, bottom: .79 };
    var safeWidth = safe.right - safe.left;
    var safeHeight = safe.bottom - safe.top;
    var scale = Math.min(safeWidth / contentWidth, safeHeight / contentHeight);

    /* Önlüklerde askı ve alt uçlara daha fazla nefes alanı bırak. */
    if (item.cat === "onluk") scale *= .88;
    /* Küçük promosyon ürünlerini dengeli tut; kartı aşırı doldurma. */
    var maximumScale = item.cat === "promosyon" ? 1.3 : 1.65;
    scale = Math.max(.62, Math.min(maximumScale, scale));

    var targetCenterX = (safe.left + safe.right) / 2;
    var targetCenterY = (safe.top + safe.bottom) / 2;
    var translateX = targetCenterX - .5 - scale * (contentCenterX - .5);
    var translateY = targetCenterY - .5 - scale * (contentCenterY - .5);

    item.visualScale = scale;
    img.style.setProperty("--product-scale", scale.toFixed(4));
    img.style.setProperty("--product-x", (translateX * 100).toFixed(3) + "%");
    img.style.setProperty("--product-y", (translateY * 100).toFixed(3) + "%");
  }

  function normalizeProductScale(img, item) {
    var bounds;
    try { bounds = productBounds(img); } catch (e) { return; }
    applyProductFit(img, item, bounds);
  }

  function buildGrid(items, extraClass) {
    var grid = el("div", "gallery-grid" + (extraClass ? " " + extraClass : ""));
    if (!extraClass) grid.style.margin = "20px 0 56px";
    items.forEach(function (item) { grid.appendChild(buildItemButton(item)); });
    return grid;
  }

  var tshirtFilter = "all";

  function matchesTshirtFilter(item, filter) {
    if (!item || item.cat !== "tshirt" || filter === "all") return true;
    var text = (item.name + " " + item.tags.join(" ")).toLocaleLowerCase("tr-TR");
    if (filter === "polo") return text.indexOf("polo yaka") !== -1;
    if (filter === "crew") return text.indexOf("bisiklet yaka") !== -1;
    if (filter === "vneck") return /v[\s‑-]*yaka/.test(text);
    if (filter === "long") return text.indexOf("uzun kol") !== -1;
    return true;
  }

  function buildTshirtFilters(cat) {
    var filters = [
      { id: "all", label: "Tümü" },
      { id: "polo", label: "Polo Yaka" },
      { id: "crew", label: "Bisiklet Yaka" },
      { id: "vneck", label: "V Yaka" },
      { id: "long", label: "Uzun Kollu" }
    ];
    var wrap = el("div", "catalog-subfilters");
    wrap.setAttribute("role", "group");
    wrap.setAttribute("aria-label", "Tişört modelini yaka ve kol tipine göre filtrele");

    filters.forEach(function (filter) {
      var count = cat.items.filter(function (item) { return matchesTshirtFilter(item, filter.id); }).length;
      var button = el("button", "catalog-subfilter", filter.label + " (" + count + ")");
      button.type = "button";
      button.dataset.tshirtFilter = filter.id;
      button.setAttribute("aria-pressed", filter.id === tshirtFilter ? "true" : "false");
      button.classList.toggle("is-active", filter.id === tshirtFilter);
      button.addEventListener("click", function () {
        tshirtFilter = filter.id;
        wrap.querySelectorAll(".catalog-subfilter").forEach(function (control) {
          var active = control.dataset.tshirtFilter === tshirtFilter;
          control.classList.toggle("is-active", active);
          control.setAttribute("aria-pressed", active ? "true" : "false");
        });
        applySearch();
      });
      wrap.appendChild(button);
    });
    return wrap;
  }

  function buildSectionHead(cat) {
    var head = el("div", "catalog-section-head");
    var left = el("div");
    var eyebrow = el("div", "eyebrow eyebrow-accent", cat.eyebrow);
    eyebrow.style.marginBottom = "6px";
    left.appendChild(eyebrow);
    left.appendChild(el("h2", "cat-title", cat.title));
    left.appendChild(el("p", "catalog-section-desc", cat.desc));
    var seoPages = {
      tshirt: "polo-yaka-is-tisortu/", sweat: "kurumsal-is-sweatshirtu/",
      pantolon: "is-pantolonu/", tulum: "is-tulumu/",
      onluk: "asci-kiyafeti-is-onlugu/", montkaban: "is-montu-kaban/",
      polar: "polar-is-montu/", yelek: "reflektorlu-is-yelegi/",
      softshell: "softshell-is-montu/", isg: "is-guvenligi-ekipmanlari/",
      promosyon: "kurumsal-promosyon-urunleri/"
    };
    if (seoPages[cat.id]) {
      var guide = el("a", "catalog-category-guide", "Kategori detaylarını inceleyin →");
      guide.href = seoPages[cat.id];
      left.appendChild(guide);
    }
    var insights = categoryInsights[cat.id];
    if (insights) {
      var info = el("div", "catalog-category-info");
      info.appendChild(el("span", null, "Sektörler: " + insights[0]));
      info.appendChild(el("span", null, "Logo: " + insights[1]));
      info.appendChild(el("span", null, "Üretim: " + insights[2]));
      left.appendChild(info);
    }
    head.appendChild(left);
    head.appendChild(el("div", "catalog-count", cat.items.length + " " + (cat.unit || "model")));
    return head;
  }

  function buildCategoryQuote(cat) {
    var box = el("aside", "catalog-mini-quote");
    var copy = el("div");
    copy.appendChild(el("h3", null, "Bu kategori için teklif alın."));
    copy.appendChild(el("p", null, "Ürün, logo uygulaması, adet ve teslimat bilgilerinizi paylaşın. Size uygun üretim planını birlikte oluşturalım."));
    var actions = el("div", "catalog-mini-quote-actions");
    var wa = el("a", "btn btn-whatsapp", "WhatsApp ile Hızlı Görüşün");
    wa.href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent("Merhaba, " + cat.title + " için hızlı ön görüşme yapmak istiyorum.");
    wa.target = "_blank";
    wa.rel = "noopener";
    var form = el("a", "btn btn-secondary-dark", "Yazılı Teklif İsteyin");
    var intent = cat.title + " için yazılı kurumsal teklif almak istiyorum.";
    form.href = "iletisim?urun=" + encodeURIComponent(cat.title) + "&mesaj=" + encodeURIComponent(intent) + "#teklif-formu";
    actions.appendChild(wa);
    actions.appendChild(form);
    box.appendChild(copy);
    box.appendChild(actions);
    return box;
  }

  function buildSection(cat) {
    var section = el("section", "catalog-section" + (cat.sectionClass ? " " + cat.sectionClass : ""));
    section.id = cat.id;
    section.dataset.category = cat.id;
    section.appendChild(buildSectionHead(cat));

    if (cat.gruplar) {
      /* Alt gruplu kategori (İş Güvenliği): her grup kendi başlığı ve grid'iyle */
      cat.groups.forEach(function (group) {
        var wrap = el("div", "isg-group" + (group.cssClass ? " " + group.cssClass : ""));
        var subhead = el("div", "isg-subhead");
        var info = el("div");
        info.appendChild(el("h3", null, group.title));
        info.appendChild(el("p", null, group.desc));
        subhead.appendChild(info);
        subhead.appendChild(el("span", null, group.items.length + " ürün"));
        wrap.appendChild(subhead);
        wrap.appendChild(buildGrid(group.items, "isg-grid"));
        section.appendChild(wrap);
      });
    } else {
      if (cat.id === "tshirt") section.appendChild(buildTshirtFilters(cat));
      section.appendChild(buildGrid(cat.items));
    }
    section.appendChild(buildCategoryQuote(cat));
    return section;
  }

  function renderCatalog() {
    var nav = document.getElementById("catalogNav");
    var host = document.getElementById("catalogSections");

    CATALOG.forEach(function (cat) {
      var link = el("a", null, cat.nav);
      link.href = "#" + cat.id;
      link.dataset.target = cat.id;
      nav.appendChild(link);
      host.appendChild(buildSection(cat));
    });

    /* Üst özet: toplam model ve kategori sayısı */
    var total = CATALOG.reduce(function (sum, cat) { return sum + cat.items.length; }, 0);
    var sumModels = document.getElementById("sumModels");
    var sumCats = document.getElementById("sumCats");
    if (sumModels) sumModels.textContent = total;
    if (sumCats) sumCats.textContent = CATALOG.length;

    var jsonLd = document.getElementById("productCatalogJsonLd");
    if (jsonLd) {
      var position = 0;
      jsonLd.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "@id": "https://kardeslertekstil.com.tr/urunlerimiz#product-list",
        "name": "Kardeşler Tekstil Ürün Kataloğu",
        "url": "https://kardeslertekstil.com.tr/urunlerimiz",
        "numberOfItems": total,
        "itemListElement": CATALOG.reduce(function (items, cat) {
          cat.items.forEach(function (item) {
            items.push({
              "@type": "ListItem",
              "position": ++position,
              "item": {
                "@type": "Product",
                "name": item.name,
                "sku": item.code,
                "category": cat.title,
                "image": "https://kardeslertekstil.com.tr/" + item.src
              }
            });
          });
          return items;
        }, [])
      });
    }
  }

  renderCatalog();

  /* ---------------------------------------------------------------
     3) LIGHTBOX — ürün inceleme penceresi
     --------------------------------------------------------------- */
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbTitle = document.getElementById("lbTitle");
  var lbCode = document.getElementById("lbCode");
  var lbCategory = document.getElementById("lbCategory");
  var lbCounter = document.getElementById("lbCounter");
  var lbWhatsapp = document.getElementById("lbWhatsapp");
  var lbQuote = document.getElementById("lbQuote");
  var lbAddToQuote = document.getElementById("lbAddToQuote");
  var lbFormDetail = document.getElementById("lbFormDetail");
  var lbTags = document.getElementById("lbTags");
  var lbCopy = document.getElementById("lbCopy");
  var lbNoteTitle = document.getElementById("lbNoteTitle");
  var lbNoteText = document.getElementById("lbNoteText");
  var lbFeatures = document.getElementById("lbFeatures");
  var lastTrigger = null;
  var state = { cat: null, i: 0 };
  var formCategoryByCatalogId = {
    tshirt: "Tişört",
    sweat: "Sweatshirt ve Hoodie",
    pantolon: "İş Pantolonu",
    tulum: "İş Tulumu",
    onluk: "İş Önlüğü",
    montkaban: "Mont ve Kaban",
    polar: "Polar ve Polar Mont",
    yelek: "İş Yeleği",
    softshell: "Softshell",
    reflektor: "Reflektör Çeşitleri",
    isg: "İş Güvenliği Ekipmanları",
    promosyon: "Promosyon Ürünleri"
  };

  function catById(id) {
    for (var k = 0; k < CATALOG.length; k++) if (CATALOG[k].id === id) return CATALOG[k];
    return null;
  }

  function renderLightbox() {
    var list = galleries[state.cat];
    if (!list || !list.length) return;
    var item = list[state.i];
    var cat = catById(state.cat);

    lbImg.src = item.src;
    lbImg.alt = item.code + " " + item.name;
    if (window.ktSetLanguageAwareText) window.ktSetLanguageAwareText(lbTitle, item.name);
    else lbTitle.textContent = item.name;
    lbCode.textContent = item.code;
    lbCategory.textContent = cat ? (cat.gruplar ? cat.title : cat.nav) : "Ürün";
    lbCounter.textContent = (state.i + 1) + " / " + list.length;

    lbTags.innerHTML = "";
    item.tags.forEach(function (tag) { lbTags.appendChild(el("span", null, tag)); });

    var set = featureSets[item.kind] || featureSets.default;
    lbNoteTitle.textContent = set.title;
    lbNoteText.textContent = set.text;
    lbFeatures.innerHTML = "";
    set.features.forEach(function (f) { lbFeatures.appendChild(el("li", null, f)); });

    var message = "Merhaba, " + item.code + " kodlu ürün için fiyat istiyorum.";
    lbWhatsapp.href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(message);

    var formCategory = formCategoryByCatalogId[state.cat] || "Özel Tasarım";
    var formLink = "iletisim?urun=" + encodeURIComponent(formCategory) + "&mesaj=" + encodeURIComponent(message) + "#teklif-formu";
    if (lbQuote) {
      lbQuote.href = "mailto:kardesler@kardeslertekstil.com.tr?subject=" + encodeURIComponent(item.code + " Kodlu Ürün İçin Fiyat Talebi") + "&body=" + encodeURIComponent(message);
    }
    if (lbFormDetail) lbFormDetail.href = formLink;
    if (lbAddToQuote) {
      lbAddToQuote.dataset.code = item.code;
      lbAddToQuote.dataset.name = item.name;
      lbAddToQuote.textContent = "Teklif Listesine Ekle";
    }
  }

  function openLightbox(cat, i, trigger) {
    state.cat = cat;
    state.i = i;
    lastTrigger = trigger || null;
    renderLightbox();
    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    document.getElementById("lbClose").focus();
  }

  function closeLightbox() {
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastTrigger) lastTrigger.focus();
  }

  function step(dir) {
    var list = galleries[state.cat];
    if (!list) return;
    state.i = (state.i + dir + list.length) % list.length;
    renderLightbox();
  }

  document.getElementById("lbClose").addEventListener("click", closeLightbox);
  document.getElementById("lbPrev").addEventListener("click", function () { step(-1); });
  document.getElementById("lbNext").addEventListener("click", function () { step(1); });
  if (lbAddToQuote) {
    lbAddToQuote.addEventListener("click", function () {
      var list = galleries[state.cat];
      var item = list && list[state.i];
      if (!item) return;
      document.dispatchEvent(new CustomEvent("quote-list:add", {
        detail: { code: item.code, name: item.name, category: (catById(state.cat) || {}).title || "Ürün" }
      }));
      lbAddToQuote.textContent = "Listeye Eklendi ✓";
    });
  }
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });

  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
  });

  /* Mobilde sağa/sola kaydırarak gezinme */
  var touchStartX = 0;
  lb.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    var dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  }, { passive: true });

  lbCopy.addEventListener("click", function () {
    var code = lbCode.textContent.trim();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(function () {
        lbCopy.textContent = "Kopyalandı";
        setTimeout(function () { lbCopy.textContent = "Kodu Kopyala"; }, 1400);
      });
    }
  });

  /* ---------------------------------------------------------------
     4) YAPIŞKAN MENÜ — görünen bölüme göre aktif sekme
     --------------------------------------------------------------- */
  var nav = document.getElementById("catalogNav");
  var navLinks = Array.from(document.querySelectorAll(".catalog-nav a"));
  var sections = Array.from(document.querySelectorAll(".catalog-section"));

  function keepActiveNavLinkInView(link) {
    if (!nav || !link) return;
    if (nav.scrollWidth <= nav.clientWidth + 1) return;

    var navRect = nav.getBoundingClientRect();
    var linkRect = link.getBoundingClientRect();
    var edgePadding = 16;
    var nextLeft = nav.scrollLeft;

    if (linkRect.left < navRect.left + edgePadding) {
      nextLeft += linkRect.left - navRect.left - edgePadding;
    } else if (linkRect.right > navRect.right - edgePadding) {
      nextLeft += linkRect.right - navRect.right + edgePadding;
    }

    if (nextLeft !== nav.scrollLeft) {
      nav.scrollTo({ left: Math.max(0, nextLeft), behavior: "smooth" });
    }
  }

  function setActive(id) {
    navLinks.forEach(function (link) {
      var active = link.dataset.target === id;
      link.classList.toggle("is-active", active);
      if (active) {
        keepActiveNavLinkInView(link);
      }
    });
  }

  function updateCatalogScrollOffset() {
    var header = document.querySelector(".site-header");
    var toolbar = document.querySelector(".catalog-toolbar");
    var headerHeight = header ? header.getBoundingClientRect().height : 0;
    var toolbarHeight = toolbar ? toolbar.getBoundingClientRect().height : 0;
    document.documentElement.style.setProperty(
      "--catalog-scroll-offset",
      Math.ceil(headerHeight + toolbarHeight + 12) + "px"
    );
  }

  function resetCatalogScrollContainers(section) {
    var host = document.getElementById("catalogSections");
    if (host && host.scrollHeight > host.clientHeight) host.scrollTop = 0;

    section.querySelectorAll(".gallery-grid, .isg-group").forEach(function (container) {
      container.scrollTop = 0;
      container.scrollLeft = 0;
    });
  }

  function scrollCategoryToStart(id) {
    var section = document.getElementById(id);
    if (!section || !section.classList.contains("catalog-section")) return false;

    updateCatalogScrollOffset();
    resetCatalogScrollContainers(section);
    setActive(id);

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        section.scrollIntoView({ behavior: "auto", block: "start" });
        setActive(id);
      });
    });
    return true;
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      var id = link.dataset.target;
      event.preventDefault();

      if (search && search.value) {
        search.value = "";
        applySearch();
      }

      if (location.hash !== "#" + id) {
        history.pushState(null, "", "#" + id);
      }
      scrollCategoryToStart(id);
    });
  });

  window.addEventListener("resize", updateCatalogScrollOffset);
  updateCatalogScrollOffset();

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      var visible = entries
        .filter(function (entry) { return entry.isIntersecting; })
        .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; });
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: "-28% 0px -62% 0px", threshold: [0, .1, .25, .5] });
    sections.forEach(function (section) { observer.observe(section); });
  }

  /* ---------------------------------------------------------------
     5) ARAMA — kod, isim, etiket ve kategori kelimeleriyle filtreler
     --------------------------------------------------------------- */
  var search = document.getElementById("catalogSearch");
  var clearBtn = document.getElementById("catalogSearchClear");

  function applySearch() {
    var q = search.value.trim().toLowerCase();

    document.querySelectorAll(".gitem").forEach(function (btn) {
      var item = galleries[btn.dataset.cat][parseInt(btn.dataset.i, 10)];
      var cat = catById(btn.dataset.cat);
      var haystack = (
        item.code + " " + item.name + " " + item.cat + " " +
        (cat && cat.keywords || "") + " " +
        item.tags.join(" ") + " " + item.search
      ).toLowerCase();
      var matchesSearch = !q || haystack.indexOf(q) !== -1;
      var matchesSubtype = btn.dataset.cat !== "tshirt" || matchesTshirtFilter(item, tshirtFilter);
      btn.hidden = !(matchesSearch && matchesSubtype);
    });

    document.querySelectorAll(".isg-group").forEach(function (group) {
      var hasVisible = Array.from(group.querySelectorAll(".gitem")).some(function (btn) { return !btn.hidden; });
      group.classList.toggle("is-filtered-out", !hasVisible);
    });

    document.querySelectorAll(".catalog-section").forEach(function (section) {
      var hasVisible = Array.from(section.querySelectorAll(".gitem")).some(function (btn) { return !btn.hidden; });
      section.classList.toggle("is-filtered-out", !hasVisible);
      var count = section.querySelector(".catalog-count");
      if (count) {
        var visibleCount = Array.from(section.querySelectorAll(".gitem")).filter(function (btn) { return !btn.hidden; }).length;
        var cat = catById(section.dataset.category);
        count.textContent = visibleCount + " " + (cat && cat.unit || "model");
      }
    });

    clearBtn.classList.toggle("is-visible", !!q);
  }

  search.addEventListener("input", applySearch);
  clearBtn.addEventListener("click", function () {
    search.value = "";
    applySearch();
    search.focus();
  });

  /* Sayfa #kategori linkiyle açıldıysa o sekmeyi aktif et */
  function scrollFromHash() {
    if (!location.hash) return;
    try {
      var id = location.hash.substring(1);
      if (!id) return;
      var elTarget = document.getElementById(id);
      if (elTarget && elTarget.classList.contains("catalog-section")) {
        scrollCategoryToStart(id);
      } else if (elTarget && id.indexOf("product-") === 0) {
        setTimeout(function () {
          elTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
          elTarget.focus && elTarget.focus();
        }, 80);
      }
    } catch (e) { /* ignore */ }
  }

  if (location.hash) {
    scrollFromHash();
  } else {
    setActive("tshirt");
  }
  window.addEventListener("hashchange", scrollFromHash);
  window.addEventListener("popstate", scrollFromHash);
})();
