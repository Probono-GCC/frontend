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
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AppBar from "../Components/AppBar";
import { jwtDecode } from "jwt-decode";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
//권한
import { useAuth } from "../store/AuthContext"; // Context API에서 인증 상태를 가져옵니다

//api
import {
  updateStudentProfile,
  postProfileImage,
  updateTeacherProfile,
  getStudent,
  getTeacher,
  getProfileImage,
} from "../Apis/Api/User";
import { useTranslation } from "react-i18next";
import { fontStyle } from "@mui/system";
const grades = [
  { value: "PLAYGROUP", label: "PlayGroup" },
  { value: "NURSERY", label: "Nursery" },
  { value: "LOWER_KG", label: "LowerKG" },
  { value: "UPPER_KG", label: "UpperKG" },
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
function MyProfile() {
  const { t } = useTranslation();

  const { userRole, userData } = useAuth();
  const role = ["ROLE_ADMIN", "ROLE_TEACHER", "ROLE_STUDENT"];
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");
  const [birth, setBirth] = useState(null);
  const [phoneNum, setPhoneNum] = useState("");
  const [fatherPhoneNum, setFatherPhoneNum] = useState("");
  const [motherPhoneNum, setMotherPhoneNum] = useState("");
  const [guardiansPhoneNum, setGuardiansPhoneNum] = useState("");
  const [pwAnswer, setPwAnswer] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [firstAccess, setFirstAccess] = useState(null);
  const [agree, setAgree] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [profileImage, setProfileImage] = useState(""); //file타입
  const [initialImageId, setInitialImageId] = useState(0);
  const [thumbnailImage, setThumnailImage] = useState(""); //썸네일

  const storedToken = localStorage.getItem("jwt");
  const decodedToken = jwtDecode(storedToken);

  //초기 데이터 저장
  const [initialValues, setInitialValues] = useState({
    imageId: 0,
    gender: "",
    grade: "",
    birth: null,
    phoneNum: "",
    fatherPhoneNum: "",
    motherPhoneNum: "",
    guardiansPhoneNum: "",
    pwAnswer: "",
  });

  const navigate = useNavigate();
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleGradeChange = (event) => {
    setGrade(event.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleBirthChange = (newValue) => {
    // newValue는 선택된 날짜를 포함한 Dayjs 객체
    setBirth(newValue ? newValue.format("YYYY-MM-DD") : null);
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

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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

  const checkImage = (file) => {
    let err = "";

    if (!file) return (err = "File does not exist.");
    if (file.size > 1024 * 1024) {
      err = "The largest image size is 1mb.";
    }
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      err = "Image format is incorrect.";
    }

    return err;
  };

  const handleProfileImageChange = (event) => {
    //console.log("imagechanged");
    const file = event.target.files[0];

    const checkMsg = checkImage(file);
    if (checkMsg) {
      return alert(checkMsg);
    }

    if (file) {
      setProfileImage(file); // File 객체로 저장
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumnailImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleProfileImageDelete = () => {
    setProfileImage("");
    setInitialImageId(0);
    setThumnailImage("");
  };
  const validateForm = () => {
    const isProfileImageValid = profileImage !== "";
    //console.log(
    //   profileImage,
    //   "?",
    //   profileImage,
    //   "//image?",
    //   isProfileImageValid
    // );
    const isPersonalInfoValid =
      gender !== "" &&
      birth !== "" &&
      phoneNum !== "" &&
      pwAnswer !== "" &&
      grade !== "GRADUATED";

    if (decodedToken.role == role[2]) {
      const isContactInfoValid =
        fatherPhoneNum !== "" ||
        motherPhoneNum !== "" ||
        guardiansPhoneNum !== "";
      //console.log(
      //   isProfileImageValid && isPersonalInfoValid && isContactInfoValid,
      //   "왜 true???"
      // );
      return isProfileImageValid && isPersonalInfoValid && isContactInfoValid;
    } else {
      return isProfileImageValid && isPersonalInfoValid;
    }
  };
  const changedFields = {};
  const handleEdit = () => {
    //student, teacher 공통필드
    if (name !== initialValues.name) {
      changedFields.name = name;
    }
    if (gender !== initialValues.gender) {
      changedFields.sex = gender;
    }
    if (birth !== initialValues.birth) {
      changedFields.birth = birth;
    }
    if (phoneNum !== initialValues.phoneNum) {
      changedFields.phoneNum = phoneNum;
    }
    if (pwAnswer !== initialValues.pwAnswer) {
      changedFields.pwAnswer = pwAnswer;
    }
    // 프로필 이미지 업로드
    const userID = decodedToken.username;
    const imageData = new FormData();

    if (profileImage) {
      imageData.append("image", profileImage); // File 객체를 FormData에 추가
      postProfileImage(imageData, userID)
        .then((result) => {
          // //console.log("image new post", result.imageId);
          changedFields.imageId = result.imageId;
          updateProfile(); // 이미지 업로드가 완료된 후 updateProfile 함수 호출
        })
        .catch((error) => {
          console.error("Image upload error:", error);
        });
    } else if (initialImageId) {
      changedFields.imageId = initialImageId;
      updateProfile();
    } else {
      // //console.log(initialImageId, "ini");
      alert("Profile image registration is required");
      // updateProfile();
    }
  };
  const updateProfile = () => {
    if (decodedToken.role == role[1]) {
      //console.log("teacher userData", changedFields);
      updateTeacherProfile(changedFields, decodedToken.username).then(
        (result) => {
          //console.log("final teacher data", result);
          if (result && result.status == 200) {
            alert("Complete");
            navigate("/private/home");
          }
        }
      );
    } else if (decodedToken.role == role[2]) {
      if (grade !== initialValues.grade) {
        changedFields.grade = grade;
      }
      if (fatherPhoneNum !== initialValues.fatherPhoneNum) {
        changedFields.fatherPhoneNum = fatherPhoneNum;
      }
      if (motherPhoneNum !== initialValues.motherPhoneNum) {
        changedFields.motherPhoneNum = motherPhoneNum;
      }
      if (guardiansPhoneNum !== initialValues.guardiansPhoneNum) {
        changedFields.guardiansPhoneNum = guardiansPhoneNum;
      }
      //console.log("put userdata", changedFields);
      updateStudentProfile(changedFields, decodedToken.username).then(
        (result) => {
          if (result && result.status == 200) {
            alert("Complete");
            navigate("/private/home");
          }
        }
      );
    } else {
      console.error("role err");
    }
  };
  const handleSave = () => {
    const userID = decodedToken.username;
    // 프로필 이미지가 있다면 FormData를 사용하여 서버에 전송
    const imageData = new FormData();
    if (profileImage) {
      imageData.append("image", profileImage); // File 객체를 FormData에 추가
    }

    const changedUserData = {
      birth: birth,
      sex: gender,
      phoneNum: phoneNum,
    };

    if (decodedToken.role == role[2]) {
      changedUserData.grade = grade;
      changedUserData.fatherPhoneNum = fatherPhoneNum;
      changedUserData.motherPhoneNum = motherPhoneNum;
      changedUserData.guardiansPhoneNum = guardiansPhoneNum;
    }
    if (firstAccess === null) {
      changedUserData.pwAnswer = pwAnswer;
    }
    if (newPassword != "") {
      changedUserData.password = newPassword;
    }

    // 프로필 이미지 업로드
    if (profileImage) {
      postProfileImage(imageData, userID)
        .then((result) => {
          //console.log("image new post", result.imageId);
          changedUserData.imageId = result.imageId;
          if (decodedToken.role == role[1]) {
            //console.log("teacher userData", changedUserData);
            updateTeacherProfile(changedUserData, decodedToken.username).then(
              (result) => {
                //console.log("final teacher data", result);
                if (result && result.status == 200) {
                  alert("Complete");
                  navigate("/private/home");
                }
              }
            );
          } else if (decodedToken.role == role[2]) {
            //console.log("put userdata", changedUserData);
            updateStudentProfile(changedUserData, decodedToken.username).then(
              (result) => {
                if (result && result.status == 200) {
                  alert("Complete");
                  navigate("/private/home");
                }
              }
            );
          } else {
            console.error("role err");
          }
        })
        .catch((error) => {
          console.error("Image upload error:", error);
        });
    }
  };

  useEffect(() => {
    //console.log("decodedToken.role", decodedToken.role);
    if (decodedToken.role == role[1]) {
      getTeacher(decodedToken.username).then((result) => {
        setBirth(result.birth);
        setName(result.name);
        setGender(result.sex);
        setPhoneNum(result.phoneNum);
        setPwAnswer(result.pwAnswer);
        setFirstAccess(result.pwAnswer);
        //console.log("result.imageId.imageId", result);

        if (result.imageId) {
          getProfileImage(result.imageId.imageId).then((res) => {
            setThumnailImage(res.imagePath);
            setInitialImageId(res.imageId);
            // //console.log("imagepath", res.imagePath);
          });
        }
        // 초기 값 설정(변경 전 후 감지후 put하기위해)
        setInitialValues({
          name: result.name,
          gender: result.sex,
          birth: result.birth,
          phoneNum: result.phoneNum,
          pwAnswer: result.pwAnswer,
          imageId: result.imageId,
        });
      });
    } else if (decodedToken.role == role[2]) {
      getStudent(decodedToken.username).then((result) => {
        //console.log("result.imageId.imageId", result, userData);
        setBirth(result.birth);
        setName(result.name);
        setGrade(result.grade);
        if (result.classResponse && result.classResponse.section) {
          setSection(result.classResponse.section);
        }

        setGender(result.sex);
        setPhoneNum(result.phoneNum);
        setPwAnswer(result.pwAnswer);
        setFatherPhoneNum(result.fatherPhoneNum);
        setMotherPhoneNum(result.motherPhoneNum);
        setGuardiansPhoneNum(result.guardiansPhoneNum);
        setFirstAccess(result.pwAnswer);
        if (result.imageResponseDTO) {
          getProfileImage(result.imageResponseDTO.imageId).then((res) => {
            setThumnailImage(res.imagePath);
            setInitialImageId(res.imageId);
          });
        }
        // 초기 값 설정
        setInitialValues({
          name: result.name,
          grade: result.grade ? result.grade : "",
          gender: result.sex,
          birth: result.birth,
          phoneNum: result.phoneNum,
          pwAnswer: result.pwAnswer,
          fatherPhoneNum: result.fatherPhoneNum,
          motherPhoneNum: result.motherPhoneNum,
          guardiansPhoneNum: result.guardiansPhoneNum,
          imageId: result.imageResponseDTO
            ? result.imageResponseDTO.imageId
            : "",
        });
      });
    }
  }, []);
  useEffect(() => {
    if (firstAccess === null) {
      //console.log("!agree?", !agree);
      //console.log("!isButtonEnabled?", !isButtonEnabled);
      //console.log("firstAccess임!!!", !agree && !isButtonEnabled);
      setIsButtonEnabled(validateForm());
    }
  }, [
    name,
    birth,
    gender,
    phoneNum,
    pwAnswer,
    fatherPhoneNum,
    motherPhoneNum,
    guardiansPhoneNum,
    profileImage,
  ]);
  return (
    <div>
      <AppBar />
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 0 }}>
        <Typography
          variant="h3"
          component="div"
          sx={{ fontFamily: "Copperplate" }}
        >
          {t("My Profile")}
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
              src={thumbnailImage}
              sx={{ width: 150, height: 150, margin: "0 auto" }}
            />
            <Button
              variant="outlined"
              component="label"
              sx={{ marginRight: 2, marginTop: 3 }}
            >
              {t("Change")}
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
              {t("Delete")}
            </Button>
          </Grid>
          {decodedToken.role === role[0] ? (
            <Grid item xs={12} sx={{ textAlign: "center", fontSize: "larger" }}>
              Administor can't edit profile
            </Grid>
          ) : (
            <div></div>
          )}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t("ID")}
              defaultValue={decodedToken.username}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              value={decodedToken.username}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              disabled={decodedToken.role === role[0]}
              id="outlined-disabled"
              label={t("Name")}
              onChange={handleNameChange}
              value={name ? name : ""}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              {decodedToken.role == role[0] || decodedToken.role == role[1] ? (
                <InputLabel id="demo-simple-select-label">
                  {t("Grade field for student/teacher")}
                </InputLabel>
              ) : (
                <InputLabel sx={{ color: "red" }} id="demo-simple-select-label">
                  Grade*
                </InputLabel>
              )}
              <Select
                variant="outlined"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={
                  decodedToken.role == role[0]
                    ? t("Grade field for student/teacher")
                    : t("Grade")
                }
                value={grade ? grade : ""}
                onChange={handleGradeChange}
                disabled={decodedToken.role === role[0]}
                InputProps={{
                  style: { borderColor: "red" }, // 빨간 테두리 스타일
                }}
              >
                {grades.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label={
                decodedToken.role === role[0] || decodedToken.role === role[1]
                  ? t("Section field for student")
                  : t("Section")
              }
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              value={section ? section : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          {/* <Grid item xs={12}>
            <Typography sx={{ color: "red" }}>Fill in the blank</Typography>
          </Grid> */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              {decodedToken.role == role[0] ? (
                <InputLabel id="demo-simple-select-label">
                  {t("Gender field for student/teacher")}
                </InputLabel>
              ) : (
                <InputLabel sx={{ color: "red" }} id="demo-simple-select-label">
                  Gender*
                </InputLabel>
              )}

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={
                  decodedToken.role == role[0]
                    ? t("Gender field for student/teacher")
                    : t("Gender")
                }
                value={gender}
                onChange={handleGenderChange}
                disabled={decodedToken.role === role[0]}
                InputProps={{
                  style: { borderColor: "red" }, // 빨간 테두리 스타일
                }}
              >
                <MenuItem value="MALE">Male</MenuItem>
                <MenuItem value="FEMALE">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  sx={{
                    width: "100%",
                    // DatePicker의 텍스트 필드 색상
                    "& .MuiFormLabel-colorPrimary ": {
                      color: decodedToken.role[2] ? "red" : "",
                    },
                    "& .MuiInputBase-input": {
                      color: decodedToken.role[2] ? "black" : "",
                    },
                  }}
                  label={
                    decodedToken.role === role[0]
                      ? t("Birth field for student/teacher")
                      : t("Birth*")
                  }
                  disabled={decodedToken.role === role[0]}
                  onChange={handleBirthChange}
                  value={birth ? dayjs(birth) : null}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiFormLabel-root": {
                  color: decodedToken.role[2] ? "red" : "",
                },
              }}
              value={phoneNum ? phoneNum : ""}
              onChange={handlePhoneNumChange}
              label={
                decodedToken.role === role[0]
                  ? t("Phone field for student")
                  : t("Phone Number*")
              }
              disabled={decodedToken.role === role[0]}
            />
          </Grid>

          <Grid item xs={12}>
            {decodedToken.role === role[2] && (
              <FormHelperText
                sx={{ color: "red", fontSize: "14px", marginBottom: "10px" }}
              >
                At least one phone number (mother, father, or guardian) is
                required.
              </FormHelperText>
            )}
            <TextField
              fullWidth
              variant="outlined"
              value={motherPhoneNum}
              onChange={handleMotherPhoneNumChange}
              label={
                decodedToken.role === role[0] || decodedToken.role === role[1]
                  ? t("Mother Phone field for student")
                  : t("Mother Phone Number")
              }
              disabled={
                decodedToken.role === role[0] || decodedToken.role === role[1]
              }
              sx={{
                backgroundColor:
                  decodedToken.role === role[0] || decodedToken.role === role[1]
                    ? "#dee5e8"
                    : "",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={
                decodedToken.role === role[0] || decodedToken.role === role[1]
                  ? t("Father Phone field for student")
                  : t("Father Phone Number")
              }
              disabled={
                decodedToken.role === role[0] || decodedToken.role === role[1]
              }
              sx={{
                backgroundColor:
                  decodedToken.role === role[0] || decodedToken.role === role[1]
                    ? "#dee5e8"
                    : "",
              }}
              variant="outlined"
              value={fatherPhoneNum}
              onChange={handleFatherPhoneNumChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={
                decodedToken.role === role[0] || decodedToken.role === role[1]
                  ? t("Guardians Phone field for student")
                  : t("Guardians Phone Number")
              }
              disabled={
                decodedToken.role === role[0] || decodedToken.role === role[1]
              }
              sx={{
                backgroundColor:
                  decodedToken.role === role[0] || decodedToken.role === role[1]
                    ? "#dee5e8"
                    : "",
              }}
              variant="outlined"
              value={guardiansPhoneNum}
              onChange={handleGuardiansNumChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
              {t("Password Recovery Question")}
            </Typography>
            <Typography sx={{ marginTop: "5px" }}>
              {t("What is your most favorite food?")}
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              disabled={firstAccess != null || decodedToken.role == role[0]}
              value={pwAnswer}
              onChange={handlePwAnswerChange}
              sx={{
                "& .MuiFormLabel-root": {
                  color: decodedToken.role[2] ? "red" : "",
                },
                marginTop: 2,
              }}
              label={
                decodedToken.role === role[0]
                  ? t("PW Answer field for student/teacher")
                  : t("PW Answer*")
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{ fontSize: 20, fontWeight: "bold", marginBottom: "8px" }}
            >
              {t("Change Password")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              disabled={decodedToken.role === role[0]}
              label={t("New PW")}
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
              disabled={decodedToken.role === role[0]}
              label={t("Re-type PW")}
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
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
              label={t("Agree with")}
            />
            <FormHelperText>
              [{t("Consent for Collection and Use of Personal Information")}]{" "}
              {t(
                "Retention and usage period: Until the member withdraws their membership."
              )}
            </FormHelperText>
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              disabled={
                firstAccess != null ? !agree : !agree || !isButtonEnabled
              }
              onClick={firstAccess != null ? handleEdit : handleSave}
            >
              {t("Save")}
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ marginBottom: 5 }} />
    </div>
  );
}

export default MyProfile;
