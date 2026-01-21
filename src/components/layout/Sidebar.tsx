'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Plane,
    Hotel,
    MapPin,
    FileText,
    RefreshCw,
    User,
    LayoutDashboard,
    Sparkles,
    Bell,
    Settings,
    TrendingUp
} from 'lucide-react';

const navigation = [
    {
        title: 'Principal',
        items: [
            { name: 'Dashboard', href: '/', icon: LayoutDashboard },
            { name: 'Buscar Vuelos', href: '/flights', icon: Plane },
            { name: 'Estancias', href: '/stays', icon: Hotel },
            { name: 'Itinerario', href: '/itinerary', icon: MapPin },
        ]
    },
    {
        title: 'Gestión',
        items: [
            { name: 'Visas y Seguros', href: '/documents', icon: FileText },
            { name: 'Reembolsos', href: '/refunds', icon: RefreshCw },
            { name: 'Ofertas IA', href: '/deals', icon: TrendingUp },
        ]
    },
    {
        title: 'Cuenta',
        items: [
            { name: 'Mi Perfil IA', href: '/profile', icon: User },
            { name: 'Notificaciones', href: '/notifications', icon: Bell },
            { name: 'Configuración', href: '/settings', icon: Settings },
        ]
    }
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <div className="sidebar-logo-icon">
                        <Sparkles size={24} color="white" />
                    </div>
                    <span className="sidebar-logo-text">VoyageAI</span>
                </div>
            </div>

            <nav className="sidebar-nav">
                {navigation.map((section) => (
                    <div key={section.title} className="nav-section">
                        <div className="nav-section-title">{section.title}</div>
                        {section.items.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`nav-item ${isActive ? 'active' : ''}`}
                                >
                                    <Icon className="nav-item-icon" size={20} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                ))}
            </nav>

            {/* AI Status Card */}
            <div style={{ padding: '16px' }}>
                <div className="ai-insight-card">
                    <div className="ai-insight-header">
                        <div className="ai-insight-icon">
                            <Sparkles size={20} color="white" />
                        </div>
                        <div>
                            <div className="ai-insight-title">IA Activa</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                                Monitoreando ofertas
                            </div>
                        </div>
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginTop: '12px'
                    }}>
                        <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: 'var(--accent-success)',
                            animation: 'pulse 2s infinite'
                        }} />
                        <span style={{ fontSize: '12px', color: 'var(--accent-success)' }}>
                            3 ofertas detectadas
                        </span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
