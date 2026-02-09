import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import useGetAddress from "../hooks/useGetAddress";
import { AddressModel } from "../types/api-response";
import { router } from "expo-router";
import { AddressStyles } from "../css/AddressStyles";
import { CheckoutStyles } from "../css/CheckOutStyles";

interface AddressListScreenProps {
  source?: string;
  items?: string;
}

export default function AddressListScreen({ source, items }: AddressListScreenProps) {
  const { data } = useGetAddress();
  const addresses: AddressModel[] = data?.data ?? [];
  const { selectedAddress, setSelectedAddress } = useCheckoutStore();

  const [tempSelectedAddress, setTempSelectedAddress] = useState<AddressModel | null>(
    selectedAddress || null
  );

  const handleSelect = (item: AddressModel) => {
    setTempSelectedAddress(item);
  };

  const handleEdit = (item: AddressModel) => {
    router.push({
      pathname: "/(details)/addressTabs/EditAddressTabs",
      params: { id: item._id }
    });
  };

  const handleConfirm = () => {
    if (tempSelectedAddress) {
      setSelectedAddress(tempSelectedAddress);
    }

    router.replace({
      pathname: "/(details)/checkoutTabs/CheckOutTabs",
      params: { 
        source: source, 
        items: items 
      }
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={{ padding: 16 }} showsVerticalScrollIndicator={false}>
        {addresses.map((item) => (
          <View key={item._id} style={{ position: 'relative' }}>
            <TouchableOpacity
              style={[
                AddressStyles.addressItem,
                tempSelectedAddress?._id === item._id && AddressStyles.selectedItem,
              ]}
              onPress={() => handleSelect(item)}
            >
              <View style={AddressStyles.addressInfo}>
                <View style={AddressStyles.nameRow}>
                  <Text style={AddressStyles.nameText} numberOfLines={1}>
                    {item.name}
                  </Text>
                  {item.isDefault && (
                    <View style={AddressStyles.defaultBadge}>
                      <Text style={AddressStyles.defaultBadgeText}>Mặc định</Text>
                    </View>
                  )}
                </View>

                <Text style={AddressStyles.phoneText}>{item.phone}</Text>
                <Text style={AddressStyles.detailText} numberOfLines={2}>
                  {item.address}
                </Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity 
                  style={AddressStyles.editButton} 
                  onPress={() => handleEdit(item)}
                >
                  <Ionicons name="create-outline" size={18} color="#666" />
                </TouchableOpacity>

                <View style={{ marginLeft: 12 }}>
                  <Ionicons
                    name={tempSelectedAddress?._id === item._id ? "checkbox" : "square-outline"}
                    size={24}
                    color={tempSelectedAddress?._id === item._id ? "#F26522" : "#DDD"}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          style={AddressStyles.addNewBtn}
          onPress={() => router.push("/(details)/addressTabs/AddressTabs")}
        >
          <Ionicons name="add-outline" size={20} color="#F26522" />
          <Text style={AddressStyles.addNewText}>Thêm địa chỉ mới</Text>
        </TouchableOpacity>
        
        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={CheckoutStyles.footer}>
        <TouchableOpacity
          style={[
            CheckoutStyles.submitBtn,
            !tempSelectedAddress && { backgroundColor: '#ccc' }
          ]}
          onPress={handleConfirm}
          disabled={!tempSelectedAddress}
        >
          <Text style={CheckoutStyles.submitBtnText}>Xác nhận địa chỉ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}