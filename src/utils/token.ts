import { AsyncStorageUtils } from './AsyncStorageUtils';
import env from '../config/envConfig';

export const setToken = async (token: string) => {
  await AsyncStorageUtils.save(env.tokenKey, token);
};

export const getToken = async () => {
  return await AsyncStorageUtils.get(env.tokenKey);
};

export const setRefreshToken = async (refreshToken: string) => {
  await AsyncStorageUtils.save(env.refreshTokenKey, refreshToken);
};

export const getRefreshToken = async () => {
  return await AsyncStorageUtils.get(env.refreshTokenKey);
};

export const removeToken = async () => {
  await AsyncStorageUtils.remove(env.tokenKey);
};

export const removeRefreshToken = async () => {
  await AsyncStorageUtils.remove(env.refreshTokenKey);
};
