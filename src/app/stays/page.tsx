'use client';

import { useState } from 'react';
import {
    Hotel,
    Search,
    Calendar,
    Users,
    Sparkles,
    Star,
    MapPin,
    Wifi,
    Car,
    Coffee,
    Waves,
    Heart,
    Filter
} from 'lucide-react';
import StayResults from '@/components/stays/StayResults';

export default function StaysPage() {
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const [destination, setDestination] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState('2 Adultos');
    const [rooms, setRooms] = useState('1 Habitación');

    const handleSearch = () => {
        if (!destination) return;
        setIsSearching(true);
        setTimeout(() => {
            setIsSearching(false);
            setSearchPerformed(true);
        }, 2000);
    };

    return (
        <>
            <div className="page-header">
                <h1 className="page-title">Buscar Estancias 🏨</h1>
                <p className="page-subtitle">
                    Hoteles, apartamentos y alojamientos únicos analizados por IA para tu viaje perfecto.
                </p>
            </div>

            {/* Search Box */}
            <div className="card" style={{ marginBottom: '24px' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr auto',
                    gap: '16px',
                    alignItems: 'end'
                }}>
                    <div className="form-group">
                        <label className="form-label">Destino</label>
                        <div style={{ position: 'relative' }}>
                            <MapPin size={16} style={{
                                position: 'absolute',
                                left: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'var(--accent-primary)'
                            }} />
                            <input
                                type="text"
                                className="form-input"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                placeholder="¿A dónde vas?"
                                style={{ paddingLeft: '40px', borderColor: 'var(--accent-primary)' }}
                            />
                        </div>
                    </div>

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
                                value={checkIn}
                                onChange={(e) => setCheckIn(e.target.value)}
                                style={{ paddingLeft: '40px' }}
                            />
                        </div>
                    </div>

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
                                value={checkOut}
                                onChange={(e) => setCheckOut(e.target.value)}
                                style={{ paddingLeft: '40px' }}
                            />
                        </div>
                    </div>

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
                                value={guests}
                                onChange={(e) => setGuests(e.target.value)}
                                style={{ paddingLeft: '40px', cursor: 'pointer' }}
                            >
                                <option>1 Adulto</option>
                                <option>2 Adultos</option>
                                <option>2 Adultos + 1 Niño</option>
                                <option>2 Adultos + 2 Niños</option>
                                <option>3 Adultos</option>
                                <option>4 Adultos</option>
                            </select>
                        </div>
                    </div>

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
                                value={rooms}
                                onChange={(e) => setRooms(e.target.value)}
                                style={{ paddingLeft: '40px', cursor: 'pointer' }}
                            >
                                <option>1 Habitación</option>
                                <option>2 Habitaciones</option>
                                <option>3 Habitaciones</option>
                            </select>
                        </div>
                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={handleSearch}
                        disabled={isSearching || !destination}
                        style={{ height: '48px', minWidth: '160px' }}
                    >
                        {isSearching ? (
                            <>
                                <div className="spinner" />
                                Buscando...
                            </>
                        ) : (
                            <>
                                <Sparkles size={18} />
                                Buscar con IA
                            </>
                        )}
                    </button>
                </div>

                {/* Filters */}
                <div style={{
                    display: 'flex',
                    gap: '12px',
                    marginTop: '20px',
                    paddingTop: '20px',
                    borderTop: '1px solid var(--glass-border)',
                    flexWrap: 'wrap'
                }}>
                    <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                        <Filter size={14} />
                        Filtros
                    </button>
                    <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                        <Star size={14} />
                        4+ Estrellas
                    </button>
                    <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                        <Wifi size={14} />
                        WiFi Gratis
                    </button>
                    <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                        <Car size={14} />
                        Parking
                    </button>
                    <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                        <Coffee size={14} />
                        Desayuno
                    </button>
                    <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                        <Waves size={14} />
                        Piscina
                    </button>
                </div>
            </div>

            {/* Loading State */}
            {isSearching && (
                <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
                    <div className="ai-insight-icon" style={{ margin: '0 auto 20px', width: '64px', height: '64px' }}>
                        <Sparkles size={32} color="white" />
                    </div>
                    <h3 style={{ marginBottom: '12px' }}>Analizando alojamientos...</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Comparando 150+ hoteles, verificando reviews y calculando la mejor relación calidad-precio
                    </p>
                </div>
            )}

            {/* Results */}
            {searchPerformed && !isSearching && (
                <StayResults destination={destination} />
            )}

            {/* Initial State - Featured Destinations */}
            {!searchPerformed && !isSearching && (
                <div>
                    <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
                        Destinos Destacados
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                        {[
                            {
                                city: 'Barcelona',
                                country: 'España',
                                image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800',
                                price: '€89',
                                hotels: 423
                            },
                            {
                                city: 'París',
                                country: 'Francia',
                                image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
                                price: '€120',
                                hotels: 567
                            },
                            {
                                city: 'Roma',
                                country: 'Italia',
                                image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800',
                                price: '€95',
                                hotels: 389
                            },
                            {
                                city: 'Ámsterdam',
                                country: 'Países Bajos',
                                image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800',
                                price: '€110',
                                hotels: 298
                            },
                        ].map((dest) => (
                            <div
                                key={dest.city}
                                className="card"
                                style={{
                                    cursor: 'pointer',
                                    padding: '0',
                                    overflow: 'hidden'
                                }}
                                onClick={() => setDestination(dest.city)}
                            >
                                <div style={{
                                    height: '160px',
                                    backgroundImage: `url(${dest.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    position: 'relative'
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '12px',
                                        left: '12px',
                                        background: 'rgba(0,0,0,0.7)',
                                        padding: '6px 12px',
                                        borderRadius: '8px',
                                        backdropFilter: 'blur(4px)'
                                    }}>
                                        <div style={{ fontWeight: '600' }}>{dest.city}</div>
                                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{dest.country}</div>
                                    </div>
                                    <button
                                        style={{
                                            position: 'absolute',
                                            top: '12px',
                                            right: '12px',
                                            background: 'rgba(0,0,0,0.5)',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: '36px',
                                            height: '36px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer'
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Heart size={18} color="white" />
                                    </button>
                                </div>
                                <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                                            {dest.hotels} alojamientos
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--accent-success)' }}>
                                            {dest.price}
                                        </div>
                                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>por noche</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
