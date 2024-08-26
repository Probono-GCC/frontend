import React, { useState, useEffect } from "react";
import {
  Alert,
  Stack,
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
  postCourseUser,
  getCourse,
  getCourses,
  deleteCourse,
  getCourseTeachers,
} from "../Apis/Api/Course";
import {
  putClass,
  postClass,
  getClasses,
  getClassStudent,
  getClassTeacher,
} from "../Apis/Api/Class";
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

function createClassData(
  year,
  grade,
  section,
  classId,
  teacher1,
  teacher2,
  id
) {
  return { year, grade, section, classId, teacher1, teacher2, id };
}
//id: courseId임
function createCourseData(year, grade, section, subject, teacher, id) {
  return { year, grade, section, subject, teacher, id };
}
const columns = [
  { field: "year", headerName: "Batch", flex: 0.2 },
  { field: "grade", headerName: "Grade", flex: 0.2 },
  { field: "section", headerName: "Section", flex: 0.2 },
  { field: "teacher", headerName: "Teacher", flex: 0.2 },
  { field: "subject", headerName: "Subject", flex: 0.2 },
];

const classColumns = [
  { field: "year", headerName: "Batch", flex: 0.2 },
  { field: "grade", headerName: "Grade", flex: 0.2 },
  { field: "section", headerName: "Section", flex: 0.2 },
  { field: "teacher1", headerName: "Home Teacher1", flex: 0.2 },
  { field: "teacher2", headerName: "Home Teacher2", flex: 0.2 },
];

