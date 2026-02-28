import type { FallbackProps } from 'react-error-boundary';
import { Button } from 'lib/gummy-ui';

import styles from './Error.module.css';

interface TypedFallbackProps extends FallbackProps {
  readonly error: {
    readonly toString: () => string;
  };
}

export const Error = (fallbackProps: FallbackProps) => {
  const { error, resetErrorBoundary } = fallbackProps as TypedFallbackProps;

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
