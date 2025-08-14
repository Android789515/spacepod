import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';

import type { EpisodeInfo } from 'pages/episodes';
import { urlPattern, parsePodcastInfo } from './util';

import styles from './Podcasts.module.css';

import { List } from 'components/list';
import { Podcast } from './components/podcast';
import { SearchBar } from 'components/search-bar';
import { AddPodcastButton } from '../../components/add-podcast-button';
import { Page } from 'components/page';
import { Button } from 'components/button';

export interface PodcastInfo {
  readonly id: string;
  readonly url: string;
  readonly title: string;
  readonly episodes: EpisodeInfo[];
  readonly coverArt: string;
  readonly description: string;
  readonly authors: string[];
}

interface Props {
  readonly podcasts: Set<PodcastInfo>;
  readonly setPodcasts: Dispatch<SetStateAction<Set<PodcastInfo>>>;
  readonly setCurrentPodcast: Dispatch<SetStateAction<PodcastInfo | null>>;
}

export const Podcasts = ({ podcasts, setPodcasts, setCurrentPodcast }: Props) => {
  const [ podcastsURL, setPodcastsURL ] = useState('');

  const fetchPodcasts = async () => {
    const slashIndicator = ':';

    const destination = podcastsURL.split('https://')[ 1 ]
      .split('')
      .map(char => char === '/' ? slashIndicator : char)
      .join('');

    const isDev = import.meta.env.DEV;
    const hostname = isDev ? 'http://localhost:8080' : `${import.meta.env.VITE_SERVER_ADDRESS}`;

    const route = `${hostname}/podcast-${destination}`;

    const response = await fetch(route, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/xml',
      },
    });

    const xml = await response.text();

    return xml;
  };

  const [ searchValue, setSearchValue ] = useState('');

  const [ selectMode, setSelectMode ] = useState(false);
  const [ selectedPodcasts, setSelectedPodcasts ] = useState<string[]>([]);

  const { showBoundary } = useErrorBoundary();

  return (
    <Page
      title='Podcasts'
      headerContent={(
        <>
          <SearchBar
            value={searchValue}
            onChange={value => setSearchValue(value)}
          />

          <AddPodcastButton
            podcastsURL={podcastsURL}
            setPodcastsURL={value => setPodcastsURL(value)}
            onSubmit={event => {
              event.preventDefault();

              if (podcastsURL.match(urlPattern)) {
                fetchPodcasts()
                  .then(data => {
                    if (window.DOMParser) {
                      const xmlData = new DOMParser()
                        .parseFromString(data, 'text/xml');

                      setPodcasts(podcasts => {
                        return new Set([
                          ...podcasts,
                          parsePodcastInfo(xmlData, podcastsURL),
                        ]);
                      });
                    }
                  })
                  .then(() => setPodcastsURL(''))
                  .catch(error => {
                    console.error(error);

                    showBoundary(error);
                  });

                return true;
              } else {
                return false;
              }
            }}
          />
        </>
      )}
      mainContent={(
        <>
          <section
            className={styles.buttons}
          >
            <Button
              customStyles={styles.selectButton}
              onClick={() => setSelectMode(prev => !prev)}
            >
              Select
            </Button>

            <Button
              customStyles={`
                ${styles.deleteButton}
                ${selectMode && styles.deleteButtonShown}
              `}
              onClick={() => {
                  setPodcasts(prevPodcasts => {
                    const updatedPodcasts = [...prevPodcasts].filter(podcast => {
                      return !selectedPodcasts.includes(podcast.id);
                    });

                    setSelectedPodcasts([]);

                    return new Set(updatedPodcasts);
                  });

                  setSelectMode(false);
              }}
            >
              Delete
            </Button>
          </section>

          <List
            data={[ ...podcasts ]}
            filter={{
              keys: [ 'title' ],
              search: searchValue,
            }}
            component={podcastInfo => {
              const isSelected = selectedPodcasts.some(id => id === podcastInfo.id);

              return (
                <Podcast
                  selectMode={selectMode}
                  selected={isSelected}
                  onClick={() => {
                    if (selectMode) {
                      setSelectedPodcasts(prevPodcasts => {
                        if (isSelected) {
                          return prevPodcasts.filter(id => id !== podcastInfo.id);
                        } else {
                          return [...prevPodcasts, podcastInfo.id];
                        }
                      });
                    } else {
                      setCurrentPodcast(podcastInfo);
                    }
                  }}
                  {...podcastInfo}
                />
              );
            }}
            customStyle={styles.podcasts}
          />
        </>
      )}
    />
  );
};

