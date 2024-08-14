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
import { postStudent } from "../Apis/Api/User";

function CreateAccount() {
  const [tabValue, setTabValue] = useState(0); // 0: Student, 1: Teacher
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [rePasswordError, setRePasswordError] = useState(false);
  const [grade, setGrade] = useState("PlayGroup");
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isSnChecked, setIsSnChecked] = useState(false);
  const [id, setId] = useState("");
  const [sn, setSn] = useState("");
  const [name, setName] = useState("");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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

  const handleDuplicateCheck = () => {
    alert("Not Duplicate");
    setIsIdChecked(true);
  };

  const handleSnDuplicateCheck = () => {
    alert("Not Duplicate");
    setIsSnChecked(true);
  };

  const grades = [
    { value: "PLAYGROUP", label: "PlayGroup" },
    { value: "Nursery", label: "Nursery" },
    { value: "LowerKG", label: "LowerKG" },
    { value: "UpperKG", label: "UpperKG" },
    { value: "Class1", label: "Class 1" },
    { value: "Class2", label: "Class 2" },
    { value: "Class3", label: "Class 3" },
    { value: "Class4", label: "Class 4" },
    { value: "Class5", label: "Class 5" },
    { value: "Class6", label: "Class 6" },
    { value: "Class7", label: "Class 7" },
    { value: "Class8", label: "Class 8" },
    { value: "Class9", label: "Class 9" },
    { value: "Class10", label: "Class 10" },
  ];

  // 정규표현식으로 입력 조건 필터링 필요
  const handleRegister = () => {
    if (!isIdChecked) {
      alert("Please Check your ID");
      return;
    }
    if (tabValue === 0 && !isSnChecked) {
      alert("Please Check your S/N");
      return;
    }
    if (name.trim() === "") {
      alert("Please input your name");
      return;
    }
    if (password.trim() === "" || password !== rePassword) {
      alert("Please check your PW");
      return;
    }

    if (tabValue === 0) {
      alert(
        `[ID] ${id}\n[Name] ${name}\n[Grade] ${grade}\n\nStudent Register Success!`
      );
    } else {
      alert(`[ID] ${id}\n[Name] ${name}\n\nTeacher Register Success!`);
    }

    // backend 전송
    const body = {
      loginId: id,
      loginPw: password,
      name: name,
      serialNumber: sn,
      grade: grade,
    };

    console.log(body);

    if (tabValue === 0) {
      postStudent(body).then((result) => {
        console.log(result);
        alert("가입 완료");
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
              onChange={(e) => setId(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleDuplicateCheck}
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
                onChange={(e) => setSn(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="outlined"
                        size="small"
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
