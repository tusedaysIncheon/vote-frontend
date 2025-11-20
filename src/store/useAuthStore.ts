import { axiosInstance } from "@/lib/api/axiosInstance";
import { create } from "zustand";
import { persist } from "zustand/middleware";
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

//유저 정보 타입 (백엔드의 UserResponseDTO와 동일)
interface User {
  username: string;
  email: string;
  nickname: string | null;
  isSocial: boolean;
  needsNickname: boolean;
}

//Zustand 스토어 타입 정의
interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;

  login: (username: string, password: string) => Promise<void>;
  logout: (options?: { skipServer?: boolean }) => Promise<void>;
  setToken: (accessToken: string, user: User | null) => void;
}

//Zustand 스토어 생성 (persist로 로컬스토리지 자동저장)
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,

      /**
       * 🟢 로그인 함수
       */
      login: async (username, password) => {

        let deviceId = localStorage.getItem("deviceId");
        if (!deviceId) {
          deviceId = crypto.randomUUID();
          localStorage.setItem("deviceId", deviceId);
        }

        try {
          //로그인 요청 (POST)
          const res = await axiosInstance.post(
            "/v1/user/login",
            {username, password, deviceId},
            { skipAuth: true}
          );

          //응답 데이터 구조
          // res.data = { accessToken, user: {...} }
          const { accessToken, user } = res.data;

          // 4️⃣ Zustand 상태 업데이트
          set({
            user,
            accessToken,
            isAuthenticated: true,
          });

        } catch (err) {
          console.error("❌ 로그인 실패:", err);
          throw new Error("아이디 또는 비밀번호를 확인해주세요.");
        }
      },

      setToken: (accessToken, user) => {
        set({
          accessToken,
          user,
          isAuthenticated: true,
        });
      },

      /**
       * 로그아웃 함수
       */
      logout: async (options) => {
        const token = get().accessToken;

        try {
          if (!options?.skipServer && token) {
            await axiosInstance.post(
              "/logout",
              {},
              { headers: { Authorization: `Bearer ${token}`}}
            )
          }
        } catch (error) {
          console.warn("로그아웃 중 오류 발생", error);
        } finally {
          set({ user: null, accessToken: null, isAuthenticated: false });

          delete axiosInstance.defaults.headers.common["Authorization"];
        }
      },
    }),
    {
      name: "auth-storage", // localStorage 키 이름
      partialize: (state) => ({
        // 저장할 항목만 선택
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
