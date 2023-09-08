import { useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Collection } from '../types/Collection';
import { useCollectionStore } from '../core/state/collection-store';

interface Response {
  collection: Collection;
  increment: (id: string) => void;
  decrement: (id: string) => void;
}

export const useCollection = (): Response => {
  const { collection, updateCollection, updateCard } = useCollectionStore();
  useEffect(() => {
    (async () => {
      const jsonValue = JSON.parse(
        (await AsyncStorage.getItem('collection')) ?? '{}'
      );
      updateCollection(jsonValue);
    })();
  }, []);

  const updateCardInCollection = useCallback(
    async (id: string, newValue: number) => {
      await AsyncStorage.mergeItem(
        'collection',
        JSON.stringify({ [id]: newValue })
      );
      updateCard(id, newValue);
    },
    [collection]
  );

  const incrementValue = useCallback(
    async (id: string) => {
      const currentValue = collection[id] ?? 0;
      await updateCardInCollection(id, currentValue + 1);
    },
    [collection]
  );

  const decrementValue = useCallback(
    async (id: string) => {
      const currentValue = collection[id] ?? 0;
      await updateCardInCollection(id, Math.max(currentValue - 1, 0));
    },
    [collection]
  );

  return {
    collection,
    increment: incrementValue,
    decrement: decrementValue,
  };
};
