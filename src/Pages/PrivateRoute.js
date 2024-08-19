// PrivateRoute.js
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/AuthContext"; // Context API에서 인증 상태를 가져옵니다

const PrivateRoute = ({ requiredRole, children }) => {
  const { userRole, isLoading } = useAuth(); // 인증 토큰 확인
  // 여기서 필요에 따라 권한을 체크할 수 있습니다. 예를 들어, auth이 'admin'인지 확인

  /***
   * 로딩 중일 때 아무것도 렌더링하지 않음
   * 새로고침하면 ContextAPI가 초기화되기 때문에
   * localStorage에 남아있는경우 다시 세팅하는 시간 보장
   */

  if (isLoading) {
    return null; // 혹은 로딩 스피너를 표시할 수도 있음
  }
  // 사용자가 인증되지 않은 경우
  if (!userRole) {
    console.log("토큰없음");
    return <Navigate to="/" replace />;
  }

  if (Array.isArray(requiredRole)) {
    // requiredRole이 배열인 경우
    if (!requiredRole.includes(userRole)) {
      console.log("userRole is ", userRole, "\n 권한없음");
      return <Navigate to="/unauthorized" replace />;
    }
  } else if (requiredRole && userRole !== requiredRole) {
    // requiredRole이 단일 역할인 경우
    console.log("userRole is ", userRole, "\n 권한없음");
    return <Navigate to="/unauthorized" replace />;
  }

  // 권한이 있는 경우
  console.log("통과: ", userRole, "");
  return children;
};

export default PrivateRoute;
