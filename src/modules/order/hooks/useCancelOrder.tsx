import { useMutation, useQueryClient } from "@tanstack/react-query"
import { onCancelOrder } from "../services/api"
import { CancelOrderRequest } from "../types/api-request"
import Toast from "react-native-toast-message"

const useCancelOrder = () => {
    const queryClient = useQueryClient()
    const { mutate, isPending, isError } = useMutation({
        mutationKey: ["cancel-order"],
        mutationFn: (payload: CancelOrderRequest) => {
            return onCancelOrder(payload)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["get-my-orders"],
            });
            queryClient.invalidateQueries({
                queryKey: ["get-my-orders-detail"]
            })
        },
        onError: (error: any) => {
            Toast.show({
                type: "error",
                text1: "Không thể hủy đơn",
                text2: error?.response?.data?.message || error?.message,
            });
        },
    })
    return {mutate, isPending, isError}
}

export default useCancelOrder
