import { useRef, type HTMLAttributes } from 'react';

import styles from './AddPodcastModal.module.css';

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
          <h2>
            Enter URL
          </h2>
        </label>

        <input
          id={inputID}
          value={podcastsURL}
          onChange={event => setPodcastsURL(event.target.value)}
        />
      </form>
    </dialog>
  );
};

