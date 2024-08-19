// src/store/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const roleArray = ["ROLE_ADMIN", "ROLE_TEACHER", "ROLE_STUDENT"];

  useEffect(() => {
    const storedToken = localStorage.getItem("jwt");
    console.log("Stored token:", storedToken); // 토큰 확인

    if (storedToken) {
      setToken(storedToken);
      const decodedToken = jwtDecode(storedToken);
      setUserRole(decodedToken.role);
      setUserData(decodedToken);
    }
    setIsLoading(false); // 로딩 완료
  }, []);

  const saveToken = (newToken) => {
    localStorage.setItem("jwt", newToken);
    setToken(newToken);
    const decodedToken = jwtDecode(newToken);
    setUserRole(decodedToken.role);
    setUserData(decodedToken);
    return decodedToken;
  };

  const clearToken = () => {
    localStorage.removeItem("jwt");
    setToken(null);
    setUserRole(null);
    setUserData(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userRole,
        isLoading,
        roleArray,
        userData,
        saveToken,
        clearToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
