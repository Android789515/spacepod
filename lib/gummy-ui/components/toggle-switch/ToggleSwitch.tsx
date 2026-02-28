import type { HTMLAttributes } from 'react';

import styles from './ToggleSwitch.module.css';

export interface ToggleSwitchProps extends HTMLAttributes<HTMLButtonElement> {
  readonly fontSize: string;
  readonly text?: string;
  readonly toggled: boolean;
  readonly width: string;
  readonly knobColors: {
    readonly off: string;
    readonly on: string;
  };
  readonly background?: string;
  readonly borderRadius?: string;
}

export const ToggleSwitch = ({ fontSize, text, toggled, width, knobColors, background, borderRadius, ...rest }: ToggleSwitchProps) => {
  const Text = (
    <span
      className={styles.toggleSwitchText}
      role='note'
    >
      {text}
    </span>
  );

  return (
    <button
      {...rest}
      className={`
        ${styles.toggleSwitch}
        ${rest.className}
      `}
      style={{
        fontSize,
        width,
        background,
        borderRadius: borderRadius || 'var(--borderRadius)',
      }}
    >
      {toggled && Text}

      <span
        className={`
          ${styles.knob}
          ${toggled && styles.knobToggled}
        `}
        style={{
          background: toggled ? knobColors.on : knobColors.off,
          borderRadius: borderRadius || 'var(--borderRadius)',
          marginLeft: toggled ? `calc((100% - .8em) - 6px)` : undefined,
        }}
        role='switch'
      />

      {!toggled && Text}
    </button>
  );
};

