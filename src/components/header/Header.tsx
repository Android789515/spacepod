import type { Settings } from 'App';
import type { PodcastsState } from 'types/state';

import styles from './Header.module.css';

import { Title } from 'components/title';
import { SettingsMenu } from 'components/settings-menu';

interface Props {
  readonly settings: Settings;
  readonly setSettings: (updater: (prevSettings: Settings) => Settings) => void;
  readonly podcastsState: PodcastsState;
}

export const Header = ({ settings, setSettings, podcastsState }: Props) => {
  return (
    <header
      className={styles.header}
    >
      <Title />

      <SettingsMenu
        settings={settings}
        setSettings={setSettings}
        podcastsState={podcastsState}
      />
    </header>
  );
};

