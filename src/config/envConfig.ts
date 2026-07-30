interface Configuration {
  apiBaseUrl: string;
  tokenKey: string;
  refreshTokenKey: string;
  storageLocaleKey: string;
  storageThemeKey: string;
}

const env: Configuration = {
  apiBaseUrl: `${(process.env.EXPO_PUBLIC_API_BASE_URL ?? "").replace(/\/$/, "")}/v1`,
  tokenKey: process.env.EXPO_PUBLIC_TOKEN_KEY ?? "token",
  refreshTokenKey: process.env.EXPO_PUBLIC_REFRESH_TOKEN_KEY ?? "refresh_token",
  storageLocaleKey: process.env.EXPO_PUBLIC_LOCALE_KEY ?? "locale",
  storageThemeKey: process.env.EXPO_PUBLIC_THEME_KEY ?? "theme",
};

export default env;
