'use client';

import { InputHTMLAttributes, SelectHTMLAttributes, forwardRef } from 'react';
import { LucideIcon } from 'lucide-react';

// ============================================
// Input Component
// ============================================

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: LucideIcon;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, icon: Icon, error, className = '', style, ...props }, ref) => {
        return (
            <div className="form-group">
                {label && <label className="form-label">{label}</label>}
                <div style={{ position: 'relative' }}>
                    {Icon && (
                        <Icon
                            size={16}
                            style={{
                                position: 'absolute',
                                left: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'var(--text-muted)'
                            }}
                        />
                    )}
                    <input
                        ref={ref}
                        className={`form-input ${error ? 'error' : ''} ${className}`}
                        style={{
                            ...(Icon && { paddingLeft: '40px' }),
                            ...style
                        }}
                        {...props}
                    />
                </div>
                {error && (
                    <span style={{ color: 'var(--accent-danger)', fontSize: '12px', marginTop: '4px' }}>
                        {error}
                    </span>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

// ============================================
// Select Component
// ============================================

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    icon?: LucideIcon;
    options: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, icon: Icon, options, className = '', style, ...props }, ref) => {
        return (
            <div className="form-group">
                {label && <label className="form-label">{label}</label>}
                <div style={{ position: 'relative' }}>
                    {Icon && (
                        <Icon
                            size={16}
                            style={{
                                position: 'absolute',
                                left: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'var(--text-muted)'
                            }}
                        />
                    )}
                    <select
                        ref={ref}
                        className={`form-input ${className}`}
                        style={{
                            ...(Icon && { paddingLeft: '40px' }),
                            cursor: 'pointer',
                            ...style
                        }}
                        {...props}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        );
    }
);

Select.displayName = 'Select';

// ============================================
// Date Input Component
// ============================================

interface DateInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: LucideIcon;
}

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
    ({ label, icon: Icon, className = '', style, ...props }, ref) => {
        return (
            <div className="form-group">
                {label && <label className="form-label">{label}</label>}
                <div style={{ position: 'relative' }}>
                    {Icon && (
                        <Icon
                            size={16}
                            style={{
                                position: 'absolute',
                                left: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'var(--text-muted)'
                            }}
                        />
                    )}
                    <input
                        ref={ref}
                        type="date"
                        className={`form-input ${className}`}
                        style={{
                            ...(Icon && { paddingLeft: '40px' }),
                            colorScheme: 'dark',
                            ...style
                        }}
                        {...props}
                    />
                </div>
            </div>
        );
    }
);

DateInput.displayName = 'DateInput';

// ============================================
// Checkbox Component
// ============================================

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export function Checkbox({ label, ...props }: CheckboxProps) {
    return (
        <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-secondary)',
            fontSize: '13px',
            cursor: 'pointer'
        }}>
            <input
                type="checkbox"
                style={{ accentColor: 'var(--accent-primary)' }}
                {...props}
            />
            {label}
        </label>
    );
}

// ============================================
// Toggle Component
// ============================================

interface ToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
}

export function Toggle({ checked, onChange, disabled = false }: ToggleProps) {
    return (
        <button
            type="button"
            onClick={() => !disabled && onChange(!checked)}
            style={{
                width: '48px',
                height: '26px',
                background: checked ? 'var(--accent-success)' : 'var(--glass-border)',
                borderRadius: '13px',
                padding: '3px',
                border: 'none',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.5 : 1,
                transition: 'background 0.2s'
            }}
        >
            <div
                style={{
                    width: '20px',
                    height: '20px',
                    background: 'white',
                    borderRadius: '50%',
                    transform: checked ? 'translateX(22px)' : 'translateX(0)',
                    transition: 'transform 0.2s'
                }}
            />
        </button>
    );
}
