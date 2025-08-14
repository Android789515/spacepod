import type { Dispatch, SetStateAction } from 'react';
import { useRouteNode } from 'react-router5';

import { Episodes, type EpisodeInfo } from 'pages/episodes';
import type { PodcastInfo } from 'pages/podcasts';

import { Podcasts } from 'pages/podcasts';
import { NotFound } from 'pages/not-found';

interface Props {
  readonly podcasts: PodcastInfo[];
  readonly setPodcasts: Dispatch<SetStateAction<PodcastInfo[]>>;
  readonly currentPodcast: PodcastInfo | null;
  readonly setCurrentPodcast: Dispatch<SetStateAction<PodcastInfo | null>>;
  readonly setEpisodePlaying: (episode: EpisodeInfo) => void;
}

export const Content = ({ podcasts, setPodcasts, currentPodcast, setCurrentPodcast, setEpisodePlaying }: Props) => {
  const { route } = useRouteNode('');
  const topRouteName = route?.name.split('.')[0]

  switch (topRouteName) {
    case 'home': {
      return (
        <Podcasts
          podcasts={podcasts}
          setPodcasts={setPodcasts}
          setCurrentPodcast={setCurrentPodcast}
        />
      );
    };

    case 'podcast': {
      return (
        <Episodes
          episodes={currentPodcast?.episodes || []}
          setEpisodePlaying={setEpisodePlaying}
        />
      );
    };

    default: {
      return (
        <NotFound />
      );
    }
  }
};

