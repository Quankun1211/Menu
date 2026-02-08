import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { RecipeStyle } from '../css/RecipeStyle';
import { router } from "expo-router"
import { RecipeDetailResponse, RecipeResponse } from '../types/api-response';

type RecipeProps = {
  item: RecipeDetailResponse
}
const RecipeGridItem = ({ item }: RecipeProps) => {
  
  return (
    <TouchableOpacity 
        onPress={() => router.push({
          pathname: "/(details)/exploreItemTabs/ExploreRecipeDetail",
          params: {id: item._id}
        })}
        style={RecipeStyle.card} activeOpacity={0.9}>
      <View style={RecipeStyle.imageWrapper}>
        <Image source={{uri: item.image}} style={RecipeStyle.image} />
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