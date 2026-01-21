'use client';

import { useState } from 'react';
import {
    Plane,
    ArrowRight,
    Calendar,
    Users,
    Search,
    Sparkles,
    Clock,
    Luggage,
    Star,
    TrendingDown,
    Filter,
    ArrowUpDown
} from 'lucide-react';
import FlightResults from '@/components/flights/FlightResults';

export default function FlightsPage() {
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const [origin, setOrigin] = useState('Madrid (MAD)');
    const [destination, setDestination] = useState('');
    const [departDate, setDepartDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [passengers, setPassengers] = useState('1 Adulto');
    const [tripType, setTripType] = useState<'roundtrip' | 'oneway'>('roundtrip');

    const handleSearch = () => {
        if (!destination) return;
        setIsSearching(true);
        // Simular búsqueda
        setTimeout(() => {
            setIsSearching(false);
            setSearchPerformed(true);
        }, 2000);
    };

    return (
        <>
            <div className="page-header">
                <h1 className="page-title">Buscar Vuelos ✈️</h1>
                <p className="page-subtitle">
                    Encuentra los mejores vuelos con análisis IA de precios, reviews y predicciones.
                </p>
            </div>

            {/* Search Box */}
            <div className="card" style={{ marginBottom: '24px' }}>
                {/* Trip Type Toggle */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                    <button
                        className={`btn ${tripType === 'roundtrip' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setTripType('roundtrip')}
                        style={{ padding: '10px 20px' }}
                    >
                        Ida y Vuelta
                    </button>
                    <button
                        className={`btn ${tripType === 'oneway' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setTripType('oneway')}
                        style={{ padding: '10px 20px' }}
                    >
                        Solo Ida
                    </button>
                </div>

                {/* Search Form */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: tripType === 'roundtrip' ? '1fr 1fr 1fr 1fr auto auto' : '1fr 1fr 1fr auto auto',
                    gap: '16px',
                    alignItems: 'end'
                }}>
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
                                value={origin}
                                onChange={(e) => setOrigin(e.target.value)}
                                placeholder="¿De dónde sales?"
                                style={{ paddingLeft: '40px' }}
                            />
                        </div>
                    </div>

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
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                placeholder="¿A dónde vas?"
                                style={{ paddingLeft: '40px', borderColor: 'var(--accent-primary)' }}
                            />
                        </div>
                    </div>

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
                                value={departDate}
                                onChange={(e) => setDepartDate(e.target.value)}
                                style={{ paddingLeft: '40px' }}
                            />
                        </div>
                    </div>

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
                                    value={returnDate}
                                    onChange={(e) => setReturnDate(e.target.value)}
                                    style={{ paddingLeft: '40px' }}
                                />
                            </div>
                        </div>
                    )}

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
                                value={passengers}
                                onChange={(e) => setPassengers(e.target.value)}
                                style={{ paddingLeft: '40px', cursor: 'pointer' }}
                            >
                                <option>1 Adulto</option>
                                <option>2 Adultos</option>
                                <option>3 Adultos</option>
                                <option>2 Adultos + 1 Niño</option>
                                <option>2 Adultos + 2 Niños</option>
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

                {/* Options */}
                <div style={{
                    display: 'flex',
                    gap: '24px',
                    marginTop: '20px',
                    paddingTop: '20px',
                    borderTop: '1px solid var(--glass-border)',
                    flexWrap: 'wrap'
                }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer' }}>
                        <input type="checkbox" style={{ accentColor: 'var(--accent-primary)' }} />
                        Fechas flexibles (±3 días)
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer' }}>
                        <input type="checkbox" style={{ accentColor: 'var(--accent-primary)' }} />
                        Incluir aeropuertos cercanos
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer' }}>
                        <input type="checkbox" defaultChecked style={{ accentColor: 'var(--accent-primary)' }} />
                        Solo vuelos directos
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer' }}>
                        <input type="checkbox" defaultChecked style={{ accentColor: 'var(--accent-primary)' }} />
                        Monitorear precio con IA
                    </label>
                </div>
            </div>

            {/* Loading State */}
            {isSearching && (
                <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
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
                </div>
            )}

            {/* Results */}
            {searchPerformed && !isSearching && (
                <FlightResults origin={origin} destination={destination} />
            )}

            {/* Initial State - Popular Destinations */}
            {!searchPerformed && !isSearching && (
                <div>
                    <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
                        Destinos Populares desde {origin.split(' ')[0]}
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                        {[
                            { city: 'París', code: 'CDG', price: '€45', image: '🗼' },
                            { city: 'Londres', code: 'LHR', price: '€52', image: '🎡' },
                            { city: 'Roma', code: 'FCO', price: '€38', image: '🏛️' },
                            { city: 'Ámsterdam', code: 'AMS', price: '€49', image: '🌷' },
                            { city: 'Berlín', code: 'BER', price: '€41', image: '🏰' },
                            { city: 'Lisboa', code: 'LIS', price: '€35', image: '🌊' },
                        ].map((dest) => (
                            <div
                                key={dest.code}
                                className="card"
                                style={{
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    padding: '16px'
                                }}
                                onClick={() => {
                                    setDestination(`${dest.city} (${dest.code})`);
                                }}
                            >
                                <div style={{ fontSize: '32px' }}>{dest.image}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: '600' }}>{dest.city}</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{dest.code}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ color: 'var(--accent-success)', fontWeight: '700', fontSize: '18px' }}>
                                        {dest.price}
                                    </div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>desde</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
