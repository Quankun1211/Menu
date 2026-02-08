import { FlatList, View, Text } from 'react-native';
import OrderItem from '../components/OrderItems';
import { OrderStyles } from '../css/OrderStyles';
import { OrderResponse } from '../types/api-response';
type Props = {
  orders: OrderResponse[];
};

const AllOrders = ({ orders }: Props) => {
  
  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <OrderItem order={item} />}
      contentContainerStyle={{ padding: 16 }}
      ListFooterComponent={() => (
        <View style={OrderStyles.footer}>
          <Text style={OrderStyles.footerText}>CẢM ƠN QUÝ KHÁCH</Text>
        </View>
      )}
    />
  );
};

export default AllOrders;
