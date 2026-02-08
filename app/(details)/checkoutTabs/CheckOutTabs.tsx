import { useLocalSearchParams } from "expo-router";
import CheckoutScreen from "@/modules/checkout/screens/CheckOutScreen";
export default function CheckOutTabs() {
  const { source, items } = useLocalSearchParams<{
    source: "cart" | "buy_now";
    items: string;
  }>();

  const checkoutItems = items ? JSON.parse(items) : [];

  return (
    <CheckoutScreen
      source={source}
      items={checkoutItems}
    />
  );
}
