// Header, Footer, WhatsAppFAB

function Header({ route, onNavigate }) {
  const items = [
    { id: 'home', label: 'Ana Sayfa' },
    { id: 'products', label: 'Ürünlerimiz' },
    { id: 'references', label: 'Referanslarımız' },
    { id: 'about', label: 'Hakkımızda' },
    { id: 'contact', label: 'İletişim' },
  ];
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 20,
      background: 'var(--navy-700)', color: 'var(--cream-50)',
      borderBottom: '2px solid var(--orange-500)',
      height: 72,
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', height: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a onClick={() => onNavigate('home')} style={{ cursor:'pointer', display:'flex', alignItems:'center' }}>
          <Logo variant="cream" size={44}/>
        </a>
        <nav style={{ display: 'flex', gap: 28 }}>
          {items.map(it => (
            <a key={it.id} onClick={() => onNavigate(it.id)}
               style={{
                 cursor: 'pointer',
                 fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
                 letterSpacing: '.08em', textTransform: 'uppercase',
                 color: route === it.id ? '#fff' : 'var(--navy-100)',
                 borderBottom: route === it.id ? '2px solid var(--orange-500)' : '2px solid transparent',
                 paddingBottom: 4,
               }}>{it.label}</a>
          ))}
        </nav>
        <Button variant="accent" icon="message-circle" onClick={() => onNavigate('contact')}>
          Teklif Al
        </Button>
      </div>
    </header>
  );
}

function Footer({ onNavigate }) {
  return (
    <footer style={{ background: 'var(--navy-800)', color: 'var(--cream-100)', padding: '56px 0 24px' }}>
      <div style={{ maxWidth: 1280, margin:'0 auto', padding: '0 32px',
                    display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr 1fr', gap: 48 }}>
        <div>
          <Logo variant="cream" size={44}/>
          <p style={{ marginTop: 20, fontSize: 14, color: 'var(--cream-200)', lineHeight: 1.6, maxWidth: 320 }}>
            1982'den bu yana kurumsal firmalara özel iş kıyafeti üretiyoruz. Tişört, polo, tulum, önlük ve promosyon tekstili.
          </p>
        </div>
        <div>
          <div style={{ fontFamily:'var(--font-display)', fontSize: 14, textTransform:'uppercase', letterSpacing:'.1em', marginBottom: 16 }}>Site</div>
          {['Ana Sayfa','Ürünlerimiz','Referanslarımız','Hakkımızda'].map(x =>
            <a key={x} onClick={()=>onNavigate(x==='Ana Sayfa'?'home':'products')}
               style={{cursor:'pointer',display:'block',fontSize:13,color:'var(--cream-200)',padding:'4px 0'}}>{x}</a>
          )}
        </div>
        <div>
          <div style={{ fontFamily:'var(--font-display)', fontSize: 14, textTransform:'uppercase', letterSpacing:'.1em', marginBottom: 16 }}>İletişim</div>
          <div style={{ display:'flex', alignItems:'flex-start', gap:10, fontSize: 13, color: 'var(--cream-200)', marginBottom: 10, lineHeight: 1.5 }}>
            <Icon name="map-pin" size={16}/><span>Fevzi Çakmak, Manolya Sk. 11-12/A, 34899 Pendik / İstanbul</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10, fontSize: 13, color: 'var(--cream-200)', marginBottom: 8 }}>
            <Icon name="phone" size={16}/><span>0216 396 19 88</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10, fontSize: 13, color: 'var(--cream-200)' }}>
            <Icon name="mail" size={16}/><span>kardesler@kardeslertekstil.com.tr</span>
          </div>
        </div>
        <div>
          <div style={{ fontFamily:'var(--font-display)', fontSize: 14, textTransform:'uppercase', letterSpacing:'.1em', marginBottom: 16 }}>Hızlı Teklif</div>
          <Button variant="whatsapp" icon="message-circle">Whatsapp'tan Teklif Al</Button>
        </div>
      </div>
      <div style={{ maxWidth:1280, margin:'40px auto 0', padding:'20px 32px 0', borderTop:'1px solid var(--navy-500)',
                    display:'flex', justifyContent:'space-between', fontSize: 11, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--navy-200)' }}>
        <span>© 2026 Kardeşler Tekstil A.Ş.</span>
        <span>EST. 1982 · Pendik / İstanbul</span>
      </div>
    </footer>
  );
}

function WhatsAppFAB({ onClick }) {
  return (
    <button onClick={onClick} aria-label="WhatsApp"
      style={{
        position:'fixed', bottom: 24, right: 24, width: 56, height: 56,
        borderRadius: 999, background:'#25D366', border:'none',
        color:'#fff', display:'grid', placeItems:'center',
        boxShadow:'0 8px 24px rgba(37,211,102,.45)', cursor:'pointer', zIndex: 30,
      }}>
      <Icon name="message-circle" size={28} />
    </button>
  );
}

Object.assign(window, { Header, Footer, WhatsAppFAB });
