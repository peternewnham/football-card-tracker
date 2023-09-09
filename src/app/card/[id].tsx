import { Image, StyleSheet, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Cards } from '../../data/cards';
import { CardImages } from '../../data/card-images';

export default function CardModal() {
  const { id } = useLocalSearchParams();
  const card = Cards.find((card) => card.id === id);

  if (!card) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image
        style={{ maxWidth: '95%' }}
        source={CardImages[card.id as keyof typeof CardImages]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
