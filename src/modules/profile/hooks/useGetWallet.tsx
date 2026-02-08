import { useQuery } from "@tanstack/react-query";
import { onGetWallet } from "../services/api";

const useGetWallet = () => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["get-wallet"],
    queryFn: () => {
        return onGetWallet()
    }
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetWallet;