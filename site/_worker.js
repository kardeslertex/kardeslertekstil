const LEGACY_PATHS = new Map([
  ["/bilgi-merkezi/is-kiyafeti-teknik-sartnamesi-nasil-hazirlanir", "/bilgi-merkezi/is-kiyafeti-sartname-hazirlama-rehberi/"],
  ["/about", "/hakkimizda"],
  ["/19-2", "/"],
  ["/is-kiyafeti-ureticisi", "/is-kiyafeti/"],
  ["/kurumsal-is-kiyafeti", "/is-kiyafeti/"],
  ["/bilgi-merkezi/is-kiyafeti-tco-maliyet-analizi", "/bilgi-merkezi/is-kiyafetinde-toplam-sahip-olma-maliyeti/"],
  ["/bilgi-merkezi/kislik-is-kiyafeti-secim-rehberi", "/bilgi-merkezi/kislik-is-kiyafetleri-rehberi/"],
  ["/bilgi-merkezi/is-kiyafeti-beden-dagitim-plani", "/bilgi-merkezi/is-kiyafeti-beden-dagilimi-nasil-planlanir/"],
  ["/bilgi-merkezi/tedarikci-performans-puan-karti-kalite-termin-maliyet", "/bilgi-merkezi/is-kiyafeti-tedarikci-puan-karti/"],
  ["/bilgi-merkezi/is-kiyafeti-acil-siparis-akisi", "/bilgi-merkezi/acil-is-kiyafeti-siparis-plani/"],
  ["/bilgi-merkezi/is-kiyafeti-sozlesmelerinde-sla-maddeleri", "/bilgi-merkezi/is-kiyafeti-tedarik-hizmet-seviyesi-sla/"],
  ["/bilgi-merkezi/is-kiyafeti-satin-almada-teknik-karsilastirma-cizelgesi", "/bilgi-merkezi/is-kiyafeti-satin-alirken-teklifler-nasil-karsilastirilir/"],
  ["/bilgi-merkezi/is-kiyafeti-tedarikci-karsilastirma-matrisi", "/bilgi-merkezi/is-kiyafeti-satin-alirken-teklifler-nasil-karsilastirilir/"],
  ["/products", "/urunlerimiz/"],
  ["/contact", "/iletisim"],
  ["/references", "/referanslarimiz"],
]);

const PRIVATE_PATH_PREFIXES = [
  "/hero-archive/",
  "/scripts/",
];

const LEGACY_PHP_PAGES = new Map([
  ["hakkimizda", "/hakkimizda"],
  ["iletisim", "/iletisim"],
  ["haberler", "/bilgi-merkezi/"],
  ["referanslar", "/referanslarimiz"],
  ["urunler", "/urunlerimiz/"],
]);

