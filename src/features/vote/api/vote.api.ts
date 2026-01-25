// import { axiosInstance } from "@/lib/api/axiosInstance";
// import type { ApiResponse } from "@/types/api";

export async function castVoteApi(voteId: number, optionId: number): Promise<void> {
    // 🚧 MOCK: 백엔드 API가 준비될 때까지 가짜로 0.5초 대기 후 성공 처리
    // TODO: 백엔드 API 완성되면 아래 코드를 제거하세요.
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log(`[MOCK API] Vote Cast - VoteID: ${voteId}, OptionID: ${optionId}`);

    // 에러 테스트를 하고 싶으면 아래 주석을 푸세요
    // throw new Error("Mock API Error");

    /* 
    // ✅ REAL API CODE (백엔드 준비되면 주석 해제)
    try {
        await axiosInstance.post<ApiResponse<void>>(`/v1/votes/${voteId}/vote`, {
            optionId,
        });
    } catch (error: any) {
        console.error("투표 실패:", error);
        throw error;
    }
    */
}
