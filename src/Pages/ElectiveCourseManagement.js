import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Grid,
  Divider,
  Modal,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Checkbox,
} from "@mui/material";
import AppBar from "../Components/AppBar";
import Table from "../Components/Table";
import CustomButton from "../Components/Button";
import SelectButton from "../Components/SelectButton";
import SelectButtonContainer from "../Components/SelectButtonContatiner";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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

const subjects = ["Physics I", "Chemistry I", "Biology I"];

const columns = [
  { field: "batch", headerName: "Batch", flex: 0.2 },
  { field: "grade", headerName: "Grade", flex: 0.2 },
  { field: "teacher", headerName: "Teacher", flex: 0.2 },
  { field: "subject", headerName: "Subject", flex: 0.2 },
  { field: "enrollment", headerName: "Enrollment", flex: 0.2 },
];

const classColumns = [
  { field: "batch", headerName: "Batch", flex: 0.2 },
  { field: "grade", headerName: "Grade", flex: 0.2 },
  { field: "section", headerName: "Section", flex: 0.2 },
  { field: "teacher1", headerName: "Teacher1", flex: 0.2 },
  { field: "teacher2", headerName: "Teacher2", flex: 0.2 },
];

const initialRows = [
  {
    id: 1,
    batch: 2084,
    grade: "Grade 9",
    subject: "Physics I",
    teacher: "Jin",
    enrollment: 12,
  },
  {
    id: 2,
    batch: 2084,
    grade: "Grade 9",
    subject: "Chemistry I",
    teacher: "June",
    enrollment: 18,
  },
  {
    id: 3,
    batch: 2084,
    grade: "Grade 10",
    subject: "Chemistry II",
    teacher: "Jay",
    enrollment: 10,
  },
  {
    id: 4,
    batch: 2084,
    grade: "Grade 10",
    subject: "Biology II",
    teacher: "Amy",
    enrollment: 4,
  },
];

