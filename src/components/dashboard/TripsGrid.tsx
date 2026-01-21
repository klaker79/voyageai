'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Calendar, ArrowRight, Plus, Sparkles } from 'lucide-react';
import { Card, Button, Badge } from '@/components/ui';
import { useTripsStore } from '@/store';
import type { Trip } from '@/types';

// Datos iniciales de ejemplo (se pueden agregar más desde la app)
const initialTrips: Trip[] = [
    {
        id: 'trip-1',
        name: 'Aventura en Japón',
        destination: 'Tokio, Japón',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
        startDate: '2026-02-15',
        endDate: '2026-02-28',
        status: 'planning',
        progress: 85,
        bookings: [],
        totalCost: 1450,
        savings: 320
    },
    {
        id: 'trip-2',
        name: 'Nueva York City',
        destination: 'Nueva York, USA',
        image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
        startDate: '2026-03-10',
        endDate: '2026-03-20',
        status: 'planning',
        progress: 45,
        bookings: [],
        totalCost: 890,
        savings: 0
    },
    {
        id: 'trip-3',
        name: 'Escapada a Bali',
        destination: 'Bali, Indonesia',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
        startDate: '2026-04-05',
        endDate: '2026-04-20',
        status: 'planning',
        progress: 20,
        bookings: [],
        totalCost: 2100,
        savings: 450
    }
];

export default function TripsGrid() {
    const router = useRouter();
    const { trips: storeTrips, setActiveTrip } = useTripsStore();
    
    // Usar viajes del store o los iniciales si está vacío
    const trips = storeTrips.length > 0 ? storeTrips : initialTrips;

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    };

    const getStatusBadge = (status: Trip['status']) => {
        switch (status) {
            case 'active':
                return <Badge variant="success">En curso</Badge>;
            case 'completed':
                return <Badge variant="muted">Completado</Badge>;
            default:
                return <Badge variant="ai">Planificando</Badge>;
        }
    };

    const handleTripClick = (trip: Trip) => {
        setActiveTrip(trip);
        router.push('/itinerary');
    };

    return (
        <div style={{ marginBottom: '32px' }}>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '20px' 
            }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>
                    Mis Viajes
                </h2>
                <Button variant="secondary" size="sm" leftIcon={<Plus size={14} />}>
                    Nuevo viaje
                </Button>
            </div>

            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
                gap: '20px' 
            }}>
                {trips.map((trip) => (
                    <Card 
                        key={trip.id} 
                        noPadding 
                        onClick={() => handleTripClick(trip)}
                        style={{ cursor: 'pointer', overflow: 'hidden' }}
                    >
                        {/* Image */}
                        <div style={{
                            height: '140px',
                            background: `linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.7)), url(${trip.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'flex',
                            alignItems: 'flex-end',
                            padding: '16px',
                            position: 'relative'
                        }}>
                            <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                                {getStatusBadge(trip.status)}
                            </div>
                            <div style={{ color: 'white' }}>
                                <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>
                                    {trip.name}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.9, fontSize: '13px' }}>
                                    <MapPin size={14} />
                                    {trip.destination}
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div style={{ padding: '16px' }}>
                            {/* Dates */}
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '6px',
                                color: 'var(--text-secondary)',
                                fontSize: '13px',
                                marginBottom: '16px'
                            }}>
                                <Calendar size={14} />
                                {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                            </div>

                            {/* Progress */}
                            <div style={{ marginBottom: '16px' }}>
                                <div style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between',
                                    fontSize: '12px',
                                    marginBottom: '6px'
                                }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Progreso</span>
                                    <span style={{ color: 'var(--accent-primary)', fontWeight: '600' }}>
                                        {trip.progress}%
                                    </span>
                                </div>
                                <div style={{
                                    height: '6px',
                                    background: 'var(--glass-border)',
                                    borderRadius: '3px',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{
                                        width: `${trip.progress}%`,
                                        height: '100%',
                                        background: 'var(--gradient-primary)',
                                        borderRadius: '3px',
                                        transition: 'width 0.3s'
                                    }} />
                                </div>
                            </div>

                            {/* Footer */}
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center' 
                            }}>
                                <div>
                                    <div style={{ fontSize: '20px', fontWeight: '700' }}>
                                        €{trip.totalCost.toLocaleString()}
                                    </div>
                                    {trip.savings > 0 && (
                                        <div style={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: '4px',
                                            color: 'var(--accent-success)', 
                                            fontSize: '12px' 
                                        }}>
                                            <Sparkles size={12} />
                                            Ahorraste €{trip.savings}
                                        </div>
                                    )}
                                </div>
                                <Button variant="primary" size="sm">
                                    Gestionar <ArrowRight size={14} />
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
