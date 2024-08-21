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
} from "@mui/material";
import AppBar from "../Components/AppBar";
import Table from "../Components/Table";
import CustomButton from "../Components/Button";
import SelectButton from "../Components/SelectButton";
import SelectButtonContainer from "../Components/SelectButtonContatiner";
import {
  postCourse,
  getCourse,
  getCourses,
  deleteCourse,
} from "../Apis/Api/Course";

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
  { id: 9, name: "Hello", subject: "t12" },
  { id: 10, name: "Gcc", subject: "t122" },
  { id: 11, name: "Sun", subject: "adfs8" },
  { id: 12, name: "Su", subject: "t1" },
  { id: 13, name: "Sunny", subject: "t" },
];

const subjects = [
  "English",
  "Math",
  "Nepali",
  "Music",
  "Science",
  "History",
  "Society",
  "Sports",
];

const columns = [
  { field: "batch", headerName: "Batch", flex: 0.2 },
  { field: "grade", headerName: "Grade", flex: 0.2 },
  { field: "section", headerName: "Section", flex: 0.2 },
  { field: "teacher", headerName: "Teacher", flex: 0.2 },
  { field: "subject", headerName: "Subject", flex: 0.2 },
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
    grade: "Class 1",
    section: "A",
    teacher: "Jin",
    subject: "English",
  },
  {
    id: 2,
    batch: 2084,
    grade: "Class 1",
    section: "A",
    teacher: "Sunny",
    subject: "Math",
  },
  {
    id: 3,
    batch: 2084,
    grade: "Class 2",
    section: "A",
    teacher: "Jin",
    subject: "English",
  },
  {
    id: 4,
    batch: 2084,
    grade: "Class 2",
    section: "B",
    teacher: "Jin",
    subject: "English",
  },
  {
    id: 5,
    batch: 2084,
    grade: "Class 2",
    section: "B",
    teacher: "Sunny",
    subject: "Math",
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

function CommonCourseManagement() {
  const [selectedClass, setselectedClass] = useState(null);
  const [selectedCourse, setselectedCourse] = useState(null);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [rows, setRows] = useState(initialRows);
  const [classRows, setClassRows] = useState(initialClassRows);
  const [addMode, setAddMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [newSubject, setNewSubject] = useState("");
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

  const handleAddSubject = () => {
    if (newSubject.trim() !== "") {
      subjects.push(newSubject); // 새로운 과목을 배열에 추가
      setNewSubject(""); // 입력창 초기화
    }
  };

  return (
    <div id="page_content">
      <AppBar />
      <Box sx={{ maxWidth: "90%", margin: "0 auto" }}>
        <Typography
          variant="h3"
          sx={{ textAlign: "center", fontFamily: "Copperplate", marginTop: 2 }}
        >
          Common Course Management
        </Typography>
        {!addMode && (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: 2,
              }}
            >
              <CustomButton
                title="Common Subject Management"
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 2,
              }}
            >
              <CustomButton
                title={"Add Common Course"}
                variant="contained"
                color="primary"
                onClick={() => setAddMode(true)}
                size={"bg"}
              />
              <CustomButton title={"Delete"} variant="contained" />
            </Box>
          </>
        )}
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
              Common Subject Management
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
                  defaultValue="Common Subject"
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
              Common Subject List
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

export default CommonCourseManagement;
