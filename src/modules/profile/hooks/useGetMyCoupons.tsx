import { useQuery } from "@tanstack/react-query";
import { onGetCoupon } from "../services/api";

const useGetMyCoupons = () => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["get-coupon"],
    queryFn: () => {
        return onGetCoupon()
    }
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetMyCoupons;