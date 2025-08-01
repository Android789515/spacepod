import type { HTMLAttributes } from 'react';

import styles from './ToggleSwitch.module.css';

import { Button } from 'components/button'

interface Props extends HTMLAttributes<HTMLButtonElement> {
  readonly toggled: boolean;
}

export const ToggleSwitch = ({ toggled, ...rest }: Props) => {
  return (
    <Button
      customStyles={styles.toggleSwitch}
      {...rest}
    >
      <span
        className={`
          ${styles.knob}
          ${toggled && styles.knobToggled}
        `}
      ></span>
    </Button>
  );
};

