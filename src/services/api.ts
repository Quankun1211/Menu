import { ProductResponse } from "@/modules/explore/types/api-response";
import type { BackendResponse } from "../libs/shared/types/backend-response";
import type { UserRecord } from "../types/api-response";
import api from "./axios";
import { SearchProductResponse } from "@/types/api-response";

export const onGetMeApi = async (): Promise<BackendResponse<UserRecord>> => {
    const data = await api.get("/user/me")
    return data.data
}

export const onLogoutApi = async (): Promise<BackendResponse<{message: string}>> => {
    const data = await api.post("/auth/logout")
    return data.data
}

export const onGetProductByFilter = async (sort: string) : Promise<BackendResponse<ProductResponse>> => {
    const data = await api.get("/product/get-by-filter", {
        params: {sort}
    })
    return data.data
}

export const onSearchProducts = async (
  keyword: string, sort?: string
): Promise<BackendResponse<SearchProductResponse[]>> => {
  const { data } = await api.get('/product/search', {
    params: { q: keyword, sort: sort },
  });
  return data;
};
