import { useInfiniteQuery } from "@tanstack/react-query";
import { onGetRecipeApi } from "../services/api";

const useGetRecipe = (categoryId: string) => {
  
  return useInfiniteQuery({
    queryKey: ["get-recipe-by-category", categoryId],
    queryFn: ({ pageParam }) => onGetRecipeApi(categoryId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.pagination?.hasNextPage
      ? lastPage.pagination.currentPage + 1
      : undefined,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

export default useGetRecipe;
