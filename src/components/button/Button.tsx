import type { HTMLAttributes, ReactNode } from 'react';

import styles from './Button.module.css';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  readonly customStyles?: string;
  readonly children: ReactNode;
}

export const Button = ({ customStyles, children, ...rest }: Props) => {
  return (
    <button
      className={`
        ${styles.button}
        ${customStyles}
      `}
      {...rest}
    >
      {children}
    </button>
  );
};

