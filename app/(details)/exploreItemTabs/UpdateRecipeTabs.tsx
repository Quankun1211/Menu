import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import UpdateRecipeScreen from '@/modules/profile/screens/UpdateRecipe';

const UpdateRecipeTabs = () => {
    const { recipeId } = useLocalSearchParams<{ recipeId: string }>();
    
  return (
    <UpdateRecipeScreen recipeId={Array.isArray(recipeId) ? recipeId[0] : recipeId ?? ""}/>
  )
}

export default UpdateRecipeTabs