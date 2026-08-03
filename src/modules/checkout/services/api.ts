import { BackendResponse } from "@/libs/shared/types/backend-response";
import { AddAddressRequest, UpdateAddressRequest, PreviewCheckoutRequest, ApplyCouponRequest, CheckoutRequest } from "../types/api-request";
import { AddressModel, GetAddressesResponse, UpdateAddressResponse, PreviewCheckoutResponse, ApplyCouponResponse } from "../types/api-response";
import api from "@/services/axios";
import { OrderResponse } from "@/modules/order/types/api-response";

export const onAddAddressApi = async (
    payload: AddAddressRequest
) : Promise<BackendResponse<AddressModel>> => {
    const { data } = await api.post("/addresses", payload);
    return data
}
export const onGetAddressApi = async(): Promise<BackendResponse<GetAddressesResponse>> => {
    const {data} = await api.get("/addresses")
    return data
}

export const onGetAddressDetail = async (
  addressId?: string
): Promise<BackendResponse<AddressModel>> => {
  const { data } = await api.get(`/addresses/${addressId}`);
  return data;
};

export const onUpdateAddressApi = async (
  params: UpdateAddressRequest
): Promise<BackendResponse<UpdateAddressResponse>> => {
  const { addressId, ...body } = params;

  const { data } = await api.put(
    `/addresses/${addressId}`,
    body
  );

  return data;
};
export const previewCheckoutApi = async (
  body: PreviewCheckoutRequest
): Promise<BackendResponse<PreviewCheckoutResponse>> => {
  const { data } = await api.post("/checkout-previews", body)
  return data
}

export const applyCouponApi = async (
  payload: ApplyCouponRequest
): Promise<BackendResponse<ApplyCouponResponse>> => {
  const { data } = await api.post("/coupons/validation", payload);
  return data;
};

export const onCheckoutApi = async(
  payload: CheckoutRequest
): Promise<BackendResponse<OrderResponse>> => {
  const { data } = await api.post("/orders", payload)
  if (!data?.success || !data?.data?.orderId) {
    const error = new Error(data?.message || "Không thể xác nhận đơn hàng") as Error & { code?: string; details?: unknown };
    error.code = data?.code;
    error.details = data?.details;
    throw error;
  }
  return data
}
