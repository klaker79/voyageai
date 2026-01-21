'use client';

import { Plane, Hotel, MapPin, CreditCard, TrendingUp, Heart } from 'lucide-react';
import { Card } from '@/components/ui';
import { useUserStore, useFavoritesStore } from '@/store';

export default function StatsGrid() {
    const { user, preferences } = useUserStore();
    const { flightIds, stayIds } = useFavoritesStore();

    // Stats dinámicos basados en el estado real
    const stats = [
        {
            icon: Plane,
            iconClass: 'blue',
            value: flightIds.length.toString(),
            label: 'Vuelos Guardados',
            change: flightIds.length > 0 ? `${flightIds.length} favoritos` : 'Sin favoritos',
            positive: flightIds.length > 0
        },
        {
            icon: Hotel,
            iconClass: 'green',
            value: stayIds.length.toString(),
            label: 'Alojamientos Guardados',
            change: stayIds.length > 0 ? `${stayIds.length} favoritos` : 'Sin favoritos',
            positive: stayIds.length > 0
        },
        {
            icon: Heart,
            iconClass: 'red',
            value: (flightIds.length + stayIds.length).toString(),
            label: 'Total Favoritos',
            change: 'Guardados para ti',
            positive: true
        },
        {
            icon: MapPin,
            iconClass: 'orange',
            value: preferences?.general?.currency || 'EUR',
            label: 'Moneda Activa',
            change: preferences?.general?.language || 'Español',
            positive: true
        }
    ];

    return (
        <div className="stats-grid" style={{ marginBottom: '32px' }}>
            {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <Card key={index} className="stat-card" style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div className={`stat-icon ${stat.iconClass}`} style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: stat.iconClass === 'blue' ? 'rgba(59, 130, 246, 0.15)' :
                                    stat.iconClass === 'green' ? 'rgba(16, 185, 129, 0.15)' :
                                        stat.iconClass === 'red' ? 'rgba(239, 68, 68, 0.15)' :
                                            'rgba(245, 158, 11, 0.15)'
                            }}>
                                <Icon size={24} color={
                                    stat.iconClass === 'blue' ? 'var(--accent-primary)' :
                                        stat.iconClass === 'green' ? 'var(--accent-success)' :
                                            stat.iconClass === 'red' ? 'var(--accent-danger)' :
                                                'var(--accent-warning)'
                                } />
                            </div>
                        </div>
                        <div style={{ marginTop: '16px' }}>
                            <div style={{ fontSize: '28px', fontWeight: '700' }}>{stat.value}</div>
                            <div style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>{stat.label}</div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '13px',
                                color: stat.positive ? 'var(--accent-success)' : 'var(--text-muted)'
                            }}>
                                {stat.positive && <TrendingUp size={14} />}
                                {stat.change}
                            </div>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
}
