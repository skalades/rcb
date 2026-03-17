"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/dashboard');
        router.refresh();
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at top left, #1a1a1a, #000)',
      padding: '2rem'
    }}>
      <div className="glass" style={{
        width: '100%',
        maxWidth: '400px',
        padding: '3rem',
        borderRadius: '24px',
        textAlign: 'center',
        border: '1px solid rgba(255, 215, 0, 0.2)'
      }}>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: 800, 
          marginBottom: '0.5rem',
          color: 'var(--primary)' 
        }}>RCB ADMIN</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>
          Portal Manajemen Carwash
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Email Adress</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,215,0,0.1)',
                borderRadius: '12px',
                color: '#fff',
                outline: 'none'
              }}
              placeholder="admin@rcb.com"
            />
          </div>

          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,215,0,0.1)',
                borderRadius: '12px',
                color: '#fff',
                outline: 'none'
              }}
              placeholder="••••••••"
            />
          </div>

          {error && <div style={{ color: '#ff4444', fontSize: '0.8rem' }}>{error}</div>}

          <button 
            type="submit" 
            className="premium-btn" 
            disabled={loading}
            style={{ width: '100%', marginTop: '1rem' }}
          >
            {loading ? 'Authenticating...' : 'Login Ke Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}
