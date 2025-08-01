import { useState } from 'react';

import entriesStyles from 'components/entry/Entry.module.css';

import { List } from 'components/list';
import { Page } from 'components/page';
import { SearchBar } from 'components/search-bar';
import { Episode } from './components/episode';

export interface EpisodeInfo {
  readonly id: string;
  readonly title: string;
  readonly url: string;
  readonly publishDate: string;
  readonly coverArt: string;
  readonly description: string;
  readonly podcastTitle: string;
  readonly authors: string[];
}

interface Props {
  readonly episodes: EpisodeInfo[];
  readonly setEpisodePlaying: (episode: EpisodeInfo) => void;
}

export const Episodes = ({ episodes, setEpisodePlaying }: Props) => {
  const [ searchValue, setSearchValue ] = useState('');

  return (
    <Page
      title='Episodes'
      headerContent={(
        <SearchBar
          value={searchValue}
          onChange={value => setSearchValue(value)}
        />
      )}
      mainContent={(
        <List
          data={episodes}
          filter={{
            keys: [ 'title' ],
            search: searchValue,
          }}
          component={episodeInfo => {
            return (
              <Episode
                onClick={() => setEpisodePlaying(episodeInfo)}
                {...episodeInfo}
              />
            );
          }}
          customStyle={entriesStyles.entries}
        />
      )}
    />
  );
};

