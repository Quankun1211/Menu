import React from 'react'
import { RecipeHandBookStyles } from '../css/RecipeHandBookStyles'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { MyRecipeResponse } from '../types/api-response'
import { RecipeResponse } from '@/modules/explore/types/api-response'
import useSaveRecipe from '@/modules/explore/hooks/useSaveRecipe'

type RenderMyRecipeProps = {
  item: RecipeResponse;
}
const RenderSavedRecipe = ({ item}: RenderMyRecipeProps) => {
    const { mutate: unSaveRecipe } = useSaveRecipe();
    const handleUnSaved = () => {
        unSaveRecipe(item._id)
    }
  return (
    <View style={RecipeHandBookStyles.recipeCard} key={item._id}> 
        <TouchableOpacity 
        onPress={() => router.push({
            pathname: "/(details)/exploreItemTabs/ExploreRecipeDetail",
            params: {id: item._id}
        })}>
            <Image source={{uri: item.image}} style={RecipeHandBookStyles.recipeImage} />
        </TouchableOpacity>
        <View style={RecipeHandBookStyles.recipeInfo}>
        <TouchableOpacity
            onPress={() => router.push({
            pathname: "/(details)/exploreItemTabs/MyRecipeDetailTabs",
            params: { recipeId: item._id }
        })}
        >
            <View style={RecipeHandBookStyles.titleRow}>
                <Text style={RecipeHandBookStyles.recipeTitle}>{item.name}</Text>
            </View>
            <View style={RecipeHandBookStyles.metaRow}>
            <Ionicons name="time-outline" size={14} color="#888" />
            <Text style={RecipeHandBookStyles.metaText}>{item.cookTime} phút</Text>
            </View>
        </TouchableOpacity>
        {item.difficulty && (
            <View style={[RecipeHandBookStyles.statusBadge, { backgroundColor: item.difficulty === 'Dễ' ? '#E8F5E9' : item.difficulty === 'Trung bình' ? '#FFF3E0' : '#FFEBEE' }]}>
                <Text style={[RecipeHandBookStyles.statusText, { color: item.difficulty === 'Dễ' ? '#4CAF50' : item.difficulty === 'Trung bình' ? '#FF9800' : '#F44336' }]}>{item.difficulty}</Text>
            </View>
        )}
        </View>
        <TouchableOpacity onPress={handleUnSaved}>
            <Ionicons name="bookmark" size={24} color="#D35400" style={RecipeHandBookStyles.bookmarkIcon} />
        </TouchableOpacity>
  </View>
  )
}

export default RenderSavedRecipe