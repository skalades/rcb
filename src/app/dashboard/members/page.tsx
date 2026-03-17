"use client";
import { useState, useEffect } from 'react';
import Modal from '@/components/dashboard/Modal';

export default function MembersPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', phone: '', plateNumber: '', tier: 'SILVER' });

  const fetchMembers = () => {
    setLoading(true);
    fetch('/api/members')
      .then(res => res.json())
      .then(data => {
        setMembers(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMember),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setNewMember({ name: '', phone: '', plateNumber: '', tier: 'SILVER' });
        fetchMembers();
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
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Membership & Loyalty</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="premium-btn" 
          style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}
        >
          + Tambah Member
        </button>
      </header>

      <section style={{ 
        background: 'rgba(255, 255, 255, 0.02)', 
        backdropFilter: 'blur(20px)',
        borderRadius: '24px', 
        padding: '2rem',
        border: '1px solid rgba(255, 215, 0, 0.05)'
      }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <th style={{ padding: '1.5rem 1rem' }}>Nama Member</th>
              <th style={{ padding: '1.5rem 1rem' }}>No. HP</th>
              <th style={{ padding: '1.5rem 1rem' }}>Plat Nomor</th>
              <th style={{ padding: '1.5rem 1rem' }}>Tier</th>
              <th style={{ padding: '1.5rem 1rem' }}>Poin</th>
              <th style={{ padding: '1.5rem 1rem', textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ padding: '4rem', textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>Menghubungkan ke server...</td></tr>
            ) : members.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: '4rem', textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>Belum ada data member.</td></tr>
            ) : members.map((member, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.2s ease' }} className="table-row-hover">
                <td style={{ padding: '1.2rem 1rem', fontWeight: 500 }}>{member.name}</td>
                <td style={{ padding: '1.2rem 1rem', color: 'rgba(255,255,255,0.6)' }}>{member.phone}</td>
                <td style={{ padding: '1.2rem 1rem' }}>{member.plateNumber}</td>
                <td style={{ padding: '1.2rem 1rem' }}>
                  <span style={{ 
                    padding: '0.3rem 0.8rem', 
                    borderRadius: '50px', 
                    fontSize: '0.65rem', 
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    backgroundColor: member.tier === 'PLATINUM' ? 'rgba(255, 215, 0, 0.15)' : member.tier === 'GOLD' ? 'rgba(212, 175, 55, 0.1)' : 'rgba(255,255,255,0.05)',
                    color: member.tier === 'PLATINUM' ? 'var(--primary)' : member.tier === 'GOLD' ? '#d4af37' : 'rgba(255,255,255,0.5)',
                    border: member.tier === 'PLATINUM' ? '1px solid rgba(255, 215, 0, 0.2)' : '1px solid rgba(255,255,255,0.1)'
                  }}>
                    {member.tier}
                  </span>
                </td>
                <td style={{ padding: '1.2rem 1rem', color: 'var(--primary)', fontWeight: 800 }}>{member.points} pts</td>
                <td style={{ padding: '1.2rem 1rem', textAlign: 'right' }}>
                  <button style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: 'rgba(255,255,255,0.4)', 
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Daftarkan Member Baru"
      >
        <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '0.5rem' }}>Nama Lengkap</label>
            <input
              type="text"
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              required
              className="glass"
              style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: '#fff' }}
              placeholder="Contoh: Anto Wijaya"
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '0.5rem' }}>No. WhatsApp</label>
              <input
                type="tel"
                value={newMember.phone}
                onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                required
                className="glass"
                style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: '#fff' }}
                placeholder="0812..."
              />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '0.5rem' }}>No. Plat Utama</label>
              <input
                type="text"
                value={newMember.plateNumber}
                onChange={(e) => setNewMember({ ...newMember, plateNumber: e.target.value.toUpperCase() })}
                required
                className="glass"
                style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: '#fff' }}
                placeholder="B 1234 ABC"
              />
            </div>
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '0.5rem' }}>Membership Tier</label>
            <select
              value={newMember.tier}
              onChange={(e) => setNewMember({ ...newMember, tier: e.target.value })}
              className="glass"
              style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: '#fff' }}
            >
              <option value="SILVER">Silver Member</option>
              <option value="GOLD">Gold Member</option>
              <option value="PLATINUM">Platinum Member</option>
            </select>
          </div>
          <button 
            type="submit" 
            className="premium-btn" 
            disabled={isSubmitting}
            style={{ marginTop: '1rem' }}
          >
            {isSubmitting ? 'Mendaftarkan...' : 'Simpan Data Member'}
          </button>
        </form>
      </Modal>

      <style jsx>{`
        .table-row-hover:hover {
          background: rgba(255, 215, 0, 0.02);
        }
      `}</style>
    </div>
  );
}
