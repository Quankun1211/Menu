import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Switch, Dimensions, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { DashboardStyles } from "../css/DashboardStyles"
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
} from 'react-native-reanimated';
import { GestureDetector, Gesture, FlatList } from 'react-native-gesture-handler';
import RenderOrder from '../components/RenderOrder';
import useGetMe from '@/hooks/useGetMe';
import useGetOrderShipper from '../hooks/useGetOrderShipper';
import useUpdateStatusShipper from '../hooks/useUpdateStatus';
import useRequestCancel from '../hooks/useRequestCancel';
import ConfirmModal from '../components/ConfirmModal';
import CancelModal from '../components/CancelModal';
import { router } from "expo-router"
import useUpdateShipperStatus from '../hooks/useUpdateShipperStatus';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQueryClient } from '@tanstack/react-query';
import { useSocket } from '@/context/SocketContext';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const SHEET_MAX_HEIGHT = -SCREEN_HEIGHT + 180; 
const SHEET_MIN_HEIGHT = -70; 

export default function DashboardScreen() {
  const queryClient = useQueryClient();
  const { data: meData } = useGetMe();
    
  const { data: orderData, isPending: orderLoading } = useGetOrderShipper();
  const { mutate: updateStatusOrder } = useUpdateStatusShipper();
  const { mutate: cancelOrder } = useRequestCancel();
  const { mutate: setOnlineStatus, isPending: isUpdatingStatus } = useUpdateShipperStatus();

  const [isOnline, setIsOnline] = useState(meData?.data.isOnline);
  
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const mapRef = useRef<MapView>(null);
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reason, setReason] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [confirmData, setConfirmData] = useState<{ id: string; nextStatus: string; text: string } | undefined>(undefined);

  const translateY = useSharedValue(SHEET_MIN_HEIGHT);
  const context = useSharedValue({ y: 0 });

  const socket = useSocket();

  useEffect(() => {
    if (!socket || !meData?.data?.id) return;

    const joinRoom = () => {
      socket.emit('join_shipper_room', meData.data.id.toString());
    };

    socket.on('connect', joinRoom);

    if (socket.connected) {
      joinRoom();
    }

    return () => {
      socket.off('connect', joinRoom);
    };
  }, [socket, meData?.data?.id]);

  useEffect(() => {
    if (!socket) return;
    const handleNewOrder = () => {
      queryClient.invalidateQueries({ queryKey: ['get-order-shipper'] });
    };
    socket.on('new_order_assigned', handleNewOrder);
    return () => { socket.off('new_order_assigned', handleNewOrder); };
  }, [socket, queryClient]);

  useEffect(() => {
    if (!socket) return;

    const handleCancelResult = (data : any) => {
      Alert.alert("Thông báo", data.message);
      queryClient.invalidateQueries({ queryKey: ['get-order-shipper'] });
    };

    socket.on('shipper_cancel_result', handleCancelResult);

    return () => {
      socket.off('shipper_cancel_result', handleCancelResult);
    };
  }, [socket, queryClient]);

  useEffect(() => {
    if (meData?.data) {
      setIsOnline(meData.data.isOnline);
    }
  }, [meData?.data?.isOnline]);

  useEffect(() => {
    let locationSubscription: Location.LocationSubscription;
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      
      let initialLocation = await Location.getCurrentPositionAsync({});
      setLocation(initialLocation);
      
      locationSubscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 10 },
        (newLocation) => {
          setLocation(newLocation);
          if (isOnline) {
            mapRef.current?.animateToRegion({
              latitude: newLocation.coords.latitude,
              longitude: newLocation.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }, 1000);
          }
        }
      );
    })();
    return () => { if (locationSubscription) locationSubscription.remove(); };
  }, [isOnline]);

  const panGesture = Gesture.Pan()
    .onStart(() => { context.value = { y: translateY.value }; })
    .onUpdate((event) => {
      translateY.value = Math.min(Math.max(event.translationY + context.value.y, SHEET_MAX_HEIGHT), SHEET_MIN_HEIGHT);
    })
    .onEnd(() => {
      if (translateY.value < (SHEET_MAX_HEIGHT + SHEET_MIN_HEIGHT) / 2) {
        translateY.value = withSpring(SHEET_MAX_HEIGHT, { damping: 50 });
      } else {
        translateY.value = withSpring(SHEET_MIN_HEIGHT, { damping: 50 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const handleNextStep = (orderId: string) => {
    if (!isOnline) {
        Alert.alert("Thông báo", "Bạn cần trực tuyến để thực hiện hành động này");
        return;
    }
    const order = orderData?.data?.find(o => o._id === orderId);
    if (!order) return;

    const statusFlow: Record<string, string> = {
      "assigned": "confirmed",
      "confirmed": "shipping",
      "shipping": "delivered"
    };

    const statusText: Record<string, string> = {
      "confirmed": "xác nhận nhận đơn hàng này",
      "shipping": "xác nhận đã lấy hàng và bắt đầu giao",
      "delivered": "xác nhận đã giao hàng thành công"
    };

    const nextStatus = statusFlow[order.status];

    if (nextStatus) {
      setConfirmData({
        id: orderId,
        nextStatus: nextStatus,
        text: statusText[nextStatus]
      });
      setIsConfirmModalVisible(true);
    }
  };

  const handleViewDetail = (orderId: string) => {
    router.push({
      pathname: "/(shipper_details)/tracking/TrackingTabs",
      params: {orderId: orderId}
    })
  };

  const onConfirmUpdate = () => {
    if (!isOnline) return;
    if (!confirmData) return;

    updateStatusOrder(
      { orderId: confirmData.id, nextStatus: confirmData.nextStatus },
      {
        onSuccess: () => {
          setIsConfirmModalVisible(false);
          setConfirmData(undefined);
          socket.emit("order_status_changed_by_shipper", { orderId: confirmData.id });
        },
        onError: (err: any) => {
          setIsConfirmModalVisible(false);
          Alert.alert("Lỗi", err?.response?.data?.message || "Không thể cập nhật");
        }
      }
    );
  };

  const openCancelModal = (orderId: string) => {
    if (!isOnline) {
        Alert.alert("Thông báo", "Bạn cần trực tuyến để thực hiện hành động này");
        return;
    }
    setSelectedOrderId(orderId);
    setIsModalVisible(true);
  };

  const submitCancelRequest = () => {
    if (!isOnline) return;
    if (!reason.trim()) {
      Alert.alert("Thông báo", "Vui lòng nhập lý do hủy đơn");
      return;
    }

    cancelOrder({ orderId: selectedOrderId!, reason }, {
        onSuccess: () => {
            setIsModalVisible(false);
            setReason('');
            setSelectedOrderId(null);
            socket.emit("shipper_request_cancel", { orderId: selectedOrderId });
            Alert.alert("Thành công", "Yêu cầu hủy đơn đã được gửi tới Admin");
        }
    })
  };

  const handleSwitchOnline = () => {
    const nextStatus = !isOnline;
    setIsOnline(nextStatus); 
    
    setOnlineStatus({ isOnline: nextStatus }, {
        onError: (err: any) => {
            setIsOnline(!nextStatus); 
            Alert.alert("Lỗi", err?.response?.data?.message || "Cập nhật trạng thái thất bại");
        }
    });
  }

  const centerToUserLocation = () => {
      if (location) {
        mapRef.current?.animateToRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }, 1000);
      } else {
        Alert.alert("Thông báo", "Đang xác định vị trí của bạn...");
      }
    };

  return (
    <View style={DashboardStyles.container}>
      <View style={DashboardStyles.header}>
        <View style={DashboardStyles.userInfo}>
          <Image 
            source={{ uri: meData?.data?.avatar || 'https://i.pravatar.cc/150?u=a' }} 
            style={DashboardStyles.avatar} 
          />
          <View style={DashboardStyles.userText}>
            <Text style={DashboardStyles.userName}>{meData?.data?.name || "Đang tải..."}</Text>
          </View>
        </View>
        <View style={DashboardStyles.incomeCard}>
          <Text style={DashboardStyles.orderCount}>{orderData?.data?.length || 0} Đơn hàng</Text>
        </View>
      </View>

      <View style={DashboardStyles.statusToggle}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={DashboardStyles.statusTitle}>
                {isOnline ? "Đang trực tuyến" : "Ngoại tuyến"}
            </Text>
            {isUpdatingStatus && <ActivityIndicator size="small" color="#4cd964" style={{ marginLeft: 10 }} />}
        </View>
        <Switch 
          value={isOnline} 
          onValueChange={handleSwitchOnline} 
          disabled={isUpdatingStatus}
          trackColor={{ false: "#767577", true: "#4cd964" }}
        />
      </View>

      <View style={DashboardStyles.mapContainer}>
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFill}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: location?.coords.latitude || 10.762622,
            longitude: location?.coords.longitude || 106.660172,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {location && (
            <Marker coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}>
              <View style={DashboardStyles.shipperMarker}>
                <View style={DashboardStyles.shipperDot} />
              </View>
            </Marker>
          )}
        </MapView>

        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 20,
            bottom: 320, 
            backgroundColor: 'white',
            width: 50,
            height: 50,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 5
          }}
          onPress={centerToUserLocation}
        >
          <MaterialCommunityIcons name="crosshairs-gps" size={28} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <GestureDetector gesture={panGesture}>
        <Animated.View style={[DashboardStyles.bottomSheet, animatedStyle]}>
          <View style={DashboardStyles.dragHandle} />
          <Text style={DashboardStyles.sheetTitle}>Đơn được phân công</Text>
          
          {orderLoading ? (
            <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
          ) : (
            <FlatList
              data={orderData?.data || []} 
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <RenderOrder 
                  item={item} 
                  onNextStep={handleNextStep}
                  onOpenCancel={openCancelModal}
                  onViewDetail={handleViewDetail} 
                />
              )}
              contentContainerStyle={{ paddingBottom: 150 }}
              ListEmptyComponent={
                <Text style={{ textAlign: 'center', marginTop: 20, color: '#999' }}>
                  Hiện chưa có đơn hàng nào được phân công.
                </Text>
              }
            />
          )}
        </Animated.View>
      </GestureDetector>

      <ConfirmModal isConfirmModalVisible={isConfirmModalVisible} setIsConfirmModalVisible={setIsConfirmModalVisible} confirmData={confirmData} onConfirmUpdate={onConfirmUpdate} />

      <CancelModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} reason={reason} setReason={setReason} submitCancelRequest={submitCancelRequest} />
    </View>
  );
}