// Homepage runtime assets use release-specific paths. Some upstream/browser
// caches ignore query strings, so a new pathname is required for a reliable
// cache break when the hero markup and its JavaScript change together.
const RELEASE_ASSET_ALIASES = new Map([
  ["/catalog-ui-20260821-modal-fit5.js", "/catalog.js"],
  ["/catalog-styles-20260821-modal-fit5.css", "/styles.css"],
  ["/catalog-ui-20260821-modal-fit4.js", "/catalog.js"],
  ["/catalog-styles-20260821-modal-fit4.css", "/styles.css"],
  ["/catalog-ui-20260821-modal-fit3.js", "/catalog.js"],
  ["/catalog-styles-20260821-modal-fit3.css", "/styles.css"],
  ["/catalog-ui-20260821-modal-fit2.js", "/catalog.js"],
  ["/catalog-styles-20260821-modal-fit2.css", "/styles.css"],
  ["/assets/runtime/home-hero-products-20260814-default-035.js", "/hero-products.js"],
  ["/assets/runtime/home-site-20260814-default-model.js", "/site.js"],
  ["/catalog-ui-20260809-kt-mk-001-blue1.js", "/catalog.js"],
  ["/products-data-20260809-kt-mk-001-blue1.js", "/products.js"],
  ["/assets/runtime/home-hero-products-20260809-kt-mk-001-blue1.js", "/hero-products.js"],
  ["/catalog-ui-20260809-esd-original1.js", "/catalog.js"],
  ["/catalog-styles-20260809-esd-original1.css", "/styles.css"],
  ["/catalog-ui-20260809-uniformfit4.js", "/catalog.js"],
  ["/catalog-ui-20260809-esd-symbol2.js", "/catalog.js"],
  ["/catalog-styles-20260809-esd-symbol2.css", "/styles.css"],
  ["/products-data-20260809-kt-on-040-white1.js", "/products.js"],
  ["/catalog-ui-20260809-uniformfit3.js", "/catalog.js"],
  ["/catalog-styles-20260809-uniformfit3.css", "/styles.css"],
  ["/home-styles-20260809-trust-icons3.css", "/styles.css"],
  ["/home-styles-20260809-trust-icons4.css", "/styles.css"],
  ["/home-styles-20260809-trust-icons2.css", "/styles.css"],
  ["/home-styles-20260809-trust8.css", "/styles.css"],
  ["/catalog-ui-20260809-technicalpants2.js", "/catalog.js"],
  ["/home-styles-20260807-20.css", "/styles.css"],
  ["/assets/runtime/home-hero-products-20260807-21.js", "/hero-products.js"],
  ["/assets/runtime/home-site-20260807-19.js", "/site.js"],
  ["/products-data-20260807-24.js", "/products.js"],
  ["/catalog-ui-20260807-22.js", "/catalog.js"],
  ["/assets/runtime/home-hero-products-20260808-01.js", "/hero-products.js"],
  ["/assets/runtime/home-site-20260808-01.js", "/site.js"],
  ["/products-data-20260808-01.js", "/products.js"],
  ["/catalog-ui-20260808-01.js", "/catalog.js"],
  ["/assets/runtime/home-hero-products-20260808-02.js", "/hero-products.js"],
  ["/products-data-20260808-02.js", "/products.js"],
  ["/products-data-20260808-03.js", "/products.js"],
  ["/catalog-ui-20260808-03.js", "/catalog.js"],
  ["/products-data-20260808-04.js", "/products.js"],
  ["/catalog-ui-20260808-04.js", "/catalog.js"],
  ["/catalog-ui-20260808-05.js", "/catalog.js"],
  ["/catalog-ui-20260809-esd4.js", "/catalog.js"],
  ["/catalog-styles-20260809-esd4.css", "/styles.css"],
  ["/products-data-20260809-esd5.js", "/products.js"],
  ["/catalog-ui-20260809-esd5.js", "/catalog.js"],
  ["/catalog-ui-20260809-tulum1.js", "/catalog.js"],
  ["/catalog-ui-20260809-onluk1.js", "/catalog.js"],
  ["/products-data-20260809-scrub1.js", "/products.js"],
  ["/catalog-ui-20260809-scrub1.js", "/catalog.js"],
  ["/catalog-ui-20260809-montfilter1.js", "/catalog.js"],
  ["/catalog-ui-20260809-polarfilter1.js", "/catalog.js"],
  ["/products-data-20260809-pantolonfilter1.js", "/products.js"],
  ["/products-data-20260809-vyaka1.js", "/products.js"],
  ["/products-data-20260809-webp1.js", "/products.js"],
  ["/catalog-ui-20260809-pantolonfilter1.js", "/catalog.js"],
  ["/site-styles-20260809-scrub1.css", "/styles.css"],
  ["/catalog-styles-20260809-uniform1.css", "/styles.css"],
  ["/products-data-20260808-06.js", "/products.js"],
  ["/catalog-ui-20260808-07.js", "/catalog.js"],
  ["/assets/runtime/home-hero-products-20260808-08.js", "/hero-products.js"],
  ["/assets/runtime/home-hero-products-20260808-09.js", "/hero-products.js"],
  ["/assets/runtime/home-hero-products-20260809-10.js", "/hero-products.js"],
  ["/assets/runtime/home-site-20260808-02.js", "/site.js"],
  ["/assets/runtime/home-site-20260809-intro1.js", "/site.js"],
  ["/assets/runtime/home-site-20260809-intro2.js", "/site.js"],
  ["/assets/runtime/home-site-20260809-intro3.js", "/site.js"],
  ["/knowledge-data-20260807-22.js", "/bilgi-merkezi/knowledge-center.js"],
]);

