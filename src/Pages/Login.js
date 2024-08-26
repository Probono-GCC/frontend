import styles from "../Styles/css/Login.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import LoginContainer from "../Components/LoginContainer";
import ForgotPassword from "../Components/ForgotPassword";
import BackImage1 from "../Assets/img/BackgroundSample/CLA_back1.png";
import BackImage2 from "../Assets/img/BackgroundSample/CLA_back2.png";
import BackImage3 from "../Assets/img/BackgroundSample/sample_images_02.png";
import BackImage4 from "../Assets/img/BackgroundSample/sample_images_03.png";
import BackImage5 from "../Assets/img/BackgroundSample/sample_images_04.png";
import { Password } from "@mui/icons-material";

//다국어지원
import i18n from "../i18n/i18n"; // 경로는 파일의 위치에 따라 조정해야 합니다.
import { useTranslation } from "react-i18next";
import "../i18n/i18n.js"; // src/Pages에서 src/i18n으로 접근; // i18next 초기화 파일
function Login({ type }) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(1);

  /**언어 선택 임시 선택상자 */
  const [lang, setLang] = useState(10);

  const handleChange = (event) => {
    const selectedLanguage = event.target.value;
    setLang(event.target.value);

    console.log("event.target.value", event.target.value);

    let languageCode;
    if (selectedLanguage === 20) {
      languageCode = "ne";
    } else if (selectedLanguage === 10) {
      languageCode = "en";
    } else {
      // 지원하지 않는 언어가 선택된 경우 기본값을 설정합니다.
      languageCode = "en"; // 기본 언어 코드
    }

    // i18n을 사용하여 언어를 변경합니다.
    i18n.changeLanguage(languageCode);
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // 사용자에게 페이지를 떠나려고 할 때 경고 메시지를 표시
      event.preventDefault();
      event.returnValue = ""; // 일부 브라우저에서 작동
      return ""; // 표준에 따라
    };

    // beforeunload 이벤트 리스너 등록
    window.addEventListener("beforeunload", handleBeforeUnload);

    // cleanup 함수로 리스너 제거
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  /**언어 선택 임시 선택상자 */
  const BackgroundSample = [
    { img: BackImage1, key: 1 },
    { img: BackImage2, key: 2 },
    // { img: BackImage3, key: 3 },
    // { img: BackImage4, key: 4 },
    // { img: BackImage5, key: 5 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % BackgroundSample.length);
    }, 3000); // 3초마다 슬라이드 전환

    return () => clearInterval(interval);
  }, [BackgroundSample.length]);

  return (
    <div id={styles.page_container}>
      {type == "default" ? (
        <div>
          <div id={styles.right_align}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={lang}
                onChange={handleChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                sx={{ height: "5vh" }}
              >
                <MenuItem value={10}>Eng</MenuItem>
                <MenuItem value={20}>Nepali</MenuItem>
              </Select>
            </FormControl>
          </div>
          <LoginContainer />
        </div>
      ) : (
        <div>
          <div id={styles.right_align}>
            <FormControl sx={{ m: 1, minWidth: 120, marginLeft: "30vw" }}>
              <Select
                value={lang}
                onChange={handleChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                sx={{ height: "5vh" }}
              >
                <MenuItem value={10}>Eng</MenuItem>
                <MenuItem value={20}>Nepali</MenuItem>
              </Select>
            </FormControl>
          </div>
          <ForgotPassword />
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
