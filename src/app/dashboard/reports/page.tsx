"use client";
import { useState, useEffect } from 'react';

export default function ReportsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reports')
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Laporan & <span style={{ color: 'var(--primary)' }}>Business Intelligence</span></h1>
        <p style={{ color: 'rgba(255,255,255,0.5)' }}>Analisis kinerja operasional dan finansial RCB Carwash.</p>
      </header>


      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
        <section style={{ backgroundColor: 'var(--bg-surface)', borderRadius: '8px', padding: '2rem' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Tren Pendapatan Mingguan</h2>
          <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #333' }}>
            {data?.revenueTrend?.map((item: any, i: number) => {
              const maxRevenue = Math.max(...data.revenueTrend.map((d: any) => d.revenue), 1);
              const height = (item.revenue / maxRevenue) * 100;
              return (
                <div key={i} style={{ 
                  flex: 1, 
                  backgroundColor: 'var(--primary)', 
                  height: `${height}%`, 
                  borderRadius: '4px 4px 0 0',
                  opacity: 0.7,
                  position: 'relative'
                }}>
                  <div style={{ position: 'absolute', top: '-1.5rem', left: '50%', transform: 'translateX(-50%)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)' }}>
                    {item.revenue > 0 ? (item.revenue / 1000).toFixed(0) + 'k' : ''}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.7rem' }}>
            {data?.revenueTrend?.map((item: any, i: number) => <span key={i}>{item.day}</span>)}
          </div>
        </section>

        <section style={{ backgroundColor: 'var(--bg-surface)', borderRadius: '8px', padding: '2rem' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Layanan Terlaris</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {data?.topServices?.length > 0 ? data.topServices.map((s: any, i: number) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  <span>{s.name}</span>
                  <span style={{ color: 'var(--primary)' }}>{s.count} kali</span>
                </div>
                <div style={{ height: '4px', backgroundColor: '#222', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', backgroundColor: 'var(--primary)', width: `${(s.count / data.topServices[0].count) * 100}%` }} />
                </div>
              </div>
            )) : <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem' }}>Belum ada data layanan.</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
