import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source = fs.readFileSync(new URL('../site/catalog.js', import.meta.url), 'utf8');
const lookup = source.slice(source.indexOf('  function catById('), source.indexOf('  function productPath('));
const routing = source.slice(source.indexOf('  var filterHashPrefix ='), source.indexOf('  /* Sayfa #kategori'));
for (const [hash, search, expected] of [
  ['', '', []],
  ['#filtre?kategori=pantolon', '', ['pantolon']],
  ['', '?kategori=sweat', ['sweat']],
  ['#filtre?kategori=unknown', '', []],
  ['#filtre?esd=1', '', ['esd']],
]) {
  test(`catalog routing initializes safely: ${hash || search || 'default'}`, () => {
    const scrolled = [];
    const context = { URLSearchParams, CATALOG: [{id:'pantolon'}, {id:'sweat'}, {id:'esd'}],
      location: {hash, search}, history: {replaceState(){}},
      scrollCategoryToStart: id => scrolled.push(id) };
    vm.runInNewContext(lookup + routing, context);
    assert.deepEqual(scrolled, expected);
  });
}
test('404 recovery links and local assets work at nested missing URLs', () => {
  const html = fs.readFileSync(new URL('../site/404.html', import.meta.url), 'utf8');
  const attrs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map(m => m[1]);
  const base = 'https://kardeslertekstil.com.tr/missing/deep/path/';
  for (const value of attrs) {
    if (/^(https?:|mailto:|#)/.test(value)) continue;
    assert.ok(value.startsWith('/'), `relative recovery URL: ${value}`);
    assert.ok(!new URL(value, base).pathname.startsWith('/missing/'));
  }
  assert.ok(attrs.includes('/urunlerimiz/'));
});
