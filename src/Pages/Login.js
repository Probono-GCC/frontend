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

function Login({ type }) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(1);

  /**언어 선택 임시 선택상자 */
  const [lang, setLang] = useState(10);

  const handleChange = (event) => {
    setLang(event.target.value);
  };
  const moveForgotPassword = () => {
    navigate("/forgot-password");
  };
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
                <MenuItem value={30}>Kor</MenuItem>
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
                <MenuItem value={30}>Kor</MenuItem>
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
