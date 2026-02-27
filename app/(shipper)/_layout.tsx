import { Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
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
          headerShown: false,
          tabBarActiveTintColor: '#32E021', 
          tabBarInactiveTintColor: '#999',
          tabBarStyle: {
            backgroundColor: '#0A0F0A', 
            borderTopWidth: 0,
            height: 55,
            paddingBottom: 5,
          },
        }}
      >
        <Tabs.Screen
          name="dashboard_shipper"
          options={{
            title: "Trang chủ", 
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="history_shipper"
          options={{
            title: "Lịch sử", 
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? "time" : "time-outline"} size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile_shipper"
          options={{
            title: "Cá nhân", 
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? "person" : "person-outline"} size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="dashboard" 
          options={{
            href: null, 
          }}
        />
        <Tabs.Screen
          name="(shipper_details)"
          options={{
            href: null, 
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}