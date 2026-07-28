import { Stack } from 'expo-router';
import { AppTheme } from '@/constants/theme';

export default function DetailsLayout() {
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
        fullScreenGestureEnabled: true,
        animationMatchesGesture: true,
        freezeOnBlur: true,
      }}
    >
      <Stack.Screen name="exploreItemTabs/ExploreMenu" options={{ title: 'Thực đơn' }} />
      <Stack.Screen name="exploreItemTabs/ExploreMenuDetail" options={{ title: 'Chi tiết thực đơn' }} />
      <Stack.Screen name="exploreItemTabs/ExploreFood" options={{ title: 'Khám phá món ăn' }} />
      <Stack.Screen name="exploreItemTabs/ExploreSpecial" options={{ title: 'Đặc sản vùng miền' }} />
      <Stack.Screen name="exploreItemTabs/ExploreRecipe" options={{ title: 'Danh sách công thức' }} />
      <Stack.Screen name="exploreItemTabs/ExploreRecipeDetail" options={{ title: 'Công thức nấu ăn' }} />
      <Stack.Screen name="exploreItemTabs/SpecialDetail" options={{ title: 'Đặc sản' }} />
      <Stack.Screen name="exploreItemTabs/CreateRecipe" options={{ title: 'Tạo công thức' }} />
      <Stack.Screen name="exploreItemTabs/RecipeSave" options={{ title: 'Sổ tay công thức' }} />
      <Stack.Screen name="exploreItemTabs/MyRecipeDetailTabs" options={{ title: 'Chi tiết công thức' }} />
      <Stack.Screen name="exploreItemTabs/UpdateRecipeTabs" options={{ title: 'Chỉnh sửa công thức' }} />
      <Stack.Screen name="exploreItemTabs/Wishlist" options={{ title: 'Danh sách yêu thích' }} />
      <Stack.Screen name="orderTabs/OrderTabs" options={{ title: 'Chi tiết đơn hàng' }} />
      <Stack.Screen name="checkoutTabs/CheckOutTabs" options={{ title: 'Thanh toán' }} />
      <Stack.Screen name="addressTabs/AddressTabs" options={{ title: 'Thêm địa chỉ' }} />
      <Stack.Screen name="addressTabs/ListAddressTabs" options={{ title: 'Danh sách địa chỉ' }} />
      <Stack.Screen name="checkoutTabs/PaymentWebView" options={{ title: 'Thanh toán điện tử' }} />
      
      <Stack.Screen name="productDetailTabs" options={{ title: 'Chi tiết sản phẩm' }} />
    </Stack>
  );
}
