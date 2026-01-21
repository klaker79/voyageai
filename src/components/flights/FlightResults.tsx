'use client';

import {
    Plane,
    Clock,
    Luggage,
    Star,
    TrendingDown,
    Sparkles,
    ChevronDown,
    ChevronUp,
    AlertCircle,
    CheckCircle,
    Users
} from 'lucide-react';
import { useState } from 'react';

interface FlightResultsProps {
    origin: string;
    destination: string;
}

const mockFlights = [
    {
        id: 1,
        airline: 'Iberia',
        airlineLogo: '🔴',
        flightNumber: 'IB3456',
        departTime: '08:30',
        arriveTime: '10:45',
        duration: '2h 15min',
        stops: 0,
        price: 89,
        originalPrice: 145,
        cabinBag: true,
        checkedBag: true,
        aiScore: 94,
        aiReason: 'Mejor relación calidad-precio',
        priceHistory: 'down',
        reviews: { positive: 89, total: 1240 }
    },
    {
        id: 2,
        airline: 'Vueling',
        airlineLogo: '🟡',
        flightNumber: 'VY1234',
        departTime: '11:00',
        arriveTime: '13:20',
        duration: '2h 20min',
        stops: 0,
        price: 52,
        originalPrice: 78,
        cabinBag: true,
        checkedBag: false,
        aiScore: 87,
        aiReason: 'Precio más bajo disponible',
        priceHistory: 'stable',
        reviews: { positive: 72, total: 890 }
    },
    {
        id: 3,
        airline: 'Air Europa',
        airlineLogo: '🔵',
        flightNumber: 'UX5678',
        departTime: '14:30',
        arriveTime: '16:50',
        duration: '2h 20min',
        stops: 0,
        price: 75,
        originalPrice: 95,
        cabinBag: true,
        checkedBag: true,
        aiScore: 82,
        aiReason: 'Buenas reviews de puntualidad',
        priceHistory: 'up',
        reviews: { positive: 85, total: 650 }
    },
    {
        id: 4,
        airline: 'Ryanair',
        airlineLogo: '🟢',
        flightNumber: 'FR9012',
        departTime: '06:15',
        arriveTime: '08:25',
        duration: '2h 10min',
        stops: 0,
        price: 35,
        originalPrice: 45,
        cabinBag: true,
        checkedBag: false,
        aiScore: 65,
        aiReason: 'Precio bajo pero reviews mixtas',
        priceHistory: 'down',
        reviews: { positive: 58, total: 2100 }
    },
    {
        id: 5,
        airline: 'TAP Portugal',
        airlineLogo: '⭐',
        flightNumber: 'TP4321',
        departTime: '18:00',
        arriveTime: '21:30',
        duration: '3h 30min',
        stops: 1,
        stopCity: 'Lisboa',
        price: 68,
        originalPrice: 110,
        cabinBag: true,
        checkedBag: true,
        aiScore: 71,
        aiReason: 'Buena opción con escala corta',
        priceHistory: 'down',
        reviews: { positive: 81, total: 430 }
    }
];

