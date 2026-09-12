import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../site/catalog.js', import.meta.url), 'utf8').replace(/\r\n/g, '\n');
function block(start, end) {
  const first = source.indexOf(start);
  const last = source.indexOf(end, first);
  assert.ok(first >= 0 && last > first, `missing source boundaries: ${start}`);
  return source.slice(first, last);
}
function image() {
  const attrs = new Map();
  return {
    dataset: { src: 'assets/products/example.webp' },
    naturalWidth: 1536, naturalHeight: 1024, clientWidth: 300, clientHeight: 375,
    style: { setProperty() {} },
    getAttribute: name => attrs.get(name) ?? null,
    hasAttribute: name => attrs.has(name),
    removeAttribute: name => attrs.delete(name),
    set src(value) { attrs.set('src', value); },
  };
}

test('scrolling through the whole catalog retains only nearby image sources and permits revisits', () => {
  let notify;
  const context = {
    window: { IntersectionObserver: true },
    IntersectionObserver: class { constructor(callback) { notify = callback; } },
  };
  vm.runInNewContext(block('  function loadCatalogImage(', '  var modelDetailUrls ='), context);
  const images = Array.from({ length: 398 }, image);
  for (let i = 0; i < images.length; i++) {
    notify(images.map((target, j) => ({ target, isIntersecting: Math.abs(j - i) <= 2 })));
    assert.ok(images.filter(img => img.hasAttribute('src')).length <= 5);
  }
  notify([{ target: images[0], isIntersecting: true }]);
  assert.equal(images[0].getAttribute('src'), images[0].dataset.src);
});

test('native lazy-loading fallback can assign a source without IntersectionObserver', () => {
  const context = { window: {} };
  vm.runInNewContext(block('  function loadCatalogImage(', '  var modelDetailUrls ='), context);
  const img = image();
  context.loadCatalogImage(img);
  assert.equal(img.getAttribute('src'), img.dataset.src);
});

test('a hidden card does not perpetually schedule animation frames', () => {
  const context = { requestAnimationFrame() { assert.fail('hidden card requested another frame'); } };
  vm.runInNewContext(block('  function applyProductFit(', '  var productBoundsCache ='), context);
  const img = image();
  img.clientWidth = img.clientHeight = 0;
  context.applyProductFit(img, { cat: 'tshirt' }, { left: 0, top: 0, right: 1, bottom: 1 });
});

test('revisiting an image reuses its bounds and cancels work for unloaded images', () => {
  const pending = [];
  let scans = 0;
  let fits = 0;
  const context = {
    window: { setTimeout: fn => pending.push(fn) },
    productBounds() { scans++; return { left: 0, top: 0, right: 1, bottom: 1 }; },
    applyProductFit() { fits++; },
  };
  vm.runInNewContext(block('  var productBoundsCache =', '  function normalizeProductScale('), context);
  const img = image();
  const item = { src: img.dataset.src };
  img.src = item.src;
  context.scheduleProductFit(img, item);
  context.scheduleProductFit(img, item);
  assert.equal(pending.length, 1);
  pending.shift()();
  context.scheduleProductFit(img, item);
  pending.shift()();
  assert.equal(scans, 1);
  assert.equal(fits, 2);
  context.scheduleProductFit(img, item);
  img.removeAttribute('src');
  pending.shift()();
  assert.equal(fits, 2);
});

test('category jumps bypass smooth CSS before any animation-frame image work', () => {
  const scrolls = [];
  const section = {
    classList: { contains: name => name === 'catalog-section' },
    scrollIntoView: options => scrolls.push(options),
  };
  const context = {
    document: { getElementById: () => section },
    updateCatalogScrollOffset() {}, resetCatalogScrollContainers() {}, setActive() {},
    requestAnimationFrame() { assert.fail('category navigation was deferred'); },
  };
  vm.runInNewContext(block('  function scrollCategoryToStart(', '  navLinks.forEach(function (link) {\n    link.addEventListener'), context);
  assert.equal(context.scrollCategoryToStart('esd'), true);
  assert.equal(scrolls.length, 1);
  assert.equal(scrolls[0].behavior, 'instant');
  assert.equal(scrolls[0].block, 'start');
});

test('closing the product dialog releases its full-size image', () => {
  const img = image();
  img.src = img.dataset.src;
  const context = {
    lb: { classList: { remove() {} }, setAttribute() {} }, lbImg: img,
    document: { body: { style: {} } }, lastTrigger: null,
    window: { location: { pathname: '/urunlerimiz/' } },
  };
  vm.runInNewContext(block('  function closeLightbox(', '  function step(dir)'), context);
  context.closeLightbox();
  assert.equal(img.hasAttribute('src'), false);
});
