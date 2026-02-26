import { Modal, View, Text, TouchableOpacity, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { TrackingStyles } from "../css/TrackingStyles"
import { OrderDetailResponse } from "@/modules/order/types/api-response"
import { formatVND } from "@/utils/helper"

interface TrackingInforProps {
    showOrderModal: boolean,
    setShowOrderModal: (show: boolean) => void,
    order: OrderDetailResponse
}
const TrackingInforModal = ({ showOrderModal, setShowOrderModal, order } : TrackingInforProps) => {
  return (
    <Modal
        visible={showOrderModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowOrderModal(false)}
      >
        <View style={TrackingStyles.modalOverlay}>
          <View style={TrackingStyles.modalContent}>
            <View style={TrackingStyles.modalHeader}>
              <Text style={TrackingStyles.modalTitle}>Chi tiết đơn hàng</Text>
              <TouchableOpacity onPress={() => setShowOrderModal(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 400 }}>
              {order?.items?.map((item: any, index: number) => (
                <View key={index} style={TrackingStyles.orderItem}>
                  <View style={{ flex: 1 }}>
                    <Text style={TrackingStyles.itemName}>{item.productName || item.name}</Text>
                    <Text style={TrackingStyles.itemQty}>Số length: {item.quantity}</Text>
                  </View>
                  <Text style={TrackingStyles.itemPrice}>{formatVND(item.price * item.quantity)}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={TrackingStyles.modalFooter}>
              <View style={TrackingStyles.totalRow}>
                <Text style={TrackingStyles.totalLabel}>Tổng cộng:</Text>
                <Text style={TrackingStyles.totalValue}>{formatVND(order?.totalPrice ?? 0)}</Text>
              </View>
              <TouchableOpacity 
                style={TrackingStyles.closeBtn} 
                onPress={() => setShowOrderModal(false)}
              >
                <Text style={TrackingStyles.closeBtnText}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
  )
}

export default TrackingInforModal