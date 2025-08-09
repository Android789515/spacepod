import type { HTMLAttributes, ReactNode } from 'react';

import styles from './Button.module.css';

interface Props extends HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  readonly download?: {
    readonly name: string;
    readonly url: string;
  };
  readonly customStyles?: string;
  readonly children: ReactNode;
}

export const Button = ({ download, customStyles, children, ...rest }: Props) => {
  if (download) {
    return (
      <a
        href={download.url}
        download={download.name}
        className={`
          ${styles.button}
          ${styles.linkButton}
          ${customStyles}
        `}
        {...rest}
      >
        {children}
      </a>
    );
  } else {
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
  }
};

