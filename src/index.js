import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import NoticeBoard from "./Pages/NoticeBoard";
import NoticeNewPostForm from "./Pages/NoticeNewPostForm.js";
import CreateAccount from "./Pages/CreateAccount";
import MyProfile from "./Pages/MyProfile";

import "./index.css";

//page
import Login from "./Pages/Login.js";
import Home from "./Pages/Home.js";
import StudentView from "./Pages/StudentView.js";
import TeacherView from "./Pages/TeacherView.js";
import Post from "./Pages/Post.js";
import CreateClass from "./Pages/CreateClass.js";
import ClassBoard from "./Pages/ClassBoard.js";
import ClassNewPostForm from "./Pages/ClassNewPostForm.js";
import ClassInfo from "./Pages/ClassInfo.js";
import SubjectBoard from "./Pages/SubjectBoard.js";
import SubjectInfo from "./Pages/SubjectInfo.js";
import SubjectNewPostForm from "./Pages/SubjectNewPostForm.js";
import AssignHomeroom from "./Pages/AssignHomeroom.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // 하위 주소는 /class-board/* -> navigate('/class-board/%{newPage})

  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login type={"default"} />} />
          <Route
            path="/forgot-password"
            element={<Login type={"forgot-password"} />}
          />
          <Route path="/" element={<Home />} />
          <Route path="/notice-board" element={<NoticeBoard />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/post" element={<Post />} />
          <Route path="/notice-new-post-form" element={<NoticeNewPostForm />} />
          <Route path="/class-new-post-form" element={<ClassNewPostForm />} />
          <Route path="/student-view" element={<StudentView />} />
          <Route path="/teacher-view" element={<TeacherView />} />
          <Route path="/create-class" element={<CreateClass />} />
          <Route path="/class-board" element={<ClassBoard />} />
          <Route path="/class-info" element={<ClassInfo />} />
          <Route path="/subject-board" element={<SubjectBoard />} />
          <Route path="/subject-info" element={<SubjectInfo />} />
          <Route
            path="/subject-new-post-form"
            element={<SubjectNewPostForm />}
          />
          <Route path="/assign-homeroom" element={<AssignHomeroom />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
