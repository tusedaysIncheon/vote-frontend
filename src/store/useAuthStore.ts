import { create } from "zustand"
import { persist } from "zustand/middleware"
import axios from "axios"
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;


// ✅ 유저 정보 타입 (백엔드의 UserResponseDTO와 동일)
interface User {
  username: string
  email: string
  nickname: string | null
  isSocial: boolean
  needsNickname: boolean
}

// ✅ Zustand 스토어 타입 정의
interface AuthState {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean

  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
  setToken: (accessToken: string, user:User) => void
}

// ✅ Zustand 스토어 생성 (persist로 로컬스토리지 자동저장)
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,

      /**
       * 🟢 로그인 함수
       * 1️⃣ 백엔드 /vote/v1/auth/login 호출
       * 2️⃣ 토큰 + 유저정보를 Zustand에 저장
       * 3️⃣ axios 기본 헤더에 Authorization 추가
       */
      login: async (username, password) => {

        const deviceId = navigator.userAgent

        try {
          // 1️⃣ 로그인 요청 (POST)
          const res = await axios.post(
            `${API_BASE_URL}/v1/user/login`,
            {
              username,
              password,
              deviceId,
            },
            { withCredentials: true }
          )

          // 2️⃣ 응답 데이터 구조
          // res.data = { accessToken, user: {...} }
          const { accessToken, user } = res.data

          // 3️⃣ axios에 Authorization 헤더 기본 세팅 (자동 로그인 유지)
          axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

          // 4️⃣ Zustand 상태 업데이트
          set({
            user,
            accessToken,
            isAuthenticated: true,
          })

          console.log("✅ 로그인 성공:", user)
          
        } catch (err) {
          console.error("❌ 로그인 실패:", err)
          throw new Error("아이디 또는 비밀번호를 확인해주세요.")
        }
      },

      setToken: (accessToken,  user) => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
        set({
          accessToken,
          user,
          isAuthenticated: true,
        })
      },

      /**
       * 🔴 로그아웃 함수
       * 1️⃣ 상태 초기화
       * 2️⃣ axios Authorization 헤더 제거
       */
      logout: async () => {
        try{
          await axios.post(`${API_BASE_URL}/logout`,{},{withCredentials: true})
        }catch(error){
          console.warn("로그아웃 중 오류 발생",error)
        }finally{
          set({user: null, accessToken: null, isAuthenticated: false})
          delete axios.defaults.headers.common["Authorization"]
          console.log("AccessToken removed, refresh cookie cleanup handled by server")
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
)
