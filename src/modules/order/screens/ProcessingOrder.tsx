import { FlatList, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProcessingOrderItem from '../components/ProcessingOrderItem';
import { OrderStyles } from '../css/OrderStyles';
import { OrderResponse } from '../types/api-response';
type Props = {
  orders: OrderResponse[];
};

const ProcessingOrders = ({ orders }: Props) => {
  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <ProcessingOrderItem order={item} />}
      contentContainerStyle={{ padding: 16 }}
      ListFooterComponent={() => (
        <View>
          <View style={OrderStyles.noteBox}>
            <Ionicons name="information-circle" size={20} color="#F26522" />
            <Text style={OrderStyles.noteText}>
              Các đơn hàng đang xử lý thường mất từ 15–30 phút để xác nhận.
            </Text>
          </View>
        </View>
      )}
    />
  );
};

export default ProcessingOrders;
