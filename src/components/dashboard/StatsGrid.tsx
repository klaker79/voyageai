'use client';

import { Plane, Hotel, MapPin, CreditCard, TrendingUp, TrendingDown } from 'lucide-react';

const stats = [
    {
        icon: Plane,
        iconClass: 'blue',
        value: '3',
        label: 'Vuelos Reservados',
        change: '+2 este mes',
        positive: true
    },
    {
        icon: Hotel,
        iconClass: 'green',
        value: '5',
        label: 'Noches Reservadas',
        change: '+3 este mes',
        positive: true
    },
    {
        icon: CreditCard,
        iconClass: 'purple',
        value: '€1,284',
        label: 'Ahorro Total IA',
        change: '+€340 este mes',
        positive: true
    },
    {
        icon: MapPin,
        iconClass: 'orange',
        value: '12',
        label: 'Destinos Visitados',
        change: '2 pendientes',
        positive: true
    }
];

export default function StatsGrid() {
    return (
        <div className="stats-grid">
            {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <div key={index} className="stat-card">
                        <div className={`stat-icon ${stat.iconClass}`}>
                            <Icon size={24} />
                        </div>
                        <div className="stat-value">{stat.value}</div>
                        <div className="stat-label">{stat.label}</div>
                        <div className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
                            {stat.positive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                            {stat.change}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
