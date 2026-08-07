const LEGACY_PATHS = new Map([
  ["/about", "/hakkimizda"],
  ["/products", "/urunlerimiz"],
  ["/contact", "/iletisim"],
  ["/references", "/referanslarimiz"],
]);

const PRIVATE_PATH_PREFIXES = [
  "/hero-archive/",
  "/scripts/",
];

// Homepage runtime assets use release-specific paths. Some upstream/browser
// caches ignore query strings, so a new pathname is required for a reliable
// cache break when the hero markup and its JavaScript change together.
const RELEASE_ASSET_ALIASES = new Map([
  ["/home-styles-20260807-20.css", "/styles.css"],
  ["/assets/runtime/home-hero-products-20260807-18.js", "/hero-products.js"],
  ["/assets/runtime/home-site-20260807-18.js", "/site.js"],
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

    const releaseAssetPath = RELEASE_ASSET_ALIASES.get(url.pathname);
    let assetRequest = request;
    if (releaseAssetPath) {
      const assetUrl = new URL(request.url);
      assetUrl.pathname = releaseAssetPath;
      assetUrl.search = "";
      assetRequest = new Request(assetUrl.toString(), request);
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

    const isCodeAsset = /\.(?:css|js)$/.test(url.pathname);
    if (isCodeAsset && url.searchParams.has("v")) {
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
