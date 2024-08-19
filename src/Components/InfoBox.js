import React from "react";
import { Grid, TextField, Box } from "@mui/material";

const ClassInfoBox = ({ batch, grade, section, teacher, studentCount }) => {
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
        width: "90%",
        margin: "0 auto",
        padding: 2,
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
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClassInfoBox;
