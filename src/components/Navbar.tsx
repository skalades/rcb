import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="hide-on-mobile" style={{
      position: 'fixed',
      top: '1.5rem',
      left: 0,
      width: '100%',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center'
    }}>
      <nav className="glass" style={{
        width: 'max-content',
        padding: '0.75rem 2.5rem',
        borderRadius: '50px',
        display: 'flex',
        alignItems: 'center',
        gap: '4rem',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
      }}>
        <Link href="/" style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '0.15em' }}>
          RCB <span style={{ color: '#fff' }}>CARWASH</span>
        </Link>
        <div style={{ display: 'flex', gap: '2.5rem', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em' }}>
          <Link href="#services" style={{ opacity: 0.6 }}>LAYANAN</Link>
          <Link href="#about" style={{ opacity: 0.6 }}>TENTANG</Link>
          <Link href="#gallery" style={{ opacity: 0.6 }}>GALLERY</Link>
          <Link href="#contact" style={{ opacity: 0.6 }}>KONTAK</Link>
        </div>
        <Link href="/dashboard" className="premium-btn" style={{ padding: '0.6rem 1.4rem', fontSize: '0.7rem', borderRadius: '50px' }}>
          ADMIN PORTAL
        </Link>
      </nav>
    </div>
  );
}
