import React from "react";
import { Box, Grid } from "@mui/material";

const SelectButtonContainer = ({ children }) => {
  return (
    <Box
      sx={{
        maxHeight: "260px",
        overflowY: "auto",
        padding: 1,
        border: "1px solid #ccc",
        borderRadius: 2,
      }}
    >
      <Grid container spacing={1}>
        {children}
      </Grid>
    </Box>
  );
};

export default SelectButtonContainer;
