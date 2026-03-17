export default function About() {
  return (
    <section id="about" className="section-padding" style={{ borderTop: '1px solid var(--glass-border)' }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '4rem', 
          alignItems: 'center' 
        }}>
          <div style={{ position: 'relative' }}>
            <div className="glass" style={{
              borderRadius: 'var(--radius)',
              height: 'clamp(300px, 50vw, 500px)',
              backgroundImage: 'url("/hero_branded.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              zIndex: 1
            }} />
            <div style={{
              position: 'absolute',
              top: '-1rem',
              left: '-1rem',
              width: '100%',
              height: '100%',
              border: '2px solid var(--primary)',
              borderRadius: 'var(--radius)',
              zIndex: 0
            }} />
          </div>
          
          <div>
            <p style={{ color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.2em', marginBottom: '1rem', fontSize: '0.8rem' }}>ABOUT RCB CARWASH</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', marginBottom: '1.5rem' }}>CRAFTING THE <br /><span className="text-gradient">PERFECT SHINE</span></h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '1rem', marginBottom: '1.5rem' }}>
              Berdedikasi untuk memberikan perawatan kendaraan terbaik di Garut. Kami mengombinasikan teknologi pencucian modern dengan ketelitian artisan untuk memastikan kendaraan Anda kembali seperti baru.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '1rem', marginBottom: '2.5rem' }}>
              Terletak di lokasi strategis SPBU Pertamina 3441131, kami menawarkan pengalaman pencucian premium yang efisien namun tetap mendetail. Setiap kendaraan adalah mahakarya bagi kami.
            </p>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>3,800+</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Google Reviews</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>100%</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
