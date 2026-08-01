import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const bilgiDir = path.join(root, "bilgi-merkezi");
const knowledgeJs = path.join(bilgiDir, "knowledge-center.js");

const replacements = [
  ["Yonetimi", "Yönetimi"],
  ["Yonetim", "Yönetim"],
  ["yonetimi", "yönetimi"],
  ["yonetim", "yönetim"],
  ["yoneten", "yöneten"],
  ["yonetimini", "yönetimini"],
  ["yonetimde", "yönetimde"],
  ["yonetin", "yönetin"],
  ["Sureci", "Süreci"],
  ["sureci", "süreci"],
  ["Sureclerini", "Süreçlerini"],
  ["sureclerini", "süreçlerini"],
  ["Surecinde", "Sürecinde"],
  ["surecinde", "sürecinde"],
  ["Sartname", "Şartname"],
  ["sartname", "şartname"],
  ["Hazirlanir", "Hazırlanır"],
  ["hazirlanir", "hazırlanır"],
  ["Karsilastirma", "Karşılaştırma"],
  ["karsilastirma", "karşılaştırma"],
  ["Karsilastirin", "Karşılaştırın"],
  ["karsilastirin", "karşılaştırın"],
  ["karsilastirip", "karşılaştırıp"],
  ["Gorunum", "Görünüm"],
  ["gorunum", "görünüm"],
  ["Gorunurluk", "Görünürlük"],
  ["gorunurluk", "görünürlük"],
  ["Surdurulebilirlik", "Sürdürülebilirlik"],
  ["surdurulebilirlik", "sürdürülebilirlik"],
  ["Sozlesmelerinde", "Sözleşmelerinde"],
  ["sozlesmelerinde", "sözleşmelerinde"],
  ["olculebilir", "ölçülebilir"],
  ["Olculebilir", "Ölçülebilir"],
  ["netlestirip", "netleştirip"],
  ["netlestirin", "netleştirin"],
  ["Gecmis", "Geçmiş"],
  ["gecmis", "geçmiş"],
  ["farklilik", "farklılık"],
  ["farkliliklarini", "farklılıklarını"],
  ["Yazlik", "Yazlık"],
  ["yazlik", "yazlık"],
  ["Kislik", "Kışlık"],
  ["kislik", "kışlık"],
  ["Disinda", "Dışında"],
  ["disinda", "dışında"],
  ["Yikama", "Yıkama"],
  ["yikama", "yıkama"],
  ["onarim", "onarım"],
  ["kaybi", "kaybı"],
  ["yukunu", "yükünü"],
  ["dogru", "doğru"],
  ["satin alma", "satın alma"],
  ["Satin alma", "Satın alma"],
  ["Satin Alma", "Satın Alma"],
  ["alin", "alın"],
  ["Sonrasi", "Sonrası"],
  ["sonrasi", "sonrası"],
  ["donme", "dönme"],
  ["sikligi", "sıklığı"],
  ["planini", "planını"],
  ["Politikasi", "Politikası"],
  ["politikasi", "politikası"],
  ["Sablonu", "Şablonu"],
  ["sablonu", "şablonu"],
  ["Ayni", "Aynı"],
  ["ayni", "aynı"],
  ["butce", "bütçe"],
  ["dokuman", "doküman"],
  ["birlestirin", "birleştirin"],
  ["Yuksek", "Yüksek"],
  ["yuksek", "yüksek"],
  ["Sicaklikta", "Sıcaklıkta"],
  ["sicaklikta", "sıcaklıkta"],
  ["Calisan", "Çalışan"],
  ["calisan", "çalışan"],
  ["Kumas", "Kumaş"],
  ["kumas", "kumaş"],
  ["Secimi", "Seçimi"],
  ["secimi", "seçimi"],
  ["Soguk", "Soğuk"],
  ["soguk", "soğuk"],
  ["dis", "dış"],
  ["isi yonetimi", "ısı yönetimi"],
  ["Icin", "İçin"],
  ["icin", "için"],
  ["Sube", "Şube"],
  ["sube", "şube"],
  ["Urun", "Ürün"],
  ["urun", "ürün"],
  ["Uretim", "Üretim"],
  ["uretim", "üretim"],
  ["Olcu", "Ölçü"],
  ["olcu", "ölçü"],
  ["Hizli", "Hızlı"],
  ["hizli", "hızlı"],
  ["Degisim", "Değişim"],
  ["degisim", "değişim"],
  ["Deger", "Değer"],
  ["deger", "değer"],
  ["Gore", "Göre"],
  ["gore", "göre"],
  ["Yaziyi Oku", "Yazıyı Oku"],
  ["Yaziyi", "Yazıyı"],
  ["kullanim", "kullanım"],
  ["takvimi", "takvimi"],
  ["Kapilari", "Kapıları"],
  ["kapilari", "kapıları"],
  ["oncesi", "öncesi"],
  ["onleyin", "önleyin"],
  ["girisi", "girişi"],
  ["giris", "giriş"],
  ["iyilestirme", "iyileştirme"],
  ["duzenli", "düzenli"],
  ["uzerinden", "üzerinden"],
  ["haftalik", "haftalık"],
  ["performansini", "performansını"],
  ["is kiyafeti", "iş kıyafeti"],
  ["Is kiyafeti", "İş kıyafeti"],
  ["Is Kiyafeti", "İş Kıyafeti"],
  ["kapi", "kapı"]
  , ["yaklasimiyla", "yaklaşımıyla"]
  , ["gorev", "görev"]
  , ["noktasi", "noktası"]
  , ["kayit", "kayıt"]
  , ["surekli", "sürekli"]
  , ["siparis", "sipariş"]
  , ["akislarini", "akışlarını"]
  , ["catida", "çatıda"]
  , ["uygulayin", "uygulayın"]
  , ["tuketim", "tüketim"]
  , ["dagilimi", "dağılımı"]
  , ["sapmasini", "sapmasını"]
  , ["dusurun", "düşürün"]
  , ["gecislerinde", "geçişlerinde"]
  , ["hizini", "hızını"]
  , ["artirmak", "artırmak"]
  , ["stogu", "stoğu"]
  , ["kurallarini", "kurallarını"]
  , ["onayi", "onayı"]
  , ["adimlarini", "adımlarını"]
  , ["hatalari", "hataları"]
  , ["yanlis", "yanlış"]
  , ["dusuk", "düşük"]
  , ["kalip", "kalıp"]
  , ["kilavuzu", "kılavuzu"]
  , ["sicak", "sıcak"]
  , ["alanlarinda", "alanlarında"]
  , ["gecirgenligi", "geçirgenliği"]
  , ["sahalarinda", "sahalarında"]
  , ["capraz", "çapraz"]
  , ["bulasmayi", "bulaşmayı"]
  , ["frekansi", "frekansı"]
  , ["odakli", "odaklı"]
  , ["sicrama", "sıçrama"]
  , ["siniflandirip", "sınıflandırıp"]
  , ["bakim", "bakım"]
  , ["olusturun", "oluşturun"]
  , ["surtunme", "sürtünme"]
  , ["kaldirma", "kaldırma"]
  , ["ihtiyaclarina", "ihtiyaçlarına"]
  , ["dayanim", "dayanım"]
  , ["hazirlayin", "hazırlayın"]
  , ["tedarikcilerini", "tedarikçilerini"]
  , ["hizi", "hızı"]
  , ["gostergeleriyle", "göstergeleriyle"]
  , ["yonetmek", "yönetmek"]
  , ["guvenligini", "güvenliğini"]
  , ["dayali", "dayalı"]
  , ["gorunurlugu", "görünürlüğü"]
  , ["yapida", "yapıda"]
  , ["hizlandirin", "hızlandırın"]
  , ["agaci", "ağacı"]
  , ["degiskenlerine", "değişkenlerine"]
  , ["karari", "kararı"]
  , ["standartlastirma", "standartlaştırma"]
  , ["citcit", "çıtçıt"]
  , ["secimlerini", "seçimlerini"]
  , ["standartlastirarak", "standartlaştırarak"]
  , ["oynakligini", "oynaklığını"]
  , ["onleme", "önleme"]
  , ["karisimlarini", "karışımlarını"]
  , ["onlemek", "önlemek"]
  , ["dogrulama", "doğrulama"]
  , ["cift", "çift"]
  , ["tasarim", "tasarım"]
  , ["ceviren", "çeviren"]
  , ["dongusu", "döngüsü"]
  , ["subeler", "şubeler"]
  , ["arasi", "arası"]
  , ["kurallariyla", "kurallarıyla"]
  , ["yukseltin", "yükseltin"]
  , ["sorumlulugu", "sorumluluğu"]
  , ["siklik", "sıklık"]
  , ["yazili", "yazılı"]
  , ["aylik", "aylık"]
  , ["toplanti", "toplantı"]
  , ["gundemi", "gündemi"]
  , ["belirsizligini", "belirsizliğini"]
  , ["arasinda", "arasında"]
  , ["omrunu", "ömrünü"]
  , ["cevrimi", "çevrimi"]
  , ["kaydina", "kaydına"]
  , ["kararlarini", "kararlarını"]
  , ["gunde", "günde"]
  , ["onceliklendirin", "önceliklendirin"]
  , ["kazanclar", "kazançlar"]
  , ["Gunluk", "Günlük"]
  , ["gunluk", "günlük"]
  , ["Omru", "Ömrü"]
  , ["Izleme", "İzleme"]
  , ["Uretime", "Üretime"]
  , ["Uretim", "Üretim"]
  , ["Tasarimi", "Tasarımı"]
  , ["Oranini", "Oranını"]
  , ["Dusuren", "Düşüren"]
  , ["Sicrama", "Sıçrama"]
  , ["Karti", "Kartı"]
  , ["Gorunurlugu", "Görünürlüğü"]
  , ["Agaci", "Ağacı"]
  , ["Iyilestirme", "İyileştirme"]
];

