import { FlatList, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OrderStyles } from '../css/OrderStyles';
import { OrderResponse } from '../types/api-response';
import CompletedOrderItem from '../components/CompletedOrderItem';
type Props = {
  orders: OrderResponse[];
};

const CompletedOrders = ({ orders }: Props) => {
  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <CompletedOrderItem order={item} />}
      contentContainerStyle={{ padding: 16 }}
      ListFooterComponent={() => (
        <View style={{ marginTop: 8 }}>
          {orders.length === 0 && (
            <Text style={OrderStyles.footerText}>QUÝ KHÁCH CHƯA CÓ ĐƠN HÀNG NÀO</Text>
          )}
          <View style={[OrderStyles.noteBox, { backgroundColor: '#FFF2E8', borderColor: '#FFD8BF' }]}>
            <Ionicons name="heart-outline" size={20} color="#F26522" />
            <Text style={[OrderStyles.noteText, { color: '#D46B08' }]}>
              Cảm ơn bạn đã lựa chọn Bếp Việt. Hy vọng bạn có một bữa ăn ngon miệng và hài lòng với những sản phẩm chúng tôi mang đến!
            </Text>
          </View>

          <View style={{ height: 40 }} />
        </View>
      )}
    />
  );
};

export default CompletedOrders;
