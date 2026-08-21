const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const origin = 'https://kardeslertekstil.com.tr';
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, 'products.js'), 'utf8'), context);

function pad3(value) { return String(value).padStart(3, '0'); }
function catalogCodes() {
  const codes = [];
  for (const category of context.window.KATALOG) {
    const groups = category.gruplar || [{ prefix: category.prefix, urunler: category.urunler }];
    const reserved = new Set();
    const nextByPrefix = {};
    for (const group of groups) for (const raw of group.urunler) if (typeof raw !== 'string' && raw.code) reserved.add(raw.code);
    for (const group of groups) for (const raw of group.urunler) {
      if (typeof raw !== 'string' && raw.code) { codes.push(raw.code); continue; }
      let next = nextByPrefix[group.prefix] || category.codeStart || 1;
      let code = `${group.prefix}-${pad3(next)}`;
      while (reserved.has(code)) code = `${group.prefix}-${pad3(++next)}`;
      reserved.add(code); nextByPrefix[group.prefix] = next + 1; codes.push(code);
    }
  }
  return [...new Set(codes.map((code) => code.toLowerCase()))].sort();
}

const errors = [];
const codes = catalogCodes();
const codeSet = new Set(codes);
const loaderCodes = new Set();
for (const code of codes) {
  const file = path.join(root, 'urunlerimiz', code, 'index.html');
  if (!fs.existsSync(file)) { errors.push(`Eksik modal rotası: ${code}`); continue; }
  const html = fs.readFileSync(file, 'utf8');
  if (!/<meta\s+name=["']robots["']\s+content=["']noindex,follow["']/i.test(html)) errors.push(`Modal rotası noindex değil: ${code}`);
  loaderCodes.add(code);
}

const detailCodes = new Set();
const detailRoot = path.join(root, 'urun');
for (const entry of fs.readdirSync(detailRoot, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const file = path.join(detailRoot, entry.name, 'index.html');
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, 'utf8');
  const sku = html.match(/["']sku["']\s*:\s*["']([^"']+)/i)?.[1]?.toLowerCase();
  if (!sku) continue;
  detailCodes.add(sku);
  if (!codeSet.has(sku)) errors.push(`Detay sayfası katalogda yok: ${sku}`);
}

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const modalInSitemap = [...sitemap.matchAll(/<loc>([^<]*\/urunlerimiz\/kt-[^<]+)<\/loc>/gi)].map((m) => m[1]);
if (modalInSitemap.length) errors.push(`Sitemap modal rotası içeriyor: ${modalInSitemap.slice(0, 3).join(', ')}`);

const modalOnly = codes.filter((code) => !detailCodes.has(code));
const result = {
  catalogModels: codes.length,
  indexedDetailPages: detailCodes.size,
  modalOnlyModels: modalOnly.length,
  noindexModalRoutes: loaderCodes.size,
  modalRoutesInSitemap: modalInSitemap.length,
  sampleModalOnly: modalOnly.slice(0, 12).map((code) => `${origin}/urunlerimiz/${code}/`),
  errors
};
console.log(JSON.stringify(result, null, 2));
if (errors.length) process.exit(1);
