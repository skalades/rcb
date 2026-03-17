export default function Contact() {
  return (
    <section id="contact" className="section-padding" style={{ backgroundColor: 'var(--bg-dark)' }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2.5rem', 
          alignItems: 'stretch' 
        }}>
          
          <div className="glass" style={{ padding: 'clamp(2rem, 5vw, 4rem)', borderRadius: 'var(--radius)' }}>
            <p style={{ color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.2em', marginBottom: '1rem', fontSize: '0.8rem' }}>LOCATION</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', marginBottom: '2rem' }}>LET'S GET IN <span className="text-gradient">TOUCH</span></h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
              <div style={{ display: 'flex', gap: '1.25rem' }}>
                <span style={{ fontSize: '1.25rem', color: 'var(--primary)' }}>📍</span>
                <div>
                  <h4 style={{ marginBottom: '0.25rem', color: '#fff', fontSize: '1rem' }}>Address</h4>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.5, fontSize: '0.9rem' }}>Jl. Letjen Ibrahim Adjie, Rancabango, Kec. Tarogong Kaler, Kabupaten Garut</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1.25rem' }}>
                <span style={{ fontSize: '1.25rem', color: 'var(--primary)' }}>📞</span>
                <div>
                  <h4 style={{ marginBottom: '0.25rem', color: '#fff', fontSize: '1rem' }}>Phone</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>0851-3762-2221</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1.25rem' }}>
                <span style={{ fontSize: '1.25rem', color: 'var(--primary)' }}>⏰</span>
                <div>
                  <h4 style={{ marginBottom: '0.25rem', color: '#fff', fontSize: '1rem' }}>Opening Hours</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Monday - Sunday: 07:30 - 20:00 WIB</p>
                </div>
              </div>
            </div>

            <a href="https://wa.me/6285137622221" className="premium-btn" style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}>
              Book via Whatsapp
            </a>
          </div>

          <div style={{ 
            borderRadius: 'var(--radius)', 
            overflow: 'hidden',
            border: '1px solid var(--glass-border)',
            position: 'relative',
            minHeight: '300px'
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
