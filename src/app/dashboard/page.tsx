"use client";
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reports')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const statCards = [
    { label: 'Total Pendapatan', value: stats ? `IDR ${Number(stats.totalRevenue).toLocaleString()}` : 'IDR 0', icon: '💰', color: '#4caf50' },
    { label: 'Total Antrean', value: stats ? stats.totalOrders : '0', icon: '🚗', color: '#2196f3' },
    { label: 'Stok Kritis', value: stats ? stats.lowStockItems : '0', icon: '⚠️', color: '#ff9800' },
    { label: 'Member Aktif', value: stats ? stats.memberCount || '0' : '0', icon: '💎', color: '#ffd700' },
  ];

  return (
    <div>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-1px' }}>Dashboard <span style={{ color: 'var(--primary)' }}>Overview</span></h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '0.5rem' }}>Selamat datang kembali, Admin. Berikut ringkasan bisnis hari ini.</p>
      </header>

      {/* Stats Widgets */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {statCards.map((card, i) => (
          <div key={i} className="glass" style={{
            padding: '2rem',
            borderRadius: '24px',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{card.icon}</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{card.label}</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.5rem', color: card.color }}>{card.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Recent Activity */}
        <div className="glass" style={{ padding: '2rem', borderRadius: '24px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '2rem' }}>Aktivitas Terkini</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[1, 2, 3].map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255, 215, 0, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>🚗</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Kendaraan Masuk - Antrean</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>Baru saja terinput ke sistem</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass" style={{ padding: '2rem', borderRadius: '24px', background: 'var(--accent-gradient)', color: '#000' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>Sistem Aktif</h2>
          <p style={{ fontSize: '0.8rem', marginBottom: '1.5rem', opacity: 0.8 }}>Database MySQL Terhubung. Semua sensor operasional normal.</p>
          <button style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', background: '#000', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer' }}>Lihat Laporan Detail</button>
        </div>
      </div>
    </div>
  );
}
