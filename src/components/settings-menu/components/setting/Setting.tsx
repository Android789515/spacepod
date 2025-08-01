import type { ReactNode } from 'react';

import styles from './Setting.module.css';

interface Props {
  readonly label: string;
  readonly children: ReactNode;
}

export const Setting = ({ label, children }: Props) => {
  return (
    <li
      className={styles.layout}
    >
      <label
        className={styles.label}
      >
        {label}
      </label>

      {children}
    </li>
  );
};

