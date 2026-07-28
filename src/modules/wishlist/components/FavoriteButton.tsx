import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import Toast from "react-native-toast-message";
import useGetMe from "@/hooks/useGetMe";
import useAddToWishList from "../hooks/useAddToWishList";

type FavoriteButtonProps = {
  productId: string;
  style?: StyleProp<ViewStyle>;
  size?: number;
};

export default function FavoriteButton({ productId, style, size = 20 }: FavoriteButtonProps) {
  const { data: meData } = useGetMe();
  const { mutate: addToFavourite, isPending } = useAddToWishList();
  const [isSaved, setIsSaved] = useState(false);

  const handlePress = (event: GestureResponderEvent) => {
    event.stopPropagation();
    if (!meData?.data) {
      Toast.show({
        type: "info",
        text1: "Vui lòng đăng nhập",
        text2: "Đăng nhập để lưu sản phẩm yêu thích.",
      });
      return;
    }

    addToFavourite({ productId }, {
      onSuccess: () => {
        setIsSaved(true);
        Toast.show({ type: "success", text1: "Đã lưu vào danh sách yêu thích" });
      },
      onError: () => {
        Toast.show({
          type: "error",
          text1: "Không thể lưu sản phẩm",
          text2: "Vui lòng thử lại sau.",
        });
      },
    });
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel="Thêm vào danh sách yêu thích"
      activeOpacity={0.75}
      disabled={isPending}
      onPress={handlePress}
      style={[styles.button, style, isPending && styles.disabled]}
    >
      {isPending ? (
        <ActivityIndicator size="small" color="#D94B4B" />
      ) : (
        <Ionicons name={isSaved ? "heart" : "heart-outline"} size={size} color="#D94B4B" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.94)",
    borderWidth: 1,
    borderColor: "rgba(217,75,75,0.16)",
    elevation: 3,
    shadowColor: "#5C4033",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
  },
  disabled: { opacity: 0.65 },
});
