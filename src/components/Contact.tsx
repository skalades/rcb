export default function Contact() {
  return (
    <section id="contact" className="section-padding" style={{ backgroundColor: 'var(--bg-dark)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'stretch' }}>
          
          <div className="glass" style={{ padding: '4rem', borderRadius: 'var(--radius)' }}>
            <p style={{ color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.2em', marginBottom: '1.5rem', fontSize: '0.8rem' }}>LOCATION</p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '2.5rem' }}>LET'S GET IN <span className="text-gradient">TOUCH</span></h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', marginBottom: '4rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <span style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>📍</span>
                <div>
                  <h4 style={{ marginBottom: '0.5rem', color: '#fff' }}>Address</h4>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Jl. Letjen Ibrahim Adjie, Rancabango, Kec. Tarogong Kaler, Kabupaten Garut</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <span style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>📞</span>
                <div>
                  <h4 style={{ marginBottom: '0.5rem', color: '#fff' }}>Phone</h4>
                  <p style={{ color: 'var(--text-muted)' }}>0851-3762-2221</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <span style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>⏰</span>
                <div>
                  <h4 style={{ marginBottom: '0.5rem', color: '#fff' }}>Opening Hours</h4>
                  <p style={{ color: 'var(--text-muted)' }}>Monday - Sunday: 07:30 - 20:00 WIB</p>
                </div>
              </div>
            </div>

            <a href="https://wa.me/6285137622221" className="premium-btn" style={{ width: '100%', justifyContent: 'center' }}>
              Book via Whatsapp
            </a>
          </div>

          <div style={{ 
            borderRadius: 'var(--radius)', 
            overflow: 'hidden',
            border: '1px solid var(--glass-border)',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(180deg, rgba(5,5,5,0) 0%, rgba(5,5,5,0.8) 100%)',
              zIndex: 1,
              pointerEvents: 'none'
            }} />
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0a0a0a', color: '#333' }}>
              [Interactive Map View]
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
