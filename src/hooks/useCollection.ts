import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Collection } from '../types/Collection';

export const useCollection = () => {
  const [collection, setCollection] = useState<Collection>({});
  useEffect(() => {
    (async () => {
      const jsonValue = JSON.parse(
        (await AsyncStorage.getItem('collection')) ?? '{}'
      );
      setCollection(jsonValue);
    })();
  }, []);

  const updateCollection = useCallback(
    async (id: string, newValue: number) => {
      await AsyncStorage.mergeItem(
        'collection',
        JSON.stringify({ [id]: newValue })
      );
      setCollection((prev) => ({
        ...prev,
        [id]: newValue,
      }));
    },
    [collection]
  );

  const incrementValue = useCallback(
    async (id: string) => {
      const currentValue = collection[id] ?? 0;
      await updateCollection(id, currentValue + 1);
    },
    [collection]
  );

  const decrementValue = useCallback(
    async (id: string) => {
      const currentValue = collection[id] ?? 0;
      await updateCollection(id, Math.max(currentValue - 1, 0));
    },
    [collection]
  );

  return {
    collection,
    increment: incrementValue,
    decrement: decrementValue,
  };
};
