import { BackendResponse } from "@/libs/shared/types/backend-response";
import { CategoryResponse, ProductResponse, ShockDealProducts } from "../types/api-response";
import api from "@/services/axios";
import { PaginationRequest } from "@/types/api-request";
import { PaginationResponse } from "@/types/api-response";
import { RecipeDetailResponse } from "@/modules/explore/types/api-response";
export const onGetCategoriesApi = async (
  limit?: number
): Promise<BackendResponse<CategoryResponse[]>> => {
  const res = await api.get("/category/get", {
    params: limit ? { limit } : {}
  });
  return res.data;
};

export const ongetPopularProducts = async (
  limit?: number
): Promise<BackendResponse<ProductResponse[]>> => {
  const res = await api.get("/product/get-popular", {
    params: limit ? { limit } : {}
  });
  return res.data;
};

export const onGetShockDealProducts = async (
  params?: PaginationRequest
): Promise<BackendResponse<PaginationResponse<ShockDealProducts>>> => {
  const data = await api.get("/product/get-shock-deals", {
    params: {
      ...(params?.page && { page: params.page }),
      ...(params?.limit && { limit: params.limit }),
    },
  })

  return data.data
}

export const onGetSuggestionProducts = async() : Promise<BackendResponse<ProductResponse[]>> => {
  const data = await api.get("/product/get-suggestion")
  return data.data
}

export const onGetRecipeLastest = async() : Promise<BackendResponse<RecipeDetailResponse>> => {
  const data = await api.get("/menu/recipe/get-lastest")
  return data.data
}

export const onAskChatbot = async (payload: { message: string, history: any[] }) => {
    const res = await api.post("/ai/ask", payload);
    return res.data;
}

export const onGetSpecialLatestProduct = async() : Promise<BackendResponse<ProductResponse>> => {
  const data = await api.get("/product/get-latest-specialty")
  return data.data
}