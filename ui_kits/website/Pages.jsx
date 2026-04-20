// Routed pages — Products, References, About, Contact

function ProductsPage({ onNavigate }) {
  return (
    <div style={{ background:'var(--cream-100)' }}>
      <PageHeader eyebrow="Ürün Kataloğu" title="Ürünlerimiz"
        lead="Firmanıza özel ürünler için numune hazırlayabiliriz. Her üründe baskı, nakış ve özel renk seçenekleri sunuyoruz."/>
      <div style={{ maxWidth: 1280, margin:'0 auto', padding:'64px 32px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap: 16 }}>
          {PRODUCTS.map(p => <ProductCard key={p.t} p={p}/>)}
        </div>
        <div style={{ marginTop: 64, padding: 40, background:'var(--navy-700)', color:'var(--cream-50)',
                      display:'grid', gridTemplateColumns:'2fr 1fr', alignItems:'center', gap: 40 }}>
          <div>
            <div className="eyebrow" style={{ color:'var(--orange-500)' }}>Özel Üretim</div>
            <div style={{ fontFamily:'var(--font-display)', fontSize: 36, textTransform:'uppercase',
                          letterSpacing:'-.01em', marginTop: 12, lineHeight: 1.1 }}>
              Aradığınız ürün listede yok mu?
            </div>
            <p style={{ marginTop: 12, color:'var(--navy-100)', lineHeight: 1.6, maxWidth: 500 }}>
              Özel tasarım, farklı kumaş veya spesifik renk talepleri için numune hazırlıyoruz. Örneğinizi gönderin, birebir üretelim.
            </p>
          </div>
          <Button variant="accent" icon="message-circle">Numune Talep Et</Button>
        </div>
      </div>
    </div>
  );
}

function ReferencesPage() {
  const refs = ['TEKNOLOJI A.Ş.','MAVİLİM İNŞAAT','ANADOLU KARGO','BORSA LOGİSTİK','PENDİK OTO','MANOLYA GIDA','FEVZİ ENDÜSTRİ','ATLAS KİMYA','KARDELEN TEKNİK','DENİZ LOJİSTİK','ŞAHİN MADENCİLİK','YILDIZ GIDA'];
  return (
    <div style={{ background:'var(--cream-100)' }}>
      <PageHeader eyebrow="200+ Kurumsal Müşteri" title="Referanslarımız"
        lead="Endüstri, lojistik, gıda, madencilik ve kurumsal hizmet sektörlerinden kurumsal müşterilerimize iş kıyafeti üretiyoruz."/>
      <div style={{ maxWidth: 1280, margin:'0 auto', padding:'64px 32px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 1, background:'var(--steel-200)', border:'1px solid var(--steel-200)' }}>
          {refs.map((r,i) => (
            <div key={i} style={{ background:'#fff', padding:'36px 20px',
                                  display:'flex', flexDirection:'column', alignItems:'center', gap: 14, textAlign:'center' }}>
              <div style={{ width:48, height:48, background:'var(--navy-700)', color:'var(--cream-50)',
                            fontFamily:'var(--font-display)', display:'grid', placeItems:'center', fontSize: 22 }}>
                {r[0]}
              </div>
              <div style={{ fontFamily:'var(--font-display)', textTransform:'uppercase',
                            fontSize: 14, color:'var(--navy-700)', letterSpacing:'-.01em' }}>{r}</div>
              <span className="caption">Kurumsal T-Shirt · 2024</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div style={{ background:'var(--cream-100)' }}>
      <PageHeader eyebrow="Hakkımızda" title="1982'den Günümüze"/>
      <div style={{ maxWidth: 900, margin:'0 auto', padding:'64px 32px' }}>
        <p style={{ fontSize: 22, lineHeight: 1.5, color:'var(--fg1)' }}>
          Kardeşler Tekstil, <strong>1982 yılından bu yana</strong> iş kıyafetleri üretiminde faaliyet göstermektedir.
          Kurumsal firmalara özel tasarım, numune ve toplu üretim hizmetleri sunarak,
          tekstil içerikli promosyon ürünlerinde <strong>akla gelen ilk firmalardan biri olmanın gururunu</strong> yaşıyoruz.
        </p>
        <hr className="rule-accent" style={{ margin:'40px 0' }}/>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap: 32 }}>
          {[
            { t:'44 yıl',        s:'Kesintisiz üretim tecrübesi' },
            { t:'Pendik / İstanbul', s:'Kendi atölyemizde üretim' },
            { t:'Numune + Toplu', s:'Her iki ölçekte de çalışıyoruz' },
          ].map((x,i) => (
            <div key={i} style={{ borderTop:'2px solid var(--navy-700)', paddingTop: 16 }}>
              <div style={{ fontFamily:'var(--font-display)', fontSize: 28, textTransform:'uppercase', color:'var(--navy-700)' }}>{x.t}</div>
              <div style={{ marginTop: 6, color:'var(--fg2)' }}>{x.s}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  return <ContactBlock/>;
}

function PageHeader({ eyebrow, title, lead }) {
  return (
    <section style={{ background:'var(--navy-700)', color:'var(--cream-50)', padding:'80px 0 72px', borderBottom:'4px solid var(--orange-500)' }}>
      <div style={{ maxWidth: 1280, margin:'0 auto', padding:'0 32px' }}>
        <div className="eyebrow" style={{ color:'var(--orange-500)' }}>{eyebrow}</div>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize: 72, textTransform:'uppercase',
                     letterSpacing:'-.015em', lineHeight: 1, marginTop: 16 }}>{title}</h1>
        {lead && <p style={{ maxWidth: 640, marginTop: 20, fontSize: 18, color:'var(--navy-100)', lineHeight: 1.55 }}>{lead}</p>}
      </div>
    </section>
  );
}

Object.assign(window, { ProductsPage, ReferencesPage, AboutPage, ContactPage, PageHeader });
