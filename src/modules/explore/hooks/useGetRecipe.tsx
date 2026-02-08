import { useQuery } from "@tanstack/react-query";
import { onGetRecipeApi } from "../services/api";

const useGetRecipe = (categoryId: string) => {
  
  return useQuery({
    queryKey: ["get-recipe-by-category", categoryId],
    queryFn: () => onGetRecipeApi(categoryId),
    placeholderData: (previousData) => previousData,
  });
};

export default useGetRecipe;