import { useState } from 'react';

interface HookConfig<DataType> {
  readonly key: string;
  readonly defaultValue: DataType;
}

const getOrDefault = <DataType>({ key, defaultValue }: HookConfig<DataType>) => {
  return () => {
    const item = localStorage.getItem(key);

    if (item) {
      const data = JSON.parse(item);

      return 'setData' in data
        ? new Set(data.setData)
        : data;
    } else {
      return defaultValue;
    }
  };
};

const convertSet = <DataType>(data: Set<DataType> | any) => {
  return data instanceof Set
    ? {
      setData: [...data],
    }
    : data;
};

export const useLocalStorage = <DataType>(config: HookConfig<DataType>) => {
  const [ data, _setData ] = useState(getOrDefault(config));

  const setData = (reducer: (prevData: DataType) => DataType) => {
    const newData = reducer(data);

    _setData(newData);

    localStorage.setItem(config.key, JSON.stringify(
      convertSet(newData)
    ));
  };

  return [
    data,
    setData,
  ];
};

