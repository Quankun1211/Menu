import { Stack } from 'expo-router';

export default function ShipperDetailsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true, 
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#fff' },
        headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
        headerTintColor: '#000',
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="tracking/TrackingTabs" options={{ title: 'Theo dõi đơn hàng' }} />
      
    </Stack>
  );
}