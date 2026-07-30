import { BackendResponse } from "@/libs/shared/types/backend-response";
import { WishListResponse, RemoveFavouriteItemsResponse } from "../types/api-response";
import api from "@/services/axios";
import { AddToFavouriteRequest, RemoveFavouriteItemsRequest } from "../types/api-request";
export const onGetWishListApi = async (): Promise<
  BackendResponse<WishListResponse>
> => {
  const { data } = await api.get("/favourites");
  return data;
};
export const onRemoveWishListApi = async (
  payload: RemoveFavouriteItemsRequest
): Promise<RemoveFavouriteItemsResponse> => {
  const { data } = await api.delete("/favourites/items", { data: payload });
  return data;
};

export const onAddToFavouriteApi = async (
  payload: AddToFavouriteRequest
) : Promise<BackendResponse<WishListResponse>> => {
  const { data } = await api.post("/favourites/items", payload);
  return data
}
