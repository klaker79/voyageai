'use client';

import { useState } from 'react';
import {
    MapPin,
    Clock,
    Plane,
    Hotel,
    Train,
    Bus,
    Coffee,
    Camera,
    Utensils,
    QrCode,
    Navigation,
    ChevronRight,
    Calendar,
    CheckCircle,
    AlertCircle
} from 'lucide-react';

const mockItinerary = {
    trip: {
        destination: 'Tokio, Japón',
        dates: '15 Feb - 28 Feb 2026',
        daysLeft: 25
    },
    days: [
        {
            date: '15 Feb 2026',
            title: 'Día 1 - Llegada',
            events: [
                {
                    time: '08:30',
                    endTime: '20:45',
                    type: 'flight',
                    title: 'Vuelo Madrid → Tokio',
                    subtitle: 'Iberia IB7945 · Terminal 4',
                    status: 'confirmed',
                    hasTicket: true
                },
                {
                    time: '21:30',
                    type: 'transport',
                    title: 'Narita Express al centro',
                    subtitle: 'Andén 1 → Shinjuku Station',
                    status: 'confirmed',
                    hasTicket: true
                },
                {
                    time: '23:00',
                    type: 'hotel',
                    title: 'Check-in Park Hyatt Tokyo',
                    subtitle: 'Habitación 4521 · Vista a la ciudad',
                    status: 'confirmed'
                }
            ]
        },
        {
            date: '16 Feb 2026',
            title: 'Día 2 - Exploración',
            events: [
                {
                    time: '09:00',
                    type: 'activity',
                    title: 'Desayuno en Tsukiji Market',
                    subtitle: 'Reserva para 2 personas',
                    status: 'confirmed'
                },
                {
                    time: '11:00',
                    type: 'activity',
                    title: 'Templo Senso-ji',
                    subtitle: 'Asakusa · Entrada gratuita',
                    status: 'pending'
                },
                {
                    time: '14:00',
                    type: 'activity',
                    title: 'Almuerzo en Ramen Street',
                    subtitle: 'Tokyo Station',
                    status: 'suggestion'
                },
                {
                    time: '16:00',
                    type: 'activity',
                    title: 'Shibuya Crossing & Harajuku',
                    subtitle: 'Compras y cultura',
                    status: 'pending'
                },
                {
                    time: '20:00',
                    type: 'activity',
                    title: 'Cena Kaiseki',
                    subtitle: 'Restaurante Narisawa · 2 Estrellas Michelin',
                    status: 'confirmed',
                    hasTicket: true
                }
            ]
        },
        {
            date: '17 Feb 2026',
            title: 'Día 3 - Monte Fuji',
            events: [
                {
                    time: '07:00',
                    type: 'transport',
                    title: 'Shinkansen a Hakone',
                    subtitle: 'Tren bala · 1h 30min',
                    status: 'confirmed',
                    hasTicket: true
                },
                {
                    time: '09:00',
                    type: 'activity',
                    title: 'Excursión Monte Fuji',
                    subtitle: 'Tour guiado en español',
                    status: 'confirmed'
                }
            ]
        }
    ]
};

const typeIcons: Record<string, typeof Plane> = {
    flight: Plane,
    hotel: Hotel,
    transport: Train,
    activity: Camera
};

const typeColors: Record<string, string> = {
    flight: 'var(--accent-primary)',
    hotel: 'var(--accent-secondary)',
    transport: 'var(--accent-warning)',
    activity: 'var(--accent-success)'
};

