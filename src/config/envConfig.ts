import Constants from 'expo-constants';
interface Configuration {
    tokenKey: string;
    apiBaseUrl: string;
    refreshTokenKey: string;
    storageLocaleKey: string;
    storageThemeKey: string;
    keycloakUrl: string;
}

const env: Configuration = {
    tokenKey: Constants.expoConfig?.extra?.VITE_TOKEN_KEY || "",
    refreshTokenKey: Constants.expoConfig?.extra?.VITE_REFRESH_TOKEN_KEY || "",
    apiBaseUrl: Constants.expoConfig?.extra?.VITE_BASE_URL || "",
    storageLocaleKey: Constants.expoConfig?.extra?.VITE_LOCALE_KEY || "",
    storageThemeKey: Constants.expoConfig?.extra?.VITE_THEME_KEY || "",
    keycloakUrl: Constants.expoConfig?.extra?.VITE_KEYCLOAK_URL || ""
}

export default env