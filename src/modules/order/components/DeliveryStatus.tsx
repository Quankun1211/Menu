import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { OrderItemStyles } from "../css/OrderItemStyles";
import { formatDate, formatStepTime } from "@/utils/helper";
import { OrderResponse } from "../types/api-response";
interface DeliveryStatusProps {
  currentStatus: string;
  orderData: OrderResponse; 
}

const DeliveryStatus = ({ currentStatus, orderData }: DeliveryStatusProps) => {
  const getStepStatus = (stepIndex: number) => {
    const statusPriority: Record<string, number> = {
      'pending': 0,
      'confirmed': 1,
      'processing': 1,
      'shipping': 2,
      'delivered': 3,
      'cancelled': -1,
      'refunded': -1
    };
    const currentPriority = statusPriority[currentStatus] ?? 0;
    return {
      completed: currentPriority > stepIndex,
      active: currentPriority === stepIndex
    };
  };

  const steps = [
    { 
      title: 'Đơn hàng đã đặt', 
      time: formatDate(orderData?.createdAt) + " - " + formatStepTime(orderData?.createdAt), 
      icon: 'basket' as const 
    },
    { 
      title: 'Đang chuẩn bị hàng', 
      time: formatStepTime(orderData?.shippedAt || orderData?.updatedAt), 
      icon: 'restaurant' as const 
    },
    { 
      title: 'Đang giao hàng', 
      time: formatStepTime(orderData?.shippedAt), 
      subtitle: 'Tài xế đang đến gần điểm giao', 
      icon: 'bicycle' as const 
    },
    { 
      title: 'Đã giao thành công', 
      time:  orderData?.deliveredAt && (formatDate(orderData?.deliveredAt) + " - " + formatStepTime(orderData?.deliveredAt)), 
      icon: 'home' as const 
    },
  ];

  return (
    <View style={OrderItemStyles.sectionCard}>
      <Text style={OrderItemStyles.sectionTitle}>Delivery Status</Text>
      {steps.map((step, index) => {
        const { completed, active } = getStepStatus(index);
        
        return (
          <View key={index} style={OrderItemStyles.stepContainer}>
            <View style={OrderItemStyles.stepLeft}>
              <View style={[
                OrderItemStyles.iconCircle, 
                (completed || active) && OrderItemStyles.activeCircle
              ]}>
                <Ionicons 
                  name={step.icon} 
                  size={18} 
                  color={completed || active ? '#F26522' : '#CCC'} 
                />
              </View>
              {index !== steps.length - 1 && (
                <View style={[
                  OrderItemStyles.line, 
                  completed && OrderItemStyles.activeLine
                ]} />
              )}
            </View>
            <View style={OrderItemStyles.stepRight}>
              <Text style={[
                OrderItemStyles.stepTitle, 
                active && { fontWeight: 'bold', color: '#F26522' }
              ]}>
                {step.title}
              </Text>
              
              {step.time ? (
                <Text style={OrderItemStyles.stepTime}>{step.time}</Text>
              ) : (
                index === 3 && !completed && <Text style={OrderItemStyles.stepTime}>Dự kiến: --:--</Text>
              )}

              {step.subtitle && active && <Text style={OrderItemStyles.stepSubtitle}>{step.subtitle}</Text>}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default DeliveryStatus;