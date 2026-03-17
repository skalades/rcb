"use client";
import { useState, useEffect } from 'react';
import Modal from '@/components/dashboard/Modal';

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newService, setNewService] = useState({ id: '', name: '', description: '', price: 0, duration: 30 });

  const fetchServices = () => {
    setLoading(true);
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        setServices(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const finalId = newService.id || newService.name.toLowerCase().replace(/ /g, '-');
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newService, id: finalId }),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setNewService({ id: '', name: '', description: '', price: 0, duration: 30 });
        fetchServices();
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
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Layanan Carwash</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="premium-btn" 
          style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}
        >
          + Tambah Layanan
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {loading ? (
          <p style={{ gridColumn: '1/-1', textAlign: 'center', padding: '5rem', color: 'rgba(255,255,255,0.3)' }}>Memuat data layanan...</p>
        ) : services.length === 0 ? (
          <p style={{ gridColumn: '1/-1', textAlign: 'center', padding: '5rem', color: 'rgba(255,255,255,0.3)' }}>Belum ada layanan yang terdaftar.</p>
        ) : services.map((service, i) => (
          <div key={i} className="glass" style={{ padding: '2rem', borderRadius: '24px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,215,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
               <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{service.name}</h3>
               <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700 }}>{service.duration} mnt</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '2rem', minHeight: '3em' }}>{service.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <span style={{ fontSize: '1.1rem', fontWeight: 900 }}>IDR {Number(service.price).toLocaleString()}</span>
               <button style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '0.8rem' }}>Edit</button>
            </div>
          </div>
        ))}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Tambah Layanan Baru"
      >
        <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '0.5rem' }}>Nama Layanan</label>
            <input
              type="text"
              value={newService.name}
              onChange={(e) => setNewService({ ...newService, name: e.target.value })}
              required
              className="glass"
              style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: '#fff' }}
              placeholder="Contoh: Ceramic Coating"
            />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '0.5rem' }}>Deskripsi Singkat</label>
            <textarea
              value={newService.description}
              onChange={(e) => setNewService({ ...newService, description: e.target.value })}
              required
              className="glass"
              style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: '#fff', minHeight: '80px' }}
              placeholder="Jelaskan detail layanan..."
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '0.5rem' }}>Harga (IDR)</label>
              <input
                type="number"
                value={newService.price}
                onChange={(e) => setNewService({ ...newService, price: Number(e.target.value) })}
                required
                className="glass"
                style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: '#fff' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '0.5rem' }}>Estimasi (Menit)</label>
              <input
                type="number"
                value={newService.duration}
                onChange={(e) => setNewService({ ...newService, duration: Number(e.target.value) })}
                required
                className="glass"
                style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: '#fff' }}
              />
            </div>
          </div>
          <button 
            type="submit" 
            className="premium-btn" 
            disabled={isSubmitting}
            style={{ marginTop: '1rem' }}
          >
            {isSubmitting ? 'Menyimpan...' : 'Simpan Layanan'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
