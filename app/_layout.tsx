import { Stack, router } from "expo-router";
import * as NavigationBar from 'expo-navigation-bar';
import { NavigationBarBehavior } from "expo-navigation-bar";
import { Platform } from 'react-native';
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "../src/store/auth.store";
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());
  const { loading, initAuth, role } = useAuthStore();
  const [isReady, setIsReady] = useState(false);
  console.log(role);

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
  }, []);

  useEffect(() => {
    if (!loading && !isReady) {
      if (role === 'shipper') {
        router.replace("/(shipper)/dashboard_shipper");
      } else {
        router.replace("/(tabs)");
      }
      setIsReady(true);
    }
  }, [loading, isReady, role]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      const setupSystemUI = async () => {
        try {
          await NavigationBar.setPositionAsync('relative');
          await NavigationBar.setVisibilityAsync("visible");
          await NavigationBar.setBehaviorAsync('overlay' as NavigationBarBehavior);
          await NavigationBar.setBackgroundColorAsync('#ffffff');
          await NavigationBar.setButtonStyleAsync("dark");
        } catch (e) {
          console.log("Lỗi SystemUI:", e);
        }
      };
      setupSystemUI();
    }
  }, []);

  if (loading) return null;
 
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="dark" translucent={false} backgroundColor="#ffffff" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(shipper)" /> 
          <Stack.Screen name="(shipper_details)" /> 
          <Stack.Screen name="(details)" /> 
          <Stack.Screen name="(auth)/login" options={{ presentation: 'modal' }} />
          <Stack.Screen name="(auth)/register" options={{ presentation: 'modal' }} />
        </Stack>
        <Toast config={toastConfig}/>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}