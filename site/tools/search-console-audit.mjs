import fs from "node:fs";
import path from "node:path";
import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");

const root = process.cwd();
const secretPath = process.argv[2] || path.join(root, ".search-console", "client-secret.json");
if (!fs.existsSync(secretPath)) throw new Error("OAuth JSON dosyasi bulunamadi.");
const secret = JSON.parse(fs.readFileSync(secretPath, "utf8")).installed;
const tokenPath = path.join(root, ".search-console", "token.json");
const outputPath = path.join(root, ".search-console", "url-inspection.json");
const progressPath = path.join(root, ".search-console", "audit-progress.json");
let token = JSON.parse(fs.readFileSync(tokenPath, "utf8"));

async function refreshAccessToken() {
  if (!token.refresh_token) return;
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: secret.client_id,
      client_secret: secret.client_secret,
      refresh_token: token.refresh_token,
      grant_type: "refresh_token",
    }),
  });
  const update = await response.json();
  if (!response.ok) throw new Error(`Token yenilenemedi: ${JSON.stringify(update)}`);
  token = { ...token, ...update };
  fs.writeFileSync(tokenPath, JSON.stringify(token, null, 2));
}

async function api(url, options = {}, retry = 0) {
  const response = await fetch(url, {
    ...options,
    signal: AbortSignal.timeout(30000),
    headers: { authorization: `Bearer ${token.access_token}`, "content-type": "application/json", ...(options.headers || {}) },
  });
  if (response.status === 401 && retry === 0) {
    await refreshAccessToken();
    return api(url, options, 1);
  }
  if ((response.status === 429 || response.status >= 500) && retry < 5) {
    await new Promise((resolve) => setTimeout(resolve, 1000 * 2 ** retry));
    return api(url, options, retry + 1);
  }
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(`${response.status}: ${JSON.stringify(body)}`);
  return body;
}

const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
const previous = fs.existsSync(outputPath) ? JSON.parse(fs.readFileSync(outputPath, "utf8").replace(/^\uFEFF/, "")) : [];
const byUrl = new Map(previous.map((item) => [item.url, item]));
let completed = 0;
let failed = 0;
let cursor = 0;

async function worker() {
  while (true) {
    const index = cursor++;
    if (index >= urls.length) return;
    const url = urls[index];
    if (byUrl.get(url)?.indexStatusResult && !byUrl.get(url)?.error) {
      completed++;
      continue;
    }
    let success = false;
    for (let attempt = 0; attempt < 3 && !success; attempt++) {
      try {
        const result = await api("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
          method: "POST",
          body: JSON.stringify({ inspectionUrl: url, siteUrl: "sc-domain:kardeslertekstil.com.tr", languageCode: "tr-TR" }),
        });
        byUrl.set(url, { url, checkedAt: new Date().toISOString(), ...result.inspectionResult });
        success = true;
      } catch (error) {
        if (attempt === 2) {
          failed++;
          byUrl.set(url, { url, checkedAt: new Date().toISOString(), error: String(error.message || error) });
        }
      }
    }
    completed++;
    if (completed % 10 === 0 || completed === urls.length) {
      fs.writeFileSync(outputPath, JSON.stringify([...byUrl.values()], null, 2));
      fs.writeFileSync(progressPath, JSON.stringify({ total: urls.length, completed, failed, updatedAt: new Date().toISOString() }, null, 2));
    }
  }
}

await Promise.all(Array.from({ length: 20 }, worker));
fs.writeFileSync(outputPath, JSON.stringify([...byUrl.values()], null, 2));
fs.writeFileSync(progressPath, JSON.stringify({ total: urls.length, completed, failed, finished: true, updatedAt: new Date().toISOString() }, null, 2));
