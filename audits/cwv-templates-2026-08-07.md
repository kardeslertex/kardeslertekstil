# Core Web Vitals şablon ölçümü — 7 Ağustos 2026

## Kapsam ve yöntem

Production üzerindeki yedi temsilci URL, Lighthouse 13.4.1 ile birer kez mobil ve masaüstü profilde ölçüldü. Sonuçlar laboratuvar verisidir; gerçek kullanıcı CWV sonucu değildir. Tek koşu, regresyon adayı bulmak için kullanılır ve sürüm karşılaştırmasında en az üç koşunun medyanı alınmalıdır.

PageSpeed Insights API çağrısı yapıldı ancak ortak Google API projesinin günlük kotası tükenmişti (`Quota exceeded`). Search Console API/hesap yetkisi repoda yoktur. Bu nedenle PSI ile Search Console/CrUX saha sonucu uydurulmamış, mevcut 27–31 Temmuz Search Console dışa aktarımının da CWV ve canonical karşılaştırması için yetersiz olduğu kaydedilmiştir. Saha başarısı ancak 28 günlük CrUX penceresi oluştuğunda kararlaştırılabilir.

## Search Console/CrUX saha verisi — 7 Ağustos 2026

Kullanıcının sağladığı Search Console “Önemli Web Verileri” ekranı aşağıdaki durumu doğruladı:

- Mobil: Son 90 güne ait yeterli kullanım verisi yok.
- Masaüstü: Son 90 güne ait yeterli kullanım verisi yok.
- Kaynak: Chrome Kullanıcı Deneyimi Raporu (CrUX).

Bu sonuç bir CWV başarısı veya başarısızlığı değildir. Google'ın LCP, INP ve CLS için güvenilir URL grubu oluşturmasına yetecek gerçek kullanıcı örneği henüz bulunmamaktadır. Saha verisi oluşana kadar Lighthouse yalnız laboratuvar regresyon aracı olarak kullanılacak; Search Console sonucu hakkında “iyi” ya da “zayıf” iddiası üretilmeyecektir.

## Lighthouse laboratuvar sonuçları

Süreler milisaniye, transfer KB'dir. INP laboratuvarda güvenilir biçimde ölçülemediğinden TBT ve long-task kaynakları etkileşim riski için tanı sinyali olarak kullanılmıştır.

| Şablon | Profil | Skor | LCP | TBT | CLS | Transfer | Main thread |
|---|---:|---:|---:|---:|---:|---:|---:|
| Ana sayfa | Mobil | 60 | 8.801 | 154 | 0,000 | 11.075 | 3.001 |
| Ana sayfa | Masaüstü | 95 | 1.070 | 0 | 0,068 | 17.196 | 927 |
| Ürün katalog | Mobil | 66 | 4.284 | 302 | 0,000 | 13.333 | 15.660 |
| Ürün katalog | Masaüstü | 95 | 1.050 | 0 | 0,028 | 11.332 | 3.392 |
| Ürün detay | Mobil | 80 | 3.529 | 0 | 0,000 | 302 | 590 |
| Ürün detay | Masaüstü | 97 | 1.154 | 0 | 0,025 | 302 | 192 |
| Bilgi merkezi | Mobil | 62 | 6.382 | 0 | 0,020 | 627 | 1.944 |
| Bilgi merkezi | Masaüstü | 88 | 1.391 | 0 | 0,085 | 626 | 600 |
| Makale detayı | Mobil | 75 | 3.946 | 0 | 0,000 | 346 | 1.007 |
| Makale detayı | Masaüstü | 97 | 1.028 | 0 | 0,032 | 347 | 302 |
| Lokasyon | Mobil | 77 | 3.703 | 0 | 0,000 | 313 | 787 |
| Lokasyon | Masaüstü | 97 | 1.079 | 0 | 0,059 | 313 | 230 |
| İletişim | Mobil | 64 | 6.835 | 73 | 0,000 | 902 | 769 |
| İletişim | Masaüstü | 93 | 1.056 | 0 | 0,106 | 1.030 | 208 |

Temsilci adresler sırasıyla `/`, `/urunlerimiz`, gerçek bir `/urun/.../`, `/bilgi-merkezi/`, `/bilgi-merkezi/gabardin-kumas-nedir/`, `/pendik-is-elbiseleri/` ve `/iletisim` oldu. Hatalı ilk ürün örneğinin 404 koşusu sonuçlara katılmadı.

## Element ve görev teşhisi

