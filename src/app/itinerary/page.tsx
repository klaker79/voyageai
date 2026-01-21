'use client';

import { useState, useEffect } from 'react';
import {
    MapPin,
    Clock,
    Plane,
    Hotel,
    Train,
    Camera,
    QrCode,
    Navigation,
    ChevronRight,
    Calendar,
    CheckCircle,
    Plus,
    Sparkles,
    Edit2,
    Trash2
} from 'lucide-react';
import { Card, Button, Badge, EmptyState } from '@/components/ui';
import { useTripsStore } from '@/store';
import type { Trip } from '@/types';

// Extended trip type with itinerary
interface ItineraryEvent {
    id: string;
    time: string;
    endTime?: string;
    type: 'flight' | 'hotel' | 'transport' | 'activity';
    title: string;
    subtitle: string;
    status: 'confirmed' | 'pending' | 'suggestion';
    hasTicket?: boolean;
}

interface ItineraryDay {
    date: string;
    title: string;
    events: ItineraryEvent[];
}

// Generate sample itinerary based on trip
function generateItinerary(trip: Trip): ItineraryDay[] {
    const startDate = new Date(trip.startDate);
    const endDate = new Date(trip.endDate);
    const days: ItineraryDay[] = [];

    const destination = trip.destination.split(',')[0];

    // Day 1 - Arrival
    days.push({
        date: startDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
        title: 'Día 1 - Llegada',
        events: [
            {
                id: 'e1',
                time: '08:30',
                endTime: '14:45',
                type: 'flight',
                title: `Vuelo a ${destination}`,
                subtitle: 'Terminal 4 · Clase Economy',
                status: 'confirmed',
                hasTicket: true
            },
            {
                id: 'e2',
                time: '15:30',
                type: 'transport',
                title: 'Transfer al hotel',
                subtitle: 'Taxi/Uber disponible',
                status: 'pending'
            },
            {
                id: 'e3',
                time: '17:00',
                type: 'hotel',
                title: `Check-in Hotel en ${destination}`,
                subtitle: 'Habitación reservada',
                status: 'confirmed'
            }
        ]
    });

    // Middle days - Activities
    let dayNum = 2;
    const current = new Date(startDate);
    current.setDate(current.getDate() + 1);

    while (current < endDate) {
        days.push({
            date: current.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
            title: `Día ${dayNum} - Exploración`,
            events: [
                {
                    id: `day${dayNum}-1`,
                    time: '09:00',
                    type: 'activity',
                    title: 'Desayuno',
                    subtitle: 'En el hotel o explorar zona local',
                    status: 'suggestion'
                },
                {
                    id: `day${dayNum}-2`,
                    time: '10:30',
                    type: 'activity',
                    title: `Visita turística ${destination}`,
                    subtitle: 'Lugares imprescindibles',
                    status: 'pending'
                },
                {
                    id: `day${dayNum}-3`,
                    time: '14:00',
                    type: 'activity',
                    title: 'Almuerzo local',
                    subtitle: 'Gastronomía típica',
                    status: 'suggestion'
                },
                {
                    id: `day${dayNum}-4`,
                    time: '20:00',
                    type: 'activity',
                    title: 'Cena',
                    subtitle: 'Restaurante recomendado por IA',
                    status: 'suggestion'
                }
            ]
        });

        current.setDate(current.getDate() + 1);
        dayNum++;

        // Limit to 5 days sample
        if (dayNum > 5) break;
    }

    // Last day - Departure
    days.push({
        date: endDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
        title: `Día ${dayNum} - Regreso`,
        events: [
            {
                id: 'last1',
                time: '10:00',
                type: 'hotel',
                title: 'Check-out',
                subtitle: 'Dejar habitación',
                status: 'pending'
            },
            {
                id: 'last2',
                time: '12:00',
                type: 'transport',
                title: 'Transfer al aeropuerto',
                subtitle: 'Llegar 3h antes del vuelo',
                status: 'pending'
            },
            {
                id: 'last3',
                time: '16:00',
                type: 'flight',
                title: 'Vuelo de regreso',
                subtitle: 'Llegada estimada por la noche',
                status: 'confirmed',
                hasTicket: true
            }
        ]
    });

    return days;
}

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

// Default demo trip
const demoTrip: Trip = {
    id: 'demo-trip',
    name: 'Viaje a Tokio',
    destination: 'Tokio, Japón',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    startDate: '2026-02-15',
    endDate: '2026-02-28',
    status: 'planning',
    progress: 75,
    bookings: [],
    totalCost: 1850,
    savings: 320
};

