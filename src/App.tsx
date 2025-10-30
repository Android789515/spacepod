import { useEffect, useState } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';

import { type PodcastInfo } from 'pages/podcasts/Podcasts';
import type { EpisodeInfo } from 'pages/episodes';
import { useLocalStorage } from 'hooks';

import styles from './App.module.css';

import { Header } from 'components/header';
import { Content } from 'components/content';
import { Error } from 'pages/error';
import { Player } from 'components/player';

export interface Settings {
  colorScheme: 'light' | 'dark';
}

export const App = () => {
  const [ settings, setSettings ] = useLocalStorage<Settings>({
    key: 'spacepod-settings',
    defaultValue: {
      colorScheme: 'light',
    },
  });

  useEffect(() => {
    document.documentElement.style.colorScheme = settings.colorScheme;
  }, [ settings ]);

  const [ podcasts, setPodcasts ] = useLocalStorage<PodcastInfo[]>({
    key: 'spacepod-podcasts',
    defaultValue: [],
  });

  const [ currentPodcast, setCurrentPodcast ] = useLocalStorage<PodcastInfo | null>({
    key: 'spacepod-current-podcast',
    defaultValue: null,
  });
  const [ episodePlaying, setEpisodePlaying ] = useState<EpisodeInfo | null>(null);

  return (
    <div
      className={styles.app}
    >
      <Header
        settings={settings}
        setSettings={setSettings}
        podcasts={podcasts}
        setPodcasts={setPodcasts}
      />

      <ErrorBoundary
        FallbackComponent={Error}
      >
        <Content
          podcasts={podcasts}
          setPodcasts={setPodcasts}
          currentPodcast={currentPodcast}
          setCurrentPodcast={setCurrentPodcast}
          setEpisodePlaying={episode => setEpisodePlaying(episode)}
        />
      </ErrorBoundary>

      {episodePlaying && (
        <Player
          episodePlaying={episodePlaying}
        />
      )}

      <Toaster
        toastOptions={{
          className: styles.toaster,
        }}
      />
    </div>
  );
};

