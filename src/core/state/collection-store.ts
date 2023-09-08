import { Collection } from '../../types/Collection';
import { create } from 'zustand';

interface CollectionStoreState {
  collection: Collection;
}

interface CollectionStoreActions {
  updateCollection: (collection: Collection) => void;
  updateCard: (cardId: string, collectedValue: number) => void;
}

const initialState: CollectionStoreState = {
  collection: {},
};

export const useCollectionStore = create<
  CollectionStoreState & CollectionStoreActions
>((set) => ({
  ...initialState,
  updateCollection: (collection) =>
    set({
      collection,
    }),
  updateCard: (cardId, collectedValue) =>
    set((state) => ({
      collection: {
        ...state.collection,
        [cardId]: collectedValue,
      },
    })),
}));
