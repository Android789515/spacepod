import { useRoute } from 'react-router5';

import defaultCoverArt from 'assets/defaultCoverArt.svg';

import { Entry } from 'components/entry';
import { Link } from 'components/link';

interface Props {
  readonly id: string;
  readonly title: string;
  readonly coverArt: string;
  readonly authors: string[];
  readonly onClick: () => void;
  readonly selectMode?: boolean;
  readonly selected?: boolean;
}

export const Podcast = ({
  title,
  coverArt,
  authors,
  onClick,
  selectMode,
  selected,
}: Props) => {
  const { router } = useRoute();

  const ItemEntry = (
    <Entry
      title={title}
      coverArt={coverArt || defaultCoverArt}
      authors={authors}
      onClick={onClick}
      selectMode={selectMode}
      selected={selected}
    />
  );

  if (selectMode) {
    return ItemEntry;
  } else {
    return (
      <Link
        router={router}
        routeName='podcast'
        isLinkableElement
        onAuxClick={event => event.preventDefault()}
      >
        {ItemEntry}
      </Link>
    );
  }
};

