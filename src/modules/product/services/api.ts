import { BackendResponse } from "@/libs/shared/types/backend-response";
import { ProductResponse } from "@/modules/explore/types/api-response";
import api from "@/services/axios";
export const onGetProductDetail = async (id: string)
: Promise<BackendResponse<ProductResponse>> => {
  const data = await api.get(`/products/${id}`);
  return data.data;
};

export const onTrackView = async (categoryId: string) => {
  console.log(categoryId);
  const data = await api.post("/users/view-history", {
    categoryId
  })
  return data.data
}