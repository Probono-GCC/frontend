// PrivateRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/AuthContext"; // Context API에서 인증 상태를 가져옵니다

const PrivateRoute = ({ requiredRole }) => {
  const { token } = useAuth(); // 인증 토큰 확인
  // 여기서 필요에 따라 권한을 체크할 수 있습니다. 예를 들어, userRole이 'admin'인지 확인
  const userRole = token ? "admin" : "guest"; // 예시로서 토큰을 기반으로 권한을 설정

  // 권한이 필요한 경우:
  if (!token) {
    console.log("토큰없음");
    return <Navigate to="/" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    console.log("userRole is ", userRole, "\n 권한없음");
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