function CommonCourseManagement() {
  const [selectedClass, setselectedClass] = useState(null);
  const [selectedCourse, setselectedCourse] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [selectedTeachers, setSelectedTeachers] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState(0);
  const [initalSelectedTeacher, setInitalSelectedTeacher] = useState([]); //기존 할당되어있던 교사
  const [initalSelectedSubject, setInitalSelectedSubject] = useState([]); //기존 할당되어있던 교사
  const [courseRows, setCourseRows] = useState([]);
  const [classRows, setClassRows] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [selectedCourseRowId, setSelectedCourseRowId] = useState(null);
  const [courseTeachers, setCourseTeachers] = useState([]);
  const [selectedClassRowId, setSelectedClassRowId] = useState(null); //class table에서 선택된 row id
  const [selectedClassRowData, setSelectedClassRowData] = useState(null); //class table에서 선택된 row data 전체 정보
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  //pagination for table
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const [totalRowCount, setTotalRowCount] = useState(0); //서버에서 총 학생수 받아와서 설정

  const NepaliDate = require("nepali-date");
  const todayNepaliDate = new NepaliDate();
  const currentYear = todayNepaliDate.getYear();

  const handleTeacherClick = (teacher) => {
    console.log(teacher, "click한 티펴?");
    setSelectedTeachers(teacher);
  };

  const handleSubjectClick = (subject) => {
    console.log(subject, "선택한 subject");
    setSelectedSubjects([subject]);
  };
  const handleSubjectIdClick = (id) => {
    setSelectedSubjectId(id);
  };
  const handleAddCourse = () => {
    const courseData = {
      subjectId: selectedSubjectId,
      classId: selectedClassRowId,
    };
    postCourse(courseData).then((result) => {
      if (result && result.courseId) {
        const courseUser = {
          courseId: result.courseId,
          username: selectedTeachers,
        };
        postCourseUser(courseUser).then((result) => {
          if (result && result.courseUserId) {
            alert("Course successfully created!");
            setselectedClass(null);
            setselectedCourse(null);
            setSelectedClassRowData(null);
            setSelectedClassRowId(null);
            setSelectedSubjects([]);
            setSelectedSubjectId(0);
            setSelectedTeachers([]);
            fetchCourse();
          } else {
            alert("Create course failed");
          }
        });
      } else {
        alert("Create course failed");
      }
    });
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
          checked={selectedClassRowId === params.row.classId}
          onChange={() => handleClassRowIdSelection(params.row.classId)}
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

  const handleClassRowIdSelection = (id) => {
    console.log("rowid???", id);
    setSelectedClassRowId(id);
  };
  //선택된 course id 배열 받기
  const handleCourseRowIdSelection = (id) => {
    setSelectedCourseRowId(id);
  };

  const handleSelectedClassRowData = (row) => {
    console.log("rowid???", row);
    setSelectedClassRowId(row.classId);
  };
  //선택된 course Row
  const handleSelectedCourseRowData = (row) => {
    // if (row) {
    //   setSelectedCourseRowData(row);
    //   setSelectedCourseRowId(row.courseId);
    // }
  };
  const handleDeleteCourse = () => {
    console.log("selectdcourse", selectedCourseRowId);
    if (selectedCourseRowId) {
      selectedCourseRowId.map((item) => {
        deleteCourse(item).then((result) => {
          console.log(result);
          if (result.status == 204) {
            fetchCourse();
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2000); // 2초 후 알림 숨김
          } else {
            setShowErrorAlert(true);
            setTimeout(() => setShowErrorAlert(false), 2000); // 2초 후 알림 숨김
          } //timeout 처리
        });
      });
    }
  };
  const fetchClass = () => {
    getClasses(page, pageSize, currentYear).then(async (result) => {
      const classMap = result.content || [];
      console.log("fetchclass", result.content);
      if (classMap.length > 0) {
        const classPromise = classMap.map(async (classItem, index) => {
          console.log("??", index, "\n", classItem);
          const teachers = await fetchClassTeacher(classItem.classId);
          if (teachers && teachers.length > 0) {
            // teacher 배열이 비어있지 않을 때만 실행
            // const teacherName =
            //   teachers.length > 1
            //     ? `${teachers[0]?.username || ""} & ${
            //         teachers[1]?.username || ""
            //       }`
            //     : teachers[0]?.username || ""; // 안전하게 접근

            // console.log("teachernmmmm", teacherName);
            return createClassData(
              classItem.year,
              classItem.grade,
              classItem.section,
              classItem.classId,
              teachers[0]?.username || "",
              teachers[1]?.username || "",
              classItem.classId
            );
          } else {
            return createClassData(
              classItem.year,
              classItem.grade,
              classItem.section,
              classItem.classId,
              "",
              "",
              classItem.classId
            );
          }
        });
        console.log("classPromise", classPromise);
        const NewClasses = await Promise.all(classPromise);
        setClassRows(NewClasses);
      } else {
        setClassRows([]);
      }
    });
  };
  const fetchCourse = () => {
    getCourses(page, pageSize).then(async (result) => {
      if (result && result.content) {
        const coursePromises = result.content.map(async (courseItem) => {
          const teachers = await fetchCourseTeachers(courseItem.courseId);
          console.log("tea", teachers);
          if (teachers) {
            const teacherNames =
              teachers && teachers.length > 1
                ? `${teachers[0].username} & ${teachers[1].username}`
                : teachers[0].username;

            return createCourseData(
              courseItem.classResponse.year,
              courseItem.classResponse.grade,
              courseItem.classResponse.section,
              courseItem.subjectResponseDTO.name,
              teacherNames,
              courseItem.courseId
            );
          } else {
            return createCourseData(
              courseItem.classResponse.year,
              courseItem.classResponse.grade,
              courseItem.classResponse.section,
              courseItem.subjectResponseDTO.name,
              "",
              courseItem.courseId
            );
          }
        });

        // 모든 courseItem의 정보를 Promise.all로 처리
        const NewCourses = await Promise.all(coursePromises);

        setCourseRows(NewCourses);
      } else {
        console.log("course fetch failed");
      }
    });
  };

  const fetchTeacher = () => {
    getTeachers(0, 100).then((result) => {
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
  const fetchCourseTeachers = (courseId) => {
    return getCourseTeachers(courseId).then((result) => {
      console.log("item", result);
      if (result && result.data.userResponse) {
        console.log("item", result.data.userResponse);
        const userResponses = Array.isArray(result.data.userResponse)
          ? result.data.userResponse
          : [result.data.userResponse];

        const teachers = userResponses
          .filter((item) => item.role === "ROLE_TEACHER")
          .map((item) => ({
            username: item.username,
            name: item.name,
          }));

        return teachers; // 여기서 teachers 배열을 반환
      } else {
        return []; // 교사가 없을 경우 빈 배열 반환
      }
    });
  };
  const fetchClassTeacher = (classId) => {
    return getClassTeacher(classId).then((result) => {
      console.log("clasteacher", result);
      if (result) {
        console.log("item", result);
        const userResponses = Array.isArray(result) ? result : [result];

        const teachers = userResponses
          .filter((item) => item.role === "ROLE_TEACHER")
          .map((item) => ({
            username: item.username,
            name: item.name,
          }));

        return teachers; // 여기서 teachers 배열을 반환
      } else {
        return []; // 교사가 없을 경우 빈 배열 반환
      }
    });
  };
  useEffect(() => {
    fetchTeacher();
    fetchSubject();
    fetchCourse();
  }, []);

  return (
    <div id="page_content">
      <AppBar />
      {showAlert && (
        <Stack
          sx={{ width: "100%", position: "fixed", top: "65px", zIndex: 10 }}
          spacing={2}
        >
          <Alert severity="success">Delete successful!</Alert>
        </Stack>
      )}
      {showErrorAlert && (
        <Stack
          sx={{ width: "100%", position: "fixed", top: "65px", zIndex: 10 }}
          spacing={2}
        >
          <Alert severity="error">Delete failed!</Alert>
        </Stack>
      )}
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
              rows={courseRows}
              totalRowCount={totalRowCount}
              onRowSelection={() => {}}
              onRowSelectedId={handleCourseRowIdSelection}
              isRadioButton={false}
              id={"student_select_body"}
              getRowId={(row) => row.id}
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
                onClick={() => {
                  fetchClass();
                  setAddMode(true);
                }}
                size={"bg"}
              />
              <CustomButton
                title={"Delete"}
                variant="contained"
                onClick={handleDeleteCourse}
              />
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
              onRowSelection={handleSelectedClassRowData}
              onRowSelectedId={() => {}}
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
                    selected={selectedTeachers.includes(teacher.username)}
                    onClick={() => handleTeacherClick(teacher.username)}
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
                    selected={selectedSubjectId == subject.subjectId}
                    onClick={() => handleSubjectIdClick(subject.subjectId)}
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