const initialClassRows = [
  {
    id: 1,
    batch: "2084",
    grade: "PlayGroup",
    section: "A",
    teacher1: "Jimmy",
    teacher2: "Sunny",
  },
  {
    id: 2,
    batch: "2084",
    grade: "LowerKG",
    section: "A",
    teacher1: "James",
    teacher2: "Sunny",
  },
  {
    id: 3,
    batch: "2084",
    grade: "LowerKG",
    section: "B",
    teacher1: "Sunny",
    teacher2: "James",
  },
  {
    id: 4,
    batch: "2084",
    grade: "UpperKG",
    section: "A",
    teacher1: "Mozart",
    teacher2: "Sunny",
  },
  {
    id: 5,
    batch: "2084",
    grade: "UpperKG",
    section: "B",
    teacher1: "Jimmy",
    teacher2: "Sunny",
  },
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

const studentColumns = [
  { field: "sn", headerName: "SN", flex: 0.1 },
  { field: "name", headerName: "Name", flex: 0.2 },
  { field: "gender", headerName: "Gender", flex: 0.1 },
  { field: "birth", headerName: "Birth", flex: 0.2 },
  { field: "id", headerName: "ID", flex: 0.2 },
  { field: "grade", headerName: "Grade", flex: 0.2 },
];

function ElectiveCourseManagement() {
  const [selectedClass, setselectedClass] = useState([]);
  const [selectedCourse, setselectedCourse] = useState([]);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [rows, setRows] = useState(initialRows);
  const [classRows, setClassRows] = useState(initialClassRows);
  const [addMode, setAddMode] = useState(false);
  const [assignMode, setAssignMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [newSubject, setNewSubject] = useState("");

  const [leftStudents, setLeftStudents] = useState(students);
  const [rightStudents, setRightStudents] = useState([]);
  const [selectedLeftStudents, setSelectedLeftStudents] = useState([]);
  const [selectedRightStudents, setSelectedRightStudents] = useState([]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleTeacherClick = (teacher) => {
    setSelectedTeachers([teacher]);
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubjects([subject]);
  };

  const handleAddCourse = () => {
    // 코스 추가 로직
  };

  const handleRowSelection = (id) => {
    setselectedCourse(id);
  };

  const handleClassRowSelection = (id) => {
    setselectedClass(id);
  };

  const handleAddSubject = () => {
    if (newSubject.trim() !== "") {
      subjects.push(newSubject); // 새로운 과목을 배열에 추가
      setNewSubject(""); // 입력창 초기화
    }
  };

  const updatedClassColumns = [
    {
      field: "select",
      headerName: "",
      flex: 0.1,
      renderCell: (params) => (
        <Radio
          checked={selectedClass === params.row.id}
          onChange={() => handleClassRowSelection(params.row.id)}
        />
      ),
    },
    ...classColumns,
  ];

  const handleDeleteSubjects = () => {
    // Handle the deletion of selected subjects
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

  return (
    <div id="page_content">
      <AppBar />
      <Box sx={{ maxWidth: "90%", margin: "0 auto" }}>
        <Typography
          variant="h3"
          sx={{ textAlign: "center", fontFamily: "Copperplate", marginTop: 2 }}
        >
          Elective Course Management
        </Typography>
        {!addMode && !assignMode && (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: 2,
              }}
            >
              <CustomButton
                title="Elective Subject Management"
                variant="contained"
                color="primary"
                size="bg"
                onClick={handleOpenModal}
              />
            </Box>
            <Table
              columns={columns}
              rows={rows}
              getRowId={(row) => row.id}
              onRowSelection={handleRowSelection}
              id={"table_body"}
            />
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid
                item
                xs={6}
                sx={{ display: "flex", justifyContent: "flex-start" }}
              >
                <CustomButton
                  title={"Add Elective Course"}
                  variant="contained"
                  color="primary"
                  onClick={() => setAddMode(true)}
                  size={"bg"}
                />
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <CustomButton
                  title={"Assign Students"}
                  variant="contained"
                  color="primary"
                  onClick={() => setAssignMode(true)}
                  size={"bg"}
                  disabled={selectedCourse.length !== 1}
                />
                <Box sx={{ marginRight: 3 }} />
                <CustomButton title={"Delete"} variant="contained" />
              </Grid>
            </Grid>
          </>
        )}

        {/* Assign Student 모드 */}
        {assignMode && (
          <>
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
              <CustomButton
                title={"Cancel"}
                variant="outlined"
                onClick={() => {
                  setAssignMode(false);
                  setselectedCourse([]);
                }}
                sx={{ marginRight: 2 }}
              />
              <Box marginRight={2}></Box>
              <CustomButton
                title={"Save"}
                variant="contained"
                color="primary"
                onClick={() => {
                  handleAddCourse();
                  setAssignMode(false);
                  setselectedCourse([]);
                }}
              />
            </Box>
          </>
        )}

        {/* Add Course 모드 */}
        {addMode && (
          <>
            <Typography
              variant="h4"
              sx={{ fontFamily: "Copperplate", marginTop: 3, marginBottom: 3 }}
            >
              Select Class
            </Typography>
            <Table
              columns={updatedClassColumns}
              rows={classRows}
              getRowId={(row) => row.id}
              onRowSelection={handleClassRowSelection}
              isRadioButton={true}
              id={"table_body"}
            />

            <Typography
              variant="h4"
              sx={{ fontFamily: "Copperplate", marginTop: 3, marginBottom: 3 }}
            >
              Select Teacher
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

            <Typography
              variant="h4"
              sx={{ fontFamily: "Copperplate", marginTop: 10, marginBottom: 3 }}
            >
              Select Elective Subject
            </Typography>
            <SelectButtonContainer>
              {subjects.map((subject) => (
                <Grid item xs={2} key={subject}>
                  <SelectButton
                    selected={selectedSubjects.includes(subject)}
                    onClick={() => handleSubjectClick(subject)}
                  >
                    {subject}
                  </SelectButton>
                </Grid>
              ))}
            </SelectButtonContainer>

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
              <CustomButton
                title={"Cancel"}
                variant="outlined"
                onClick={() => setAddMode(false)}
                sx={{ marginRight: 2 }}
              />
              <Box marginRight={2}></Box>
              <CustomButton
                title={"Save"}
                variant="contained"
                color="primary"
                onClick={() => {
                  handleAddCourse();
                  setAddMode(false);
                }}
              />
            </Box>
          </>
        )}

        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h2"
              sx={{
                textAlign: "center",
                marginBottom: 2,
                fontFamily: "Copperplate",
              }}
            >
              Elective Subject Management
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{
                textAlign: "left",
                marginBottom: 2,
                fontFamily: "Copperplate",
              }}
            >
              Create Subject
            </Typography>
            <Grid container spacing={3} sx={{ maxWidth: 600 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Type"
                  defaultValue="Elective Subject"
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Box
              sx={{ marginTop: 3, display: "flex", justifyContent: "flex-end" }}
            >
              <CustomButton
                title={"Add"}
                variant="contained"
                onClick={handleAddSubject}
                sx={{ marginTop: 20 }}
              />
            </Box>
            <Divider sx={{ marginY: 2 }} />
            <Typography
              variant="h6"
              sx={{ marginBottom: 1, fontFamily: "Copperplate" }}
            >
              Elective Subject List
            </Typography>{" "}
            <List sx={{ maxHeight: 150, overflowY: "auto" }}>
              {subjects.map((subject) => (
                <ListItem
                  key={subject}
                  disablePadding
                  sx={{
                    borderTop: "1px solid #ccc",
                    "&:last-child": {
                      borderBottom: "1px solid #ccc",
                    },
                  }}
                  onClick={() => handleSubjectClick(subject)}
                >
                  <ListItemButton
                    selected={selectedSubjects.includes(subject)}
                    sx={{
                      "&.Mui-selected": {
                        backgroundColor: "#D8EDFF",
                        color: "#1B8EF2",
                      },
                    }}
                  >
                    <ListItemText primary={subject} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
            >
              <CustomButton
                title={"Delete"}
                variant="contained"
                color="secondary"
                onClick={handleDeleteSubjects}
                disabled={selectedSubjects.length === 0}
              />
            </Box>
            <Divider sx={{ marginTop: 2 }} />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <CustomButton
                title={"Back"}
                variant="outlined"
                onClick={handleCloseModal}
              />

              <CustomButton
                title={"Save"}
                variant="contained"
                color="primary"
                onClick={handleCloseModal}
              />
            </Box>
          </Box>
        </Modal>
      </Box>
      <Box sx={{ marginBottom: 5 }} />
    </div>
  );
}

export default ElectiveCourseManagement;
