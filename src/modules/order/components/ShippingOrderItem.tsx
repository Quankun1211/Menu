import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { OrderItemStyles } from '../css/OrderItemStyles';
import { router } from "expo-router"
import { OrderResponse } from '../types/api-response';
import { formatVND } from '@/utils/helper';
interface Props {
  order: OrderResponse;
}

const ShippingOrderItem = ({ order }: Props) => {
  
  return (
    <View style={OrderItemStyles.shippingCard}>
      <View style={OrderItemStyles.mapHeader}>
        <Image 
          source={require("../../../assets/test/origin.jpg")} 
          style={{ width: '100%', height: '100%' }}
        />
        <View style={OrderItemStyles.timeTag}>
          <Ionicons name="time" size={16} color="#32CD32" />
          <Text style={OrderItemStyles.timeTagText}>Giao trong 15 phút</Text>
        </View>
      </View>

      <View style={OrderItemStyles.shippingBody}>
        {/* Header Info */}
        <View style={OrderItemStyles.statusHeaderRow}>
          <View>
            <Text style={OrderItemStyles.shippingStatusText}>Đang vận chuyển</Text>
            <Text style={OrderItemStyles.shippingOrderCode}>Đơn hàng #XXX</Text>
          </View>
          <View style={OrderItemStyles.bikeIconCircle}>
            <MaterialCommunityIcons name="bike" size={24} color="#32CD32" />
          </View>
        </View>

        {/* Mini Address Card */}
        <View style={OrderItemStyles.addressMiniCard}>
          <View style={{ backgroundColor: '#E8F5E9', padding: 8, borderRadius: 12 }}>
            <Ionicons name="location" size={20} color="#32CD32" />
          </View>
          <View style={OrderItemStyles.addressInfo}>
            <Text style={OrderItemStyles.addressMain} numberOfLines={1}>{order?.address.address}</Text>
            <Text style={OrderItemStyles.addressSub} numberOfLines={1}>{order?.productSummary}</Text>
          </View>
        </View>

        {/* Bottom Row */}
        <View style={OrderItemStyles.footerRow}>
          <Text style={OrderItemStyles.priceText}>{formatVND(order.totalPrice)}</Text>
          <TouchableOpacity onPress={() => 
            router.push(
            {
              pathname: "/(details)/orderTabs/OrderTabs",
              params: {orderId: order._id}
            }
            )} style={OrderItemStyles.followBtn}>
            <Text style={OrderItemStyles.followBtnText}>Theo dõi</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ShippingOrderItem;