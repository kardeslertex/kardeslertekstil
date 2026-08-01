const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CENTER = path.join(ROOT, 'bilgi-merkezi');

const replacements = {
  'Cekme':'Çekme','cekme':'çekme','Sapmasi':'Sapması','sapmasi':'sapması','dagitim':'dağıtım','Dagitim':'Dağıtım',
  'tedarikci':'tedarikçi','Tedarikci':'Tedarikçi','tedarikciler':'tedarikçiler','tedarikcilerde':'tedarikçilerde',
  'tedarikciye':'tedarikçiye','tedarikcide':'tedarikçide','tedarikciyi':'tedarikçiyi','tedarikcinin':'tedarikçinin',
  'urun':'ürün','Urun':'Ürün','urunler':'ürünler','urunlerin':'ürünlerin','urunu':'ürünü','urunun':'ürünün','urunde':'üründe',
  'uretim':'üretim','Uretim':'Üretim','uretime':'üretime','uretimde':'üretimde','uretiminde':'üretiminde',
  'olcu':'ölçü','Olcu':'Ölçü','olculer':'ölçüler','olcusu':'ölçüsü','olcumu':'ölçümü',
  'surec':'süreç','Surec':'Süreç','sureci':'süreci','surecin':'sürecin','surecini':'sürecini','surecinde':'sürecinde','surecinizi':'sürecinizi',
  'yonetim':'yönetim','Yonetim':'Yönetim','yonetimi':'yönetimi','yonetimini':'yönetimini','yonetimde':'yönetimde','yonetime':'yönetime','yonetin':'yönetin','yonetilir':'yönetilir',
  'icin':'için','Icin':'İçin','nasil':'nasıl','Nasil':'Nasıl','cok':'çok','Cok':'Çok','sik':'sık','Sik':'Sık',
  'dikis':'dikiş','Dikis':'Dikiş','dikisi':'dikişi','kumas':'kumaş','Kumas':'Kumaş','kumasi':'kumaşı',
  'gorunurluk':'görünürlük','Gorunurluk':'Görünürlük','bakim':'bakım','Bakim':'Bakım','degisim':'değişim','Degisim':'Değişim',
  'calisan':'çalışan','Calisan':'Çalışan','calisana':'çalışana','calisanlar':'çalışanlar','calisanin':'çalışanın',
  'soguk':'soğuk','Soguk':'Soğuk','yuksek':'yüksek','Yuksek':'Yüksek','yikama':'yıkama','Yikama':'Yıkama',
  'cozum':'çözüm','Cozum':'Çözüm','cozumler':'çözümler','ozellik':'özellik','Ozellik':'Özellik','ozel':'özel','Ozel':'Özel',
  'guvenlik':'güvenlik','Guvenlik':'Güvenlik','guvenceye':'güvenceye','karsilastirma':'karşılaştırma','Karsilastirma':'Karşılaştırma',
  'farki':'farkı','Farki':'Farkı','oncesi':'öncesi','Oncesi':'Öncesi','sonrasi':'sonrası','Sonrasi':'Sonrası','donme':'dönme',
  'gecis':'geçiş','gecisi':'geçişi','gecislerini':'geçişlerini','donusum':'dönüşüm','Donusum':'Dönüşüm',
  'plani':'planı','Plani':'Planı','planini':'planını','planlanmasi':'planlanması','kurgulayin':'kurgulayın','kurgulanmis':'kurgulanmış',
  'bagimliligi':'bağımlılığı','bagli':'bağlı','baglantisi':'bağlantısı','senaryolari':'senaryoları','adim':'adım','adimi':'adımı','adimlar':'adımlar','adimlari':'adımları','adimlarla':'adımlarla','adimlarinda':'adımlarında',
  'gelisim':'gelişim','gelisimi':'gelişimi','gelistirme':'geliştirme','gelistirin':'geliştirin','dogru':'doğru','Dogru':'Doğru','hiz':'hız','Hiz':'Hız',
  'uygulamayi':'uygulamayı','uygulamasi':'uygulaması','uygulamasini':'uygulamasını','prosedure':'prosedüre','prosedur':'prosedür','dondurmeniz':'döndürmeniz','onerilir':'önerilir',
  'Uygulamayi':'Uygulamayı','senaryolari':'senaryoları','performansi':'performansı','orani':'oranı','dogrulugu':'doğruluğu','omru':'ömrü',
  'uygunlugu':'uygunluğu','uygunlugunu':'uygunluğunu','dogrulayin':'doğrulayın','Dogrulayin':'Doğrulayın','karsi':'karşı','aksama':'aksama','onceden':'önceden',
  'farkli':'farklı','Farkli':'Farklı','referansi':'referansı','standartlastirin':'standartlaştırın','standartlastirma':'standartlaştırma',
  'cerceve':'çerçeve','Cerceve':'Çerçeve','cercevede':'çerçevede','icerik':'içerik','Icerik':'İçerik','baslik':'başlık','basliklar':'başlıklar',
  'donuk':'dönük','performansina':'performansına','verimlilige':'verimliliğe','katki':'katkı','saglar':'sağlar','adina':'adına',
  'toplanmasi':'toplanması','onem':'önem','oneme':'öneme','surekli':'sürekli','Surekli':'Sürekli','acin':'açın','atayin':'atayın','kapanis':'kapanış',
  'dusurur':'düşürür','yukarida':'yukarıda','acik':'açık','Acik':'Açık','tanim':'tanım','tanimlari':'tanımları','ihtiyac':'ihtiyaç','ihtiyaci':'ihtiyacı','ihtiyacini':'ihtiyacını',
  'hesaplayin':'hesaplayın','dokumante':'dokümante','yapin':'yapın','yapilir':'yapılır','firmaniza':'firmanıza','Firmaniza':'Firmanıza','uyarlamak':'uyarlamak',
  'akisini':'akışını','akisi':'akışı','iletisime':'iletişime','gecebilirsiniz':'geçebilirsiniz','gecis':'geçiş','gecisler':'geçişler',
  'bazli':'bazlı','degeri':'değeri','duzenli':'düzenli','odakli':'odaklı','oranlarini':'oranlarını','noktalarini':'noktalarını','kodlayip':'kodlayıp',
  'haftalik':'haftalık','degerlendirmek':'değerlendirmek','degerlendirin':'değerlendirin','degerlendirilmelidir':'değerlendirilmelidir',
  'siniflandirin':'sınıflandırın','subeli':'şubeli','Subeli':'Şubeli','subeler':'şubeler','Subeler':'Şubeler','arasinda':'arasında','arasi':'arası',
  'duzeltici':'düzeltici','olmasi':'olması','amac':'amaç','Amac':'Amaç','kisiye':'kişiye','olculebilir':'ölçülebilir','tasimaktir':'taşımaktır',
  'artnamesi':'şartnamesi','sartname':'şartname','olusturulur':'oluşturulur','olusturun':'oluşturun','gelistirir':'geliştirir',
  'onayi':'onayı','onayli':'onaylı','kullanim':'kullanım','Kullanim':'Kullanım','kullanici':'kullanıcı','kayip':'kayıp','kacak':'kaçak',
  'programi':'programı','Programi':'Programı','Gelisim':'Gelişim','gelisimin':'gelişimin','dogrulama':'doğrulama','Dogrulama':'Doğrulama',
  'uyari':'uyarı','aylik':'aylık','toplanti':'toplantı','devamliligi':'devamlılığı','kritik':'kritik','hazirlik':'hazırlık','Hazirlik':'Hazırlık',
  'egitim':'eğitim','Egitim':'Eğitim','yerlesim':'yerleşim','onleme':'önleme','frekansi':'frekansı','fiyat':'fiyat','uygunsuzluk':'uygunsuzluk',
  'cevre':'çevre','cevrim':'çevrim','gozden':'gözden','geri bildirim':'geri bildirim','koken':'köken','kok neden':'kök neden',
  'satin alma':'satın alma','Satinalma':'Satın Alma','satinalma':'satın alma','sure':'süre','suresi':'süresi','gore':'göre','Gore':'Göre',
  'hazirlayin':'hazırlayın','Hazirlayin':'Hazırlayın','azaltin':'azaltın','saglayin':'sağlayın','karsilastirin':'karşılaştırın','tanımlayin':'tanımlayın'
  ,'senaryolariyla':'senaryolarıyla'
  ,'teslimat-zimmet modelini':'teslimat ve zimmet sürecini'
  ,'teslimat zimmet modelini':'teslimat ve zimmet sürecini'
};

