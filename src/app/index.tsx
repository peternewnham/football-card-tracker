import { CardList } from '../components/CardList';
import { Cards } from '../data/cards';
import { StyleSheet, TextInput, View } from 'react-native';
import { useState } from 'react';

export default function IndexScreen() {
  const [visibleData, setVisibleData] = useState(Cards);
  const filterData = (text: string) => {
    setVisibleData(
      Cards.filter((card) => {
        return (
          card.id.toLowerCase().includes(text) ||
          card.name.toLowerCase().includes(text) ||
          card.club.toLowerCase().includes(text) ||
          card.type.toLowerCase().includes(text)
        );
      })
    );
  };
  return (
    <View style={styles.root}>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} onChangeText={filterData} />
      </View>
      <CardList data={visibleData} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  searchContainer: {
    marginBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#999',
    paddingLeft: 5,
  },
});
