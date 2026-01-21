'use client';

import { useState } from 'react';
import { Hotel, Calendar, Users, Sparkles, Heart, Wifi, Car, Coffee, Waves, Dumbbell } from 'lucide-react';

// Components
import { Button, Card, Badge, EmptyState } from '@/components/ui';
import { Checkbox } from '@/components/ui/forms';
import StayResultCard from '@/components/stays/StayResultCard';

// Hooks & Store
import { useStaySearch } from '@/hooks';
import { useSearchStore } from '@/store';

// Types
import type { StaySearchParams, Amenity } from '@/types';

// Amenity filter options
const amenityFilters: { key: Amenity; label: string; icon: React.ElementType }[] = [
    { key: 'wifi', label: 'WiFi Gratis', icon: Wifi },
    { key: 'parking', label: 'Parking', icon: Car },
    { key: 'breakfast', label: 'Desayuno', icon: Coffee },
    { key: 'pool', label: 'Piscina', icon: Waves },
    { key: 'gym', label: 'Gimnasio', icon: Dumbbell },
];

// Featured destinations
const featuredDestinations = [
    {
        city: 'Barcelona',
        country: 'España',
        image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800',
        price: 89,
        staysCount: 423
    },
    {
        city: 'París',
        country: 'Francia',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
        price: 120,
        staysCount: 567
    },
    {
        city: 'Roma',
        country: 'Italia',
        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800',
        price: 95,
        staysCount: 389
    },
    {
        city: 'Ámsterdam',
        country: 'Países Bajos',
        image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800',
        price: 110,
        staysCount: 298
    }
];

