import { useInfiniteQuery } from "@tanstack/react-query";
import { onGetProductByRegion } from "../services/api";

type UseGetProductByRegionProps = {
  region: string;
  categoryId?: string;
  sort?: string;
};

const useGetProductByRegion = ({
  region,
  categoryId,
  sort,
}: UseGetProductByRegionProps) => {
  return useInfiniteQuery({
    queryKey: ["get-product-by-region", region, categoryId, sort],
    queryFn: ({ pageParam }) =>
      onGetProductByRegion({
        region,
        categoryId,
        sort,
        page: pageParam,
        limit: 10,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.pagination?.hasNextPage
      ? lastPage.pagination.currentPage + 1
      : undefined,
    enabled: Boolean(region),
  });

};

export default useGetProductByRegion;
