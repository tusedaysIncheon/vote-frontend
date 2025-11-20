# React Query + axiosInstance + Zustand 통합 가이드

## 1. React Query란?

React Query는 프론트엔드에서 서버 상태(Server State)를 효율적으로
관리하는 라이브러리로, 다음 기능을 자동으로 제공한다.

-   API 응답 캐싱
-   중복 요청 제거
-   화면 이탈 후 복귀 시 캐시 재사용
-   백그라운드 최신화
-   로딩/에러 상태 자동 관리
-   Mutation 이후 관련 데이터 자동 갱신(invalidate)
-   Optimistic Update 지원

------------------------------------------------------------------------

## 2. 프로젝트 Root 설정 (필수: QueryClientProvider)

### /src/main.tsx

``` tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: true,
      staleTime: 1000 * 60, // 1분 동안 캐시 유지
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
```

------------------------------------------------------------------------

## 3. React Query 기반 API 호출 예시

### 예: 내 정보 조회 API (GET /v1/user)

``` tsx
import { useQuery } from "@tanstack/react-query";
import { getMyInfoApi } from "@/api/user.api";

export function useMyInfo() {
  return useQuery({
    queryKey: ["user", "me"],
    queryFn: getMyInfoApi,
  });
}
```

사용 예시:

``` tsx
const { data, isLoading, isError } = useMyInfo();
```

------------------------------------------------------------------------

## 4. Mutation 예제 (닉네임 변경)

``` tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNicknameApi } from "@/api/user.api";

export function useUpdateNickname() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNicknameApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["user", "me"]); // 자동 최신화
    },
  });
}
```

------------------------------------------------------------------------

## 5. axiosInstance + skipAuth 조합

React Query는 단순히 API 결과를 관리하고,\
실제 요청에는 axiosInstance를 사용한다.

### axiosInstance가 하는 역할

-   Authorization 자동 첨부
-   refreshToken 실패 시 자동 logout
-   skipAuth 옵션으로 인증 제외 가능

------------------------------------------------------------------------

## 6. Zustand(AuthStore)와의 역할 분리

  기능                                 담당
  ------------------------------------ -----------------------
  accessToken 저장/관리                Zustand(useAuthStore)
  refreshToken 처리                    axiosInstance
  사용자 정보 / 서버 데이터 캐싱       React Query
  UI 레벨 인증 처리(로그인/로그아웃)   Zustand
  페이지 보호(ProtectedRoute)          React Router

이 구조가 현재 Vote 프로젝트에서 가장 이상적인 조합이다.

------------------------------------------------------------------------

## 7. 폴더 구조 추천

    src/
     ├─ api/
     │   ├─ axiosInstance.ts
     │   └─ user.api.ts
     ├─ hooks/
     │   ├─ useMyInfo.ts
     │   └─ useUpdateNickname.ts
     ├─ store/
     │   └─ useAuthStore.ts
     ├─ components/
     ├─ pages/
     ├─ App.tsx
     └─ main.tsx

------------------------------------------------------------------------

## 8. 결론

React Query는 서버 데이터 관리의 모든 부담을 줄여주고,\
axiosInstance + Zustand와 결합하면 **프론트엔드 인증/데이터 구조가
완벽해진다.**

이 파일을 기반으로 Vote 프로젝트 전체를 안정적으로 확장할 수 있다.
