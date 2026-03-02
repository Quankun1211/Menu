import React, { useRef, useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';
import polyline from '@mapbox/polyline';
import { useQueryClient } from '@tanstack/react-query';
import { io } from "socket.io-client";

import useGetOrderDetail from '@/modules/order/hooks/useGetOrderDetail';
import useUpdateStatusShipper from '../hooks/useUpdateStatus';
import useRequestCancel from '../hooks/useRequestCancel';
import CancelModal from '../components/CancelModal';
import { DashboardStyles } from '../css/DashboardStyles';
import { TrackingStyles } from '../css/TrackingStyles';
import TrackingInforModal from '../components/TrackingInforModal';
import InformationTracking from '../components/InformationTracking';
import useUpdateLocation from '../hooks/useUpdateLocation';
import { useSocket } from '@/context/SocketContext';
import useGetMe from '@/hooks/useGetMe';

const GOONG_API_KEY = Constants.expoConfig?.extra?.apiGetMapKey;

interface TrackingOrderProps {
  orderId: string
}

export default function TrackingScreen({ orderId: initialOrderId }: TrackingOrderProps) {
  const router = useRouter();
  const mapRef = useRef<MapView>(null);
  const queryClient = useQueryClient();
  const socket = useRef<any>(null);
  
  const orderId = useMemo(() => initialOrderId, []);
  const { data: meData } = useGetMe();
  const isOnline = !!meData?.data?.isOnline;

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [customerCoords, setCustomerCoords] = useState<{ latitude: number, longitude: number } | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<{ latitude: number, longitude: number }[]>([]);
  const [hasInitialZoom, setHasInitialZoom] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reason, setReason] = useState('');

  const { data: orderResponse, refetch } = useGetOrderDetail(orderId);
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateStatusShipper();
  const { mutate: updateLocation } = useUpdateLocation();
  const { mutate: cancelOrder } = useRequestCancel();

  const order = orderResponse?.data;
  const socketEmit = useSocket();

  const isCancelled = order?.status === 'cancelled';
  const isPendingCancel = order?.status === 'pending_cancel';
  const isCancelledState = isCancelled || isPendingCancel;

  useEffect(() => {
    socket.current = io("http://192.168.1.8:5000");
    socket.current.emit("join_order", orderId);

    if (socketEmit) {
      socketEmit.on("shipper_cancel_result", (data: any) => {
        if (data.orderId === orderId) {
          Alert.alert("Thông báo", data.message);
          refetch();
        }
      });
    }

    return () => {
      socket.current?.disconnect();
      if (socketEmit) socketEmit.off("shipper_cancel_result");
    };
  }, [orderId, socketEmit]);

  const handleManualUpdate = async () => {
    if (!isOnline) {
      Alert.alert("Thông báo", "Bạn cần trực tuyến để cập nhật vị trí");
      return;
    }
    if (!location) return;
    updateLocation({orderId, latitude: location.coords.latitude, longitude: location.coords.longitude});
  };

  const openCancelModal = () => {
    if (!isOnline) {
      Alert.alert("Thông báo", "Bạn cần trực tuyến để thực hiện hành động này");
      return;
    }
    setIsModalVisible(true);
  };
  
  const submitCancelRequest = () => {
    if (!isOnline) return;
    if (!reason.trim()) {
      Alert.alert("Thông báo", "Vui lòng nhập lý do hủy đơn");
      return;
    }
    cancelOrder({ orderId: orderId, reason }, {
        onSuccess: () => {
            socketEmit.emit("shipper_request_cancel", { orderId: order?._id });
            setIsModalVisible(false);
            setReason('');
            Alert.alert("Thành công", "Yêu cầu hủy đơn đã được gửi tới Admin");
            refetch();
        }
    });
  };

  const statusConfig = useMemo(() => {
    switch (order?.status) {
      case "assigned": 
        return { text: "XÁC NHẬN ĐƠN", next: "confirmed", color: "#FF8C00", label: "Chờ xác nhận" };
      case "confirmed": 
        return { text: "ĐÃ LẤY HÀNG", next: "shipping", color: "#007AFF", label: "Đang lấy hàng" };
      case "shipping": 
        return { text: "HOÀN THÀNH", next: "delivered", color: "#28a745", label: "Đang giao hàng" };
      case "pending_cancel":
        return { text: "ĐANG CHỜ HỦY", next: null, color: "#6c757d", label: "Yêu cầu hủy" };
      case "cancelled":
        return { text: "ĐƠN ĐÃ HỦY", next: null, color: "#dc3545", label: "Đã hủy" };
      case "delivered":
      case "completed":
        return { text: "ĐÃ GIAO HÀNG", next: null, color: "#333", label: "Đã hoàn tất" };
      default: 
        return { text: "KIỂM TRA LẠI", next: null, color: "#999", label: "Không xác định" };
    }
  }, [order?.status]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      
      let loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      setLocation(loc);

      if (loc && !hasInitialZoom) {
        mapRef.current?.animateToRegion({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }, 1000);
        setHasInitialZoom(true);
      }

      const subscriber = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 10 },
        (newLocation) => {
          setLocation(newLocation);
        }
      );

      return () => subscriber.remove();
    })();
  }, []);

  useEffect(() => {
    const getCustomerLocationAndRoute = async () => {
      if (order?.address?.address && location && !isCancelledState) {
        try {
          const addressEncoded = encodeURIComponent(order.address.address);
          const geocodeUrl = `https://rsapi.goong.io/Geocode?address=${addressEncoded}&api_key=${GOONG_API_KEY}`;
          
          const geocodeRes = await fetch(geocodeUrl);
          const geocodeData = await geocodeRes.json();

          if (geocodeData.results && geocodeData.results.length > 0) {
            const dest = geocodeData.results[0].geometry.location;
            const destCoords = { latitude: dest.lat, longitude: dest.lng };
            setCustomerCoords(destCoords);

            const origin = `${location.coords.latitude},${location.coords.longitude}`;
            const directionUrl = `https://rsapi.goong.io/Direction?origin=${origin}&destination=${dest.lat},${dest.lng}&vehicle=car&api_key=${GOONG_API_KEY}`;
            
            const directionRes = await fetch(directionUrl);
            const directionData = await directionRes.json();

            if (directionData.routes && directionData.routes.length > 0) {
              const points = directionData.routes[0].overview_polyline.points;
              const decodedPoints = polyline.decode(points).map(point => ({
                latitude: point[0],
                longitude: point[1],
              }));
              setRouteCoordinates(decodedPoints);
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    getCustomerLocationAndRoute();
  }, [order?.address?.address, !!location, isCancelledState]);

  useEffect(() => {
    if (routeCoordinates.length > 0 && hasInitialZoom && !isCancelledState) {
      mapRef.current?.fitToCoordinates(routeCoordinates, {
        edgePadding: { top: 100, right: 50, bottom: 450, left: 50 },
        animated: true,
      });
    }
  }, [routeCoordinates, hasInitialZoom, isCancelledState]);

  const handleNextStep = () => {
    if (!isOnline) {
      Alert.alert("Thông báo", "Bạn cần trực tuyến để thực hiện hành động này");
      return;
    }
    if (!order || !statusConfig.next || isCancelledState) return;

    updateStatus({ orderId: order._id, nextStatus: statusConfig.next }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['order-detail', orderId] });
        refetch();

        if (statusConfig.next === 'delivered') {
          Alert.alert("Thành công", "Đơn hàng đã hoàn tất!");
          router.back();
        }
      },
      onError: (err: any) => {
        Alert.alert("Lỗi", err?.response?.data?.message || "Cập nhật thất bại");
      }
    });
  };

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

  const isInactive = !statusConfig.next || isCancelledState || order?.status === "delivered" || order?.status === "completed";

  return (
    <View style={TrackingStyles.container}>
      <View style={TrackingStyles.mapWrapper}>
        <MapView
          ref={mapRef}
          style={TrackingStyles.map}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={false}
          initialRegion={{
            latitude: 10.762622,
            longitude: 106.660172,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {routeCoordinates.length > 0 && !isCancelledState && (
            <Polyline
              coordinates={routeCoordinates}
              strokeColor="#4cd964"
              strokeWidth={5}
              lineCap="round"
            />
          )}

          {location && (
            <Marker coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}>
              <View style={DashboardStyles.shipperMarker}>
                <View style={DashboardStyles.shipperDot} />
              </View>
            </Marker>
          )}

          {customerCoords && !isCancelledState && (
            <Marker coordinate={customerCoords} anchor={{ x: 0.5, y: 0.5 }}>
              <View style={DashboardStyles.customerMarker}>
                <View style={DashboardStyles.customerDot} />
              </View>
            </Marker>
          )}
        </MapView>

        <TouchableOpacity 
          style={{
            position: 'absolute',
            right: 20,
            bottom: 380, 
            backgroundColor: '#4CAF50',
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
          onPress={handleManualUpdate}
        >
          <MaterialCommunityIcons name="map" size={24} color="#fff" />
        </TouchableOpacity>

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

      <View style={TrackingStyles.headerContainer}>
        <View style={TrackingStyles.etaCard}>
          <View style={TrackingStyles.etaIcon}>
            <FontAwesome5 
                name={isCancelledState ? 'times-circle' : 'motorcycle'} 
                size={20} 
                color={statusConfig.color} 
            />
          </View>
          <View style={{ flex: 1, paddingLeft: 15 }}>
            <Text style={TrackingStyles.etaLabel}>TRẠNG THÁI</Text>
            <Text style={[TrackingStyles.etaTime, { color: statusConfig.color }]}>
              {statusConfig.label}
            </Text>
          </View>
          <View style={TrackingStyles.vLine} />
          <View style={{ alignItems: 'center' }}>
            <Text style={TrackingStyles.distText}>Mã đơn</Text>
            <Text style={TrackingStyles.dirValue}>#{order?._id.slice(-4).toUpperCase() || '...'}</Text>
          </View>
        </View>
      </View>

      {order && (
          <InformationTracking 
            order={order} 
            handleNextStep={handleNextStep} 
            isCancelledState={isCancelledState} 
            isInactive={isInactive} 
            isUpdating={isUpdating} 
            setShowOrderModal={setShowOrderModal}
            onOpenCancel={openCancelModal}
            statusConfig={statusConfig} 
          />
      )}

      {order && <TrackingInforModal order={order} showOrderModal={showOrderModal} setShowOrderModal={setShowOrderModal} />}

      <CancelModal 
        isModalVisible={isModalVisible} 
        setIsModalVisible={setIsModalVisible} 
        reason={reason} 
        setReason={setReason} 
        submitCancelRequest={submitCancelRequest} 
      />
    </View>
  );
}