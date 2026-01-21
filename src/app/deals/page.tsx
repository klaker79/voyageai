'use client';

import {
    Sparkles,
    Plane,
    Hotel,
    Clock,
    TrendingDown,
    Bell,
    Star,
    MapPin,
    ChevronRight,
    Filter
} from 'lucide-react';

const mockDeals = [
    {
        id: 1,
        type: 'flight',
        route: 'Madrid → Tokio',
        details: 'Vuelo directo · Turkish Airlines',
        originalPrice: 890,
        currentPrice: 485,
        discount: 45,
        expiresIn: '2h 30min',
        aiScore: 97,
        aiReason: 'Error de tarifa detectado. Precio más bajo en 6 meses.'
    },
    {
        id: 2,
        type: 'hotel',
        route: 'Hotel Ritz París',
        details: '5 noches · Suite Prestige',
        originalPrice: 2400,
        currentPrice: 1450,
        discount: 40,
        expiresIn: '5h 15min',
        aiScore: 94,
        aiReason: 'Oferta flash por baja ocupación. Cancelación gratuita.'
    },
    {
        id: 3,
        type: 'flight',
        route: 'Barcelona → Nueva York',
        details: 'Business Class · Delta',
        originalPrice: 3200,
        currentPrice: 1890,
        discount: 41,
        expiresIn: '12h',
        aiScore: 92,
        aiReason: 'Upgrade gratuito a Business detectado.'
    },
    {
        id: 4,
        type: 'flight',
        route: 'Madrid → Bali',
        details: '1 escala (Dubai) · Emirates',
        originalPrice: 750,
        currentPrice: 520,
        discount: 31,
        expiresIn: '1d 4h',
        aiScore: 88,
        aiReason: 'Mejor precio de los últimos 3 meses.'
    },
    {
        id: 5,
        type: 'hotel',
        route: 'Aman Tokyo',
        details: '3 noches · City View Room',
        originalPrice: 1800,
        currentPrice: 1250,
        discount: 30,
        expiresIn: '8h',
        aiScore: 85,
        aiReason: 'Descuento por reserva anticipada.'
    }
];

export default function DealsPage() {
    return (
        <>
            <div className="page-header">
                <h1 className="page-title">Ofertas IA 🔥</h1>
                <p className="page-subtitle">
                    La IA monitorea 24/7 para encontrar las mejores ofertas personalizadas para ti.
                </p>
            </div>

            {/* AI Status */}
            <div className="ai-insight-card" style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className="ai-insight-icon" style={{ width: '48px', height: '48px' }}>
                            <Sparkles size={24} color="white" />
                        </div>
                        <div>
                            <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>
                                Radar de Ofertas Activo
                            </div>
                            <div style={{ color: 'var(--text-secondary)' }}>
                                Monitoreando 847 rutas y 12,450 hoteles basados en tus preferencias
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--accent-success)' }}>
                                {mockDeals.length}
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>ofertas activas</div>
                        </div>
                        <div style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            background: 'var(--accent-success)',
                            boxShadow: '0 0 12px var(--accent-success)',
                            animation: 'pulse 2s infinite'
                        }} />
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                <button className="btn btn-primary" style={{ padding: '8px 16px' }}>
                    Todas
                </button>
                <button className="btn btn-secondary" style={{ padding: '8px 16px' }}>
                    <Plane size={14} />
                    Vuelos
                </button>
                <button className="btn btn-secondary" style={{ padding: '8px 16px' }}>
                    <Hotel size={14} />
                    Hoteles
                </button>
                <button className="btn btn-secondary" style={{ padding: '8px 16px' }}>
                    <Star size={14} />
                    Top Score
                </button>
                <button className="btn btn-secondary" style={{ padding: '8px 16px' }}>
                    <Clock size={14} />
                    Expira pronto
                </button>
            </div>

            {/* Deals Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {mockDeals.map((deal) => (
                    <div
                        key={deal.id}
                        className="card"
                        style={{
                            padding: '0',
                            border: deal.aiScore >= 95 ? '2px solid var(--accent-success)' : undefined,
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Urgency Banner */}
                        {deal.aiScore >= 95 && (
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                background: 'var(--accent-danger)',
                                color: 'white',
                                textAlign: 'center',
                                padding: '4px',
                                fontSize: '12px',
                                fontWeight: '600'
                            }}>
                                🔥 OFERTA EXCEPCIONAL - {deal.aiReason}
                            </div>
                        )}

                        <div style={{
                            padding: '20px',
                            paddingTop: deal.aiScore >= 95 ? '40px' : '20px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                {/* Icon */}
                                <div style={{
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: '16px',
                                    background: deal.type === 'flight'
                                        ? 'rgba(59, 130, 246, 0.15)'
                                        : 'rgba(139, 92, 246, 0.15)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {deal.type === 'flight' ? (
                                        <Plane size={28} color="var(--accent-primary)" />
                                    ) : (
                                        <Hotel size={28} color="var(--accent-secondary)" />
                                    )}
                                </div>

                                {/* Info */}
                                <div>
                                    <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>
                                        {deal.route}
                                    </div>
                                    <div style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>
                                        {deal.details}
                                    </div>

                                    {/* AI Score */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            padding: '4px 10px',
                                            background: deal.aiScore >= 90
                                                ? 'rgba(16, 185, 129, 0.15)'
                                                : 'rgba(245, 158, 11, 0.15)',
                                            borderRadius: '6px'
                                        }}>
                                            <Sparkles size={12} />
                                            <span style={{
                                                fontWeight: '600',
                                                fontSize: '12px',
                                                color: deal.aiScore >= 90 ? 'var(--accent-success)' : 'var(--accent-warning)'
                                            }}>
                                                {deal.aiScore}% Score IA
                                            </span>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            color: 'var(--accent-danger)',
                                            fontSize: '12px'
                                        }}>
                                            <Clock size={12} />
                                            Expira en {deal.expiresIn}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Price & Action */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{
                                        display: 'inline-block',
                                        padding: '4px 10px',
                                        background: 'rgba(16, 185, 129, 0.15)',
                                        color: 'var(--accent-success)',
                                        borderRadius: '6px',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        marginBottom: '4px'
                                    }}>
                                        -{deal.discount}%
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                        <span style={{
                                            fontSize: '28px',
                                            fontWeight: '700',
                                            color: 'var(--accent-success)'
                                        }}>
                                            €{deal.currentPrice}
                                        </span>
                                        <span style={{
                                            color: 'var(--text-muted)',
                                            textDecoration: 'line-through',
                                            fontSize: '16px'
                                        }}>
                                            €{deal.originalPrice}
                                        </span>
                                    </div>
                                </div>
                                <button className="btn btn-primary" style={{ padding: '12px 24px' }}>
                                    Reservar
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>

                        {/* AI Reason */}
                        {deal.aiScore < 95 && (
                            <div style={{
                                padding: '12px 20px',
                                background: 'var(--bg-secondary)',
                                borderTop: '1px solid var(--glass-border)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '13px',
                                color: 'var(--text-secondary)'
                            }}>
                                <Sparkles size={14} color="var(--accent-secondary)" />
                                {deal.aiReason}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}
