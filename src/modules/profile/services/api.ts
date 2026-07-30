import { BackendResponse } from "@/libs/shared/types/backend-response";
import api from "@/services/axios";
import { MyCouponResponse, MyRecipeDetailResponse, MyRecipeResponse, WalletResponse } from "../types/api-response";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { UpdateMyRecipeRequest } from "../types/api-request";
import { RecipeResponse } from "@/modules/explore/types/api-response";

export const onGetWallet = async (
): Promise<BackendResponse<WalletResponse>> => {
  const res = await api.get("/wallets/me");

  return res.data;
};

export const onConfirm = async (
): Promise<BackendResponse<WalletResponse>> => {
  const res = await api.post("/wallets/me/rewards");
  return res.data;
};

export const onGetCoupon = async (
): Promise<BackendResponse<MyCouponResponse>> => {
  const res = await api.get("/users/me/coupons");
  return res.data;
};

export const onCreateMyRecipe = async (
  formData: FormData
): Promise<BackendResponse<MyRecipeResponse>> => {
  const res = await api.post("/recipes/mine", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const onGetMyRecipes = async (
): Promise<BackendResponse<MyRecipeResponse[]>> => {
  const res = await api.get("/recipes/mine");
  return res.data;
};

export const onGetMyRecipesDetail = async (
  recipeId: string
): Promise<BackendResponse<MyRecipeDetailResponse>> => {
  const res = await api.get(`/recipes/mine/${recipeId}`);
  return res.data;
};

export const onUpdateMyRecipe = async (
  recipeId: string, 
  formData: FormData 
): Promise<BackendResponse<MyRecipeResponse>> => {
  const res = await api.put(`/recipes/mine/${recipeId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const onDeleteMyRecipe = async (
  recipeId: string
): Promise<BackendResponse<MyRecipeResponse>> => {
  const res = await api.delete(`/recipes/mine/${recipeId}`);
  return res.data;
};

export const onGetMySavedRecipes = async (
): Promise<BackendResponse<RecipeResponse[]>> => {
  const res = await api.get("/recipes/saved");
  return res.data;
};