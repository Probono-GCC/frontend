import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import AppBar from "../Components/AppBar";
import Table from "../Components/Table";
import Radio from "@mui/material/Radio";

const label = { inputProps: { "aria-label": "Radio button demo" } };

const classes = [
  {
    id: 1,
    batch: 2084,
    grade: "PlayGroup",
    section: "A",
    teacher1: "Jin",
    teacher2: "Sunny",
  },
  {
    id: 2,
    batch: 2084,
    grade: "LowerKG",
    section: "A",
    teacher1: "Jin",
    teacher2: "Sunny",
  },
];

const teachers = [
  { id: 1, name: "Jun", subject: "t1013" },
  { id: 2, name: "Jin", subject: "t0108" },
  { id: 3, name: "Euler", subject: "t0213" },
  { id: 4, name: "Einstein", subject: "physics123" },
  { id: 5, name: "Srinivasan", subject: "t0221" },
  { id: 6, name: "Mozart", subject: "music123" },
  { id: 7, name: "Gold", subject: "economy123" },
  { id: 8, name: "Sunny", subject: "t1228" },
];

const students = [
  {
    sn: 1,
    name: "Jenny",
    gender: "Female",
    birth: "19.03.18",
    id: "a0318",
    grade: "LowerKG",
  },
  {
    sn: 2,
    name: "Jun",
    gender: "Male",
    birth: "19.10.28",
    id: "a1028",
    grade: "LowerKG",
  },
];

const classColumns = [
  { field: "batch", headerName: "Batch", flex: 0.2 },
  { field: "grade", headerName: "Grade", flex: 0.2 },
  { field: "section", headerName: "Section", flex: 0.2 },
  { field: "teacher1", headerName: "Teacher1", flex: 0.2 },
  { field: "teacher2", headerName: "Teacher2", flex: 0.2 },
];

const studentColumns = [
  { field: "sn", headerName: "SN", flex: 0.1 },
  { field: "name", headerName: "Name", flex: 0.2 },
  { field: "gender", headerName: "Gender", flex: 0.1 },
  { field: "birth", headerName: "Birth", flex: 0.2 },
  { field: "id", headerName: "ID", flex: 0.2 },
  { field: "grade", headerName: "Grade", flex: 0.2 },
];
function AssignHomeroom() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [leftStudents, setLeftStudents] = useState(students);
  const [rightStudents, setRightStudents] = useState([]);
  const [selectedLeftStudents, setSelectedLeftStudents] = useState([]);
  const [selectedRightStudents, setSelectedRightStudents] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleRowSelection = (id) => {
    setSelectedClass(id);
  };

  const updatedColumns = [
    {
      field: "radio",
      headerName: "",
      flex: 0.05,
      renderCell: (params) => (
        <Radio
          {...label}
          checked={selectedClass === params.row.id}
          onChange={() => handleRowSelection(params.row.id)}
        />
      ),
    },
    ...classColumns,
  ];

  const handleTeacherClick = (teacher) => {
    setSelectedTeachers((prev) => {
      if (prev.includes(teacher)) {
        return prev.filter((t) => t !== teacher);
      } else if (prev.length < 2) {
        return [...prev, teacher];
      } else {
        setAlertOpen(true);
        return prev;
      }
    });
  };

  const handleStudentTransfer = (
    from,
    to,
    setFrom,
    setTo,
    selected,
    setSelected
  ) => {
    const newFrom = from.filter((student) => !selected.includes(student));
    const newTo = [...to, ...selected];
    setFrom(newFrom);
    setTo(newTo);
    setSelected([]);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
    <div id="page_content">
      <AppBar />
      <Box sx={{ padding: 3 }}>
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            fontFamily: "Copperplate",
            marginTop: 2,
            marginBottom: 3,
          }}
        >
          Assign Homeroom
        </Typography>
        <Table
          columns={updatedColumns}
          rows={classes}
          onRowSelection={(selection) => handleRowSelection(selection[0])}
          getRowId={(row) => row.id}
        />
        {selectedClass && (
          <Box sx={{ maxWidth: "90%", margin: "0 auto" }}>
            <Typography
              variant="h4"
              sx={{ fontFamily: "Copperplate", marginTop: 10, marginBottom: 3 }}
            >
              Assign Teacher
            </Typography>
            <Grid container spacing={1} sx={{ marginBottom: 3 }}>
              {teachers.map((teacher) => (
                <Grid item xs={2} key={teacher.id}>
                  <Button
                    variant={
                      selectedTeachers.includes(teacher)
                        ? "contained"
                        : "outlined"
                    }
                    onClick={() => handleTeacherClick(teacher)}
                    fullWidth
                  >
                    {teacher.name} <br /> ({teacher.subject})
                  </Button>
                </Grid>
              ))}
            </Grid>
            <Divider sx={{ marginBottom: 3 }} />
            <Typography
              variant="h4"
              sx={{ fontFamily: "Copperplate", marginTop: 5, marginBottom: 5 }}
            >
              Assign Students
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <Table
                  columns={studentColumns}
                  rows={leftStudents}
                  onRowSelection={(selection) =>
                    setSelectedLeftStudents(selection)
                  }
                  getRowId={(row) => row.sn}
                />
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() =>
                    handleStudentTransfer(
                      leftStudents,
                      rightStudents,
                      setLeftStudents,
                      setRightStudents,
                      selectedLeftStudents,
                      setSelectedLeftStudents
                    )
                  }
                  sx={{ marginBottom: 2 }}
                >
                  &gt;
                </Button>
                <Button
                  variant="contained"
                  onClick={() =>
                    handleStudentTransfer(
                      rightStudents,
                      leftStudents,
                      setRightStudents,
                      setLeftStudents,
                      selectedRightStudents,
                      setSelectedRightStudents
                    )
                  }
                >
                  &lt;
                </Button>
              </Grid>
              <Grid item xs={5}>
                <Table
                  columns={studentColumns}
                  rows={rightStudents}
                  onRowSelection={(selection) =>
                    setSelectedRightStudents(selection)
                  }
                  getRowId={(row) => row.sn}
                />
              </Grid>
            </Grid>
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", marginTop: 3 }}
            >
              <Button variant="outlined" sx={{ marginRight: 2 }}>
                Cancel
              </Button>
              <Button variant="contained" color="primary">
                Save
              </Button>
            </Box>
          </Box>
        )}
      </Box>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="warning">
          You can only select 2 Teachers!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AssignHomeroom;
