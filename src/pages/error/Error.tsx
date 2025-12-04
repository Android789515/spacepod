import type { FallbackProps } from 'react-error-boundary';
import { Button } from '@android789515/gummy-ui';

import styles from './Error.module.css';

export const Error = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div
      className={styles.page}
    >
      <main
        className={styles.layout}
      >
        <h1
          className={styles.title}
        >
          Something went wrong!
        </h1>

        <p
          className={styles.error}
        >
          {error.toString()}
        </p>

        <Button
          className={styles.button}
          fontSize='var(--errorBoundaryButtonFontSize)'
          variant='filled'
          color='var(--accentColor)'
          borderRadius='var(--borderRadius)'
          onClick={resetErrorBoundary}
        >
          Go Back
        </Button>
      </main>
    </div>
  );
};
