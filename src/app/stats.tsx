import { StyleSheet, View } from 'react-native';
import { useCollection } from '../hooks/useCollection';
import { Cards } from '../data/cards';
import { useMemo } from 'react';
import { Text, useTheme } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type CollectionGroupMap = {
  [key: string]: CollectionGroup;
} & {
  Total: CollectionGroup;
};

interface CollectionGroup {
  group: string;
  collected: number;
  total: number;
  isSpecial: boolean;
}

const groupIsSpecial = (groupName: string) => {
  return (
    groupName.includes('Limited Edition') ||
    groupName === 'Excellence' ||
    groupName === 'Platinum Baller'
  );
};

export default function StatsScreen() {
  const { collection } = useCollection();
  const groups = useMemo(() => {
    const groups: CollectionGroupMap = {
      Total: {
        group: 'Total',
        total: 0,
        collected: 0,
        isSpecial: false,
      },
    };
    Cards.forEach((card) => {
      let groupName = card.type;
      if (
        card.type === 'Standard' ||
        card.type === 'Club Crest' ||
        card.type === 'Team Line-Ups'
      ) {
        groupName = card.club;
      }
      if (!groups[groupName]) {
        groups[groupName] = {
          group: groupName,
          collected: 0,
          total: 0,
          isSpecial: groupIsSpecial(groupName),
        };
      }
      const currentGroup = groups[groupName];
      if (!currentGroup.isSpecial) {
        groups.Total.total++;
      }
      currentGroup.total++;
      if ((collection[card.id] ?? 0) > 0) {
        currentGroup.collected++;
        if (!currentGroup.isSpecial) {
          groups.Total.collected++;
        }
      }
    });
    return Object.values(groups);
  }, [collection]);

  const theme = useTheme();

  return (
    <FlashList
      data={groups}
      estimatedItemSize={51}
      extraData={collection}
      renderItem={({ item }) => {
        const percent = Math.round((item.collected / item.total) * 100);
        return (
          <View style={styles.statContainer}>
            <View style={styles.groupContainer}>
              <Text variant="headlineSmall">{item.group}</Text>
              {item.collected === item.total && (
                <MaterialCommunityIcons name="check" size={24} />
              )}
            </View>
            <View style={styles.percentContainer}>
              <Text>
                {item.collected} / {item.total} ({percent}%)
              </Text>
              <View style={styles.barContainer}>
                <View
                  style={[
                    styles.bar,
                    {
                      width: `${percent}%`,
                      backgroundColor: theme.colors.primary,
                    },
                  ]}
                />
              </View>
            </View>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  statContainer: {
    margin: 5,
  },
  groupContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
  },
  percentContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  barContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignSelf: 'center',
    height: '80%',
    borderWidth: 1,
    display: 'flex',
    marginRight: 5,
  },
  bar: {
    flex: 1,
    height: '100%',
  },
});
