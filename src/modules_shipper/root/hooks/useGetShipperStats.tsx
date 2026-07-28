import { useQuery } from "@tanstack/react-query";
import { onGetShipperStatsApi } from "../services/api";

export default function useGetShipperStats() {
  return useQuery({
    queryKey: ["shipper-stats"],
    queryFn: onGetShipperStatsApi,
    staleTime: 30_000,
  });
}
