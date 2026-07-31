import { BackendResponse } from "@/libs/shared/types/backend-response";
import { OrderResponse, OrderDetailResponse } from "../types/api-response";
import api from "@/services/axios";
import { CancelOrderRequest } from "../types/api-request";
export const onGetMyOrders = async (): Promise<
  BackendResponse<OrderResponse[]>
> => {
  const res = await api.get("/orders");
  return res.data;
};

export const onGetOrderDetail = async (orderId?: string) 
: Promise<BackendResponse<OrderDetailResponse>> => {
  const data = await api.get(`/orders/${orderId}`)
  return data.data
}

export const onCancelOrder = async(
  payload: CancelOrderRequest
) : Promise<BackendResponse<OrderResponse>> => {
  const data = await api.patch(`/orders/${payload.orderId}/cancellation`, {
    reason: payload.reason
  })
  return data.data
}

export const onResumeVnpayPayment = async (orderId: string) => {
  const { data } = await api.post(`/orders/${orderId}/payment-attempts`, {
    platform: "mobile",
  });
  return data;
};
