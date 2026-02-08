import { useQuery } from "@tanstack/react-query";
import { onGetProductByCategory } from "../services/api";

type UseGetProductByCategoryProps = {
  categoryId?: string;
  sort?: string;
};

const useGetProductByCategory = ({
  categoryId,
  sort = "newest",
}: UseGetProductByCategoryProps = {}) => {
  
  const { data, isPending, error, isError } = useQuery({
    queryKey: ["get-product-by-category", categoryId ?? "all", sort],
    queryFn: () =>
      onGetProductByCategory({
        categoryId,
        sort,
      }),
    enabled: true,
  });

  return { data, isPending, error, isError };
};

export default useGetProductByCategory;
