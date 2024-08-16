// PrivateRoutes.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../Pages/PrivateRoute";
import NoticeBoard from "../Pages/NoticeBoard";
import ChangePassword from "../Pages/ChangePassword";
import ChangeGrade from "../Pages/ChangeGrade";
import MyProfile from "../Pages/MyProfile";
import Post from "../Pages/Post";
import NoticeNewPostForm from "../Pages/NoticeNewPostForm";
import ClassNewPostForm from "../Pages/ClassNewPostForm";
import StudentView from "../Pages/StudentView";
import TeacherView from "../Pages/TeacherView";
import CreateClass from "../Pages/CreateClass";
import ClassBoard from "../Pages/ClassBoard";
import ClassInfo from "../Pages/ClassInfo";
import SubjectBoard from "../Pages/SubjectBoard";
import SubjectInfo from "../Pages/SubjectInfo";
import SubjectNewPostForm from "../Pages/SubjectNewPostForm";
import AssignHomeroom from "../Pages/AssignHomeroom";
import CommonCourseManagement from "../Pages/CommonCourseManagement";
import ElectiveCourseManagement from "../Pages/ElectiveCourseManagement";

const PrivateRoutes = () => (
  <Routes>
    <Route
      path="/notice-board"
      element={
        <PrivateRoute>
          <NoticeBoard />
        </PrivateRoute>
      }
    />
    <Route
      path="/change-password"
      element={
        <PrivateRoute>
          <ChangePassword />
        </PrivateRoute>
      }
    />
    <Route
      path="/change-grade"
      element={
        <PrivateRoute>
          <ChangeGrade />
        </PrivateRoute>
      }
    />
    <Route
      path="/my-profile"
      element={
        <PrivateRoute>
          <MyProfile />
        </PrivateRoute>
      }
    />
    <Route
      path="/post/*"
      element={
        <PrivateRoute>
          <Post />
        </PrivateRoute>
      }
    />
    <Route
      path="/notice-new-post-form"
      element={
        <PrivateRoute>
          <NoticeNewPostForm />
        </PrivateRoute>
      }
    />
    <Route
      path="/class-new-post-form"
      element={
        <PrivateRoute>
          <ClassNewPostForm />
        </PrivateRoute>
      }
    />
    <Route
      path="/student-view"
      element={
        <PrivateRoute>
          <StudentView />
        </PrivateRoute>
      }
    />
    <Route
      path="/teacher-view"
      element={
        <PrivateRoute>
          <TeacherView />
        </PrivateRoute>
      }
    />
    <Route
      path="/create-class"
      element={
        <PrivateRoute>
          <CreateClass />
        </PrivateRoute>
      }
    />
    <Route
      path="/class-board"
      element={
        <PrivateRoute>
          <ClassBoard />
        </PrivateRoute>
      }
    />
    <Route
      path="/class-info"
      element={
        <PrivateRoute>
          <ClassInfo />
        </PrivateRoute>
      }
    />
    <Route
      path="/subject-board"
      element={
        <PrivateRoute>
          <SubjectBoard />
        </PrivateRoute>
      }
    />
    <Route
      path="/subject-info"
      element={
        <PrivateRoute>
          <SubjectInfo />
        </PrivateRoute>
      }
    />
    <Route
      path="/subject-new-post-form"
      element={
        <PrivateRoute>
          <SubjectNewPostForm />
        </PrivateRoute>
      }
    />
    <Route
      path="/assign-homeroom"
      element={
        <PrivateRoute>
          <AssignHomeroom />
        </PrivateRoute>
      }
    />
    <Route
      path="/common-course-management"
      element={
        <PrivateRoute>
          <CommonCourseManagement />
        </PrivateRoute>
      }
    />
    <Route
      path="/elective-course-management"
      element={
        <PrivateRoute>
          <ElectiveCourseManagement />
        </PrivateRoute>
      }
    />
    <Route path="/unauthorized" element={<div>Unauthorized</div>} />
  </Routes>
);

export default PrivateRoutes;
