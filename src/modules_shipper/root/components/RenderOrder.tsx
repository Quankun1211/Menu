import { View, Text, TouchableOpacity } from "react-native";
import { DashboardStyles } from "../css/DashboardStyles";
import { formatVND } from "@/utils/helper";
import { OrderResponse } from "@/modules/order/types/api-response";

interface RenderOrderProps {
  item: OrderResponse;
  onNextStep: (id: string) => void;
  onOpenCancel: (id: string) => void;
  onViewDetail: (id: string) => void;
}

const RenderOrder = ({ item, onNextStep, onOpenCancel, onViewDetail }: RenderOrderProps) => {
  const isFinished = item.status === "delivered" || item.status === "completed";
  const isPendingCancel = item.status === "pending_cancel";
  const isAssigned = item.status === "assigned";

  const getButtonConfig = (status: OrderResponse["status"]) => {
    switch (status) {
      case "assigned": return { text: "XÁC NHẬN ĐƠN", color: "#FF8C00" };
      case "confirmed": return { text: "ĐÃ LẤY HÀNG", color: "#007AFF" };
      case "shipping": return { text: "HOÀN THÀNH", color: "#28a745" };
      case "pending_cancel": return { text: "CHỜ HỦY...", color: "#666" };
      case "delivered":
      case "completed": return { text: "ĐÃ GIAO HÀNG", color: "#333" };
      default: return { text: "LIÊN HỆ ADMIN", color: "#555" };
    }
  };

  const config = getButtonConfig(item.status);

  return (
    <View style={[DashboardStyles.orderCard, (isPendingCancel || isFinished) && { opacity: 0.8 }]}>
      {/* Bao bọc phần nội dung bằng Touchable để xem chi tiết */}
      <TouchableOpacity 
        activeOpacity={0.7} 
        onPress={() => onViewDetail(item._id)}
      >
        <View style={DashboardStyles.orderRow}>
          <Text style={DashboardStyles.serviceType}>{item.productSummary || "GIAO HÀNG"}</Text>
          <Text style={DashboardStyles.priceText}>{formatVND(item.totalPrice)}</Text>
        </View>

        <View style={DashboardStyles.addressContainer}>
          <View style={DashboardStyles.addressLine}>
            <Text style={DashboardStyles.addressLabel}>LẤY HÀNG</Text>
            <Text style={DashboardStyles.addressValue}>Kho hàng hệ thống</Text>
          </View>
          
          <View style={DashboardStyles.addressLine}>
            <Text style={[DashboardStyles.addressLabel, { marginTop: 10 }]}>GIAO HÀNG</Text>
            <Text style={DashboardStyles.customerInfo}>
              {item.address?.name} - {item.address?.phone}
            </Text>
            <Text style={DashboardStyles.addressValue}>
              {item.address?.address || "Địa chỉ không xác định"}
            </Text>
          </View>
        </View>

        {isPendingCancel && (
          <View style={DashboardStyles.cancelInfoBox}>
            <Text style={DashboardStyles.cancelInfoText}>Lý do hủy: {item.cancelRequest?.reason}</Text>
          </View>
        )}
        
        {/* Chỉ dẫn nhỏ để người dùng biết có thể nhấn vào */}
        <Text style={{ fontSize: 12, color: '#007AFF', marginTop: 10, textAlign: 'right' }}>
          Xem chi tiết đơn hàng {">"}
        </Text>
      </TouchableOpacity>

      <View style={[DashboardStyles.actionRow, { marginTop: 15 }]}>
        {isAssigned && (
          <TouchableOpacity 
            style={DashboardStyles.cancelBtn} 
            onPress={() => onOpenCancel(item._id)}
          >
            <Text style={DashboardStyles.cancelText}>HỦY ĐƠN</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={[
            DashboardStyles.acceptBtn, 
            { backgroundColor: config.color },
            (!isAssigned || isFinished || isPendingCancel) && { flex: 1 }
          ]} 
          onPress={() => !isPendingCancel && !isFinished && onNextStep(item._id)}
          disabled={isPendingCancel || isFinished}
        >
          <Text style={DashboardStyles.acceptText}>{config.text}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RenderOrder;