import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { OrderResponse } from '../types/api-response';
import { formatDate, formatStepTime, formatVND } from '@/utils/helper';
import { router } from "expo-router"
import useGetOrderDetail from '../hooks/useGetOrderDetail';
interface Props {
  order: OrderResponse;
}
const CompletedOrderItem = ({ order }: Props) => {
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
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.orderId}>#VN-{order._id.slice(-5).toUpperCase()}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>Đã hoàn thành</Text>
        </View>
      </View>

      <Text style={styles.dateTime}>{formatDate(order?.deliveredAt) + " - " + formatStepTime(order?.deliveredAt)}</Text>

      <View style={styles.mainContent}>
        <Image source={{ uri: order.thumbnail }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{order.productSummary}</Text>
          <Text style={styles.details}>{order.itemsForRebuy.length} sản phẩm</Text>
          <Text style={styles.price}>{formatVND(order.totalPrice)}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.reorderButton} onPress={handleCheckout}>
          <Text style={styles.reorderText}>Mua lại</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  orderId: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
  statusBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: '#2E7D32',
    fontSize: 12,
    fontWeight: 'bold',
  },
  dateTime: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 12,
  },
  mainContent: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
  },
  details: {
    fontSize: 13,
    color: '#616161',
    marginBottom: 4,
  },
  price: {
    color: '#F26522',
    fontWeight: 'bold',
    fontSize: 15,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
  },
  reorderButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#F26522',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  reorderText: {
    color: '#F26522',
    fontWeight: 'bold',
  },
  rateButton: {
    flex: 1,
    backgroundColor: '#F26522',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  rateText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  ratedButton: {
    backgroundColor: '#F0F0F0',
  },
  ratedText: {
    color: '#9E9E9E',
  },
});

export default CompletedOrderItem;