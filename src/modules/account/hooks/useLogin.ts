import { useMutation } from "@tanstack/react-query"
import { onLoginApi } from "../services/api"
import { router } from "expo-router";
import { useAuthStore } from "@/store/auth.store";
import { setRefreshToken } from "@/utils/token";

const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ["login"],
    mutationFn: onLoginApi,
    onSuccess: async (res) => {
      const token = res?.data?.access_token;
      const refreshToken = res?.data?.refresh_token;
      const role = res?.data?.role; 

      if (!token || !refreshToken || !role) {
        console.error("Thiếu token, refresh token hoặc role từ API");
        return;
      }

      await Promise.all([
        setAuth(token, role),
        setRefreshToken(refreshToken),
      ]);

      if (role === 'shipper') {
        router.replace("/(shipper)/dashboard_shipper"); 
      } else {
        router.replace("/(tabs)");
      }
    },
    onError: (err: any) => {
      console.log("Login failed:", err?.response?.data || err.message);
    },
  });

  return { mutate, isPending, isError, error };
};

export default useLogin;
