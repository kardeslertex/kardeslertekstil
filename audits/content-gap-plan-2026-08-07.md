# İçerik geliştirme ve konsolidasyon planı

Tarih: 7 Ağustos 2026

## Mevcut durum

- Bilgi merkezinde 622 indexlenebilir rehber bulunuyor.
- Mevcut genel envanterde ortalama kelime sayısı 733 ve 500 kelimenin altında 213 rehber var. Navigasyon, script, stil ve footer metinlerini dışarıda bırakan daha katı yapısal denetim 238 rehberi 500 kelimenin altında raporluyor.
- Benzerlik envanterinde editoryal inceleme gerektiren 367 eşleşme bulunuyor.
- Rehberlerin tamamında konuya göre ürün/lokasyon/rehber bağlantıları, BlogPosting şeması ve Kardeşler Tekstil Üretim Ekibi sorumluluk notu bulunuyor.
- Search Console tabanı yalnız 27–31 Temmuz 2026 dönemindeki beş günlük veriyi içeriyor. 622 rehberden hiçbiri henüz sayfa raporunda görünmediği için hangi URL'nin korunacağına dair güvenilir performans verisi yok.

## Öncelikli eksikler

1. Rehberlerin önemli bir bölümünde özgün saha kanıtı, gerçek üretim örneği, ölçüm tablosu veya uzman görüşü yetersiz.
2. Katı ölçümde kısa görünen 238 rehber, arama niyetini tam karşılayıp karşılamadığı açısından tek tek incelenmeli; kelime sayısı tek başına silme veya uzatma gerekçesi yapılmamalı.
3. 367 benzerlik adayı arasında aynı niyeti hedefleyen sayfalar bulunabilir; veri oluşmadan toplu birleştirme yapılması organik görünürlüğü riske atar.
4. Ticari kategori ve lokasyon sayfaları; teslim süreci, kumaş seçimi, kalite kontrolü ve gerçek proje kanıtlarıyla güçlendirilmeli.
5. Fotoğraf, vaka çalışması, müşteri izni bulunan referans ve üretim süreci kanıtları düzenli bir editoryal takvimle eklenmeli.

## Uygulama sırası

### 1. Ölçüm dönemi

- Yayından sonra en az 6–8 hafta Search Console sayfa ve sorgu verisi biriktir.
- `/bilgi-merkezi/` filtresiyle tıklama, gösterim, ortalama konum ve sorguları URL bazında dışa aktar.
- Teklif formu ve WhatsApp dönüşümlerini içerik URL'siyle ilişkilendir.

### 2. Para sayfalarını güçlendirme

- Ana ürün kategorilerine özgün kumaş/gramaj tabloları, bakım bilgisi ve üretim toleransları ekle.
- Lokasyon sayfalarına yalnız gerçekten sunulan teslimat, numune ve servis ayrıntılarını ekle.
- En az üç doğrulanabilir proje/vaka çalışmasını problem–çözüm–sonuç formatında yayımla.

### 3. Rehberleri karar matrisine alma

- Gösterim veya dönüşüm alan URL'leri koru ve özgün kanıtlarla geliştir.
- Aynı arama niyetini paylaşan sayfalarda en güçlü URL'yi ana kaynak seç; diğerlerini içerik aktarımı sonrası 301 yönlendir.
- Gösterim almayan fakat iş açısından değerli rehberleri yeniden yaz; değersiz ve kopyaya yakın olanları kontrollü biçimde konsolide et.
- Her karar için eski URL, hedef URL, sorgu, trafik ve dönüşüm gerekçesini envantere kaydet.

### 4. Sürekli yayın standardı

- Yeni içerik; tek H1, özgün başlık/meta, BlogPosting şeması, sorumlu ekip notu ve konuya uygun iç linkler olmadan yayımlanmamalı.
- Seri üretim içerik yerine müşteri sorusu, saha gözlemi, teknik veri veya gerçek proje kanıtı temel alınmalı.
- İnce içerik sayısı yalnız kelime ekleyerek azaltılmamalı; her ek bölüm kullanıcı kararını ilerletmeli.

## Karar

Bu aşamada 301, silme veya toplu metin genişletme yapılmadı. Konsolidasyon, yeterli Search Console ve dönüşüm verisi oluştuktan sonra uygulanacak. Yapısal içerik şartları `audit_content_quality.ps1` ile otomatik denetime bağlandı; kısa içerikler raporlanıyor fakat tek başına build hatası sayılmıyor.
