import { Stack, router, useSegments } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "../src/store/auth.store";
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { SocketProvider } from "@/context/SocketContext";
import { AppTheme } from "@/constants/theme";
import { enableFreeze, enableScreens } from 'react-native-screens';
import OrderRealtimeSync from "@/context/OrderRealtimeSync";

enableScreens(true);
enableFreeze(true);

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());
  const segments = useSegments();
  const { loading, initAuth, role } = useAuthStore();
  const initialRouteChecked = useRef(false);
  // const [isReady, setIsReady] = useState(false);

  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'transparent', backgroundColor: '#fff7f0', height: 70, borderRadius: 20 }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{ fontSize: 16, fontWeight: 'bold', color: '#1A1A1A' }}
        text2Style={{ fontSize: 14, color: '#666' }}
      />
    ),
    error: (props: any) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: 'transparent', borderRadius: 20, backgroundColor: '#ff5151' }}
        text1Style={{ fontSize: 16, fontWeight: 'bold', color: "#fff" }}
        text2Style={{ fontSize: 14 }}
      />
    )
  };

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  useEffect(() => {
  if (loading || initialRouteChecked.current) return;

  const rootSegment = segments[0];
  if (!rootSegment) return;
  initialRouteChecked.current = true;

  const shipperAllowedGroups = ['(shipper)', '(shipper_details)'];
  const userAllowedGroups = ['(tabs)', '(auth)', '(details)'];

  if (role === 'shipper') {
    if (!shipperAllowedGroups.includes(rootSegment)) {
      router.replace("/(shipper)/dashboard_shipper");
    }
  } else {
    if (!userAllowedGroups.includes(rootSegment)) {
      router.replace("/(tabs)");
    }
  }
}, [loading, role, segments]);

  if (loading) return null;
 
  return (
    <SocketProvider>
    <QueryClientProvider client={queryClient}>
      <OrderRealtimeSync />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="dark" translucent={false} backgroundColor={AppTheme.colors.cream} />
        <Stack screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: AppTheme.colors.canvas },
          animation: 'slide_from_right',
          animationDuration: 220,
          gestureEnabled: true,
          fullScreenGestureEnabled: true,
          animationMatchesGesture: true,
          freezeOnBlur: false,
        }}>
          <Stack.Screen name="(tabs)" options={{ animation: 'none' }} />
          <Stack.Screen name="(shipper)" /> 
          <Stack.Screen name="(shipper_details)" /> 
          <Stack.Screen name="(details)" /> 
          <Stack.Screen name="(auth)/login" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
          <Stack.Screen name="(auth)/register" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
        </Stack>
        <Toast config={toastConfig}/>
      </GestureHandlerRootView>
    </QueryClientProvider>
    </SocketProvider>
  );
}
