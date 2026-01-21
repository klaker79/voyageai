'use client';

import {
    Settings,
    Bell,
    Globe,
    CreditCard,
    Shield,
    Moon,
    Smartphone,
    Mail,
    ChevronRight
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface SettingItem {
    name: string;
    value: string;
    icon: LucideIcon;
    toggle?: boolean;
}

interface SettingsSection {
    title: string;
    items: SettingItem[];
}

const settingsSections: SettingsSection[] = [
    {
        title: 'Preferencias',
        items: [
            { name: 'Idioma', value: 'Español', icon: Globe },
            { name: 'Moneda', value: 'EUR (€)', icon: CreditCard },
            { name: 'Tema', value: 'Oscuro', icon: Moon },
        ]
    },
    {
        title: 'Notificaciones',
        items: [
            { name: 'Email', value: 'Activado', icon: Mail, toggle: true },
            { name: 'Push', value: 'Activado', icon: Smartphone, toggle: true },
            { name: 'Alertas de precio', value: 'Activado', icon: Bell, toggle: true },
        ]
    },
    {
        title: 'Privacidad y Seguridad',
        items: [
            { name: 'Autenticación 2FA', value: 'Activado', icon: Shield },
            { name: 'Datos personalizados IA', value: 'Permitido', icon: Settings },
        ]
    }
];

export default function SettingsPage() {
    return (
        <>
            <div className="page-header">
                <h1 className="page-title">Configuración ⚙️</h1>
                <p className="page-subtitle">
                    Personaliza tu experiencia en VoyageAI.
                </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {settingsSections.map((section) => (
                    <div key={section.title} className="card">
                        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>
                            {section.title}
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {section.items.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={item.name}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '16px',
                                            marginLeft: '-16px',
                                            marginRight: '-16px',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            transition: 'background 0.15s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--glass-bg)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <Icon size={20} color="var(--text-muted)" />
                                            <span>{item.name}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            {item.toggle ? (
                                                <div style={{
                                                    width: '44px',
                                                    height: '24px',
                                                    background: 'var(--accent-success)',
                                                    borderRadius: '12px',
                                                    padding: '2px',
                                                    cursor: 'pointer'
                                                }}>
                                                    <div style={{
                                                        width: '20px',
                                                        height: '20px',
                                                        background: 'white',
                                                        borderRadius: '50%',
                                                        marginLeft: 'auto'
                                                    }} />
                                                </div>
                                            ) : (
                                                <>
                                                    <span style={{ color: 'var(--text-muted)' }}>{item.value}</span>
                                                    <ChevronRight size={16} color="var(--text-muted)" />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {/* Danger Zone */}
                <div className="card" style={{ borderColor: 'var(--accent-danger)' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px', color: 'var(--accent-danger)' }}>
                        Zona de Peligro
                    </h3>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button className="btn btn-secondary">
                            Exportar mis datos
                        </button>
                        <button
                            className="btn"
                            style={{
                                background: 'rgba(239, 68, 68, 0.15)',
                                color: 'var(--accent-danger)',
                                border: '1px solid var(--accent-danger)'
                            }}
                        >
                            Eliminar cuenta
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
