import { FlatList, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OrderStyles } from '../css/OrderStyles';
import CancelledOrderItem from '../components/CancelledOrderItem';
import { OrderResponse, OrderDetailResponse } from '../types/api-response';
type Props = {
  orders: OrderResponse[];
};

const CancelledOrders = ({ orders }: Props) => {
  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <CancelledOrderItem order={item} />}
      contentContainerStyle={{ padding: 16 }}
      ListFooterComponent={() => (
        <View style={{ marginTop: 8 }}>
          <View style={[OrderStyles.noteBox, { backgroundColor: '#F6FFED', borderColor: '#B7EB8F' }]}>
            <Ionicons name="refresh-circle-outline" size={20} color="#52C41A" />
            <Text style={[OrderStyles.noteText, { color: '#237804' }]}>
              Đơn hàng thanh toán online sẽ được hoàn tiền trong 3-5 ngày làm việc theo quy định của VNPAY/Ngân hàng.
            </Text>
          </View>

          <View style={[OrderStyles.noteBox, { marginTop: 12, backgroundColor: '#FFF7E6', borderColor: '#FFD591' }]}>
            <Ionicons name="help-buoy-outline" size={20} color="#FA8C16" />
            <Text style={[OrderStyles.noteText, { color: '#874D00' }]}>
              Bạn lỡ tay hủy đơn? Hãy vào chi tiết đơn hàng và bấm &quot;Mua lại&quot; để chúng tôi chuẩn bị hàng sớm nhất nhé.
            </Text>
          </View>

          <View style={{ height: 40 }} />
        </View>
      )}
    />
  );
};

export default CancelledOrders;
