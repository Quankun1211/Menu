import { useQuery } from "@tanstack/react-query"
import { onGetOrderShipperApi } from "../services/api"

const useGetOrderShipper = () => {
    const { data, isPending, error, isError } = useQuery({
        queryKey: ["get-order-shipper"],
        queryFn: () => {
            return onGetOrderShipperApi()
        }
    })
    return { data, isPending, error, isError }
}

export default useGetOrderShipper