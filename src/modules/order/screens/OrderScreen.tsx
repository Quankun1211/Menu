import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import useGetMyOrders from '../hooks/useGetOrders';
import useGetMe from '@/hooks/useGetMe';
import {router} from "expo-router"
import AllOrders from './AllOrder';
import ProcessingOrders from './ProcessingOrder';
import ShippingOrders from './ShippingOrder';
import CancelledOrders from './CancelledOrder';

const Tab = createMaterialTopTabNavigator();

export default function OrdersScreen() {
  const { data: meData, isPending: mePending } = useGetMe();
  const isLoggedIn = !!meData?.data;
  

  const { data, isPending } = useGetMyOrders(isLoggedIn);

  const orders = data?.data ?? [];

  if (!isLoggedIn) {
    return (
      <View style={{ flex: 1, backgroundColor: '#F8F9FA', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Ionicons name="cart-outline" size={100} color="#CCC" />
        <Text style={{ fontSize: 18, color: '#666', marginTop: 20, textAlign: 'center' }}>
          Vui lòng đăng nhập để xem đơn hàng của bạn
        </Text>
        <TouchableOpacity 
          onPress={() => router.push('/(auth)/login')}
          style={{ backgroundColor: '#F26522', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 25, marginTop: 20 }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Đăng nhập ngay</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (isPending) return null;

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarActiveTintColor: '#F26522',
          tabBarInactiveTintColor: '#666',
          tabBarIndicatorStyle: { backgroundColor: '#F26522', height: 2 },
          tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold', textTransform: 'none' },
          tabBarStyle: { elevation: 0, shadowOpacity: 0, backgroundColor: '#fff' },
          tabBarItemStyle: { width: 'auto', paddingHorizontal: 20 },
        }}
      >
        <Tab.Screen name="Tất cả">
          {() => <AllOrders orders={orders} />}
        </Tab.Screen>
        
        <Tab.Screen name="Đang xử lý">
          {() => <ProcessingOrders orders={orders.filter(o => o.status === 'pending')} />}
        </Tab.Screen>
        
        <Tab.Screen name="Đang giao">
          {() => <ShippingOrders orders={orders.filter(o => o.status === 'shipping')} />}
        </Tab.Screen>
        
        <Tab.Screen name="Đã hủy">
          {() => <CancelledOrders orders={orders.filter(o => o.status === 'cancelled')} />}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
}