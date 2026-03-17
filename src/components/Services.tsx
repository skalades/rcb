"use client";

export default function Services() {
  const services = [
    { 
      title: 'Premium Snow Wash', 
      price: 'IDR 50k', 
      desc: 'Pencucian menggunakan busa salju pH-balanced premium yang aman untuk cat mobil, membersihkan kotoran hingga ke sela-sela terkecil.', 
      size: 'large' 
    },
    { 
      title: 'Interior Detail', 
      price: 'IDR 150k', 
      desc: 'Pembersihan mendalam kabin, jok, plafon, dan karpet untuk kenyamanan berkendara maksimal.', 
      size: 'small' 
    },
    { 
      title: 'Ceramic Coating', 
      price: 'IDR 1.5M', 
      desc: 'Perlindungan cat semi-permanen dengan efek hidrofobik tinggi dan kilau yang tahan hingga bertahun-tahun.', 
      size: 'medium' 
    },
    { 
      title: 'Engine Wash', 
      price: 'IDR 100k', 
      desc: 'Pembersihan area mesin dari debu dan kerak oli menggunakan teknik detailing yang aman bagi komponen elektrikal.', 
      size: 'small' 
    },
  ];

  return (
    <section id="services" className="section-padding" style={{ backgroundColor: 'var(--bg-dark)' }}>
      <div className="container" style={{ position: 'relative' }}>
        {/* Glow */}
        <div style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.03) 0%, transparent 70%)',
          top: '0',
          left: '-200px',
          filter: 'blur(100px)',
          zIndex: 0
        }} />

        <div style={{ textAlign: 'left', marginBottom: '6rem', maxWidth: '800px', position: 'relative', zIndex: 1 }}>
          <p style={{ color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.2em', marginBottom: '1rem', fontSize: '0.8rem' }}>LAYANAN PREMIUM</p>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1 }}>
            PERAWATAN <span className="text-gradient">TANPA KOMPROMI</span>
          </h2>
        </div>

        <div className="bento-grid" style={{ position: 'relative', zIndex: 1 }}>
          {/* Card 1: Large */}
          <div className="glass" style={{ 
            gridColumn: 'span 2', 
            gridRow: 'span 2', 
            borderRadius: 'var(--radius)', 
            padding: '4rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            position: 'relative',
            overflow: 'hidden',
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url("/gallery_1.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
            <h3 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{services[0].title}</h3>
            <p style={{ color: 'var(--text-main)', opacity: 0.8, marginBottom: '2.5rem', maxWidth: '400px' }}>{services[0].desc}</p>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)' }}>{services[0].price}</div>
          </div>

          {/* Card 2: Medium */}
          <div className="glass" style={{ 
            gridColumn: 'span 2', 
            gridRow: 'span 1', 
            borderRadius: 'var(--radius)', 
            padding: '2.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundImage: 'linear-gradient(90deg, rgba(0,0,0,0.8), rgba(0,0,0,0.3)), url("/hero_branded.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
            <div style={{ maxWidth: '300px' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{services[2].title}</h3>
              <p style={{ color: 'var(--text-main)', opacity: 0.8, fontSize: '0.9rem' }}>{services[2].desc}</p>
            </div>
            <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '1.5rem' }}>{services[2].price}</div>
          </div>

          {/* Card 3: Small */}
          <div className="glass" style={{ 
            gridColumn: 'span 1', 
            gridRow: 'span 1', 
            borderRadius: 'var(--radius)', 
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 215, 0, 0.05)'
          }}>
            <h4 style={{ color: 'var(--primary)', fontSize: '0.8rem', marginBottom: '1rem' }}>{services[1].title}</h4>
            <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', opacity: 0.7 }}>{services[1].desc}</p>
            <div style={{ color: '#fff', fontWeight: 800 }}>{services[1].price}</div>
          </div>

          {/* Card 4: Small */}
          <div className="glass" style={{ 
            gridColumn: 'span 1', 
            gridRow: 'span 1', 
            borderRadius: 'var(--radius)', 
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.02)'
          }}>
            <h4 style={{ color: 'var(--primary)', fontSize: '0.8rem', marginBottom: '1rem' }}>{services[3].title}</h4>
            <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', opacity: 0.7 }}>{services[3].desc}</p>
            <div style={{ color: '#fff', fontWeight: 800 }}>{services[3].price}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
