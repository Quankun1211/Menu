import { useQuery } from "@tanstack/react-query";
import api from "@/services/axios";

const useGetSpecialDetail = (id: string) => {
  return useQuery({
    queryKey: ["get-special-detail", id],
    queryFn: async () => {
      const { data } = await api.get(`/specials/${id}`);
      return data;
    },
    enabled: Boolean(id),
  });
};

export default useGetSpecialDetail;
