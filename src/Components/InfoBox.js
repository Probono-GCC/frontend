import React from "react";
import { Grid, TextField, Box } from "@mui/material";
import { useMediaQueryContext } from "../store/MediaQueryContext";

const ClassInfoBox = ({ batch, grade, section, teacher, studentCount }) => {
  const { isSmallScreen } = useMediaQueryContext();

  const classInfo = {
    batch: batch,
    grade: grade,
    section: section,
    homeroomTeacher: teacher,
    studentCount: studentCount,
  };

  return (
    <Box
      sx={{
        width: isSmallScreen ? "100%" : "90%",
        margin: "0 auto",
        padding: "10px",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Batch"
            value={classInfo.batch}
            variant="outlined"
            InputProps={{
              readOnly: true,
              sx: { fontSize: isSmallScreen ? "15px" : "16px" },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Grade"
            value={classInfo.grade}
            variant="outlined"
            InputProps={{
              readOnly: true,
              sx: { fontSize: isSmallScreen ? "14px" : "16px" },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Section"
            value={classInfo.section}
            variant="outlined"
            InputProps={{
              readOnly: true,
              sx: { fontSize: isSmallScreen ? "14px" : "16px" },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Homeroom Teacher"
            value={classInfo.homeroomTeacher}
            variant="outlined"
            InputProps={{
              readOnly: true,
              sx: {
                minWidth: "600px",
                fontSize: isSmallScreen ? "14px" : "16px",
                overflowX: "scroll",
                whiteSpace: "nowrap",
              },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Student Count"
            value={classInfo.studentCount}
            variant="outlined"
            InputProps={{
              readOnly: true,
              sx: { fontSize: isSmallScreen ? "14px" : "16px" },
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClassInfoBox;
