import React from "react";
import { Button } from "@mui/material";

const SelectButton = ({ selected, onClick, children }) => {
  return (
    <Button
      variant={selected ? "contained" : "outlined"}
      onClick={onClick}
      fullWidth
      sx={{
        backgroundColor: selected ? "#D8EDFF" : "#f5f5f5",
        color: selected ? "#1B8EF2" : "#888",
        borderColor: "#ccc",
        textTransform: "none",
        fontSize: "1rem",
        padding: "10px 0",
        "&:hover": {
          backgroundColor: "#D8EDFF",
          borderColor: "#1B8EF2",
        },
      }}
    >
      {children}
    </Button>
  );
};

export default SelectButton;
