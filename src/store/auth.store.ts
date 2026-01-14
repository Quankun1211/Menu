import { create } from "zustand"
import { AsyncStorageUtils } from "../utils/AsyncStorageUtils"

type AuthState = {
  token: string | null
  loading: boolean

  initAuth: () => Promise<void>
  setToken: (token: string | null) => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  loading: true,

  initAuth: async () => {
    const token = await AsyncStorageUtils.get("token")
    set({ token: token || null, loading: false })
  },

  setToken: async (token) => {
    if (token) {
      await AsyncStorageUtils.save("token", token)
    } else {
      await AsyncStorageUtils.remove("token")
    }
    set({ token })
  },

  logout: async () => {
    await AsyncStorageUtils.remove("token")
    set({ token: null, loading: false })
  },
}))

