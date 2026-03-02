import { View, Text, TouchableOpacity, ActivityIndicator, Alert, Linking } from "react-native"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { TrackingStyles } from "../css/TrackingStyles"
import { DashboardStyles } from "../css/DashboardStyles"
import { OrderDetailResponse } from "@/modules/order/types/api-response"

interface InformationTrackingProps {
    order: OrderDetailResponse,
    isCancelledState: boolean,
    setShowOrderModal: (show: boolean) => void,
    statusConfig: {
        text: string;
        next: string | null; 
        color: string;
        label: string;
    };
    isInactive: boolean, 
    handleNextStep: () => void, 
    isUpdating: boolean,
    onOpenCancel: () => void,
}

const InformationTracking = ({ 
    order, 
    isCancelledState, 
    setShowOrderModal, 
    statusConfig, 
    isInactive, 
    handleNextStep, 
    isUpdating,
    onOpenCancel 
} : InformationTrackingProps) => {

    const handleCall = (phoneNumber?: string) => {
      if (!phoneNumber) {
        Alert.alert("Lỗi", "Không tìm thấy số điện thoại khách hàng");
        return;
      }
      const url = `tel:${phoneNumber}`;
      Linking.canOpenURL(url)
        .then((supported) => {
          if (!supported) {
            Alert.alert("Lỗi", "Thiết bị của bạn không hỗ trợ chức năng gọi điện");
          } else {
            return Linking.openURL(url);
          }
        })
        .catch((err) => console.error("An error occurred", err));
    };

    return (
    <View style={{ position: 'absolute', bottom: 30, left: 20, right: 20, backgroundColor: 'white', borderRadius: 20, padding: 20, elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 10 }}>
          <View style={TrackingStyles.userInfo}>
            <View style={{ flex: 1 }}>
              <Text style={TrackingStyles.userName}>{order?.address?.name || 'Đang tải...'}</Text>
              <Text style={[TrackingStyles.userPhone, { marginTop: 4 }]} numberOfLines={1}>
                SĐT: {order?.address?.phone}
              </Text>
              <Text style={[TrackingStyles.userAddr, { marginTop: 4 }]} numberOfLines={1}>
                ĐC : {order?.address?.address}
              </Text>
            </View>
            <TouchableOpacity 
                style={[TrackingStyles.callCircle, isCancelledState && { backgroundColor: '#f0f0f0', opacity: 0.5 }]}
                disabled={isCancelledState}
                onPress={() => handleCall(order?.address?.phone)}
            >
              <Ionicons name="call" size={20} color={isCancelledState ? "#ccc" : "black"} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              paddingVertical: 10, 
              borderTopWidth: 1, 
              borderTopColor: '#f0f0f0',
              opacity: isCancelledState ? 0.6 : 1
            }}
            onPress={() => !isCancelledState && setShowOrderModal(true)}
            disabled={isCancelledState}
          >
            <MaterialCommunityIcons name="clipboard-text-outline" size={20} color={isCancelledState ? "#ccc" : "#666"} />
            <Text style={{ flex: 1, marginLeft: 10, color: isCancelledState ? "#ccc" : '#444', fontWeight: '500' }}>
                {isCancelledState ? "Không thể xem chi tiết đơn đã hủy" : "Xem chi tiết đơn hàng"}
            </Text>
            {!isCancelledState && <Ionicons name="chevron-forward" size={18} color="#999" />}
          </TouchableOpacity>

          <View style={{ marginTop: 15, flexDirection: 'row', gap: 10 }}>
            {order?.status === 'assigned' && (
                <TouchableOpacity 
                    style={{ 
                        flex: 1,
                        height: 50, 
                        borderRadius: 12, 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        backgroundColor: '#ff4d4f'
                    }} 
                    onPress={onOpenCancel}
                >
                    <Text style={{ fontSize: 16, fontWeight: '700', color: 'white' }}>
                        Hủy đơn
                    </Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity 
              style={[
                DashboardStyles.acceptBtn, 
                { 
                    flex: order?.status === 'assigned' ? 2 : 1,
                    height: 50, 
                    borderRadius: 12, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    backgroundColor: statusConfig.color
                },
                isInactive && { backgroundColor: '#e0e0e0', opacity: 0.8 }
              ]} 
              onPress={handleNextStep}
              disabled={isInactive || isUpdating}
            >
              {isUpdating ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={[DashboardStyles.acceptText, { fontSize: 16, fontWeight: '700', color: isInactive ? '#999' : 'white' }]}>
                  {statusConfig.text}
                </Text>
              )}
            </TouchableOpacity>
          </View>
      </View>
    )
}

export default InformationTracking