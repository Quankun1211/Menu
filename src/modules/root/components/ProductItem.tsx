import { TouchableOpacity, Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ProductItemStyles } from "../css/ProductItemStyles";
import { ProductResponse } from "../types/api-response";
import { formatVND } from "@/utils/helper";
import { router } from "expo-router"
type PopularProductProps = {
  products: ProductResponse
}
export default function ProductItem ({ products }: PopularProductProps) {
  
  return (
    <View style={ProductItemStyles.productCard}>
      <TouchableOpacity 
        onPress={() => router.push({
            pathname: "/(details)/productDetailTabs/ProductDetailTabs",
            params: { id: products._id }
        })}>
        <Image source={{uri: products.images}} style={ProductItemStyles.productImg} />
      </TouchableOpacity>
      <View style={ProductItemStyles.productInfo}>
          <TouchableOpacity 
            onPress={() => router.push({
                pathname: "/(details)/productDetailTabs/ProductDetailTabs",
                params: { id: products._id }
            })}>
          <Text style={ProductItemStyles.productCat}>{products.categoryId.name}</Text>
          <Text style={ProductItemStyles.productName} numberOfLines={1}>{products.name}</Text>
        </TouchableOpacity>
        <View style={ProductItemStyles.productFooter}>
          <Text style={ProductItemStyles.productPrice}>{formatVND(products.price)} / {products.unit}</Text>
          {/* <TouchableOpacity style={ProductItemStyles.addButton}>
            <Ionicons name="basket" size={20} color="#fff" />
          </TouchableOpacity> */}
        </View>
      </View>
  </View>
  )
}