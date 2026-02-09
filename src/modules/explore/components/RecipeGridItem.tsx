import React from 'react';
import { View, Text, Image, GestureResponderEvent, TouchableOpacity } from 'react-native';
import { RecipeStyle } from '../css/RecipeStyle';
import { router } from "expo-router"
import { RecipeDetailResponse, RecipeResponse } from '../types/api-response';
import { Ionicons } from '@expo/vector-icons';
import useSaveRecipe from '../hooks/useSaveRecipe';
type RecipeProps = {
  item: RecipeDetailResponse;
  isSaved?: boolean;
};

const RecipeGridItem = ({ item }: RecipeProps) => {
  const { mutate: saveRecipe } = useSaveRecipe()
  const handleSave = (e: GestureResponderEvent) => {
    e.stopPropagation(); 
    saveRecipe(item._id, {
      onSuccess: () => {
        console.log("Luu ok");
      }
    })
  };
  return (
    <TouchableOpacity 
        onPress={() => router.push({
          pathname: "/(details)/exploreItemTabs/ExploreRecipeDetail",
          params: {id: item._id}
        })}
        style={RecipeStyle.card} activeOpacity={0.9}>
      <View style={RecipeStyle.imageWrapper}>
        <Image source={{uri: item.image}} style={RecipeStyle.image} />
        <TouchableOpacity 
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            padding: 5,
            borderRadius: 15,
            zIndex: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
          }}
          onPress={handleSave}
        >
          <Ionicons 
            name={item.isSaved ? "bookmark" : "bookmark-outline"} 
            size={18} 
            color="#D35400" 
          />
        </TouchableOpacity>
        <View style={RecipeStyle.timeBadge}>
          <Text style={RecipeStyle.timeText}>{item.cookTime} phút</Text>
        </View>
      </View>
      
      <Text style={RecipeStyle.title} numberOfLines={1}>{item.name}</Text>
      
      <View style={RecipeStyle.levelWrapper}>
        {[1, 2, 3].map((i) => (
          <Text 
            key={i} 
            style={[RecipeStyle.levelIcon, { color: i <= item.difficulty.length ? '#E25822' : '#DDD' }]}
          >
            🔥
          </Text>
        ))}
      </View>
    </TouchableOpacity>
  );
};

export default RecipeGridItem;