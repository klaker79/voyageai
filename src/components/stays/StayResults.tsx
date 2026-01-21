'use client';

import {
    Star,
    MapPin,
    Wifi,
    Car,
    Coffee,
    Waves,
    Sparkles,
    Heart,
    CheckCircle,
    Users,
    Bed
} from 'lucide-react';
import { useState } from 'react';

interface StayResultsProps {
    destination: string;
}

const mockStays = [
    {
        id: 1,
        name: 'Hotel Arts Barcelona',
        type: 'Hotel 5 Estrellas',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        rating: 9.2,
        reviews: 2450,
        location: 'Frente al mar, Port Olímpic',
        distance: '0.5 km del centro',
        price: 289,
        originalPrice: 389,
        amenities: ['wifi', 'pool', 'parking', 'breakfast', 'spa'],
        aiScore: 96,
        aiReason: 'Mejor ubicación y servicios premium',
        roomType: 'Suite con vistas al mar',
        cancellation: 'Cancelación gratuita'
    },
    {
        id: 2,
        name: 'Casa Camper Barcelona',
        type: 'Hotel Boutique',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
        rating: 8.9,
        reviews: 1890,
        location: 'El Raval, cerca de Las Ramblas',
        distance: '0.2 km del centro',
        price: 175,
        originalPrice: 220,
        amenities: ['wifi', 'breakfast'],
        aiScore: 91,
        aiReason: 'Excelente relación calidad-precio en zona céntrica',
        roomType: 'Habitación Doble Superior',
        cancellation: 'Cancelación gratuita'
    },
    {
        id: 3,
        name: 'W Barcelona',
        type: 'Hotel 5 Estrellas',
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
        rating: 9.0,
        reviews: 3200,
        location: 'Barceloneta, frente a la playa',
        distance: '1.2 km del centro',
        price: 320,
        originalPrice: 420,
        amenities: ['wifi', 'pool', 'parking', 'breakfast', 'spa', 'gym'],
        aiScore: 89,
        aiReason: 'Icono arquitectónico con servicios de lujo',
        roomType: 'Wonderful Room con vistas',
        cancellation: 'Cancelación gratuita'
    },
    {
        id: 4,
        name: 'Generator Barcelona',
        type: 'Hostal Premium',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
        rating: 8.4,
        reviews: 4500,
        location: 'Gràcia, zona bohemia',
        distance: '1.5 km del centro',
        price: 45,
        originalPrice: 65,
        amenities: ['wifi', 'bar'],
        aiScore: 85,
        aiReason: 'Mejor opción económica con buen ambiente',
        roomType: 'Habitación Privada Doble',
        cancellation: 'Cancelación flexible'
    },
    {
        id: 5,
        name: 'Apartamento Gótico Luxury',
        type: 'Apartamento',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
        rating: 9.4,
        reviews: 320,
        location: 'Barrio Gótico',
        distance: '0.1 km del centro',
        price: 195,
        originalPrice: 250,
        amenities: ['wifi', 'kitchen', 'washer'],
        aiScore: 93,
        aiReason: 'Perfecto para estancias largas, cocina completa',
        roomType: '2 Dormitorios, 80m²',
        cancellation: 'Cancelación gratuita'
    }
];

const amenityIcons: Record<string, { icon: typeof Wifi; label: string }> = {
    wifi: { icon: Wifi, label: 'WiFi' },
    pool: { icon: Waves, label: 'Piscina' },
    parking: { icon: Car, label: 'Parking' },
    breakfast: { icon: Coffee, label: 'Desayuno' },
    spa: { icon: Sparkles, label: 'Spa' },
    gym: { icon: Users, label: 'Gimnasio' },
    kitchen: { icon: Coffee, label: 'Cocina' },
    bar: { icon: Coffee, label: 'Bar' },
    washer: { icon: Waves, label: 'Lavadora' }
};

