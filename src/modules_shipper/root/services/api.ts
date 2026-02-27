import { BackendResponse } from "@/libs/shared/types/backend-response";
import { OrderResponse } from "@/modules/order/types/api-response";
import api from "@/services/axios";

export const onGetOrderShipperApi = async (): Promise<
  BackendResponse<OrderResponse[]>
> => {
  const { data } = await api.get("/shipper/orders");
  return data;
};

export const onGetAllOrderShipperApi = async (): Promise<
  BackendResponse<OrderResponse[]>
> => {
  const { data } = await api.get("/shipper/all-orders");
  return data;
};

export const onUpdateStatusOrderApi = async (
  orderId: string, 
  nextStatus: string
): Promise<BackendResponse<OrderResponse>> => {
  const { data } = await api.patch("/shipper/update", { orderId, nextStatus });
  return data;
}

export const onCancelOrderApi = async (orderId: string, reason: string): Promise<BackendResponse<OrderResponse>> => {
  const { data } = await api.post("/shipper/request-cancel", { orderId, reason });
  return data;
}

export const onUpdateShipperStatus = async (isOnline: boolean) => {
  const { data } = await api.put("/shipper/update-online", {isOnline})
  return data
}

export const onUpdateShipperLocation = async (orderId: string, latitude: number, longitude: number) => {
  const { data } = await api.put("/shipper/update-location", { orderId, latitude, longitude })
  return data
}