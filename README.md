# Vote Frontend

이 프로젝트는 Vote Project의 프론트엔드 파트로, React와 TypeScript를 사용하여 구축되었습니다.

## 🚀 주요 기술 스택

- **Framework**: React, Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **State Management**: Zustand, React Query
- **Form Handling**: React Hook Form, Zod
- **API Client**: Axios

## ✨ 주요 기능

### 1. 사용자 인증
- **이메일/비밀번호 가입 및 로그인**: 기본적인 사용자 인증 시스템을 제공합니다.
- **소셜 로그인**: Google, Naver, Kakao 계정을 이용한 간편 로그인을 지원합니다.
- **JWT 기반 세션 관리**: Access Token과 Refresh Token을 사용하여 안전하고 지속적인 사용자 세션을 관리하며, 자동으로 토큰을 갱신합니다.
- **인증 상태에 따른 UI/UX**: 로그인 여부에 따라 헤더, 네비게이션 바 등 UI가 동적으로 변경됩니다.

### 2. 사용자 경험
- **반응형 디자인**: 데스크톱과 모바일 환경에 최적화된 UI를 제공합니다.
- **테마 전환**: 사용자가 Light/Dark 모드를 선택할 수 있습니다.
- **입력 폼 유효성 검사**: Zod 스키마를 활용하여 회원가입 등 폼 제출 시 실시간으로 데이터 유효성을 검사합니다.
- **사용자 피드백**: Sonner를 통해 API 요청 결과(성공, 실패 등)를 사용자에게 즉각적으로 알립니다.

### 3. 상태 및 데이터 관리
- **전역 상태 관리**: Zustand를 사용하여 사용자 인증 정보 등 앱 전반의 상태를 효율적으로 관리합니다.
- **서버 상태 관리**: React Query를 도입하여 API 데이터 캐싱, 재요청 등 서버 상태를 선언적으로 관리합니다.
- **API 클라이언트**: Axios 인스턴스를 설정하여 API 요청/응답을 중앙에서 관리하고, 인터셉터를 통해 JWT 토큰을 자동으로 헤더에 추가합니다.
