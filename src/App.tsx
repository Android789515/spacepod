import { useEffect, useState } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { type PodcastInfo } from 'pages/podcasts/Podcasts';
import type { EpisodeInfo } from 'pages/episodes';

import styles from './App.module.css';

import { Header } from 'components/header';
import { Content } from 'components/content';
import { Error } from 'pages/error';
import { Player } from 'components/player';

export interface Settings {
  colorScheme: 'light' | 'dark';
}

export const App = () => {
  const [ settings, setSettings ] = useState<Settings>({
    colorScheme: 'light',
  });

  useEffect(() => {
    document.documentElement.style.colorScheme = settings.colorScheme;
  }, [ settings ]);

  const podcastsState = useState<Set<PodcastInfo>>(new Set());

  const currentPodcastState = useState<PodcastInfo | null>(null);
  const [ episodePlaying, setEpisodePlaying ] = useState<EpisodeInfo | null>(null);

  return (
    <div
      className={styles.app}
    >
      <Header
        settings={settings}
        setSettings={setSettings}
        podcastsState={podcastsState}
      />

      <ErrorBoundary
        FallbackComponent={Error}
      >
        <Content
          podcastsState={podcastsState}
          currentPodcastState={currentPodcastState}
          setEpisodePlaying={episode => setEpisodePlaying(episode)}
        />
      </ErrorBoundary>

      {episodePlaying && (
        <Player
          episodePlaying={episodePlaying}
        />
      )}
    </div>
  );
};

