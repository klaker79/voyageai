'use client';

import { useState } from 'react';
import {
    User,
    Sparkles,
    Plane,
    Hotel,
    CreditCard,
    Globe,
    Settings,
    Shield,
    Bell,
    CheckCircle,
    Edit3,
    Save,
    X
} from 'lucide-react';

const userProfile = {
    name: 'Iker Fernández',
    email: 'iker@example.com',
    avatar: 'IK',
    memberSince: 'Enero 2024',
    travelerType: 'Explorer',
    tripsThisYear: 8,
    countries: 15,
    totalSaved: 2840
};

const preferences = {
    flights: {
        seatType: 'Pasillo',
        class: 'Economy / Economy Plus',
        airlines: ['Iberia', 'Vueling', 'Air Europa'],
        maxLayover: '3 horas',
        directOnly: false,
        earlyFlights: true
    },
    stays: {
        type: 'Hotel 4★ o Boutique',
        amenities: ['WiFi', 'Desayuno incluido', 'Gimnasio'],
        location: 'Centro ciudad',
        budget: '€100-200/noche'
    },
    general: {
        currency: 'EUR',
        language: 'Español',
        notifications: true,
        autoBooking: false
    }
};

const aiLearnings = [
    { pattern: 'Prefieres vuelos por la mañana (antes de 10:00)', confidence: 95 },
    { pattern: 'Evitas aerolíneas low-cost para vuelos largos', confidence: 88 },
    { pattern: 'Reservas hoteles cerca de estaciones de metro', confidence: 92 },
    { pattern: 'Prefieres cancelación gratuita aunque cueste más', confidence: 85 },
    { pattern: 'Viajas más en febrero y agosto', confidence: 78 }
];

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'ai'>('profile');
    const [editMode, setEditMode] = useState(false);

    return (
        <>
            <div className="page-header">
                <h1 className="page-title">Mi Perfil IA 🧠</h1>
                <p className="page-subtitle">
                    Configura tus preferencias y deja que la IA aprenda tus gustos de viaje.
                </p>
            </div>

            {/* Profile Header */}
            <div className="card" style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <div style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        background: 'var(--gradient-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '32px',
                        fontWeight: '700'
                    }}>
                        {userProfile.avatar}
                    </div>

                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: '700' }}>{userProfile.name}</h2>
                            <span className="ai-badge">{userProfile.travelerType}</span>
                        </div>
                        <div style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
                            {userProfile.email} · Miembro desde {userProfile.memberSince}
                        </div>
                        <div style={{ display: 'flex', gap: '24px' }}>
                            <div>
                                <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--accent-primary)' }}>
                                    {userProfile.tripsThisYear}
                                </div>
                                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>viajes este año</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--accent-secondary)' }}>
                                    {userProfile.countries}
                                </div>
                                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>países visitados</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--accent-success)' }}>
                                    €{userProfile.totalSaved}
                                </div>
                                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>ahorrado con IA</div>
                            </div>
                        </div>
                    </div>

                    <button className="btn btn-secondary">
                        <Edit3 size={16} />
                        Editar perfil
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                <button
                    className={`btn ${activeTab === 'profile' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setActiveTab('profile')}
                >
                    <User size={16} />
                    Perfil
                </button>
                <button
                    className={`btn ${activeTab === 'preferences' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setActiveTab('preferences')}
                >
                    <Settings size={16} />
                    Preferencias
                </button>
                <button
                    className={`btn ${activeTab === 'ai' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setActiveTab('ai')}
                >
                    <Sparkles size={16} />
                    IA Insights
                </button>
            </div>

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    {/* Flight Preferences */}
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '10px',
                                background: 'rgba(59, 130, 246, 0.15)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Plane size={20} color="var(--accent-primary)" />
                            </div>
                            <h3 style={{ fontWeight: '600' }}>Preferencias de Vuelo</h3>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Tipo de asiento</span>
                                <span style={{ fontWeight: '500' }}>{preferences.flights.seatType}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Clase preferida</span>
                                <span style={{ fontWeight: '500' }}>{preferences.flights.class}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Escala máxima</span>
                                <span style={{ fontWeight: '500' }}>{preferences.flights.maxLayover}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Aerolíneas favoritas</span>
                                <span style={{ fontWeight: '500' }}>{preferences.flights.airlines.join(', ')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Stay Preferences */}
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '10px',
                                background: 'rgba(139, 92, 246, 0.15)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Hotel size={20} color="var(--accent-secondary)" />
                            </div>
                            <h3 style={{ fontWeight: '600' }}>Preferencias de Alojamiento</h3>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Tipo preferido</span>
                                <span style={{ fontWeight: '500' }}>{preferences.stays.type}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Ubicación</span>
                                <span style={{ fontWeight: '500' }}>{preferences.stays.location}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Presupuesto</span>
                                <span style={{ fontWeight: '500' }}>{preferences.stays.budget}</span>
                            </div>
                            <div>
                                <span style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Amenities</span>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                    {preferences.stays.amenities.map((a, i) => (
                                        <span
                                            key={i}
                                            style={{
                                                padding: '4px 10px',
                                                background: 'var(--glass-bg)',
                                                borderRadius: '6px',
                                                fontSize: '12px'
                                            }}
                                        >
                                            {a}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* General Settings */}
                    <div className="card" style={{ gridColumn: 'span 2' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '10px',
                                background: 'rgba(16, 185, 129, 0.15)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Settings size={20} color="var(--accent-success)" />
                            </div>
                            <h3 style={{ fontWeight: '600' }}>Configuración General</h3>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Moneda</span>
                                <span style={{ fontWeight: '500' }}>{preferences.general.currency}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Idioma</span>
                                <span style={{ fontWeight: '500' }}>{preferences.general.language}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Notificaciones</span>
                                <span style={{
                                    color: preferences.general.notifications ? 'var(--accent-success)' : 'var(--text-muted)'
                                }}>
                                    {preferences.general.notifications ? 'Activadas' : 'Desactivadas'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* AI Insights Tab */}
            {activeTab === 'ai' && (
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div className="ai-insight-icon" style={{ width: '40px', height: '40px' }}>
                                <Sparkles size={20} color="white" />
                            </div>
                            <div>
                                <h3 style={{ fontWeight: '600' }}>Travel DNA - Lo que la IA ha aprendido</h3>
                                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                    Patrones detectados basados en tus reservas anteriores
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {aiLearnings.map((learning, index) => (
                            <div
                                key={index}
                                style={{
                                    background: 'var(--bg-secondary)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '12px',
                                    padding: '16px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <CheckCircle size={18} color="var(--accent-success)" />
                                    <span>{learning.pattern}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{
                                        width: '100px',
                                        height: '6px',
                                        background: 'var(--glass-border)',
                                        borderRadius: '3px',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{
                                            width: `${learning.confidence}%`,
                                            height: '100%',
                                            background: 'var(--gradient-primary)',
                                            borderRadius: '3px'
                                        }} />
                                    </div>
                                    <span style={{
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        color: 'var(--accent-primary)',
                                        minWidth: '40px'
                                    }}>
                                        {learning.confidence}%
                                    </span>
                                    <button
                                        className="btn btn-ghost"
                                        style={{ padding: '6px', fontSize: '12px' }}
                                        title="Esto no es correcto"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Auto-booking Toggle */}
                    <div style={{
                        marginTop: '24px',
                        padding: '20px',
                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
                        border: '1px solid rgba(139, 92, 246, 0.2)',
                        borderRadius: '16px'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                                    ✨ Reserva Autónoma
                                </div>
                                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                    Permite que la IA reserve automáticamente cuando encuentre una oferta que coincida 100% con tus preferencias
                                </div>
                            </div>
                            <div style={{
                                width: '60px',
                                height: '32px',
                                background: preferences.general.autoBooking ? 'var(--accent-success)' : 'var(--glass-border)',
                                borderRadius: '16px',
                                padding: '4px',
                                cursor: 'pointer',
                                transition: 'background 0.2s'
                            }}>
                                <div style={{
                                    width: '24px',
                                    height: '24px',
                                    background: 'white',
                                    borderRadius: '50%',
                                    transition: 'transform 0.2s',
                                    transform: preferences.general.autoBooking ? 'translateX(28px)' : 'translateX(0)'
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div className="card">
                        <h3 style={{ fontWeight: '600', marginBottom: '20px' }}>Información Personal</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div className="form-group">
                                <label className="form-label">Nombre completo</label>
                                <input type="text" className="form-input" value={userProfile.name} readOnly />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-input" value={userProfile.email} readOnly />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Teléfono</label>
                                <input type="tel" className="form-input" placeholder="+34 600 000 000" />
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <h3 style={{ fontWeight: '600', marginBottom: '20px' }}>Seguridad</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <button className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                                <Shield size={16} />
                                Cambiar contraseña
                            </button>
                            <button className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                                <CreditCard size={16} />
                                Gestionar métodos de pago
                            </button>
                            <button className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                                <Bell size={16} />
                                Configurar notificaciones
                            </button>
                            <button className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                                <Globe size={16} />
                                Idioma y región
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
