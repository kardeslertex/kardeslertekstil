"""Synchronize visible model cards and ItemList from existing Product pages.
Run after editing or generating product pages: python site/scripts/sync_seo_catalog.py
No product specifications, certification, prices or new routes are inferred.
"""
from pathlib import Path
import html
import json
import re

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = 'https://kardeslertekstil.com.tr'
SCHEMA = re.compile(r'(<script\b[^>]*type=[\"\']application/ld\+json[\"\'][^>]*>)(.*?)(</script>)', re.S)

def encode(obj):
    return json.dumps(obj, ensure_ascii=False, separators=(',', ':')).replace('<', '\\u003c')

def schemas(source):
    for match in SCHEMA.finditer(source):
        try:
            yield json.loads(match[2])
        except json.JSONDecodeError:
            continue

def item_list(models, url, name):
    return {'@type': 'ItemList', '@id': url+'#item-list', 'name': name,
            'numberOfItems': len(models), 'itemListElement': [
                {'@type': 'ListItem', 'position': i, 'name': m['name'], 'url': m['url']}
                for i,m in enumerate(models, 1)]}

def sync():
    models=[]
    for path in sorted((ROOT/'urun').glob('*/index.html')):
        product=next((s for s in schemas(path.read_text()) if s.get('@type')=='Product'),None)
        if product:
            image=product.get('image', [])
            if isinstance(image,str): image=[image]
            product['_image']=image[0] if image else ''
            models.append(product)
    # Match model names and tags rather than a broad garment prefix for specific categories.
    def text(m):
        return (m['name']+' '+ ' '.join(str(p.get('value','')) for p in m.get('additionalProperty',[]))).lower()
    def prefix(m,p): return m['sku'].startswith('KT-'+p+'-')
    rules={
      'polo-yaka-is-tisortu':lambda m:prefix(m,'TS') and 'polo' in text(m),
      'kurumsal-is-sweatshirtu':lambda m:prefix(m,'SW'),
      'is-pantolonu':lambda m:prefix(m,'PT'),
      'is-tulumu':lambda m:prefix(m,'TL'),
      'bahcivan-is-tulumu':lambda m:prefix(m,'TL') and 'bahçıvan' in text(m),
      'asci-kiyafeti-is-onlugu':lambda m:prefix(m,'ON') and 'scrub' not in text(m),
      'scrub-takimi':lambda m:'scrub' in text(m),
      'is-montu-kaban':lambda m:prefix(m,'MK'),
      'uzun-is-kabani':lambda m:prefix(m,'MK') and ('kaban' in text(m) or 'parka' in text(m)),
      'polar-is-montu':lambda m:prefix(m,'PL'),
      'kapusonlu-polar-is-montu':lambda m:prefix(m,'PL') and 'kapüşon' in text(m),
      'reflektorlu-is-yelegi':lambda m:prefix(m,'YL') and 'reflektör' in text(m),
      'yazlik-isci-yelegi':lambda m:prefix(m,'YL') and 'yazlık' in text(m),
      'silikon-elyaf-dolgulu-is-yelegi':lambda m:prefix(m,'YL') and 'silikon' in text(m),
      'softshell-is-montu':lambda m:prefix(m,'SS') and 'mont' in text(m),
      'softshell-is-yelegi':lambda m:prefix(m,'SS') and 'yelek' in text(m),
      'softshell-is-pantolonu':lambda m:prefix(m,'SS') and 'pantolon' in text(m),
    }
    count=0
    for slug,predicate in rules.items():
        path=ROOT/slug/'index.html'
        if not path.exists():continue
        source=path.read_text()
        selected=[m for m in models if predicate(m)][:8]
        if not selected:continue
        cards=[]
        for m in selected:
            esc=html.escape
            cards.append('<a class="local-product-card seo-model-card" href="'+esc(m['url'].replace(ORIGIN,''))+'">'
              +'<img src="'+esc(m['_image'].replace(ORIGIN,''))+'" alt="'+esc(m['sku']+' '+m['name'])+'" width="640" height="640" loading="lazy" decoding="async">'
              +'<span class="eyebrow eyebrow-accent">'+esc(m['sku'])+'</span><h3>'+esc(m['name'])+'</h3><strong>Modeli inceleyin →</strong></a>')
        block='<section class="local-section" data-seo-models="v1"><div class="container"><div class="section-head"><div><div class="eyebrow eyebrow-accent">MODEL SEÇENEKLERİ</div><h2>Ürün modellerini inceleyin</h2></div><p>Model ayrıntılarını inceleyerek adet, renk ve logo ihtiyacınız için teklif isteyin.</p></div><div class="local-product-grid">'+''.join(cards)+'</div></div></section>'
        if 'data-seo-models="v1"' in source:
            source=re.sub(r'<section class="local-section" data-seo-models="v1">.*?</section>',lambda _:block,source,flags=re.S)
        else:
            # First section is the category hero. Keep the new cards above long descriptive copy.
            i=source.index('</section>',source.index('<main>'))+len('</section>')
            source=source[:i]+block+source[i:]
        def replace(match):
            schema=json.loads(match[2])
            if schema.get('@type')=='CollectionPage':
                schema['mainEntity']=item_list(selected,ORIGIN+'/'+slug+'/',schema['name']+' modelleri')
            return match[1]+encode(schema)+match[3]
        source=SCHEMA.sub(replace,source)
        source=source.replace('property="og:type" content="product"','property="og:type" content="website"')
        path.write_text(source)
        count+=1
    path=ROOT/'urunlerimiz/index.html';source=path.read_text()
    cards=''.join('<a class="home-sector-card" href="'+html.escape(m['url'].replace(ORIGIN,''))+'"><span class="eyebrow eyebrow-accent">'+html.escape(m['sku'])+'</span><h3>'+html.escape(m['name'])+'</h3><p>Model ayrıntılarını inceleyin.</p></a>' for m in models)
    block='<section class="catalog-model-pages"><div class="section-head"><div><div class="eyebrow eyebrow-accent">DETAYLI ÜRÜNLER</div><h2>Öne Çıkan Modeller</h2></div></div><div class="home-sector-grid">'+cards+'</div></section>'
    source=re.sub(r'<section class="catalog-model-pages">.*?</section>',lambda _:block,source,flags=re.S)
    catalog=item_list(models,ORIGIN+'/urunlerimiz/','Detaylı ürün modelleri')
    catalog['@context']='https://schema.org'
    # Keep one static catalog list, identical before and after JS execution.
    source=re.sub(r'<script id="productCatalogJsonLd" type="application/ld\+json">.*?</script>',lambda _: '<script id="productCatalogJsonLd" type="application/ld+json">'+encode(catalog)+'</script>',source,flags=re.S)
    def remove_old(match):
        obj=json.loads(match[2])
        if obj.get('@type')=='ItemList' and 'id="productCatalogJsonLd"' not in match[1]: return ''
        return match[0]
    source=SCHEMA.sub(remove_old,source)
    path.write_text(source)
    print(f'Synchronized {count} category pages and {len(models)} detailed catalog entries.')

if __name__=='__main__':sync()
