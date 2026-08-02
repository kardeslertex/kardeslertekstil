(function () {
  "use strict";

  /* Kimlikler tek noktadan tanımlanır: "G-..." veya "GTM-...". */
  var GA4_MEASUREMENT_ID = "G-6LMDSV9GBZ";
  var GTM_CONTAINER_ID = "";
  var directGa4Active = false;
  window.dataLayer = window.dataLayer || [];

  function track(eventName, details) {
    if (!window.__ktAnalyticsAllowed) return;
    if (directGa4Active && window.gtag) window.gtag("event", eventName, details || {});
    else if (window.__ktGtmActive) window.dataLayer.push(Object.assign({ event: eventName }, details || {}));
  }

  function initAnalytics() {
    var gaMeta = document.querySelector('meta[name="google-analytics-id"]');
    var gtmMeta = document.querySelector('meta[name="google-tag-manager-id"]');
    var measurementId = gaMeta && gaMeta.content ? gaMeta.content.trim() : GA4_MEASUREMENT_ID;
    var containerId = gtmMeta && gtmMeta.content ? gtmMeta.content.trim() : GTM_CONTAINER_ID;

    if (/^GTM-[A-Z0-9]+$/i.test(containerId)) {
      window.__ktGtmActive = true;
      window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
      var gtmScript = document.createElement("script");
      gtmScript.async = true;
      gtmScript.src = "https://www.googletagmanager.com/gtm.js?id=" + encodeURIComponent(containerId);
      document.head.appendChild(gtmScript);
      return;
    }
    if (!/^G-[A-Z0-9]+$/i.test(measurementId)) return;
    window.__ktAnalyticsAllowed = true;

    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId);
    document.head.appendChild(script);
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", measurementId);
    directGa4Active = true;
  }

  function initPrivacyControls() {
    var storageKey = "kt_cookie_consent_v1";
    var analyticsStarted = false;
    if (!document.querySelector('link[href^="/privacy.css"]')) {
      var privacyStyles = document.createElement("link");
      privacyStyles.rel = "stylesheet";
      privacyStyles.href = "/privacy.css?v=20260802-1";
      document.head.appendChild(privacyStyles);
    }

    function startAnalyticsOnce() {
      if (analyticsStarted) return;
      analyticsStarted = true;
      window.__ktAnalyticsAllowed = true;
      initAnalytics();
    }

    function readConsent() {
      try { return localStorage.getItem(storageKey); } catch (error) { return null; }
    }

    function saveConsent(value) {
      var mustReload = analyticsStarted && value === "rejected";
      try { localStorage.setItem(storageKey, value); } catch (error) { /* Storage may be unavailable. */ }
      if (value === "accepted") startAnalyticsOnce();
      var banner = document.querySelector(".cookie-consent");
      if (banner) banner.remove();
      if (mustReload) window.location.reload();
    }

    function showPreferences() {
      var existing = document.querySelector(".cookie-consent");
      if (existing) {
        existing.querySelector("button")?.focus();
        return;
      }

      var banner = document.createElement("section");
      banner.className = "cookie-consent";
      banner.setAttribute("role", "dialog");
      banner.setAttribute("aria-modal", "true");
      banner.setAttribute("aria-labelledby", "cookie-consent-title");
      banner.innerHTML =
        '<div class="cookie-consent__inner">' +
          '<div><strong id="cookie-consent-title">&Ccedil;erez tercihleri</strong>' +
          '<p>Siteyi &ccedil;alıştırmak i&ccedil;in zorunlu depolama kullanılır. Ziyaretleri anlamamıza yardımcı olan Google Analytics ise yalnızca izninizle y&uuml;klenir. <a href="/cerez-politikasi">Ayrıntılar</a></p></div>' +
          '<div class="cookie-consent__actions">' +
            '<button type="button" class="btn btn-secondary" data-cookie-choice="rejected">Yalnızca zorunlu</button>' +
            '<button type="button" class="btn btn-primary" data-cookie-choice="accepted">Analitiğe izin ver</button>' +
          '</div>' +
        '</div>';
      banner.addEventListener("click", function (event) {
        var choice = event.target.closest("[data-cookie-choice]");
        if (choice) saveConsent(choice.dataset.cookieChoice);
      });
      document.body.appendChild(banner);
      banner.querySelector("button")?.focus();
    }

    window.ktOpenCookiePreferences = showPreferences;
    document.querySelectorAll(".site-footer").forEach(function (footer) {
      if (footer.querySelector("[data-cookie-preferences]")) return;
      var link = document.createElement("button");
      link.type = "button";
      link.className = "footer-privacy-link";
      link.dataset.cookiePreferences = "";
      link.textContent = "Çerez tercihleri";
      link.addEventListener("click", showPreferences);
      footer.querySelector(".container")?.appendChild(link);
    });

    var consent = readConsent();
    if (consent === "accepted") startAnalyticsOnce();
    else if (consent !== "rejected") showPreferences();
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
        track("quote_form_attempt", { form_id: "teklif-formu" });
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
        dock.hidden = true;
        panel.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
        var empty = document.createElement("p");
        empty.className = "quote-list-empty";
        empty.textContent = "Henüz ürün eklemediniz. Ürün detayından listenize model ekleyebilirsiniz.";
        content.appendChild(empty);
        return;
      }
      dock.hidden = false;

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

  function initHomeIntro() {
    var intro = document.querySelector("[data-home-intro]");
    if (!intro) return;

    var storageKey = "kt_home_intro_seen_v1";
    var video = intro.querySelector("video");
    var links = Array.prototype.slice.call(intro.querySelectorAll("[data-intro-target]"));
    var fallbackTimer = null;
    var leaving = false;
    var hasSeenIntro = false;

    try {
      hasSeenIntro = window.sessionStorage.getItem(storageKey) === "1";
    } catch (error) {
      hasSeenIntro = false;
    }

    if (hasSeenIntro && !window.__ktForceHomeIntro) {
      document.documentElement.classList.remove("intro-splash-pending");
      intro.hidden = true;
      return;
    }

    function rememberIntro() {
      try {
        window.sessionStorage.setItem(storageKey, "1");
      } catch (error) {
        // Depolama kapalı olsa da açılış deneyimi çalışmaya devam eder.
      }
    }

    function clearFallback() {
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
      fallbackTimer = null;
    }

    function startFallback() {
      clearFallback();
      fallbackTimer = window.setTimeout(function () {
        leaveIntro("/");
      }, 14000);
    }

    function finish(destination) {
      document.documentElement.classList.remove("intro-splash-pending");
      document.body.classList.remove("intro-splash-active");
      intro.classList.remove("is-active", "is-leaving");
      intro.setAttribute("aria-hidden", "true");
      intro.hidden = true;
      if (video) video.pause();

      if (destination && destination !== "/") {
        window.location.assign(destination);
      }
    }

    function leaveIntro(destination) {
      if (leaving) return;
      leaving = true;
      rememberIntro();
      clearFallback();
      intro.classList.add("is-leaving");
      window.setTimeout(function () {
        finish(destination || "/");
      }, 360);
    }

    intro.hidden = false;
    intro.setAttribute("aria-hidden", "false");
    intro.classList.add("is-active");
    document.body.classList.add("intro-splash-active");

    links.forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        leaveIntro(link.getAttribute("href") || "/");
      });
    });

    if (!video) {
      startFallback();
      return;
    }

    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var saveData = navigator.connection && navigator.connection.saveData;
    if (reducedMotion || saveData) {
      startFallback();
      window.setTimeout(function () { leaveIntro("/"); }, 1200);
      return;
    }

    video.querySelectorAll("source[data-src]").forEach(function (source) {
      source.src = source.dataset.src;
      source.removeAttribute("data-src");
    });
    video.load();

    video.addEventListener("ended", function () {
      leaveIntro("/");
    }, { once: true });
    video.addEventListener("error", startFallback, { once: true });

    var playAttempt = video.play();
    if (playAttempt && typeof playAttempt.catch === "function") {
      playAttempt.catch(startFallback);
    }
  }

  function initDeferredVideos() {
    var videos = Array.prototype.slice.call(document.querySelectorAll("video[data-deferred-video]"));
    if (!videos.length) return;
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var saveData = navigator.connection && navigator.connection.saveData;
    if (reducedMotion || saveData) return;

    function loadVideo(video) {
      video.querySelectorAll("source[data-src]").forEach(function (source) {
        source.src = source.dataset.src;
        source.removeAttribute("data-src");
      });
      video.load();
      var playAttempt = video.play();
      if (playAttempt && typeof playAttempt.catch === "function") playAttempt.catch(function () {});
    }

    if (!("IntersectionObserver" in window)) {
      videos.forEach(loadVideo);
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        loadVideo(entry.target);
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "240px" });
    videos.forEach(function (video) { observer.observe(video); });
  }

  function initBrandIntroLinks() {
    document.querySelectorAll(".site-header a.brand").forEach(function (brand) {
      brand.setAttribute("href", "/?intro=1");
      brand.setAttribute("aria-label", "Kardeşler Tekstil karşılama ekranını aç");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initHomeIntro();
    initBrandIntroLinks();
    initPrivacyControls();
    initMobileNavigation();
    initConversionTracking();
    initQuoteList();
    initTargetDate();
    initDeferredVideos();
  });
})();
