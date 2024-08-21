// PublicRoutes.js

/* 권한 인증이 필요 없는 페이지 */

import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";

import Home from "../Pages/Home";
import NoticeBoard from "../Pages/NoticeBoard";
import MyProfile from "../Pages/MyProfile";
import Post from "../Pages/Post";
import ClassBoard from "../Pages/ClassBoard";
import SubjectBoard from "../Pages/SubjectBoard";
const PublicRoutes = () => (
  <Routes>
    <Route path="/" element={<Login type={"default"} />} />
    <Route
      path="/forgot-password"
      element={<Login type={"forgot-password"} />}
    />

    <Route path="/home" element={<Home />} />
    <Route path="/notice-board" element={<NoticeBoard />} />
    <Route path="/my-profile" element={<MyProfile />} />
    <Route path="/notice/*" element={<Post />} />
    <Route path="/class-notice/*" element={<Post />} />
    <Route path="/class-board/*" element={<ClassBoard />} />
    <Route path="/subject-board" element={<SubjectBoard />} />

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
