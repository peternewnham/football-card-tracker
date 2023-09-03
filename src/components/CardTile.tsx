import { Image, StyleSheet, Text, View } from 'react-native';
import { Card } from '../types/Card';
import { CardImages } from '../data/card-images';

import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
  card: Card;
  numCollected: number;
  increment: (id: string) => void;
  decrement: (id: string) => void;
}

export const CardTile = ({
  card,
  numCollected,
  increment,
  decrement,
}: Props) => {
  return (
    <View style={styles.tile}>
      <View style={styles.tileContent}>
        <View style={styles.imageContainer}>
          <Image
            source={CardImages[card.id as keyof typeof CardImages]}
            style={styles.image}
            height={180}
            width={128}
            resizeMode="contain"
          />
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.header}>
            <Text style={styles.id}>{card.id}</Text>
            <Text style={styles.name} numberOfLines={1}>
              {card.name}
            </Text>
          </View>
          <View>
            <Text>{card.type}</Text>
          </View>
          <View>
            <Text>{card.club}</Text>
          </View>
          <View>
            <Text>{card.position}</Text>
          </View>
          <View style={styles.collectionContainer}>
            <View>
              <Ionicons.Button
                name="remove-circle"
                size={40}
                color="black"
                backgroundColor="white"
                iconStyle={{ marginRight: -5 }}
                onPress={() => decrement(card.id)}
              />
            </View>
            <View>
              <Text style={styles.collectionCount}>{numCollected}</Text>
            </View>
            <View>
              <Ionicons.Button
                name="add-circle"
                size={40}
                color="black"
                backgroundColor="white"
                onPress={() => increment(card.id)}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    height: 162,
    padding: 5,
  },
  tileContent: {
    flex: 1,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  imageContainer: {
    width: 106,
    alignItems: 'center',
  },
  image: {
    height: 150,
    width: 107,
  },
  dataContainer: {
    flex: 1,
    paddingLeft: 5,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  id: {
    fontSize: 20,
    marginRight: 5,
  },
  name: {
    fontSize: 20,
    flex: 1,
  },
  collectionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  collectionCount: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});
