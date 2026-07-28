import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet } from 'react-native';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import CustomTabBarButton from '../../src/components/ui/CustomTabBarButton';
import { AppTheme } from '@/constants/theme';

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: AppTheme.colors.canvas,
    card: AppTheme.colors.surface,
    primary: AppTheme.colors.primary,
    text: AppTheme.colors.text,
    border: AppTheme.colors.border,
  },
};

export default function TabsLayout() {
  return (
    <ThemeProvider value={navigationTheme}>
      <Tabs
        detachInactiveScreens
        screenOptions={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: styles.header,
          headerShadowVisible: false,
          headerTintColor: AppTheme.colors.brown,
          headerTitleStyle: styles.headerTitle,
          tabBarActiveTintColor: AppTheme.colors.primary,
          tabBarInactiveTintColor: AppTheme.colors.textMuted,
          tabBarHideOnKeyboard: true,
          tabBarLabelStyle: styles.tabLabel,
          tabBarItemStyle: styles.tabItem,
          tabBarStyle: styles.tabBar,
          sceneStyle: { backgroundColor: AppTheme.colors.canvas },
          animation: 'none',
          freezeOnBlur: true,
          lazy: true,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Trang chủ',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'home' : 'home-outline'} size={23} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Khám phá',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'compass' : 'compass-outline'} size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: 'Giỏ hàng',
            tabBarLabel: () => null,
            tabBarIcon: () => <Ionicons name="basket" size={27} color="#fff" />,
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />
        <Tabs.Screen
          name="order"
          options={{
            title: 'Đơn hàng',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'receipt' : 'receipt-outline'} size={23} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Tài khoản',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'person' : 'person-outline'} size={23} color={color} />
            ),
          }}
        />
        <Tabs.Screen name="(details)" options={{ href: null }} />
        <Tabs.Screen name="searchTabs" options={{ href: null }} />
      </Tabs>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: AppTheme.colors.cream },
  headerTitle: { fontWeight: '800', fontSize: 17, color: AppTheme.colors.brown },
  tabBar: {
    height: Platform.OS === 'ios' ? 84 : 68,
    paddingTop: 7,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    backgroundColor: AppTheme.colors.surface,
    borderTopColor: AppTheme.colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    shadowColor: AppTheme.colors.brown,
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 12,
  },
  tabItem: { paddingVertical: 2 },
  tabLabel: { fontSize: 11, fontWeight: '700' },
});
