const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

function update(relativePath, replacements) {
  const file = path.join(root, relativePath);
  let html = fs.readFileSync(file, "utf8");
  replacements.forEach(([from, to]) => {
    if (!html.includes(from) && !html.includes(to)) {
      throw new Error(`${relativePath}: expected text not found: ${from.slice(0, 80)}`);
    }
    html = html.split(from).join(to);
  });
  fs.writeFileSync(file, html, "utf8");
}

update("is-kiyafeti/index.html", [
  ["İş Kıyafeti ve İş Elbisesi Üreticisi | Kardeşler Tekstil", "İş Elbiseleri ve İş Kıyafeti Üreticisi | Kardeşler Tekstil"],
  ["1982'den beri kurumsal iş kıyafeti üretiyoruz. İş pantolonu, tulum, tişört, yelek ve mont için logolu, kurumsal renklere özel toplu üretim.", "Kurumsal iş elbiseleri ve iş kıyafetleri üretiyoruz. Tişört, pantolon, tulum, polar, yelek ve montlarda özel model, logo ve toplu üretim."],
  ["1982'den beri Pendik / İstanbul'da kurumsal iş kıyafeti üretimi, logo uygulaması ve Türkiye geneli teslimat.", "Kurumsal iş elbiseleri için model, kumaş, beden, logo ve toplu üretim planlaması. Pendik / İstanbul'dan Türkiye geneli teslimat."],
  ["1982'den beri kurumsal ekipler için logolu ve özel üretim iş kıyafetleri.", "Kurumsal ekipler için logolu, özel üretim iş elbiseleri ve iş kıyafetleri."],
  ["İş Kıyafeti ve İş Elbisesi Üreticisi", "İş Elbiseleri ve İş Kıyafeti Üreticisi"],
  ["İş Kıyafeti ve İş Elbisesi Üretimi", "İş Elbiseleri ve İş Kıyafeti Üretimi"],
  ["1982'den beri kurumsal ekipler için iş kıyafeti üretimi, ürün türleri, seçim ölçütleri ve logo uygulamaları.", "Kurumsal ekipler için iş elbiseleri ve iş kıyafeti üretimi; ürün grupları, seçim ölçütleri, logo ve toplu üretim planlaması."],
  ["<a href=\"../urunlerimiz\">Tüm Ürünlerimiz</a>", "<a href=\"../urunlerimiz\">Tüm Ürünlerimiz</a><a href=\"../istanbul-is-elbiseleri/\">İstanbul İş Elbiseleri</a>"]
]);

update("personel-kiyafeti/index.html", [
  ["Personel Kıyafeti Modelleri | Kurumsal Ekip Giyimi", "Personel Kıyafetleri | Kurumsal Ekip Giyimi"],
  ["Departmanlara uygun personel kıyafeti çözümleri. Mağaza, servis, restoran, otel, temizlik, teknik ve saha ekipleri için logolu kurumsal giyim.", "Departman ve çalışma ortamına uygun personel kıyafetleri. Mağaza, servis, restoran, otel, teknik ve saha ekipleri için kurumsal renk ve logo seçenekleri."],
  ["Personel Kıyafeti Modelleri", "Kurumsal Personel Kıyafetleri"],
  ["Departman ve görev bazında planlanan kurumsal personel kıyafetleri.", "Departman, görev ve kurumsal kimliğe göre planlanan personel kıyafetleri."],
  ["<a href=\"../urunlerimiz\">Tüm Ürünlerimiz</a>", "<a href=\"../urunlerimiz\">Tüm Ürünlerimiz</a><a href=\"../istanbul-is-elbiseleri/\">İstanbul'da İş Elbiseleri</a>"]
]);

update("personel-kiyafeti-ureticisi/index.html", [
  ["<a href=\"../personel-kiyafeti/\">Personel Kıyafeti Modelleri</a>", "<a href=\"../personel-kiyafeti/\">Kurumsal Personel Kıyafetleri</a><a href=\"../is-kiyafeti/\">İş Elbiseleri ve İş Kıyafetleri</a>"]
]);

update("istanbul-is-elbiseleri/index.html", [
  ["<a href=\"../tuzla-is-elbiseleri/\">Tuzla İş Elbiseleri</a>", "<a href=\"../tuzla-is-elbiseleri/\">Tuzla İş Elbiseleri</a><a href=\"../is-kiyafeti/\">İş Elbiseleri ve İş Kıyafetleri</a><a href=\"../personel-kiyafeti/\">Kurumsal Personel Kıyafetleri</a>"]
]);

console.log("Commercial landing pages optimized without creating duplicate content.");
