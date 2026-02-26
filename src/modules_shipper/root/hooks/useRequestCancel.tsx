import { useMutation, useQueryClient } from "@tanstack/react-query"
import { onCancelOrderApi } from "../services/api"

interface UpdateStatusPayload {
  orderId: string;
  reason: string;
}

const useRequestCancel = () => {
    const queryClient = useQueryClient();
    
    const { mutate, isPending, error, isError } = useMutation({
        mutationKey: ["cancel-order-shipper"],
        mutationFn: ({ orderId, reason }: UpdateStatusPayload) => {
            return onCancelOrderApi(orderId, reason);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-order-shipper"] });
        }
    })
    
    return { mutate, isPending, error, isError }
}

export default useRequestCancel;