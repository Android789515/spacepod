import { type Dispatch, type SetStateAction } from 'react';
import toast from 'react-hot-toast';

import { type PodcastInfo } from 'pages/podcasts';
import { fetchPodcast } from 'pages/podcasts/util/io';

import styles from './RefreshPodcastButton.module.css';

import { Button } from 'components/button';

interface Props {
  readonly podcastURL: string;
  readonly setPodcasts: Dispatch<SetStateAction<PodcastInfo[]>>;
  readonly setCurrentPodcast: Dispatch<SetStateAction<PodcastInfo | null>>;
}

export const RefreshPodcastButton = ({ podcastURL, setPodcasts, setCurrentPodcast }: Props) => {
  return (
    <Button
      customStyles={styles.refreshButton}
      onClick={() => {
        const pendingPodcast = fetchPodcast(podcastURL);

        toast.promise(pendingPodcast, {
          loading: 'Fetching New Podcast Data...',
          success: updatedPodcast => {
            setPodcasts(prevPodcasts => {
              return prevPodcasts.map(currentPodcast => {
                const isThisPodcast = currentPodcast.url === podcastURL;

                if (isThisPodcast) {
                  return updatedPodcast;
                } else {
                  return currentPodcast;
                }
              });
            });
            setCurrentPodcast(updatedPodcast);

            return 'Refreshed Podcast';
          },
          error: error => {
            return `There was a problem fetching new episodes for this podcast: ${error.toString()}`;
          },
        });
      }}
    >
      Refresh Episodes
    </Button>
  );
};