const keys = Object.keys(replacements).sort((a,b) => b.length - a.length);
const escaped = keys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
const wordRe = new RegExp(`(^|[^A-Za-zÇĞİÖŞÜçğıöşü])(${escaped})(?=$|[^A-Za-zÇĞİÖŞÜçğıöşü])`, 'g');
function fixText(text) { return text.replace(wordRe, (_, lead, word) => lead + replacements[word]); }
function fixJson(value) {
  if (typeof value === 'string') return /^https?:\/\//.test(value) ? value : fixText(value);
  if (Array.isArray(value)) return value.map(fixJson);
  if (value && typeof value === 'object') for (const key of Object.keys(value)) value[key] = fixJson(value[key]);
  return value;
}
function fixHtml(html) {
  html = html.replace(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi, (all, raw) => {
    try { return all.replace(raw, JSON.stringify(fixJson(JSON.parse(raw)))); } catch { return all; }
  });
  html = html.replace(/<meta\b[^>]*>/gi, tag => {
    if (!/(?:name|property)=["'](?:description|og:title|og:description|twitter:title|twitter:description)["']/i.test(tag)) return tag;
    return tag.replace(/content=(["'])([\s\S]*?)\1/i, (m,q,v) => `content=${q}${fixText(v)}${q}`);
  });
  let protectedBlocks = [];
  html = html.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, block => `\u0000${protectedBlocks.push(block)-1}\u0000`);
  html = html.split(/(<[^>]+>)/g).map(part => part.startsWith('<') ? part : fixText(part)).join('');
  return html.replace(/\u0000(\d+)\u0000/g, (_,i) => protectedBlocks[+i]);
}

let changed = 0;
for (const entry of fs.readdirSync(CENTER, {withFileTypes:true})) {
  if (!entry.isDirectory()) continue;
  const file = path.join(CENTER, entry.name, 'index.html');
  if (!fs.existsSync(file)) continue;
  const before = fs.readFileSync(file, 'utf8');
  if (!before.includes('2026-08-01')) continue;
  let after = fixHtml(before);
  const canonical = after.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)/i)?.[1];
  if (canonical) after = after.replace(/(<meta\s+property=["']og:url["']\s+content=["'])[^"']*(["'])/i, `$1${canonical}$2`);
  if (after !== before) { fs.writeFileSync(file, after, 'utf8'); changed++; }
}

const indexFile = path.join(CENTER, 'index.html');
const indexBefore = fs.readFileSync(indexFile, 'utf8');
const indexAfter = fixHtml(indexBefore);
if (indexAfter !== indexBefore) fs.writeFileSync(indexFile, indexAfter, 'utf8');

const dataFile = path.join(CENTER, 'knowledge-center.js');
let data = fs.readFileSync(dataFile, 'utf8');
const fixedData = data.replace(/\b(title|summary):\s*"([^"]*)"/g, (m,key,value) => `${key}: ${JSON.stringify(fixText(value))}`);
if (fixedData !== data) fs.writeFileSync(dataFile, fixedData, 'utf8');
console.log(`Türkçe metin düzeltmesi uygulanan makale: ${changed}`);
