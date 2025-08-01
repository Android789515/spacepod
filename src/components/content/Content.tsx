import { useRouteNode } from 'react-router5';

import type { CurrentPodcastState, PodcastsState } from 'types/state';

import { Podcasts } from 'pages/podcasts';
import { Episodes, type EpisodeInfo } from 'pages/episodes';

interface Props {
  readonly podcastsState: PodcastsState;
  readonly currentPodcastState: CurrentPodcastState;
  readonly setEpisodePlaying: (episode: EpisodeInfo) => void;
}

export const Content = ({ podcastsState, currentPodcastState, setEpisodePlaying }: Props) => {
  const [ currentPodcast ] = currentPodcastState;

  const { route } = useRouteNode('');
  const topRouteName = route.name.split('.')[0]

  switch (topRouteName) {
    case 'home': {
      return (
        <Podcasts
          podcastsState={podcastsState}
          currentPodcastState={currentPodcastState}
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
  }
};

