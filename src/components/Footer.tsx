export default function Footer() {
  return (
    <footer style={{
      padding: '6rem 0',
      backgroundColor: 'var(--bg-dark)',
      borderTop: '1px solid var(--glass-border)',
      textAlign: 'center'
    }}>
      <div className="container">
        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', letterSpacing: '0.2em' }}>RCB <span className="text-primary">CARWASH</span></h2>
        <div style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', marginBottom: '3rem', fontSize: '0.8rem', fontWeight: 600, opacity: 0.6 }}>
          <a href="#services">SERVICES</a>
          <a href="#gallery">GALLERY</a>
          <a href="#contact">CONTACT</a>
        </div>
        <p style={{ color: '#333', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
          &copy; {new Date().getFullYear()} RCB CAR WASH. DESIGNED FOR EXCELLENCE.
        </p>
      </div>
    </footer>
  );
}
