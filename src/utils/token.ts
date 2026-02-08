import { AsyncStorageUtils } from './AsyncStorageUtils';
import { STORAGE_KEYS } from '@/constants/storageKeys';
export const setToken = async (token: string) => {
  await AsyncStorageUtils.save(STORAGE_KEYS.TOKEN, token);
};

export const getToken = async () => {
  return await AsyncStorageUtils.get(STORAGE_KEYS.TOKEN);
};

export const setRefreshToken = async (refreshToken: string) => {
  await AsyncStorageUtils.save(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
};

export const getRefreshToken = async () => {
  return await AsyncStorageUtils.get(STORAGE_KEYS.REFRESH_TOKEN);
};

export const removeToken = async () => {
  await AsyncStorageUtils.remove(STORAGE_KEYS.TOKEN);
};

export const removeRefreshToken = async () => {
  await AsyncStorageUtils.remove(STORAGE_KEYS.REFRESH_TOKEN);
};
