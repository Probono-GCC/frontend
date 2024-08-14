import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Grid,
  Snackbar,
  Alert,
  Button,
  Checkbox,
} from "@mui/material";
import AppBar from "../Components/AppBar";
import Table from "../Components/Table";
import Radio from "@mui/material/Radio";
import CustomButton from "../Components/Button";
import SelectButton from "../Components/SelectButton";
import SelectButtonContainer from "../Components/SelectButtonContatiner";

const label = { inputProps: { "aria-label": "Radio button demo" } };
const checkLabel = { inputProps: { "aria-label": "Checkbox demo" } };

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
function createData(sn, gender, name, birth, id, grade) {
  return { sn, gender, name, birth, id, grade };
}

const students = [
  createData(1, "Male", "Jon", "20.02.24", "a0000", "PlayGroup"),
  createData(2, "Female", "Cersei", "20.01.04", "a0001", "PlayGroup"),
  createData(3, "Male", "Jaime", "20.12.24", "a0002", "PlayGroup"),
  createData(4, "Male", "Arya", "20.05.27", "a0003", "PlayGroup"),
  createData(5, "Male", "Daenerys", "20.08.14", "a0004", "PlayGroup"),
  createData(6, "Male", "nell", "20.12.24", "a0005", "PlayGroup"),
  createData(7, "Female", "Ferrara", "19.07.05", "b0006", "UnderKG"),
  createData(8, "Female", "Rossini", "19.07.25", "b0007", "UnderKG"),
  createData(9, "Female", "Harvey", "19.07.04", "b0008", "UnderKG"),
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
  const [checkedRows, setCheckedRows] = useState([]);
  const handleRowSelection = (id) => {
    setCheckedRows((prevCheckedRows) =>
      prevCheckedRows.includes(id)
        ? prevCheckedRows.filter((rowId) => rowId !== id)
        : [...prevCheckedRows, id]
    );
  };
  const handleClassRowSelection = (id) => {
    setSelectedClass(id);
  };

  const updatedClassColumns = [
    {
      field: "radio",
      headerName: "",
      flex: 0.05,
      renderCell: (params) => (
        <Radio
          {...label}
          checked={selectedClass === params.row.id}
          onChange={() => handleClassRowSelection(params.row.id)}
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
    //     const newFrom = from.filter((student) => !selected.includes(student));
    //     const newTo = [...to, ...selected];
    //     setFrom(newFrom);
    //     setTo(newTo);
    //setSelected([]);
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
          columns={updatedClassColumns}
          rows={classes}
          onRowSelection={(selection) => handleRowSelection(selection[0])}
          getRowId={(row) => row.id}
          isRadioButton={true}
          id={"table_body"}
        />
        {selectedClass && (
          <Box sx={{ maxWidth: "90%", margin: "0 auto" }}>
            <Typography
              variant="h4"
              sx={{ fontFamily: "Copperplate", marginTop: 10, marginBottom: 3 }}
            >
              Assign Teacher
            </Typography>
            <SelectButtonContainer>
              {teachers.map((teacher) => (
                <Grid item xs={2} key={teacher.id}>
                  <SelectButton
                    selected={selectedTeachers.includes(teacher.id)}
                    onClick={() => handleTeacherClick(teacher.id)}
                  >
                    {teacher.name} <br /> ({teacher.subject})
                  </SelectButton>
                </Grid>
              ))}
            </SelectButtonContainer>
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
                  sx={{ width: "100%" }} // 왼쪽 테이블의 너비 설정
                  columns={studentColumns}
                  rows={leftStudents}
                  onRowSelection={(selection) =>
                    setSelectedLeftStudents(selection)
                  }
                  getRowId={(row) => row.sn}
                  id={"student_select_body"}
                />
              </Grid>
              <Grid
                item
                xs={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CustomButton
                  title={">"}
                  variant="contained"
                  onClick={() => handleStudentTransfer()}
                  disabled={selectedLeftStudents.length === 0 ? true : false}
                />
                <Box sx={{ marginTop: 2, marginBottom: 2 }} />
                <CustomButton
                  title={"<"}
                  variant="contained"
                  onClick={() => handleStudentTransfer()}
                  disabled={selectedRightStudents.length === 0 ? true : false}
                />
              </Grid>
              <Grid item xs={5}>
                <Table
                  sx={{ width: "100%" }} // 오른쪽 테이블의 너비 설정
                  columns={studentColumns}
                  rows={rightStudents}
                  onRowSelection={(selection) =>
                    setSelectedRightStudents(selection)
                  }
                  getRowId={(row) => row.sn}
                  id={"student_select_body"}
                />
              </Grid>
            </Grid>
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", marginTop: 3 }}
            >
              <Box sx={{ marginRight: 2 }}>
                <CustomButton title="Cancel" />{" "}
              </Box>
              <CustomButton title="Save" />
            </Box>
          </Box>
        )}
      </Box>
      <Snackbar
        open={alertOpen}
        autoHideDuration={1000}
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
