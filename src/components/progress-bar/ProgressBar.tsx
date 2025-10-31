import styles from './ProgressBar.module.css';

interface Props {
  progressPercent: number;
}

export const ProgressBar = ({ progressPercent }: Props) => {
  return (
    <div
      className={styles.barBackground}
    >
      <div
        className={styles.barProgress}
        style={{
          width: `${progressPercent}%`,
        }}
      />
    </div>
  );
};
