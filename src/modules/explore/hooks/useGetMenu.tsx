import { useInfiniteQuery } from "@tanstack/react-query";
import { onGetMenuApi } from "../services/api";

const useGetMenu = (categoryId: string) => {
  
  return useInfiniteQuery({
    queryKey: ["get-menu", categoryId],
    queryFn: ({ pageParam }) => onGetMenuApi(categoryId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.pagination?.hasNextPage
      ? lastPage.pagination.currentPage + 1
      : undefined,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

export default useGetMenu;
