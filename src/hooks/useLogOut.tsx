import { useMutation, useQueryClient } from "@tanstack/react-query";
import { onLogoutApi } from "../services/api";
import { useAuthStore } from "../store/auth.store"; 
import { removeRefreshToken } from "../utils/token";

const useLogout = () => {
    const queryClient = useQueryClient();
    const { logout } = useAuthStore();

    const { data, error, isPending, isError, mutate } = useMutation({
        mutationKey: ["logout"],
        mutationFn: onLogoutApi,
        onSuccess: async () => {
            await logout();

            await removeRefreshToken();

            queryClient.clear();
            
            console.log("Logout successfully");
        },
        onError: (err) => {
            console.error("Logout failed:", err);
        }
    });

    return { data, error, isPending, isError, onLogout: mutate };
};

export default useLogout;