const SECURITY_HEADERS = {
  "Content-Security-Policy":
    "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self'; img-src 'self' data: blob: https:; font-src 'self' data: https:; style-src 'self' 'unsafe-inline' https:; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://www.googletagmanager.com; connect-src 'self' https://challenges.cloudflare.com https://formspree.io https://www.google-analytics.com https://region1.google-analytics.com https://analytics.google.com https://www.googletagmanager.com; frame-src 'self' https://challenges.cloudflare.com https://www.google.com https://www.google.com.tr; upgrade-insecure-requests",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
};

// Cache only the final, rewritten HTML response. The deployment identifier is
// part of the key so a new release can never serve HTML from an older release.
const HTML_EDGE_CACHE_FALLBACK_VERSION = "20260820-slow-page-1";
const HTML_EDGE_CACHE_SECONDS = 86400;

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const FORMSPREE_QUOTE_URL = "https://formspree.io/f/meeyqyyd";
const MAX_FORM_BYTES = 12 * 1024 * 1024;
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ALLOWED_FILE_EXTENSIONS = new Set([
  "png", "jpg", "jpeg", "svg", "pdf", "ai", "eps", "doc", "docx", "xls", "xlsx",
]);

function formError(message, status = 400) {
  return new Response(message, { status, headers: { ...SECURITY_HEADERS, "Cache-Control": "no-store", "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex, nofollow" } });
}

