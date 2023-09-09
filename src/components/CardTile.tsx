import {
  Image,
  StyleSheet,
  Touchable,
  TouchableHighlight,
  View,
} from 'react-native';
import { Card } from '../types/Card';
import { CardImages } from '../data/card-images';
import { IconButton, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';

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
  const router = useRouter();
  return (
    <View style={styles.tile}>
      <View style={styles.tileContent}>
        <View style={styles.imageContainer}>
          <Text style={styles.cardId}>{card.id}</Text>
          <TouchableHighlight
            onPress={() =>
              router.push({
                pathname: 'card/[id]',
                params: {
                  id: card.id,
                },
              })
            }
          >
            <Image
              source={CardImages[card.id as keyof typeof CardImages]}
              style={styles.image}
              height={180}
              width={128}
              resizeMode="contain"
            />
          </TouchableHighlight>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.cardType}>{card.type}</Text>
          <View
            style={{
              paddingLeft: 5,
              paddingRight: 5,
            }}
          >
            <View>
              <Text
                style={styles.name}
                numberOfLines={1}
                variant="headlineLarge"
              >
                {card.name}
              </Text>
            </View>
            <View style={styles.column}>
              <View>
                <Text variant="bodyLarge">{card.club}</Text>
              </View>
              <View>
                <Text variant="bodyLarge">{card.position}</Text>
              </View>
            </View>
            <View style={styles.column}>
              <IconButton
                icon="minus"
                mode="contained"
                onPress={() => decrement(card.id)}
              />
              <View>
                <Text style={styles.collectionCount}>{numCollected}</Text>
              </View>
              <IconButton
                mode="contained"
                icon="plus"
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
    backgroundColor: 'white',
  },
  tileContent: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    display: 'flex',
    borderRadius: 10,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  imageContainer: {
    width: 95,
    alignItems: 'center',
  },
  image: {
    height: 133,
    width: 95,
  },
  cardId: {
    backgroundColor: 'black',
    color: 'white',
    width: '100%',
    textAlign: 'left',
    paddingLeft: 10,
    fontSize: 14,
  },
  dataContainer: {
    flex: 1,
  },
  cardType: {
    backgroundColor: 'black',
    color: 'white',
    width: '100%',
    textAlign: 'right',
    paddingRight: 10,
    fontSize: 14,
  },
  id: {
    fontSize: 20,
    marginRight: 5,
  },
  name: {
    fontSize: 20,
  },
  column: {
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
