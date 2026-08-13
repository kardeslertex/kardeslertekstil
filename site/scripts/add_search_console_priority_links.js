const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const target = path.join(root, 'bilgi-merkezi', 'index.html');
const marker = 'data-internal-links="search-console-priority-v1"';

const links = [
  ['is-kiyafeti-satin-alma-sureci-rehberi', 'İş kıyafeti satın alma süreci'],
  ['is-kiyafeti-sartname-hazirlama-rehberi', 'Teknik şartname hazırlama'],
  ['is-kiyafeti-tedarikci-karsilastirma-matrisi', 'Tedarikçi karşılaştırma matrisi'],
  ['tedarikci-performans-puan-karti-kalite-termin-maliyet', 'Tedarikçi performans puan kartı'],
  ['is-kiyafeti-sozlesmelerinde-sla-maddeleri', 'Sözleşme ve SLA maddeleri'],
  ['aksesuar-onay-karti-nasil-hazirlanir', 'Aksesuar onay kartı'],
  ['is-kiyafeti-beden-dagitim-plani', 'Beden dağıtım planı'],
  ['is-kiyafeti-teslimat-zimmet-akisi', 'Teslimat ve zimmet akışı'],
  ['calisana-is-kiyafeti-zimmet-sureci', 'Çalışana zimmet süreci'],
  ['is-kiyafeti-onarim-mi-degisim-mi', 'Onarım mı, değişim mi?'],
  ['acil-is-kiyafeti-siparis-plani', 'Acil sipariş planı'],
  ['ik-ve-satin-alma-ortak-is-kiyafeti-politikasi', 'İK ve satın alma ortak politikası'],
  ['iso-9001-is-kiyafeti-tedarik-standardi', 'ISO 9001 tedarik standardı'],
  ['is-tulumu-mu-bahcivan-tulumu-mu', 'İş tulumu mu, bahçıvan tulumu mu?'],
  ['alet-yelegi-secim-rehberi', 'Alet yeleği seçim rehberi'],
  ['afet-toplanma-alani-personeli-kiyafetleri', 'Afet toplanma alanı kıyafetleri'],
  ['aluminyum-profil-uretim-is-kiyafetleri', 'Alüminyum profil üretim kıyafetleri'],
  ['yol-yardim-cekici-personeli-is-kiyafetleri', 'Yol yardım personeli kıyafetleri'],
  ['2027-is-kiyafeti-trendleri-surdurulebilirlik-dayanim-gorunum', '2027 iş kıyafeti trendleri'],
];

const cards = links.map(([slug, label]) =>
  `<a class="local-product-card" href="${slug}/"><h3>${label}</h3><p>Uygulama adımlarını ve kontrol noktalarını inceleyin.</p><strong>Rehberi inceleyin &rarr;</strong></a>`
).join('');

const section = `<section class="local-section local-section-muted" ${marker}><div class="container"><div class="eyebrow eyebrow-accent">ÖNCELİKLİ REHBERLER</div><h2>Planlama, satın alma ve saha uygulaması</h2><p>Kurumsal iş kıyafeti sürecinde karar, kontrol ve uygulama adımlarını konu bazında inceleyin.</p><div class="local-product-grid">${cards}</div></div></section>`;

let html = fs.readFileSync(target, 'utf8');
if (html.includes(marker)) {
  html = html.replace(/<section class="local-section local-section-muted" data-internal-links="search-console-priority-v1">[\s\S]*?<\/section>/, section);
} else {
  const position = html.lastIndexOf('</main>');
  if (position < 0) throw new Error('Closing main tag was not found.');
  html = html.slice(0, position) + section + html.slice(position);
}
fs.writeFileSync(target, html, 'utf8');
console.log(`Priority links written: ${links.length}`);
