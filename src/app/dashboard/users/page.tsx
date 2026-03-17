"use client";
import { useState, useEffect } from 'react';
import Modal from '@/components/dashboard/Modal';

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'CASHIER' });

  const fetchUsers = () => {
    setLoading(true);
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setNewUser({ name: '', email: '', password: '', role: 'CASHIER' });
        fetchUsers();
      } else {
        const err = await res.json();
        alert(err.error || 'Gagal menambahkan user');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Manajemen <span style={{ color: 'var(--primary)' }}>Staff</span></h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Kelola akses akun Admin, Manager, dan Cashier</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="premium-btn" 
          style={{ padding: '0.8rem 2rem' }}
        >
          + Tambah Akun
        </button>
      </header>

      <section className="glass" style={{ borderRadius: '24px', overflow: 'hidden', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.03)', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              <th style={{ padding: '1.2rem 2rem' }}>Nama</th>
              <th style={{ padding: '1.2rem' }}>Email</th>
              <th style={{ padding: '1.2rem' }}>Role</th>
              <th style={{ padding: '1.2rem', textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} style={{ padding: '4rem', textAlign: 'center', opacity: 0.3 }}>Memuat data...</td></tr>
            ) : users.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <td style={{ padding: '1.2rem 2rem', fontWeight: 600 }}>{user.name}</td>
                <td style={{ padding: '1.2rem', color: 'rgba(255,255,255,0.6)' }}>{user.email}</td>
                <td style={{ padding: '1.2rem' }}>
                  <span style={{ 
                    fontSize: '0.7rem', 
                    fontWeight: 800, 
                    padding: '0.2rem 0.6rem', 
                    borderRadius: '4px',
                    background: user.role === 'ADMIN' ? 'rgba(255, 68, 68, 0.1)' : user.role === 'MANAGER' ? 'rgba(33, 150, 243, 0.1)' : 'rgba(76, 175, 80, 0.1)',
                    color: user.role === 'ADMIN' ? '#ff4444' : user.role === 'MANAGER' ? '#2196f3' : '#4caf50'
                  }}>{user.role}</span>
                </td>
                <td style={{ padding: '1.2rem', textAlign: 'right' }}>
                  <button style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.2)', cursor: 'not-allowed' }}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Tambah Akun Baru">
        <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '0.5rem' }}>Nama Lengkap</label>
            <input
              type="text"
              required
              className="glass"
              style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: '#fff' }}
              value={newUser.name}
              onChange={e => setNewUser({...newUser, name: e.target.value})}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '0.5rem' }}>Email</label>
            <input
              type="email"
              required
              className="glass"
              style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: '#fff' }}
              value={newUser.email}
              onChange={e => setNewUser({...newUser, email: e.target.value})}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '0.5rem' }}>Password</label>
            <input
              type="password"
              required
              className="glass"
              style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: '#fff' }}
              value={newUser.password}
              onChange={e => setNewUser({...newUser, password: e.target.value})}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '0.5rem' }}>Role</label>
            <select
              className="glass"
              style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: '#fff' }}
              value={newUser.role}
              onChange={e => setNewUser({...newUser, role: e.target.value})}
            >
              <option value="ADMIN">Admin</option>
              <option value="MANAGER">Manager</option>
              <option value="CASHIER">Cashier</option>
            </select>
          </div>
          <button type="submit" disabled={isSubmitting} className="premium-btn" style={{ marginTop: '1rem' }}>
            {isSubmitting ? 'Memproses...' : 'Simpan Akun'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
