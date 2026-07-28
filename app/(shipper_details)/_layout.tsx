import { Stack } from 'expo-router';
import { AppTheme } from '@/constants/theme';

export default function ShipperDetailsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true, 
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: AppTheme.colors.cream },
        headerShadowVisible: false,
        headerTitleStyle: { fontWeight: '800', fontSize: 17, color: AppTheme.colors.brown },
        headerTintColor: AppTheme.colors.brown,
        contentStyle: { backgroundColor: AppTheme.colors.canvas },
        animation: 'slide_from_right',
        animationDuration: 220,
        gestureEnabled: true,
        animationMatchesGesture: true,
        freezeOnBlur: true,
      }}
    >
      <Stack.Screen name="tracking/TrackingTabs" options={{ title: 'Theo dõi đơn hàng' }} />
      
    </Stack>
  );
}
