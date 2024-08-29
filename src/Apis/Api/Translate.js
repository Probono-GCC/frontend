import axios from "axios";

const TRANSLATE_URL = process.env.REACT_APP_TRANSLATE_URL;
// Axios 인스턴스를 생성합니다 (기본 URL을 설정할 수 있습니다)
const translateAxiosInstance = axios.create({
  baseURL: TRANSLATE_URL, // 기본 URL 설정
  headers: {
    "Content-Type": "application/json",
  },
});

// 포스트 요청을 보내는 함수
export async function postTranslationData(text, toLanguage) {
  try {
    const response = await translateAxiosInstance.post("/translate", {
      text: text,
      to: toLanguage,
    });
    return response.data; // 응답 데이터 반환
  } catch (err) {
    console.error("Error posting translation data:", err);
    throw err; // 에러를 다시 던져서 호출한 쪽에서 처리할 수 있도록 함
  }
}

// 사용 예시
(async () => {
  try {
    const result = await postTranslationData("Hello", "ne");
    // console.log("Translation result:", result);
  } catch (error) {
    console.error("Failed to translate:", error);
  }
})();
