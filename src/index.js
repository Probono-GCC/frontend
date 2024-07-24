import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";

import "./index.css";

//page
import NoticeBoard from "./Pages/NoticeBoard";
import Home from "./Pages/Home.js";
import StudentView from "./Pages/StudentView.js";
import TeacherView from "./Pages/TeacherView.js";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notice-board" element={<NoticeBoard />} />
          <Route path="/student-view" element={<StudentView />} />
          <Route path="/teacher-view" element={<TeacherView />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
