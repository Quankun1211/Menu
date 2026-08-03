import { useMutation, useQueryClient } from "@tanstack/react-query"
import { onUpdateShipperStatus } from "../services/api"

interface UpdateStatusPayload {
  isOnline: boolean;
}

const useUpdateShipperStatus = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending, error, isError } = useMutation({
        mutationKey: ["update-status-shipper"],
        mutationFn: ({ isOnline }: UpdateStatusPayload) => {
            return onUpdateShipperStatus(isOnline);
        },
        onSuccess: (response, variables) => {
            queryClient.setQueryData(["me"], (current: any) => current ? {
                ...current,
                data: { ...current.data, isOnline: response?.data?.isOnline ?? variables.isOnline },
            } : current);
            queryClient.invalidateQueries({ queryKey: ["me"] });
        },
    })
    
    return { mutate, isPending, error, isError }
}

export default useUpdateShipperStatus;
