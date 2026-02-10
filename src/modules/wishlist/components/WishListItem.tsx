import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WishlistStyles } from "../css/WishListStyles";
import { formatVND } from "@/utils/helper";
import { WishListItemResponse } from "../types/api-response";
import useRemoveWishList from "../hooks/useRemoveWishList"
import Toast from "react-native-toast-message";
import { router } from "expo-router";
interface Props {
  item: WishListItemResponse;
  isEditing: boolean;
  isSelected: boolean;
  onToggleSelect: () => void;
  onAddToCart?: () => void;
}

const WishlistItem = ({
  item,
  isEditing,
  isSelected,
  onToggleSelect,
  onAddToCart,
}: Props) => {
  const { product } = item;
  const { mutate: removeWishList, isPending } = useRemoveWishList();
  const handleRemove = () => {
    removeWishList(
      { productIds: [product._id] },
      {
        onSuccess: () => {
          Toast.show({
            type: 'success',
            text1: `Đã xóa ${item.product.name} khỏi Yêu thích`,
          });
        },
      }
    )
  }
  return (
    <View style={WishlistStyles.itemContainer}>
      {isEditing && (
        <TouchableOpacity onPress={onToggleSelect} style={{ marginRight: 12 }}>
          <Ionicons
            name={isSelected ? "checkbox" : "square-outline"}
            size={22}
            color={isSelected ? "#F26522" : "#DDD"}
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => router.push({
            pathname: "/(details)/productDetailTabs/ProductDetailTabs",
            params: { id: product._id }
        })}>
        <Image source={{ uri: product.images }} style={WishlistStyles.itemImage} />
      </TouchableOpacity>

      <View style={WishlistStyles.itemInfo}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
              onPress={() => router.push({
                  pathname: "/(details)/productDetailTabs/ProductDetailTabs",
                  params: { id: product._id }
              })}>
            <Text
              style={[WishlistStyles.itemName, { flex: 1, marginRight: 8 }]}
              numberOfLines={1}
              >
              {product.name}
            </Text>
            </TouchableOpacity>

          {!isEditing && (
            <TouchableOpacity onPress={handleRemove}>
              <Ionicons name="close" size={18} color="#CCC" />
            </TouchableOpacity>
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 8,
          }}
        >
          <Text style={WishlistStyles.itemPrice}>
            {formatVND(product.finalPrice ?? product.price)}
          </Text>

          {!isEditing && (
            <TouchableOpacity
              style={WishlistStyles.addToCartButton}
              onPress={onAddToCart}
            >
              <Ionicons name="cart" size={16} color="#FFF" />
              <Text style={WishlistStyles.addToCartText}>Thêm</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default React.memo(WishlistItem);
