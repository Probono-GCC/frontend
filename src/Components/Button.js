import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import styles from "../Styles/css/Button.module.css";
function CostomButton({ title, disabled, onClick, id, size }) {
  // Button.propTypes = {
  //   title: PropTypes.string.isRequired,
  //   onClick: PropTypes.func.isRequired,
  //   disabled: PropTypes.bool,
  //   id: PropTypes.string,
  // };
  const navigate = useNavigate();

  const moveForgotPassword = () => {
    navigate("/forgot-password");
  };
  return (
    <Stack id={id ? styles[id] : ""} direction="row" spacing={2}>
      {/* <Button variant="contained">Contained</Button> */}
      {id === "login_btn" ? (
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <p
            id={styles.forgotPw_btn}
            onClick={moveForgotPassword}
            style={{ color: "#1B3DA6" }}
          >
            Forgot your password?
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            width: "25vw",
          }}
        ></div>
      )}

      <Button
        className={size == "bg" ? styles.bg_button : styles.md_button}
        variant="contained"
        disabled={disabled}
        onClick={onClick}
        sx={{ backgroundColor: "#889fc8", color: "#F2F2F2" }}
      >
        {title}
      </Button>
      {/* <Button variant="contained" href="#contained-buttons">
        Link
      </Button> */}
    </Stack>
  );
}

export default CostomButton;
