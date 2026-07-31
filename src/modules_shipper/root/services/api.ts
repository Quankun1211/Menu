import { BackendResponse } from "@/libs/shared/types/backend-response";
import { OrderResponse } from "@/modules/order/types/api-response";
import api from "@/services/axios";
import type { ShipperNextStatus } from "../utils/orderWorkflow";

export const onGetOrderShipperApi = async (): Promise<
  BackendResponse<OrderResponse[]>
> => {
  const { data } = await api.get("/shippers/orders/assigned");
  return data;
};

export const onGetAllOrderShipperApi = async (): Promise<
  BackendResponse<OrderResponse[]>
> => {
  const { data } = await api.get("/shippers/orders");
  return data;
};

export const onUpdateStatusOrderApi = async (
  orderId: string, 
  nextStatus: ShipperNextStatus
): Promise<BackendResponse<OrderResponse>> => {
  const { data } = await api.patch(`/shippers/orders/${orderId}/status`, { nextStatus });
  return data;
}

export const onCancelOrderApi = async (orderId: string, reason: string): Promise<BackendResponse<OrderResponse>> => {
  const { data } = await api.post(`/shippers/orders/${orderId}/cancellation-requests`, { reason });
  return data;
}

export const onUpdateShipperStatus = async (isOnline: boolean) => {
  const { data } = await api.put("/shippers/me/availability", {isOnline})
  return data
}

export const onUpdateShipperLocation = async (orderId: string, latitude: number, longitude: number) => {
  const { data } = await api.put(`/shippers/orders/${orderId}/location`, { latitude, longitude })
  return data
}

export type ShipperStats = {
  total: number;
  active: number;
  delivered: number;
  cancelled: number;
  pendingCancel: number;
  codCollected: number;
  averageDeliveryMinutes: number;
};

export const onGetShipperStatsApi = async (): Promise<BackendResponse<ShipperStats>> => {
  const { data } = await api.get("/shippers/me/statistics");
  return data;
};
