const LEGACY_PATHS = new Map([
  ["/about", "/hakkimizda"],
  ["/products", "/urunlerimiz"],
  ["/contact", "/iletisim"],
  ["/references", "/referanslarimiz"],
]);

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

    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);
    const faviconAssets = new Set([
      "/favicon.ico",
      "/favicon-16x16.png",
      "/favicon-32x32.png",
      "/favicon-48x48.png",
      "/apple-touch-icon.png",
      "/android-chrome-192x192.png",
      "/android-chrome-512x512.png",
    ]);

    if (faviconAssets.has(url.pathname)) {
      headers.set("Cache-Control", "public, max-age=86400, must-revalidate");
    } else if (url.pathname === "/manifest.webmanifest") {
      headers.set("Cache-Control", "public, max-age=3600, must-revalidate");
    }
    if (response.status === 404) headers.set("X-Robots-Tag", "noindex, follow");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
