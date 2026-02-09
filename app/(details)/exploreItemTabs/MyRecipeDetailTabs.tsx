import RecipeDetailScreen from '@/modules/profile/screens/MyRecipeDetail'
import { useLocalSearchParams } from 'expo-router';
const MyRecipeDetailTabs = () => {
  const { recipeId } = useLocalSearchParams<{ recipeId: string }>();
  
  return (
    <RecipeDetailScreen recipeId={Array.isArray(recipeId) ? recipeId[0] : recipeId ?? ""}/>
  )
}

export default MyRecipeDetailTabs