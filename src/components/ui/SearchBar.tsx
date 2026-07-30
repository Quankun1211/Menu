import { View, TextInput, Text, TouchableOpacity, Image, Keyboard, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HomePageStyles } from "@/modules/root/css/HomePageStyle";
import { useEffect, useState } from "react";
import useSearchProducts from "@/hooks/useSearchProducts";
import { router } from "expo-router";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedKeyword(keyword.trim()), 300);
    return () => clearTimeout(timer);
  }, [keyword]);

  const { data } = useSearchProducts(debouncedKeyword);
  const products = data?.data || [];

  const handleSelectItem = (productId: string) => {
    Keyboard.dismiss();
    router.push({
      pathname: "/(details)/productDetailTabs/ProductDetailTabs",
      params: { id: productId }
    });
    setKeyword("");
  };

  return (
    <View style={{
      zIndex: 9999, 
      elevation: 10,
      paddingBottom: 10,
    }}>
      <View style={{ position: 'relative' }} pointerEvents="box-none">
        <View style={HomePageStyles.searchWrapper}>
          <Ionicons
            name="search-outline"
            size={20}
            color="#D16D2F"
            style={HomePageStyles.searchIcon}
          />

          <TextInput
            placeholder="Tìm kiếm đặc sản Việt..."
            style={[HomePageStyles.searchInput, { color: "#2C1810", backgroundColor: "#FFFFFF" }]}
            placeholderTextColor="#806A5C"
            selectionColor="#F3B48E"
            cursorColor="#D16D2F"
            underlineColorAndroid="transparent"
            keyboardAppearance="light"
            returnKeyType="search"
            showSoftInputOnFocus
            accessibilityLabel="Tìm kiếm đặc sản Việt"
            value={keyword}
            onChangeText={setKeyword}
          />
        </View>

        {keyword.length > 0 && products.length > 0 && (
          <View 
            style={[HomePageStyles.searchDropdown, { 
              maxHeight: 280,
              overflow: 'hidden' 
            }]}
          >
            <ScrollView
              style={{ flex: 1 }}
              nestedScrollEnabled
              keyboardShouldPersistTaps="always"
              keyboardDismissMode="none"
              overScrollMode="never"
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
