import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { OrderResponse } from '../types/api-response';
import { formatDate, formatVND } from '@/utils/helper';
import useGetOrderDetail from '../hooks/useGetOrderDetail';
import { router } from "expo-router"
interface Props {
  order: OrderResponse;
}

const CancelledOrderItem = ({ order }: Props) => {
  const { data, isPending } = useGetOrderDetail(order._id)
  const handleCheckout = () => {
    router.push({
      pathname: "/(details)/checkoutTabs/CheckOutTabs",
      params: {
        source: "cart",
        items: JSON.stringify(
          data?.data.items.map(i => ({
            productId: i.productId,
            quantity: i.quantity,
          }))
        ),
      },
    });
  }
  
  
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={{uri: order.thumbnail}} style={styles.bannerImage} />
        <View style={styles.cancelledBadge}>
          <Text style={styles.cancelledBadgeText}>ĐÃ HỦY</Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.cancelReasonType}>
          HẾT HÀNG
          {order.cancelRequest?.isAccepted && order.cancelRequest.reason}
          {/* {order.cancelledBy === "admin" ? "HẾT HÀNG" : ""} */}
        </Text>
        
        <Text style={styles.orderCode}>Mã đơn: #VN-{order._id.slice(-5).toUpperCase()}</Text>
        <Text style={styles.subInfo}>{formatDate(order.cancelledAt)} • {formatVND(order.totalPrice)}</Text>
        
        <Text style={styles.reasonText} numberOfLines={2}>
          Lý do: {order.cancelledBy === "user" ? order.cancelReason : (order.cancelRequest?.isAccepted && "HỆ THỐNG - " + order.cancelRequest.reason)}
        </Text>

        <View style={styles.footer}>
          <TouchableOpacity 
            onPress={handleCheckout}
            style={styles.reorderBtn}>
            <MaterialCommunityIcons name="refresh" size={18} color="#fff" />
            <Text style={styles.reorderBtnText}>Đặt lại</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 24,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  imageWrapper: {
    width: '100%',
    height: 160,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
  },
  cancelledBadge: {
    position: 'absolute',
    top: 15,
    right: -25,
    backgroundColor: 'rgba(211, 118, 76, 0.9)',
    paddingHorizontal: 40,
    paddingVertical: 5,
    transform: [{ rotate: '30deg' }],
  },
  cancelledBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  body: {
    padding: 16,
  },
  cancelReasonType: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#D3764C',
    marginBottom: 4,
  },
  orderCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  subInfo: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  reasonText: {
    fontSize: 13,
    color: '#999',
    fontStyle: 'italic',
    lineHeight: 18,
    marginBottom: 15,
  },
  footer: {
    alignItems: 'flex-end',
  },
  reorderBtn: {
    backgroundColor: '#D3764C',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 25,
  },
  reorderBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 6,
  },
});

export default CancelledOrderItem;