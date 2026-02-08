import { View, Image, Text } from "react-native";
import { OrderItemStyles } from "../css/OrderItemStyles";
import { OrderProductResponse } from "../types/api-response";
import { formatVND } from "@/utils/helper";
type OrderDetailProps = {
  orderDetail: OrderProductResponse
}
const OrderItemDetail = ({orderDetail} : OrderDetailProps) => (
  <View style={OrderItemStyles.productRow}>
    <Image source={{uri: orderDetail.image}} style={OrderItemStyles.productImg} />
    <View style={{ flex: 1, marginLeft: 12 }}>
      <Text style={OrderItemStyles.productName}>{orderDetail.name}</Text>
      <Text style={OrderItemStyles.productUnit}>{orderDetail.quantity} {orderDetail.unit}</Text>
    </View>
    <Text style={OrderItemStyles.productPrice}>{formatVND(orderDetail.total)}</Text>
  </View>
);

export default OrderItemDetail