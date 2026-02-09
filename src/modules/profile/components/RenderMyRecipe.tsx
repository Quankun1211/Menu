import React from 'react'
import { RecipeHandBookStyles } from '../css/RecipeHandBookStyles'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { MyRecipeResponse } from '../types/api-response'

type RenderMyRecipeProps = {
  item: MyRecipeResponse;
  openMenu: (item: MyRecipeResponse) => void;
}
const RenderMyRecipe = ({ item, openMenu }: RenderMyRecipeProps) => {
  return (
    <View style={RecipeHandBookStyles.recipeCard} key={item._id}> 
        <TouchableOpacity onPress={() => router.push({
            pathname: "/(details)/exploreItemTabs/MyRecipeDetailTabs",
            params: { recipeId: item._id }
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
            <TouchableOpacity>
                 <TouchableOpacity 
                    onPress={() => openMenu(item)}
                    style={{ padding: 5 }} 
                >
                    <Ionicons name="ellipsis-vertical" size={18} color="#666" />
                </TouchableOpacity>
            </TouchableOpacity>
            </View>
            <View style={RecipeHandBookStyles.metaRow}>
            <Ionicons name="time-outline" size={14} color="#888" />
            <Text style={RecipeHandBookStyles.metaText}>{item.cookTime} phút</Text>
            <MaterialCommunityIcons name="fire" size={14} color="#888" style={{ marginLeft: 10 }} />
            </View>
        </TouchableOpacity>
        {item.familyNotes && (
            <View style={[RecipeHandBookStyles.statusBadge, { backgroundColor: item.familyNotes ? '#E8F5E9' : '#FFF3E0' }]}>
            <Text style={[RecipeHandBookStyles.statusText, { color: item.familyNotes ? '#4CAF50' : '#FF9800' }]}>{item.familyNotes}</Text>
            </View>
        )}
        </View>
  </View>
  )
}

export default RenderMyRecipe