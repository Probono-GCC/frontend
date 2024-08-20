import { getStudent } from "../Apis/Api/User";

export const isFirstAccessStudent = async (userId) => {
  try {
    const result = await getStudent(userId);

    const isPersonalInfoValid =
      result.sex !== null &&
      result.birth !== null &&
      result.phoneNum !== null &&
      result.pwAnswer !== null &&
      result.profileImage !== null;
    const isContactInfoValid =
      result.fatherPhoneNum !== null ||
      result.motherPhoneNum !== null ||
      result.guardiansPhoneNum !== null;
    console.log(
      "isPersonalInfoValid",
      isPersonalInfoValid,
      " iscon",
      isContactInfoValid
    );
    return !(isPersonalInfoValid && isContactInfoValid);
  } catch (error) {
    console.error("Error fetching student data:", error);
    return false; // 오류가 발생한 경우, 기본적으로 false를 반환
  }
};
