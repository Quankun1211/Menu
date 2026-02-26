import { Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import CustomTabBarButton from "../../src/components/ui/CustomTabBarButton"
import { DefaultTheme, ThemeProvider } from '@react-navigation/native'

export default function TabsLayout() {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#fff', 
    },
  }; 

  return (
    <ThemeProvider value={MyTheme}>
      <Tabs
        screenOptions={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            height: Platform.OS === 'android' ? 50 : 85,
            backgroundColor: '#ffffff',
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          tabBarActiveTintColor: '#F26522',
          tabBarInactiveTintColor: '#999',
          tabBarStyle: {
            height: Platform.OS === 'android' ? 65 : 88,
            paddingBottom: Platform.OS === 'android' ? 12 : 30,
            backgroundColor: '#ffffff',
            borderTopWidth: 0,
            elevation: 10,
            paddingTop: 5
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Trang chủ", 
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="explore"
          options={{
            title: "Khám phá",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? "apps" : "apps-outline"} size={24} color={color} />
            ),
          }}
        />

        <Tabs.Screen
            name="cart"
            options={{
              title: "Giỏ hàng",
              tabBarLabel: () => null, 
              tabBarIcon: () => (
                <Ionicons name="basket" size={30} color="#fff" style={{ textAlign: 'center' }} />
              ),
              tabBarButton: (props) => <CustomTabBarButton {...props} />,
            }}
          />

        <Tabs.Screen
          name="order"
          options={{
            title: "Đơn hàng",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? "car-sport" : "car-sport-outline"} size={24} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Tài khoản",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? "person" : "person-outline"} size={24} color={color} />
            ),
          }}
        />
      <Tabs.Screen
        name="(details)"
        options={{
          href: null, 
        }}
      />
      <Tabs.Screen
        name="searchTabs"
        options={{
          href: null, 
        }}
      />
      </Tabs>
    </ThemeProvider>
  );
}