"use client";
import { useState, useEffect } from 'react';
import Modal from '@/components/dashboard/Modal';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ name: '', role: 'WASHER', commissionRate: 10 });

  const fetchEmployees = () => {
    setLoading(true);
    fetch('/api/employees')
      .then(res => res.json())
      .then(data => {
        setEmployees(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEmployee),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setNewEmployee({ name: '', role: 'WASHER', commissionRate: 10 });
        fetchEmployees();
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
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Manajemen Karyawan</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="premium-btn" 
          style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}
        >
          + Tambah Karyawan
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
              <th style={{ padding: '1.5rem 1rem' }}>Nama</th>
              <th style={{ padding: '1.5rem 1rem' }}>Peran</th>
              <th style={{ padding: '1.5rem 1rem' }}>Komisi (%)</th>
              <th style={{ padding: '1.5rem 1rem' }}>Total Komisi (Bulan Ini)</th>
              <th style={{ padding: '1.5rem 1rem', textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={{ padding: '4rem', textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>Menghubungkan ke server...</td></tr>
            ) : employees.length === 0 ? (
              <tr><td colSpan={5} style={{ padding: '4rem', textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>Belum ada data karyawan.</td></tr>
            ) : employees.map((emp, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.2s ease' }} className="table-row-hover">
                <td style={{ padding: '1.2rem 1rem', fontWeight: 500 }}>{emp.name}</td>
                <td style={{ padding: '1.2rem 1rem' }}>
                  <span style={{ 
                    padding: '0.2rem 0.6rem', 
                    borderRadius: '6px', 
                    fontSize: '0.7rem', 
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    color: 'rgba(255,255,255,0.7)'
                  }}>{emp.role}</span>
                </td>
                <td style={{ padding: '1.2rem 1rem' }}>{Number(emp.commissionRate)}%</td>
                <td style={{ padding: '1.2rem 1rem', color: 'var(--primary)', fontWeight: 700 }}>IDR 0</td>
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
        title="Tambah Karyawan Baru"
      >
        <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '0.5rem' }}>Nama Lengkap</label>
            <input
              type="text"
              value={newEmployee.name}
              onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
              required
              className="glass"
              style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: '#fff' }}
              placeholder="Contoh: Budi Santoso"
            />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '0.5rem' }}>Peran / Jabatan</label>
            <select
              value={newEmployee.role}
              onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
              className="glass"
              style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: '#fff' }}
            >
              <option value="WASHER">Washer (Tukang Cuci)</option>
              <option value="DETAILER">Detailer</option>
              <option value="SUPERVISOR">Supervisor</option>
              <option value="CASHIER">Kasir</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '0.5rem' }}>Rate Komisi (%)</label>
            <input
              type="number"
              value={newEmployee.commissionRate}
              onChange={(e) => setNewEmployee({ ...newEmployee, commissionRate: Number(e.target.value) })}
              required
              className="glass"
              style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: '#fff' }}
            />
          </div>
          <button 
            type="submit" 
            className="premium-btn" 
            disabled={isSubmitting}
            style={{ marginTop: '1rem' }}
          >
            {isSubmitting ? 'Menyimpan...' : 'Daftarkan Karyawan'}
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
