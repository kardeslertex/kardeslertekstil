const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const oldSlug = 'is-kiyafeti-teknik-sartnamesi-nasil-hazirlanir';
const newSlug = 'is-kiyafeti-sartname-hazirlama-rehberi';
const oldPath = `/bilgi-merkezi/${oldSlug}/`;
const newPath = `/bilgi-merkezi/${newSlug}/`;
const oldUrl = `https://kardeslertekstil.com.tr${oldPath}`;
const newUrl = `https://kardeslertekstil.com.tr${newPath}`;

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === '.git' || entry.name === '_inceleme_v14' || entry.name === 'hero-archive') return [];
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const retiredFile = path.join(root, 'bilgi-merkezi', oldSlug, 'index.html');
let changedLinks = 0;
for (const file of walk(root)) {
  if (file === retiredFile || path.extname(file).toLowerCase() !== '.html') continue;
  let html = fs.readFileSync(file, 'utf8');
  const before = html;
  html = html.replaceAll(`../${oldSlug}/`, `../${newSlug}/`)
    .replaceAll(`bilgi-merkezi/${oldSlug}/`, `bilgi-merkezi/${newSlug}/`)
    .replaceAll(`href="${oldSlug}/"`, `href="${newSlug}/"`);
  if (html !== before) {
    fs.writeFileSync(file, html, 'utf8');
    changedLinks++;
  }
}

const indexFile = path.join(root, 'bilgi-merkezi', 'index.html');
let index = fs.readFileSync(indexFile, 'utf8');
index = index.replace(new RegExp(`<article class="knowledge-card" data-post-slug="${oldSlug}">[\\s\\S]*?<\\/article>\\s*`, 'g'), '');
fs.writeFileSync(indexFile, index, 'utf8');

const registryFile = path.join(root, 'bilgi-merkezi', 'knowledge-center.js');
let registry = fs.readFileSync(registryFile, 'utf8');
registry = registry.split(/\r?\n/).filter((line) => !line.includes(`slug: "${oldSlug}"`)).join('\n');
fs.writeFileSync(registryFile, registry, 'utf8');

const redirectHtml = `<!doctype html><html lang="tr"><head><meta charset="utf-8"><title>Sayfa taşındı</title><meta name="robots" content="noindex,follow"><link rel="canonical" href="${newUrl}"><meta http-equiv="refresh" content="0;url=${newUrl}"></head><body><p>Bu rehber <a href="${newPath}">güncel iş kıyafeti şartname hazırlama rehberinde</a> birleştirildi.</p></body></html>\n`;
fs.writeFileSync(retiredFile, redirectHtml, 'utf8');

const redirectsFile = path.join(root, '_redirects');
let redirects = fs.readFileSync(redirectsFile, 'utf8');
const redirectRule = `${oldPath} ${newPath} 308`;
if (!redirects.includes(redirectRule)) redirects = `${redirectRule}\n${redirects}`;
fs.writeFileSync(redirectsFile, redirects, 'utf8');

const workerFile = path.join(root, '_worker.js');
let worker = fs.readFileSync(workerFile, 'utf8');
const workerRule = `  ["${oldPath.slice(0, -1)}", "${newPath}"],`;
if (!worker.includes(workerRule)) {
  worker = worker.replace('const LEGACY_PATHS = new Map([', `const LEGACY_PATHS = new Map([\n${workerRule}`);
}
fs.writeFileSync(workerFile, worker, 'utf8');

const sitemapFile = path.join(root, 'sitemap.xml');
let sitemap = fs.readFileSync(sitemapFile, 'utf8');
const escaped = oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
sitemap = sitemap.replace(new RegExp(`\\s*<url><loc>${escaped}<\\/loc><lastmod>[^<]+<\\/lastmod><\\/url>`), '');
fs.writeFileSync(sitemapFile, sitemap, 'utf8');

console.log(JSON.stringify({ changedHtmlFiles: changedLinks, retired: oldUrl, canonical: newUrl }));
