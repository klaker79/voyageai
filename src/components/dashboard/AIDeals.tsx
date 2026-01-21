'use client';

import { useRouter } from 'next/navigation';
import { Sparkles, Clock, ChevronRight, TrendingDown } from 'lucide-react';
import { Card, Button, Badge, AIScore, Price } from '@/components/ui';

// Ofertas detectadas por IA - en producción vendrían de un servicio
const aiDeals = [
    {
        id: 1,
        type: 'flight',
        route: 'Madrid → Tokio',
        details: 'Vuelo directo · Turkish Airlines',
        originalPrice: 890,
        currentPrice: 485,
        expiresIn: '2h 30min',
        aiScore: 97,
        aiReason: 'Error de tarifa detectado'
    },
    {
        id: 2,
        type: 'hotel',
        route: 'Hotel Arts Barcelona',
        details: '5 noches · Suite Premium',
        originalPrice: 1200,
        currentPrice: 780,
        expiresIn: '5h 15min',
        aiScore: 94,
        aiReason: 'Oferta flash por baja ocupación'
    },
    {
        id: 3,
        type: 'flight',
        route: 'Barcelona → Nueva York',
        details: 'Business Class · Delta',
        originalPrice: 3200,
        currentPrice: 1890,
        expiresIn: '12h',
        aiScore: 92,
        aiReason: 'Upgrade gratuito detectado'
    }
];

export default function AIDeals() {
    const router = useRouter();

    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>
                        Ofertas IA 🔥
                    </h2>
                    <Badge variant="danger">
                        {aiDeals.length} activas
                    </Badge>
                </div>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => router.push('/deals')}
                >
                    Ver todas <ChevronRight size={14} />
                </Button>
            </div>

            {/* AI Status Card */}
            <Card style={{
                marginBottom: '16px',
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.15))',
                border: '1px solid rgba(139, 92, 246, 0.3)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: 'var(--gradient-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Sparkles size={24} color="white" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                            Radar de Ofertas Activo
                        </div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                            Monitoreando 847 rutas basadas en tus preferencias
                        </div>
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
            </Card>

            {/* Deals List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {aiDeals.map((deal) => (
                    <Card key={deal.id} noPadding style={{ overflow: 'hidden' }}>
                        {/* Urgency bar for top deals */}
                        {deal.aiScore >= 95 && (
                            <div style={{
                                background: 'var(--accent-danger)',
                                color: 'white',
                                textAlign: 'center',
                                padding: '4px',
                                fontSize: '11px',
                                fontWeight: '600'
                            }}>
                                🔥 OFERTA EXCEPCIONAL - {deal.aiReason}
                            </div>
                        )}

                        <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                {/* Type indicator */}
                                <div style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '10px',
                                    background: deal.type === 'flight' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(139, 92, 246, 0.15)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '20px'
                                }}>
                                    {deal.type === 'flight' ? '✈️' : '🏨'}
                                </div>

                                {/* Info */}
                                <div>
                                    <div style={{ fontWeight: '600', marginBottom: '2px' }}>{deal.route}</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '6px' }}>
                                        {deal.details}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <AIScore score={deal.aiScore} size="sm" />
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            color: 'var(--accent-danger)',
                                            fontSize: '11px'
                                        }}>
                                            <Clock size={12} />
                                            Expira en {deal.expiresIn}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Price & Action */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{ textAlign: 'right' }}>
                                    <Price current={deal.currentPrice} original={deal.originalPrice} size="sm" />
                                </div>
                                <Button variant="primary" size="sm">
                                    Reservar
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
