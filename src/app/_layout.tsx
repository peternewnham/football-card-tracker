import { Tabs } from 'expo-router';
import { BottomNavigation, PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AppLayout() {
  return (
    <PaperProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            headerShown: false,
          }}
          tabBar={({ navigation, state, descriptors }) => {
            return (
              <BottomNavigation.Bar
                navigationState={{
                  ...state,
                  routes: state.routes.filter(
                    (route) => route.name === 'index' || route.name === 'stats'
                  ),
                }}
                onTabPress={({ route }) => {
                  navigation.navigate(route);
                }}
                renderIcon={({ route, focused, color }) => {
                  const { options } = descriptors[route.key];
                  if (options.tabBarIcon) {
                    return options.tabBarIcon({ focused, color, size: 24 });
                  }
                }}
                getLabelText={({ route }) => {
                  const { options } = descriptors[route.key];
                  return options.title;
                }}
              />
            );
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Collection',
              tabBarLabel: 'Collection',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="book-open-variant"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="stats"
            options={{
              title: 'Stats',
              tabBarLabel: 'Stats',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="chart-box"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
        </Tabs>
      </SafeAreaView>
    </PaperProvider>
  );
}
