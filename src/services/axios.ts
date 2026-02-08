import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { ApiUrls } from "../config/url";
import {
  getToken,
  getRefreshToken,
  setToken,
  setRefreshToken,
  removeToken,
  removeRefreshToken,
} from "../utils/token";
import { useAuthStore } from "@/store/auth.store";
import { router } from "expo-router";

const api = axios.create({
  baseURL: ApiUrls.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

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
        await removeToken();
        await removeRefreshToken();
        router.replace("/(auth)/login");
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(
          `${ApiUrls.apiBaseUrl}${ApiUrls.auth.refreshToken}`,
          { token: refreshToken }
        );

        const { access_token, refresh_token } = res.data.data;

        await setToken(access_token);
        await setRefreshToken(refresh_token);

        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        await removeToken();
        await removeRefreshToken();
        router.replace("/(auth)/login");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
