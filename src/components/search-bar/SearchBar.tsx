import styles from './SearchBar.module.css';

interface Props {
  readonly value: string;
  readonly onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: Props) => {
  const searchBarID = 'search-bar';

  return (
    <div>
      <label
        htmlFor={searchBarID}
        style={{
          display: 'block',
          visibility: 'hidden',
          width: 0,
          height: 0,
        }}
      >
        Podcast Search Bar
      </label>

      <input
        id={searchBarID}
        placeholder='Type to search'
        className={styles.searchBar}
        value={value}
        onChange={event => onChange(event.target.value)}
      />
    </div>
  );
};

