export type UserRequestDTO = {
  username: string;
  password?: string;
  email?: string;
};

export type LoginRequestDTO = {
  username: string;   // "아이디를 입력하세요"
  password: string;   // "비밀번호를 입력하세요"
};

export type RoleType = "USER" | "ADMIN"

export type UserResponseDTO = {
  id: number;         // PK (시퀀스 번호)
  username: string;   // 로그인 아이디
  email: string;      // 이메일
  isSocial: boolean;  // 소셜 가입 여부
  roleType: RoleType; // 권한
};