import type { ReactNode } from 'react';

export interface UniqueItem {
  readonly id: string;
}

export const KeyedItem = <DataType extends UniqueItem,>(content: (dataItem: DataType) => ReactNode) => {
  return (dataItem: DataType) => (
    <li
      key={dataItem.id}
    >
      {content(dataItem)}
    </li>
  );
};

