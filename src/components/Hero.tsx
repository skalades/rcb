export default function Hero() {
  return (
    <section className="animate-reveal" style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: 'var(--bg-dark)',
      backgroundImage: 'linear-gradient(180deg, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.9) 100%), url("/hero_branded.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      {/* Dynamic Blur Elements */}
      <div style={{
        position: 'absolute',
        width: '40vw',
        height: '40vw',
        background: 'radial-gradient(circle, rgba(255, 215, 0, 0.08) 0%, transparent 70%)',
        top: '-10%',
        right: '-10%',
        filter: 'blur(100px)',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        width: '30vw',
        height: '30vw',
        background: 'radial-gradient(circle, rgba(255, 140, 0, 0.05) 0%, transparent 70%)',
        bottom: '10%',
        left: '-5%',
        filter: 'blur(80px)',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <p className="font-heading" style={{ 
          fontSize: '1rem', 
          color: 'var(--primary)', 
          textTransform: 'uppercase', 
          letterSpacing: '0.4em', 
          marginBottom: '2rem',
          opacity: 0.8
        }}>
          #TIMETOSHINE • Garut Premium Detailing
        </p>
        <h1 style={{ 
          fontSize: 'clamp(3rem, 8vw, 6.5rem)', 
          marginBottom: '2rem', 
          color: 'var(--text-main)', 
          lineHeight: 0.9,
          maxWidth: '900px',
          margin: '0 auto 2rem auto'
        }}>
          ESTABLISH <br />
          <span className="text-gradient">NEW STANDARDS</span>
        </h1>
        <p style={{ 
          fontSize: '1.25rem', 
          color: 'var(--text-muted)', 
          maxWidth: '600px', 
          margin: '0 auto 4rem auto', 
          lineHeight: '1.6',
          fontWeight: 500
        }}>
          Pencucian mobil premium dengan teknologi snow wash dan perawatan detail untuk kendaraan kesayangan Anda.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
          <a href="#contact" className="premium-btn">
            Booking Now
            <span style={{ fontSize: '1.2rem' }}>→</span>
          </a>
          <a href="#services" className="premium-btn-outline">
            Discover Services
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '3rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '1px',
        height: '80px',
        background: 'linear-gradient(to bottom, var(--primary), transparent)',
        opacity: 0.5
      }} />
    </section>
  );
}
