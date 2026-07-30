import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { ApiUrls } from "../config/url";
import {
  getRefreshToken,
  setRefreshToken,
} from "../utils/token";
import { useAuthStore } from "@/store/auth.store";
import { router } from "expo-router";

const api = axios.create({
  baseURL: ApiUrls.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

type RefreshedTokens = {
  access_token: string;
  refresh_token: string;
};

let refreshRequest: Promise<RefreshedTokens> | null = null;

const refreshSession = async (refreshToken: string): Promise<RefreshedTokens> => {
  if (!refreshRequest) {
    refreshRequest = axios
      .post(
        `${ApiUrls.apiBaseUrl}${ApiUrls.auth.refreshToken}`,
        { token: refreshToken, clientType: "mobile" }
      )
      .then(async (res) => {
        const tokens = res.data.data as RefreshedTokens;
        await Promise.all([
          useAuthStore.getState().refreshAccessToken(tokens.access_token),
          setRefreshToken(tokens.refresh_token),
        ]);
        return tokens;
      })
      .finally(() => {
        refreshRequest = null;
      });
  }
  return refreshRequest;
};

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token; 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>) => {
    const originalRequest: any = error.config;

    const isUnauthorized = error.response?.status === 401;
    const isAuthApi = originalRequest?.url?.includes("/auth/");

    if (isUnauthorized && !originalRequest._retry && !isAuthApi) {
      originalRequest._retry = true;

      const refreshToken = await getRefreshToken();

      if (!refreshToken) {
        await useAuthStore.getState().logout();
        router.replace("/(auth)/login");
        return Promise.reject(error);
      }

      try {
        const { access_token } = await refreshSession(refreshToken);

        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        await useAuthStore.getState().logout();
        router.replace("/(auth)/login");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
