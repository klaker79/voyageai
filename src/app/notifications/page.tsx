'use client';

import {
    Bell,
    Plane,
    Hotel,
    CreditCard,
    AlertTriangle,
    CheckCircle,
    Sparkles,
    Clock,
    TrendingDown,
    Trash2
} from 'lucide-react';

const mockNotifications = [
    {
        id: 1,
        type: 'deal',
        title: 'Bajada de precio detectada',
        message: 'El vuelo Madrid → París ha bajado €45. Ahora desde €89.',
        time: 'Hace 5 min',
        read: false,
        icon: TrendingDown,
        color: 'var(--accent-success)'
    },
    {
        id: 2,
        type: 'booking',
        title: 'Reserva confirmada',
        message: 'Tu reserva en Hotel Arts Barcelona está confirmada para el 15 Feb.',
        time: 'Hace 1h',
        read: false,
        icon: CheckCircle,
        color: 'var(--accent-success)'
    },
    {
        id: 3,
        type: 'alert',
        title: 'Documento por expirar',
        message: 'Tu ESTA para USA expira en 30 días. Renuévalo antes de tu viaje.',
        time: 'Hace 2h',
        read: false,
        icon: AlertTriangle,
        color: 'var(--accent-warning)'
    },
    {
        id: 4,
        type: 'ai',
        title: 'Nueva recomendación IA',
        message: 'Basado en tus preferencias, encontré 3 ofertas que te pueden interesar.',
        time: 'Hace 3h',
        read: true,
        icon: Sparkles,
        color: 'var(--accent-secondary)'
    },
    {
        id: 5,
        type: 'flight',
        title: 'Tu vuelo sale en 24h',
        message: 'Vuelo IB3456 Madrid → París. Check-in online disponible.',
        time: 'Ayer',
        read: true,
        icon: Plane,
        color: 'var(--accent-primary)'
    },
    {
        id: 6,
        type: 'refund',
        title: 'Reembolso procesado',
        message: 'Recibiste €400 por el retraso del vuelo del 15 Dic.',
        time: 'Hace 2 días',
        read: true,
        icon: CreditCard,
        color: 'var(--accent-success)'
    }
];

export default function NotificationsPage() {
    const unreadCount = mockNotifications.filter(n => !n.read).length;

    return (
        <>
            <div className="page-header">
                <h1 className="page-title">Notificaciones 🔔</h1>
                <p className="page-subtitle">
                    Alertas de precios, confirmaciones y actualizaciones de tus viajes.
                </p>
            </div>

            {/* Header Actions */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontWeight: '600' }}>{mockNotifications.length} notificaciones</span>
                    {unreadCount > 0 && (
                        <span style={{
                            padding: '4px 10px',
                            background: 'var(--accent-danger)',
                            color: 'white',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: '600'
                        }}>
                            {unreadCount} sin leer
                        </span>
                    )}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-secondary" style={{ padding: '8px 16px' }}>
                        Marcar todas como leídas
                    </button>
                    <button className="btn btn-ghost" style={{ padding: '8px 16px' }}>
                        <Trash2 size={14} />
                        Limpiar
                    </button>
                </div>
            </div>

            {/* Notifications List */}
            <div className="card" style={{ padding: '0' }}>
                {mockNotifications.map((notification, index) => {
                    const Icon = notification.icon;
                    return (
                        <div
                            key={notification.id}
                            style={{
                                padding: '20px',
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '16px',
                                borderBottom: index < mockNotifications.length - 1 ? '1px solid var(--glass-border)' : 'none',
                                background: notification.read ? 'transparent' : 'rgba(59, 130, 246, 0.05)',
                                cursor: 'pointer'
                            }}
                        >
                            {/* Icon */}
                            <div style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '12px',
                                background: `${notification.color}20`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                <Icon size={20} color={notification.color} />
                            </div>

                            {/* Content */}
                            <div style={{ flex: 1 }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    marginBottom: '4px'
                                }}>
                                    <span style={{
                                        fontWeight: notification.read ? '500' : '600',
                                        color: notification.read ? 'var(--text-secondary)' : 'var(--text-primary)'
                                    }}>
                                        {notification.title}
                                    </span>
                                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                                        {notification.time}
                                    </span>
                                </div>
                                <div style={{
                                    fontSize: '14px',
                                    color: 'var(--text-secondary)',
                                    lineHeight: 1.5
                                }}>
                                    {notification.message}
                                </div>
                            </div>

                            {/* Unread indicator */}
                            {!notification.read && (
                                <div style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: 'var(--accent-primary)',
                                    flexShrink: 0,
                                    marginTop: '8px'
                                }} />
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
}
