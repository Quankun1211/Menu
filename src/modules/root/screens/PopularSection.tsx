import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import ProductItem from "../components/ProductItem"
import { ProductItemStyles } from "../css/ProductItemStyles"
import { HomePageStyles } from "../css/HomePageStyle"
import useGetPopularProducts from "../hooks/useGetPopularProducts"
const PopularSection = () => {
    const { data: getPopularProducts, isPending } = useGetPopularProducts()
    
    return (
        <View>
            <View style={HomePageStyles.sectionHeader}>
                <Text style={HomePageStyles.sectionTitle}>Sản Phẩm Phổ Biến</Text>
                <TouchableOpacity>
                    <Text style={HomePageStyles.seeAll}>Xem tất cả</Text>
                </TouchableOpacity>
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={ProductItemStyles.productScroll}>
                {getPopularProducts?.data.map((products) => (
                    <ProductItem key={products._id} products={products}/>
                ))}
            </ScrollView>
        </View>
    )
}

export default PopularSection