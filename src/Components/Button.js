import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import styles from "../Styles/css/Button.module.css";

function CustomButton({ title, disabled, onClick, id, size }) {
  return (
    <Stack id={id ? styles[id] : ""} direction="row" spacing={2}>
      <Button
        className={size == "bg" ? styles.bg_button : styles.md_button}
        variant="contained"
        disabled={disabled}
        onClick={onClick}
        sx={{
          width: size === "md" ? "100px" : "270px",
          backgroundColor: id === "cancel" ? "white" : "#405c8b", // title이 "cancel"일 때 배경색 빨간색, 그렇지 않으면 파란색
          color: id === "cancel" ? "#405c8b" : "#F2F2F2",
          // border: "#405c8b 1px solid",
          padding: "10px 20px",
          marginBottom: "30px",
          "&:hover": {
            backgroundColor: id === "cancel" ? "#f5f5f5" : "#7187a3", // 호버 시 색상 변경
            border: id === "cancel" ? "#2e4a6d 1px solid" : "#42566e 1px solid",
            color: id === "cancel" ? "#bd2304" : "#1e293b",
          },
        }}
      >
        {title}
      </Button>
    </Stack>
  );
}
CustomButton.propTypes = {
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  id: PropTypes.string,
  size: PropTypes.string,
};
export default CustomButton;
