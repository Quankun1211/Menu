import { useMutation } from "@tanstack/react-query"
import { onUpdateShipperLocation } from "../services/api"

interface UpdateLocation {
  orderId: string, 
  latitude: number, 
  longitude: number
}

const useUpdateLocation = () => {
    
    const { mutate, mutateAsync, isPending, error, isError } = useMutation({
        mutationKey: ["update-location-shipper"],
        scope: { id: "shipper-location-sync" },
        mutationFn: ({ orderId, latitude, longitude }: UpdateLocation) => {
            return onUpdateShipperLocation(orderId, latitude, longitude);
        },
        retry: 2,
        retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 5000),
    })
    
    return { mutate, mutateAsync, isPending, error, isError }
}

export default useUpdateLocation;
