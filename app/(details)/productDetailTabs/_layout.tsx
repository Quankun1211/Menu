import { Stack } from "expo-router";

export default function ProductDetailTabsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'none',
        freezeOnBlur: true,
      }}
    >
      <Stack.Screen 
        name="ProductDetailTabs" 
        options={{ title: 'Chi tiết sản phẩm' }} 
      />
    </Stack>
  );
}
