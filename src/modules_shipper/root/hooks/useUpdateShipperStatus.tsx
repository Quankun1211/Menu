import { useMutation, useQueryClient } from "@tanstack/react-query"
import { onUpdateShipperStatus } from "../services/api"

interface UpdateStatusPayload {
  isOnline: boolean;
}

const useUpdateShipperStatus = () => {
    
    const { mutate, isPending, error, isError } = useMutation({
        mutationKey: ["update-status-shipper"],
        mutationFn: ({ isOnline }: UpdateStatusPayload) => {
            return onUpdateShipperStatus(isOnline);
        }
    })
    
    return { mutate, isPending, error, isError }
}

export default useUpdateShipperStatus;