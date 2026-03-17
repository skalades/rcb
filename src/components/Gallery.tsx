"use client";

export default function Gallery() {
  const images = [
    { id: 1, type: 'EXTERIOR', url: '/gallery_1.png' },
    { id: 2, type: 'INTERIOR', url: '/gallery_2.png' },
    { id: 3, type: 'DETAILING', url: '/hero_branded.png' },
    { id: 4, type: 'PROCESS', url: '/gallery_1.png' },
    { id: 5, type: 'RESULTS', url: '/gallery_2.png' },
    { id: 6, type: 'PREMIUM', url: '/hero_branded.png' },
  ];

  return (
    <section id="gallery" className="section-padding" style={{ backgroundColor: 'var(--bg-dark)' }}>
      <div className="container" style={{ position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>BEYOND <span className="text-gradient">CLEAN</span></h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Hasil pengerjaan detail yang menunjukkan dedikasi kami di RCB CARWASH.</p>
        </div>
        
        <div className="bento-grid" style={{ 
          position: 'relative', 
          zIndex: 1,
          gridAutoRows: '200px'
        }}>
          {images.map((img, i) => (
            <div key={img.id} className="glass" style={{
              borderRadius: 'var(--radius)',
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer',
              gridColumn: i === 0 || i === 5 ? 'span 2' : 'span 1',
              gridRow: i === 1 || i === 4 ? 'span 2' : 'span 1',
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#111',
                backgroundImage: `linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.8) 100%), url("${img.url}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.5s ease'
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <div style={{
                position: 'absolute',
                bottom: '2rem',
                left: '2rem',
                color: 'var(--primary)',
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.1em',
                pointerEvents: 'none'
              }}>
                {img.type}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
