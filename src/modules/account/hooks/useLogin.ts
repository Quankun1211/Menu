import { useMutation } from "@tanstack/react-query"
import { onLoginApi } from "../services/api"
import { router } from "expo-router";
import { useAuthStore } from "@/store/auth.store";

const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ["login"],
    mutationFn: onLoginApi,
    onSuccess: async (res) => {
      const token = res?.data?.access_token;
      const role = res?.data?.role; 

      if (!token || !role) {
        console.error("Thiếu token hoặc role từ API");
        return;
      }

      await setAuth(token, role);

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