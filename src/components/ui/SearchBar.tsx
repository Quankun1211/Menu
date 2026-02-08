import { View, TextInput, Text, TouchableOpacity, Image, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HomePageStyles } from "@/modules/root/css/HomePageStyle";
import { useState } from "react";
import useSearchProducts from "@/hooks/useSearchProducts";
import { router } from "expo-router";
// Nhập ScrollView từ gesture-handler thay vì react-native gốc
import { ScrollView } from 'react-native-gesture-handler';

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const { data } = useSearchProducts(keyword);
  const products = data?.data || [];

  const handleSelectItem = (productId: string) => {
    Keyboard.dismiss();
    router.push({
      pathname: "/(details)/productDetailTabs/ProductDetailTabs",
      params: { id: productId }
    });
    setKeyword("");
    setIsFocused(false);
  };

  return (
    <View style={{
      zIndex: 9999, 
      elevation: 10,
      paddingBottom: 10,
    }}>
      <View style={{ position: 'relative' }}>
        <View style={HomePageStyles.searchWrapper}>
          <Ionicons
            name="search-outline"
            size={20}
            color="#ffa85c"
            style={HomePageStyles.searchIcon}
          />

          <TextInput
            placeholder="Tìm kiếm đặc sản Việt..."
            style={HomePageStyles.searchInput}
            placeholderTextColor="#999"
            value={keyword}
            onChangeText={setKeyword}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setTimeout(() => setIsFocused(false), 300);
            }}
          />
        </View>

        {isFocused && keyword.length > 0 && products.length > 0 && (
          <View 
            style={[HomePageStyles.searchDropdown, { 
              maxHeight: 280,
              overflow: 'hidden' // Giúp bo góc hoạt động tốt trên Android
            }]}
          >
            <ScrollView
              style={{ flex: 1 }}
              // Bắt buộc phải có cho Android khi nằm trong ScrollView cha
              nestedScrollEnabled={true} 
              keyboardShouldPersistTaps="always"
              // Vô hiệu hóa hiệu ứng kéo quá đà làm ảnh hưởng cha
              overScrollMode="never" 
              // Đảm bảo nhận touch ngay lập tức
              shouldCancelWhenOutside={false}
            >
              {products.map((item: any) => (
                <TouchableOpacity
                  key={item._id}
                  style={HomePageStyles.dropdownItem}
                  onPress={() => handleSelectItem(item._id)}
                  activeOpacity={0.7}
                >
                  <Image 
                    source={{ uri: item.images }} 
                    style={{ 
                      width: 40, 
                      height: 40, 
                      borderRadius: 8, 
                      marginRight: 12,
                      backgroundColor: '#f5f5f5' 
                    }} 
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={HomePageStyles.dropdownText} numberOfLines={1}>
                      {item.name}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="#eee" />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
}