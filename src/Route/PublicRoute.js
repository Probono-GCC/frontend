// PublicRoutes.js

/* 권한 인증이 필요 없는 페이지 */

import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";
import NoticeBoard from "../Pages/NoticeBoard";
import MyProfile from "../Pages/MyProfile";
import Post from "../Pages/Post";
import ClassBoard from "../Pages/ClassBoard";
import SubjectBoard from "../Pages/SubjectBoard";
import AppPolicy from "../Pages/AppPolicy";
const PublicRoutes = () => (
  <Routes>
    <Route path="/" element={<Login type={"default"} />} />
    <Route
      path="/forgot-password"
      element={<Login type={"forgot-password"} />}
    />

    <Route path="/notice-board/:page?" element={<NoticeBoard />} />
    <Route path="/my-profile" element={<MyProfile />} />
    <Route path="/notice/*" element={<Post />} />
    <Route path="/class-notice/*" element={<Post />} />
    <Route path="/class-board/*" element={<ClassBoard />} />
    <Route path="/subject-board" element={<SubjectBoard />} />
    <Route path="/app-policy" element={<AppPolicy />} />
    <Route
      path="/unauthorized"
      element={
        <h2 style={{ margin: "20px" }}>
          You don't have authority to access this page🥲
        </h2>
      }
    />
  </Routes>
);

export default PublicRoutes;
