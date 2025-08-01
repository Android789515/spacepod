import { useState, type FormEvent } from 'react';

import addIcon from './assets/addIcon.svg';
import styles from './AddPodcastButton.module.css';

import { Button } from 'components/button';
import { AddPodcastModal } from './components/add-podcast-modal';

interface Props {
  readonly podcastsURL: string;
  readonly setPodcastsURL: (value: string) => void;
  readonly onSubmit: (event: FormEvent) => void;
}

export const AddPodcastButton = ({ podcastsURL, setPodcastsURL, onSubmit }: Props) => {
  const [ modalShown, setModalShown ] = useState(false);

  return (
    <>
      <Button
        customStyles={styles.button}
        onClick={() => setModalShown(prev => !prev)}
      >
        <img
          src={addIcon}
          alt='Add Podcast'
          className={styles.icon}
        />
      </Button>

      <AddPodcastModal
        show={modalShown}
        setShow={value => setModalShown(value)}
        podcastsURL={podcastsURL}
        setPodcastsURL={setPodcastsURL}
        onSubmit={event => {
          setModalShown(false);

          onSubmit(event);
        }}
      />
    </>
  );
};

