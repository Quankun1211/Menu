import { useLocalSearchParams, useNavigation } from "expo-router";
import EditAddressScreen from "@/modules/checkout/screens/EditAddressScreen";
import { useEffect } from "react";

export default function EditAddressTabs() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Chỉnh sửa địa chỉ"
    })
  }, [id, navigation])
  return (
    <EditAddressScreen addressId={Array.isArray(id) ? id[0] : id ?? ""} />
  );
}