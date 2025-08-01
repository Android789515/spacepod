import type { ReactNode } from 'react';

import styles from './Page.module.css';

interface Props {
  readonly title: string;
  readonly headerContent: ReactNode;
  readonly mainContent: ReactNode;
}

export const Page = ({ title, headerContent, mainContent }: Props) => {
  return (
    <main
      className={styles.page}
    >
      <header
        className={styles.pageHeaderLayout}
      >
        <h2
          className={styles.pageTitle}
        >
          {title}
        </h2>

        {headerContent}
      </header>

      {mainContent}
    </main>
  );
};

