import styles from "../Styles/css/Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TextField, Box, useMediaQuery } from "@mui/material";

import Button from "../Components/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";

import { IsUserExistsApi } from "../Apis/Api/User";
import { IsPwAnswerRightApi } from "../Apis/Api/User";
import { ResetPwApi } from "../Apis/Api/User";
//다국어지원
// 다국어 지원
import i18n from "../i18n/i18n"; // 경로는 파일의 위치에 따라 조정해야 합니다.
import { useTranslation } from "react-i18next";
import "../i18n/i18n.js"; // src/Pages에서 src/i18n으로 접근; // i18next 초기화 파일

export default ForgotPassword;
//forgot password view
function ForgotPassword() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [userID, setUserID] = useState("");
  const [answer, setAnswer] = useState("");
  const [userPW, setUserPW] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [rePasswordError, setRePasswordError] = useState(false);
  /**언어 선택 임시 선택상자 */
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isPwAnswerRight, setIsPwAnswerRight] = useState(false);

  // handleIsIdExists 함수
  const handleIsIdExists = async (id) => {
    try {
      // ID 존재 여부 확인 API 호출
      const result = await IsUserExistsApi(id);

      // API 호출이 성공적이고 상태 코드가 200인지 확인
      if (result && result.status === 200) {
        alert("ID exists.");
        // ID 존재 확인 상태 업데이트
        setIsIdChecked(true);
      } else {
        // ID가 존재하지 않음
        alert("⚠️ID does not exist.⚠️");
        setIsIdChecked(false);
      }
    } catch (error) {
      // API 호출 중 오류 발생 시
      console.error("Error checking ID existence:", error);
      alert("⚠️Error checking ID existence.⚠️");
      setIsIdChecked(false);
    }
  };

  //handleIsPwAnswerRight 함수
  const handleIsPwAnswerRight = async (userID, answer) => {
    try {
      const result = await IsPwAnswerRightApi(userID, answer);

      // API 호출이 성공적이고 상태 코드가 200인지 확인
      if (result && result.status === 200) {
        alert("Answer is right");
        setIsPwAnswerRight(true);
      } else {
        alert("Answer is wrong");
        setIsPwAnswerRight(false);
      }
    } catch (error) {
      // API 호출 중 오류 발생 시
      console.error("Error checking PwAnswer:", error);
      alert("Error checking PwAnswer:");
      setIsIdChecked(false);
    }
  };

  // handleSetNewPw 함수
  const handleSetNewPw = async (userID) => {
    const pwData = {
      newPassword: userPW,
    };
    try {
      const result = await ResetPwApi(pwData, userID);

      // API 호출이 성공적이고 상태 코드가 200인지 확인
      if (result && result.status === 200) {
        alert("Reset Password Successfully");
      } else {
        alert("Cannot Reset Password");
      }
    } catch (error) {
      // API 호출 중 오류 발생 시
      console.error("Error Resetting Password:", error);
      alert("Error Resetting Password:");
      setIsIdChecked(false);
    }
  };

  const handleRePasswordChange = (event) => {
    setRePassword(event.target.value);
    checkPasswords(userPW, event.target.value);
  };

  const checkPasswords = (pw, rePw) => {
    if (pw.length > 0 && rePw.length > 0 && pw !== rePw) {
      setRePasswordError(true);
    } else {
      setRePasswordError(false);
    }
  };
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };
  const isSmallScreen = useMediaQuery("(max-width:768px)");
  return (
    <div id={styles.forgot_pw_container}>
      <div>
        <IconButton onClick={handleBack} color="primary" aria-label="go back">
          <ArrowBackIcon />
        </IconButton>
        <div
          className={styles.titleText}
          style={{ fontWeight: "bold", display: "inline" }}
        >
          {t("Forgot your password?")}
        </div>
      </div>

      <Box className={styles.input_container}>
        <p className={styles.questionText}>{t("1. Enter your ID")}</p>
        <TextField
          sx={{
            margin: "15px 20px",
            width: isSmallScreen ? "243px" : "33vw",
            height: isSmallScreen ? "45px" : "53px",
          }}
          label="ID"
          variant="outlined"
          onChange={(event) => {
            setUserID(event.target.value);
          }}
        />
        <div id={styles.right_align}>
          <Button
            size={"md"}
            title={t("check")}
            onClick={() => handleIsIdExists(userID)}
            disabled={userID.length === 0}
          />
        </div>
        <p className={styles.questionText}>
          {t("2. What is your most favorite food?")}
        </p>
        <TextField
          sx={{
            margin: "15px 20px",
            width: isSmallScreen ? "243px" : "33vw",
            height: isSmallScreen ? "45px" : "53px",
          }}
          label="Answer"
          variant="outlined"
          value={answer}
          onChange={(event) => {
            setAnswer(event.target.value);
          }}
        />
        <div id={styles.right_align}>
          <Button
            size={"md"}
            title={t("check")}
            onClick={() => handleIsPwAnswerRight(userID, answer)}
            disabled={answer.length === 0}
          />
        </div>
        <p className={styles.questionText}>{t("3. Reset Password")}</p>
        <TextField
          sx={{
            margin: "15px 20px",
            width: isSmallScreen ? "243px" : "33vw",
            height: isSmallScreen ? "45px" : "53px",
          }}
          label="Password"
          variant="outlined"
          type="password"
          autoComplete="current-password"
          onChange={(event) => {
            setUserPW(event.target.value);
          }}
          value={userPW} //상태 변수를 value로 수정
        />
        <TextField
          sx={{
            margin: "15px 20px",
            width: isSmallScreen ? "243px" : "33vw",
            height: isSmallScreen ? "45px" : "53px",
          }}
          label="Re-type PW"
          variant="outlined"
          type="password"
          value={rePassword}
          onChange={handleRePasswordChange}
          error={rePasswordError}
          helperText={rePasswordError ? "Passwords do not match" : " "}
        />
        <div id={styles.right_align}>
          <Button
            size={"md"}
            title={t("change")}
            onClick={() => handleSetNewPw(userID, userPW)}
            disabled={userPW.length === 0 || rePassword.length === 0}
          />
        </div>
        &nbsp;
      </Box>
    </div>
  );
}
