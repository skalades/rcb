"use client";
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  const navItems = [
    { label: 'Overview', href: '/dashboard', icon: '📊' },
    { label: 'Antrean', href: '/dashboard/orders', icon: '🚗' },
    { label: 'Membership', href: '/dashboard/members', icon: '💎' },
    { label: 'Inventaris', href: '/dashboard/inventory', icon: '📦' },
    { label: 'Karyawan', href: '/dashboard/employees', icon: '👥' },
    { label: 'Komisi', href: '/dashboard/commissions', icon: '💰' },
    { label: 'Layanan', href: '/dashboard/services', icon: '🛠️' },
    { label: 'Staff Access', href: '/dashboard/users', icon: '🔐' },
    { label: 'Laporan', href: '/dashboard/reports', icon: '📈' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0a0a0a', color: '#fff' }}>
      {/* Sidebar */}
      <aside style={{
        width: '280px',
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(255, 215, 0, 0.1)',
        padding: '2.5rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh',
        zIndex: 50
      }}>
        <div style={{ padding: '0 1rem', marginBottom: '3rem' }}>
          <div style={{ color: 'var(--primary)', fontWeight: 900, fontSize: '1.5rem', letterSpacing: '-1px' }}>
            RCB<span style={{ color: '#fff', fontWeight: 300 }}>ADMIN</span>
          </div>
          <p style={{ fontSize: '0.7rem', color: 'rgba(255,215,0,0.5)', marginTop: '0.2rem' }}>PREMIUM CARWASH MGMT</p>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.8rem 1rem',
                  borderRadius: '12px',
                  color: isActive ? 'var(--primary)' : 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 600 : 400,
                  backgroundColor: isActive ? 'rgba(255, 215, 0, 0.05)' : 'transparent',
                  transition: 'all 0.2s ease',
                  border: isActive ? '1px solid rgba(255, 215, 0, 0.1)' : '1px solid transparent'
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button 
          onClick={handleLogout}
          disabled={isLoggingOut}
          style={{
            marginTop: 'auto',
            padding: '0.8rem',
            borderRadius: '12px',
            background: 'rgba(255, 68, 68, 0.05)',
            border: '1px solid rgba(255, 68, 68, 0.1)',
            color: '#ff4444',
            cursor: 'pointer',
            fontSize: '0.9rem',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <span>🚪</span> {isLoggingOut ? 'Logging out...' : 'Keluar'}
        </button>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, marginLeft: '280px', padding: '3rem 4rem', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
