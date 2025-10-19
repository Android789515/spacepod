import { useState } from 'react';

interface HookConfig<DataType> {
  readonly key: string;
  readonly defaultValue: DataType;
}

const migrateOldState = <DataType extends object>(stringifiedState: string) => {
  const state = JSON.parse(stringifiedState);

  if (Array.isArray(state)) {
    const items = state as DataType[];

    return items.map(entry => {
      const isOldState = !('url' in entry);

      if (isOldState) {
        return {
          ...entry,
          url: '',
        };
      } else {
        return entry;
      }
    });
  } else {
    return state;
  }
};

const getOrDefault = <DataType>({ key, defaultValue }: HookConfig<DataType>) => {
  return () => {
    const item = localStorage.getItem(key);

    if (item) {
      return migrateOldState(item);
    } else {
      return defaultValue;
    }
  };
};

export const useLocalStorage = <DataType>(config: HookConfig<DataType>) => {
  const [ data, _setData ] = useState(getOrDefault(config));

  type Reducer = (prevData: DataType) => DataType;

  const setData = (dataOrSetter: DataType | Reducer) => {
    const newData = typeof dataOrSetter === 'function'
      ? (dataOrSetter as Reducer)(data)
      : dataOrSetter;

    _setData(newData);

    localStorage.setItem(config.key, JSON.stringify(
      newData
    ));
  };

  return [
    data,
    setData,
  ];
};

