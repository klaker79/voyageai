'use client';

import { useState, useEffect } from 'react';
import { Plane, Calendar, Users, Sparkles, MapPin } from 'lucide-react';

// Components
import { Button, Card, Badge, Spinner, EmptyState } from '@/components/ui';
import { Input, Checkbox } from '@/components/ui/forms';
import FlightResultCard from '@/components/flights/FlightResultCard';

// Hooks & Store
import { useFlightSearch } from '@/hooks';
import { useSearchStore } from '@/store';

// Types
import type { FlightSearchParams } from '@/types';

export default function FlightsPage() {
    const {
        sortedResults,
        isLoading,
        hasSearched,
        search,
        sortBy,
        setSortBy,
        reset
    } = useFlightSearch();

    const { flightSearch, setFlightSearch } = useSearchStore();
    const [tripType, setTripType] = useState<'roundtrip' | 'oneway'>('roundtrip');

    // Popular destinations from origin
    const popularDestinations = [
        { city: 'París', code: 'CDG', price: 45, emoji: '🗼' },
        { city: 'Londres', code: 'LHR', price: 52, emoji: '🎡' },
        { city: 'Roma', code: 'FCO', price: 38, emoji: '🏛️' },
        { city: 'Ámsterdam', code: 'AMS', price: 49, emoji: '🌷' },
        { city: 'Berlín', code: 'BER', price: 41, emoji: '🏰' },
        { city: 'Lisboa', code: 'LIS', price: 35, emoji: '🌊' },
    ];

    const handleSearch = async () => {
        if (!flightSearch.destination) return;

        const params: FlightSearchParams = {
            origin: flightSearch.origin,
            destination: flightSearch.destination,
            departDate: flightSearch.departDate,
            returnDate: tripType === 'roundtrip' ? flightSearch.returnDate : undefined,
            passengers: flightSearch.passengers,
            tripType
        };

        await search(params);
    };

    const handleDestinationSelect = (city: string, code: string) => {
        setFlightSearch({ destination: `${city} (${code})` });
    };

    const bestFlight = sortedResults[0];

    return (
        <>
            {/* Header */}
            <div className="page-header">
                <h1 className="page-title">Buscar Vuelos ✈️</h1>
                <p className="page-subtitle">
                    Encuentra los mejores vuelos con análisis IA de precios, reviews y predicciones.
                </p>
            </div>

            {/* Search Box */}
            <Card className="search-box" style={{ marginBottom: '24px' }}>
                {/* Trip Type Toggle */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                    <Button
                        variant={tripType === 'roundtrip' ? 'primary' : 'secondary'}
                        onClick={() => setTripType('roundtrip')}
                    >
                        Ida y Vuelta
                    </Button>
                    <Button
                        variant={tripType === 'oneway' ? 'primary' : 'secondary'}
                        onClick={() => setTripType('oneway')}
                    >
                        Solo Ida
                    </Button>
                </div>

                {/* Search Form */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: tripType === 'roundtrip'
                        ? '1fr 1fr 1fr 1fr auto auto'
                        : '1fr 1fr 1fr auto auto',
                    gap: '16px',
                    alignItems: 'end'
                }}>
                    {/* Origin */}
                    <div className="form-group">
                        <label className="form-label">Origen</label>
                        <div style={{ position: 'relative' }}>
                            <Plane size={16} style={{
                                position: 'absolute',
                                left: '12px',
                                top: '50%',
                                transform: 'translateY(-50%) rotate(-45deg)',
                                color: 'var(--text-muted)'
                            }} />
                            <input
                                type="text"
                                className="form-input"
                                value={flightSearch.origin}
                                onChange={(e) => setFlightSearch({ origin: e.target.value })}
                                placeholder="¿De dónde sales?"
                                style={{ paddingLeft: '40px' }}
                            />
                        </div>
                    </div>

                    {/* Destination */}
                    <div className="form-group">
                        <label className="form-label">Destino</label>
                        <div style={{ position: 'relative' }}>
                            <Plane size={16} style={{
                                position: 'absolute',
                                left: '12px',
                                top: '50%',
                                transform: 'translateY(-50%) rotate(45deg)',
                                color: 'var(--accent-primary)'
                            }} />
                            <input
                                type="text"
                                className="form-input"
                                value={flightSearch.destination}
                                onChange={(e) => setFlightSearch({ destination: e.target.value })}
                                placeholder="¿A dónde vas?"
                                style={{ paddingLeft: '40px', borderColor: 'var(--accent-primary)' }}
                            />
                        </div>
                    </div>

                    {/* Depart Date */}
                    <div className="form-group">
                        <label className="form-label">Fecha Ida</label>
                        <div style={{ position: 'relative' }}>
                            <Calendar size={16} style={{
                                position: 'absolute',
                                left: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'var(--text-muted)'
                            }} />
                            <input
                                type="date"
                                className="form-input"
                                value={flightSearch.departDate}
                                onChange={(e) => setFlightSearch({ departDate: e.target.value })}
                                style={{ paddingLeft: '40px' }}
                            />
                        </div>
                    </div>

                    {/* Return Date */}
                    {tripType === 'roundtrip' && (
                        <div className="form-group">
                            <label className="form-label">Fecha Vuelta</label>
                            <div style={{ position: 'relative' }}>
                                <Calendar size={16} style={{
                                    position: 'absolute',
                                    left: '12px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--text-muted)'
                                }} />
                                <input
                                    type="date"
                                    className="form-input"
                                    value={flightSearch.returnDate}
                                    onChange={(e) => setFlightSearch({ returnDate: e.target.value })}
                                    style={{ paddingLeft: '40px' }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Passengers */}
                    <div className="form-group">
                        <label className="form-label">Pasajeros</label>
                        <div style={{ position: 'relative' }}>
                            <Users size={16} style={{
                                position: 'absolute',
                                left: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'var(--text-muted)'
                            }} />
                            <select
                                className="form-input"
                                value={flightSearch.passengers}
                                onChange={(e) => setFlightSearch({ passengers: parseInt(e.target.value) })}
                                style={{ paddingLeft: '40px', cursor: 'pointer' }}
                            >
                                <option value="1">1 Adulto</option>
                                <option value="2">2 Adultos</option>
                                <option value="3">3 Adultos</option>
                                <option value="4">4 Adultos</option>
                            </select>
                        </div>
                    </div>

                    {/* Search Button */}
                    <Button
                        variant="primary"
                        onClick={handleSearch}
                        disabled={isLoading || !flightSearch.destination}
                        isLoading={isLoading}
                        leftIcon={!isLoading && <Sparkles size={18} />}
                        style={{ height: '48px', minWidth: '160px' }}
                    >
                        {isLoading ? 'Buscando...' : 'Buscar con IA'}
                    </Button>
                </div>

                {/* Options */}
                <div style={{
                    display: 'flex',
                    gap: '24px',
                    marginTop: '20px',
                    paddingTop: '20px',
                    borderTop: '1px solid var(--glass-border)',
                    flexWrap: 'wrap'
                }}>
                    <Checkbox label="Fechas flexibles (±3 días)" />
                    <Checkbox label="Incluir aeropuertos cercanos" />
                    <Checkbox label="Solo vuelos directos" defaultChecked />
                    <Checkbox label="Monitorear precio con IA" defaultChecked />
                </div>
            </Card>

            {/* Loading State */}
            {isLoading && (
                <Card style={{ textAlign: 'center', padding: '60px' }}>
                    <div className="ai-insight-icon" style={{ margin: '0 auto 20px', width: '64px', height: '64px' }}>
                        <Sparkles size={32} color="white" />
                    </div>
                    <h3 style={{ marginBottom: '12px' }}>Buscando los mejores vuelos...</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Analizando 12 aerolíneas, comparando precios y verificando reviews
                    </p>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '32px',
                        marginTop: '24px',
                        color: 'var(--text-muted)',
                        fontSize: '13px'
                    }}>
                        <span>✓ Iberia</span>
                        <span>✓ Vueling</span>
                        <span>✓ Ryanair</span>
                        <span style={{ color: 'var(--accent-primary)' }}>⟳ Air Europa</span>
                        <span style={{ opacity: 0.5 }}>○ TAP</span>
                    </div>
                </Card>
            )}

            {/* Results */}
            {hasSearched && !isLoading && sortedResults.length > 0 && (
                <div>
                    {/* AI Recommendation */}
                    {bestFlight && (
                        <div className="ai-insight-card" style={{ marginBottom: '24px' }}>
                            <div className="ai-insight-header">
                                <div className="ai-insight-icon" style={{ width: '32px', height: '32px' }}>
                                    <Sparkles size={16} color="white" />
                                </div>
                                <div>
                                    <div className="ai-insight-title">Recomendación IA</div>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                                        {bestFlight.airline} ({bestFlight.flightNumber}) - {bestFlight.aiReason}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Sort Options */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>
                            {sortedResults.length} vuelos encontrados
                        </span>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <Button
                                variant={sortBy === 'ai' ? 'primary' : 'secondary'}
                                size="sm"
                                onClick={() => setSortBy('ai')}
                            >
                                Score IA
                            </Button>
                            <Button
                                variant={sortBy === 'price' ? 'primary' : 'secondary'}
                                size="sm"
                                onClick={() => setSortBy('price')}
                            >
                                Precio
                            </Button>
                            <Button
                                variant={sortBy === 'duration' ? 'primary' : 'secondary'}
                                size="sm"
                                onClick={() => setSortBy('duration')}
                            >
                                Duración
                            </Button>
                        </div>
                    </div>

                    {/* Flight Cards */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {sortedResults.map((flight, index) => (
                            <FlightResultCard
                                key={flight.id}
                                flight={flight}
                                isBest={index === 0 && sortBy === 'ai'}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Empty Results */}
            {hasSearched && !isLoading && sortedResults.length === 0 && (
                <Card>
                    <EmptyState
                        icon={<Plane size={48} />}
                        title="No se encontraron vuelos"
                        description="Intenta con otras fechas o destinos"
                        action={<Button variant="secondary" onClick={reset}>Nueva búsqueda</Button>}
                    />
                </Card>
            )}

            {/* Initial State - Popular Destinations */}
            {!hasSearched && !isLoading && (
                <div>
                    <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
                        Destinos Populares desde {flightSearch.origin.split(' ')[0]}
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                        {popularDestinations.map((dest) => (
                            <Card
                                key={dest.code}
                                onClick={() => handleDestinationSelect(dest.city, dest.code)}
                                style={{
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    padding: '16px'
                                }}
                            >
                                <div style={{ fontSize: '32px' }}>{dest.emoji}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: '600' }}>{dest.city}</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{dest.code}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ color: 'var(--accent-success)', fontWeight: '700', fontSize: '18px' }}>
                                        €{dest.price}
                                    </div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>desde</div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
