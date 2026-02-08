import { useMutation } from "@tanstack/react-query"
import { onLoginApi } from "../services/api"
import { router } from "expo-router";
import { useAuthStore } from "@/store/auth.store";
const useLogin = () => {
  const setToken = useAuthStore((state) => state.setToken);

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ["login"],
    mutationFn: onLoginApi,
    onSuccess: async (res) => {
      console.log("Login successful");
      const token = res?.data?.access_token;
      console.log(token);
      
      if (!token) return;

      await setToken(token);
      router.replace("/(tabs)");
    },
    onError: (err: any) => {
      console.log("Login failed:", err?.response?.data || err.message);
    },
  });

  return { mutate, isPending, isError, error };
};

export default useLogin;