export default function StaysPage() {
    const {
        sortedResults,
        isLoading,
        hasSearched,
        search,
        sortBy,
        setSortBy,
        reset
    } = useStaySearch();

    const { staySearch, setStaySearch } = useSearchStore();
    const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>([]);

    const toggleAmenity = (amenity: Amenity) => {
        setSelectedAmenities(prev =>
            prev.includes(amenity)
                ? prev.filter(a => a !== amenity)
                : [...prev, amenity]
        );
    };

    const handleSearch = async () => {
        if (!staySearch.destination) return;

        const params: StaySearchParams = {
            destination: staySearch.destination,
            checkIn: staySearch.checkIn,
            checkOut: staySearch.checkOut,
            guests: staySearch.guests,
            rooms: staySearch.rooms,
            amenities: selectedAmenities.length > 0 ? selectedAmenities : undefined
        };

        await search(params);
    };

    const handleDestinationSelect = (city: string) => {
        setStaySearch({ destination: city });
    };

    const bestStay = sortedResults[0];

    return (
        <>
            {/* Header */}
            <div className="page-header">
                <h1 className="page-title">Buscar Estancias 🏨</h1>
                <p className="page-subtitle">
                    Hoteles, apartamentos y alojamientos únicos analizados por IA para tu viaje perfecto.
                </p>
            </div>

            {/* Search Box */}
            <Card style={{ marginBottom: '24px' }}>
                {/* Search Form */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr auto',
                    gap: '16px',
                    alignItems: 'end'
                }}>
                    {/* Destination */}
                    <div className="form-group">
                        <label className="form-label">Destino</label>
                        <div style={{ position: 'relative' }}>
                            <Hotel size={16} style={{
                                position: 'absolute',
                                left: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'var(--accent-primary)'
                            }} />
                            <input
                                type="text"
                                className="form-input"
                                value={staySearch.destination}
                                onChange={(e) => setStaySearch({ destination: e.target.value })}
                                placeholder="¿A dónde vas?"
                                style={{ paddingLeft: '40px', borderColor: 'var(--accent-primary)' }}
                            />
                        </div>
                    </div>

                    {/* Check-in */}
                    <div className="form-group">
                        <label className="form-label">Check-in</label>
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
                                value={staySearch.checkIn}
                                onChange={(e) => setStaySearch({ checkIn: e.target.value })}
                                style={{ paddingLeft: '40px' }}
                            />
                        </div>
                    </div>

                    {/* Check-out */}
                    <div className="form-group">
                        <label className="form-label">Check-out</label>
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
                                value={staySearch.checkOut}
                                onChange={(e) => setStaySearch({ checkOut: e.target.value })}
                                style={{ paddingLeft: '40px' }}
                            />
                        </div>
                    </div>

                    {/* Guests */}
                    <div className="form-group">
                        <label className="form-label">Huéspedes</label>
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
                                value={staySearch.guests}
                                onChange={(e) => setStaySearch({ guests: parseInt(e.target.value) })}
                                style={{ paddingLeft: '40px', cursor: 'pointer' }}
                            >
                                <option value="1">1 Adulto</option>
                                <option value="2">2 Adultos</option>
                                <option value="3">3 Adultos</option>
                                <option value="4">4 Adultos</option>
                            </select>
                        </div>
                    </div>

                    {/* Rooms */}
                    <div className="form-group">
                        <label className="form-label">Habitaciones</label>
                        <div style={{ position: 'relative' }}>
                            <Hotel size={16} style={{
                                position: 'absolute',
                                left: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'var(--text-muted)'
                            }} />
                            <select
                                className="form-input"
                                value={staySearch.rooms}
                                onChange={(e) => setStaySearch({ rooms: parseInt(e.target.value) })}
                                style={{ paddingLeft: '40px', cursor: 'pointer' }}
                            >
                                <option value="1">1 Habitación</option>
                                <option value="2">2 Habitaciones</option>
                                <option value="3">3 Habitaciones</option>
                            </select>
                        </div>
                    </div>

                    {/* Search Button */}
                    <Button
                        variant="primary"
                        onClick={handleSearch}
                        disabled={isLoading || !staySearch.destination}
                        isLoading={isLoading}
                        leftIcon={!isLoading && <Sparkles size={18} />}
                        style={{ height: '48px', minWidth: '140px' }}
                    >
                        {isLoading ? 'Buscando...' : 'Buscar'}
                    </Button>
                </div>

                {/* Amenity Filters */}
                <div style={{
                    display: 'flex',
                    gap: '8px',
                    marginTop: '20px',
                    paddingTop: '20px',
                    borderTop: '1px solid var(--glass-border)',
                    flexWrap: 'wrap'
                }}>
                    {amenityFilters.map(({ key, label, icon: Icon }) => (
                        <Button
                            key={key}
                            variant={selectedAmenities.includes(key) ? 'primary' : 'secondary'}
                            size="sm"
                            onClick={() => toggleAmenity(key)}
                            leftIcon={<Icon size={14} />}
                        >
                            {label}
                        </Button>
                    ))}
                </div>
            </Card>

            {/* Loading State */}
            {isLoading && (
                <Card style={{ textAlign: 'center', padding: '60px' }}>
                    <div className="ai-insight-icon" style={{ margin: '0 auto 20px', width: '64px', height: '64px' }}>
                        <Sparkles size={32} color="white" />
                    </div>
                    <h3 style={{ marginBottom: '12px' }}>Buscando los mejores alojamientos...</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Analizando 2,450 propiedades, verificando disponibilidad y comparando precios
                    </p>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '32px',
                        marginTop: '24px',
                        color: 'var(--text-muted)',
                        fontSize: '13px'
                    }}>
                        <span>✓ Booking</span>
                        <span>✓ Hoteles.com</span>
                        <span style={{ color: 'var(--accent-primary)' }}>⟳ Airbnb</span>
                        <span style={{ opacity: 0.5 }}>○ Directos</span>
                    </div>
                </Card>
            )}

            {/* Results */}
            {hasSearched && !isLoading && sortedResults.length > 0 && (
                <div>
                    {/* AI Recommendation */}
                    {bestStay && (
                        <div className="ai-insight-card" style={{ marginBottom: '24px' }}>
                            <div className="ai-insight-header">
                                <div className="ai-insight-icon" style={{ width: '32px', height: '32px' }}>
                                    <Sparkles size={16} color="white" />
                                </div>
                                <div>
                                    <div className="ai-insight-title">Recomendación IA</div>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                                        {bestStay.name} - {bestStay.aiReason}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Sort Options */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>
                            {sortedResults.length} alojamientos encontrados
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
                                variant={sortBy === 'rating' ? 'primary' : 'secondary'}
                                size="sm"
                                onClick={() => setSortBy('rating')}
                            >
                                Valoración
                            </Button>
                        </div>
                    </div>

                    {/* Stay Cards */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {sortedResults.map((stay, index) => (
                            <StayResultCard
                                key={stay.id}
                                stay={stay}
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
                        icon={<Hotel size={48} />}
                        title="No se encontraron alojamientos"
                        description="Intenta con otras fechas o destinos"
                        action={<Button variant="secondary" onClick={reset}>Nueva búsqueda</Button>}
                    />
                </Card>
            )}

            {/* Initial State - Featured Destinations */}
            {!hasSearched && !isLoading && (
                <div>
                    <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
                        Destinos Destacados
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                        {featuredDestinations.map((dest) => (
                            <Card
                                key={dest.city}
                                noPadding
                                onClick={() => handleDestinationSelect(dest.city)}
                                style={{ cursor: 'pointer', overflow: 'hidden' }}
                            >
                                {/* Image */}
                                <div style={{
                                    height: '160px',
                                    background: `linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.8)), url(${dest.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    padding: '16px',
                                    position: 'relative'
                                }}>
                                    {/* Favorite Button */}
                                    <button
                                        style={{
                                            position: 'absolute',
                                            top: '12px',
                                            right: '12px',
                                            width: '36px',
                                            height: '36px',
                                            borderRadius: '50%',
                                            background: 'rgba(255,255,255,0.2)',
                                            backdropFilter: 'blur(4px)',
                                            border: 'none',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Heart size={18} color="white" />
                                    </button>

                                    <div style={{ color: 'white' }}>
                                        <div style={{ fontWeight: '600', fontSize: '18px' }}>{dest.city}</div>
                                        <div style={{ opacity: 0.8, fontSize: '13px' }}>{dest.country}</div>
                                    </div>
                                </div>

                                {/* Info */}
                                <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                                        {dest.staysCount} alojamientos
                                    </span>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{ color: 'var(--accent-success)', fontWeight: '700', fontSize: '18px' }}>
                                            €{dest.price}
                                        </span>
                                        <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>por noche</div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
