import {
    type UserRequestDTO,
    type UserResponseDTO,
} from "@/types/auth";
import type { ApiResponse } from "@/types/api";
import { axiosInstance } from "@/lib/api/axiosInstance";
import { getDeviceId } from "@/lib/utils";

// 회원 가입 API 호출
export async function signUpApi(
    userData: UserRequestDTO
): Promise<UserResponseDTO> {
    try {
        const response = await axiosInstance.post<ApiResponse<UserResponseDTO>>(
            "/v1/user",
            userData,
            { skipAuth: true }
        );

        return response.data.data;
    } catch (error: any) {
        console.error("회원가입 실패:", error);
        const message =
            error?.response?.data?.message ||
            error?.message ||
            "회원가입 중 오류가 발생했습니다.";

        throw new Error(message);
    }
}

// 중복 검사 API 호출
export async function existUserApi(username: string): Promise<boolean> {
    try {
        const response = await axiosInstance.post<ApiResponse<boolean>>(
            "/v1/user/exist",
            { username },
            { skipAuth: true }
        );

        return response.data.data;
    } catch (error: any) {
        console.error("❌ 아이디 중복 검사 오류:", error);

        const message =
            error?.response?.data?.message ||
            error?.message ||
            "아이디 중복 검사 중 오류가 발생했습니다.";

        throw new Error(message);
    }
}

//로그인API
export async function loginAPI(username: string, password: string) {
    let deviceId = localStorage.getItem("deviceId");
    if (!deviceId) {
        deviceId = crypto.randomUUID();
        localStorage.setItem("deviceId", deviceId);
    }

    const response = await axiosInstance.post(
        "v1/user/login",
        {
            username,
            password,
            deviceId,
        },
        { skipAuth: true }
    );
    // login returns AuthLoginResponseDTO inside ApiResponse
    return response.data.data;
}

//로그아웃 API
export async function logoutAPI() {
    console.log("로그아웃 함수 시작");
    try {
        const deviceId = getDeviceId();
        await axiosInstance.post("v1/user/logout", {
            deviceId: deviceId,
        });
        console.log(deviceId);
    } catch (err) {
        console.warn("로그아웃 요청 중 오류 발생 (무시하고 진행):", err);
    }
}
