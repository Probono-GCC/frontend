import styles from "../Styles/css/Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TextField, Box, useMediaQuery } from "@mui/material";

import Button from "../Components/Button";

function ForgotPassword() {
  const navigate = useNavigate();
  const [userID, setUserID] = useState("");
  const [answer, setAnswer] = useState("");
  const [userPW, setUserPW] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [currentIndex, setCurrentIndex] = useState(1);
  const [rePasswordError, setRePasswordError] = useState(false);
  /**언어 선택 임시 선택상자 */

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
  const isSmallScreen = useMediaQuery("(max-width:768px)");
  return (
    <div id={styles.forgot_pw_container}>
      <div className={styles.titleText} style={{ fontWeight: "bold" }}>
        Forgot your password?
      </div>
      <Box className={styles.input_container}>
        <p className={styles.questionText}>1.Enter your ID</p>
        <TextField
          sx={{ margin: "1vh 2vw", width: isSmallScreen ? "80vw" : "33vw" }}
          label="ID"
          variant="outlined"
          onChange={(event) => {
            setUserID(event.target.value);
          }}
        />
        <div id={styles.right_align}>
          <Button size={"md"} title={"check"} disabled={userID.length === 0} />
        </div>
        <p className={styles.questionText}>
          2. What is your most favorite food?
        </p>
        <TextField
          sx={{ margin: "1vh 2vw", width: isSmallScreen ? "80vw" : "33vw" }}
          label="Answer"
          variant="outlined"
          onChange={(event) => {
            setAnswer(event.target.value);
          }}
        />
        <div id={styles.right_align}>
          <Button size={"md"} title={"check"} disabled={answer.length === 0} />
        </div>
        <p className={styles.questionText}>3. Reset Password</p>
        <TextField
          sx={{ margin: "1vh 2vw", width: isSmallScreen ? "80vw" : "33vw" }}
          label="Password"
          variant="outlined"
          type="password"
          autoComplete="current-password"
          onChange={(event) => {
            setUserPW(event.target.value);
          }}
        />
        <TextField
          sx={{ margin: "1vh 2vw", width: isSmallScreen ? "80vw" : "33vw" }}
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
            title={"change"}
            disabled={userPW.length === 0 || rePassword.length === 0}
          />
        </div>
      </Box>
    </div>
  );
}

export default ForgotPassword;
