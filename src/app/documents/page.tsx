'use client';

import { useState } from 'react';
import {
    FileText,
    Shield,
    Passport,
    CheckCircle,
    Clock,
    AlertTriangle,
    Upload,
    Eye,
    Download,
    Sparkles,
    Globe,
    CreditCard,
    Heart,
    Plane,
    ChevronRight
} from 'lucide-react';

const mockDocuments = {
    passports: [
        {
            id: 1,
            name: 'Iker Fernández',
            number: 'AAB123456',
            country: '🇪🇸 España',
            expiry: '15 Mar 2030',
            status: 'valid',
            image: null
        }
    ],
    visas: [
        {
            id: 1,
            country: '🇯🇵 Japón',
            type: 'Turista (90 días)',
            status: 'not_required',
            note: 'No requiere visa para estancias menores a 90 días'
        },
        {
            id: 2,
            country: '🇺🇸 Estados Unidos',
            type: 'ESTA',
            status: 'pending',
            note: 'Solicitud en proceso · 48h restantes',
            applicationDate: '19 Ene 2026'
        },
        {
            id: 3,
            country: '🇦🇺 Australia',
            type: 'eVisitor',
            status: 'approved',
            note: 'Aprobado hasta 15 Mar 2027',
            approvalDate: '10 Ene 2026'
        }
    ],
    insurances: [
        {
            id: 1,
            provider: 'IATI Seguros',
            type: 'Estrella',
            coverage: '€500,000',
            validFrom: '15 Feb 2026',
            validTo: '28 Feb 2026',
            status: 'active',
            includes: ['Médico', 'Cancelación', 'Equipaje', 'Repatriación']
        }
    ]
};

const upcomingTrips = [
    { destination: '🇯🇵 Tokio', date: '15-28 Feb 2026', requirements: ['Pasaporte válido', 'Seguro médico'] },
    { destination: '🇺🇸 Nueva York', date: '10-20 Mar 2026', requirements: ['ESTA aprobado', 'Pasaporte válido', 'Seguro médico'] }
];