export default function ItineraryPage() {
    const { activeTrip, trips } = useTripsStore();
    const [selectedDay, setSelectedDay] = useState(0);
    const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);

    // Use active trip, first trip, or demo
    const currentTrip = activeTrip || trips[0] || demoTrip;

    useEffect(() => {
        if (currentTrip) {
            setItinerary(generateItinerary(currentTrip));
            setSelectedDay(0);
        }
    }, [currentTrip]);

    // Calculate days left
    const daysLeft = Math.max(0, Math.ceil(
        (new Date(currentTrip.startDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    ));

    const formatDates = (start: string, end: string) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        return `${startDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })} - ${endDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}`;
    };

    if (!itinerary.length) {
        return (
            <EmptyState
                icon={<MapPin size={48} />}
                title="Sin itinerario"
                description="Crea un viaje para generar tu itinerario"
                action={<Button variant="primary">Nuevo Viaje</Button>}
            />
        );
    }

    return (
        <>
            <div className="page-header">
                <h1 className="page-title">Tu Itinerario 📍</h1>
                <p className="page-subtitle">
                    Gestiona tu viaje en tiempo real con navegación, tickets y alertas.
                </p>
            </div>

            {/* Trip Overview */}
            <Card style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                            {daysLeft > 0 ? 'Próximo Viaje' : 'Viaje Activo'}
                        </div>
                        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>
                            {currentTrip.destination}
                        </h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                            <Calendar size={16} />
                            {formatDates(currentTrip.startDate, currentTrip.endDate)}
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '48px', fontWeight: '700', color: 'var(--accent-primary)' }}>
                            {daysLeft}
                        </div>
                        <div style={{ color: 'var(--text-muted)' }}>días restantes</div>
                    </div>
                </div>

                {/* Progress bar */}
                <div style={{ marginTop: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '12px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Planificación</span>
                        <span style={{ color: 'var(--accent-primary)', fontWeight: '600' }}>{currentTrip.progress}%</span>
                    </div>
                    <div style={{ height: '6px', background: 'var(--glass-border)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{
                            width: `${currentTrip.progress}%`,
                            height: '100%',
                            background: 'var(--gradient-primary)',
                            borderRadius: '3px'
                        }} />
                    </div>
                </div>
            </Card>

            {/* Day Selector */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '8px' }}>
                {itinerary.map((day, index) => (
                    <Button
                        key={index}
                        variant={selectedDay === index ? 'primary' : 'secondary'}
                        onClick={() => setSelectedDay(index)}
                        style={{
                            padding: '12px 20px',
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                            flexDirection: 'column',
                            alignItems: 'flex-start'
                        }}
                    >
                        <div style={{ fontSize: '11px', opacity: 0.8 }}>{day.date}</div>
                        <div style={{ fontWeight: '600', fontSize: '13px' }}>{day.title}</div>
                    </Button>
                ))}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                <Button variant="secondary" size="sm" leftIcon={<Plus size={14} />}>
                    Añadir evento
                </Button>
                <Button variant="secondary" size="sm" leftIcon={<Sparkles size={14} />}>
                    Sugerencias IA
                </Button>
            </div>

            {/* Timeline */}
            <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>
                        {itinerary[selectedDay]?.title}
                    </h3>
                    <Badge variant="muted">{itinerary[selectedDay]?.events.length} eventos</Badge>
                </div>

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

                    {itinerary[selectedDay]?.events.map((event, index) => {
                        const Icon = typeIcons[event.type] || Camera;
                        const color = typeColors[event.type] || 'var(--accent-primary)';

                        return (
                            <div
                                key={event.id}
                                style={{
                                    position: 'relative',
                                    marginBottom: index < (itinerary[selectedDay]?.events.length ?? 0) - 1 ? '20px' : 0
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
                                    alignItems: 'center',
                                    transition: 'all 0.2s ease'
                                }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px', flexWrap: 'wrap' }}>
                                            <span style={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                color: color
                                            }}>
                                                {event.time}
                                                {event.endTime && ` → ${event.endTime}`}
                                            </span>
                                            {event.status === 'confirmed' && (
                                                <Badge variant="success">
                                                    <CheckCircle size={10} style={{ marginRight: '4px' }} />
                                                    Confirmado
                                                </Badge>
                                            )}
                                            {event.status === 'pending' && (
                                                <Badge variant="warning">
                                                    <Clock size={10} style={{ marginRight: '4px' }} />
                                                    Pendiente
                                                </Badge>
                                            )}
                                            {event.status === 'suggestion' && (
                                                <Badge variant="ai">
                                                    <Sparkles size={10} style={{ marginRight: '4px' }} />
                                                    Sugerencia IA
                                                </Badge>
                                            )}
                                        </div>
                                        <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '2px' }}>
                                            {event.title}
                                        </div>
                                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                            {event.subtitle}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
                                        {event.hasTicket && (
                                            <Button variant="secondary" size="sm">
                                                <QrCode size={14} />
                                            </Button>
                                        )}
                                        {(event.type === 'flight' || event.type === 'transport' || event.type === 'hotel') && (
                                            <Button variant="secondary" size="sm">
                                                <Navigation size={14} />
                                            </Button>
                                        )}
                                        <Button variant="ghost" size="sm">
                                            <ChevronRight size={18} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Card>
        </>
    );
}
