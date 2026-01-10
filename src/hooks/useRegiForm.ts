import { existUserApi, loginAPI, signUpApi } from "@/lib/api/UserApi";
import { useAuthStore } from "@/store/useAuthStore";
import type { UserRequestDTO } from "@/types/auth";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useRegiForm(form: any) {
  const navigate = useNavigate();
  
  // ✅ Zustand 스토어 함수 가져오기
  const { setAccessToken } = useAuthStore(); 

  const onSubmit = useCallback(
    async (data: UserRequestDTO) => {
      try {
        // 1. 회원가입 요청
        const signUpResult = await signUpApi(data);
        
        // 2. 가입 성공 즉시 자동 로그인 요청
        const loginResult = await loginAPI(data.username || "", data.password || "");

        // 3. 토큰 추출
        const token = loginResult.accessToken || loginResult.token; 
        
        if (token) {
        
          setAccessToken(token);

          toast.success(`${signUpResult.username}님 가입을 축하합니다! 🎉`, {
            description: "로그인되었습니다. 프로필을 완성해주세요! 🗳️",
          });

          form.reset();
          
          navigate("/profile-setup", { replace: true });
        } else {
          throw new Error("토큰을 받아오지 못했습니다.");
        }

      } catch (error) {
        console.error("회원가입 프로세스 에러", error);
        toast.error("가입은 되었으나 로그인에 실패했습니다. 😢", {
          description: "로그인 페이지에서 다시 시도해주세요.",
        });
        navigate("/login", { replace: true }); 
      }
    },
    [form, navigate, setAccessToken]
  );

  const checkUsernameExists = useCallback(async (username: string) => {
    if (!username) return;
    try {
      const exist = await existUserApi(username);
      if (exist) toast.error("이미 사용 중인 아이디입니다. 😢");
      else toast.success("사용 가능한 아이디입니다! 🎉");
    } catch {
      toast.error("아이디 중복 확인에 실패했습니다. 😢");
    }
  }, []);

  const handleBlurUsername = useCallback(
    (value: string) => {
      if (value.trim()) checkUsernameExists(value.trim());
    },
    [checkUsernameExists]
  );

  return { onSubmit, handleBlurUsername };


}
