import { useRoute } from 'react-router5';

import defaultCoverArt from 'assets/defaultCoverArt.svg';

import { Entry } from 'components/entry';
import { Link } from 'components/link';

interface Props {
  readonly title: string;
  readonly coverArt: string;
  readonly authors: string[];
  readonly onClick: () => void;
}

export const Podcast = ({
  title,
  coverArt,
  authors,
  onClick,
  
}: Props) => {
  const { router } = useRoute();

  return (
    <Link
      router={router}
      routeName='podcast'
      isLinkableElement
    >
      <Entry
        title={title}
        coverArt={coverArt || defaultCoverArt}
        authors={authors}
        onClick={onClick}
      />
    </Link>
  );
};