export default function ItineraryPage() {
    const [selectedDay, setSelectedDay] = useState(0);

    return (
        <>
            <div className="page-header">
                <h1 className="page-title">Tu Itinerario 📍</h1>
                <p className="page-subtitle">
                    Gestiona tu viaje en tiempo real con navegación, tickets y alertas.
                </p>
            </div>

            {/* Trip Overview */}
            <div className="card" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Próximo Viaje</div>
                    <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>
                        {mockItinerary.trip.destination}
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                        <Calendar size={16} />
                        {mockItinerary.trip.dates}
                    </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '48px', fontWeight: '700', color: 'var(--accent-primary)' }}>
                        {mockItinerary.trip.daysLeft}
                    </div>
                    <div style={{ color: 'var(--text-muted)' }}>días restantes</div>
                </div>
            </div>

            {/* Day Selector */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '8px' }}>
                {mockItinerary.days.map((day, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedDay(index)}
                        className={`btn ${selectedDay === index ? 'btn-primary' : 'btn-secondary'}`}
                        style={{
                            padding: '12px 20px',
                            whiteSpace: 'nowrap',
                            flexShrink: 0
                        }}
                    >
                        <div style={{ fontSize: '12px', opacity: 0.8 }}>{day.date.split(' ')[0]} {day.date.split(' ')[1]}</div>
                        <div style={{ fontWeight: '600' }}>{day.title}</div>
                    </button>
                ))}
            </div>

            {/* Timeline */}
            <div className="card">
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px' }}>
                    {mockItinerary.days[selectedDay].title}
                </h3>

                <div style={{ position: 'relative', paddingLeft: '40px' }}>
                    {/* Timeline Line */}
                    <div style={{
                        position: 'absolute',
                        left: '15px',
                        top: '24px',
                        bottom: '24px',
                        width: '2px',
                        background: 'var(--glass-border)'
                    }} />

                    {mockItinerary.days[selectedDay].events.map((event, index) => {
                        const Icon = typeIcons[event.type] || Camera;
                        const color = typeColors[event.type] || 'var(--accent-primary)';

                        return (
                            <div
                                key={index}
                                style={{
                                    position: 'relative',
                                    marginBottom: index < mockItinerary.days[selectedDay].events.length - 1 ? '24px' : 0
                                }}
                            >
                                {/* Timeline Dot */}
                                <div style={{
                                    position: 'absolute',
                                    left: '-32px',
                                    top: '4px',
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    background: color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Icon size={12} color="white" />
                                </div>

                                {/* Event Card */}
                                <div style={{
                                    background: 'var(--bg-secondary)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '12px',
                                    padding: '16px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                                            <span style={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                color: color
                                            }}>
                                                {event.time}
                                                {event.endTime && ` → ${event.endTime}`}
                                            </span>
                                            {event.status === 'confirmed' && (
                                                <span style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                    fontSize: '11px',
                                                    color: 'var(--accent-success)',
                                                    background: 'rgba(16, 185, 129, 0.15)',
                                                    padding: '2px 8px',
                                                    borderRadius: '4px'
                                                }}>
                                                    <CheckCircle size={10} />
                                                    Confirmado
                                                </span>
                                            )}
                                            {event.status === 'pending' && (
                                                <span style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                    fontSize: '11px',
                                                    color: 'var(--accent-warning)',
                                                    background: 'rgba(245, 158, 11, 0.15)',
                                                    padding: '2px 8px',
                                                    borderRadius: '4px'
                                                }}>
                                                    <Clock size={10} />
                                                    Pendiente
                                                </span>
                                            )}
                                            {event.status === 'suggestion' && (
                                                <span style={{
                                                    fontSize: '11px',
                                                    color: 'var(--text-muted)',
                                                    background: 'var(--glass-bg)',
                                                    padding: '2px 8px',
                                                    borderRadius: '4px'
                                                }}>
                                                    ✨ Sugerencia IA
                                                </span>
                                            )}
                                        </div>
                                        <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '2px' }}>
                                            {event.title}
                                        </div>
                                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                            {event.subtitle}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        {event.hasTicket && (
                                            <button className="btn btn-secondary" style={{ padding: '8px 12px' }}>
                                                <QrCode size={16} />
                                                Ticket
                                            </button>
                                        )}
                                        {(event.type === 'flight' || event.type === 'transport' || event.type === 'hotel') && (
                                            <button className="btn btn-secondary" style={{ padding: '8px 12px' }}>
                                                <Navigation size={16} />
                                                Navegar
                                            </button>
                                        )}
                                        <button className="btn btn-ghost" style={{ padding: '8px' }}>
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
