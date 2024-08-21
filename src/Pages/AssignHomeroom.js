import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  Grid,
  Snackbar,
  Alert,
  Button,
  Checkbox,
  Stack,
} from "@mui/material";
import AppBar from "../Components/AppBar";
import Table from "../Components/Table";
import Radio from "@mui/material/Radio";
import CustomButton from "../Components/Button";
import SelectButton from "../Components/SelectButton";
import SelectButtonContainer from "../Components/SelectButtonContatiner";
import { getTeachers, getStudents } from "../Apis/Api/User";
import {
  getClasses,
  assignClassMember,
  getClassStudent,
  deleteClassMember,
  getClassTeacher,
} from "../Apis/Api/Class";

const label = { inputProps: { "aria-label": "Radio button demo" } };
const checkLabel = { inputProps: { "aria-label": "Checkbox demo" } };

function createData(serialNumber, sex, name, birth, username, grade) {
  return { id: serialNumber, serialNumber, sex, name, birth, username, grade };
}

const studentColumns = [
  { field: "serialNumber", headerName: "SN", flex: 0.1 },
  { field: "name", headerName: "Name", flex: 0.2 },
  { field: "sex", headerName: "Gender", flex: 0.1 },
  { field: "birth", headerName: "Birth", flex: 0.2 },
  { field: "username", headerName: "ID", flex: 0.2 },
  { field: "grade", headerName: "Grade", flex: 0.2 },
];

