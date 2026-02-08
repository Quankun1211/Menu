import { useQuery } from "@tanstack/react-query";
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
  const { data, isPending, error, isError } = useQuery({
    queryKey: ["get-product-by-region", region, categoryId, sort],
    queryFn: () =>
      onGetProductByRegion({
        region,
        categoryId,
        sort,
      }),
    enabled: Boolean(region),
  });

  return { data, isPending, error, isError };
};

export default useGetProductByRegion;