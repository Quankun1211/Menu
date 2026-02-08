import { ScrollView, View, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import DeliveryStatus from "../components/DeliveryStatus";
import { Ionicons } from "@expo/vector-icons";
import OrderItemDetail from "../components/OrderItemDetail";
import { OrderItemStyles } from "../css/OrderItemStyles";
import useGetOrderDetail from "../hooks/useGetOrderDetail";
import { formatVND } from "@/utils/helper";
import { useState } from "react";
import { CancelOrderModal } from "@/components/common/CancelModal";
import useCancelOrder from "../hooks/useCancelOrder";

type OrderProps = {
  orderId?: string;
};

export default function OrderDetailScreen({ orderId }: OrderProps) {
  const { data, isPending } = useGetOrderDetail(orderId);
  const [isModalVisible, setModalVisible] = useState(false);

  const { mutate: cancelOrder, isPending: cancelPending } = useCancelOrder();

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

  const order = data?.data;
  if (!order) return null;

  const status = order.status ?? "pending";
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

        <DeliveryStatus currentStatus={status} orderData={order} />

        {order.paymentStatus === "refunded" && (
          <View style={[OrderItemStyles.sectionCard, { borderColor: "#B7EB8F", borderWidth: 1, backgroundColor: "#F6FFED" }]}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="information-circle" size={20} color="#52C41A" />
              <Text style={{ marginLeft: 8, color: "#52C41A", fontWeight: "bold" }}>Thông tin hoàn tiền</Text>
            </View>
            <Text style={{ marginTop: 5, fontSize: 13, color: "#666", lineHeight: 18 }}>
              Hệ thống đã thực hiện hoàn trả {formatVND(order.totalPrice)} về tài khoản của bạn qua cổng VNPAY. 
              Tiền sẽ được ghi nhận trong vòng 3-5 ngày làm việc tùy thuộc vào ngân hàng.
            </Text>
          </View>
        )}

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
          <Image source={require("../../../assets/test/origin.jpg")} style={OrderItemStyles.mapSnippet} />
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
              {order.paymentStatus === "refunded" ? "ĐÃ HOÀN TIỀN" : "ĐÃ THANH TOÁN"}
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