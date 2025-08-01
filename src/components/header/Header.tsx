import type { Settings } from 'App';

import styles from './Header.module.css';

import { Title } from 'components/title';
import { SettingsMenu } from 'components/settings-menu';

interface Props {
  readonly settings: Settings;
  readonly setSettings: (updater: (prevSettings: Settings) => Settings) => void;
}

export const Header = ({ settings, setSettings }: Props) => {
  return (
    <header
      className={styles.header}
    >
      <Title />

      <SettingsMenu
        settings={settings}
        setSettings={setSettings}
      />
    </header>
  );
};

