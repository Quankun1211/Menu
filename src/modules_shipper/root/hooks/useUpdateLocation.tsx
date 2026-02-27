import { useMutation, useQueryClient } from "@tanstack/react-query"
import { onUpdateShipperLocation } from "../services/api"

interface UpdateLocation {
  orderId: string, 
  latitude: number, 
  longitude: number
}

const useUpdateLocation = () => {
    
    const { mutate, isPending, error, isError } = useMutation({
        mutationKey: ["update-status-shipper"],
        mutationFn: ({ orderId, latitude, longitude }: UpdateLocation) => {
            return onUpdateShipperLocation(orderId, latitude, longitude);
        },
        onSuccess: () => {
            console.log("Update location successfully");
        },
        onError: () => {
            console.log("Update location failed");
        }
    })
    
    return { mutate, isPending, error, isError }
}

export default useUpdateLocation;