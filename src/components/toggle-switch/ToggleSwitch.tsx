import type { HTMLAttributes } from 'react';

import styles from './ToggleSwitch.module.css';

import { Button } from 'components/button'

interface Props extends HTMLAttributes<HTMLButtonElement> {
  readonly text?: string;
  readonly toggled: boolean;
}

export const ToggleSwitch = ({ text, toggled, ...rest }: Props) => {
  const Text = (
    <span className={styles.toggleSwitchText}>
      {text}
    </span>
  );

  return (
    <Button
      customStyles={styles.toggleSwitch}
      {...rest}
    >
      {!toggled && Text}

      <span
        className={`
          ${styles.knob}
          ${toggled && styles.knobToggled}
        `}
      />

      {toggled && Text}
    </Button>
  );
};
