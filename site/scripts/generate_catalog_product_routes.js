const fs = require("fs");
const path = require("path");
const vm = require("vm");

const siteRoot = path.resolve(__dirname, "..");
const routeRoot = path.join(siteRoot, "urunlerimiz");
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(siteRoot, "products.js"), "utf8"), context);

function pad3(value) {
  return String(value).padStart(3, "0");
}

function catalogCodes() {
  const codes = [];
  context.window.KATALOG.forEach((category) => {
    const groups = category.gruplar || [{ prefix: category.prefix, urunler: category.urunler }];
    const reserved = new Set();
    const nextByPrefix = {};

    groups.forEach((group) => group.urunler.forEach((raw) => {
      if (typeof raw !== "string" && raw.code) reserved.add(raw.code);
    }));

    groups.forEach((group) => group.urunler.forEach((raw) => {
      if (typeof raw !== "string" && raw.code) {
        codes.push(raw.code);
        return;
      }
      let next = nextByPrefix[group.prefix] || category.codeStart || 1;
      let code = `${group.prefix}-${pad3(next)}`;
      while (reserved.has(code)) code = `${group.prefix}-${pad3(++next)}`;
      reserved.add(code);
      nextByPrefix[group.prefix] = next + 1;
      codes.push(code);
    }));
  });
  return [...new Set(codes)].sort();
}

const loader = `<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>Ürün yükleniyor | Kardeşler Tekstil</title><script>fetch('/urunlerimiz').then(function(r){if(!r.ok)throw new Error('Katalog yüklenemedi');return r.text()}).then(function(html){html=html.replace(/<head>/i,'<head><base href="/">');document.open();document.write(html);document.close()}).catch(function(){location.replace('/urunlerimiz')})<\/script></head><body><p>Ürün yükleniyor…</p></body></html>\n`;

fs.mkdirSync(routeRoot, { recursive: true });
const expected = new Set();
catalogCodes().forEach((code) => {
  const slug = code.toLowerCase();
  expected.add(slug);
  const directory = path.join(routeRoot, slug);
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, "index.html"), loader, "utf8");
});

fs.readdirSync(routeRoot, { withFileTypes: true }).forEach((entry) => {
  if (!entry.isDirectory() || expected.has(entry.name)) return;
  if (!/^kt-[a-z]{2}-\d{3}$/.test(entry.name)) return;
  fs.rmSync(path.join(routeRoot, entry.name), { recursive: true, force: true });
});

console.log(`${expected.size} katalog ürün rotası oluşturuldu.`);
