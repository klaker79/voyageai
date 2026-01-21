'use client';

import { Sparkles, TrendingDown, Zap, Clock } from 'lucide-react';

const deals = [
    {
        id: 1,
        route: 'Madrid → París',
        details: 'Vuelo directo · 2h 15min · Iberia',
        currentPrice: '€49',
        originalPrice: '€129',
        discount: '-62%',
        expiresIn: '2h 34min',
        reason: 'Error de tarifa detectado por IA'
    },
    {
        id: 2,
        route: 'Barcelona → Milán',
        details: 'Vuelo directo · 1h 30min · Vueling',
        currentPrice: '€35',
        originalPrice: '€89',
        discount: '-61%',
        expiresIn: '5h 12min',
        reason: 'Precio mínimo histórico'
    },
    {
        id: 3,
        route: 'Valencia → Berlín',
        details: 'Vuelo directo · 2h 45min · Ryanair',
        currentPrice: '€28',
        originalPrice: '€75',
        discount: '-63%',
        expiresIn: '1h 08min',
        reason: 'Flash sale detectada'
    }
];

export default function AIDeals() {
    return (
        <div className="card" style={{ marginTop: '32px' }}>
            <div className="card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <h2 className="card-title" style={{ fontSize: '20px' }}>Ofertas Detectadas por IA</h2>
                    <span className="ai-badge">En tiempo real</span>
                </div>
                <button className="btn btn-ghost" style={{ padding: '8px 12px' }}>
                    Configurar alertas
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {deals.map((deal) => (
                    <div key={deal.id} className="deal-card">
                        <div className="deal-icon">
                            <Zap size={24} color="var(--accent-success)" />
                        </div>

                        <div className="deal-content">
                            <div className="deal-route">{deal.route}</div>
                            <div className="deal-details">{deal.details}</div>

                            <div className="deal-price">
                                <span className="deal-current">{deal.currentPrice}</span>
                                <span className="deal-original">{deal.originalPrice}</span>
                                <span className="deal-discount">{deal.discount}</span>
                            </div>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                marginTop: '8px',
                                fontSize: '12px',
                                color: 'var(--text-muted)'
                            }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Clock size={12} />
                                    Expira en {deal.expiresIn}
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Sparkles size={12} />
                                    {deal.reason}
                                </span>
                            </div>
                        </div>

                        <button className="btn btn-primary" style={{ flexShrink: 0 }}>
                            Reservar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