function applyWordSafe(text, from, to) {
  const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(?<![A-Za-z0-9-])${escaped}(?![A-Za-z0-9-])`, "g");
  return text.replace(re, to);
}

function fixText(text) {
  let out = text;
  for (const [from, to] of replacements) {
    out = applyWordSafe(out, from, to);
  }

  // Fix known false-positives from broad transliteration rules.
  out = out
    .replace(/\bSonuçu\b/g, "Sonucu")
    .replace(/\bsonuçu\b/g, "sonucu")
    .replace(/\bsatın\s+(kolon|sütun|kenar)\b/g, "satin $1");

  // Phrase-level cleanups for the newest generated posts.
  out = out
    .replace(/IK ve/g, "İK ve")
    .replace(/Iade/g, "İade")
    .replace(/Degisim/g, "Değişim")
    .replace(/Onayi/g, "Onayı")
    .replace(/Sonrasi/g, "Sonrası")
    .replace(/Gecis/g, "Geçiş")
    .replace(/Izlenebilirlik/g, "İzlenebilirlik")
    .replace(/Bazli/g, "Bazlı")
    .replace(/Calisan/g, "Çalışan")
    .replace(/Kiyafet/g, "Kıyafet")
    .replace(/kıyafet yonetimi/g, "kıyafet yönetimi")
    .replace(/yonetiminde/g, "yönetiminde")
    .replace(/Yonetiminde/g, "Yönetiminde");

  return out;
}

function listArticleFiles(dir) {
  const out = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...listArticleFiles(full));
      continue;
    }
    if (entry.isFile() && entry.name === "index.html") {
      out.push(full);
    }
  }
  return out;
}

function processHtmlFile(filePath) {
  const original = fs.readFileSync(filePath, "utf8");

  const parts = original.split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>)/gi);
  const processed = parts
    .map((chunk) => {
      if (/^<script/i.test(chunk) || /^<style/i.test(chunk)) {
        return chunk;
      }

      let next = chunk;

      // Visible text nodes only.
      next = next.replace(/>([^<]+)</g, (m, inner) => `>${fixText(inner)}<`);

      // User-facing attributes.
      next = next.replace(/\b(alt|title|aria-label)=("([^"]*)"|'([^']*)')/gi, (m, attr, quoted, dq, sq) => {
        const val = dq ?? sq ?? "";
        const fixed = fixText(val);
        const q = quoted[0];
        return `${attr}=${q}${fixed}${q}`;
      });

      // Meta descriptions/titles (skip URL-like content).
      next = next.replace(/content=("([^"]*)"|'([^']*)')/gi, (m, quoted, dq, sq) => {
        const val = dq ?? sq ?? "";
        if (/^https?:\/\//i.test(val) || val.includes("kardeslertekstil.com.tr") || val.startsWith("/")) {
          return m;
        }
        const fixed = fixText(val);
        const q = quoted[0];
        return `content=${q}${fixed}${q}`;
      });

      return next;
    })
    .join("");

  if (processed !== original) {
    fs.writeFileSync(filePath, processed, "utf8");
    return true;
  }
  return false;
}

function processKnowledgeCenterJs(filePath) {
  const original = fs.readFileSync(filePath, "utf8");
  let next = original;

  next = next.replace(/(title:\s*")([^"]*)(")/g, (_, a, text, b) => `${a}${fixText(text)}${b}`);
  next = next.replace(/(summary:\s*")([^"]*)(")/g, (_, a, text, b) => `${a}${fixText(text)}${b}`);

  next = next.replace(/(searchTerms:\s*\[)([^\]]*)(\])/g, (_, a, body, b) => {
    const fixedBody = body.replace(/"([^"]*)"/g, (m, term) => {
      // Keep slug-like search terms ASCII.
      if (/^[a-z0-9-]+$/.test(term)) {
        return m;
      }
      return `"${fixText(term)}"`;
    });
    return `${a}${fixedBody}${b}`;
  });

  if (next !== original) {
    fs.writeFileSync(filePath, next, "utf8");
    return true;
  }
  return false;
}

const articleFiles = listArticleFiles(bilgiDir);
let changedHtml = 0;
for (const file of articleFiles) {
  if (processHtmlFile(file)) changedHtml += 1;
}

const changedJs = processKnowledgeCenterJs(knowledgeJs) ? 1 : 0;

console.log(JSON.stringify({
  scannedHtml: articleFiles.length,
  changedHtml,
  changedKnowledgeCenterJs: changedJs
}, null, 2));
