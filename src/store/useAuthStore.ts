import { create } from "zustand";
import { queryClient } from "@/main";
import { logoutAPI } from "@/lib/api/UserApi";

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  setAccessToken: (token: string | null) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  isAuthenticated: false,
  setAccessToken: (token) => set({ accessToken: token, isAuthenticated: !!token }),
  logout: async () => {
    try {
      await logoutAPI();
    } catch (error) {
      console.error("로그아웃 요청 실패:", error);
    } finally {
      set({ accessToken: null, isAuthenticated: false });
      queryClient.removeQueries({ queryKey: ['user'], exact: true });
    }
  },
}));