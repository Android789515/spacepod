import { useRef, type HTMLAttributes } from 'react';

import closeIcon from './assets/closeIcon.svg';
import styles from './AddPodcastModal.module.css';

import { Button } from 'components/button';

interface Props extends HTMLAttributes<HTMLDialogElement> {
  readonly show: boolean;
  readonly setShow: (value: boolean) => void;
  readonly podcastsURL: string;
  readonly setPodcastsURL: (value: string) => void;
}

export const AddPodcastModal = ({ show, setShow, podcastsURL, setPodcastsURL, ...rest }: Props) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  if (show) {
    modalRef.current?.showModal();
  } else {
    modalRef.current?.close();
  }

  const inputID = 'add-podcast';

  return (
    <dialog
      className={styles.modal}
      onClose={() => setShow(false)}
      ref={modalRef}
      {...rest}
    >
      <form
        className={styles.modalContent}
      >
        <label htmlFor={inputID}>
          <h2
            className={styles.labelTitle}
          >
            RSS Feed URL
          </h2>
        </label>

        <Button
          customStyles={styles.closeButton}
          onClick={() => setShow(false)}
        >
          <img
            src={closeIcon}
            alt='Close Modal'
            className={styles.closeButtonIcon}
          />
        </Button>

        <input
          id={inputID}
          type='url'
          placeholder='https://some-podcast.org/rss'
          pattern='(https?|ftp):\/\/.*'
          className={styles.input}
          value={podcastsURL}
          onChange={event => setPodcastsURL(event.target.value)}
        />
      </form>
    </dialog>
  );
};

