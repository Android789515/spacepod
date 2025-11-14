import type { FallbackProps } from 'react-error-boundary';

import styles from './Error.module.css';
import { Button } from 'components/button';

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
          onClick={resetErrorBoundary}
        >
          Go Back
        </Button>
      </main>
    </div>
  );
};
