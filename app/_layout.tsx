import { Stack, router } from "expo-router";
import { useEffect } from "react";
import { useAuthStore } from "../src/store/auth.store";

export default function RootLayout() {
  const { token, loading, initAuth } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, []);

  useEffect(() => {
    if (loading) return;

    if (!token) {
      router.replace("/(auth)/Login");
    } else {
      router.replace("/(tabs)/index");
    }
  }, [loading, token]);

  if (loading) return null; // hoặc Splash

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
