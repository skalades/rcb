"use client";
import { useState, useEffect } from 'react';
import Modal from '@/components/dashboard/Modal';

export default function InventoryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', unit: 'Liter', quantity: 0, minQuantity: 0 });

  const fetchItems = () => {
    setLoading(true);
    fetch('/api/inventory')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setItems([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setNewItem({ name: '', unit: 'Liter', quantity: 0, minQuantity: 0 });
        fetchItems();
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
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Inventaris</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="premium-btn" 
          style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}
        >
          + Tambah Barang
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
              <th style={{ padding: '1.5rem 1rem' }}>Nama Barang</th>
              <th style={{ padding: '1.5rem 1rem' }}>Stok</th>
              <th style={{ padding: '1rem' }}>Satuan</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={{ padding: '4rem', textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>Menghubungkan ke server...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={5} style={{ padding: '4rem', textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>Belum ada data barang.</td></tr>
            ) : items.map((item, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.2s ease' }} className="table-row-hover">
                <td style={{ padding: '1.2rem 1rem', fontWeight: 500 }}>{item.name}</td>
                <td style={{ padding: '1.2rem 1rem' }}>{Number(item.quantity).toLocaleString()}</td>
                <td style={{ padding: '1.2rem 1rem', color: 'rgba(255,255,255,0.5)' }}>{item.unit}</td>
                <td style={{ padding: '1.2rem 1rem' }}>
                  <span style={{ 
                    padding: '0.3rem 0.8rem', 
                    borderRadius: '50px', 
                    fontSize: '0.65rem', 
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    backgroundColor: Number(item.quantity) <= Number(item.minQuantity) ? 'rgba(255, 68, 68, 0.1)' : 'rgba(68, 255, 68, 0.05)',
                    color: Number(item.quantity) <= Number(item.minQuantity) ? '#ff4444' : '#44ff44',
                    border: Number(item.quantity) <= Number(item.minQuantity) ? '1px solid rgba(255, 68, 68, 0.2)' : '1px solid rgba(68, 255, 68, 0.1)'
                  }}>
                    {Number(item.quantity) <= Number(item.minQuantity) ? 'Low Stock' : 'Safe'}
                  </span>
                </td>
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
        title="Tambah Barang Inventaris"
      >
        <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '0.5rem' }}>Nama Barang</label>
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              required
              className="glass"
              style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: '#fff' }}
              placeholder="Contoh: Sabun Cuci"
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '0.5rem' }}>Jumlah Stok</label>
              <input
                type="number"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
                required
                className="glass"
                style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: '#fff' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '0.5rem' }}>Satuan</label>
              <select
                value={newItem.unit}
                onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                className="glass"
                style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: '#fff' }}
              >
                <option value="Liter">Liter</option>
                <option value="Pcs">Pcs</option>
                <option value="Box">Box</option>
                <option value="Kg">Kg</option>
              </select>
            </div>
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '0.5rem' }}>Batas Stok Minimum</label>
            <input
              type="number"
              value={newItem.minQuantity}
              onChange={(e) => setNewItem({ ...newItem, minQuantity: Number(e.target.value) })}
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
            {isSubmitting ? 'Menyimpan...' : 'Simpan Barang'}
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
