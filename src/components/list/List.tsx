import type { ReactNode } from 'react';
import Fuse from 'fuse.js'; 

import type { UniqueItem } from './components/keyed-item';

import styles from './List.module.css';

import { KeyedItem } from './components/keyed-item';

interface Props<DataType extends UniqueItem> {
  readonly data: DataType[];
  readonly filter?: {
    readonly keys: string[];
    readonly search: string;
  };
  readonly component: (props: DataType) => ReactNode;
  readonly customStyle?: string;
}

export const List = <DataType extends UniqueItem,>({ data, filter, component, customStyle }: Props<DataType>) => {
  const fuse = filter
    ? new Fuse(data, {
      keys: filter.keys,
    })
    : null;

  const items = filter?.search
    ? fuse!.search(filter.search).map(result => result.item)
    : data;

  return (
    <ul
      className={`
        ${styles.list}
        ${customStyle}
      `}
    >
      {items.map(KeyedItem(component))}
    </ul>
  );
};

