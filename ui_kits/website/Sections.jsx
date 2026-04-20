// Product grid + About strip + References + Contact

const PRODUCTS = [
  { t: 'Tişört',              s: 'Pamuklu · Baskı · Nakış', tone: '#1C3E5C' },
  { t: 'Lakos (Polo) Tişört', s: 'Kurumsal üretim',          tone: '#0E2A44' },
  { t: 'İş Tulumları',        s: 'Teknik kumaş · ağır iş',   tone: '#081D30' },
  { t: 'Polar & Sweatshirt',  s: 'Soğuk hava · logo baskı',  tone: '#2B3138' },
  { t: 'Önlük',               s: 'Mutfak · üretim · atölye', tone: '#434A53' },
  { t: 'Özel Tasarım',        s: 'Numune hazırlanır',        tone: '#9B4014' },
];

function ProductGrid({ onNavigate }) {
  return (
    <section style={{ background:'var(--cream-100)', padding:'96px 0' }}>
      <div style={{ maxWidth: 1280, margin:'0 auto', padding:'0 32px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom: 48 }}>
          <div>
            <div className="eyebrow">Ürün Kategorileri</div>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize: 56, textTransform:'uppercase',
                         letterSpacing:'-.015em', lineHeight:1, marginTop: 14, color:'var(--navy-700)' }}>
              Ne Üretiyoruz?
            </h2>
          </div>
          <p style={{ maxWidth: 420, color:'var(--fg2)', fontSize: 16, lineHeight: 1.6 }}>
            Firmanıza özel üretim. Logo baskı, nakış, özel renk, numune hazırlama dahil.
          </p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap: 16 }}>
          {PRODUCTS.map(p => <ProductCard key={p.t} p={p}/>)}
        </div>
        <div style={{ marginTop: 40, display:'flex', justifyContent:'center' }}>
          <Button variant="secondary" iconRight="arrow-right" onClick={()=>onNavigate('products')}>
            Tüm Ürünleri Gör
          </Button>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ p }) {
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
         style={{ background:'#fff', border:`1px solid ${hover ? 'var(--steel-300)' : 'var(--steel-200)'}`,
                  borderRadius: 4, overflow:'hidden', cursor:'pointer',
                  boxShadow: hover ? '0 4px 16px rgba(14,42,68,.12)' : 'none',
                  transition:'all 180ms var(--ease-out)' }}>
      <div style={{ aspectRatio:'4/3', background:`linear-gradient(135deg, ${p.tone}, #0D1014)`, position:'relative' }}>
        <div style={{ position:'absolute', inset: 0, display:'grid', placeItems:'center' }}>
          <Icon name="package" size={56} color="rgba(243,238,228,.35)"/>
        </div>
        <div style={{ position:'absolute', top: 12, left: 12, background:'var(--orange-500)', color:'#fff',
                      fontSize: 10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase',
                      padding:'4px 8px' }}>Numune Mevcut</div>
      </div>
      <div style={{ padding:'18px 20px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div>
          <div style={{ fontFamily:'var(--font-display)', textTransform:'uppercase', fontSize: 22,
                        color:'var(--navy-700)', letterSpacing:'-.01em' }}>{p.t}</div>
          <div style={{ fontSize: 13, color:'var(--fg2)', marginTop: 2 }}>{p.s}</div>
        </div>
        <Icon name="arrow-right" size={20} color={hover ? 'var(--orange-500)' : 'var(--navy-700)'}/>
      </div>
    </div>
  );
}

function AboutStrip() {
  return (
    <section className="pattern-stripes" style={{ padding:'96px 0', borderTop:'2px solid var(--navy-700)', borderBottom:'2px solid var(--navy-700)' }}>
      <div style={{ maxWidth: 1000, margin:'0 auto', padding:'0 32px', textAlign:'center' }}>
        <div className="eyebrow">Kısa Tanıtım</div>
        <p style={{ fontFamily:'var(--font-display)', fontSize: 40, lineHeight: 1.15,
                    textTransform:'uppercase', color:'var(--navy-700)', marginTop: 20, letterSpacing:'-.01em' }}>
          1982 yılından bu yana iş kıyafetleri üretiminde faaliyet gösteriyoruz.
        </p>
        <p style={{ maxWidth: 680, margin:'24px auto 0', fontSize: 17, lineHeight: 1.6, color:'var(--fg2)' }}>
          Kurumsal firmalara özel tasarım, numune ve toplu üretim hizmetleri sunarak, tekstil içerikli promosyon ürünlerinde akla gelen ilk firmalardan biri olmanın gururunu yaşıyoruz.
        </p>
        <hr className="rule-accent" style={{ margin:'32px auto 0' }}/>
      </div>
    </section>
  );
}

function ReferencesMarquee() {
  const refs = ['TEKNOLOJI A.Ş.','MAVİLİM İNŞAAT','ANADOLU KARGO','BORSA LOGİSTİK','PENDİK OTO','MANOLYA GIDA','FEVZİ ENDÜSTRİ','ATLAS KİMYA','KARDELEN TEKNİK'];
  return (
    <section style={{ background:'var(--cream-50)', padding:'56px 0', borderBottom:'1px solid var(--steel-200)' }}>
      <div style={{ maxWidth: 1280, margin:'0 auto', padding:'0 32px' }}>
        <div className="eyebrow" style={{ marginBottom: 24 }}>Referanslarımız · 200+ Kurumsal Müşteri</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 1, background:'var(--steel-200)', border:'1px solid var(--steel-200)' }}>
          {refs.map((r,i) => (
            <div key={i} style={{ background:'var(--cream-50)', padding:'28px 20px',
                                  display:'flex', alignItems:'center', gap: 14 }}>
              <div style={{ width:36, height:36, background:'var(--navy-700)', color:'var(--cream-50)',
                            fontFamily:'var(--font-display)', display:'grid', placeItems:'center', fontSize: 18 }}>
                {r[0]}
              </div>
              <div style={{ fontFamily:'var(--font-display)', textTransform:'uppercase',
                            fontSize: 15, color:'var(--navy-700)', letterSpacing:'-.01em' }}>{r}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactBlock() {
  return (
    <section style={{ background:'var(--navy-700)', color:'var(--cream-50)', padding:'96px 0' }}>
      <div style={{ maxWidth: 1280, margin:'0 auto', padding:'0 32px', display:'grid', gridTemplateColumns:'1fr 1fr', gap: 80 }}>
        <div>
          <div className="eyebrow" style={{ color:'var(--orange-500)' }}>İLETİŞİM</div>
          <h2 style={{ fontFamily:'var(--font-display)', fontSize: 56, textTransform:'uppercase',
                       letterSpacing:'-.015em', lineHeight:1, marginTop: 16 }}>
            Teklif Alın,<br/>Numune Hazırlayalım.
          </h2>
          <p style={{ marginTop: 24, fontSize: 17, color:'var(--navy-100)', lineHeight: 1.6 }}>
            En hızlı yol WhatsApp. Birkaç saat içinde numune görseli ve fiyat teklifi paylaşıyoruz.
          </p>
          <div style={{ marginTop: 32, display:'flex', flexDirection:'column', gap: 14 }}>
            <div style={{ display:'flex', gap:14, alignItems:'center' }}><Icon name="phone" size={20}/><span style={{ fontFamily:'var(--font-display)', fontSize: 22 }}>0216 396 19 88</span></div>
            <div style={{ display:'flex', gap:14, alignItems:'center' }}><Icon name="mail" size={20}/><span>kardesler@kardeslertekstil.com.tr</span></div>
            <div style={{ display:'flex', gap:14, alignItems:'flex-start' }}><Icon name="map-pin" size={20}/><span>Fevzi Çakmak, Manolya Sk. 11-12/A,<br/>34899 Pendik / İstanbul</span></div>
          </div>
          <div style={{ marginTop: 32 }}>
            <Button variant="whatsapp" icon="message-circle">Whatsapp'tan Teklif Al</Button>
          </div>
        </div>
        <ContactForm/>
      </div>
    </section>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  return (
    <form onSubmit={(e)=>{ e.preventDefault(); setSent(true); }}
          style={{ background:'var(--cream-100)', padding: 32, color:'var(--fg1)', borderRadius: 4 }}>
      {sent ? (
        <div style={{ display:'grid', placeItems:'center', textAlign:'center', padding:'48px 0' }}>
          <div style={{ width:56, height:56, background:'var(--navy-700)', color:'var(--cream-50)',
                        borderRadius: 999, display:'grid', placeItems:'center' }}>
            <Icon name="check" size={28}/>
          </div>
          <div style={{ fontFamily:'var(--font-display)', fontSize: 28, textTransform:'uppercase',
                        color:'var(--navy-700)', marginTop: 18 }}>Teşekkürler</div>
          <p style={{ marginTop: 8, color:'var(--fg2)' }}>Talebiniz alındı. 24 saat içinde dönüş yapacağız.</p>
        </div>
      ) : (
        <>
          <div style={{ fontFamily:'var(--font-display)', fontSize: 22, textTransform:'uppercase', marginBottom: 20, color:'var(--navy-700)' }}>
            Teklif Formu
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 14 }}>
            <Field label="Firma Adı" placeholder="Örn. Teknoloji A.Ş."/>
            <Field label="Yetkili" placeholder="Ad Soyad"/>
            <Field label="Telefon" placeholder="0___ ___ __ __"/>
            <Field label="E-posta" placeholder="ornek@firma.com"/>
            <Field label="Ürün" sel options={['Tişört','Polo Tişört','İş Tulumu','Polar / Sweatshirt','Önlük','Özel Tasarım']}/>
            <Field label="Adet" placeholder="Örn. 250"/>
          </div>
          <div style={{ marginTop: 14 }}>
            <Field label="Mesajınız" textarea placeholder="Renk, logo, baskı türü, teslim tarihi..."/>
          </div>
          <div style={{ marginTop: 20, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontSize: 12, color:'var(--fg3)' }}>Minimum sipariş 50 adet.</span>
            <Button type="submit" variant="primary" iconRight="arrow-right">Teklif Gönder</Button>
          </div>
        </>
      )}
    </form>
  );
}

function Field({ label, placeholder, textarea, sel, options }) {
  const common = {
    width: '100%', boxSizing: 'border-box',
    fontFamily: 'var(--font-body)', fontSize: 14,
    padding: '10px 12px', background: '#fff',
    border: '1px solid var(--steel-200)', borderRadius: 2,
    color: 'var(--fg1)', outline: 'none',
  };
  return (
    <label style={{ display:'flex', flexDirection:'column', gap: 6 }}>
      <span style={{ fontSize: 10, fontWeight: 600, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--fg2)' }}>{label}</span>
      {textarea
        ? <textarea rows={3} placeholder={placeholder} style={common}/>
        : sel
          ? <select style={common}>{options.map(o => <option key={o}>{o}</option>)}</select>
          : <input placeholder={placeholder} style={common}/>}
    </label>
  );
}

Object.assign(window, { ProductGrid, ProductCard, AboutStrip, ReferencesMarquee, ContactBlock, ContactForm, Field });
