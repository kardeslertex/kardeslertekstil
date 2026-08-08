const fs = require('fs');
const path = require('path');
const center = path.resolve(__dirname, '..', 'bilgi-merkezi');
const items = [
 ['tamir-edilebilir-is-kiyafeti-tasarimi','Tamir Edilebilir İş Kıyafeti Nasıl Tasarlanır?','is-kiyafeti-numune-onay-akisi'],
 ['polar-is-kiyafetlerinde-lif-dokulmesi-kontrolu','Polar İş Kıyafetlerinde Lif Dökülmesi Nasıl Kontrol Edilir?','polar-kumas-nedir'],
 ['duyusal-konfor-odakli-is-kiyafeti','Duyusal Konfor Odaklı İş Kıyafeti Tasarımı','is-guvenligi-kiyafetlerinde-beden-ergonomi'],
 ['is-kiyafeti-pilot-giyim-testi','İş Kıyafeti Pilot Giyim Testi Nasıl Yapılır?','beden-seti-size-set-numunesi'],
 ['is-kiyafeti-kullanim-sonu-ayristirma-rehberi','İş Kıyafetinde Kullanım Sonu Ayırma Rehberi','dayanikli-is-kiyafeti-surdurulebilirlik'],
 ['kapsul-is-gardirobu-planlama','Kapsül İş Gardırobu Nasıl Planlanır?','dort-mevsim-is-kiyafeti-planlama-rehberi'],
 ['is-kiyafeti-iade-lojistigi','İş Kıyafeti İade Lojistiği Nasıl Kurulur?','calisana-is-kiyafeti-zimmet-sureci'],
 ['vardiya-dolabi-is-kiyafeti-standardi','Vardiya Dolabında İş Kıyafeti Düzeni Nasıl Kurulur?','is-kiyafeti-barkod-etiketleme'],
 ['moduler-is-kiyafeti-sistemi','Modüler İş Kıyafeti Sistemi Nasıl Tasarlanır?','citcit-dugme-cirt-bant-secimi'],
 ['isi-yukunu-azaltan-is-kiyafeti-tasarimi','Isı Yükünü Azaltan İş Kıyafeti Tasarımı','is-kiyafetinde-havalandirma-panelleri']
];
const title = Object.fromEntries(items.map(x => [x[0],x[1]]));
for (let i=0; i<items.length; i++) {
  const [slug,,existing] = items[i];
  const file = path.join(center,slug,'index.html');
  let html = fs.readFileSync(file,'utf8');
  const guides = [existing,items[(i+1)%10][0],items[(i+2)%10][0],items[(i+3)%10][0]];
  const nav = `<nav class="knowledge-related-links" aria-label="İlgili rehberler">${guides.map(s=>`<a data-link-role="guide" href="../${s}/">${title[s] || s.replaceAll('-',' ')}</a>`).join('')}</nav>`;
  html = html.replace(/<nav class="knowledge-related-links" aria-label="İlgili rehberler">.*?<\/nav>/s,nav);
  html = html.replace(/<a data-link-role="product".*?<\/a>/s,'<a data-link-role="product" href="../../urunlerimiz/"><strong>İlgili iş kıyafeti modelleri</strong><span>Teknik model ve üretim ayrıntılarını inceleyin.</span></a>');
  html = html.replace('<span>7 dk okuma</span>', '<span>5 dk okuma</span>');
  fs.writeFileSync(file,html,'utf8');
}
console.log('Bağlantı blokları düzeltildi.');
