import { StyleSheet, Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';

const data = Array.from({ length: 100 }).map((_, i) => ({
  name: `Player ${i + 1}`,
}));

export default function IndexScreen() {
  return (
    <FlashList
      data={data}
      estimatedItemSize={200}
      numColumns={2}
      renderItem={({ item }) => <Tile name={item.name} />}
    />
  );
}

interface TileProps {
  name: string;
}
const Tile = ({ name }: TileProps) => {
  return (
    <View style={styles.tile}>
      <View style={styles.tileContent}>
        <Text>{name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    height: 200,
    padding: 5,
  },
  tileContent: {
    flex: 1,
    borderWidth: 1,
    padding: 5,
  },
});
