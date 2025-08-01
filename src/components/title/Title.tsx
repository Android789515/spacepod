import { useRoute } from 'react-router5';

import styles from './Title.module.css';

import { Link } from 'components/link';

export const Title = () => {
  const { router } = useRoute();

  return (
    <Link
      router={router}
      routeName='home'
      isLinkableElement
    >
      <h1
        className={styles.title}
      >
        Space Pod
      </h1>
    </Link>
  );
};

