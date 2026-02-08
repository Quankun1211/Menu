import { BackendResponse } from "@/libs/shared/types/backend-response";
import api from "@/services/axios";
import { MyCouponResponse, WalletResponse } from "../types/api-response";

export const onGetWallet = async (
): Promise<BackendResponse<WalletResponse>> => {
  const res = await api.get("/order/wallet");

  return res.data;
};

export const onConfirm = async (
): Promise<BackendResponse<WalletResponse>> => {
  const res = await api.post("/order/claim-reward");
  return res.data;
};

export const onGetCoupon = async (
): Promise<BackendResponse<MyCouponResponse>> => {
  const res = await api.get("/order/my-coupon");
  return res.data;
};

export const onCreateMyRecipe = async (
  formData: FormData
): Promise<BackendResponse<any>> => {
  const res = await api.post("/menu/recipe/create-my-recipes", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};