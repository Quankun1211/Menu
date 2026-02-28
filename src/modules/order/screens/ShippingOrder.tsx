import { FlatList, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OrderStyles } from '../css/OrderStyles';
import ShippingOrderItem from '../components/ShippingOrderItem';
import { OrderResponse } from '../types/api-response';
type Props = {
  orders: OrderResponse[];
};

const ShippingOrders = ({ orders }: Props) => {
  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <ShippingOrderItem order={item} />}
      contentContainerStyle={{ padding: 16 }}
      ListFooterComponent={() => (
        <View style={{ marginTop: 8 }}>
          {orders.length === 0 && (
            <Text style={OrderStyles.footerText}>QUÝ KHÁCH CHƯA CÓ ĐƠN HÀNG NÀO</Text>
          )}
          <View style={[OrderStyles.noteBox, { backgroundColor: '#F0F9FF', borderColor: '#BAE7FF' }]}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#1890FF" />
            <Text style={[OrderStyles.noteText, { color: '#003A8C' }]}>
              Vui lòng giữ điện thoại để Shipper liên lạc khi đơn hàng đến nơi.
            </Text>
          </View>

          <View style={[OrderStyles.noteBox, { marginTop: 5 }]}>
            <Ionicons name="cube-outline" size={20} color="#F26522" />
            <Text style={OrderStyles.noteText}>
              Được đồng kiểm khi nhận hàng. Nếu sản phẩm lỗi, bạn có quyền từ chối nhận.
            </Text>
          </View>

          <View style={{ height: 40 }} />
        </View>
      )}
    />
  )
}

export default ShippingOrders;
