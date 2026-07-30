import { BackendResponse } from "@/libs/shared/types/backend-response";
import { CategoryResponse, ProductResponse, ShockDealProducts } from "../types/api-response";
import api from "@/services/axios";
import { PaginationRequest } from "@/types/api-request";
import { RecipeDetailResponse } from "@/modules/explore/types/api-response";
export const onGetCategoriesApi = async (
  limit?: number
): Promise<BackendResponse<CategoryResponse[]>> => {
  const res = await api.get("/categories", {
    params: limit ? { limit } : {}
  });
  return res.data;
};

export const ongetPopularProducts = async (
  limit?: number
): Promise<BackendResponse<ProductResponse[]>> => {
  const res = await api.get("/products/popular", {
    params: limit ? { limit } : {}
  });
  return res.data;
};

export const onGetShockDealProducts = async (
  params?: PaginationRequest
): Promise<BackendResponse<ShockDealProducts[]>> => {
  const data = await api.get("/products/deals", {
    params: {
      ...(params?.page && { page: params.page }),
      ...(params?.limit && { limit: params.limit }),
    },
  })

  return data.data
}

export const onGetSuggestionProducts = async() : Promise<BackendResponse<ProductResponse[]>> => {
  const data = await api.get("/products/suggestions")
  return data.data
}

export const onGetRecipeLastest = async() : Promise<BackendResponse<RecipeDetailResponse>> => {
  const data = await api.get("/recipes/latest")
  return data.data
}

export const onAskChatbot = async (payload: { message: string, history: any[] }) => {
    const res = await api.post("/chatbot/messages", payload);
    return res.data;
}

export const onGetSpecialLatestProduct = async() : Promise<BackendResponse<ProductResponse>> => {
  const data = await api.get("/specials/latest")
  return data.data
}
