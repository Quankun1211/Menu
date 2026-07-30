import { BackendResponse } from "@/libs/shared/types/backend-response";
import { CategoryMenuResponse, CategoryRecipeResponse, CategoryResponse, MenuResponse, ProductResponse, RecipeDetailResponse, RecipeResponse } from "../types/api-response";
import api from "@/services/axios";

type GetProductByCategoryParams = {
  categoryId?: string;
  sort?: string;
};

export const onGetProductByCategory = async (
  params?: GetProductByCategoryParams
): Promise<BackendResponse<ProductResponse[]>> => {
  const { data } = await api.get("/products/by-category", {
    params: {
      categoryId: params?.categoryId,
      sort: params?.sort,
    },
  });

  return data;
};

export const onGetCategoryMenuApi = async (
): Promise<BackendResponse<CategoryMenuResponse[]>> => {
  const res = await api.get("/menu-categories")
  return res.data;
};

export const onGetCategoryRecipeApi = async (
): Promise<BackendResponse<CategoryRecipeResponse[]>> => {
  const res = await api.get("/recipes/categories")
  return res.data;
};

export const onGetMenuApi = async (
  categoryId: string
): Promise<BackendResponse<MenuResponse[]>> => {
  const isAll = !categoryId || categoryId === 'all';
  const url = isAll
    ? "/menus"
    : `/menus?categoryId=${categoryId}`;
    
  const res = await api.get(url);
  return res.data;
};

export const onGetRecipeApi = async (
  categoryId: string
): Promise<BackendResponse<RecipeDetailResponse[]>> => {
  const isAll = !categoryId || categoryId === 'all';
  const url = isAll
    ? "/recipes/by-category"
    : `/recipes/by-category?categoryId=${categoryId}`;
    
  const res = await api.get(url);
  return res.data;
};

export const onGetMenuDetailApi = async (
  id: string
): Promise<BackendResponse<MenuResponse>> => {
  const res = await api.get(`/menus/${id}`);
  return res.data;
};

export const onGetRecipeDetailApi = async (
  id: string
): Promise<BackendResponse<RecipeDetailResponse>> => {
  const res = await api.get(`/recipes/${id}`);
  return res.data;
};

export const onSaveRecipeApi = async (
  recipeId: string
): Promise<BackendResponse<RecipeResponse>> => {
  const res = await api.post(`/recipes/${recipeId}/saved-state`);
  return res.data;
};
