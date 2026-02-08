import { ImageBackground, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CategoryItemStyles } from "../css/CategoryItemStyles";
import { CategoryResponse } from "../types/api-response";
import { useRouter } from "expo-router";
import { EXPLORE_TABS } from "@/libs/shared/enums/exploretabs";
type CategoryItemProps = {
  category: CategoryResponse;
};
export default function CategoryItem({ category }: CategoryItemProps) {
  const router = useRouter();

  return (
    <TouchableOpacity 
      onPress={() => router.push({ 
        pathname: "/(details)/exploreItemTabs/ExploreFood", 
        params: { 
          categoryId: category._id 
        }
      })}
      style={CategoryItemStyles.categoryCard}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={{uri: category.image}}
        style={CategoryItemStyles.categoryImg}
        imageStyle={CategoryItemStyles.imageRadius} 
        resizeMode="cover"
      >
        <Text style={CategoryItemStyles.categoryText}>{category.name}</Text>
      </ImageBackground>
    </TouchableOpacity>
  )
}