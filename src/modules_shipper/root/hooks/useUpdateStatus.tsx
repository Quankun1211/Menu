import { useMutation, useQueryClient } from "@tanstack/react-query"
import { onUpdateStatusOrderApi } from "../services/api"
import type { ShipperNextStatus } from "../utils/orderWorkflow";

interface UpdateStatusPayload {
  orderId: string;
  nextStatus: ShipperNextStatus;
}

const useUpdateStatusShipper = () => {
    const queryClient = useQueryClient();
    
    const { mutate, isPending, error, isError } = useMutation({
        mutationKey: ["update-status-shipper"],
        mutationFn: ({ orderId, nextStatus }: UpdateStatusPayload) => {
            return onUpdateStatusOrderApi(orderId, nextStatus);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-order-shipper"] });
            queryClient.invalidateQueries({ queryKey: ["get-all-order-shipper"] });
            queryClient.invalidateQueries({ queryKey: ["get-shipper-stats"] });
        }
    })
    
    return { mutate, isPending, error, isError }
}

export default useUpdateStatusShipper;
