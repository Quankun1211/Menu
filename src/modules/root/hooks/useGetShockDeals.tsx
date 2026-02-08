import { PaginationRequest } from "@/types/api-request"
import { useQuery } from "@tanstack/react-query";
import { onGetShockDealProducts } from "../services/api";
const useGetShockDeals = (params?: PaginationRequest) => {
  const { data, isPending, error, isError } = useQuery({
    queryKey: ["get-shock-deals", params],
    queryFn: () => onGetShockDealProducts(params),
  })

  return { data, isPending, error, isError }
}

export default useGetShockDeals
