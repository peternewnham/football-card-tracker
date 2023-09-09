import { Stack, useRouter } from 'expo-router';
import { IconButton, PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';

const BackHeader = () => {
  const router = useRouter();
  return (
    <View>
      <IconButton icon="arrow-left" size={32} onPress={() => router.back()} />
    </View>
  );
};

export default function AppLayout() {
  return (
    <PaperProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="card/[id]"
            options={{
              presentation: 'modal',
              animation: 'flip',
              headerShown: true,
              header: BackHeader,
            }}
          />
        </Stack>
      </SafeAreaView>
    </PaperProvider>
  );
}
