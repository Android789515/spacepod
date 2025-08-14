import defaultCoverArt from 'assets/defaultCoverArt.svg';
import styles from './Entry.module.css';

import { Button } from 'components/button';
import type { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  readonly title: string;
  readonly coverArt: string;
  readonly authors: string[];
  readonly selectMode?: boolean;
  readonly selected?: boolean;
}

export const Entry = ({ title, coverArt, authors, selectMode, selected, ...rest }: Props) => {
  return (
    <Button
      {...rest}
      customStyles={`
        ${styles.entry}
        ${selectMode && styles.selectMode}
      `}
    >
      <Button
        className={`
          ${styles.selectButton}
          ${selectMode && styles.selectButtonShown}
          ${selected && styles.selectButtonSelected}
        `}
        children={null}
      />

      <img
        src={coverArt || defaultCoverArt}
        alt='Cover Art'
        className={styles.coverArt}
      />

      <aside
        className={styles.info}
      >
        <h4
          className={styles.title}
        >
          {title}
        </h4>

        <p
          className={styles.authors}
        >
          {authors.join(', ')}
        </p>
      </aside>
    </Button>
  );
};