function AssignHomeroom() {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedClassRowId, setSelectedClassRowId] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [initalSelectedTeacher, setInitalSelectedTeacher] = useState([]);
  const [leftStudents, setLeftStudents] = useState([]);
  const [rightStudents, setRightStudents] = useState([]);
  const [selectedLeftStudents, setSelectedLeftStudents] = useState([]);
  const [selectedRightStudents, setSelectedRightStudents] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [allStudentData, setAllStudentDatas] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [checkedRows, setCheckedRows] = useState([]);
  const [newSelctedLeftStudent, setNewSelectedLeftStudent] = useState([]);

  const [newSelctedRightStudent, setNewSelectedRightStudent] = useState([]);
  useEffect(() => {
    console.log("selecte left sutdnet 1", selectedLeftStudents);
    // Fetch classes and teachers data on component mount
    // Fetching class data when the component mounts
    getClasses().then((result) => {
      console.log(result);
      if (result && result.content) {
        const tempRow = result.content.map((item, index) => ({
          id: index + 1, // Assuming an index for table rows
          year: item.year,
          grade: item.grade,
          section: item.section,
          classId: item.classId, // classId를 가져와서 삭제에 활용
        }));
        setClasses(tempRow);
      }
    });

    getTeachers().then((result) => {
      if (result && result.content) {
        const tempRow = result.content.map((item, index) => ({
          id: index + 1, // Assuming an index for table rows
          gender: item.sex,
          username: item.username,
          name: item.name,
        }));
        setTeachers(tempRow); // Fetch teachers from API
      }
    });
  }, []);

  useEffect(() => {
    console.log("selecte left sutdnet 2", selectedLeftStudents);
    getStudents().then((result) => {
      console.log(result);
      if (result && result.content) {
        const students = result.content || []; // content 배열 가져오기
        console.log("students map", students);
        setAllStudentDatas(students);
      }
    });
    console.log("selcted3", selectedLeftStudents);
  }, []);
  // useEffect(() => {}, [selectedLeftStudents, selectedRightStudents]);

  const handleRowSelection = (id) => {
    setCheckedRows((prevCheckedRows) =>
      prevCheckedRows.includes(id)
        ? prevCheckedRows.filter((rowId) => rowId !== id)
        : [...prevCheckedRows, id]
    );
  };
  const handleLeftStudentRowSelectionId = (selectedIdArr) => {
    if (!leftStudents || !Array.isArray(leftStudents)) {
      console.error("leftStudents is not defined or is not an array");
      return;
    }
    const selectedStudents = leftStudents.filter((student) => {
      if (!student || typeof student.id === "undefined") {
        console.error("Student or student.id is undefined", student);
        return false;
      }
      return selectedIdArr.includes(student.id);
    });
    setSelectedLeftStudents(selectedStudents);
  };
  const handleRightStudentRowSelectionId = (selectedIdArr) => {
    if (!rightStudents || !Array.isArray(rightStudents)) {
      console.error("rightStudents is not defined or is not an array");
      return;
    }
    const selectedStudents = rightStudents.filter((student) => {
      if (!student || typeof student.id === "undefined") {
        console.error("Student or student.id is undefined", student);
        return false;
      }
      return selectedIdArr.includes(student.id);
    });
    setSelectedRightStudents(selectedStudents);
  };

  const handleClassRowIdSelection = (id) => {
    console.log(id, "rowid???", id[0]);
    setSelectedClassRowId(id[0]);

    // 선택된 클래스의 GRADE 정보 가져오기
    const selectedClassData = classes.find((cls) => cls.id === id[0]);
    setSelectedClass(selectedClassData);
    // console.log("selectedClassData", selectedClassData);
    console.log(selectedClassData);
    if (selectedClassData) {
      const selectedGrade = selectedClassData.grade;

      //GRADE와 일치하는 학생들 필터링
      const filteredGradeStudents = allStudentData
        .filter((student) => student.grade === selectedGrade)
        .map((student, idx) => ({
          ...student,
          id: student.serialNumber, //table get row id를 위해..
        }));
      //해당 클래스에 할당 된 학생 불러오기
      getClassStudent(selectedClassData.classId).then((result) => {
        console.log(
          "classId",
          selectedClassData.classId,
          "class9 right student?:",
          result
        );
        if (!result.content) {
          const filteredRightStudents = result;
          const updatedRightStudents = filteredRightStudents.map((student) => ({
            ...student,
            id: student.serialNumber, // table get row id를 위해 추가
          }));

          // console.log("class9 studnet?:", filteredGradeStudents);
          setRightStudents(updatedRightStudents);
          //Grade 학생중에 해당 학급 할당 안된 학생들 불러오기
          const filteredLeftStudents = filteredGradeStudents.filter(
            (student) =>
              !filteredRightStudents.some(
                (rightStudent) =>
                  rightStudent.serialNumber === student.serialNumber
              )
          );
          const updatedLeftStudents = filteredLeftStudents.map((student) => ({
            ...student,
            id: student.serialNumber, // table get row id를 위해 추가
          }));
          // console.log("class9 left studnet?:", filteredLeftStudents);
          setLeftStudents(updatedLeftStudents);
        }
      });
      //class 선생님 불러오기
      getClassTeacher(selectedClassData.classId).then((result) => {
        console.log("class에 할당된 teacher get result ", result);

        setInitalSelectedTeacher(result);
        setSelectedTeachers(result.map((teacher) => teacher.username));
      });
    }
  };

  const handleLeftStudentRowSelection = (_id) => {
    console.log("체크: ", _id);
    // setLeftStudents(_id);
    setSelectedLeftStudents(_id);
  };
  const handleRightStudentRowSelection = (_id) => {
    console.log("체크: ", _id);
    // setLeftStudents(_id);
    setSelectedRightStudents(_id);
  };

  const updatedClassColumns = [
    {
      field: "radio",
      headerName: "",
      flex: 0.05,
      renderCell: (params) => (
        <Radio
          {...label}
          checked={selectedClassRowId === params.row.id}
          // onChange={() => handleClassRowIdSelection(params)}
        />
      ),
    },
    { field: "year", headerName: "Batch", flex: 0.2 },
    { field: "grade", headerName: "Grade", flex: 0.2 },
    { field: "section", headerName: "Section", flex: 0.2 },
    { field: "teacher1", headerName: "Teacher1", flex: 0.2 },
    { field: "teacher2", headerName: "Teacher2", flex: 0.2 },
  ];

  const handleTeacherClick = (teacherId) => {
    setSelectedTeachers((prev) => {
      if (prev.includes(teacherId)) {
        return prev.filter((id) => id !== teacherId);
      } else if (prev.length < 2) {
        return [...prev, teacherId];
      } else {
        setAlertOpen(true);
        return prev;
      }
    });
  };

  //  params: leftStudents, rightStudents, selectedLeftStudents
  const handleStudentTransferToRight = (from, to, setFrom) => {
    console.log("setfrom value?", setFrom);
    // from 배열에서 setFrom에 포함된 ID를 가진 학생 객체 제거
    // const newFrom = from.filter((student) => !setFrom.includes(student.id));

    const newFrom = from.filter(
      (student) => !setFrom.some((selected) => selected.id === student.id)
    );
    // setFrom에 포함된 ID를 가진 학생 객체를 from에서 찾고, to 배열에 추가
    const newTo = [
      ...to,
      ...setFrom.map((studentItem) =>
        from.find((student) => student.id === studentItem.id)
      ),
    ];

    //from 배열과 to 배열의 상태를 업데이트
    setLeftStudents(newFrom);
    setRightStudents(newTo);
    console.log("selectedLeftStudentss ", selectedLeftStudents);
    setNewSelectedLeftStudent(selectedLeftStudents);
    console.log("newForm", newFrom);
    console.log("newto", newTo);
  };

  //  params: rightStudents, leftStudents, selectedRightStudents
  const handleStudentTransferToLeft = (from, to, setFrom) => {
    // from 배열에서 setFrom에 포함된 ID를 가진 학생 객체 제거

    const newFrom = from.filter(
      (student) => !setFrom.some((selected) => selected.id === student.id)
    );

    setNewSelectedRightStudent(selectedRightStudents);
    // setFrom에 포함된 ID를 가진 학생 객체를 `from`에서 찾고, `to` 배열에 추가
    const newTo = [
      ...to,
      ...setFrom.map((studentItem) =>
        from.find((student) => student.id === studentItem.id)
      ),
    ];

    //from 배열과 to 배열의 상태를 업데이트
    setRightStudents(newFrom);
    setLeftStudents(newTo);
    // setSelectedRightStudents(newFrom);
    console.log("newForm", newFrom, setFrom);
    console.log("newto", newTo);
    //asign API

    //선택된 학생 ID를 초기화
    // setSelectedRightStudents([]);
  };

  const handleSave = async () => {
    // console.log("selected teacher?", selectedTeachers);
    // console.log("selected left student", newSelctedLeftStudent);

    try {
      // console.log("selectedLeftStudents", selectedLeftStudents);
      newSelctedLeftStudent.map((item) => {
        assignClassMember(selectedClass, item.username)
          .then(() => {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2000); // 2초 후 알림 숨김
          })
          .catch((err) => {
            alert(item.name, " student assigned failed.");
          });
      });
      // console.log("selectedRightStudents", newSelctedRightStudent);
      newSelctedRightStudent.map((item) => {
        deleteClassMember(selectedClass, item.username)
          .then((result) => {
            console.log("delete ruelst", result);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2000); // 2초 후 알림 숨김
          })
          .catch((err) => {
            alert(item.name, " student deallocated failed.");
          });
      });
      // 이니셜에 있었는데 현재 선택된 리스트에 없는 경우 - 티쳐 삭제
      initalSelectedTeacher.forEach((initialTeacher) => {
        if (!selectedTeachers.includes(initialTeacher.username)) {
          deleteClassMember(selectedClass, initialTeacher.username)
            .then((result) => {
              setShowAlert(true);
              setTimeout(() => setShowAlert(false), 2000); // 2초 후 알림 숨김
              console.log(
                `Teacher ${initialTeacher.username} removed successfully`
              );
            })
            .catch((err) => {
              alert(
                `Failed to remove teacher ${initialTeacher.username}:`,
                err
              );
              // console.error(`Failed to remove teacher ${initialTeacher.username}:`, err);
            });
        }
      });
      // 이니셜에는 없었는데 현재 선택된 리스트에 있는 경우 - 티쳐 추가
      selectedTeachers.forEach((selectedTeacher) => {
        if (
          !initalSelectedTeacher.some(
            (initialTeacher) => initialTeacher.username === selectedTeacher
          )
        ) {
          assignClassMember(selectedClass, selectedTeacher)
            .then((result) => {
              setShowAlert(true);
              setTimeout(() => setShowAlert(false), 2000); // 2초 후 알림 숨김
              console.log(`Teacher ${selectedTeacher} assigned successfully`);
            })
            .catch((err) => {
              alert(`Failed to assign teacher ${selectedTeacher}:`, err);
            });
        }
      });
    } catch (err) {
      console.error("Failed to save homeroom assignment:", err);
    }
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
    <div id="page_content">
      <AppBar />
      {showAlert && (
        <Stack
          sx={{ width: "100%", position: "fixed", top: "65px", zIndex: 10 }}
          spacing={2}
        >
          <Alert severity="success">Operation successful!</Alert>
        </Stack>
      )}
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
          onRowSelection={(row) => console.log(row)}
          onRowSelectedId={(rowId) => handleClassRowIdSelection(rowId)}
          isRadioButton={true}
          id={"table_body"} // 아래 테이블이랑 id같게 할지 말지
          getRowId={(row) => row.id} // 고유한 ID 설정
        />
        {selectedClassRowId && (
          <Box sx={{ maxWidth: "90%", margin: "0 auto" }}>
            <Typography
              variant="h4"
              sx={{ fontFamily: "Copperplate", marginTop: 10, marginBottom: 3 }}
            >
              Assign Teacher
            </Typography>
            <SelectButtonContainer>
              {teachers.map((teacher) => (
                <Grid item xs={2} key={teacher.username}>
                  <SelectButton
                    selected={selectedTeachers.includes(teacher.username)}
                    onClick={() => handleTeacherClick(teacher.username)}
                  >
                    {teacher.name} <br /> ({teacher.username})
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
                  getRowId={(row) => row.username}
                  sx={{ width: "100%" }} // 왼쪽 테이블의 너비 설정
                  columns={studentColumns}
                  rows={leftStudents}
                  onRowSelection={handleLeftStudentRowSelection}
                  onRowSelectedId={(rowId) =>
                    handleLeftStudentRowSelectionId(rowId)
                  }
                  isRadioButton={false}
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
                  onClick={() =>
                    handleStudentTransferToRight(
                      leftStudents,
                      rightStudents,
                      selectedLeftStudents
                    )
                  }
                  disabled={selectedLeftStudents.length === 0}
                />
                <Box sx={{ marginTop: 2, marginBottom: 2 }} />
                <CustomButton
                  title={"<"}
                  variant="contained"
                  onClick={() =>
                    handleStudentTransferToLeft(
                      rightStudents,
                      leftStudents,
                      selectedRightStudents
                    )
                  }
                  disabled={selectedRightStudents.length === 0}
                />
              </Grid>
              <Grid item xs={5}>
                <Table
                  getRowId={(row) => row.username}
                  sx={{ width: "100%" }} // 오른쪽 테이블의 너비 설정
                  columns={studentColumns}
                  rows={rightStudents}
                  onRowSelection={handleRightStudentRowSelection}
                  onRowSelectedId={(rowId) =>
                    handleRightStudentRowSelectionId(rowId)
                  }
                  isRadioButton={false}
                  id={"student_select_body"}
                />
              </Grid>
            </Grid>
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", marginTop: 3 }}
            >
              <Box sx={{ marginRight: 2 }}>
                <CustomButton
                  title="Cancel"
                  onClick={() => console.log("Cancelled")}
                />
              </Box>
              <CustomButton title="Save" onClick={handleSave} />
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
