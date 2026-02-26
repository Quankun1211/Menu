import TrackingScreen from "@/modules_shipper/root/screens/TrackingScreen";
import { useLocalSearchParams } from "expo-router";

export default function TrackingTabs() {
    const { orderId } = useLocalSearchParams<{ orderId: string }>();
    
    return (
        <TrackingScreen orderId={Array.isArray(orderId) ? orderId[0] : orderId ?? ""}/>
    )
}