export const GENDER_LIST = ["MALE", "FEMALE"] as const;

export const REGION_LIST = [
  "서울", "부산", "인천", "대구", 
  "대전", "광주", "울산", "세종", "충북","충남","전남","전북","경상","경남","강원","제주","해외"
] as const;

export const RELATIONSHIP_LIST = ["SINGLE", "IN_RELATIONSHIP", "MARRIED"] as const;

export const MBTI_LIST = [
  "ISTJ", "ISFJ", "INFJ", "INTJ",
  "ISTP", "ISFP", "INFP", "INTP",
  "ESTP", "ESFP", "ENFP", "ENTP",
  "ESTJ", "ESFJ", "ENFJ", "ENTJ",
  ""
] as const;

export type Gender = typeof GENDER_LIST[number]; // 'MALE' | 'FEMALE'
export type Region = typeof REGION_LIST[number];
export type RelationshipStatus = typeof RELATIONSHIP_LIST[number];
export type MBTI = typeof MBTI_LIST[number];

export type UserDetailRequestDTO = {
  nickname: string;
  birthYear: string;
  gender: Gender;
  region: Region;
  relationshipStatus: RelationshipStatus;
  mbti?: MBTI;
  introduce?: string;
  imageUrl?: string;
};