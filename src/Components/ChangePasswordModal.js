import React, { useState, useEffect } from "react";
import { styled, css } from "@mui/system";
import { grey } from "../Styles/Color"; // 색상 팔레트 임포트
import {
  Box,
  TextField,
  Grid,
  IconButton,
  InputAdornment,
  Modal as BaseModal,
  Backdrop,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { resetPassword } from "../Apis/Api/User";

// 비밀번호 정규표현식
const pwRegex = /^(?=.*[a-zA-Z])[a-zA-Z\d!@#$%^*+=-]{4,20}$/;

function CustomModal({ open, handleClose, title, rowData, rowsHeader }) {
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [rePasswordError, setRePasswordError] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false); // 경고 메시지 표시 상태

  const handleSave = () => {
    if (!pwRegex.test(password)) {
      setPasswordError(true);
      setAlertOpen(true);
      return;
    }
    if (password !== rePassword) {
      setRePasswordError(true);
      setAlertOpen(true);
      return;
    }

    if (rowData) {
      const updatedStudentData = { newPassword: password };
      resetPassword(rowData.id, updatedStudentData)
        .then((result) => {
          if (result && result.status == 200) {
            setPassword("");
            setRePassword("");
            alert("changed password successfully");
            handleClose();
          }
        })
        .catch((err) => {
          alert("change password failed.");
        });
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowRePassword = () => {
    setShowRePassword(!showRePassword);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(!pwRegex.test(event.target.value));
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

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
        keepMounted
      >
        <ModalContent
          sx={{
            width: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2 id="keep-mounted-modal-title" className="modal-title">
            {title}
          </h2>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <Grid container spacing={2} sx={{ maxWidth: 600 }}>
              <Grid item xs={12} lg={12}>
                <TextField
                  disabled
                  fullWidth
                  label="Name"
                  variant="outlined"
                  type="text"
                  value={rowData ? rowData.name : ""}
                  InputProps={{
                    style: {
                      fontWeight: "bold",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} lg={12}>
                <TextField
                  fullWidth
                  label="PW"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  error={passwordError}
                  helperText={
                    passwordError
                      ? "Password must be 4-20 characters long and contain at least one letter."
                      : ""
                  }
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
              <Grid item xs={12} lg={12}>
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
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleClose}
                  sx={{ marginRight: 2 }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  disabled={
                    password.length === 0 ||
                    rePassword.length === 0 ||
                    passwordError ||
                    rePasswordError
                  }
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Box>
        </ModalContent>
      </Modal>

      {/* 경고 메시지 표시 */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {passwordError
            ? "Password must be 4-20 characters long and contain at least one letter."
            : "Passwords do not match!"}
        </Alert>
      </Snackbar>
    </div>
  );
}

const Modal = styled(BaseModal)(`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  width: 90vw;
  margin: auto;
  align-items: center;
  justify-content: center;
  &.base-Modal-hidden {
    visibility: hidden;
  }
`);

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled("div")(
  ({ theme }) => css`
    height: 70vh;
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
);

export default CustomModal;
