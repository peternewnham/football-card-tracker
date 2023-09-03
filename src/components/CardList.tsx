import { FlashList } from '@shopify/flash-list';
import { Card } from '../types/Card';
import { CardTile } from './CardTile';
import { Collection } from '../types/Collection';

interface Props {
  cards: Card[];
  collection: Collection;
  incrementCard: (id: string) => void;
  decrementCard: (id: string) => void;
}

export const CardList = ({
  cards,
  collection,
  incrementCard,
  decrementCard,
}: Props) => {
  return (
    <FlashList
      data={cards}
      estimatedItemSize={180}
      numColumns={1}
      extraData={collection}
      renderItem={({ item }) => (
        <CardTile
          card={item}
          numCollected={collection[item.id] ?? 0}
          increment={incrementCard}
          decrement={decrementCard}
        />
      )}
    />
  );
};
