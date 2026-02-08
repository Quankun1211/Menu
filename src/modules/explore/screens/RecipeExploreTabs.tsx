import { useMemo, useRef, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RecipeStyle } from '../css/RecipeStyle';
import RecipeGridItem from '../components/RecipeGridItem';
import { ExploreStyles } from '../css/ExploreStyles';
import CategoryItem from '../components/CategoryItem';
import { router } from "expo-router";
import useGetCategoryRecipe from '../hooks/useGerCategoryRecipe';
import useGetRecipe from '../hooks/useGetRecipe';
import { useWeather } from '@/hooks/useWeather';

export default function RecipeExploreTabs() {
  const [activeTab, setActiveTab] = useState("all");
  const horizontalFlatListRef = useRef<FlatList>(null);
  const { temperature, condition, loading: weatherLoading } = useWeather();
  
  const { data: getCategoryRecipe } = useGetCategoryRecipe();
  const { data: recipeResponse, isPending: pendingRecipe } = useGetRecipe(activeTab);

  const weatherMood = useMemo(() => {
    if (temperature > 30) return 'hot'; 
    if (temperature < 22 || condition === 'Rain' || condition === 'Drizzle') return 'cold';
    return 'neutral';
  }, [temperature, condition]);

  const categoriesWithAll = useMemo(() => {
    const allTab = { 
      _id: 'all', 
      name: 'Tất cả',
      description: 'Nguyên liệu tươi sạch kèm công thức chuẩn đầu bếp'
    };
    if (!getCategoryRecipe?.data) return [allTab];
    return [allTab, ...getCategoryRecipe.data];
  }, [getCategoryRecipe?.data]);

  const listRecipes = useMemo(() => recipeResponse?.data || [], [recipeResponse]);

  const featuredRecipe = useMemo(() => {
    if (listRecipes.length === 0) return null;
    const recommended = listRecipes.find(item => item.weatherTag === weatherMood);
    return recommended || listRecipes[0]; 
  }, [listRecipes, weatherMood]);

  const handleChangeCategory = (id: string) => {
    setActiveTab(id);
  };

  return (
    <FlatList
      data={listRecipes} 
      keyExtractor={(item) => item._id}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      contentContainerStyle={RecipeStyle.scrollContainer}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => (
        pendingRecipe ? (
          <ActivityIndicator size="large" color="#E25822" style={{ marginTop: 50 }} />
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 50, color: '#999' }}>Không tìm thấy món ăn nào</Text>
        )
      )}
      ListHeaderComponent={() => (
        <View>
          <View style={{ marginBottom: 15, paddingTop: 15 }}>
            <View style={ExploreStyles.headerWrapper}>
              <FlatList
                ref={horizontalFlatListRef}
                horizontal
                data={categoriesWithAll}
                keyExtractor={(item) => item._id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={ExploreStyles.chipList}
                renderItem={({ item }) => (
                  <CategoryItem
                    item={item}
                    isActive={activeTab === item._id}
                    onPress={() => handleChangeCategory(item._id)}
                  />
                )}
              />
            </View>
          </View>

          <View style={RecipeStyle.sectionHeader}>
            <Text style={RecipeStyle.sectionTitle}>Gợi ý hôm nay</Text>
          </View>

          {featuredRecipe && (
            <TouchableOpacity 
              activeOpacity={0.9}
              onPress={() => router.push({
                pathname: "/(details)/exploreItemTabs/ExploreRecipeDetail",
                params: { id: featuredRecipe._id }
              })}
              style={RecipeStyle.featuredCard}
            >
              <Image 
                source={featuredRecipe.image ? { uri: featuredRecipe.image } : require("../../../assets/banner/gao.png")} 
                style={RecipeStyle.featuredImage} 
              />
              <View style={RecipeStyle.featuredBadge}>
                <Text style={RecipeStyle.featuredBadgeText}>
                  {weatherMood === 'hot' ? '🔥 GIẢI NHIỆT' : weatherMood === 'cold' ? '❄️ ẤM ÁP' : 'PHỔ BIẾN'}
                </Text>
              </View>
              
              <View style={RecipeStyle.featuredInfo}>
                <View style={RecipeStyle.rowBetween}>
                  <Text style={RecipeStyle.featuredTitle}>{featuredRecipe.name}</Text>
                  <Text style={RecipeStyle.featuredLevel}>
                    {Array(featuredRecipe.difficulty === 'Khó' ? 3 : featuredRecipe.difficulty === 'Trung bình' ? 2 : 1).fill('🍴').join('')}
                  </Text>
                </View>
                  <Text style={RecipeStyle.featuredDesc} numberOfLines={2}>

                  {featuredRecipe.description || "Công thức chuẩn đầu bếp cho bữa cơm gia đình thêm đậm đà."}
                </Text>
                
                <View style={RecipeStyle.rowBetween}>
                  <View style={RecipeStyle.metaInfo}>
                    <Ionicons name="time-outline" size={16} color="#E25822" />
                    <Text style={RecipeStyle.metaText}>{featuredRecipe.cookTime} phút</Text>
                    <Ionicons name="flash-outline" size={16} color="#E25822" style={{marginLeft: 15}} />
                    <Text style={RecipeStyle.metaText}>{featuredRecipe.difficulty}</Text>
                  </View>
                  <View style={RecipeStyle.actionButton}>
                    <Text style={RecipeStyle.actionButtonText}>Nấu ngay</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}

          <Text style={[RecipeStyle.sectionTitle, { marginVertical: 20 }]}>Món mới cập nhật</Text>
        </View>
      )}
      renderItem={({ item }) => <RecipeGridItem item={item} />}
    />
  );
}