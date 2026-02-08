import { BackendResponse } from "@/libs/shared/types/backend-response";
import { ProductResponse } from "../types/api-response";
import api from "@/services/axios";

type GetProductByRegionParams = {
  region: string;
  categoryId?: string;
  sort?: string;
};

type GetProductSpecialByRegionParams = {
  region: string;
  sort?: string;
};

export const onGetProductByRegion = async (
  params?: GetProductByRegionParams
): Promise<BackendResponse<ProductResponse[]>> => {
  const res = await api.get("/product/get-by-region", {
    params: {
      region: params?.region,
      categoryId: params?.categoryId,
      sort: params?.sort,
    },
  });

  return res.data;
};

export const onGetProductSpecialByRegion = async (
  params?: GetProductSpecialByRegionParams
): Promise<BackendResponse<ProductResponse[]>> => {
  const res = await api.get("/product/get-by-special", {
    params: {
      region: params?.region,
      sort: params?.sort,
    },
  });

  return res.data;
};