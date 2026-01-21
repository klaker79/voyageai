'use client';

import { Sparkles, Search, Calendar, Users } from 'lucide-react';

export default function HeroSearch() {
    return (
        <div className="hero-search">
            <div className="hero-search-title">
                <Sparkles size={28} color="var(--accent-primary)" />
                ¿A dónde quieres viajar?
            </div>
            <div className="hero-search-subtitle">
                Nuestro asistente IA encontrará las mejores opciones para ti, analizando precios, reviews y disponibilidad en tiempo real.
            </div>

            <div className="search-form">
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
                            placeholder="Madrid (MAD)"
                            style={{ paddingLeft: '36px' }}
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
                            color: 'var(--text-muted)'
                        }} />
                        <input
                            type="text"
                            className="form-input"
                            placeholder="¿A dónde vas?"
                            style={{ paddingLeft: '36px' }}
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
                            type="text"
                            className="form-input"
                            placeholder="Seleccionar fechas"
                            style={{ paddingLeft: '36px' }}
                        />
                    </div>
                </div>

                <button className="btn btn-primary" style={{ height: '48px', minWidth: '160px' }}>
                    <Sparkles size={18} />
                    Buscar con IA
                </button>
            </div>

            <div style={{
                display: 'flex',
                gap: '24px',
                marginTop: '20px',
                paddingTop: '20px',
                borderTop: '1px solid var(--glass-border)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                    <input type="checkbox" id="flexible" style={{ accentColor: 'var(--accent-primary)' }} />
                    <label htmlFor="flexible">Fechas flexibles (±3 días)</label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                    <input type="checkbox" id="nearby" style={{ accentColor: 'var(--accent-primary)' }} />
                    <label htmlFor="nearby">Incluir aeropuertos cercanos</label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                    <input type="checkbox" id="monitor" defaultChecked style={{ accentColor: 'var(--accent-primary)' }} />
                    <label htmlFor="monitor">Monitorear precios con IA</label>
                </div>
            </div>
        </div>
    );
}
