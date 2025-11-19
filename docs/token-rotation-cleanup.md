## 토큰 로테이션 안정화 및 코드 정리

### 1. 프런트 인증 로직 정리
- `src/store/useAuthStore.ts`가 `axiosInstance`를 import해 기본 헤더를 직접 조작하고, `axiosInstance`는 다시 스토어를 import하는 순환 의존이 있었습니다. 이 구조는 번들 시 한쪽이 초기화되지 않아 인터셉터가 동작하지 않는 문제가 생길 수 있습니다.
- 스토어는 상태만 관리하도록 바꾸고, axios 인터셉터가 `useAuthStore.getState()`를 통해 토큰을 읽도록 분리했습니다. 로그인/토큰 갱신/로그아웃은 Zustand 상태만 갱신하며, axios 기본 헤더 조작은 제거했습니다.
- Axios 응답 인터셉터는 `config`, `url`, `headers`의 존재 여부를 확인해 없는 경우 조기 종료하거나 객체를 생성하도록 보강했습니다.
- 디버깅용 콘솔 로그 삭제 등으로 콘솔 노이즈를 줄였습니다.

### 2. 백엔드 JWT 필터 개선
- `JWTFilter`는 `Bearer`가 아닌 Authorization 헤더를 만나면 `ServletException`을 던져 500 응답이 발생했습니다. 이제 잘못된 헤더에는 401 JSON 응답을 내려줍니다.
- 토큰에서 읽은 역할에 `ROLE_` 접두사가 없으면 자동으로 붙여 Spring Security와 정합성을 맞췄습니다.
- 상태 저장을 막기 위해 `SecurityConfig`에 `NullSecurityContextRepository`, `NullRequestCache`, `SESSION_STATELESS` 등을 적용했습니다. 새 로그인 이후에는 `JSESSIONID`가 더 이상 발급되지 않습니다.

### 3. 환경 변수 기반 JWT 설정
- `JWTUtil`에 하드코딩돼 있던 비밀키와 만료 시간을 제거하고, `.env` → `application.yml` → `JwtConfig` → `JWTUtil` 순으로 주입되도록 변경했습니다. 없을 경우 기본값(1시간/7일)을 사용합니다.
- `voteBackend/.env` 파일에 샘플 시크릿/만료 값을 기록해 두었으므로, 운영 환경에서는 CI/CD 시크릿이나 환경 변수로 덮어쓰면 됩니다.

### 4. 토큰 만료 전략 참고
- AccessToken은 일반적으로 10~30분, RefreshToken은 7~30일로 운영합니다. 현재 기본값은 Access 1시간, Refresh 7일이며 `.env`에서 손쉽게 변경할 수 있습니다.
- 토큰 만료 시간을 짧게 가져가면 탈취 피해를 줄일 수 있고, RefreshToken은 HttpOnly 쿠키와 화이트리스트 관리로 보안을 유지합니다.
