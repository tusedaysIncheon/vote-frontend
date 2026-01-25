import {
    type UserLoadDTO,
    type UserRequestDTO,
    type UserResponseDTO,
} from "@/types/auth";
import type { ApiResponse } from "@/types/api";
import { axiosInstance } from "@/lib/api/axiosInstance";
import type {
    UserDetailRequestDTO,
} from "@/types/profile";

//내정보조회 API
export async function getMyInfoAPI(): Promise<UserResponseDTO> {
    try {
        const response = await axiosInstance.get<ApiResponse<UserResponseDTO>>("/v1/user");
        return response.data.data;
    } catch (error: any) {
        console.error("내정보조회 실패:", error);
        throw new Error("사용자 정보를 불러오지 못했습니다.");
    }
}

//내정보수정 API
export async function updateMyInfoAPI(data: Partial<UserRequestDTO>) {
    try {
        const response = await axiosInstance.put<ApiResponse<number>>("/v1/user", data);
        return response.data.data;
    } catch (error: any) {
        console.error("❌ 내 정보 수정 실패:", error);
        throw new Error(
            error?.response?.data?.message || "내 정보 수정 중 오류가 발생했습니다."
        );
    }
}

//회원탈퇴API
export async function deleteUserApi() {
    try {
        const response = await axiosInstance.delete<ApiResponse<boolean>>("/v1/user");
        return response.data.data;
    } catch (error: any) {
        console.error("❌ 회원 탈퇴 실패:", error);
        throw new Error(
            error?.response?.data?.message || "회원 탈퇴 중 문제가 발생했습니다."
        );
    }
}

//유저 상세정보 저장 요청 API
export async function saveUserDetails(data: UserDetailRequestDTO) {
    const response = await axiosInstance.post<ApiResponse<string>>("/v1/user-details", data);

    return response.data.data;
}

//유저 상세정보 불러오기 API
export async function getUserDetails() {
    // Assuming generic type usage matches what backend returns or what frontend expects
    const response = await axiosInstance.get<ApiResponse<UserDetailRequestDTO>>(
        "/v1/user-details"
    );
    return response.data.data;
}

//로그인 직후 스토어 저장용
export async function getUserLoadInfo() {
    const response = await axiosInstance.get<ApiResponse<UserLoadDTO>>("/v1/user/load-info");

    return response.data.data;
}
