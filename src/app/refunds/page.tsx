'use client';

import { useState } from 'react';
import {
    RefreshCw,
    Clock,
    CheckCircle,
    AlertCircle,
    DollarSign,
    Plane,
    Hotel,
    MessageSquare,
    FileText,
    TrendingUp,
    Sparkles,
    ChevronRight,
    Calendar
} from 'lucide-react';

const mockRefunds = [
    {
        id: 1,
        type: 'flight',
        title: 'Retraso vuelo IB3456',
        route: 'Madrid → París',
        date: '15 Dic 2025',
        delay: '4h 30min',
        status: 'approved',
        amount: 400,
        regulation: 'EU261/2004',
        timeline: [
            { date: '16 Dic', action: 'Reclamación iniciada automáticamente', status: 'done' },
            { date: '20 Dic', action: 'Documentación enviada a Iberia', status: 'done' },
            { date: '05 Ene', action: 'Respuesta de aerolínea', status: 'done' },
            { date: '10 Ene', action: 'Compensación aprobada', status: 'done' },
            { date: '15 Ene', action: 'Transferencia bancaria', status: 'done' }
        ]
    },
    {
        id: 2,
        type: 'flight',
        title: 'Cancelación vuelo VY1234',
        route: 'Barcelona → Berlín',
        date: '22 Dic 2025',
        delay: 'Cancelado',
        status: 'negotiating',
        amount: 250,
        regulation: 'EU261/2004',
        probability: 85,
        timeline: [
            { date: '23 Dic', action: 'Reclamación iniciada automáticamente', status: 'done' },
            { date: '28 Dic', action: 'Documentación enviada a Vueling', status: 'done' },
            { date: '10 Ene', action: 'Negociando con aerolínea...', status: 'current' }
        ]
    },
    {
        id: 3,
        type: 'hotel',
        title: 'Overbooking Hotel Marriott',
        route: 'Lisboa',
        date: '05 Ene 2026',
        delay: 'Sin habitación',
        status: 'pending',
        amount: 180,
        regulation: 'Contrato reserva',
        timeline: [
            { date: '06 Ene', action: 'Incidente reportado', status: 'done' },
            { date: 'Pendiente', action: 'Enviando documentación...', status: 'current' }
        ]
    }
];

const stats = {
    totalRecovered: 2450,
    pendingAmount: 430,
    successRate: 94,
    avgTime: '18 días'
};

