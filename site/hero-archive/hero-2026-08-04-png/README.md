# Hero geri dönüş paketi — 4 Ağustos 2026

Bu klasör, performans optimizasyonundan hemen önce çalışan PNG tabanlı Hero sürümünün geri dönüş kaynaklarını içerir.

## İçerik

- `hero-markup.html`: Ana sayfadaki Hero işaretleme bloğu
- `site.js`: Hero ürün, renk, animasyon ve logo aracı davranışları
- `hero-styles.css`: Hero yerleşimi ve görsel stilleri
- `hero-products.js`: Sekiz ürünün merkezi Hero verisi ve PNG görsel yolları

Ürünlerin şeffaf PNG kaynakları `site/assets/products/hero/` altında korunur. Canlı sürüm beğenilmezse `hero-products.js` doğrudan geri alınabilir; işaretleme ve stil blokları ilgili dosyalardaki Hero bölümleriyle değiştirilebilir. Davranış için arşivdeki `site.js`, güncel dosyayla karşılaştırılarak Hero fonksiyonu geri alınır.

> `site.js` arşiv anındaki tam dosya kopyasıdır. Arşiv tarihinden sonra Hero dışındaki davranışlarda değişiklik yapılmışsa tüm dosyayı değiştirmek yerine yalnızca Hero fonksiyonunu karşılaştırarak geri alın.
