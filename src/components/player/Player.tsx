import type { EpisodeInfo } from 'pages/episodes';

import styles from './Player.module.css';

interface Props {
  readonly episodePlaying: EpisodeInfo;
}

export const Player = ({ episodePlaying }: Props) => {
  return (
    <aside
      className={styles.playerArea}
    >
      <div
        className={styles.player}
      >
        <div
        >
          <h3
            className={styles.contentTitle}
          >
            {episodePlaying.podcastTitle}
          </h3>

          <p
            className={styles.contentDescription}
          >
            {episodePlaying.title}
          </p>
        </div>

        <audio
          src={episodePlaying.url}
          controls
          className={styles.audio}
        />
      </div>
    </aside>
  );
};

