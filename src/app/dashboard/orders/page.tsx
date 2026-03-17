"use client";
import { useState, useEffect } from 'react';
import Modal from '@/components/dashboard/Modal';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [newOrder, setNewOrder] = useState({
    plateNumber: '',
    serviceId: '',
    memberPhone: '',
    assignedEmployeeId: '',
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ordersRes, servicesRes, employeesRes] = await Promise.all([
        fetch('/api/orders'),
        fetch('/api/services'),
        fetch('/api/employees'),
      ]);
      
      setOrders(await ordersRes.json());
      setServices(await servicesRes.json());
      setEmployees(await employeesRes.json());
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setNewOrder({ plateNumber: '', serviceId: '', memberPhone: '', assignedEmployeeId: '' });
        fetchData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchData();
  };

  const statusColors: any = {
    WAITING: '#ff9800',
    WASHING: '#2196f3',
    DRYING: '#9c27b0',
    FINISHED: '#4caf50',
  };

  return (
    <div>
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Antrean Kendaraan</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Kelola arus kerja pencucian secara real-time</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="premium-btn" 
          style={{ padding: '0.8rem 2rem' }}
        >
          + Input Kedatangan
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {loading ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '5rem', color: 'rgba(255,255,255,0.2)' }}>Memuat antrean...</div>
        ) : orders.length === 0 ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '5rem', color: 'rgba(255,255,255,0.2)' }}>Tidak ada kendaraan dalam antrean.</div>
        ) : orders.map((order) => (
          <div 
            key={order.id} 
            className="glass"
            style={{ 
              padding: '1.5rem', 
              borderRadius: '20px', 
              borderLeft: `4px solid ${statusColors[order.status]}`,
              background: 'rgba(255, 255, 255, 0.03)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '1px' }}>{order.plateNumber}</span>
              <span style={{ 
                fontSize: '0.6rem', 
                fontWeight: 800, 
                padding: '0.2rem 0.6rem', 
                borderRadius: '4px',
                backgroundColor: `${statusColors[order.status]}22`,
                color: statusColors[order.status],
                border: `1px solid ${statusColors[order.status]}44`
              }}>{order.status}</span>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Layanan</div>
              <div style={{ fontWeight: 600 }}>{order.service?.name || 'Manual Entry'}</div>
            </div>

            <select 
              value={order.status}
              onChange={(e) => updateStatus(order.id, e.target.value)}
              style={{ 
                width: '100%', 
                padding: '0.6rem', 
                borderRadius: '8px', 
                background: 'rgba(255,255,255,0.05)', 
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '0.8rem'
              }}
            >
              <option value="WAITING">Waiting</option>
              <option value="WASHING">Washing</option>
              <option value="DRYING">Drying</option>
              <option value="FINISHED">Finished</option>
            </select>
          </div>
        ))}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Input Kedatangan Baru"
      >
        <form onSubmit={handleCreateOrder} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '0.5rem' }}>Nomor Plat</label>
            <input
              type="text"
              value={newOrder.plateNumber}
              onChange={(e) => setNewOrder({ ...newOrder, plateNumber: e.target.value.toUpperCase() })}
              required
              className="glass"
              style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: '#fff' }}
              placeholder="B 1234 ABC"
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '0.5rem' }}>Pilih Karyawan (Optional)</label>
            <select
              value={newOrder.assignedEmployeeId}
              onChange={(e) => setNewOrder({ ...newOrder, assignedEmployeeId: e.target.value })}
              className="glass"
              style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: '#fff' }}
            >
              <option value="">-- Tanpa Penugasan --</option>
              {employees.map(e => <option key={e.id} value={e.id}>{e.name} ({e.role})</option>)}
            </select>
          </div>

          <button 
            type="submit" 
            className="premium-btn" 
            disabled={isSubmitting}
            style={{ marginTop: '1rem' }}
          >
            {isSubmitting ? 'Memproses...' : 'Daftarkan Kendaraan'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
