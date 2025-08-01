import type { Dispatch, SetStateAction } from 'react';

import type { PodcastInfo } from 'pages/podcasts/Podcasts';

export type PodcastsState = [
  Set<PodcastInfo>,
  Dispatch<SetStateAction<Set<PodcastInfo>>>,
];

export type CurrentPodcastState = [
  PodcastInfo | null,
  Dispatch<SetStateAction<PodcastInfo | null>>,
];