async function handleQuoteForm(request, env, url) {
  if (request.method !== "POST") return formError("Yalnızca form gönderimi kabul edilir.", 405);
  if (!env.TURNSTILE_SECRET_KEY) return formError("Form güvenlik yapılandırması tamamlanmamış.", 503);
  const origin = request.headers.get("Origin");
  if (origin && origin !== url.origin) return formError("Form gönderim kaynağı doğrulanamadı.", 403);
  const contentLength = Number(request.headers.get("Content-Length") || 0);
  if (contentLength > MAX_FORM_BYTES) return formError("Eklenen dosyaların toplam boyutu çok büyük.", 413);

  let formData;
  try { formData = await request.formData(); } catch (error) { return formError("Form verisi okunamadı."); }
  if (String(formData.get("_gotcha") || "").trim()) return formError("Form gönderimi reddedildi.");
  const token = String(formData.get("cf-turnstile-response") || "");
  if (!token || token.length > 2048) return formError("Lütfen güvenlik kontrolünü tamamlayın.");

  const verifyBody = new FormData();
  verifyBody.set("secret", env.TURNSTILE_SECRET_KEY);
  verifyBody.set("response", token);
  const visitorIp = request.headers.get("CF-Connecting-IP");
  if (visitorIp) verifyBody.set("remoteip", visitorIp);
  let verification;
  try {
    const verifyResponse = await fetch(TURNSTILE_VERIFY_URL, { method: "POST", body: verifyBody });
    verification = await verifyResponse.json();
  } catch (error) {
    return formError("Güvenlik kontrolüne şu anda ulaşılamıyor. Lütfen tekrar deneyin.", 503);
  }
  const allowedHostnames = new Set(["kardeslertekstil.com.tr", "www.kardeslertekstil.com.tr"]);
  if (!verification.success) {
    const errorCodes = Array.isArray(verification["error-codes"])
      ? verification["error-codes"].join(",")
      : "unknown";
    console.error("Turnstile verification failed", { errorCodes });
    return formError(`Güvenlik doğrulaması başarısız oldu (${errorCodes}). Sayfayı yenileyip tekrar deneyin.`, 403);
  }
  if (verification.action !== "quote_form") {
    console.error("Turnstile action mismatch", { action: verification.action || "missing" });
    return formError("Güvenlik doğrulaması form ile eşleşmedi (action-mismatch). Sayfayı yenileyip tekrar deneyin.", 403);
  }
  if (!allowedHostnames.has(verification.hostname)) {
    console.error("Turnstile hostname mismatch", { hostname: verification.hostname || "missing" });
    return formError("Güvenlik doğrulaması alan adıyla eşleşmedi (hostname-mismatch).", 403);
  }

  let uploadedBytes = 0;
  for (const [name, value] of formData.entries()) {
    if (!(value instanceof File) || !value.name || value.size === 0) continue;
    uploadedBytes += value.size;
    const extension = value.name.includes(".") ? value.name.split(".").pop().toLowerCase() : "";
    if (value.size > MAX_FILE_BYTES) return formError(`${name} alanındaki dosya 5 MB sınırını aşıyor.`, 413);
    if (!ALLOWED_FILE_EXTENSIONS.has(extension)) return formError(`${name} alanındaki dosya türüne izin verilmiyor.`);
  }
  if (uploadedBytes > MAX_FORM_BYTES) return formError("Eklenen dosyaların toplam boyutu çok büyük.", 413);

  formData.delete("cf-turnstile-response");
  formData.set("_subject", "Kardeşler Tekstil - Yeni Teklif Talebi");
  let upstream;
  try {
    upstream = await fetch(FORMSPREE_QUOTE_URL, { method: "POST", headers: { Accept: "application/json" }, body: formData });
  } catch (error) {
    return formError("Teklif formu şu anda gönderilemedi. Lütfen tekrar deneyin.", 502);
  }
  if (!upstream.ok) return formError("Teklif formu gönderilemedi. Bilgileri kontrol edip tekrar deneyin.", 502);
  return Response.redirect(`${url.origin}/tesekkur.html`, 303);
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const isPreviewHost = url.hostname.endsWith(".pages.dev");
    if (isPreviewHost) {
      const expected = env.PREVIEW_AUTH_TOKEN;
      const supplied = request.headers.get("Authorization");
      if (!expected || supplied !== `Bearer ${expected}`) {
        return new Response("Authentication required", {
          status: 401,
          headers: {
            ...SECURITY_HEADERS,
            "Cache-Control": "private, no-store",
            "Content-Type": "text/plain; charset=utf-8",
            "WWW-Authenticate": 'Bearer realm="preview"',
            "X-Robots-Tag": "noindex, nofollow, noarchive",
          },
        });
      }
    }
    if (url.pathname === "/api/teklif") return handleQuoteForm(request, env, url);
    const legacyPath = url.pathname.replace(/\/$/, "") || "/";
    // Search Console eski WordPress AJAX ucunu 4xx olarak raporluyor. Site artik
    // WordPress kullanmadigi icin bos, indekslenemez bir basarili yanit dondur.
    if (legacyPath.toLowerCase() === "/wp-admin/admin-ajax.php") {
      return new Response(null, {
        status: 204,
        headers: {
          ...SECURITY_HEADERS,
          "Cache-Control": "public, max-age=86400",
          "X-Robots-Tag": "noindex, nofollow",
        },
      });
    }

    if (legacyPath.toLowerCase() === "/index.php") {
      return Response.redirect("https://kardeslertekstil.com.tr/", 308);
    }

    if (legacyPath.toLowerCase() === "/page.php") {
      const pageId = (url.searchParams.get("PageID") || "").toLowerCase();
      const pageName = (url.searchParams.get("PageName") || "").toLowerCase();
      const target = LEGACY_PHP_PAGES.get(pageId) ||
        (pageName === "urunler" ? "/urunlerimiz/" : "");
      if (target) return Response.redirect(`https://kardeslertekstil.com.tr${target}`, 308);
    }

    if (legacyPath.toLowerCase() === "/referanslarimiz_tum_liste.htm") {
      return Response.redirect("https://kardeslertekstil.com.tr/referanslarimiz", 308);
    }

    if (
      request.method === "GET" &&
      legacyPath === "/" &&
      url.searchParams.get("intro") === "1"
    ) {
      url.search = "";
      url.hash = "intro";
      return Response.redirect(url.toString(), 308);
    }

    // Form prefills and knowledge-center filters are UI state, not separate
    // documents. Move that state into the fragment so crawlers see only the
    // canonical page while visitors keep the same prefilled/filtered view.
    const isContactPage = legacyPath === "/iletisim" || legacyPath === "/iletisim.html";
    const contactStateKeys = ["urun", "adet", "mesaj"];
    if (
      request.method === "GET" &&
      isContactPage &&
      contactStateKeys.some((key) => url.searchParams.has(key))
    ) {
      const state = new URLSearchParams();
      contactStateKeys.forEach((key) => {
        if (url.searchParams.has(key)) state.set(key, url.searchParams.get(key));
      });
      url.search = "";
      url.hash = `teklif-formu?${state.toString()}`;
      return Response.redirect(url.toString(), 308);
    }

    const knowledgeStateKeys = ["q", "tag", "kategori"];
    if (
      request.method === "GET" &&
      legacyPath === "/bilgi-merkezi" &&
      knowledgeStateKeys.some((key) => url.searchParams.has(key))
    ) {
      const state = new URLSearchParams();
      knowledgeStateKeys.forEach((key) => {
        if (url.searchParams.has(key)) state.set(key, url.searchParams.get(key));
      });
      url.search = "";
      url.hash = `filtre?${state.toString()}`;
      return Response.redirect(url.toString(), 308);
    }

    const catalogStateKeys = ["kategori", "esd", "onluk", "montkaban", "polar", "pantolon"];
    if (
      request.method === "GET" &&
      legacyPath === "/urunlerimiz" &&
      catalogStateKeys.some((key) => url.searchParams.has(key))
    ) {
      const state = new URLSearchParams();
      catalogStateKeys.forEach((key) => {
        if (url.searchParams.has(key)) state.set(key, url.searchParams.get(key));
      });
      url.pathname = "/urunlerimiz/";
      url.search = "";
      url.hash = `filtre?${state.toString()}`;
      return Response.redirect(url.toString(), 308);
    }

    // Old WordPress pages emitted relative navigation links. Preserve only
    // destinations with an unambiguous modern equivalent.
    const nestedLegacyDestination = [
      [/(?:^|\/)hakkimizda\.html$/i, "/hakkimizda"],
      [/(?:^|\/)iletisim\.html$/i, "/iletisim"],
      [/(?:^|\/)urunlerimiz\.html$/i, "/urunlerimiz/"],
      [/(?:^|\/)referanslarimiz\.html$/i, "/referanslarimiz"],
    ].find(([pattern]) => pattern.test(legacyPath));
    if (nestedLegacyDestination) {
      return Response.redirect(
        `https://kardeslertekstil.com.tr${nestedLegacyDestination[1]}`,
        308
      );
    }

    if (/^\/contact-us(?:\/|$)/i.test(url.pathname)) {
      return Response.redirect("https://kardeslertekstil.com.tr/iletisim", 308);
    }
    if (/^\/store(?:\/index\.html)?\/?$/i.test(url.pathname)) {
      return Response.redirect("https://kardeslertekstil.com.tr/urunlerimiz/", 308);
    }

    const obsoleteWordPressPath =
      /^\/urun\/(?!kt-)[^/]+(?:\/|$)/i.test(url.pathname) ||
      /^\/urun-kategori\//i.test(url.pathname) ||
      /^\/(?:store\/)?feed(?:\/|$)/i.test(url.pathname) ||
      /^\/comments\/feed\/?$/i.test(url.pathname) ||
      /^\/store\/?$/i.test(url.pathname) ||
      /^\/(?:cart|my-account)(?:\/|$)/i.test(url.pathname) ||
      /^\/(?:wp-admin|wp-content|wp-includes|wp-json)(?:\/|$)/i.test(url.pathname) ||
      /^\/wp-[^/]*\.php$/i.test(url.pathname) ||
      /^\/\d+(?:-\d+)*\//.test(url.pathname) ||
      /^\/cdn-cgi\/l\/email-protection\/?$/i.test(url.pathname) ||
      url.pathname === "/*" ||
      url.pathname === "/ornek-sayfa/" ||
      (url.pathname === "/" && url.searchParams.has("wc-ajax")) ||
      (url.pathname === "/" && url.searchParams.has("page_id"));
    if (obsoleteWordPressPath) {
      return new Response("Gone", {
        status: 410,
        headers: {
          ...SECURITY_HEADERS,
          "Cache-Control": "public, max-age=86400",
          "Content-Type": "text/plain; charset=utf-8",
          "X-Robots-Tag": "noindex, nofollow",
        },
      });
    }

    const canonicalPath = LEGACY_PATHS.get(legacyPath);
    const needsCanonicalHost =
      url.protocol !== "https:" || url.hostname === "www.kardeslertekstil.com.tr";

    if (canonicalPath || needsCanonicalHost) {
      url.protocol = "https:";
      url.hostname = "kardeslertekstil.com.tr";
      url.port = "";
      if (canonicalPath) url.pathname = canonicalPath;
      return Response.redirect(url.toString(), 308);
    }

    const isPrivatePath = PRIVATE_PATH_PREFIXES.some((prefix) =>
      url.pathname.startsWith(prefix),
    );
    if (isPrivatePath) {
      return new Response("Not Found", {
        status: 404,
        headers: {
          ...SECURITY_HEADERS,
          "Cache-Control": "no-store",
          "Content-Type": "text/plain; charset=utf-8",
          "X-Robots-Tag": "noindex, nofollow",
        },
      });
    }

    // Katalogdaki her urun, urun koduyla paylasilabilen sade bir adrese sahip:
    // /urunlerimiz/kt-ts-002/. Icerik tek katalog belgesinden sunulur; secili
    // urunu tarayici tarafinda catalog.js acar.
    const catalogProductMatch = url.pathname.match(/^\/urunlerimiz\/(kt-[a-z]{2}-\d{3})\/?$/i);
    if (catalogProductMatch) {
      const canonicalCatalogProductPath = `/urunlerimiz/${catalogProductMatch[1].toLowerCase()}/`;
      if (url.pathname !== canonicalCatalogProductPath) {
        url.pathname = canonicalCatalogProductPath;
        return Response.redirect(url.toString(), 308);
      }
    }

    const releaseAssetPath = RELEASE_ASSET_ALIASES.get(url.pathname);
    let assetRequest = request;
    if (catalogProductMatch) {
      const assetUrl = new URL(request.url);
      assetUrl.pathname = "/urunlerimiz/index.html";
      assetUrl.search = "";
      assetRequest = new Request(assetUrl.toString(), request);
    } else if (releaseAssetPath) {
      const assetUrl = new URL(request.url);
      assetUrl.pathname = releaseAssetPath;
      assetUrl.search = "";
      assetRequest = new Request(assetUrl.toString(), request);
    }

    const shouldCacheHtml =
      request.method === "GET" &&
      url.search === "" &&
      !url.pathname.split("/").pop().includes(".");
    let htmlCache;
    let htmlCacheKey;
    if (shouldCacheHtml) {
      const cacheVersion = env.CF_PAGES_COMMIT_SHA || HTML_EDGE_CACHE_FALLBACK_VERSION;
      const cacheUrl = new URL(request.url);
      cacheUrl.searchParams.set("__kt_html_release", cacheVersion);
      htmlCacheKey = new Request(cacheUrl.toString(), { method: "GET" });
      htmlCache = caches.default;
      const cachedResponse = await htmlCache.match(htmlCacheKey);
      if (cachedResponse) {
        const cachedHeaders = new Headers(cachedResponse.headers);
        cachedHeaders.set("X-KT-Edge-Cache", "HIT");
        return new Response(cachedResponse.body, {
          status: cachedResponse.status,
          statusText: cachedResponse.statusText,
          headers: cachedHeaders,
        });
      }
    }

    let response = await env.ASSETS.fetch(assetRequest);

    // Eski, bozuk Turkce karakterli urun adreslerini HTML meta-refresh yerine
    // edge seviyesinde kalici yonlendirmeye cevirir.
    const looksLikeLegacyProduct = url.pathname.startsWith("/urun/");
    if (response.ok && looksLikeLegacyProduct) {
      const legacyHtml = await response.clone().text();
      const refreshMatch = legacyHtml.match(/<meta[^>]+http-equiv=["']refresh["'][^>]+content=["'][^"']*url=([^"']+)/i);
      if (refreshMatch) return Response.redirect(new URL(refreshMatch[1], url).toString(), 308);
    }

    // Rehber detay sayfalari, yalnızca dizin/arama ekraninin ihtiyac duydugu
    // buyuk knowledge-center.js veri paketini indirmesin.
    const isKnowledgeArticle =
      /^\/bilgi-merkezi\/[^/]+\/$/.test(url.pathname) &&
      !url.pathname.endsWith("/bilgi-merkezi/");
    if (response.ok && isKnowledgeArticle) {
      response = new HTMLRewriter()
        .on('script[src*="knowledge-center.js"]', {
          element(element) { element.remove(); },
        })
        .transform(response);
    }

    const headers = new Headers(response.headers);
    for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
      headers.set(name, value);
    }
    const contentType = headers.get("Content-Type") || "";
    const faviconAssets = new Set([
      "/favicon.ico",
      "/favicon-16x16.png",
      "/favicon-32x32.png",
      "/favicon-48x48.png",
      "/apple-touch-icon.png",
      "/android-chrome-192x192.png",
      "/android-chrome-512x512.png",
    ]);

    const isCodeAsset = /\.(?:css|js)$/.test(url.pathname);
    const isReleaseAsset = RELEASE_ASSET_ALIASES.has(url.pathname) ||
      /(?:^|\/)(?:home-styles|products-data|catalog-ui|knowledge-data)-\d+\.(?:css|js)$/.test(url.pathname) ||
      /\/assets\/runtime\/[^/]+-\d+\.js$/.test(url.pathname);
    if ((isCodeAsset && url.searchParams.has("v")) || isReleaseAsset) {
      headers.set("Cache-Control", "public, max-age=31536000, immutable");
    } else if (isCodeAsset) {
      headers.set("Cache-Control", "public, max-age=0, must-revalidate");
    } else if (url.pathname === "/llms.txt") {
      headers.set("Cache-Control", "public, max-age=3600, must-revalidate");
    } else if (faviconAssets.has(url.pathname)) {
      headers.set("Cache-Control", "public, max-age=86400, must-revalidate");
    } else if (url.pathname === "/manifest.webmanifest") {
      headers.set("Cache-Control", "public, max-age=3600, must-revalidate");
    }
    if (url.pathname === "/llms.txt" || url.pathname === "/robots.txt") {
      headers.set("Content-Type", "text/plain; charset=utf-8");
    } else if (url.pathname === "/sitemap.xml") {
      headers.set("Content-Type", "application/xml; charset=utf-8");
    }
    if (response.status === 404) headers.set("X-Robots-Tag", "noindex, follow");
    // Paylasilabilir modal adresleri katalog deneyimini korur, ancak ayni
    // katalog belgesini tekrar indeksletmez. Gercek SEO urun sayfalari /urun/
    // altindadir.
    if (catalogProductMatch) headers.set("X-Robots-Tag", "noindex, follow");
    // Teklif formu ve katalog filtreleri kullanıcı deneyimi için query string
    // taşır; bunlar ayrı arama sonucu sayfaları değildir. Google'ın robots.txt
    // engeline takılmadan yanıtı görmesini ve temiz canonical'ı izlemesini sağla.
    const nonIndexableQueryKeys = ["q", "tag", "kategori", "urun", "adet", "mesaj"];
    if (
      contentType.includes("text/html") &&
      nonIndexableQueryKeys.some((key) => url.searchParams.has(key))
    ) {
      headers.set("X-Robots-Tag", "noindex, follow");
    }

    const finalResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
    if (shouldCacheHtml && response.ok && contentType.includes("text/html")) {
      const cacheHeaders = new Headers(finalResponse.headers);
      cacheHeaders.set("Cache-Control", `public, max-age=300, s-maxage=${HTML_EDGE_CACHE_SECONDS}`);
      cacheHeaders.set("X-KT-Edge-Cache", "MISS");
      const cacheableResponse = new Response(finalResponse.body, {
        status: finalResponse.status,
        statusText: finalResponse.statusText,
        headers: cacheHeaders,
      });
      ctx.waitUntil(htmlCache.put(htmlCacheKey, cacheableResponse.clone()));
      return cacheableResponse;
    }
    return finalResponse;
  },
};
