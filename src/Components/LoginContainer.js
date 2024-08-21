import styles from "../Styles/css/Login.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { TextField, Typography, Box } from "@mui/material";

import Button from "../Components/Button";
import { useMediaQueryContext } from "../store/MediaQueryContext";
import { useAuth } from "../store/AuthContext";
import { isFirstAccessStudent } from "../Util/CheckFirstAccess";
import { isFirstAccessTeacher } from "../Util/checkFirstAccessTeacher";
//api
import { loginApi } from "../Apis/Api/User";
function LoginContainer() {
  const navigate = useNavigate();
  const [userID, setUserID] = useState("");
  const [userPW, setUserPW] = useState("");
  const { isSmallScreen, isSmallWidth } = useMediaQueryContext();
  const { saveToken, clearToken } = useAuth(); //토큰 전역 저장
  const moveForgotPassword = () => {
    navigate("/forgot-password");
  };

  const login = async () => {
    // FormData 객체 생성
    const formData = new FormData();

    // formData에 username과 password 추가
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

        console.log("Token:", token);
        if (token) {
          const userData = saveToken(token);
          console.log("유저 정보", userData);

          //첫 접속인지 아닌지 판단
          if (userData.role == "ROLE_STUDENT") {
            return isFirstAccessStudent(userData.username).then((access) => {
              console.log("?", access);
              if (access && userData.role !== "ROLE_ADMIN") {
                alert("Fill in the essential information on your profile");
                navigate("/my-profile");
              } else {
                navigate("/home"); // 로그인 후 이동할 경로
              }
            });
          } else if (userData.role == "ROLE_TEACHER") {
            return isFirstAccessTeacher(userData.username).then((access) => {
              console.log("?", access);
              if (access && userData.role !== "ROLE_ADMIN") {
                alert("Fill in the essential information on your profile");
                navigate("/my-profile");
              } else {
                navigate("/home"); // 로그인 후 이동할 경로
              }
            });
          } else {
            navigate("/home");
          }
        }
        // 로그인 성공 시 입력 창 초기화
        setUserID("");
        setUserPW("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    clearToken();
  }, []);
  return (
    <div id={styles.login_container}>
      <Typography
        variant="h5"
        sx={{
          fontFamily: "Copperplate",
          textAlign: "center",

          fontWeight: "bold",
        }}
      >
        Welcome to visit
        <Typography
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
        </Typography>
      </Typography>

      <div id={styles.logoImg} />
      <Box
        component="form"
        className={styles.input_container}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            label="ID"
            variant="outlined"
            onChange={(event) => {
              setUserID(event.target.value);
            }}
            value={userID}
            sx={{
              marginBottom: "16px",
              width: isSmallScreen ? "80vw" : "30vw",
            }}
          />
        </div>
        <div>
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            autoComplete="current-password"
            onChange={(event) => {
              setUserPW(event.target.value);
            }}
            value={userPW}
            sx={{
              marginBottom: "16px",
              width: isSmallScreen ? "80vw" : "30vw",
            }}
          />
        </div>
      </Box>
      <div id={styles.login_footer}>
        <div>
          <p
            id={styles.forgotPw_btn}
            onClick={moveForgotPassword}
            style={{ color: "#1B3DA6" }}
          >
            Forgot your password?
          </p>
        </div>
        <Button
          title={"login"}
          disabled={userPW.length === 0 || userID.length === 0}
          onClick={login}
          size={"bg"}
        />
      </div>
    </div>
  );
}

export default LoginContainer;
