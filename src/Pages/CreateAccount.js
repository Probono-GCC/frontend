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
import {
  postStudent,
  postTeacher,
  getStudents,
  getTeachers,
} from "../Apis/Api/User";

function CreateAccount() {
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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setIsIdChecked(false);
    setIsSnChecked(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowRePassword = () => {
    setShowRePassword(!showRePassword);
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
      // studentsResponse에서 content 배열을 가져옴
      const students = getStudents.content || [];
      const teachers = getTeachers.content || [];

      // students와 teachers의 username이 중복되는지 확인
      const isDuplicate =
        students.some((student) => student.username === id) ||
        teachers.some((teacher) => teacher.username === id);

      if (isDuplicate) {
        alert("ID is already taken.");
        setIsIdChecked(false);
      } else {
        alert("ID is available.");
        setIsIdChecked(true);
      }
    } catch (error) {
      console.error("Error checking ID duplication:", error);
      setIsIdChecked(false);
    }
  };

  const handleSnDuplicateCheck = async () => {
    if (tabValue !== 0) return; // Teacher 등록 시에는 S/N 체크 필요 없음

    try {
      const students = getStudents.content || [];
      console.log(students);
      console.log(sn);
      const isDuplicate = students.some(
        (student) => student.serialNumber == sn
      );

      if (isDuplicate) {
        alert("Serial Number is already taken.");
        setIsSnChecked(false);
      } else {
        alert("Serial Number is available.");
        setIsSnChecked(true);
      }
    } catch (error) {
      console.error("Error checking Serial Number duplication:", error);
      setIsSnChecked(false);
    }
  };

  const grades = [
    { value: "PLAYGROUP", label: "PlayGroup" },
    { value: "NURSERY", label: "Nursery" },
    { value: "LOWERKG", label: "LowerKG" },
    { value: "UPPERKG", label: "UpperKG" },
    { value: "CLASS1", label: "Class 1" },
    { value: "CLASS2", label: "Class 2" },
    { value: "CLASS3", label: "Class 3" },
    { value: "CLASS4", label: "Class 4" },
    { value: "CLASS5", label: "Class 5" },
    { value: "CLASS6", label: "Class 6" },
    { value: "CLASS7", label: "Class 7" },
    { value: "CLASS8", label: "Class 8" },
    { value: "CLASS9", label: "Class 9" },
    { value: "CLASS10", label: "Class 10" },
  ];

  // 정규표현식
  // id: 4자 이상 20자 이하, 영어와 숫자만 사용 가능, 적어도 하나의 영어가 포함되어야 함
  const idRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{4,20}$/;

  // pw: 4자 이상 20자 이하, 영어와 숫자, 특수문자 [!@#$%^*+=-] 사용 가능, 적어도 하나의 영어가 포함되어야 함
  const pwRegex = /^(?=.*[a-zA-Z])[a-zA-Z\d!@#$%^*+=-]{4,20}$/;

  // sn: 자연수만 가능
  const snRegex = /^[1-9]\d*$/;

  // name: 숫자 및 특수문자 입력 불가능
  const nameRegex = /^[a-zA-Z\s]+$/;

  const handleRegister = () => {
    if (!isIdChecked) {
      alert("Please Check your ID");
      return;
    }

    if (tabValue === 0 && !snRegex.test(sn) && !isSnChecked) {
      alert("Please Check your S/N");
      return;
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
      alert(
        `[ID] ${id}\n[Name] ${name}\n[Grade] ${grade}\n\nStudent Register Success!`
      );
    } else {
      alert(`[ID] ${id}\n[Name] ${name}\n\nTeacher Register Success!`);
    }

    const studentBody = {
      username: id,
      password: password,
      name: name,
      serialNumber: sn,
      grade: grade,
    };

    const teacherBody = {
      username: id,
      password: password,
      name: name,
    };

    if (tabValue === 0) {
      postStudent(studentBody).then((result) => {
        console.log(result);
        alert("학생 가입 완료");
      });
    } else {
      postTeacher(teacherBody).then((result) => {
        console.log(result);
        alert("선생님 가입 완료");
      });
    }

    setId("");
    setIsIdChecked(false);
    setSn("");
    setIsSnChecked(false);
    setName("");
    setPassword("");
    setRePassword("");
  };

  return (
    <div>
      <AppBar />
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 0 }}>
        <Typography
          variant="h3"
          component="div"
          sx={{ fontFamily: "Copperplate" }}
        >
          Create Account
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
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Grid container spacing={2} sx={{ maxWidth: 600 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="ID"
              variant="outlined"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
                setIsIdChecked(false); // ID 입력이 변경될 때 isIdChecked 해제
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
          </Grid>
          {tabValue === 0 && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Serial Number"
                variant="outlined"
                value={sn}
                onChange={(e) => {
                  setSn(e.target.value);
                  setIsSnChecked(false); // Serial Number 입력이 변경될 때 isSnChecked 해제
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

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
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
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
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
                      onClick={handleClickShowRePassword}
                      edge="end"
                    >
                      {showRePassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          {tabValue === 0 && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)} // 사용자가 변경할 때 state를 업데이트
              >
                {grades.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}
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
