import React, { useState, useEffect, useMemo } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Avatar,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AppBar from "../Components/AppBar";
import { jwtDecode } from "jwt-decode";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

//권한
import { useAuth } from "../store/AuthContext"; // Context API에서 인증 상태를 가져옵니다

function MyProfile() {
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [fatherPhoneNum, setFatherPhoneNum] = useState("");
  const [motherPhoneNum, setMotherPhoneNum] = useState("");
  const [guardiansPhoneNum, setGuardiansPhoneNum] = useState("");
  const [pwAnswer, setPwAnswer] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [agree, setAgree] = useState(false);
  const [profileImage, setProfileImage] = useState("/images/profile_temp.png");
  const storedToken = localStorage.getItem("jwt");
  const decodedToken = jwtDecode(storedToken);

  const { userRole } = useAuth();
  // 필수 필드가 채워져 있는지 확인하는 로직
  const validateForm = () => {
    return (
      pwAnswer &&
      gender &&
      birth &&
      phoneNum &&
      (fatherPhoneNum || motherPhoneNum || guardiansPhoneNum)
    );
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleBirthChange = (event) => {
    const selectedDate = new Date(event.target.value);
    setBirth(selectedDate.toISOString());
  };
  const handlePhoneNumChange = (event) => {
    setPhoneNum(event.target.value);
  };
  const handleMotherPhoneNumChange = (event) => {
    setMotherPhoneNum(event.target.value);
  };
  const handleFatherPhoneNumChange = (event) => {
    setFatherPhoneNum(event.target.value);
  };
  const handleGuardiansNumChange = (event) => {
    setGuardiansPhoneNum(event.target.value);
  };

  const handlePwAnswerChange = (event) => {
    setPwAnswer(event.target.value);
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
    checkPasswords(event.target.value, confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    checkPasswords(newPassword, event.target.value);
  };

  const checkPasswords = (pw, rePw) => {
    if (pw !== rePw) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleAgreeChange = (event) => {
    setAgree(event.target.checked);
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileImageDelete = () => {
    setProfileImage("/images/profile_temp.png");
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!validateForm()) {
        event.preventDefault();
        event.returnValue =
          "There are unsaved changes. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [password, newPassword, confirmPassword, passwordError, agree]);
  return (
    <div>
      <AppBar />
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 0 }}>
        <Typography
          variant="h3"
          component="div"
          sx={{ fontFamily: "Copperplate" }}
        >
          My Profile
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 2,
          width: "100%",
        }}
      >
        <Grid
          container
          spacing={3}
          sx={{
            width: "90%",
            maxWidth: { xs: "90%", sm: 600 },
          }}
        >
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Avatar
              alt="Profile Image"
              src={profileImage}
              sx={{ width: 150, height: 150, margin: "0 auto" }}
            />
            <Button
              variant="outlined"
              component="label"
              sx={{ marginRight: 2, marginTop: 3 }}
            >
              Change
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleProfileImageChange}
              />
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleProfileImageDelete}
              sx={{ marginTop: 3 }}
            >
              Delete
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              disabled={userRole === "ROLE_ADMIN"}
              label="ID"
              defaultValue={decodedToken.username}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              // value={decodedToken.username}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              disabled={userRole === "ROLE_ADMIN"}
              id="outlined-disabled"
              label="Name"
              defaultValue="name"
              value={decodedToken.name}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              {userRole == "ROLE_ADMIN" ? (
                <InputLabel>Gender field for student/teacher</InputLabel>
              ) : (
                <InputLabel>Gender</InputLabel>
              )}

              <Select
                value={gender}
                onChange={handleGenderChange}
                disabled={userRole === "ROLE_ADMIN"}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              disabled={userRole === "ROLE_ADMIN" || "ROLE_TEACHER"}
              label={
                userRole === "ROLE_ADMIN" || "ROLE_TEACHER"
                  ? "Grade field for student"
                  : "Grade"
              }
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={
                userRole === "ROLE_ADMIN" || "ROLE_TEACHER"
                  ? "Section field for student"
                  : "Section"
              }
              disabled={userRole === "ROLE_ADMIN" || "ROLE_TEACHER"}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  sx={{ width: "100%" }}
                  label={
                    userRole === "ROLE_ADMIN"
                      ? "Birth field for student/teacher"
                      : "Birth"
                  }
                  disabled={userRole === "ROLE_ADMIN"}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              value={phoneNum}
              onChange={handlePhoneNumChange}
              label={
                userRole === "ROLE_ADMIN" || "ROLE_TEACHER"
                  ? "Phone field for student"
                  : "Phone"
              }
              disabled={userRole === "ROLE_ADMIN" || "ROLE_TEACHER"}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              value={motherPhoneNum}
              onChange={handleMotherPhoneNumChange}
              label={
                userRole === "ROLE_ADMIN" || "ROLE_TEACHER"
                  ? "Mother Phone field for student"
                  : "Phone"
              }
              disabled={userRole === "ROLE_ADMIN" || "ROLE_TEACHER"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={
                userRole === "ROLE_ADMIN" || "ROLE_TEACHER"
                  ? "Father Phone field for student"
                  : "Phone"
              }
              disabled={userRole === "ROLE_ADMIN" || "ROLE_TEACHER"}
              variant="outlined"
              value={fatherPhoneNum}
              onChange={handleFatherPhoneNumChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              defaultValue="What is your favorite color?"
              InputProps={{
                readOnly: true,
              }}
              label={
                userRole === "ROLE_ADMIN"
                  ? "PW Question field for student/teacher"
                  : "PW Question"
              }
              disabled={userRole === "ROLE_ADMIN"}
            />
            <TextField
              fullWidth
              variant="outlined"
              defaultValue=""
              sx={{ marginTop: 1 }}
              value={pwAnswer}
              onChange={handlePwAnswerChange}
              label={
                userRole === "ROLE_ADMIN"
                  ? "PW Answer field for student/teacher"
                  : "PW Answer"
              }
              disabled={userRole === "ROLE_ADMIN"}
            />
          </Grid>
          {userRole != "ROLE_ADMIN" ? (
            <div>
              <p
                style={{
                  marginLeft: "24px",
                  marginBottom: 0,
                }}
              >
                change password
              </p>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Previous PW"
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
                  label="New PW"
                  variant="outlined"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowNewPassword}
                          edge="end"
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
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
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  error={passwordError}
                  helperText={passwordError ? "Passwords do not match" : ""}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox checked={agree} onChange={handleAgreeChange} />
                  }
                  label="Agree with"
                />
                <FormHelperText>
                  [Consent for Collection and Use of Personal Information]
                  Retention and usage period: Until the member withdraws their
                  membership.
                </FormHelperText>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={!agree}
                >
                  Save
                </Button>
              </Grid>
            </div>
          ) : (
            <div></div>
          )}
        </Grid>
      </Box>
      <Box sx={{ marginBottom: 5 }} />
    </div>
  );
}

export default MyProfile;