export default function FlightResults({ origin, destination }: FlightResultsProps) {
    const [sortBy, setSortBy] = useState<'ai' | 'price' | 'duration'>('ai');
    const [expandedFlight, setExpandedFlight] = useState<number | null>(1);

    const sortedFlights = [...mockFlights].sort((a, b) => {
        if (sortBy === 'ai') return b.aiScore - a.aiScore;
        if (sortBy === 'price') return a.price - b.price;
        return a.duration.localeCompare(b.duration);
    });

    const bestFlight = sortedFlights[0];

    return (
        <div>
            {/* AI Recommendation */}
            <div className="ai-insight-card" style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                            <div className="ai-insight-icon" style={{ width: '32px', height: '32px' }}>
                                <Sparkles size={16} color="white" />
                            </div>
                            <span className="ai-badge">Recomendación IA</span>
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                            Te recomendamos {bestFlight.airline} a las {bestFlight.departTime}
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                            {bestFlight.aiReason}. Precio actual €{bestFlight.price} (antes €{bestFlight.originalPrice}).
                            {bestFlight.reviews.positive}% de {bestFlight.reviews.total} viajeros lo recomiendan.
                        </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--accent-success)' }}>
                            €{bestFlight.price}
                        </div>
                        <div style={{ color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                            €{bestFlight.originalPrice}
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px'
            }}>
                <div>
                    <span style={{ fontWeight: '600' }}>{mockFlights.length} vuelos encontrados</span>
                    <span style={{ color: 'var(--text-muted)', marginLeft: '8px' }}>
                        {origin} → {destination}
                    </span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        className={`btn ${sortBy === 'ai' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setSortBy('ai')}
                        style={{ padding: '8px 16px', fontSize: '13px' }}
                    >
                        <Sparkles size={14} />
                        Mejor IA
                    </button>
                    <button
                        className={`btn ${sortBy === 'price' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setSortBy('price')}
                        style={{ padding: '8px 16px', fontSize: '13px' }}
                    >
                        Más barato
                    </button>
                    <button
                        className={`btn ${sortBy === 'duration' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setSortBy('duration')}
                        style={{ padding: '8px 16px', fontSize: '13px' }}
                    >
                        Más rápido
                    </button>
                </div>
            </div>

            {/* Flight Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {sortedFlights.map((flight, index) => (
                    <div
                        key={flight.id}
                        className="card"
                        style={{
                            padding: '0',
                            border: index === 0 && sortBy === 'ai' ? '2px solid var(--accent-primary)' : undefined,
                            position: 'relative'
                        }}
                    >
                        {/* Best Badge */}
                        {index === 0 && sortBy === 'ai' && (
                            <div style={{
                                position: 'absolute',
                                top: '-10px',
                                left: '20px',
                                background: 'var(--gradient-primary)',
                                padding: '4px 12px',
                                borderRadius: '12px',
                                fontSize: '11px',
                                fontWeight: '600',
                                color: 'white'
                            }}>
                                ✨ Mejor Opción IA
                            </div>
                        )}

                        {/* Main Content */}
                        <div
                            style={{
                                padding: '20px',
                                display: 'grid',
                                gridTemplateColumns: '120px 1fr 1fr 120px 140px',
                                alignItems: 'center',
                                gap: '20px',
                                cursor: 'pointer'
                            }}
                            onClick={() => setExpandedFlight(expandedFlight === flight.id ? null : flight.id)}
                        >
                            {/* Airline */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ fontSize: '24px' }}>{flight.airlineLogo}</span>
                                <div>
                                    <div style={{ fontWeight: '600', fontSize: '14px' }}>{flight.airline}</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{flight.flightNumber}</div>
                                </div>
                            </div>

                            {/* Times */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '20px', fontWeight: '700' }}>{flight.departTime}</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{origin.split(' ')[0]}</div>
                                </div>

                                <div style={{ flex: 1, textAlign: 'center' }}>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '4px' }}>
                                        {flight.duration}
                                    </div>
                                    <div style={{
                                        height: '2px',
                                        background: 'var(--glass-border)',
                                        position: 'relative'
                                    }}>
                                        <Plane
                                            size={14}
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                color: 'var(--accent-primary)'
                                            }}
                                        />
                                    </div>
                                    <div style={{
                                        color: flight.stops === 0 ? 'var(--accent-success)' : 'var(--accent-warning)',
                                        fontSize: '12px',
                                        marginTop: '4px'
                                    }}>
                                        {flight.stops === 0 ? 'Directo' : `1 escala (${flight.stopCity})`}
                                    </div>
                                </div>

                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '20px', fontWeight: '700' }}>{flight.arriveTime}</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{destination.split(' ')[0]}</div>
                                </div>
                            </div>

                            {/* AI Score */}
                            <div style={{ textAlign: 'center' }}>
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '6px 12px',
                                    background: flight.aiScore >= 85
                                        ? 'rgba(16, 185, 129, 0.15)'
                                        : flight.aiScore >= 70
                                            ? 'rgba(245, 158, 11, 0.15)'
                                            : 'rgba(239, 68, 68, 0.15)',
                                    borderRadius: '8px'
                                }}>
                                    <Sparkles size={14} />
                                    <span style={{
                                        fontWeight: '700',
                                        color: flight.aiScore >= 85
                                            ? 'var(--accent-success)'
                                            : flight.aiScore >= 70
                                                ? 'var(--accent-warning)'
                                                : 'var(--accent-danger)'
                                    }}>
                                        {flight.aiScore}%
                                    </span>
                                </div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '4px' }}>
                                    Score IA
                                </div>
                            </div>

                            {/* Baggage */}
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                <div style={{
                                    padding: '6px 10px',
                                    background: 'var(--glass-bg)',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    fontSize: '12px'
                                }}>
                                    <Luggage size={14} />
                                    {flight.cabinBag && flight.checkedBag ? '2' : '1'}
                                </div>
                            </div>

                            {/* Price */}
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                                    <span style={{ fontSize: '24px', fontWeight: '700', color: 'var(--accent-success)' }}>
                                        €{flight.price}
                                    </span>
                                    {flight.priceHistory === 'down' && (
                                        <TrendingDown size={16} color="var(--accent-success)" />
                                    )}
                                </div>
                                <div style={{ color: 'var(--text-muted)', textDecoration: 'line-through', fontSize: '13px' }}>
                                    €{flight.originalPrice}
                                </div>
                            </div>
                        </div>

                        {/* Expanded Details */}
                        {expandedFlight === flight.id && (
                            <div style={{
                                padding: '20px',
                                borderTop: '1px solid var(--glass-border)',
                                background: 'var(--bg-secondary)'
                            }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
                                    {/* AI Analysis */}
                                    <div>
                                        <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Sparkles size={16} color="var(--accent-primary)" />
                                            Análisis IA
                                        </h4>
                                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                            <p style={{ marginBottom: '8px' }}>
                                                • {flight.reviews.positive}% de {flight.reviews.total} viajeros satisfechos
                                            </p>
                                            <p style={{ marginBottom: '8px' }}>
                                                • Puntualidad: {flight.aiScore >= 85 ? 'Excelente' : flight.aiScore >= 70 ? 'Buena' : 'Regular'}
                                            </p>
                                            <p>
                                                • {flight.aiReason}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Included */}
                                    <div>
                                        <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                                            Incluido
                                        </h4>
                                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                            <p style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                                <CheckCircle size={14} color="var(--accent-success)" />
                                                Equipaje de mano (10kg)
                                            </p>
                                            {flight.checkedBag && (
                                                <p style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                                    <CheckCircle size={14} color="var(--accent-success)" />
                                                    Maleta facturada (23kg)
                                                </p>
                                            )}
                                            <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <CheckCircle size={14} color="var(--accent-success)" />
                                                Selección de asiento
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action */}
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end' }}>
                                        <button className="btn btn-primary" style={{ width: '100%', marginBottom: '12px' }}>
                                            Reservar por €{flight.price}
                                        </button>
                                        <button className="btn btn-secondary" style={{ width: '100%' }}>
                                            Monitorear precio
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
