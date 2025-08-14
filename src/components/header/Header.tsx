import type { Dispatch, SetStateAction } from 'react';

import type { Settings } from 'App';
import type { PodcastInfo } from 'pages/podcasts';

import styles from './Header.module.css';

import { Title } from 'components/title';
import { SettingsMenu } from 'components/settings-menu';

interface Props {
  readonly settings: Settings;
  readonly setSettings: (updater: (prevSettings: Settings) => Settings) => void;
  readonly podcasts: PodcastInfo[];
  readonly setPodcasts: Dispatch<SetStateAction<PodcastInfo[]>>;
}

export const Header = ({ settings, setSettings, podcasts, setPodcasts }: Props) => {
  return (
    <header
      className={styles.header}
    >
      <Title />

      <SettingsMenu
        settings={settings}
        setSettings={setSettings}
        podcasts={podcasts}
        setPodcasts={setPodcasts}
      />
    </header>
  );
};