export default function DocumentsPage() {
    const [activeTab, setActiveTab] = useState<'visas' | 'insurance' | 'passport'>('visas');

    return (
        <>
            <div className="page-header">
                <h1 className="page-title">Visas y Seguros 📄</h1>
                <p className="page-subtitle">
                    Gestión automatizada de documentos de viaje, visados y seguros con IA.
                </p>
            </div>

            {/* AI Requirements Check */}
            <div className="ai-insight-card" style={{ marginBottom: '24px' }}>
                <div className="ai-insight-header">
                    <div className="ai-insight-icon" style={{ width: '32px', height: '32px' }}>
                        <Sparkles size={16} color="white" />
                    </div>
                    <div>
                        <div className="ai-insight-title">Verificación Automática de Requisitos</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                            La IA analiza los requisitos de entrada para tus próximos destinos
                        </div>
                    </div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '16px',
                    marginTop: '16px'
                }}>
                    {upcomingTrips.map((trip, index) => (
                        <div
                            key={index}
                            style={{
                                background: 'var(--bg-card)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '12px',
                                padding: '16px'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                <div>
                                    <div style={{ fontWeight: '600' }}>{trip.destination}</div>
                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{trip.date}</div>
                                </div>
                                <CheckCircle size={20} color="var(--accent-success)" />
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                {trip.requirements.map((req, i) => (
                                    <span
                                        key={i}
                                        style={{
                                            fontSize: '11px',
                                            padding: '4px 8px',
                                            background: 'rgba(16, 185, 129, 0.15)',
                                            color: 'var(--accent-success)',
                                            borderRadius: '4px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                        }}
                                    >
                                        <CheckCircle size={10} />
                                        {req}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                <button
                    className={`btn ${activeTab === 'visas' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setActiveTab('visas')}
                >
                    <Globe size={16} />
                    Visados
                </button>
                <button
                    className={`btn ${activeTab === 'insurance' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setActiveTab('insurance')}
                >
                    <Shield size={16} />
                    Seguros
                </button>
                <button
                    className={`btn ${activeTab === 'passport' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setActiveTab('passport')}
                >
                    <Passport size={16} />
                    Pasaportes
                </button>
            </div>

            {/* Visas Tab */}
            {activeTab === 'visas' && (
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Estado de Visados</h3>
                        <button className="btn btn-primary" style={{ padding: '8px 16px' }}>
                            <Sparkles size={14} />
                            Verificar nuevo destino
                        </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {mockDocuments.visas.map((visa) => (
                            <div
                                key={visa.id}
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
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ fontSize: '32px' }}>{visa.country.split(' ')[0]}</div>
                                    <div>
                                        <div style={{ fontWeight: '600', marginBottom: '2px' }}>
                                            {visa.country.slice(2)}
                                        </div>
                                        <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{visa.type}</div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ textAlign: 'right' }}>
                                        {visa.status === 'approved' && (
                                            <span style={{
                                                display: 'flex', alignItems: 'center', gap: '6px',
                                                color: 'var(--accent-success)', fontWeight: '500'
                                            }}>
                                                <CheckCircle size={16} />
                                                Aprobado
                                            </span>
                                        )}
                                        {visa.status === 'pending' && (
                                            <span style={{
                                                display: 'flex', alignItems: 'center', gap: '6px',
                                                color: 'var(--accent-warning)', fontWeight: '500'
                                            }}>
                                                <Clock size={16} />
                                                En proceso
                                            </span>
                                        )}
                                        {visa.status === 'not_required' && (
                                            <span style={{
                                                display: 'flex', alignItems: 'center', gap: '6px',
                                                color: 'var(--text-secondary)', fontWeight: '500'
                                            }}>
                                                <CheckCircle size={16} />
                                                No requerido
                                            </span>
                                        )}
                                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                                            {visa.note}
                                        </div>
                                    </div>
                                    <ChevronRight size={20} color="var(--text-muted)" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Insurance Tab */}
            {activeTab === 'insurance' && (
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Mis Seguros</h3>
                        <button className="btn btn-primary" style={{ padding: '8px 16px' }}>
                            <Sparkles size={14} />
                            Comparar seguros
                        </button>
                    </div>

                    {mockDocuments.insurances.map((insurance) => (
                        <div
                            key={insurance.id}
                            style={{
                                background: 'var(--bg-secondary)',
                                border: '2px solid var(--accent-success)',
                                borderRadius: '16px',
                                padding: '24px'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                <div>
                                    <div style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        padding: '4px 10px',
                                        background: 'rgba(16, 185, 129, 0.15)',
                                        color: 'var(--accent-success)',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        marginBottom: '8px'
                                    }}>
                                        <CheckCircle size={12} />
                                        ACTIVO
                                    </div>
                                    <h4 style={{ fontSize: '20px', fontWeight: '600' }}>{insurance.provider}</h4>
                                    <div style={{ color: 'var(--text-secondary)' }}>Plan {insurance.type}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--accent-primary)' }}>
                                        {insurance.coverage}
                                    </div>
                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>cobertura máxima</div>
                                </div>
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(4, 1fr)',
                                gap: '12px',
                                marginBottom: '16px'
                            }}>
                                {insurance.includes.map((item, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            fontSize: '13px',
                                            color: 'var(--text-secondary)'
                                        }}
                                    >
                                        <CheckCircle size={14} color="var(--accent-success)" />
                                        {item}
                                    </div>
                                ))}
                            </div>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingTop: '16px',
                                borderTop: '1px solid var(--glass-border)'
                            }}>
                                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                                    Válido: {insurance.validFrom} → {insurance.validTo}
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button className="btn btn-secondary" style={{ padding: '8px 16px' }}>
                                        <Download size={14} />
                                        Descargar póliza
                                    </button>
                                    <button className="btn btn-secondary" style={{ padding: '8px 16px' }}>
                                        <AlertTriangle size={14} />
                                        Reportar incidente
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Passport Tab */}
            {activeTab === 'passport' && (
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Mis Pasaportes</h3>
                        <button className="btn btn-secondary">
                            <Upload size={14} />
                            Añadir pasaporte
                        </button>
                    </div>

                    {mockDocuments.passports.map((passport) => (
                        <div
                            key={passport.id}
                            style={{
                                background: 'var(--bg-secondary)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '16px',
                                padding: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '24px'
                            }}
                        >
                            <div style={{
                                width: '80px',
                                height: '100px',
                                background: 'var(--gradient-primary)',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Passport size={32} color="white" />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: '600', fontSize: '18px', marginBottom: '4px' }}>
                                    {passport.name}
                                </div>
                                <div style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>
                                    {passport.country} · {passport.number}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <span style={{
                                        display: 'flex', alignItems: 'center', gap: '6px',
                                        padding: '4px 10px',
                                        background: 'rgba(16, 185, 129, 0.15)',
                                        color: 'var(--accent-success)',
                                        borderRadius: '6px',
                                        fontSize: '12px'
                                    }}>
                                        <CheckCircle size={12} />
                                        Válido
                                    </span>
                                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                                        Expira: {passport.expiry}
                                    </span>
                                </div>
                            </div>
                            <button className="btn btn-secondary">
                                <Eye size={14} />
                                Ver detalles
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
