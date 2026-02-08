import { View, Text, TouchableOpacity } from "react-native"
import { HomePageStyles } from "../css/HomePageStyle"
import { CategoryItemStyles } from "../css/CategoryItemStyles"
import CategoryItem from "../components/CategoryItem"
import useGetCategory from "../hooks/useGetCategory"
import { useRouter } from "expo-router"
const CategorySection = () => {
  const router = useRouter();
  const { data: getAllCategory, isPending } = useGetCategory(4);

  const handleSeeAll = () => {
    router.push({
      pathname: "/(details)/exploreItemTabs/ExploreFood",
      params: { categoryId: "all" }
    });
  };

  return (
    <View>
      <View style={HomePageStyles.sectionHeader}>
        <Text style={HomePageStyles.sectionTitle}>Danh Mục</Text>
        <TouchableOpacity onPress={handleSeeAll}>
          <Text style={HomePageStyles.seeAll}>Xem tất cả</Text>
        </TouchableOpacity>
      </View>

      <View style={CategoryItemStyles.categoryGrid}>
        {getAllCategory?.data && getAllCategory.data.map((category) => (
          <CategoryItem 
            key={category._id} 
            category={category} 
          />
        ))}
      </View>
    </View>
  );
};

export default CategorySection