(function () {
  "use strict";

  /* Kimlikler tek noktadan tanımlanır: "G-..." veya "GTM-...". */
  var GA4_MEASUREMENT_ID = "G-6LMDSV9GBZ";
  var GTM_CONTAINER_ID = "";
  var directGa4Active = false;
  window.dataLayer = window.dataLayer || [];

  function track(eventName, details) {
    window.dataLayer.push(Object.assign({ event: eventName }, details || {}));
    if (directGa4Active && window.gtag) window.gtag("event", eventName, details || {});
  }

  function initAnalytics() {
    var gaMeta = document.querySelector('meta[name="google-analytics-id"]');
    var gtmMeta = document.querySelector('meta[name="google-tag-manager-id"]');
    var measurementId = gaMeta && gaMeta.content ? gaMeta.content.trim() : GA4_MEASUREMENT_ID;
    var containerId = gtmMeta && gtmMeta.content ? gtmMeta.content.trim() : GTM_CONTAINER_ID;

    if (/^GTM-[A-Z0-9]+$/i.test(containerId)) {
      window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
      var gtmScript = document.createElement("script");
      gtmScript.async = true;
      gtmScript.src = "https://www.googletagmanager.com/gtm.js?id=" + encodeURIComponent(containerId);
      document.head.appendChild(gtmScript);
      return;
    }
    if (!/^G-[A-Z0-9]+$/i.test(measurementId)) return;

    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId);
    document.head.appendChild(script);
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", measurementId);
    directGa4Active = true;
  }

  function initMobileNavigation() {
    var header = document.querySelector(".site-header");
    var headerInner = header && header.querySelector(".container");
    var desktopNav = header && header.querySelector(".nav");
    if (!header || !headerInner || !desktopNav || header.querySelector(".mobile-nav-toggle")) return;

    var panelId = "mobile-navigation";
    var toggle = document.createElement("button");
    toggle.className = "mobile-nav-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-label", "Menüyü aç");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", panelId);
    toggle.innerHTML = '<span></span><span></span><span></span>';

    var panel = document.createElement("div");
    panel.className = "mobile-nav-panel";
    panel.id = panelId;
    panel.hidden = true;
    var mobileNav = desktopNav.cloneNode(true);
    mobileNav.className = "mobile-nav";
    mobileNav.setAttribute("aria-label", "Mobil navigasyon");
    panel.appendChild(mobileNav);

    var headerCta = headerInner.querySelector(":scope > .btn");
    headerInner.insertBefore(toggle, headerCta || null);
    header.appendChild(panel);

    function closeMenu(returnFocus) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Menüyü aç");
      panel.classList.remove("is-open");
      panel.hidden = true;
      document.body.classList.remove("mobile-nav-open");
      if (returnFocus) toggle.focus();
    }

    toggle.addEventListener("click", function () {
      var opening = toggle.getAttribute("aria-expanded") !== "true";
      if (!opening) return closeMenu(false);
      panel.hidden = false;
      panel.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Menüyü kapat");
      document.body.classList.add("mobile-nav-open");
      var firstLink = panel.querySelector("a");
      if (firstLink) firstLink.focus();
      track("mobile_menu_open");
    });

    panel.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !panel.hidden) closeMenu(true);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 960 && !panel.hidden) closeMenu(false);
    });
  }

  function initConversionTracking() {
    function copyEmailAddress(toast) {
      var address = "kardesler@kardeslertekstil.com.tr";
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(address).catch(function () { /* Mailto remains available. */ });
      } else {
        var helper = document.createElement("textarea");
        helper.value = address;
        helper.setAttribute("readonly", "");
        helper.style.position = "fixed";
        helper.style.opacity = "0";
        document.body.appendChild(helper);
        helper.select();
        try { document.execCommand("copy"); } catch (error) { /* Selection remains available. */ }
        helper.remove();
      }
      toast = toast || document.querySelector(".email-copy-toast");
      if (!toast) {
        toast = document.createElement("div");
        toast.className = "email-copy-toast";
        toast.setAttribute("role", "status");
        document.body.appendChild(toast);
      }
      toast.textContent = "E-posta adresi kopyalandı: " + address;
      toast.classList.add("is-visible");
      window.clearTimeout(toast._hideTimer);
      toast._hideTimer = window.setTimeout(function () { toast.classList.remove("is-visible"); }, 3600);
    }

    function openEmailChooser(mailtoHref) {
      var address = "kardesler@kardeslertekstil.com.tr";
      var subjectMatch = mailtoHref.match(/[?&]subject=([^&]+)/i);
      var subject = subjectMatch ? decodeURIComponent(subjectMatch[1].replace(/\+/g, " ")) : "Kurumsal Teklif Talebi";
      var gmailUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(address) + "&su=" + encodeURIComponent(subject);
      var outlookUrl = "https://outlook.office.com/mail/deeplink/compose?to=" + encodeURIComponent(address) + "&subject=" + encodeURIComponent(subject);
      var overlay = document.querySelector(".email-channel-overlay");

      if (!overlay) {
        overlay = document.createElement("div");
        overlay.className = "email-channel-overlay";
        overlay.innerHTML = '<div class="email-channel-dialog" role="dialog" aria-modal="true" aria-labelledby="email-channel-title">' +
          '<button class="email-channel-close" type="button" aria-label="E-posta seçeneklerini kapat">×</button>' +
          '<span class="quote-path-kicker">E-POSTA KANALI</span>' +
          '<h2 id="email-channel-title">E-posta Yöntemini Seçin</h2>' +
          '<p>Teklif talebiniz için size uygun e-posta uygulamasını açın.</p>' +
          '<div class="email-channel-actions">' +
            '<a class="btn btn-primary" data-email-native>Mail Uygulamasını Aç</a>' +
            '<a class="btn btn-secondary" data-email-gmail target="_blank" rel="noopener">Gmail ile Gönder</a>' +
            '<a class="btn btn-secondary" data-email-outlook target="_blank" rel="noopener">Outlook ile Gönder</a>' +
            '<button class="btn btn-secondary" data-email-copy type="button">Adresi Kopyala</button>' +
          '</div>' +
          '<small>' + address + '</small>' +
        '</div>';
        document.body.appendChild(overlay);
        overlay.addEventListener("click", function (event) {
          if (event.target === overlay || event.target.closest(".email-channel-close")) closeEmailChooser();
        });
        overlay.querySelector("[data-email-copy]").addEventListener("click", function () {
          copyEmailAddress();
          track("email_channel_selected", { channel: "copy", page_path: window.location.pathname });
        });
        document.addEventListener("keydown", function (event) {
          if (event.key === "Escape" && overlay.classList.contains("is-visible")) closeEmailChooser();
        });
      }

      overlay.querySelector("[data-email-native]").href = mailtoHref;
      overlay.querySelector("[data-email-gmail]").href = gmailUrl;
      overlay.querySelector("[data-email-outlook]").href = outlookUrl;
      overlay.querySelector("[data-email-native]").onclick = function () { track("email_channel_selected", { channel: "native", page_path: window.location.pathname }); };
      overlay.querySelector("[data-email-gmail]").onclick = function () { track("email_channel_selected", { channel: "gmail", page_path: window.location.pathname }); };
      overlay.querySelector("[data-email-outlook]").onclick = function () { track("email_channel_selected", { channel: "outlook", page_path: window.location.pathname }); };
      overlay.classList.add("is-visible");
      document.body.classList.add("email-channel-open");
      overlay.querySelector(".email-channel-close").focus();
    }

    function closeEmailChooser() {
      var overlay = document.querySelector(".email-channel-overlay");
      if (overlay) overlay.classList.remove("is-visible");
      document.body.classList.remove("email-channel-open");
    }

    document.addEventListener("click", function (event) {
      var link = event.target.closest("a[href]");
      if (!link) return;
      if (link.hasAttribute("data-email-native")) return;
      var href = link.getAttribute("href") || "";
      var label = (link.textContent || "").trim().replace(/\s+/g, " ").slice(0, 100);
      var data = { link_url: link.href, link_text: label, page_path: window.location.pathname };

      if (/wa\.me|whatsapp/i.test(href)) track("whatsapp_click", data);
      else if (/^mailto:/i.test(href)) {
        event.preventDefault();
        track("email_click", data);
        openEmailChooser(href);
      }
      else if (/^tel:/i.test(href)) track("phone_click", data);
      else if (/iletisim(?:\.html)?|#teklif-formu/i.test(href)) track("quote_cta_click", data);
    });

    var form = document.querySelector("#teklif-formu");
    if (form) {
      var started = false;
      form.addEventListener("focusin", function () {
        if (started) return;
        started = true;
        track("quote_form_start", { form_id: "teklif-formu" });
      });
      form.addEventListener("submit", function () {
        track("quote_form_submit", { form_id: "teklif-formu" });
      });
    }

    if (document.body.dataset.conversion === "quote-success") {
      track("quote_form_success", { form_id: "teklif-formu" });
      track("generate_lead", { currency: "TRY", value: 1, lead_source: "quote_form" });
    }
  }

  function initQuoteList() {
    var storageKey = "kt_quote_list_v1";
    var items = [];
    try { items = JSON.parse(localStorage.getItem(storageKey) || "[]"); } catch (error) { items = []; }
    if (!Array.isArray(items)) items = [];

    function save() {
      try { localStorage.setItem(storageKey, JSON.stringify(items)); } catch (error) { /* Storage may be unavailable. */ }
    }

    function quoteMessage() {
      return "Teklif listemdeki ürünler:\n" + items.map(function (item, index) {
        return (index + 1) + ". " + item.code + " — " + item.name;
      }).join("\n") + "\n\nBu ürünler için adet, kumaş, renk ve logo seçenekleriyle yazılı teklif rica ederim.";
    }

    var form = document.querySelector("#teklif-formu");
    if (form && items.length) {
      var hidden = document.createElement("input");
      hidden.type = "hidden";
      hidden.name = "teklif_listesi";
      hidden.value = items.map(function (item) { return item.code + " — " + item.name; }).join(" | ");
      form.appendChild(hidden);
    }

    if (document.body.dataset.conversion === "quote-success") {
      try { localStorage.removeItem(storageKey); } catch (error) { /* Storage may be unavailable. */ }
      return;
    }

    var onProductsPage = document.body.classList.contains("products-page");
    if (!onProductsPage && !items.length) return;

    var dock = document.createElement("div");
    dock.className = "quote-list-dock";
    dock.innerHTML = '<button class="quote-list-toggle" type="button" aria-expanded="false" aria-controls="quote-list-panel">Teklif Listesi <span class="quote-list-count">0</span></button>' +
      '<section class="quote-list-panel" id="quote-list-panel" hidden aria-label="Teklif listesi"><h2>Teklif Listeniz</h2><p>Birden fazla modeli tek yazılı teklif talebinde gönderin.</p><div class="quote-list-content"></div></section>';
    document.body.appendChild(dock);
    var toggle = dock.querySelector(".quote-list-toggle");
    var panel = dock.querySelector(".quote-list-panel");
    var content = dock.querySelector(".quote-list-content");
    var count = dock.querySelector(".quote-list-count");

    function render() {
      count.textContent = String(items.length);
      content.replaceChildren();
      if (!items.length) {
        var empty = document.createElement("p");
        empty.className = "quote-list-empty";
        empty.textContent = "Henüz ürün eklemediniz. Ürün detayından listenize model ekleyebilirsiniz.";
        content.appendChild(empty);
        return;
      }

      var list = document.createElement("ul");
      list.className = "quote-list-items";
      items.forEach(function (item, index) {
        var row = document.createElement("li");
        row.className = "quote-list-item";
        var copy = document.createElement("div");
        var title = document.createElement("strong");
        title.textContent = item.name;
        var code = document.createElement("span");
        code.textContent = item.code;
        copy.append(title, code);
        var remove = document.createElement("button");
        remove.className = "quote-list-remove";
        remove.type = "button";
        remove.dataset.index = String(index);
        remove.setAttribute("aria-label", item.name + " ürününü listeden çıkar");
        remove.textContent = "Kaldır";
        row.append(copy, remove);
        list.appendChild(row);
      });
      var actions = document.createElement("div");
      actions.className = "quote-list-actions";
      var submit = document.createElement("a");
      submit.className = "btn btn-primary";
      submit.href = "/iletisim?urun=" + encodeURIComponent("Özel Tasarım") + "&mesaj=" + encodeURIComponent(quoteMessage()) + "#teklif-formu";
      submit.textContent = "Liste İçin Yazılı Teklif İsteyin";
      submit.addEventListener("click", function () {
        track("quote_list_submit", { item_count: items.length, product_codes: items.map(function (item) { return item.code; }).join(",") });
      });
      actions.appendChild(submit);
      content.append(list, actions);
    }

    toggle.addEventListener("click", function () {
      var opening = panel.hidden;
      panel.hidden = !opening;
      toggle.setAttribute("aria-expanded", String(opening));
      if (opening) track("quote_list_open", { item_count: items.length });
    });
    content.addEventListener("click", function (event) {
      var remove = event.target.closest(".quote-list-remove");
      if (!remove) return;
      var removed = items.splice(Number(remove.dataset.index), 1)[0];
      save();
      render();
      track("quote_list_remove", { product_code: removed && removed.code, item_count: items.length });
    });
    document.addEventListener("quote-list:add", function (event) {
      var item = event.detail || {};
      if (!item.code || items.some(function (existing) { return existing.code === item.code; })) {
        panel.hidden = false;
        toggle.setAttribute("aria-expanded", "true");
        return;
      }
      items.push({ code: item.code, name: item.name || item.code, category: item.category || "Ürün" });
      save();
      render();
      panel.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
      track("quote_list_add", { product_code: item.code, item_count: items.length });
    });
    render();
  }

  function initTargetDate() {
    var field = document.querySelector("#hedef-tarih");
    if (!field) return;
    var today = new Date();
    var localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    field.min = localDate;
  }

  document.addEventListener("DOMContentLoaded", function () {
    initAnalytics();
    initMobileNavigation();
    initConversionTracking();
    initQuoteList();
    initTargetDate();
  });
})();
