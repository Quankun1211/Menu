import { useQuery } from "@tanstack/react-query"
import { onGetAllOrderShipperApi } from "../services/api"

const useGetAllOrderShipper = () => {
    const { data, isPending, error, isError } = useQuery({
        queryKey: ["get-all-order-shipper"],
        queryFn: () => {
            return onGetAllOrderShipperApi()
        }
    })
    return { data, isPending, error, isError }
}

export default useGetAllOrderShipper