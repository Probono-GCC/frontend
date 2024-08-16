// PublicRoutes.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";
import CreateAccount from "../Pages/CreateAccount";
import Home from "../Pages/Home";
const PublicRoutes = () => (
  <Routes>
    <Route path="/" element={<Login type={"default"} />} />
    <Route
      path="/forgot-password"
      element={<Login type={"forgot-password"} />}
    />
    <Route path="/create-account" element={<CreateAccount />} />
    <Route path="/home" element={<Home />} />
    {/* 기타 권한 인증이 필요 없는 페이지 추가 */}
  </Routes>
);

export default PublicRoutes;
