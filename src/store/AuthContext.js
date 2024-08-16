// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
// import jwtDecode from "jwt-decode";
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState(null); // 사용자 역할 저장

  useEffect(() => {
    const storedToken = sessionStorage.getItem("jwt");
    if (storedToken) {
      setToken(storedToken);
      const decodedToken = jwtDecode(storedToken);
      setUserRole(decodedToken.role); // JWT에서 역할 추출
    }
  }, []);

  const saveToken = (newToken) => {
    sessionStorage.setItem("jwt", newToken);
    setToken(newToken);
    const decodedToken = jwtDecode(newToken);
    setUserRole(decodedToken.role);
  };

  const clearToken = () => {
    sessionStorage.removeItem("jwt");
    setToken(null);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, userRole, saveToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
