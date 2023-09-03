import { CardList } from '../components/CardList';
import { Cards } from '../data/cards';
import { StyleSheet, TextInput, View } from 'react-native';
import { useState } from 'react';
import { useCollection } from '../hooks/useCollection';
import { Dropdown } from 'react-native-element-dropdown';

export default function IndexScreen() {
  const { collection, increment, decrement } = useCollection();

  const [status, setStatus] = useState('all');
  const [searchText, setSearchText] = useState('');
  const visibleCards = Cards.filter((card) => {
    const textMatch =
      searchText === '' ||
      card.id.toLowerCase().includes(searchText.toLowerCase()) ||
      card.name.toLowerCase().includes(searchText.toLowerCase()) ||
      card.club.toLowerCase().includes(searchText.toLowerCase()) ||
      card.type.toLowerCase().includes(searchText.toLowerCase());
    const numCollected = collection[card.id] ?? 0;
    const statusMatch =
      status === 'all' ||
      (status === 'need' && numCollected === 0) ||
      (status === 'have' && numCollected > 0) ||
      (status === 'swap' && numCollected > 1);
    return textMatch && statusMatch;
  });

  return (
    <View style={styles.root}>
      <View style={styles.filtersContainer}>
        <TextInput
          style={styles.searchInput}
          onChangeText={(text) => setSearchText(text)}
        />
        <Dropdown
          data={[
            { label: 'All', value: 'all' },
            { label: 'Need', value: 'need' },
            { label: 'Swap', value: 'swap' },
            { label: 'Have', value: 'have' },
          ]}
          labelField="label"
          valueField="value"
          onChange={(item) => {
            setStatus(item.value);
          }}
          value={status}
          style={styles.dropdown}
        />
      </View>
      <CardList
        cards={visibleCards}
        collection={collection}
        incrementCard={increment}
        decrementCard={decrement}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  filtersContainer: {
    marginBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#999',
    paddingLeft: 5,
    flexGrow: 1,
  },
  dropdown: {
    width: 100,
    borderColor: 'gray',
    borderWidth: 0.5,
    paddingHorizontal: 8,
  },
});