- Ana sayfa mobil LCP adayı hero medya alanıdır. HTML'de öncelikli hero görseli boyut rezervasyonu ve `fetchpriority="high"` kullanıyor; buna rağmen 11 MB ilk yük ve medya/font rekabeti mobil LCP'yi 8,8 saniyeye taşıyor.
- Katalog mobilde en kritik şablondur: 13,3 MB transfer, 15,7 saniye main-thread ve 302 ms TBT. En uzun görev `catalog.js` kaynaklı 255 ms; aynı dosyada 68–79 ms arası tekrarlanan görevler bulunuyor. Ürün görsel ölçümü ve tüm kategori DOM'unun ilk anda kurulması başlıca INP riskidir.
- İletişim mobil LCP 6,8 saniye; masaüstü CLS 0,106 ile bu tek koşuda iyi eşiğin hafif üzerindedir. Form/harita çevresindeki geç yerleşen alanlar tekrar ölçümde element bazında izlenmelidir.
- Bilgi merkezi mobil LCP 6,4 saniye, masaüstü CLS 0,085'tir. Büyük liste DOM'u ve kart alanı adaydır.
- Kaynak taramasında 1.159 görsel etiketinin 112'sinde `width` veya `height` çifti eksiktir. Bunlar CLS düzeltmesinin ayrı, görsel boyutları doğrulanmış mekanik işi olarak ele alınmalıdır.
- Lighthouse 13 temel LCP metriğini üretti ancak bazı koşularda yeni trace insight katmanı `NO_LCP` uyarısı verdi; bu nedenle raporda DOM elementi kesinmiş gibi etiketlenmedi. Bir sonraki turda DevTools Performance trace ile gerçek LCP node ve layout-shift attribution kaydı alınmalıdır.

## Uygulama önceliği

1. Katalogda yalnız görünür kategori/kartları üret; ürün görsellerini viewport yaklaşmadan `src` ile bağlama. Canvas tabanlı ürün sınırı analizini önceden üretilmiş metadata veya idle görevine taşı.
2. Ana sayfada mobil intro videosunu indirme; hero görseli ile font/video yarışını azalt. Masaüstünde de ekran dışı hero varyantlarını ilk yükten çıkar.
3. Eksik 112 görselin gerçek intrinsic boyutlarını dosyadan doğrulayıp `width`/`height` ekle; dinamik hero, kart ve form/harita alanlarına sabit oran/rezerv alan ver.
4. Bilgi merkezi listesi ile katalog verisini şablona özel parçalara böl; büyük veri ve DOM işlemlerini ana sayfadan uzak tut.
5. Değişiklik sonrası aynı 14 koşuyu üçer kez çalıştırıp medyanı karşılaştır; dağıtımdan sonra PSI ve 28 günlük Search Console/CrUX saha verisini şablon gruplarıyla izle.

Bu aşamada tasarım, renk, tipografi veya görünür yerleşim değiştirilmemiştir.

## Uygulama sonrası yerel katalog kontrolü

İlk production ölçümünden sonra katalog görselleri için 500 px viewport yaklaşım eşiği olan `IntersectionObserver` yüklemesi eklendi; ilk altı görünür ürün geriye dönük tarayıcı desteğiyle doğrudan yüklenmeye devam ediyor. Ayrıca kaynak dosyası belli 1.155 statik görsel denetlendi ve eksik 108 etikete gerçek intrinsic `width`/`height` değerleri eklendi. Kaynağı kullanıcı etkileşiminde belirlenen iki dinamik görsel sabit kart oranıyla korunuyor.

Değişiklik henüz push/deploy edilmediği için karşılaştırma yerel HTTP sunucusunda tek mobil Lighthouse koşusudur; production saha sonucu değildir:

| Katalog mobil | İlk production laboratuvarı | Uygulama sonrası yerel laboratuvar |
|---|---:|---:|
| Performans skoru | 66 | 83 |
| LCP | 4.284 ms | 3.992 ms |
| TBT | 302 ms | 89 ms |
| CLS | 0,000 | 0,013 |
| Transfer | 13.333 KB | 3.332 KB |
| Main thread | 15.660 ms | 4.811 ms |
| Ağ isteği | 260 | 68 |
| Görsel isteği | 245 | 53 |

Sunucu, cache ve sıkıştırma koşulları aynı olmadığı için değerler kesin kazanç yüzdesi olarak yorumlanmamalıdır. Buna karşılık istek sayısındaki 260→68 ve görsel isteğindeki 245→53 düşüş, yükleme kapsamının kod düzeyinde daraldığını doğrudan doğrular. Dağıtımdan sonra aynı production URL üzerinde üç koşu medyanı alınmalıdır.
