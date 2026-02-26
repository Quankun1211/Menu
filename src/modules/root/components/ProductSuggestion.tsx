import { ScrollView, View, Text } from 'react-native';
import ProductItem from './ProductItem';
import { ProductItemStyles } from '../css/ProductItemStyles';
import useGetSuggestionProducts from '../hooks/useGetSuggestionProducts';

const ProductSuggestion = () => {
  const { data: getSuggestionProducts, isPending } = useGetSuggestionProducts()
  
  const sliceData = getSuggestionProducts?.data.slice(0,8)
  
  return (
    <View style={ProductItemStyles.container}>
      <View style={ProductItemStyles.sectionHeader}>
        <Text style={ProductItemStyles.sectionTitle}>Gợi Ý Cho Bạn</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={ProductItemStyles.productScroll}>
        {sliceData?.map((products) => (
            <ProductItem key={products._id} products={products}/>
        ))}
      </ScrollView>
      <View style={{paddingBottom:20}}></View>
    </View>
  );
};

export default ProductSuggestion;