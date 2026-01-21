'use client';

import { useState } from 'react';
import { Plane, Clock, Luggage, ChevronDown, ChevronUp, Heart, Star } from 'lucide-react';
import { Card, Badge, Button, AIScore, Price } from '@/components/ui';
import { useFavoritesStore } from '@/store';
import type { FlightWithScore } from '@/types';

interface FlightResultCardProps {
    flight: FlightWithScore;
    isBest?: boolean;
}

export default function FlightResultCard({ flight, isBest = false }: FlightResultCardProps) {
    const [expanded, setExpanded] = useState(false);
    const { toggleFlight, isFavoriteFlight } = useFavoritesStore();
    const isFavorite = isFavoriteFlight(flight.id);

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
                    ✨ MEJOR OPCIÓN IA - {flight.aiReason}
                </div>
            )}

            {/* Main Content */}
            <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Left: Airline & Flight Info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        {/* Airline Logo */}
                        <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '12px',
                            background: 'var(--glass-bg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px'
                        }}>
                            {flight.airlineLogo}
                        </div>

                        {/* Flight Details */}
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                                <span style={{ fontWeight: '600' }}>{flight.airline}</span>
                                <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{flight.flightNumber}</span>
                                <AIScore score={flight.aiScore} size="sm" />
                            </div>

                            {/* Times */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div>
                                    <div style={{ fontSize: '22px', fontWeight: '700' }}>{flight.departTime}</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{flight.origin.code}</div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '120px' }}>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{flight.duration}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
                                        <div style={{ flex: 1, height: '2px', background: 'var(--glass-border)' }} />
                                        <Plane size={14} color="var(--accent-primary)" />
                                        <div style={{ flex: 1, height: '2px', background: 'var(--glass-border)' }} />
                                    </div>
                                    <div style={{ color: flight.stops === 0 ? 'var(--accent-success)' : 'var(--accent-warning)', fontSize: '12px' }}>
                                        {flight.stops === 0 ? 'Directo' : `${flight.stops} escala${flight.stops > 1 ? 's' : ''}`}
                                        {flight.stopCity && ` (${flight.stopCity})`}
                                    </div>
                                </div>

                                <div>
                                    <div style={{ fontSize: '22px', fontWeight: '700' }}>{flight.arriveTime}</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{flight.destination.code}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Price & Actions */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        {/* Luggage */}
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <Badge variant={flight.cabinBag ? 'success' : 'muted'}>
                                <Luggage size={12} />
                                Cabina
                            </Badge>
                            <Badge variant={flight.checkedBag ? 'success' : 'muted'}>
                                <Luggage size={12} />
                                Facturado
                            </Badge>
                        </div>

                        {/* Price */}
                        <div style={{ textAlign: 'right', minWidth: '100px' }}>
                            <Price current={flight.price} original={flight.originalPrice} size="md" />
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>por persona</div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFlight(flight.id);
                                }}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '10px',
                                    background: isFavorite ? 'rgba(239, 68, 68, 0.15)' : 'var(--glass-bg)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Heart
                                    size={18}
                                    fill={isFavorite ? 'var(--accent-danger)' : 'none'}
                                    color={isFavorite ? 'var(--accent-danger)' : 'var(--text-muted)'}
                                />
                            </button>

                            <Button variant="primary">
                                Seleccionar
                            </Button>
                        </div>

                        {/* Expand */}
                        <button
                            onClick={() => setExpanded(!expanded)}
                            style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '8px',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--text-muted)'
                            }}
                        >
                            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Expanded Details */}
            {expanded && (
                <div style={{
                    padding: '20px',
                    paddingTop: '0',
                    borderTop: '1px solid var(--glass-border)',
                    background: 'var(--bg-secondary)'
                }}>
                    <div style={{ paddingTop: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
                        {/* Reviews */}
                        <div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>Reviews</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Star size={16} fill="var(--accent-warning)" color="var(--accent-warning)" />
                                <span style={{ fontWeight: '600' }}>
                                    {flight.reviews.positive}% positivas
                                </span>
                                <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                                    ({flight.reviews.total} reviews)
                                </span>
                            </div>
                        </div>

                        {/* Price Trend */}
                        <div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>Tendencia precio</div>
                            <Badge variant={flight.priceHistory === 'down' ? 'success' : flight.priceHistory === 'up' ? 'danger' : 'muted'}>
                                {flight.priceHistory === 'down' && '📉 Bajando'}
                                {flight.priceHistory === 'up' && '📈 Subiendo'}
                                {flight.priceHistory === 'stable' && '➡️ Estable'}
                            </Badge>
                        </div>

                        {/* AI Analysis */}
                        <div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>Análisis IA</div>
                            <span style={{ fontSize: '13px' }}>{flight.aiReason}</span>
                        </div>
                    </div>
                </div>
            )}
        </Card>
    );
}
