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
const dailyLimit = positiveInteger(process.env.SC_AUDIT_LIMIT, 180);
const concurrency = positiveInteger(process.env.SC_AUDIT_CONCURRENCY, 2);
let token = JSON.parse(fs.readFileSync(tokenPath, "utf8"));

function positiveInteger(value, fallback) {
  const parsed = Number.parseInt(value || "", 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

class ApiError extends Error {
  constructor(status, body) {
    super(`${status}: ${JSON.stringify(body)}`);
    this.status = status;
  }
}

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

async function api(url, options = {}, retry = 0, refreshed = false) {
  const response = await fetch(url, {
    ...options,
    signal: AbortSignal.timeout(30000),
    headers: { authorization: `Bearer ${token.access_token}`, "content-type": "application/json", ...(options.headers || {}) },
  });
  if (response.status === 401 && !refreshed) {
    await refreshAccessToken();
    return api(url, options, retry, true);
  }
  // A 429 here is normally the daily property quota. Retrying it only burns
  // more requests, so stop this run and continue on the next day.
  if (response.status >= 500 && retry < 2) {
    await new Promise((resolve) => setTimeout(resolve, 1000 * 2 ** retry));
    return api(url, options, retry + 1, refreshed);
  }
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new ApiError(response.status, body);
  return body;
}

const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
const previous = fs.existsSync(outputPath) ? JSON.parse(fs.readFileSync(outputPath, "utf8").replace(/^\uFEFF/, "")) : [];
const byUrl = new Map(previous.map((item) => [item.url, item]));
const pending = urls.filter((url) => !byUrl.get(url)?.indexStatusResult).slice(0, dailyLimit);
let attempted = 0;
let succeeded = 0;
let failed = 0;
let cursor = 0;
let quotaReached = false;

function saveProgress() {
  const inspected = urls.filter((url) => byUrl.get(url)?.indexStatusResult).length;
  fs.writeFileSync(outputPath, JSON.stringify([...byUrl.values()], null, 2));
  fs.writeFileSync(progressPath, JSON.stringify({
    total: urls.length,
    inspected,
    remaining: urls.length - inspected,
    attemptedThisRun: attempted,
    succeededThisRun: succeeded,
    failedThisRun: failed,
    quotaReached,
    dailyLimit,
    concurrency,
    finished: inspected === urls.length,
    updatedAt: new Date().toISOString(),
  }, null, 2));
}

async function worker() {
  while (!quotaReached) {
    const index = cursor++;
    if (index >= pending.length) return;
    const url = pending[index];
    attempted++;
    try {
      const result = await api("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
        method: "POST",
        body: JSON.stringify({ inspectionUrl: url, siteUrl: "sc-domain:kardeslertekstil.com.tr", languageCode: "tr-TR" }),
      });
      byUrl.set(url, { url, checkedAt: new Date().toISOString(), ...result.inspectionResult });
      succeeded++;
    } catch (error) {
      if (error.status === 429) {
        quotaReached = true;
      } else {
        failed++;
        byUrl.set(url, { url, checkedAt: new Date().toISOString(), error: String(error.message || error) });
      }
    }
    if (attempted % 10 === 0) saveProgress();
  }
}

await Promise.all(Array.from({ length: Math.min(concurrency, pending.length || 1) }, worker));
saveProgress();
console.log(JSON.stringify({ attempted, succeeded, failed, quotaReached, queued: pending.length }, null, 2));
