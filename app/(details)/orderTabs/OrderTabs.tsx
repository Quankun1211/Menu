import OrderDetailScreen from "@/modules/order/screens/OrderDetailScreen";
import { useLocalSearchParams } from "expo-router";
export default function OrderTabs() {
    const { orderId } = useLocalSearchParams<{ orderId: string }>();
    return (
        <OrderDetailScreen orderId={Array.isArray(orderId) ? orderId[0] : orderId}/>
    )
}