import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MediaQueryProvider } from "./store/MediaQueryContext";
import { AuthProvider } from "./store/AuthContext";

import PublicRoutes from "./Route/PublicRoute";
import PrivateRoutes from "./Route/PrivateRoutes";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <MediaQueryProvider>
    {/* <React.StrictMode> */}
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<PublicRoutes />} />
          {/* 프라이빗 라우트 */}
          <Route path="/private/*" element={<PrivateRoutes />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    {/* </React.StrictMode> */}
  </MediaQueryProvider>
);

reportWebVitals();
