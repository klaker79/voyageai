'use client';

import { useState } from 'react';
import { Star, MapPin, Heart, Wifi, Car, Coffee, Waves, Dumbbell, CheckCircle } from 'lucide-react';
import { Card, Badge, Button, AIScore, Price } from '@/components/ui';
import { useFavoritesStore } from '@/store';
import type { StayWithScore, Amenity } from '@/types';

interface StayResultCardProps {
    stay: StayWithScore;
    isBest?: boolean;
}

// Map amenity to icon
const amenityIcons: Record<Amenity, React.ElementType> = {
    wifi: Wifi,
    parking: Car,
    breakfast: Coffee,
    pool: Waves,
    gym: Dumbbell,
    spa: Waves,
    kitchen: Coffee,
    bar: Coffee,
    washer: Coffee,
    ac: Coffee,
    pets: Coffee
};

export default function StayResultCard({ stay, isBest = false }: StayResultCardProps) {
    const { toggleStay, isFavoriteStay } = useFavoritesStore();
    const isFavorite = isFavoriteStay(stay.id);

    return (
        <Card
            noPadding
            highlight={isBest}
            style={{ overflow: 'hidden' }}
        >
            {/* Best Badge */}
            {isBest && (
                <div style={{
                    background: 'var(--gradient-primary)',
                    color: 'white',
                    textAlign: 'center',
                    padding: '6px',
                    fontSize: '12px',
                    fontWeight: '600'
                }}>
                    ✨ MEJOR OPCIÓN IA - {stay.aiReason}
                </div>
            )}

            <div style={{ display: 'flex' }}>
                {/* Image */}
                <div style={{
                    width: '280px',
                    minHeight: '200px',
                    background: `url(${stay.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    flexShrink: 0
                }}>
                    {/* Favorite Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleStay(stay.id);
                        }}
                        style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: isFavorite ? 'rgba(239, 68, 68, 0.9)' : 'rgba(0,0,0,0.3)',
                            backdropFilter: 'blur(4px)',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Heart
                            size={18}
                            fill={isFavorite ? 'white' : 'none'}
                            color="white"
                        />
                    </button>

                    {/* Type Badge */}
                    <div style={{
                        position: 'absolute',
                        bottom: '12px',
                        left: '12px'
                    }}>
                        <Badge variant="ai">
                            {stay.type === 'hotel' && `Hotel ${stay.starRating}★`}
                            {stay.type === 'apartment' && 'Apartamento'}
                            {stay.type === 'hostel' && 'Hostel'}
                            {stay.type === 'boutique' && 'Boutique'}
                        </Badge>
                    </div>
                </div>

                {/* Content */}
                <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        {/* Title & Rating */}
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                                <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>{stay.name}</h3>
                                <AIScore score={stay.aiScore} size="sm" />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <MapPin size={14} />
                                    {stay.location.distance}
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Star size={14} fill="var(--accent-warning)" color="var(--accent-warning)" />
                                    {stay.rating} ({stay.reviewsCount} reviews)
                                </span>
                            </div>
                        </div>

                        {/* Price */}
                        <div style={{ textAlign: 'right' }}>
                            <Price current={stay.price} original={stay.originalPrice} size="md" />
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>por noche</div>
                        </div>
                    </div>

                    {/* Room Type */}
                    <div style={{ marginBottom: '12px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                        {stay.roomType}
                    </div>

                    {/* Amenities */}
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                        {stay.amenities.slice(0, 5).map((amenity) => {
                            const Icon = amenityIcons[amenity] || Wifi;
                            return (
                                <Badge key={amenity} variant="muted">
                                    <Icon size={12} />
                                    {amenity === 'wifi' && 'WiFi'}
                                    {amenity === 'pool' && 'Piscina'}
                                    {amenity === 'parking' && 'Parking'}
                                    {amenity === 'breakfast' && 'Desayuno'}
                                    {amenity === 'spa' && 'Spa'}
                                    {amenity === 'gym' && 'Gym'}
                                    {amenity === 'kitchen' && 'Cocina'}
                                </Badge>
                            );
                        })}
                    </div>

                    {/* Bottom Row */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 'auto'
                    }}>
                        {/* Cancellation */}
                        <Badge variant={stay.cancellation === 'free' ? 'success' : 'muted'}>
                            <CheckCircle size={12} />
                            {stay.cancellation === 'free' && 'Cancelación gratuita'}
                            {stay.cancellation === 'partial' && 'Reembolso parcial'}
                            {stay.cancellation === 'non_refundable' && 'No reembolsable'}
                        </Badge>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <Button variant="secondary" size="sm">
                                Ver detalles
                            </Button>
                            <Button variant="primary" size="sm">
                                Reservar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
