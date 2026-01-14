import * as SecureStore from 'expo-secure-store';

export class AsyncStorageUtils {
  static async save(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
  }

  static async get(key: string) {
    return await SecureStore.getItemAsync(key);
  }

  static async remove(key: string) {
    await SecureStore.deleteItemAsync(key);
  }
}
