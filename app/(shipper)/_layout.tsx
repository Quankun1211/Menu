import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
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
        detachInactiveScreens={false}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#D16D2F',
          tabBarInactiveTintColor: '#8D817A',
          tabBarStyle: {
            backgroundColor: '#FFFDF9',
            borderTopWidth: 1,
            borderTopColor: '#EEDCCF',
            height: 64,
            paddingTop: 6,
            paddingBottom: 8,
          },
          tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
          animation: 'none',
          freezeOnBlur: false,
          lazy: true,
        }}
      >
        <Tabs.Screen
          name="dashboard_shipper"
          options={{
            title: "Công việc",
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
      </Tabs>
    </ThemeProvider>
  );
}
