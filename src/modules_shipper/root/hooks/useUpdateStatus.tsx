import { useMutation, useQueryClient } from "@tanstack/react-query"
import { onUpdateStatusOrderApi } from "../services/api"

interface UpdateStatusPayload {
  orderId: string;
  nextStatus: string;
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
        }
    })
    
    return { mutate, isPending, error, isError }
}

export default useUpdateStatusShipper;