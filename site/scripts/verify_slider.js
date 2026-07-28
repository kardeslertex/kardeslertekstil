const fs = require('fs');
const vm = require('vm');
const path = require('path');

const prodPath = path.join(__dirname, '..', 'products.js');
const content = fs.readFileSync(prodPath, 'utf8');
const sandbox = { window: {} };
try {
  vm.runInNewContext(content, sandbox, { timeout: 1000 });
} catch (e) {
  console.error('Error evaluating products.js:', e.message);
  process.exit(2);
}
const KATALOG = sandbox.window.KATALOG;
if (!Array.isArray(KATALOG)) { console.error('KATALOG not found'); process.exit(2); }

function makeIds(katalog) {
  const GALLERY_PATH = 'assets/products/gallery/';
  const ids = [];
  katalog.forEach(cat => {
    const groups = cat.gruplar ? cat.gruplar : [{ baseName: cat.baseName, urunler: cat.urunler }];
    groups.forEach(group => {
      const list = group.urunler || group.items || [];
      list.forEach((raw, idx) => {
        const p = (typeof raw === 'string') ? { img: raw } : raw;
        if (!p || !p.img) return;
        const src = GALLERY_PATH + (cat.id || 'unknown') + '/' + p.img;
        const fname = src.split('/').pop().replace(/\.[^/.]+$/, '');
        const safe = (cat.id || 'cat') + '-' + fname.replace(/[^a-z0-9\-]/gi, '-').toLowerCase();
        ids.push({ id: 'product-' + safe, src: src, name: p.name || '', cat: cat.id });
      });
    });
  });
  return ids;
}

const ids = makeIds(KATALOG);
console.log('Total product entries found:', ids.length);
const map = {};
ids.forEach(it => { map[it.id] = map[it.id] || []; map[it.id].push(it); });
const dup = Object.keys(map).filter(k => map[k].length > 1);
console.log('Unique anchor ids:', Object.keys(map).length);
console.log('Duplicates count:', dup.length);
if (dup.length) {
  console.log('Sample duplicates:');
  dup.slice(0,20).forEach(k => { console.log(k, '->', map[k].map(x=>x.src).join(', ')); });
}

console.log('\nSample anchors (first 30):');
ids.slice(0,30).forEach(it => console.log('#' + it.id, it.src));

// check any id contains uppercase or spaces
const bad = Object.keys(map).filter(k => /[A-Z\s]/.test(k));
console.log('\nBad id patterns (uppercase/space):', bad.length);
if (bad.length) { console.log(bad.slice(0,20).join('\n')); }

process.exit(0);
