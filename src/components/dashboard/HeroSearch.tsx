'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Search, Calendar, Plane, Hotel } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { useSearchStore } from '@/store';

export default function HeroSearch() {
    const router = useRouter();
    const { flightSearch, setFlightSearch, staySearch, setStaySearch } = useSearchStore();
    const [searchType, setSearchType] = useState<'flights' | 'stays'>('flights');
    const [destination, setDestination] = useState('');

    const handleSearch = () => {
        if (!destination) return;

        if (searchType === 'flights') {
            setFlightSearch({ destination });
            router.push('/flights');
        } else {
            setStaySearch({ destination });
            router.push('/stays');
        }
    };

    return (
        <Card className="hero-search" style={{ marginBottom: '24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    fontSize: '24px',
                    fontWeight: '700',
                    marginBottom: '8px'
                }}>
                    <Sparkles size={28} color="var(--accent-primary)" />
                    ¿A dónde quieres viajar?
                </div>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                    Nuestro asistente IA encontrará las mejores opciones para ti, analizando precios, reviews y disponibilidad en tiempo real.
                </p>
            </div>

            {/* Search Type Toggle */}
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
                <Button
                    variant={searchType === 'flights' ? 'primary' : 'secondary'}
                    onClick={() => setSearchType('flights')}
                    leftIcon={<Plane size={16} />}
                >
                    Vuelos
                </Button>
                <Button
                    variant={searchType === 'stays' ? 'primary' : 'secondary'}
                    onClick={() => setSearchType('stays')}
                    leftIcon={<Hotel size={16} />}
                >
                    Alojamientos
                </Button>
            </div>

            {/* Search Form */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr auto',
                gap: '16px',
                alignItems: 'end'
            }}>
                <div className="form-group">
                    <label className="form-label">Origen</label>
                    <div style={{ position: 'relative' }}>
                        <Search size={16} style={{
                            position: 'absolute',
                            left: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--text-muted)'
                        }} />
                        <input
                            type="text"
                            className="form-input"
                            value={flightSearch.origin}
                            onChange={(e) => setFlightSearch({ origin: e.target.value })}
                            placeholder="Madrid (MAD)"
                            style={{ paddingLeft: '40px' }}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Destino</label>
                    <div style={{ position: 'relative' }}>
                        <Search size={16} style={{
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
                    <label className="form-label">Fechas</label>
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
                            onChange={(e) => {
                                if (searchType === 'flights') {
                                    setFlightSearch({ departDate: e.target.value });
                                } else {
                                    setStaySearch({ checkIn: e.target.value });
                                }
                            }}
                            style={{ paddingLeft: '40px' }}
                        />
                    </div>
                </div>

                <Button
                    variant="primary"
                    onClick={handleSearch}
                    disabled={!destination}
                    leftIcon={<Sparkles size={18} />}
                    style={{ height: '48px', minWidth: '160px' }}
                >
                    Buscar con IA
                </Button>
            </div>

            {/* Quick Options */}
            <div style={{
                display: 'flex',
                gap: '24px',
                marginTop: '20px',
                paddingTop: '20px',
                borderTop: '1px solid var(--glass-border)',
                justifyContent: 'center'
            }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer' }}>
                    <input type="checkbox" style={{ accentColor: 'var(--accent-primary)' }} />
                    Fechas flexibles (±3 días)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked style={{ accentColor: 'var(--accent-primary)' }} />
                    Monitorear precios con IA
                </label>
            </div>
        </Card>
    );
}
