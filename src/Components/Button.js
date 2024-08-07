import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import styles from "../Styles/css/Button.module.css";
function CostomButton({ title, disabled, onClick, id, size }) {
  return (
    <Stack id={id ? styles[id] : ""} direction="row" spacing={2}>
      <Button
        className={size == "bg" ? styles.bg_button : styles.md_button}
        variant="contained"
        disabled={disabled}
        onClick={onClick}
        sx={{ backgroundColor: "#889fc8", color: "#F2F2F2" }}
      >
        {title}
      </Button>
    </Stack>
  );
}

export default CostomButton;
