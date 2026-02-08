import { useLocalSearchParams } from "expo-router";
import AddressListScreen from "@/modules/checkout/screens/ListAddressScreen";

export default function ListAddressTabs() {
  const { source, items } = useLocalSearchParams<{ source: string; items: string }>();

  return (
    <AddressListScreen 
      source={source} 
      items={items} 
    />
  );
}