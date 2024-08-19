// PrivateRoutes.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../Pages/PrivateRoute";
import ChangePassword from "../Pages/ChangePassword";
import ChangeGrade from "../Pages/ChangeGrade";

import NoticeNewPostForm from "../Pages/NoticeNewPostForm";
import ClassNewPostForm from "../Pages/ClassNewPostForm";
import StudentView from "../Pages/StudentView";
import TeacherView from "../Pages/TeacherView";
import CreateClass from "../Pages/CreateClass";
import ClassInfo from "../Pages/ClassInfo";
import CreateAccount from "../Pages/CreateAccount";

import SubjectInfo from "../Pages/SubjectInfo";
import SubjectNewPostForm from "../Pages/SubjectNewPostForm";
import AssignHomeroom from "../Pages/AssignHomeroom";
import CommonCourseManagement from "../Pages/CommonCourseManagement";
import ElectiveCourseManagement from "../Pages/ElectiveCourseManagement";

//requiredRole 변수
const role = ["ROLE_ADMIN", "ROLE_TEACHER", "ROLE_STUDENT"];

const PrivateRoutes = () => (
  <Routes>
    <Route
      path="/change-password"
      element={
        <PrivateRoute requiredRole={role[0]}>
          <ChangePassword />
        </PrivateRoute>
      }
    />
    <Route
      path="/change-grade"
      element={
        <PrivateRoute requiredRole={role[0]}>
          <ChangeGrade />
        </PrivateRoute>
      }
    />

    <Route
      path="/notice-new-post-form"
      element={
        <PrivateRoute requiredRole={role[0]}>
          <NoticeNewPostForm />
        </PrivateRoute>
      }
    />
    <Route
      path="/class-new-post-form"
      element={
        <PrivateRoute requiredRole={[role[0], role[1]]}>
          <ClassNewPostForm />
        </PrivateRoute>
      }
    />
    <Route
      path="/student-view"
      element={
        <PrivateRoute requiredRole={role[0]}>
          <StudentView />
        </PrivateRoute>
      }
    />
    <Route
      path="/teacher-view"
      element={
        <PrivateRoute requiredRole={role[0]}>
          <TeacherView />
        </PrivateRoute>
      }
    />
    <Route
      path="/create-class"
      element={
        <PrivateRoute requiredRole={role[0]}>
          <CreateClass />
        </PrivateRoute>
      }
    />
    <Route
      path="/create-account"
      element={
        <PrivateRoute requiredRole={role[0]}>
          <CreateAccount />
        </PrivateRoute>
      }
    />

    <Route
      path="/class-info"
      element={
        <PrivateRoute requiredRole={role[0]}>
          <ClassInfo />
        </PrivateRoute>
      }
    />

    <Route
      path="/subject-info"
      element={
        <PrivateRoute requiredRole={role[0]}>
          <SubjectInfo />
        </PrivateRoute>
      }
    />
    <Route
      path="/subject-new-post-form"
      element={
        <PrivateRoute requiredRole={[role[0], role[1]]}>
          <SubjectNewPostForm />
        </PrivateRoute>
      }
    />
    <Route
      path="/assign-homeroom"
      element={
        <PrivateRoute requiredRole={[role[0], role[1]]}>
          <AssignHomeroom />
        </PrivateRoute>
      }
    />
    <Route
      path="/common-course-management"
      element={
        <PrivateRoute requiredRole={[role[0], role[1]]}>
          <CommonCourseManagement />
        </PrivateRoute>
      }
    />
    <Route
      path="/elective-course-management"
      element={
        <PrivateRoute requiredRole={[role[0], role[1]]}>
          <ElectiveCourseManagement />
        </PrivateRoute>
      }
    />
  </Routes>
);

export default PrivateRoutes;
