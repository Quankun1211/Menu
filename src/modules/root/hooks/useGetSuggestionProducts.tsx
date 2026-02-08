import { useQuery } from "@tanstack/react-query"
import { onGetSuggestionProducts } from "../services/api"
import { useAuthStore } from "@/store/auth.store"
const useGetSuggestionProducts = () => {
    const token = useAuthStore((state) => state.token)
    const { data, isPending, error, isError } = useQuery({
    queryKey: ["get-suggestion-product" ],
    queryFn: () => onGetSuggestionProducts(),
    enabled: !!token
  })

  return { data, isPending, error, isError }
}

export default useGetSuggestionProducts