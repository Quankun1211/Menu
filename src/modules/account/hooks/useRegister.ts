import { useMutation } from "@tanstack/react-query"
import { onRegisterApi } from "../services/api"
import { router } from "expo-router";

const useRegister = () => {
    const {data, error, isPending, isError, mutate} = useMutation({
        mutationKey: ["register"],
        mutationFn: onRegisterApi,
        onSuccess: (data) => {
            if(data) {
                router.replace("/(auth)/login")
            }
        }
    })
    return {data, error, isPending, isError, mutate}
}

export default useRegister