export default function StayResults({ destination }: StayResultsProps) {
    const [sortBy, setSortBy] = useState<'ai' | 'price' | 'rating'>('ai');
    const [favorites, setFavorites] = useState<number[]>([]);

    const sortedStays = [...mockStays].sort((a, b) => {
        if (sortBy === 'ai') return b.aiScore - a.aiScore;
        if (sortBy === 'price') return a.price - b.price;
        return b.rating - a.rating;
    });

    const bestStay = sortedStays[0];

    const toggleFavorite = (id: number) => {
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
        );
    };

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
                            Te recomendamos {bestStay.name}
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                            {bestStay.aiReason}. Puntuación {bestStay.rating}/10 basada en {bestStay.reviews} opiniones.
                            {bestStay.cancellation}.
                        </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--accent-success)' }}>
                            €{bestStay.price}
                        </div>
                        <div style={{ color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                            €{bestStay.originalPrice}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>por noche</div>
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
                    <span style={{ fontWeight: '600' }}>{mockStays.length} alojamientos encontrados</span>
                    <span style={{ color: 'var(--text-muted)', marginLeft: '8px' }}>
                        en {destination}
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
                        className={`btn ${sortBy === 'rating' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setSortBy('rating')}
                        style={{ padding: '8px 16px', fontSize: '13px' }}
                    >
                        <Star size={14} />
                        Mejor valorado
                    </button>
                </div>
            </div>

            {/* Stay Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {sortedStays.map((stay, index) => (
                    <div
                        key={stay.id}
                        className="card"
                        style={{
                            padding: '0',
                            display: 'flex',
                            overflow: 'hidden',
                            border: index === 0 && sortBy === 'ai' ? '2px solid var(--accent-primary)' : undefined,
                            position: 'relative'
                        }}
                    >
                        {/* Best Badge */}
                        {index === 0 && sortBy === 'ai' && (
                            <div style={{
                                position: 'absolute',
                                top: '12px',
                                left: '12px',
                                background: 'var(--gradient-primary)',
                                padding: '4px 12px',
                                borderRadius: '12px',
                                fontSize: '11px',
                                fontWeight: '600',
                                color: 'white',
                                zIndex: 10
                            }}>
                                ✨ Mejor Opción IA
                            </div>
                        )}

                        {/* Image */}
                        <div style={{
                            width: '280px',
                            minHeight: '220px',
                            backgroundImage: `url(${stay.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            position: 'relative',
                            flexShrink: 0
                        }}>
                            <button
                                onClick={() => toggleFavorite(stay.id)}
                                style={{
                                    position: 'absolute',
                                    top: '12px',
                                    right: '12px',
                                    background: favorites.includes(stay.id) ? 'var(--accent-danger)' : 'rgba(0,0,0,0.5)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '36px',
                                    height: '36px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <Heart
                                    size={18}
                                    color="white"
                                    fill={favorites.includes(stay.id) ? 'white' : 'none'}
                                />
                            </button>
                        </div>

                        {/* Content */}
                        <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <div>
                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                                        {stay.type}
                                    </div>
                                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>
                                        {stay.name}
                                    </h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                                        <MapPin size={14} />
                                        {stay.location} · {stay.distance}
                                    </div>
                                </div>

                                {/* Rating */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    background: stay.rating >= 9 ? 'var(--accent-success)' : 'var(--accent-primary)',
                                    padding: '8px 12px',
                                    borderRadius: '8px',
                                    height: 'fit-content'
                                }}>
                                    <span style={{ fontWeight: '700', fontSize: '16px' }}>{stay.rating}</span>
                                    <div style={{ fontSize: '11px', lineHeight: 1.2 }}>
                                        <div>{stay.rating >= 9 ? 'Excelente' : stay.rating >= 8 ? 'Muy bien' : 'Bien'}</div>
                                        <div style={{ opacity: 0.8 }}>{stay.reviews} opiniones</div>
                                    </div>
                                </div>
                            </div>

                            {/* Room Type */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                <Bed size={16} color="var(--text-muted)" />
                                <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{stay.roomType}</span>
                            </div>

                            {/* Amenities */}
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                                {stay.amenities.slice(0, 5).map(amenity => {
                                    const AmenityIcon = amenityIcons[amenity]?.icon || Wifi;
                                    return (
                                        <div
                                            key={amenity}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                                padding: '4px 8px',
                                                background: 'var(--glass-bg)',
                                                borderRadius: '6px',
                                                fontSize: '12px',
                                                color: 'var(--text-secondary)'
                                            }}
                                        >
                                            <AmenityIcon size={12} />
                                            {amenityIcons[amenity]?.label}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* AI Score & Cancellation */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '4px 10px',
                                    background: stay.aiScore >= 90
                                        ? 'rgba(16, 185, 129, 0.15)'
                                        : 'rgba(245, 158, 11, 0.15)',
                                    borderRadius: '6px',
                                    fontSize: '12px'
                                }}>
                                    <Sparkles size={12} />
                                    <span style={{
                                        fontWeight: '600',
                                        color: stay.aiScore >= 90 ? 'var(--accent-success)' : 'var(--accent-warning)'
                                    }}>
                                        {stay.aiScore}% Match IA
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-success)', fontSize: '12px' }}>
                                    <CheckCircle size={12} />
                                    {stay.cancellation}
                                </div>
                            </div>

                            {/* Footer */}
                            <div style={{
                                marginTop: 'auto',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingTop: '12px',
                                borderTop: '1px solid var(--glass-border)'
                            }}>
                                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                                    {stay.aiReason}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--accent-success)' }}>
                                            €{stay.price}
                                        </div>
                                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                                            <span style={{ textDecoration: 'line-through' }}>€{stay.originalPrice}</span> por noche
                                        </div>
                                    </div>
                                    <button className="btn btn-primary">
                                        Reservar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
