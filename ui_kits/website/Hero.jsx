// Hero

function Hero({ onNavigate }) {
  return (
    <section style={{ background: 'var(--navy-700)', color: 'var(--cream-50)', position:'relative', overflow:'hidden' }}>
      {/* hazard stripe accent */}
      <div style={{
        position:'absolute', right:-40, top: 48, width: 220, height: 40,
        backgroundImage:'repeating-linear-gradient(135deg,#E6662A 0 14px,#0E2A44 14px 28px)',
        transform:'rotate(6deg)', opacity:.85,
      }}/>
      <div style={{ maxWidth: 1280, margin:'0 auto', padding:'96px 32px 110px',
                    display:'grid', gridTemplateColumns:'1.2fr 1fr', gap: 48, alignItems:'center' }}>
        <div>
          <div className="eyebrow" style={{ color:'var(--orange-500)', marginBottom: 20 }}>EST. 1982 · KURUMSAL ÜRETİM</div>
          <h1 style={{
            fontFamily:'var(--font-display)', fontSize: 76, lineHeight: .95,
            textTransform:'uppercase', letterSpacing:'-.015em', margin:0, color:'var(--cream-50)',
          }}>
            İş Kıyafetinde<br/>
            <span style={{ color:'var(--orange-500)' }}>Profesyonel</span><br/>
            Üretim.
          </h1>
          <p style={{ maxWidth: 540, marginTop: 28, fontSize: 18, lineHeight: 1.55, color:'var(--navy-100)' }}>
            Tişört, tulum ve iş kıyafetlerinde firmalara özel tasarım, numune ve toplu üretim çözümleri.
            <strong style={{ color:'var(--cream-50)' }}> 44 yıllık üretim tecrübesi.</strong>
          </p>
          <div style={{ display:'flex', gap: 12, marginTop: 36 }}>
            <Button variant="accent" icon="message-circle">Whatsapp'tan Teklif Al</Button>
            <Button variant="secondary-on-dark" iconRight="arrow-right" onClick={() => onNavigate('products')}>
              Ürünleri İncele
            </Button>
          </div>
          <div style={{ marginTop: 56, display:'flex', gap: 48, color:'var(--navy-100)' }}>
            <div>
              <div style={{ fontFamily:'var(--font-display)', fontSize: 40, color:'var(--cream-50)' }}>44</div>
              <div style={{ fontSize: 12, letterSpacing:'.12em', textTransform:'uppercase' }}>Yıl · Üretim</div>
            </div>
            <div>
              <div style={{ fontFamily:'var(--font-display)', fontSize: 40, color:'var(--cream-50)' }}>6+</div>
              <div style={{ fontSize: 12, letterSpacing:'.12em', textTransform:'uppercase' }}>Ürün Kategorisi</div>
            </div>
            <div>
              <div style={{ fontFamily:'var(--font-display)', fontSize: 40, color:'var(--cream-50)' }}>300+</div>
              <div style={{ fontSize: 12, letterSpacing:'.12em', textTransform:'uppercase' }}>Kurumsal Referans</div>
            </div>
          </div>
        </div>
        <div style={{
          background:'linear-gradient(135deg, #1C3E5C, #081D30)',
          aspectRatio:'4/5', borderRadius: 4, border:'1px solid var(--navy-500)',
          position:'relative', overflow:'hidden',
          display:'grid', placeItems:'center',
        }}>
          {/* Placeholder swatch for real product photo */}
          <div style={{ position:'absolute', inset: 20, border:'1px dashed rgba(243,238,228,.2)', display:'grid', placeItems:'center' }}>
            <div style={{ textAlign:'center' }}>
              <Icon name="factory" size={48} color="rgba(243,238,228,.5)"/>
              <div style={{ marginTop: 14, fontFamily:'var(--font-body)', fontSize: 11, letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(243,238,228,.5)' }}>
                Üretim Tesisi / Ürün Fotoğrafı<br/>Placeholder
              </div>
            </div>
          </div>
          <div style={{
            position:'absolute', bottom: 16, left: 16, right: 16,
            background:'var(--orange-500)', color:'#fff', padding:'10px 14px',
            fontFamily:'var(--font-body)', fontSize: 12, fontWeight: 600, letterSpacing:'.08em', textTransform:'uppercase',
          }}>
            Numune · Baskı · Nakış · Toplu Üretim
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Hero });
