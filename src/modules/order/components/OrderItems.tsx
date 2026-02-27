import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OrderStyles } from '../css/OrderStyles';
import { router } from "expo-router";
import { OrderResponse } from '../types/api-response';
import { formatDate, formatVND } from '@/utils/helper';

interface OrderItemProps {
  order: OrderResponse;
}

const OrderItem = ({ order }: OrderItemProps) => {

  const getStatusColor = () => {
    switch (order.status) {
      case 'confirmed':
        return ["Đã xác nhận", '#1890FF'];
      case 'shipping':
        return ["Đang giao", '#F26522'];
      case 'delivered':
        return ["Đã hoàn thành", '#4CAF50'];
      case 'cancelled':
        return ["Đã hủy", '#9E9E9E'];
      default:
        return ["Đang xử lý", "#000"];
    }
  };

  const handleRecall = () => {
    const itemsToCheckout = order.itemsForRebuy
      .map(i => ({
        productId: i.productId,
        quantity: i.quantity,
      }));

    router.push({
      pathname: "/(details)/checkoutTabs/CheckOutTabs",
      params: {
        source: "cart",
        items: JSON.stringify(itemsToCheckout),
      },
    });
    console.log(order.itemsForRebuy);
  }

  return (
    <View style={OrderStyles.card}>
      <View style={OrderStyles.contentRow}>
        <View style={OrderStyles.infoCol}>
          <View style={OrderStyles.statusRow}>
            <View style={[OrderStyles.dot, { backgroundColor: getStatusColor()[1] }]} />
            <Text style={[OrderStyles.statusText, { color: getStatusColor()[1] }]}>{getStatusColor()[0]}</Text>
          </View>

          <Text style={OrderStyles.orderCode}>Đơn hàng #VN-{order._id.slice(-5).toUpperCase()}</Text>
          <Text style={OrderStyles.subInfo}>{formatDate(order.createdAt)} • {formatVND(order.totalPrice)}</Text>

          <View style={OrderStyles.buttonGroup}>
            {(order.status === 'pending' || order.status === 'confirmed') && (
              <TouchableOpacity onPress={() =>
                router.push({
                  pathname: "/(details)/orderTabs/OrderTabs",
                  params: { orderId: order._id }
                })}
                style={OrderStyles.detailBtnPending}>
                <Text style={OrderStyles.detailBtnTextPending}>Chi tiết</Text>
                <Ionicons name="information-circle" size={14} color="#555" style={{ marginLeft: 4 }} />
              </TouchableOpacity>
            )}

            {order.status === 'shipping' && (
              <TouchableOpacity onPress={() =>
                router.push({
                  pathname: "/(details)/orderTabs/OrderTabs",
                  params: { orderId: order._id }
                })}
                style={OrderStyles.primaryBtn}>
                <Text style={OrderStyles.primaryBtnText}>Theo dõi</Text>
                <Ionicons name="chevron-forward" size={14} color="#fff" />
              </TouchableOpacity>
            )}

            {order.status === 'delivered' && (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity 
                  style={OrderStyles.secondaryBtn}
                  onPress={handleRecall}
                >
                  <Text style={OrderStyles.secondaryBtnText}>Mua lại</Text>
                  <Ionicons name="refresh-outline" size={14} color="#F26522" style={{ marginLeft: 4 }} />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={OrderStyles.moreBtn}
                  onPress={() => router.push({
                    pathname: "/(details)/orderTabs/OrderTabs",
                    params: {orderId: order._id}
                  })}
                >
                  <Ionicons name="ellipsis-horizontal" size={16} color="#555" />
                </TouchableOpacity>
              </View>
            )}

            {order.status === 'cancelled' && (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={OrderStyles.detailBtn}>
                  <Text style={OrderStyles.detailBtnText}>Đặt lại</Text>
                  <Ionicons name="refresh" size={14} color="#fff" style={{ marginLeft: 4 }} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    router.push(
                      {
                        pathname: "/(details)/orderTabs/OrderTabs",
                        params: { orderId: order._id }
                      })}
                  style={OrderStyles.moreBtn}>
                  <Ionicons name="ellipsis-horizontal" size={16} color="#555" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <Image source={{ uri: order.thumbnail }} style={OrderStyles.productImage} />
      </View>
    </View>
  );
};

export default OrderItem;