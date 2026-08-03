import { BackendResponse } from "@/libs/shared/types/backend-response";
import { ProductResponse } from "../types/api-response";
import api from "@/services/axios";

type GetProductByRegionParams = {
  region: string;
  categoryId?: string;
  sort?: string;
  page?: number;
  limit?: number;
};

type GetProductSpecialByRegionParams = {
  region: string;
  sort?: string;
  page?: number;
  limit?: number;
};

export const onGetProductByRegion = async (
  params?: GetProductByRegionParams
): Promise<BackendResponse<ProductResponse[]>> => {
  const res = await api.get("/products", {
    params: {
      region: params?.region,
      categoryId: params?.categoryId,
      sort: params?.sort,
      page: params?.page,
      limit: params?.limit,
    },
  });

  return res.data;
};

export const onGetProductSpecialByRegion = async (
  params?: GetProductSpecialByRegionParams
): Promise<BackendResponse<ProductResponse[]>> => {
  const res = await api.get("/specials", {
    params: {
      region: params?.region,
      sort: params?.sort,
      page: params?.page,
      limit: params?.limit,
    },
  });

  return res.data;
};
