import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { useAuthStore } from "@/store/auth.store";
import { setRefreshToken } from "@/utils/token";
import { onSocialLoginApi } from "../services/api";
import type { SocialProvider } from "../types/api-response";

export default function useSocialLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);
  return useMutation({
    mutationKey: ["social-login"],
    mutationFn: ({ provider, token }: { provider: SocialProvider; token: string }) => onSocialLoginApi(provider, token),
    onSuccess: async (response) => {
      const accessToken = response.data?.access_token;
      const refreshToken = response.data?.refresh_token;
      const role = response.data?.role;
      if (!accessToken || !refreshToken || !role) throw new Error("Phản hồi đăng nhập mạng xã hội không hợp lệ");
      await Promise.all([setAuth(accessToken, role), setRefreshToken(refreshToken)]);
      router.replace(role === "shipper" ? "/(shipper)/dashboard_shipper" : "/(tabs)");
    },
  });
}
