import { useInfiniteQuery } from "@tanstack/react-query";
import { onSearchProducts } from "@/services/api";
const useSearchProducts = (keyword: string, sort?: string) => {
  return useInfiniteQuery({
    queryKey: ['search-products', keyword, sort],
    queryFn: ({ pageParam }) => onSearchProducts(keyword, sort, pageParam, 10),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.pagination?.hasNextPage
      ? lastPage.pagination.currentPage + 1
      : undefined,
    enabled: keyword.length > 0,
    staleTime: 1000 * 30,
  });
};

export default useSearchProducts;
