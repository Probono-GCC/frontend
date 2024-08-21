import React, { useState, useEffect } from "react";
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
import { getTeacher, getTeachers, putTeacher } from "../Apis/Api/User";
import {
  postCourse,
  getCourse,
  getCourses,
  deleteCourse,
} from "../Apis/Api/Course";
import { putClass, postClass, getClasses } from "../Apis/Api/Class";
import {
  postSubject,
  getSubject,
  getSubjects,
  deleteSubject,
} from "../Apis/Api/Subject";

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

function createTeacherData(name, username, id) {
  return { name, username, id };
}

function createSubjectData(subjectId, name, id) {
  return { subjectId, name, id };
}

function createClassData(year, grade, section, classId, id) {
  return { year, grade, section, classId, id };
}

const columns = [
  { field: "batch", headerName: "Batch", flex: 0.2 },
  { field: "grade", headerName: "Grade", flex: 0.2 },
  { field: "section", headerName: "Section", flex: 0.2 },
  { field: "teacher", headerName: "Teacher", flex: 0.2 },
  { field: "subject", headerName: "Subject", flex: 0.2 },
];

const classColumns = [
  { field: "year", headerName: "Batch", flex: 0.2 },
  { field: "grade", headerName: "Grade", flex: 0.2 },
  { field: "section", headerName: "Section", flex: 0.2 },
  { field: "teacher1", headerName: "Teacher1", flex: 0.2 },
  { field: "teacher2", headerName: "Teacher2", flex: 0.2 },
];

function CommonCourseManagement() {
  const [selectedClass, setselectedClass] = useState(null);
  const [selectedCourse, setselectedCourse] = useState(null);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [rows, setRows] = useState([]);
  const [classRows, setClassRows] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [newSubject, setNewSubject] = useState("");

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const NepaliDate = require("nepali-date");
  const todayNepaliDate = new NepaliDate();
  const currentYear = todayNepaliDate.getYear();

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
    if (selectedSubjects.length === 1) {
      const selectedSubjectName = selectedSubjects[0];
      const subjectToDelete = subjects.find(
        (subject) => subject.name === selectedSubjectName
      );

      if (subjectToDelete) {
        const subjectId = subjectToDelete.subjectId;
        deleteSubject(subjectId).then(() => {
          getSubjects(0, 10).then((result) => {
            const tempSubject = result.content || [];
            setSubjects(
              tempSubject.map((item, index) =>
                createSubjectData(item.subjectId, item.name, index + 1)
              )
            );
            setSelectedSubjects([]);
          });
        });
      }
    } else {
      console.log("과목을 하나만 선택해주세요.");
    }
  };

  const handleAddSubject = () => {
    if (newSubject.trim() !== "") {
      const newSubjectData = {
        name: newSubject,
        elective: false,
      };

      postSubject(newSubjectData)
        .then(() => {
          setNewSubject("");
          return getSubjects(0, 10);
        })
        .then((result) => {
          const tempSubject = result.content || [];
          setSubjects(
            tempSubject.map((item, index) =>
              createSubjectData(item.subjectId, item.name, index + 1)
            )
          );
        })
        .catch((error) => {
          console.error("Failed to add subject:", error);
        });
    }
  };

  const fetchTeacher = () => {
    getTeachers().then((result) => {
      const teacherMap = result.content || [];
      if (teacherMap.length > 0) {
        const tempRow = teacherMap.map((item, index) =>
          createTeacherData(item.name, item.username, index + 1)
        );
        setTeachers(tempRow);
      } else {
        setTeachers([]);
      }
    });
  };

  const fetchSubject = () => {
    getSubjects(0, 50).then((result) => {
      const subjectMap = result.content || [];
      if (subjectMap.length > 0) {
        const tempRow = subjectMap.map((item, index) =>
          createSubjectData(item.subjectId, item.name, index + 1)
        );
        setSubjects(tempRow);
      } else {
        setTeachers([]);
      }
    });
  };

  const fetchClass = () => {
    getClasses(currentYear).then((result) => {
      const classMap = result.content || [];
      if (classMap.length > 0) {
        const tempRow = classMap.map((item, index) =>
          createClassData(
            item.year,
            item.grade,
            item.section,
            item.classId,
            index + 1
          )
        );
        setClassRows(tempRow);
      } else {
        setClassRows([]);
      }
    });
  };

  useEffect(() => {
    fetchClass();
    fetchTeacher();
    fetchSubject();
  }, []);

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
                    {teacher.name} <br /> ({teacher.username})
                  </SelectButton>
                </Grid>
              ))}
            </SelectButtonContainer>

            <Typography
              variant="h4"
              sx={{ fontFamily: "Copperplate", marginTop: 10, marginBottom: 3 }}
            >
              Select Common Subject
            </Typography>
            <SelectButtonContainer>
              {subjects.map((subject) => (
                <Grid item xs={2} key={subject.subjectId}>
                  <SelectButton
                    selected={selectedSubjects.includes(subject.name)}
                    onClick={() => handleSubjectClick(subject.name)}
                  >
                    {subject.name} {/* subject.name을 직접 렌더링 */}
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
            </Typography>
            <List sx={{ maxHeight: 150, overflowY: "auto" }}>
              {subjects.map((subject) => (
                <ListItem
                  key={subject.subjectId} // 각 객체의 고유한 key로 subjectId 사용
                  disablePadding
                  sx={{
                    borderTop: "1px solid #ccc",
                    "&:last-child": {
                      borderBottom: "1px solid #ccc",
                    },
                  }}
                  onClick={() => handleSubjectClick(subject.name)}
                >
                  <ListItemButton
                    selected={selectedSubjects.includes(subject.name)}
                    sx={{
                      "&.Mui-selected": {
                        backgroundColor: "#D8EDFF",
                        color: "#1B8EF2",
                      },
                    }}
                  >
                    <ListItemText primary={subject.name} />{" "}
                    {/* 객체의 name 속성을 사용 */}
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
