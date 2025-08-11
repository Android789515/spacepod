import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useRef, useState } from 'react';

import type { Settings } from 'App';
import type { PodcastInfo } from 'pages/podcasts';

import menuIcon from './assets/menu.svg';
import downloadIcon from './assets/downloadIcon.svg';
import uploadIcon from './assets/uploadIcon.svg';
import styles from './SettingsMenu.module.css';

import { Button } from 'components/button';
import { Setting } from './components/setting';
import { ToggleSwitch } from 'components/toggle-switch/ToggleSwitch';

interface Props {
  readonly settings: Settings;
  readonly setSettings: (updater: (prevSettings: Settings) => Settings) => void;
  readonly podcasts: Set<PodcastInfo>;
  readonly setPodcasts: Dispatch<SetStateAction<Set<PodcastInfo>>>;
}

export const SettingsMenu = ({ settings, setSettings, podcasts, setPodcasts }: Props) => {
  const [ menuOpen, setMenuOpen ] = useState(false);

  const menuRef = useRef<HTMLUListElement | null>(null);

  const closeMenu = (event: MouseEvent) => {
    const elementClicked = event.target as HTMLElement;

    if (menuRef.current) {
      if (!menuRef.current.contains(elementClicked)) {
        setMenuOpen(false);
      }
    }
  };

  useEffect(() => {
    document.body.addEventListener('mousedown', closeMenu);

    return () => {
      document.body.removeEventListener('mousedown', closeMenu);
    };
  }, []);

  const serializedPodcasts = window.URL.createObjectURL(
    new Blob([JSON.stringify([...podcasts])], {
      type: 'application/json',
    })
  );

  const uploadRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <Button
        onClick={() => setMenuOpen(prev => !prev)}
      >
        <img
          src={menuIcon}
          alt='Settings Menu'
          className={styles.settingsMenuIcon}
        />
      </Button>

      <ul
        className={`
          ${styles.menu}
          ${menuOpen && styles.menuOpen}
        `}
        ref={menuRef}
      >
        <Setting
          label='Color Scheme'
        >
          <div
            className={styles.colorSchemeValue}
          >
            <span>
              {settings.colorScheme}
            </span>

            <ToggleSwitch
              toggled={settings.colorScheme === 'dark'}
              onClick={() => {
                setSettings(prevSettings => {
                  const colorScheme = prevSettings.colorScheme === 'light'
                    ? 'dark'
                    : 'light';

                  return {
                    ...prevSettings,
                    colorScheme,
                  } as Settings;
                });
              }}
            />
          </div>
        </Setting>

        <Setting
          label={`Save/Load Podcasts`}
        >
          <div
            className={styles.saveLoadPodcasts}
          >
            <Button
              customStyles={styles.saveButton}
              download={{
                name: 'Podcasts',
                url: serializedPodcasts,
              }}
            >
              <img
                src={downloadIcon}
                alt='Save'
                className={styles.saveLoadButtonIcon}
              />

              Save
            </Button>

            <Button
              customStyles={styles.loadButton}
              onClick={() => {
                uploadRef.current?.click();
              }}
            >
              <img
                src={uploadIcon}
                alt='Load'
                className={styles.saveLoadButtonIcon}
              />
              <input
                type='file'
                style={{
                  display: 'none',
                }}
                onChange={event => {
                  if (event.target.files) {
                    const file = event.target.files[0];

                    file.text()
                      .then(content => {
                        setPodcasts(JSON.parse(content));
                      });
                  }
                }}
                ref={uploadRef}
              />

              Load
            </Button>
          </div>
        </Setting>
      </ul>
    </>
  );
};

