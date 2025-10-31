import type { EpisodeInfo } from 'pages/episodes';
import type { TimeStamp } from 'pages/podcasts/util';
import { timeStampToSeconds, toTimeStamp } from 'pages/podcasts/util';

import defaultCoverArt from 'assets/defaultCoverArt.svg';
import playIcon from './assets/play.svg';
import pauseIcon from './assets/pause.svg';
import styles from './MediaControls.module.css';

import { Button } from 'components/button';
import { BarSlider } from 'components/bar-slider';

interface Props {
  readonly episodeInfo: EpisodeInfo;
  readonly duration: TimeStamp;
  readonly currentTime: TimeStamp;
  readonly setCurrentTime: (timeStamp: TimeStamp) => void;
  readonly playback: 'paused' | 'playing';
  readonly setPlayback: (playback: 'paused' | 'playing') => void;
}

export const MediaControls = ({ episodeInfo, duration, currentTime, setCurrentTime, playback, setPlayback }: Props) => {
  return (
    <section
      className={styles.controlsArea}
    >
      <div
        className={styles.controlsPanel}
      >
        <Button
          customStyles={styles.playbackButton}
          onClick={() => {
            if (playback === 'paused') {
              setPlayback('playing');
            } else {
              setPlayback('paused');
            }
          }}
        >
          <img
            src={playback === 'paused' ? playIcon : pauseIcon}
            alt='Play/Pause'
            className={styles.playbackIcon}
          />
        </Button>

        <img
          src={episodeInfo.coverArt || defaultCoverArt}
          alt='Cover Art'
          className={styles.coverArt}
        />

        <h3
          className={styles.title}
        >
          {episodeInfo.title}
        </h3>

        <BarSlider
          fullValue={timeStampToSeconds(duration)}
          currentValue={timeStampToSeconds(currentTime)}
          onValueUpdate={value => {
            setCurrentTime(toTimeStamp(value));
          }}
        />
      </div>
    </section>
  );
};
