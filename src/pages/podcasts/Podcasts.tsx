import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import toast from 'react-hot-toast';

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
  readonly podcasts: PodcastInfo[];
  readonly setPodcasts: Dispatch<SetStateAction<PodcastInfo[]>>;
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
                const pendingPodcasts = fetchPodcasts()

                toast.promise(pendingPodcasts, {
                  loading: 'Fetching Podcast...',
                  success: data => {
                    if (window.DOMParser) {
                      const xmlData = new DOMParser()
                        .parseFromString(data, 'text/xml');

                      const newPodcast = parsePodcastInfo(xmlData, podcastsURL);
                      const isUniquePodcast = !podcasts.find(podcast => podcast.url === newPodcast.url);

                      setPodcastsURL('');

                      if (isUniquePodcast) {
                        setPodcasts(podcasts => {
                          return [
                            ...podcasts,
                            newPodcast,
                          ];
                        });

                        return 'Podcast Loaded';
                      } else {
                        return 'Podcast Already Added';
                      }
                    } else {
                      throw new Error('No DOM Parser was found! Only browser environments are supported.');
                    }
                  },
                  error: (error) => {
                    showBoundary(error);

                    return `There was a problem fetching the podcast: ${error.toString()}`;
                  },
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

                    return updatedPodcasts;
                  });

                  setSelectMode(false);
              }}
            >
              Delete
            </Button>
          </section>

          <List
            data={podcasts}
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

