import { FlashList } from '@shopify/flash-list';
import { Card } from '../types/Card';
import { CardTile } from './CardTile';

interface Props {
  data: Card[];
}

export const CardList = ({ data }: Props) => {
  return (
    <FlashList
      data={data}
      estimatedItemSize={180}
      numColumns={1}
      renderItem={({ item }) => <CardTile card={item} />}
    />
  );
};
