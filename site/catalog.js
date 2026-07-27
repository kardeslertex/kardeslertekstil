/* =====================================================================
   KATALOG MOTORU — urunlerimiz.html
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
    }
  };

  /* ---------------------------------------------------------------
     1) VERİYİ NORMALLEŞTİR
     products.js'teki kısa yazımı ("01.jpg" gibi) tam ürün objesine çevir.
     --------------------------------------------------------------- */
  function pad3(n) { return ("00" + n).slice(-3); }

  function normalizeProducts(cat) {
    var flat = [];
    var groups = cat.gruplar
      ? cat.gruplar
      : [{ prefix: cat.prefix, baseName: cat.baseName, tags: cat.tags, kind: "", search: "", urunler: cat.urunler }];

    groups.forEach(function (group) {
      group.items = group.urunler.map(function (raw, idx) {
        var p = typeof raw === "string" ? { img: raw } : raw;
        var code = p.code || group.prefix + "-" + pad3(idx + 1);
        var item = {
          src: GALLERY_PATH + cat.id + "/" + p.img,
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

  function buildItemButton(item) {
    var btn = el("button", "gitem");
    btn.type = "button";
    btn.setAttribute("aria-label", item.code + " " + item.name + " ürününü incele");
    btn.dataset.cat = item.cat;
    btn.dataset.code = item.code;
    btn.dataset.i = item.i;

    var img = el("img");
    img.src = item.src;
    img.alt = item.code + " " + item.name;
    img.loading = "lazy";
    img.decoding = "async";
    img.setAttribute("fetchpriority", "low");

    var overlay = el("span", "gitem-overlay");
    var meta = el("span", "gitem-meta");
    meta.appendChild(el("span", "gitem-code", item.code));
    meta.appendChild(el("span", "gitem-action", "İncele"));
    overlay.appendChild(meta);

    btn.appendChild(img);
    btn.appendChild(overlay);
    btn.addEventListener("click", function () { openLightbox(item.cat, item.i, btn); });
    return btn;
  }

  function buildGrid(items, extraClass) {
    var grid = el("div", "gallery-grid" + (extraClass ? " " + extraClass : ""));
    if (!extraClass) grid.style.margin = "20px 0 56px";
    items.forEach(function (item) { grid.appendChild(buildItemButton(item)); });
    return grid;
  }

  function buildSectionHead(cat) {
    var head = el("div", "catalog-section-head");
    var left = el("div");
    var eyebrow = el("div", "eyebrow eyebrow-accent", cat.eyebrow);
    eyebrow.style.marginBottom = "6px";
    left.appendChild(eyebrow);
    left.appendChild(el("h2", "cat-title", cat.title));
    left.appendChild(el("p", "catalog-section-desc", cat.desc));
    head.appendChild(left);
    head.appendChild(el("div", "catalog-count", cat.items.length + " " + (cat.unit || "model")));
    return head;
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
      section.appendChild(buildGrid(cat.items));
    }
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
  var lbTags = document.getElementById("lbTags");
  var lbCopy = document.getElementById("lbCopy");
  var lbNoteTitle = document.getElementById("lbNoteTitle");
  var lbNoteText = document.getElementById("lbNoteText");
  var lbFeatures = document.getElementById("lbFeatures");
  var lastTrigger = null;
  var state = { cat: null, i: 0 };

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
    lbTitle.textContent = item.name;
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

    var message = state.cat === "isg"
      ? "Merhaba, " + item.code + " kodlu " + item.name + " için fiyat, beden/model ve stok bilgisi almak istiyorum."
      : "Merhaba, " + item.code + " kodlu " + item.name + " için fiyat, kumaş, renk ve üretim bilgisi almak istiyorum.";
    lbWhatsapp.href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(message);
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
  var navLinks = Array.from(document.querySelectorAll(".catalog-nav a"));
  var sections = Array.from(document.querySelectorAll(".catalog-section"));

  function setActive(id) {
    navLinks.forEach(function (link) {
      var active = link.dataset.target === id;
      link.classList.toggle("is-active", active);
      if (active) {
        link.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () { setActive(link.dataset.target); });
  });

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
      btn.hidden = !(!q || haystack.indexOf(q) !== -1);
    });

    document.querySelectorAll(".isg-group").forEach(function (group) {
      var hasVisible = Array.from(group.querySelectorAll(".gitem")).some(function (btn) { return !btn.hidden; });
      group.classList.toggle("is-filtered-out", !hasVisible);
    });

    document.querySelectorAll(".catalog-section").forEach(function (section) {
      var hasVisible = Array.from(section.querySelectorAll(".gitem")).some(function (btn) { return !btn.hidden; });
      section.classList.toggle("is-filtered-out", !hasVisible);
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
  if (location.hash && document.querySelector(location.hash)) {
    setActive(location.hash.substring(1));
  } else {
    setActive("tshirt");
  }
})();
