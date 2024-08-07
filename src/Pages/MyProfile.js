import React, { useState } from "react";
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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AppBar from "../Components/AppBar";

function MyProfile() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [agree, setAgree] = useState(false);
  const [profileImage, setProfileImage] = useState("/images/profile_temp.png");

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
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Grid container spacing={3} sx={{ maxWidth: 600 }}>
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
              label="ID"
              defaultValue="Const ID"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              defaultValue="Const Name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Gender"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Entrance Year"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Grade"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Section"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Birth"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Phone" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="PW Question"
              variant="outlined"
              defaultValue="What is your favorite color?"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              defaultValue="Green"
              sx={{ marginTop: 1 }}
            />
          </Grid>
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
              label="Agree with"
            />
            <FormHelperText>
              [Consent for Collection and Use of Personal Information] Retention
              and usage period: Until the member withdraws their membership.
            </FormHelperText>
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              disabled={!agree}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ marginBottom: 5 }} />
    </div>
  );
}

export default MyProfile;
