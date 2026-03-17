"use client";
import { useState, useEffect } from 'react';

export default function CommissionsPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/employees?includeCommissions=true')
      .then(res => res.json())
      .then(data => {
        // Since /api/employees might not include commissions by default, 
        // I might need to adjust that API or fetch commissions separately.
        // For now, let's assume we can get it or I'll implement a dedicated API.
        setEmployees(data);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Reward & <span style={{ color: 'var(--primary)' }}>Komisi</span></h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Pantau performa dan akumulasi pendapatan staff operasional</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
        {loading ? (
          <p style={{ opacity: 0.3 }}>Memuat data komisi...</p>
        ) : employees.map(emp => (
          <div key={emp.id} className="glass" style={{ padding: '2rem', borderRadius: '24px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{emp.name}</h3>
                <span style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase' }}>{emp.role}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Rate Komisi</div>
                <div style={{ fontWeight: 800 }}>{Number(emp.commissionRate)}%</div>
              </div>
            </div>

            <div style={{ padding: '1.5rem', background: 'rgba(255, 215, 0, 0.03)', borderRadius: '16px', border: '1px solid rgba(255, 215, 0, 0.05)' }}>
              <div style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '0.5rem' }}>Total Akumulasi</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--primary)' }}>
                IDR {emp.commissions?.reduce((acc: number, curr: any) => acc + Number(curr.amount), 0).toLocaleString() || '0'}
              </div>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '1rem' }}>Pekerjaan Terakhir</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {emp.commissions?.slice(0, 3).map((comm: any, i: number) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', opacity: 0.6 }}>
                    <span>Order #{comm.orderId.slice(0, 8)}</span>
                    <span style={{ color: '#4caf50' }}>+IDR {Number(comm.amount).toLocaleString()}</span>
                  </div>
                ))}
                {!emp.commissions?.length && <p style={{ fontSize: '0.75rem', opacity: 0.3 }}>Belum ada riwayat komisi.</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
