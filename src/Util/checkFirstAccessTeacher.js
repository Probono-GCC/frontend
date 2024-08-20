import { getTeacher } from "../Apis/Api/User";

export const isFirstAccessTeacher = async (userId) => {
  try {
    const result = await getTeacher(userId);

    const isPersonalInfoValid =
      result.sex !== null &&
      result.birth !== null &&
      result.phoneNum !== null &&
      result.pwAnswer !== null &&
      result.profileImage !== null;

    return !isPersonalInfoValid;
  } catch (error) {
    console.error("Error fetching student data:", error);
    return false; // 오류가 발생한 경우, 기본적으로 false를 반환
  }
};
