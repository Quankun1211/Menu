import axios, { AxiosError, InternalAxiosRequestConfig, isAxiosError } from "axios";
import { ApiUrls } from "../config/url";
import {
  getRefreshToken,
  setRefreshToken,
} from "../utils/token";
import { useAuthStore } from "@/store/auth.store";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { getFriendlyError } from "@/utils/friendlyError";

const api = axios.create({
  baseURL: ApiUrls.apiBaseUrl,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

type RefreshedTokens = {
  access_token: string;
  refresh_token: string;
};

let refreshRequest: Promise<RefreshedTokens> | null = null;
let sessionExpiryHandled = false;
let lastErrorToast = { message: "", at: 0 };
const showErrorToast = (message: string) => {
  const now = Date.now();
  if (lastErrorToast.message === message && now - lastErrorToast.at < 3000) return;
  lastErrorToast = { message, at: now };
  Toast.show({ type: "error", text1: "Chưa thể thực hiện", text2: message, visibilityTime: 4500 });
};

const getTokenExpiry = (token: string): number | null => {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
    const decoded = JSON.parse(globalThis.atob(padded));
    return typeof decoded.exp === 'number' ? decoded.exp * 1000 : null;
  } catch {
    return null;
  }
};

const tokenNeedsRefresh = (token: string) => {
  const expiresAt = getTokenExpiry(token);
  return expiresAt !== null && expiresAt - Date.now() <= 30_000;
};

const isTerminalRefreshError = (error: unknown) => {
  if (!isAxiosError(error)) return false;
  return [400, 401, 403].includes(error.response?.status ?? 0);
};

const expireLocalSession = async () => {
  if (sessionExpiryHandled) return;
  sessionExpiryHandled = true;
  await useAuthStore.getState().logout();
  Toast.show({
    type: 'info',
    text1: 'Phiên đăng nhập đã hết hạn',
    text2: 'Vui lòng đăng nhập lại để tiếp tục.',
  });
  router.replace('/(auth)/login');
};

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
        sessionExpiryHandled = false;
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
    let token = useAuthStore.getState().token;
    const isAuthApi = config.url?.includes('/auth/');

    if (token && !isAuthApi && tokenNeedsRefresh(token)) {
      const storedRefreshToken = await getRefreshToken();
      if (!storedRefreshToken) {
        await expireLocalSession();
        return Promise.reject(new Error('Refresh token is unavailable'));
      }
      try {
        const refreshed = await refreshSession(storedRefreshToken);
        token = refreshed.access_token;
      } catch (refreshError) {
        if (isTerminalRefreshError(refreshError)) {
          await expireLocalSession();
        }
        return Promise.reject(refreshError);
      }
    }
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
        await expireLocalSession();
        return Promise.reject(error);
      }

      try {
        const { access_token } = await refreshSession(refreshToken);

        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        if (isTerminalRefreshError(refreshError)) {
          await expireLocalSession();
        }
        return Promise.reject(refreshError);
      }
    }

    if (__DEV__) {
      console.warn('[API]', error.response?.status ?? error.code, originalRequest?.url, error.message);
    }

    const friendlyMessage = getFriendlyError(error);
    error.message = friendlyMessage;
    if (error.response?.data && typeof error.response.data === "object") error.response.data.message = friendlyMessage;
    showErrorToast(friendlyMessage);
    return Promise.reject(error);
  }
);

export default api;
