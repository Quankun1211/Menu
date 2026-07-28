import { View, Text, TouchableOpacity } from 'react-native';
import { DiscountProductStyles } from '../css/DiscountProductStyles';
import useGetShockDeals from '../hooks/useGetShockDeals';
import DiscountItems from '../components/DiscountItems';
import { router } from 'expo-router';
const DiscountGrid = () => {
  const { data: getDiscountProducts, isPending } = useGetShockDeals()
  const products = Array.isArray(getDiscountProducts?.data)
    ? getDiscountProducts.data.slice(0, 4)
    : [];
  
  return (
    <View style={DiscountProductStyles.container}>
      {/* Header */}
      <View style={DiscountProductStyles.sectionHeader}>
        <Text style={DiscountProductStyles.sectionTitle}>Ưu Đãi Cực Sốc</Text>
        <TouchableOpacity
          onPress={() => 
            router.push({
              pathname: "/(details)/exploreItemTabs/ExploreFood",
              params: { sortInit: "sale" }
            })
          }
        >
          <Text style={DiscountProductStyles.seeAll}>Xem tất cả</Text>
        </TouchableOpacity>
      </View>

      {/* Grid 2x2 */}
      <View style={DiscountProductStyles.gridContainer}>
        {products.map((product) => (
          <DiscountItems key={product._id} product={product}/>
        ))}
        {!isPending && products.length === 0 && (
          <Text style={{ color: '#806D63', paddingVertical: 8 }}>
            Hiện chưa có sản phẩm ưu đãi.
          </Text>
        )}
      </View>
    </View>
  );
};

export default DiscountGrid;
