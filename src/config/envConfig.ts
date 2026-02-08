import Constants from "expo-constants";

interface Configuration {
  apiBaseUrl: string;
  tokenKey: string;
  refreshTokenKey: string;
  storageLocaleKey: string;
  storageThemeKey: string;
}

const extra = Constants.expoConfig?.extra ?? {};

const env: Configuration = {
  apiBaseUrl: extra.API_BASE_URL ?? "",
  tokenKey: extra.TOKEN_KEY ?? "token",
  refreshTokenKey: extra.REFRESH_TOKEN_KEY ?? "refresh_token",
  storageLocaleKey: extra.LOCALE_KEY ?? "locale",
  storageThemeKey: extra.THEME_KEY ?? "theme",
};

export default env;
