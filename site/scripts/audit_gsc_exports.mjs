import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const exportDir = path.join(root, "gsc-exports");

function parseCsv(text) {
  const rows = [];
  let row = [], field = "", quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { field += '"'; i += 1; }
      else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') { row.push(field); field = ""; }
    else if (ch === '\n') { row.push(field.replace(/\r$/, "")); rows.push(row); row = []; field = ""; }
    else field += ch;
  }
  if (field || row.length) { row.push(field.replace(/\r$/, "")); rows.push(row); }
  const [header, ...body] = rows;
  return body.filter((r) => r.some(Boolean)).map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ""])));
}

const files = (await fs.readdir(exportDir)).filter((name) => name.endsWith(".csv")).sort();
const records = [];
for (const file of files) {
  const rows = parseCsv(await fs.readFile(path.join(exportDir, file), "utf8"));
  for (const row of rows) records.push({ report: file, url: row.URL.replace(/[\r\n]/g, "").trim(), lastCrawl: row["Son tarama"] });
}

const unique = [...new Set(records.map((r) => r.url))];
const live = new Map();
let cursor = 0;
async function worker() {
  while (cursor < unique.length) {
    const url = unique[cursor++];
    try {
      const response = await fetch(url, { redirect: "manual", headers: { "user-agent": "Mozilla/5.0 GSC remediation audit" }, signal: AbortSignal.timeout(20000) });
      const location = response.headers.get("location");
      const followed = response.status >= 300 && response.status < 400
        ? await fetch(url, { redirect: "follow", headers: { "user-agent": "Mozilla/5.0 GSC remediation audit" }, signal: AbortSignal.timeout(20000) })
        : response;
      const contentType = followed.headers.get("content-type") || "";
      let canonical = "";
      if (followed.ok && contentType.includes("text/html")) {
        const html = await followed.text();
        canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i)?.[1] ||
          html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)?.[1] || "";
      }
      live.set(url, {
        status: response.status,
        location,
        finalStatus: followed.status,
        finalUrl: followed.url,
        canonical,
        xRobots: followed.headers.get("x-robots-tag") || response.headers.get("x-robots-tag") || "",
      });
    } catch (error) {
      live.set(url, { error: error.message });
    }
  }
}
await Promise.all(Array.from({ length: 16 }, worker));

const enriched = records.map((record) => ({ ...record, ...live.get(record.url) }));

async function walk(dir) {
  const found = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if ([".git", "node_modules", "gsc-exports"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...await walk(full));
    else if (entry.name.endsWith(".html")) found.push(full);
  }
  return found;
}

const sitemap = await fs.readFile(path.join(root, "sitemap.xml"), "utf8");
const inbound = new Map();
const localPages = new Map();
for (const file of await walk(root)) {
  const relative = path.relative(root, file).replaceAll(path.sep, "/");
  const pathname = relative === "index.html" ? "/" : `/${relative.replace(/index\.html$/, "")}`;
  const pageUrl = new URL(pathname, "https://kardeslertekstil.com.tr/").href;
  const html = await fs.readFile(file, "utf8");
  const visible = html.replace(/<script\b[\s\S]*?<\/script>/gi, " ").replace(/<style\b[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&\w+;/g, " ").replace(/\s+/g, " ").trim();
  localPages.set(pageUrl, { file: relative, words: visible ? visible.split(" ").length : 0 });
  for (const match of html.matchAll(/\bhref=["']([^"']+)["']/gi)) {
    try {
      const target = new URL(match[1], pageUrl);
      if (target.origin !== "https://kardeslertekstil.com.tr") continue;
      target.search = ""; target.hash = "";
      const key = target.href;
      if (!inbound.has(key)) inbound.set(key, new Set());
      inbound.get(key).add(pageUrl);
    } catch {}
  }
}

for (const record of enriched) {
  const normalized = new URL(record.url); normalized.search = ""; normalized.hash = "";
  const key = normalized.href;
  record.inSitemap = sitemap.includes(`<loc>${key}</loc>`);
  record.inboundSources = inbound.get(key)?.size || 0;
  Object.assign(record, localPages.get(key) || { file: "", words: 0 });
}
const summary = {};
for (const file of files) {
  const rows = enriched.filter((r) => r.report === file);
  const statuses = {};
  for (const row of rows) statuses[row.error ? "error" : String(row.status)] = (statuses[row.error ? "error" : String(row.status)] || 0) + 1;
  summary[file] = { rows: rows.length, statuses };
}
const output = { generatedAt: new Date().toISOString(), uniqueUrls: unique.length, summary, records: enriched };
await fs.writeFile(path.join(exportDir, "live-audit.json"), JSON.stringify(output, null, 2));
console.log(JSON.stringify({ uniqueUrls: unique.length, summary }, null, 2));
