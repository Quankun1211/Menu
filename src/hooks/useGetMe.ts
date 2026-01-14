import { useQuery } from "@tanstack/react-query"
import { onGetMeApi } from "../services/api";
const useGetMe = () => {
  const { data, error, isPending, isError, refetch } = useQuery({
    queryKey: ['me'],
    queryFn: onGetMeApi,
    retry: 0,
    staleTime: 5 * 60 * 1000,
  })
  return { data, error, isPending, isError, refetch }
};

export default useGetMe;
