import type { HTMLAttributes } from 'react';

import styles from './Button.module.css';

export type ButtonVariant =
  | 'default'
  | 'accent'
  | 'filled'
  | 'danger';

interface Props extends HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  readonly fontSize: string;
  readonly variant: ButtonVariant;
  readonly color?: string;
  readonly fullWidth?: boolean;
  readonly disabled?: boolean;
  readonly borderRadius?: string;
  readonly download?: {
    readonly name: string;
    readonly url: string;
  };
  readonly className?: string;
  readonly children: React.ReactNode;
  readonly onClick?: () => void;
}

export const Button = ({ fontSize, variant, color, fullWidth, disabled, borderRadius, download, className, children, onClick, ...rest }: Props) => {
  if (color && variant === 'accent') {
    document.documentElement.style.setProperty('--accentButtonColor', color);
  }

  if (download) {
    return (
      <a
        {...rest}
        className={`
          ${className}
          ${styles.button}
          ${styles.linkButton}
          ${disabled ? styles.disabled : ''}
          ${styles[variant]}
        `}
        style={{
          fontSize,
          ...(color && variant === 'filled'
            ? {
              background: color,
            }
            : {}
          ),
          ...(fullWidth ? {
            width: '100%',
          } : {}),
          borderRadius: borderRadius || 'var(--borderRadius)',
        }}
        href={download.url}
        download={download.name}
        onClick={!disabled ? onClick : () => {}}
      >
        {children}
      </a>
    );
  } else {
    return (
      <button
        {...rest}
        className={`
          ${className}
          ${styles.button}
          ${disabled ? styles.disabled : ''}
          ${styles[variant]}
        `}
        style={{
          fontSize,
          ...(color && variant === 'filled'
            ? {
              background: color,
            }
            : {}
          ),
          ...(fullWidth ? {
            width: '100%',
          } : {}),
          borderRadius: borderRadius || 'var(--borderRadius)',
        }}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
};
