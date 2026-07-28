import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSocket } from "./SocketContext";

type OrderUpdatedPayload = {
  orderId: string;
  status?: string;
};

export default function OrderRealtimeSync() {
  const socket = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    const syncOrders = ({ orderId }: OrderUpdatedPayload) => {
      queryClient.invalidateQueries({ queryKey: ["get-my-orders"] });
      queryClient.invalidateQueries({ queryKey: ["get-my-orders-detail", orderId] });
      queryClient.invalidateQueries({ queryKey: ["get-order-shipper"] });
      queryClient.invalidateQueries({ queryKey: ["get-all-order-shipper"] });
      queryClient.invalidateQueries({ queryKey: ["shipper-stats"] });
    };

    socket.on("order_updated", syncOrders);
    return () => {
      socket.off("order_updated", syncOrders);
    };
  }, [queryClient, socket]);

  return null;
}
