'use client';

import { MapPin, Calendar, ArrowRight } from 'lucide-react';

const trips = [
    {
        id: 1,
        destination: 'Barcelona → Tokio',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
        dates: '15 Feb - 28 Feb 2026',
        status: 'upcoming',
        statusLabel: 'Próximo',
        progress: 85,
        progressLabel: 'Vuelo + Hotel confirmados',
        price: '€1,450',
        savings: 'Ahorraste €320 con IA'
    },
    {
        id: 2,
        destination: 'Madrid → Nueva York',
        image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
        dates: '10 Mar - 20 Mar 2026',
        status: 'planning',
        statusLabel: 'Planificando',
        progress: 45,
        progressLabel: 'Buscando mejores ofertas',
        price: '€890',
        savings: 'IA optimizando precio'
    },
    {
        id: 3,
        destination: 'Lisboa → Bali',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
        dates: '5 Abr - 20 Abr 2026',
        status: 'planning',
        statusLabel: 'Planificando',
        progress: 20,
        progressLabel: 'Analizando opciones',
        price: '€2,100',
        savings: 'Potencial ahorro: €450'
    }
];

export default function TripsGrid() {
    return (
        <div>
            <div className="card-header" style={{ marginBottom: '24px' }}>
                <h2 className="card-title" style={{ fontSize: '20px' }}>Mis Viajes</h2>
                <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                    Ver todos
                    <ArrowRight size={14} />
                </button>
            </div>

            <div className="trips-grid">
                {trips.map((trip) => (
                    <div key={trip.id} className="trip-card">
                        <div className="trip-image">
                            <img src={trip.image} alt={trip.destination} />
                            <span className={`trip-status ${trip.status}`}>
                                {trip.statusLabel}
                            </span>
                        </div>

                        <div className="trip-content">
                            <div className="trip-destination">
                                <MapPin size={18} />
                                {trip.destination}
                            </div>

                            <div className="trip-dates">
                                <Calendar size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                                {trip.dates}
                            </div>

                            <div className="trip-progress">
                                <div className="progress-bar">
                                    <div
                                        className="progress-fill"
                                        style={{ width: `${trip.progress}%` }}
                                    />
                                </div>
                                <div className="progress-label">
                                    <span>{trip.progressLabel}</span>
                                    <span>{trip.progress}%</span>
                                </div>
                            </div>

                            <div className="trip-footer">
                                <div>
                                    <div className="trip-price">{trip.price}</div>
                                    <div className="trip-savings">{trip.savings}</div>
                                </div>
                                <button className="btn btn-primary" style={{ padding: '10px 20px' }}>
                                    Gestionar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
