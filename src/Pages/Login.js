import styles from "../Styles/css/Login.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { TextField, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Button from "../Components/Button";

import BackImage1 from "../Assets/img/BackgroundSample/sample_images_00.png";
import BackImage2 from "../Assets/img/BackgroundSample/sample_images_01.png";
import BackImage3 from "../Assets/img/BackgroundSample/sample_images_02.png";
import BackImage4 from "../Assets/img/BackgroundSample/sample_images_03.png";
import BackImage5 from "../Assets/img/BackgroundSample/sample_images_04.png";

function Login({ type }) {
  const navigate = useNavigate();
  const [userID, setUserID] = useState("");
  const [answer, setAnswer] = useState("");
  const [userPW, setUserPW] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [currentIndex, setCurrentIndex] = useState(1);
  const [rePasswordError, setRePasswordError] = useState(false);
  /**언어 선택 임시 선택상자 */
  const [age, setAge] = useState(10);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  /**언어 선택 임시 선택상자 */
  const BackgroundSample = [
    { img: BackImage1, key: 1 },
    { img: BackImage2, key: 2 },
    { img: BackImage3, key: 3 },
    { img: BackImage4, key: 4 },
    { img: BackImage5, key: 5 },
  ];

  const login = () => {
    navigate("/");
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
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % BackgroundSample.length);
    }, 3000); // 3초마다 슬라이드 전환

    return () => clearInterval(interval);
  }, [BackgroundSample.length]);

  return (
    <div id={styles.page_container}>
      {type == "default" ? (
        <div id={styles.login_container}>
          <div>
            {" "}
            <FormControl sx={{ m: 1, minWidth: 120, marginLeft: "30vw" }}>
              <Select
                value={age}
                onChange={handleChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                sx={{ height: "5vh" }}
              >
                <MenuItem value={10}>Eng</MenuItem>
                <MenuItem value={20}>Nepali</MenuItem>
                <MenuItem value={30}>Kor</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Copperplate",
              textAlign: "center",
              marginTop: "3vh",
              fontWeight: "bold",
            }}
          >
            Welcome to visit
          </Typography>
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontFamily: "Copperplate",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Creative Learners' Academy
          </Typography>
          <div id={styles.logoImg} />
          <TextField
            sx={{ margin: "1vw 5vh", width: "30vw" }}
            label="ID"
            variant="outlined"
            onChange={(event) => {
              setUserID(event.target.value);
            }}
            //   InputProps={{
            //     readOnly: true,
            //   }}
          />
          <TextField
            sx={{ margin: "1vw 5vh", width: "30vw" }}
            label="Password"
            variant="outlined"
            type="password"
            autoComplete="current-password"
            onChange={(event) => {
              setUserPW(event.target.value);
            }}
          />
          <Button
            id={"login_btn"}
            title={"login"}
            disabled={userPW.length === 0 || userID.length === 0}
            onClick={login}
            size={"bg"}
          />
        </div>
      ) : (
        <div>
          <div>
            <FormControl sx={{ m: 1, minWidth: 120, marginLeft: "30vw" }}>
              <Select
                value={age}
                onChange={handleChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                sx={{ height: "5vh" }}
              >
                <MenuItem value={10}>Eng</MenuItem>
                <MenuItem value={20}>Nepali</MenuItem>
                <MenuItem value={30}>Kor</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={styles.titleText} style={{ fontWeight: "bold" }}>
            Forgot your password?
          </div>
          <p className={styles.questionText}>1.Enter your ID</p>
          <TextField
            sx={{ margin: "1vw 5vh", width: "30vw" }}
            label="ID"
            variant="outlined"
            onChange={(event) => {
              setUserID(event.target.value);
            }}
          />
          <Button size={"md"} title={"check"} disabled={userID.length === 0} />
          <p className={styles.questionText}>
            2. What is your most favorite food?
          </p>
          <TextField
            sx={{ margin: "1vw 5vh", width: "30vw" }}
            label="Answer"
            variant="outlined"
            onChange={(event) => {
              setAnswer(event.target.value);
            }}
          />
          <Button size={"md"} title={"check"} disabled={answer.length === 0} />
          <p className={styles.questionText}>3. Reset Password</p>
          <TextField
            sx={{ margin: "1vw 5vh", width: "30vw" }}
            label="Password"
            variant="outlined"
            type="password"
            autoComplete="current-password"
            onChange={(event) => {
              setUserPW(event.target.value);
            }}
          />
          <TextField
            sx={{ margin: "1vw 5vh", width: "30vw" }}
            label="Re-type PW"
            variant="outlined"
            type="password"
            value={rePassword}
            onChange={handleRePasswordChange}
            error={rePasswordError}
            helperText={rePasswordError ? "Passwords do not match" : ""}
          />
          <Button
            size={"md"}
            title={"change"}
            disabled={userPW.length === 0 || rePassword.length === 0}
          />
        </div>
      )}

      <div id={styles.image_container}>
        <div
          id={styles.slider}
          style={{ position: "relative", height: "100vh", width: "60vw" }}
        >
          {BackgroundSample.map((item, index) => (
            <img
              src={item.img}
              key={index}
              alt={`slide-${index}`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: currentIndex === index ? 1 : 0,
                transition: "opacity 1s ease-in-out",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Login;
