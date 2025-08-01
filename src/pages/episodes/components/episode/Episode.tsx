import { Entry } from 'components/entry';

interface Props {
  readonly title: string;
  readonly coverArt: string;
  readonly authors: string[];
  readonly onClick: () => void;
}

export const Episode = ({ title, coverArt, authors, onClick }: Props) => {
  return (
    <Entry
      title={title}
      coverArt={coverArt}
      authors={authors}
      onDoubleClick={onClick}
    />
  );
};

