import { ReactNode, ButtonHTMLAttributes } from 'react';

// ============================================
// Button Component
// ============================================

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    children: ReactNode;
}

export function Button({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    className = '',
    ...props
}: ButtonProps) {
    const baseClass = 'btn';
    const variantClass = `btn-${variant}`;
    const sizeClasses = {
        sm: 'btn-sm',
        md: '',
        lg: 'btn-lg'
    };

    return (
        <button
            className={`${baseClass} ${variantClass} ${sizeClasses[size]} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <span className="spinner" />}
            {!isLoading && leftIcon}
            {children}
            {!isLoading && rightIcon}
        </button>
    );
}

// ============================================
// Card Component
// ============================================

interface CardProps {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    highlight?: boolean;
    noPadding?: boolean;
    onClick?: () => void;
}

export function Card({
    children,
    className = '',
    style: customStyle = {},
    highlight = false,
    noPadding = false,
    onClick
}: CardProps) {
    return (
        <div
            className={`card ${className}`}
            style={{
                ...(highlight && { border: '2px solid var(--accent-primary)' }),
                ...(noPadding && { padding: 0 }),
                ...(onClick && { cursor: 'pointer' }),
                ...customStyle
            }}
            onClick={onClick}
        >
            {children}
        </div>
    );
}

// ============================================
// Badge Component
// ============================================

type BadgeVariant = 'primary' | 'success' | 'warning' | 'danger' | 'ai' | 'muted';

interface BadgeProps {
    variant?: BadgeVariant;
    children: ReactNode;
    icon?: ReactNode;
}

export function Badge({ variant = 'primary', children, icon }: BadgeProps) {
    const variantStyles: Record<BadgeVariant, { bg: string; color: string }> = {
        primary: { bg: 'rgba(59, 130, 246, 0.15)', color: 'var(--accent-primary)' },
        success: { bg: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-success)' },
        warning: { bg: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-warning)' },
        danger: { bg: 'rgba(239, 68, 68, 0.15)', color: 'var(--accent-danger)' },
        ai: { bg: 'rgba(139, 92, 246, 0.15)', color: 'var(--accent-secondary)' },
        muted: { bg: 'var(--glass-bg)', color: 'var(--text-muted)' }
    };

    const style = variantStyles[variant];

    return (
        <span
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                background: style.bg,
                color: style.color,
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '600'
            }}
        >
            {icon}
            {children}
        </span>
    );
}

// ============================================
// AI Score Badge
// ============================================

interface AIScoreProps {
    score: number;
    size?: 'sm' | 'md';
}

export function AIScore({ score, size = 'md' }: AIScoreProps) {
    const getColor = () => {
        if (score >= 90) return 'var(--accent-success)';
        if (score >= 75) return 'var(--accent-warning)';
        return 'var(--accent-danger)';
    };

    const getBg = () => {
        if (score >= 90) return 'rgba(16, 185, 129, 0.15)';
        if (score >= 75) return 'rgba(245, 158, 11, 0.15)';
        return 'rgba(239, 68, 68, 0.15)';
    };

    return (
        <span
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: size === 'sm' ? '2px 8px' : '6px 12px',
                background: getBg(),
                color: getColor(),
                borderRadius: '8px',
                fontSize: size === 'sm' ? '11px' : '13px',
                fontWeight: '700'
            }}
        >
            ✨ {score}%
        </span>
    );
}

// ============================================
// Price Display
// ============================================

interface PriceProps {
    current: number;
    original?: number;
    currency?: string;
    size?: 'sm' | 'md' | 'lg';
    showDiscount?: boolean;
}

export function Price({
    current,
    original,
    currency = '€',
    size = 'md',
    showDiscount = true
}: PriceProps) {
    const discount = original ? Math.round((1 - current / original) * 100) : 0;

    const fontSizes = {
        sm: { current: '16px', original: '12px' },
        md: { current: '24px', original: '14px' },
        lg: { current: '32px', original: '18px' }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
            {showDiscount && discount > 0 && (
                <Badge variant="success">-{discount}%</Badge>
            )}
            <span style={{
                fontSize: fontSizes[size].current,
                fontWeight: '700',
                color: 'var(--accent-success)'
            }}>
                {currency}{current}
            </span>
            {original && original > current && (
                <span style={{
                    fontSize: fontSizes[size].original,
                    color: 'var(--text-muted)',
                    textDecoration: 'line-through'
                }}>
                    {currency}{original}
                </span>
            )}
        </div>
    );
}

// ============================================
// Loading Spinner
// ============================================

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    color?: string;
}

export function Spinner({ size = 'md', color = 'white' }: SpinnerProps) {
    const sizes = { sm: '14px', md: '18px', lg: '32px' };

    return (
        <div
            className="spinner"
            style={{
                width: sizes[size],
                height: sizes[size],
                borderColor: `${color}30`,
                borderTopColor: color
            }}
        />
    );
}

// ============================================
// Empty State
// ============================================

interface EmptyStateProps {
    icon: ReactNode;
    title: string;
    description?: string;
    action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
    return (
        <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: 'var(--text-secondary)'
        }}>
            <div style={{
                marginBottom: '16px',
                opacity: 0.5
            }}>
                {icon}
            </div>
            <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '8px',
                color: 'var(--text-primary)'
            }}>
                {title}
            </h3>
            {description && (
                <p style={{ marginBottom: '20px' }}>{description}</p>
            )}
            {action}
        </div>
    );
}

// ============================================
// Status Indicator
// ============================================

type StatusType = 'success' | 'warning' | 'danger' | 'info' | 'pending';

interface StatusProps {
    status: StatusType;
    label: string;
    pulse?: boolean;
}

export function Status({ status, label, pulse = false }: StatusProps) {
    const colors: Record<StatusType, string> = {
        success: 'var(--accent-success)',
        warning: 'var(--accent-warning)',
        danger: 'var(--accent-danger)',
        info: 'var(--accent-primary)',
        pending: 'var(--text-muted)'
    };

    const color = colors[status];

    return (
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            color
        }}>
            <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: color,
                ...(pulse && { animation: 'pulse 2s infinite' })
            }} />
            {label}
        </span>
    );
}

// ============================================
// Section Header
// ============================================

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    action?: ReactNode;
}

export function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '20px'
        }}>
            <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>
                    {title}
                </h3>
                {subtitle && (
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                        {subtitle}
                    </p>
                )}
            </div>
            {action}
        </div>
    );
}
