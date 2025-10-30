import type { EpisodeInfo } from 'pages/episodes';
import type { TimeStamp } from 'pages/podcasts/util';
import { toTimeStamp, timeStampToSeconds } from 'pages/podcasts/util';
import { useLocalStorage } from 'hooks/useLocalStorage';

import styles from './Player.module.css';

interface Props {
  readonly episodePlaying: EpisodeInfo;
}

interface PlayerInfo {
  readonly currentTime: TimeStamp;
  readonly duration: TimeStamp;
}

export const Player = ({ episodePlaying }: Props) => {
  const [ playerInfo, setPlayerInfo ] = useLocalStorage<PlayerInfo>({
    key: 'spacepod-player-info',
    defaultValue: {
      currentTime: toTimeStamp(0),
      duration: toTimeStamp(0),
    },
  });

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
          onLoadedMetadata={event => {
            const audioElement = event.target as HTMLAudioElement;

            setPlayerInfo(player => {
              return {
                ...player,
                duration: toTimeStamp(audioElement.duration),
              };
            });

            audioElement.currentTime = timeStampToSeconds(playerInfo.currentTime);
          }}
          onTimeUpdate={event => {
            const audioElement = event.target as HTMLAudioElement;

            setPlayerInfo(player => {
              return {
                ...player,
                currentTime: toTimeStamp(audioElement.currentTime),
              };
            });
          }}
        />
      </div>
    </aside>
  );
};

