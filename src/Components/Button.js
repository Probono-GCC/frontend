import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import styles from "../Styles/css/Button.module.css";
function CostomButton({ title, disabled }) {
  return (
    <Stack direction="row" spacing={2}>
      {/* <Button variant="contained">Contained</Button> */}
      <Button id={styles.button} variant="contained" disabled={disabled}>
        {title}
      </Button>
      {/* <Button variant="contained" href="#contained-buttons">
        Link
      </Button> */}
    </Stack>
  );
}

export default CostomButton;
