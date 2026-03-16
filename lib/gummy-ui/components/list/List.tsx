import type { ReactNode } from 'react';

import styles from './List.module.css';

interface ItemWithID {
  readonly id: string;
}

interface Props<ItemType extends ItemWithID> {
  readonly data: ItemType[];
  readonly orientation: 'horizontal' | 'vertical';
  readonly padding?: string;
  readonly spacing?: string;
  readonly renderItem: (item: ItemType) => ReactNode;
}

export const List = <ItemType extends ItemWithID,>({ data, orientation, padding, spacing, renderItem }: Props<ItemType>) => {
  return (
    <ul
      className={`
        ${styles.list}
        ${styles[ orientation ]}
      `}
      style={{
        padding,
        ...(orientation === 'horizontal'
          ? { columnGap: spacing }
          : { rowGap: spacing }
        )
      }}
    >
      {data.map(item => {
        return (
          <li
            key={item.id}
          >
            {renderItem(item)}
          </li>
        );
      })}
    </ul>
  );
};
