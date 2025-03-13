import styles from "../Styles/css/Login.module.css";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { TextField, Box } from "@mui/material";

import Button from "../Components/Button";
import { TypographyMemo } from "../Data/memoComponents";
import { useMediaQueryContext } from "../store/MediaQueryContext";
import { useAuth } from "../store/AuthContext";
import { isFirstAccessStudent } from "../Util/CheckFirstAccess";
import { isFirstAccessTeacher } from "../Util/checkFirstAccessTeacher";
//api
import { loginApi } from "../Apis/Api/User";

//다국어지원
import { useTranslation } from "react-i18next";
//login view
function LoginContainer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [userID, setUserID] = useState("");
  const [userPW, setUserPW] = useState("");
  const { isSmallScreen, isSmallWidth } = useMediaQueryContext();
  const { saveToken, clearToken } = useAuth(); //토큰 전역 저장
  //컴포넌트를 메모로 감싸서 props가 변경되지 않으면 다시 렌더링하지 않도록
  const ButtonMemo = React.memo(Button);

  const moveForgotPassword = () => {
    navigate("/forgot-password");
  };

  const login = async () => {
    const formData = new FormData();
    formData.append("username", userID);
    formData.append("password", userPW);

    loginApi(formData)
      .then((response) => {
        if (response.response && response.response.status == 401) {
          setUserID("");
          setUserPW("");
          alert("Please check your ID, PW.");
          return;
        }
        const authorizationHeader = response.headers["authorization"];
        const token = authorizationHeader && authorizationHeader.split(" ")[1]; // Bearer 이후의 토큰만 추출
        localStorage.setItem("jwt", token);

        if (token) {
          const userData = saveToken(token);

          // 첫 접속인지 아닌지 판단
          if (userData.role == "ROLE_STUDENT") {
            return isFirstAccessStudent(userData.username).then((access) => {
              if (access && userData.role !== "ROLE_ADMIN") {
                alert("Fill in the essential information on your profile");
                navigate("/my-profile");
              } else {
                navigate("/private/home"); // 로그인 후 이동할 경로
              }
            });
          } else if (userData.role == "ROLE_TEACHER") {
            return isFirstAccessTeacher(userData.username).then((access) => {
              if (access && userData.role !== "ROLE_ADMIN") {
                alert("Fill in the essential information on your profile");
                navigate("/my-profile");
              } else {
                navigate("/private/home"); // 로그인 후 이동할 경로
              }
            });
          } else {
            navigate("/private/home"); // 로그인 후 이동할 경로
          }
        }
        // 로그인 성공 시 입력 창 초기화
        setUserID("");
        setUserPW("");
      })
      .catch((error) => {
        //console.log(error);
      });
  };
  const handleUserIDChange = useCallback((event) => {
    setUserID(event.target.value);
  }, []);

  const handleUserPWChange = useCallback((event) => {
    setUserPW(event.target.value);
  }, []);
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      login();
    }
  };

  useEffect(() => {
    clearToken();
  }, []);

  return (
    <div id={styles.login_container}>
      <TypographyMemo
        variant="h5"
        sx={{
          fontFamily: "Copperplate",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {t("welcome")}
        <TypographyMemo
          variant={isSmallWidth ? "h5" : "h4"}
          className={styles.title}
          component="div"
          sx={{
            fontFamily: "Copperplate",
            textAlign: "center",
            fontWeight: "bold",
            margin: "0 10px",
          }}
        >
          Creative Learners' Academy
        </TypographyMemo>
      </TypographyMemo>

      <div id={styles.logoImg} />
      <Box
        component="form"
        className={styles.input_container}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            label={t("ID")}
            variant="outlined"
            onChange={handleUserIDChange}
            value={userID}
            onKeyDown={handleKeyDown}
            sx={{
              marginBottom: "16px",
              width: isSmallScreen ? "270px" : "540px",
            }}
          />
        </div>
        <div>
          <TextField
            label={t("password")}
            variant="outlined"
            type="password"
            autoComplete="current-password"
            onChange={handleUserPWChange}
            value={userPW}
            onKeyDown={handleKeyDown}
            sx={{
              marginBottom: "16px",
              width: isSmallScreen ? "270px" : "540px",
            }}
          />
        </div>
      </Box>
      <div id={styles.login_footer}>
        <ButtonMemo
          title={t("login")}
          disabled={userPW.length === 0 || userID.length === 0}
          onClick={login}
          size={"bg"}
        />
        <div>
          <p
            id={styles.forgotPw_btn}
            onClick={moveForgotPassword}
            style={{ color: "#1B3DA6", fontSize: "20px" }}
          >
            {t("forgotPw")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginContainer;
