import React, { useState } from "react";
import AppBar from "../Components/AppBar";
import {
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Tabs,
  Tab,
  IconButton,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useMediaQueryContext } from "../store/MediaQueryContext";
import { grades } from "../Data/data";
import {
  postStudent,
  postTeacher,
  checkDuplicatedUserIdApi,
  checkDuplicatedStudentSerialNumberApi,
} from "../Apis/Api/User";
// import i18n from "../i18n/i18n";
import { useTranslation } from "react-i18next";

function CreateAccount() {
  const { isSmallScreen } = useMediaQueryContext();
  const [tabValue, setTabValue] = useState(0); // 0: Student, 1: Teacher
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [rePasswordError, setRePasswordError] = useState(false);
  const [grade, setGrade] = useState("PLAYGROUP");
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isSnChecked, setIsSnChecked] = useState(false);
  const [id, setId] = useState("");

  const [sn, setSn] = useState("");
  const [name, setName] = useState("");

  const { t } = useTranslation();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setIsIdChecked(false);
    setIsSnChecked(false);
  };

  const togglePasswordVisibility = (setState) => {
    setState((prev) => !prev);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    checkPasswords(event.target.value, rePassword);
  };

  const handleRePasswordChange = (event) => {
    setRePassword(event.target.value);
    checkPasswords(password, event.target.value);
  };

  const checkPasswords = (pw, rePw) => {
    if (pw.length > 0 && rePw.length > 0 && pw !== rePw) {
      setRePasswordError(true);
    } else {
      setRePasswordError(false);
    }
  };

  const handleIdDuplicateCheck = async () => {
    try {
      const result = await checkDuplicatedUserIdApi(id);
      if (result && result.status === 200) {
        alert("ID is available.");
        setIsIdChecked(true);
      } else {
        alert("⚠️ID is already taken.⚠️");
        setIsIdChecked(false);
      }
    } catch (error) {
      console.error("Error checking ID duplication:", error);
      setIsIdChecked(false);
    }
  };

  const handleSnDuplicateCheck = async () => {
    if (tabValue !== 0) return; // Only for students

    try {
      const result = await checkDuplicatedStudentSerialNumberApi(sn);
      if (result && result.status === 200) {
        alert("Serial Number is available.");
        setIsSnChecked(true);
      } else {
        alert("Serial Number is already taken.");
        setIsSnChecked(false);
      }
    } catch (error) {
      console.error("Error checking Serial Number duplication:", error);
      setIsSnChecked(false);
    }
  };

  const handleRegister = async () => {
    if (!isIdChecked) {
      alert("Please Check your ID");
      return;
    }

    if (tabValue === 0) {
      if (!snRegex.test(sn) || !isSnChecked) {
        alert("Please Check your S/N");
        return;
      }
    }

    if (!nameRegex.test(name)) {
      alert("Name must contain only letters");
      return;
    }

    if (!pwRegex.test(password)) {
      alert(
        "Password must be 4-20 characters long and contain letters, numbers, and special characters, with at least one letter and one number."
      );
      return;
    }

    if (password !== rePassword) {
      alert("Re-type Password is different from original password!");
      return;
    }

    if (tabValue === 0) {
      const studentBody = {
        username: id,
        password: password,
        name: name,
        serialNumber: sn,
        grade: grade,
      };

      try {
        const result = await postStudent(studentBody);
        if (result && result.status === 201) {
          alert("Student account created!");
        } else {
          alert("Create failed");
        }
      } catch (error) {
        console.error("Error creating student:", error);
        alert("Create failed");
      }
    } else {
      const teacherBody = {
        username: id,
        password: password,
        name: name,
      };

      try {
        const result = await postTeacher(teacherBody);
        if (result && result.status === 201) {
          alert("Teacher account created!");
        } else {
          alert("Create failed");
        }
      } catch (error) {
        console.error("Error creating teacher:", error);
        alert("Create failed");
      }
    }

    // Clear form
    setId("");
    setIsIdChecked(false);
    setSn("");
    setIsSnChecked(false);
    setName("");
    setPassword("");
    setRePassword("");
  };

  // Validation Regex
  const idRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{4,20}$/;
  const pwRegex = /^(?=.*[a-zA-Z])[a-zA-Z\d!@#$%^*+=-]{4,20}$/;
  const snRegex = /^[1-9]\d*$/;
  const nameRegex = /^[a-zA-Z\s]+$/;

  return (
    <div>
      <AppBar />
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 0 }}>
        <Typography
          component="div"
          variant={isSmallScreen ? "h5" : "h3"}
          sx={{
            fontFamily: "Copperplate",
            // marginTop: isSmallScreen ? "5px" : "",
            // marginBottom: isSmallScreen ? "10px" : "",
            // marginLeft: isSmallScreen ? "10px" : "",
          }}
        >
          {t("Create Account")}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Student" />
          <Tab label="Teacher" />
        </Tabs>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", margin: 2 }}>
        <Grid container spacing={2} sx={{ maxWidth: 600 }}>
          {/* ID Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={"ID"}
              variant="outlined"
              value={id}
              // onFocus={() => setIsFocused(true)} // 포커스가 있을 때 isFocused를 true로 설정
              // onBlur={() => setIsFocused(false)} // 포커스가 벗어날 때 isFocused를 false로 설정
              onChange={(e) => {
                const newId = e.target.value;
                setId(newId);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="outlined"
                      size="small"
                      disabled={!idRegex.test(id)}
                      onClick={handleIdDuplicateCheck}
                    >
                      Duplicate Check
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
            <div style={{ fontSize: "14px", color: "#B3B3B3" }}>
              ID (4-20 characters)
            </div>
          </Grid>

          {/* Serial Number for Student Only */}
          {tabValue === 0 && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="SN"
                variant="outlined"
                value={sn}
                onChange={(e) => {
                  setSn(e.target.value);
                  setIsSnChecked(false);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="outlined"
                        size="small"
                        disabled={!snRegex.test(sn)}
                        onClick={handleSnDuplicateCheck}
                      >
                        Duplicate Check
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          )}

          {/* Name Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>

          {/* Password Fields */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="PW"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => togglePasswordVisibility(setShowPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <div style={{ fontSize: "14px", color: "#B3B3B3" }}>
              Password must be 4-20 characters long and contain letters,
              numbers, and special characters, with at least one letter and one
              number.
            </div>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Re-type PW"
              variant="outlined"
              type={showRePassword ? "text" : "password"}
              value={rePassword}
              onChange={handleRePasswordChange}
              error={rePasswordError}
              helperText={rePasswordError ? "Passwords do not match" : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        togglePasswordVisibility(setShowRePassword)
                      }
                      edge="end"
                    >
                      {showRePassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Grade Selector for Student */}
          {tabValue === 0 && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              >
                {grades.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}

          {/* Register Button */}
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleRegister}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default CreateAccount;
