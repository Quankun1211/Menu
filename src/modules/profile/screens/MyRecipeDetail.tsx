import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import useGetRecipeDetail from '../hooks/useGetRecipeDetail';
import { RecipeDetailStyles } from '../css/RecipeDetailStyles';
import { router } from 'expo-router';

type RecipeDetailProps = {
    recipeId: string
}
const RecipeDetailScreen = ({ recipeId }: RecipeDetailProps) => {
  const { data, isPending } = useGetRecipeDetail(recipeId)
  
  return (
    <View style={RecipeDetailStyles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={RecipeDetailStyles.imageContainer}>
          <Image source={{ uri: data?.data.image }} style={RecipeDetailStyles.mainImage} />
          <View style={RecipeDetailStyles.overlay} />
          <View style={RecipeDetailStyles.headerInfo}>
            <Text style={RecipeDetailStyles.recipeName}>{data?.data.name}</Text>
            {/* <Text style={RecipeDetailStyles.recipeSub}>Đăng bởi {data?.data.author} • {data?.data.timeAgo}</Text> */}
          </View>
        </View>

        <View style={RecipeDetailStyles.contentBody}>
          <View style={RecipeDetailStyles.statsRow}>
            <View style={RecipeDetailStyles.statCard}>
              <Ionicons name="time-outline" size={24} color="#D35400" />
              <Text style={RecipeDetailStyles.statValue}>{data?.data.cookTime}</Text>
              <Text style={RecipeDetailStyles.statLabel}>PHÚT</Text>
            </View>
            {/* <View style={RecipeDetailStyles.statCard}>
              <FontAwesome5 name="star" size={20} color="#D35400" />
              <Text style={RecipeDetailStyles.statValue}>{recipeData.difficulty}</Text>
              <Text style={RecipeDetailStyles.statLabel}>ĐỘ KHÓ</Text>
            </View>
            <View style={RecipeDetailStyles.statCard}>
              <Ionicons name="people-outline" size={24} color="#D35400" />
              <Text style={RecipeDetailStyles.statValue}>{recipeData.servings}</Text>
              <Text style={RecipeDetailStyles.statLabel}>KHẨU PHẦN</Text>
            </View> */}
          </View>

          <Text style={RecipeDetailStyles.sectionTitle}>Nguyên liệu</Text>
          {data?.data.ingredients.map((item, index) => (
            <View key={index} style={RecipeDetailStyles.ingredientRow}>
              <Text style={RecipeDetailStyles.ingredientName}>{item.name}</Text>
              <Text style={RecipeDetailStyles.ingredientQty}>{item.quantity}</Text>
            </View>
          ))}

          <Text style={[RecipeDetailStyles.sectionTitle, { marginTop: 30 }]}>Các bước thực hiện</Text>
          {data?.data.instructions.map((step, index) => (
            <View key={index} style={RecipeDetailStyles.stepRow}>
              <View style={RecipeDetailStyles.stepNumberContainer}>
                <View style={RecipeDetailStyles.stepCircle}>
                  <Text style={RecipeDetailStyles.stepText}>{step.step}</Text>
                </View>
                {index !== data?.data.instructions.length - 1 && <View style={RecipeDetailStyles.stepLine} />}
              </View>
              <View style={RecipeDetailStyles.stepContent}>
                <Text style={RecipeDetailStyles.stepTitleText}>Bước {step.step}</Text>
                <Text style={RecipeDetailStyles.stepDescription}>{step.description}</Text>
              </View>
            </View>
          ))}

          <View style={RecipeDetailStyles.noteBox}>
            <View style={RecipeDetailStyles.noteHeader}>
              <MaterialCommunityIcons name="access-point" size={18} color="#D35400" />
              <Text style={RecipeDetailStyles.noteTitle}>Lưu ý cá nhân</Text>
            </View>
            <Text style={RecipeDetailStyles.noteBody}>&quot;{data?.data.familyNotes}&quot;</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={RecipeDetailStyles.bottomActions}>
        <TouchableOpacity
         onPress={() => {
              router.push({
                pathname: "/(details)/exploreItemTabs/UpdateRecipeTabs" as any,
                params: { recipeId: data?.data._id }
              });
         }}
          style={RecipeDetailStyles.editBtn}>
          <MaterialCommunityIcons name="playlist-edit" size={24} color="white" />
          <Text style={RecipeDetailStyles.btnText}>Chỉnh sửa công thức</Text>
        </TouchableOpacity>
        <TouchableOpacity style={RecipeDetailStyles.shareBtn}>
          <Ionicons name="share-social-outline" size={22} color="#333" />
          <Text style={RecipeDetailStyles.shareBtnText}>Chia sẻ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RecipeDetailScreen;