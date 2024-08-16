import styles from "../Styles/css/Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TextField, Typography, Box } from "@mui/material";

import Button from "../Components/Button";
import { useMediaQueryContext } from "../store/MediaQueryContext";

//api
import { loginApi } from "../Apis/Api/User";
function LoginContainer() {
  const navigate = useNavigate();
  const [userID, setUserID] = useState("");
  const [userPW, setUserPW] = useState("");
  const { isSmallScreen, isSmallWidth } = useMediaQueryContext();

  const moveForgotPassword = () => {
    navigate("/forgot-password");
  };

  const login = () => {
    // FormData 객체 생성
    const formData = new FormData();

    // formData에 username과 password 추가
    formData.append("username", userID);
    formData.append("password", userPW);

    loginApi(formData).then((response) => {
      console.log(response);
      if (response.status === 200) {
        const authorizationHeader = response.headers["authorization"];
        const token = authorizationHeader && authorizationHeader.split(" ")[1]; // Bearer 이후의 토큰만 추출
        sessionStorage.setItem("jwt", token);

        console.log("Token:", token);
        navigate("/home");
      } else {
        console.error("Login failed:", response.statusText);
      }
    });
  };

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
