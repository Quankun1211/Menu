import { create } from "zustand"
import { AsyncStorageUtils } from "../utils/AsyncStorageUtils"

type AuthState = {
  token: string | null
  role: string | null
  loading: boolean

  initAuth: () => Promise<void>
  setAuth: (token: string, role: string) => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  role: null,
  loading: true,

  initAuth: async () => {
    try {
      const [token, role] = await Promise.all([
        AsyncStorageUtils.get("token"),
        AsyncStorageUtils.get("role")
      ]);
      set({ token: token || null, role: role || null, loading: false });
    } catch (e) {
      set({ loading: false });
    }
  },

  setAuth: async (token, role) => {
    await Promise.all([
      AsyncStorageUtils.save("token", token),
      AsyncStorageUtils.save("role", role)
    ]);
    set({ token, role });
  },

  logout: async () => {
    await Promise.all([
      AsyncStorageUtils.remove("token"),
      AsyncStorageUtils.remove("role")
    ]);
    set({ token: null, role: null, loading: false });
  },
}))