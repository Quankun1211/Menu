import { ScrollView, View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import DeliveryStatus from "../components/DeliveryStatus";
import { Ionicons } from "@expo/vector-icons";
import OrderItemDetail from "../components/OrderItemDetail";
import { OrderItemStyles } from "../css/OrderItemStyles";
import useGetOrderDetail from "../hooks/useGetOrderDetail";
import { formatVND } from "@/utils/helper";
import { CancelOrderModal } from "@/components/common/CancelModal";
import useCancelOrder from "../hooks/useCancelOrder";
import Constants from 'expo-constants';
import { DashboardStyles } from "@/modules_shipper/root/css/DashboardStyles";

type OrderProps = {
  orderId?: string;
};

export default function OrderDetailScreen({ orderId }: OrderProps) {
  const mapRef = useRef<MapView>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const { data, isPending } = useGetOrderDetail(orderId);
  const [isModalVisible, setModalVisible] = useState(false);
  const [mapRegion, setMapRegion] = useState<any>(null);
  const [loadingMap, setLoadingMap] = useState(true);
  const [shipperCoords, setShipperCoords] = useState<any>(null);

  const { mutate: cancelOrder, isPending: cancelPending } = useCancelOrder();

  const order = data?.data;
  const status = order?.status ?? "pending";

  useEffect(() => {
    if (order?.lastKnownLocation) {
      setShipperCoords({
        latitude: order.lastKnownLocation.latitude,
        longitude: order.lastKnownLocation.longitude,
      });
    }
  }, [order]);

  useEffect(() => {
    const geocodeAddress = async () => {
      const address = order?.address?.address;
      if (address) {
        try {
          const result = await Location.geocodeAsync(address);
          if (result && result.length > 0) {
            setMapRegion({
              latitude: result[0].latitude,
              longitude: result[0].longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            });
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoadingMap(false);
        }
      } else {
        setLoadingMap(false);
      }
    };
    if (order) {
      geocodeAddress();
    }
  }, [order]);

  useEffect(() => {
    if (isMapReady && mapRef.current && mapRegion && status === "shipping" && shipperCoords) {
      mapRef.current.fitToCoordinates(
        [
          { latitude: mapRegion.latitude, longitude: mapRegion.longitude },
          shipperCoords
        ],
        {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        }
      );
    }
  }, [isMapReady, shipperCoords, mapRegion, status]);

  const getBannerInfo = (status: string, paymentStatus?: string) => {
    if (paymentStatus === "refunded") {
      return {
        title: "Đã hoàn tiền",
        sub: "Tiền đã được hoàn lại thành công",
        icon: "arrow-undo-circle",
        color: "#4CAF50",
      };
    }
    switch (status) {
      case "delivered":
        return { title: "Giao hàng thành công", sub: "Đơn hàng đã được giao", icon: "checkmark-circle", color: "#F26522" };
      case "shipping":
        return { title: "Đang giao hàng", sub: "Người giao hàng đang đến", icon: "bicycle", color: "#F26522" };
      case "cancelled":
        return { title: "Đã hủy đơn", sub: "Đơn hàng đã được hủy thành công", icon: "close-circle", color: "#FF4D4F" };
      default:
        return { title: "Đang xử lý", sub: "Chúng tôi đang chuẩn bị thủ tục", icon: "time", color: "#F26522" };
    }
  };

  const handleConfirmCancel = (reason: string) => {
    cancelOrder({
      orderId: orderId,
      reason: reason,
    });
    setModalVisible(false);
  };

  if (isPending) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#F26522" />
        <Text>Đang tải thông tin đơn hàng...</Text>
      </View>
    );
  }

  if (!order) return null;

  const banner = getBannerInfo(status, order.paymentStatus);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={OrderItemStyles.container} showsVerticalScrollIndicator={false}>
        <View style={[OrderItemStyles.statusBanner, banner.title === "Đã hoàn tiền" && { backgroundColor: "#F6FFED", borderColor: "#B7EB8F" }]}>
          <View>
            <Text style={[OrderItemStyles.bannerTitle, { color: banner.color }]}>{banner.title}</Text>
            <Text style={OrderItemStyles.bannerSub}>{banner.sub}</Text>
          </View>
          <View style={[OrderItemStyles.bikeIconBg, banner.title === "Đã hoàn tiền" && { backgroundColor: "#E8FFEA" }]}>
            <Ionicons name={banner.icon as any} size={24} color={banner.color} />
          </View>
        </View>

        <DeliveryStatus currentStatus={status} orderData={order as any} />
        
        <View style={OrderItemStyles.sectionCard}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <View style={OrderItemStyles.locationCircle}>
              <Ionicons name="location" size={20} color="#4CAF50" />
            </View>
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={OrderItemStyles.addressText} numberOfLines={2} ellipsizeMode="tail">
                {order.address?.address}
              </Text>
            </View>
          </View>

          {loadingMap ? (
            <ActivityIndicator style={OrderItemStyles.mapSnippet} />
          ) : mapRegion ? (
            <View style={{ position: 'relative' }}>
              <MapView
                ref={mapRef}
                onMapReady={() => setIsMapReady(true)}
                style={[OrderItemStyles.mapSnippet, { borderRadius: 12 }]}
                initialRegion={mapRegion}
                scrollEnabled={status !== "delivered"}
                zoomEnabled={status !== "delivered"}
                rotateEnabled={status !== "delivered"}
                pitchEnabled={status !== "delivered"}
                scrollDuringRotateOrZoomEnabled={status !== "delivered"}
              >
                <Marker 
                  coordinate={{ latitude: mapRegion.latitude, longitude: mapRegion.longitude }}
                >
                  <View style={DashboardStyles.customerMarker}>
                    <View style={DashboardStyles.customerDot} />
                  </View>
                </Marker>

                {shipperCoords && typeof shipperCoords.latitude === 'number' && typeof shipperCoords.longitude === 'number' && (
                  <Marker
                    coordinate={shipperCoords}
                  >
                    <View style={DashboardStyles.shipperMarker}>
                      <View style={DashboardStyles.shipperDot} />
                    </View>
                  </Marker>
                )}
              </MapView>
              
              {status === "delivered" && (
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    borderRadius: 12,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{ color: '#888', fontWeight: 'bold', backgroundColor: '#fff', padding: 8, borderRadius: 8 }}>Đơn hàng đã hoàn tất</Text>
                </View>
              )}

              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12, marginBottom: 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
                  <View style={DashboardStyles.customerMarker}>
                    <View style={DashboardStyles.customerDot} />
                  </View>
                  <Text style={{ marginLeft: 6, fontSize: 12, color: '#666' }}>Địa chỉ giao</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
                  <View style={DashboardStyles.shipperMarker}>
                      <View style={DashboardStyles.shipperDot} />
                    </View>
                  <Text style={{ marginLeft: 6, fontSize: 12, color: '#666' }}>Shipper</Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={[OrderItemStyles.mapSnippet, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' }]}>
                <Text>Không tải được bản đồ</Text>
            </View>
          )}
        </View>

        <View style={OrderItemStyles.sectionCard}>
          <View style={OrderItemStyles.rowBetween}>
            <Text style={OrderItemStyles.sectionTitle}>Sản phẩm ({order.items?.length ?? 0})</Text>
            <View style={OrderItemStyles.tagGreen}>
              <Text style={OrderItemStyles.tagText}>Organic Certified</Text>
            </View>
          </View>
          {order.items?.map((item: any) => (
            <OrderItemDetail key={item.productId} orderDetail={item} />
          ))}
        </View>

        <View style={OrderItemStyles.sectionCard}>
          <Text style={OrderItemStyles.sectionTitle}>Tổng thanh toán</Text>
          <View style={OrderItemStyles.summaryRow}>
            <Text>Tạm tính</Text>
            <Text>{formatVND(order.totalPrice ?? 0)}</Text>
          </View>
          <View style={[OrderItemStyles.summaryRow, { marginTop: 15 }]}>
            <Text style={OrderItemStyles.totalLabel}>Tổng cộng</Text>
            <Text style={OrderItemStyles.totalPrice}>{formatVND(order.totalPrice ?? 0)}</Text>
          </View>

          <View style={[OrderItemStyles.paymentMethod, order.paymentStatus === "refunded" && { backgroundColor: "#F5F5F5" }]}>
            <Ionicons 
              name={order.paymentStatus === "refunded" ? "refresh-circle" : "wallet"} 
              size={20} 
              color={order.paymentStatus === "refunded" ? "#52C41A" : "#A52263"} 
            />
            <Text style={OrderItemStyles.paymentText}>
              Thanh toán: {order.paymentMethod?.toUpperCase()}
            </Text>
            <Text style={[OrderItemStyles.paidText, order.paymentStatus === "refunded" && { color: "#52C41A" }]}>
              {order.paymentStatus === "refunded" && "ĐÃ HOÀN TIỀN"}
              {order.paymentStatus === "pending" && "CHƯA THANH TOÁN"}
              {order.paymentStatus === "paid" && "ĐÃ THANH TOÁN"}
            </Text>
          </View>
        </View>

        <View style={{ paddingHorizontal: 16, marginBottom: 40, marginTop: 10 }}>
          {["pending", "confirmed", "processing"].includes(status) ? (
            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                borderWidth: 1.5,
                borderColor: "#FF4D4F",
                paddingVertical: 14,
                borderRadius: 12,
                alignItems: "center",
                marginBottom: 10,
              }}
              onPress={() => setModalVisible(true)}
              disabled={cancelPending}
            >
              {cancelPending ? (
                <ActivityIndicator size="small" color="#FF4D4F" />
              ) : (
                <Text style={{ color: "#FF4D4F", fontWeight: "bold", fontSize: 16 }}>
                  {order.paymentStatus === "paid" ? "Hủy đơn & Hoàn tiền" : "Hủy đơn hàng"}
                </Text>
              )}
            </TouchableOpacity>
          ) : (
            status !== "delivered" && (
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#F5F5F5", padding: 12, borderRadius: 8 }}>
                <Ionicons name="information-circle-outline" size={18} color="#888" />
                <Text style={{ color: "#888", marginLeft: 6, fontSize: 13 }}>
                  {status === "cancelled" ? "Đơn hàng đã bị hủy" : "Đơn hàng đang xử lý và không thể hủy"}
                </Text>
              </View>
            )
          )}
        </View>
      </ScrollView>

      <CancelOrderModal isVisible={isModalVisible} onClose={() => setModalVisible(false)} onConfirm={handleConfirmCancel} />
    </View>
  );
}