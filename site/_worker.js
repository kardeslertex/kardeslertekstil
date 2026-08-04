const LEGACY_PATHS = new Map([
  ["/about", "/hakkimizda"],
  ["/products", "/urunlerimiz"],
  ["/contact", "/iletisim"],
  ["/references", "/referanslarimiz"],
]);

const SECURITY_HEADERS = {
  "Content-Security-Policy":
    "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self' https://formspree.io; img-src 'self' data: blob: https:; font-src 'self' data: https:; style-src 'self' 'unsafe-inline' https:; script-src 'self' 'unsafe-inline' https:; connect-src 'self' https://formspree.io https:; frame-src 'self' https://www.google.com https://www.google.com.tr; upgrade-insecure-requests",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const legacyPath = url.pathname.replace(/\/$/, "") || "/";
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

    let response = await env.ASSETS.fetch(request);

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
    if (contentType.includes("text/html")) {
      const cacheControl = headers.get("Cache-Control");
      headers.set(
        "Cache-Control",
        cacheControl ? `${cacheControl}, no-transform` : "no-transform",
      );
    }
    const faviconAssets = new Set([
      "/favicon.ico",
      "/favicon-16x16.png",
      "/favicon-32x32.png",
      "/favicon-48x48.png",
      "/apple-touch-icon.png",
      "/android-chrome-192x192.png",
      "/android-chrome-512x512.png",
    ]);

    if (url.pathname === "/site.js" || url.pathname === "/styles.css") {
      headers.set("Cache-Control", "public, max-age=0, must-revalidate");
    } else if (url.pathname === "/privacy.css" || url.pathname === "/llms.txt") {
      headers.set("Cache-Control", "public, max-age=3600, must-revalidate");
    } else if (faviconAssets.has(url.pathname)) {
      headers.set("Cache-Control", "public, max-age=86400, must-revalidate");
    } else if (url.pathname === "/manifest.webmanifest") {
      headers.set("Cache-Control", "public, max-age=3600, must-revalidate");
    }
    if (url.pathname === "/llms.txt") {
      headers.set("Content-Type", "text/plain; charset=utf-8");
    }
    if (response.status === 404) headers.set("X-Robots-Tag", "noindex, follow");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
