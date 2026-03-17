"use client";

import Link from 'next/link';

const Icons = {
  Services: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    </svg>
  ),
  About: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  ),
  Gallery: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
      <circle cx="9" cy="9" r="2"/>
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
    </svg>
  ),
  Contact: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  )
};

export default function BottomNav() {
  return (
    <nav className="glass show-on-mobile" style={{
      position: 'fixed',
      bottom: '1.5rem',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 3rem)',
      maxWidth: '500px',
      padding: '0.75rem 1.75rem',
      borderRadius: '50px',
      zIndex: 1000,
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
    }}>
      <Link href="#services" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.6)' }}>
        <Icons.Services />
        <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.05em' }}>LAYANAN</span>
      </Link>
      <Link href="#about" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.6)' }}>
        <Icons.About />
        <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.05em' }}>TENTANG</span>
      </Link>
      <Link href="/" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'var(--accent-gradient)',
        width: '54px',
        height: '54px',
        borderRadius: '50%',
        marginTop: '-2.2rem',
        boxShadow: '0 8px 20px rgba(255, 215, 0, 0.4)',
        border: '5px solid var(--bg-dark)',
        transition: 'transform 0.3s ease'
      }}>
        <span style={{ fontWeight: 900, color: '#000', fontSize: '1.1rem', letterSpacing: '0.05em' }}>RCB</span>
      </Link>
      <Link href="#gallery" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.6)' }}>
        <Icons.Gallery />
        <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.05em' }}>GALLERY</span>
      </Link>
      <Link href="https://wa.me/6285137622221" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.6)' }}>
        <Icons.Contact />
        <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.05em' }}>KONTAK</span>
      </Link>
    </nav>
  );
}