export default function RefundsPage() {
    const [expandedClaim, setExpandedClaim] = useState<number | null>(1);

    return (
        <>
            <div className="page-header">
                <h1 className="page-title">Reembolsos Automáticos 💸</h1>
                <p className="page-subtitle">
                    La IA gestiona tus reclamaciones por retrasos, cancelaciones y overbookings.
                </p>
            </div>

            {/* Stats */}
            <div className="stats-grid" style={{ marginBottom: '24px' }}>
                <div className="stat-card">
                    <div className="stat-icon green">
                        <DollarSign size={24} />
                    </div>
                    <div className="stat-value">€{stats.totalRecovered}</div>
                    <div className="stat-label">Total Recuperado</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon orange">
                        <Clock size={24} />
                    </div>
                    <div className="stat-value">€{stats.pendingAmount}</div>
                    <div className="stat-label">Pendiente de Cobro</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon blue">
                        <TrendingUp size={24} />
                    </div>
                    <div className="stat-value">{stats.successRate}%</div>
                    <div className="stat-label">Tasa de Éxito</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon purple">
                        <Calendar size={24} />
                    </div>
                    <div className="stat-value">{stats.avgTime}</div>
                    <div className="stat-label">Tiempo Medio</div>
                </div>
            </div>

            {/* AI Monitoring */}
            <div className="ai-insight-card" style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className="ai-insight-icon" style={{ width: '32px', height: '32px' }}>
                            <Sparkles size={16} color="white" />
                        </div>
                        <div>
                            <div className="ai-insight-title">Monitorización Activa</div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                                La IA está monitoreando todos tus vuelos en busca de retrasos o cancelaciones
                            </div>
                        </div>
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        background: 'rgba(16, 185, 129, 0.15)',
                        borderRadius: '8px'
                    }}>
                        <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: 'var(--accent-success)',
                            animation: 'pulse 2s infinite'
                        }} />
                        <span style={{ color: 'var(--accent-success)', fontWeight: '500', fontSize: '13px' }}>
                            Activo
                        </span>
                    </div>
                </div>
            </div>

            {/* Claims List */}
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Mis Reclamaciones</h3>
                    <button className="btn btn-secondary">
                        <FileText size={14} />
                        Nueva reclamación manual
                    </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {mockRefunds.map((claim) => (
                        <div
                            key={claim.id}
                            style={{
                                background: 'var(--bg-secondary)',
                                border: claim.status === 'approved' ? '1px solid var(--accent-success)' : '1px solid var(--glass-border)',
                                borderRadius: '16px',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Main Row */}
                            <div
                                style={{
                                    padding: '20px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    cursor: 'pointer'
                                }}
                                onClick={() => setExpandedClaim(expandedClaim === claim.id ? null : claim.id)}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '12px',
                                        background: claim.type === 'flight' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(139, 92, 246, 0.15)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        {claim.type === 'flight' ? (
                                            <Plane size={24} color="var(--accent-primary)" />
                                        ) : (
                                            <Hotel size={24} color="var(--accent-secondary)" />
                                        )}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '600', marginBottom: '2px' }}>{claim.title}</div>
                                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                            {claim.route} · {claim.date} · {claim.delay}
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                                    {/* Status */}
                                    {claim.status === 'approved' && (
                                        <span style={{
                                            display: 'flex', alignItems: 'center', gap: '6px',
                                            padding: '6px 12px',
                                            background: 'rgba(16, 185, 129, 0.15)',
                                            color: 'var(--accent-success)',
                                            borderRadius: '8px',
                                            fontWeight: '500',
                                            fontSize: '13px'
                                        }}>
                                            <CheckCircle size={14} />
                                            Cobrado
                                        </span>
                                    )}
                                    {claim.status === 'negotiating' && (
                                        <span style={{
                                            display: 'flex', alignItems: 'center', gap: '6px',
                                            padding: '6px 12px',
                                            background: 'rgba(245, 158, 11, 0.15)',
                                            color: 'var(--accent-warning)',
                                            borderRadius: '8px',
                                            fontWeight: '500',
                                            fontSize: '13px'
                                        }}>
                                            <MessageSquare size={14} />
                                            Negociando
                                        </span>
                                    )}
                                    {claim.status === 'pending' && (
                                        <span style={{
                                            display: 'flex', alignItems: 'center', gap: '6px',
                                            padding: '6px 12px',
                                            background: 'var(--glass-bg)',
                                            color: 'var(--text-secondary)',
                                            borderRadius: '8px',
                                            fontWeight: '500',
                                            fontSize: '13px'
                                        }}>
                                            <Clock size={14} />
                                            Pendiente
                                        </span>
                                    )}

                                    {/* Amount */}
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{
                                            fontSize: '24px',
                                            fontWeight: '700',
                                            color: claim.status === 'approved' ? 'var(--accent-success)' : 'var(--text-primary)'
                                        }}>
                                            €{claim.amount}
                                        </div>
                                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{claim.regulation}</div>
                                    </div>

                                    <ChevronRight
                                        size={20}
                                        style={{
                                            color: 'var(--text-muted)',
                                            transform: expandedClaim === claim.id ? 'rotate(90deg)' : 'rotate(0)',
                                            transition: 'transform 0.2s'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Expanded Timeline */}
                            {expandedClaim === claim.id && (
                                <div style={{
                                    padding: '20px',
                                    paddingTop: '0',
                                    borderTop: '1px solid var(--glass-border)'
                                }}>
                                    <div style={{ paddingTop: '20px' }}>
                                        <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>
                                            Historial de la reclamación
                                        </div>
                                        <div style={{ position: 'relative', paddingLeft: '24px' }}>
                                            {claim.timeline.map((step, index) => (
                                                <div
                                                    key={index}
                                                    style={{
                                                        position: 'relative',
                                                        paddingBottom: index < claim.timeline.length - 1 ? '20px' : 0
                                                    }}
                                                >
                                                    {/* Line */}
                                                    {index < claim.timeline.length - 1 && (
                                                        <div style={{
                                                            position: 'absolute',
                                                            left: '-16px',
                                                            top: '20px',
                                                            bottom: '0',
                                                            width: '2px',
                                                            background: step.status === 'done' ? 'var(--accent-success)' : 'var(--glass-border)'
                                                        }} />
                                                    )}

                                                    {/* Dot */}
                                                    <div style={{
                                                        position: 'absolute',
                                                        left: '-20px',
                                                        top: '4px',
                                                        width: '10px',
                                                        height: '10px',
                                                        borderRadius: '50%',
                                                        background: step.status === 'done'
                                                            ? 'var(--accent-success)'
                                                            : step.status === 'current'
                                                                ? 'var(--accent-warning)'
                                                                : 'var(--glass-border)'
                                                    }} />

                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <div>
                                                            <div style={{
                                                                fontSize: '13px',
                                                                color: step.status === 'current' ? 'var(--accent-warning)' : 'var(--text-primary)'
                                                            }}>
                                                                {step.action}
                                                            </div>
                                                        </div>
                                                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                                                            {step.date}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {claim.probability && (
                                            <div style={{
                                                marginTop: '20px',
                                                padding: '12px 16px',
                                                background: 'rgba(16, 185, 129, 0.1)',
                                                borderRadius: '8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px'
                                            }}>
                                                <Sparkles size={16} color="var(--accent-success)" />
                                                <span style={{ fontSize: '13px', color: 'var(--accent-success)' }}>
                                                    {claim.probability}% probabilidad de éxito según análisis IA
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
