// Shared layout + Button + Logo for the Kardeşler marketing kit.
const { useState } = React;

const cx = (...a) => a.filter(Boolean).join(' ');

function Logo({ variant = 'navy', size = 44 }) {
  const src = variant === 'cream'
    ? '../../assets/logo-wordmark-cream.svg'
    : '../../assets/logo-wordmark.svg';
  return <img src={src} alt="Kardeşler Tekstil" style={{ height: size, width: 'auto', display: 'block' }} />;
}

function Monogram({ size = 40 }) {
  return <img src="../../assets/logo-monogram.svg" width={size} height={size} alt="" style={{ display: 'block' }}/>;
}

function Icon({ name, size = 20, stroke = 2, color = 'currentColor' }) {
  // minimal inline Lucide icons — we draw the ones we use to avoid CDN flakiness
  const paths = {
    'arrow-right': 'M5 12h14M13 6l6 6-6 6',
    'message-circle': 'M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z',
    'mail': 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 4l8 5 8-5',
    'map-pin': 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 13a3 3 0 100-6 3 3 0 000 6z',
    'phone': 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z',
    'check': 'M20 6L9 17l-5-5',
    'factory': 'M2 20V12l6 3V9l6 4V7l6 4v9H2zM6 16h2M10 16h2M14 16h2M18 16h0',
    'menu': 'M3 6h18M3 12h18M3 18h18',
    'x': 'M18 6L6 18M6 6l12 12',
    'package': 'M16.5 9.4L7.5 4.2M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z M3.3 7L12 12l8.7-5M12 22V12',
  };
  const d = paths[name];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
         style={{ display: 'inline-block', flexShrink: 0 }}>
      <path d={d}/>
    </svg>
  );
}

function Button({ variant = 'primary', size = 'md', children, onClick, icon, iconRight, style: styleOverride, ...rest }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    fontFamily: 'var(--font-body)', fontWeight: 600,
    fontSize: size === 'sm' ? 12 : 14,
    padding: size === 'sm' ? '7px 12px' : '11px 20px',
    borderRadius: 2, border: '1px solid transparent',
    cursor: 'pointer', letterSpacing: '.01em',
    transition: 'all 150ms var(--ease-out)',
    textDecoration: 'none',
  };
  const variants = {
    primary:   { background: 'var(--navy-700)', color: 'var(--cream-50)' },
    secondary: { background: 'transparent', color: 'var(--navy-700)', border: '1px solid var(--navy-700)' },
    'secondary-on-dark': { background: 'transparent', color: 'var(--cream-100)', border: '1px solid var(--cream-100)' },
    ghost:     { background: 'transparent', color: 'var(--navy-700)' },
    whatsapp:  { background: '#25D366', color: '#fff' },
    accent:    { background: 'var(--orange-500)', color: '#fff' },
  };
  const [hover, setHover] = useState(false);
  const hoverBg = { primary:'var(--navy-800)', secondary:'var(--navy-700)', 'secondary-on-dark':'var(--cream-100)', ghost:'var(--steel-100)', whatsapp:'#1EBA58', accent:'var(--orange-600)' };
  const hoverFg = { secondary:'var(--cream-50)', 'secondary-on-dark':'var(--navy-700)' };
  const style = {
    ...base, ...variants[variant],
    ...(hover ? { background: hoverBg[variant], color: hoverFg[variant] || variants[variant].color } : {}),
    ...(styleOverride || {}),
  };
  return (
    <button style={style} onClick={onClick} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} {...rest}>
      {icon && <Icon name={icon} size={size === 'sm' ? 14 : 16} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === 'sm' ? 14 : 16} />}
    </button>
  );
}

Object.assign(window, { Logo, Monogram, Icon, Button, cx });
