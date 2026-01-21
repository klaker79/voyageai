'use client';

import { Search, Bell, Settings } from 'lucide-react';

export default function Header() {
    return (
        <header className="header">
            <div className="search-container">
                <div style={{ position: 'relative' }}>
                    <Search
                        size={18}
                        style={{
                            position: 'absolute',
                            left: '16px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--text-muted)'
                        }}
                    />
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Buscar destinos, vuelos, reservas..."
                    />
                </div>
            </div>

            <div className="header-actions">
                <button className="header-btn">
                    <Bell size={18} />
                </button>
                <button className="header-btn">
                    <Settings size={18} />
                </button>
                <div className="avatar">
                    IK
                </div>
            </div>
        </header>
    );
}
