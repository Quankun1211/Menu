import { View, Text, TouchableOpacity, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { DiscountProductStyles } from "../css/DiscountProductStyles"
import { ShockDealProducts } from "../types/api-response";
import { calcSalePrice, formatVND } from "@/utils/helper";
import { router } from "expo-router"
type DiscountProductProps = {
  product: ShockDealProducts;
};
export default function DiscountItems({product}: DiscountProductProps) {
    
    return (
        <View style={DiscountProductStyles.productCard}>
            <View style={DiscountProductStyles.discountBadge}>
                <Text style={DiscountProductStyles.discountText}>-{product.salePercent.percent}%</Text>
            </View>
            <TouchableOpacity 
                onPress={() => router.push({
                    pathname: "/(details)/productDetailTabs/ProductDetailTabs",
                    params: { id: product._id }
                })}>
                <Image source={{ uri: product.images }} style={DiscountProductStyles.productImg} />
            </TouchableOpacity>
            
            <View style={DiscountProductStyles.productInfo}>
                <TouchableOpacity 
                    onPress={() => router.push({
                        pathname: "/(details)/productDetailTabs/ProductDetailTabs",
                        params: { id: product._id }
                    })}>
                    <Text style={DiscountProductStyles.productCat}>{product.categoryId.name}</Text>
                    <Text style={DiscountProductStyles.productName} numberOfLines={1}>{product.name}</Text>
                </TouchableOpacity>
                
                <View style={DiscountProductStyles.productFooter}>
                <View>
                    <Text style={DiscountProductStyles.productPrice}>{formatVND(calcSalePrice(product.price, product.salePercent.percent))} / {product.unit}</Text>
                    <Text style={DiscountProductStyles.oldPrice}>{formatVND(product.price)}</Text>
                </View>
                
                {/* <TouchableOpacity style={DiscountProductStyles.addButton}>
                    <Ionicons name="basket" size={20} color="#fff" />
                </TouchableOpacity> */}
                </View>
            </View>
        </View>
    )
}