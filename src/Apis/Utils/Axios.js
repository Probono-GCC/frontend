import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// 인터셉터를 사용하여 요청이 보내지기 전에 JWT 토큰을 추가합니다.
axiosInstance.interceptors.request.use(
  (config) => {
    // 예를 들어, 토큰을 로컬 스토리지에서 가져옵니다.
    if (config.url !== "/login") {
      const token = localStorage.getItem("jwt"); // 또는 localStorage.getItem('jwt');
      console.log("header token", token);
      // 토큰이 존재하면 Authorization 헤더에 추가합니다.
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
