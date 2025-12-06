import { useState } from 'react';
import { Button } from '@android789515/gummy-ui';

import defaultCoverArt from 'assets/defaultCoverArt.svg';
import styles from './Entry.module.css';

import type { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  readonly title: string;
  readonly coverArt: string;
  readonly authors: string[];
  readonly selectMode?: boolean;
  readonly selected?: boolean;
}

export const Entry = ({ title, coverArt, authors, selectMode, selected, ...rest }: Props) => {
  const [ isCoverArtLoaded, setIsCoverArtLoaded ] = useState(false);

  return (
    // @ts-ignore
    <Button
      fontSize='1rem'
      variant='accent'
      {...rest}
      className={`
        ${styles.entry}
        ${selectMode && styles.selectMode}
      `}
    >
      <span
        className={`
          ${styles.selectButton}
          ${selectMode && styles.selectButtonShown}
          ${selected && styles.selectButtonSelected}
        `}
      />

      <img
        src={isCoverArtLoaded && coverArt || defaultCoverArt}
        alt='Cover Art'
        className={styles.coverArt}
        onLoad={() => setIsCoverArtLoaded(true)}
      />

      <div
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
      </div>
    </Button>
  );
};

