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
  getNotAssignedStudent,
} from "../Apis/Api/Class";

const label = { inputProps: { "aria-label": "Radio button demo" } };
const checkLabel = { inputProps: { "aria-label": "Checkbox demo" } };

// function createData(serialNumber, sex, name, birth, username, grade) {
//   return { id: serialNumber, serialNumber, sex, name, birth, username, grade };
// }

const studentColumns = [
  { field: "serialNumber", headerName: "SN", flex: 0.1 },
  { field: "name", headerName: "Name", flex: 0.2 },
  { field: "sex", headerName: "Gender", flex: 0.1 },

  { field: "username", headerName: "ID", flex: 0.2 },
  { field: "grade", headerName: "Grade", flex: 0.2 },
];

function AssignHomeroom() {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedClassRowId, setSelectedClassRowId] = useState(null); //class table에서 선택된 row id
  const [selectedClassRowData, setSelectedClassRowData] = useState(null); //class table에서 선택된 row data 전체 정보
  const [selectedTeachers, setSelectedTeachers] = useState([]); //새롭게 선택된 교사
  const [initalSelectedTeacher, setInitalSelectedTeacher] = useState([]); //기존 할당되어있던 교사
  const [leftStudents, setLeftStudents] = useState([]);
  const [rightStudents, setRightStudents] = useState([]);
  const [selectedLeftStudents, setSelectedLeftStudents] = useState([]);
  const [selectedRightStudents, setSelectedRightStudents] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [allStudentData, setAllStudentDatas] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [checkedRows, setCheckedRows] = useState([]);
  const [newSelctedLeftStudent, setNewSelectedLeftStudent] = useState([]);
  //pagination for table
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const [totalRowCount, setTotalRowCount] = useState(0); //서버에서 총 학생수 받아와서 설정

  const [newSelctedRightStudent, setNewSelectedRightStudent] = useState([]);
  const NepaliDate = require("nepali-date");
  const todayNepaliDate = new NepaliDate();
  const currentYear = todayNepaliDate.getYear();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      // Fetch classes data
      const classResult = await getClasses(page, pageSize, currentYear);
      if (classResult && classResult.content) {
        setTotalRowCount(classResult.totalElements);

        // Process each class to fetch its teachers
        const classTeacherPromises = classResult.content.map(async (item) => {
          const teachersResult = await getClassTeacher(item.classId);

          // Create a mapping for teachers information
          const teacherInfo = teachersResult.reduce((acc, teacher, index) => {
            acc[`teacher${index + 1}`] = teacher.username;
            return acc;
          }, {});

          // Return a formatted class object with teacher information
          return {
            id: item.classId,
            year: item.year,
            grade: item.grade,
            section: item.section,
            classId: item.classId,
            ...teacherInfo, // Include teacher information
          };
        });

        // Wait for all teacher data to be fetched and processed
        const tempRows = await Promise.all(classTeacherPromises);
        setClasses(tempRows);
      }

      // Fetch teachers data
      const teacherResult = await getTeachers(0, 100);
      if (teacherResult && teacherResult.content) {
        const tempTeachers = teacherResult.content.map((item, index) => ({
          id: index + 1, // Assuming an index for table rows
          gender: item.sex,
          username: item.username,
          name: item.name,
        }));
        setTeachers(tempTeachers);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    console.log("selecte left sutdnet 2", selectedLeftStudents);
    getStudents(0, 100).then((result) => {
      console.log(result);
      if (result && result.content) {
        const students = result.content || []; // content 배열 가져오기
        console.log("students map", students);
        setAllStudentDatas(students);
      }
    });
    console.log("selcted3", selectedLeftStudents);
  }, []);
  useEffect(() => {}, [
    rightStudents,
    leftStudents,
    selectedLeftStudents,
    selectedRightStudents,
  ]);

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
  const handleSelectedClassRowData = (row) => {
    // console.log(row, "selected row");
    setSelectedClassRowId(row.classId);
    setSelectedClassRowData(row);
    // 할당되지 않은 학생 LEFT 테이블에
    getNotAssignedStudent(row.grade, 0, 50).then((result) => {
      if (result && result.content) {
        // 각 객체에 id 키를 인덱스로 추가한 새로운 배열 생성
        const updatedStudents = result.content.map((student, index) => ({
          ...student,
          id: student.serialNumber, // id 키에 인덱스 값 할당
        }));

        //left table에 업데이트된 배열 저장
        setLeftStudents(updatedStudents);
      }
    });
    //할당된 학생 RIGHT 테이블에
    if (row.classId) {
      getClassStudent(row.classId, 0, 50).then((result) => {
        console.log("너는 right student배열", result.content);
        if (result && result.content) {
          // 각 객체에 id 키를 인덱스로 추가한 새로운 배열 생성
          const updatedStudents = result.content.map((student, index) => ({
            ...student,
            id: student.serialNumber, // id 키에 인덱스 값 할당
          }));

          //right table에 업데이트된 배열 저장
          setRightStudents(updatedStudents);
        }
      });
      //class 선생님 불러오기
      getClassTeacher(row.classId).then((result) => {
        console.log("class에 할당된 teacher get result ", result);

        setInitalSelectedTeacher(result);
        setSelectedTeachers(result.map((teacher) => teacher.username));
      });
    }
  };
  const handleClassRowIdSelection = (id) => {
    console.log(selectedClassRowData, "rowid???", id[0]);
    // setSelectedClassRowId(id[0]);
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
      flex: 0.1,
      renderCell: (params) => (
        <Radio
          {...label}
          checked={selectedClassRowId === params.row.id}
          onChange={() => handleClassRowIdSelection(params.row.id)}
        />
      ),
    },
    { field: "year", headerName: "Batch", flex: 0.2 },
    { field: "grade", headerName: "Grade", flex: 0.2 },
    { field: "section", headerName: "Section", flex: 0.1 },
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
      console.log("selectedLeftStudents", selectedLeftStudents);
      if (newSelctedLeftStudent) {
        newSelctedLeftStudent.map((item) => {
          console.log(
            "assign에서 현재 클래스 아이디 불러오고싷ㅍ음 selectedClass",
            selectedClassRowData.classId
          );
          assignClassMember(selectedClassRowData, item.username)
            .then((result) => {
              console.log("assign class member result", result);
              setShowAlert(true);
              setTimeout(() => setShowAlert(false), 2000); // 2초 후 알림 숨김
            })
            .catch((err) => {
              alert(item.name, " student assigned failed.");
            });
        });
      }
      if (newSelctedRightStudent) {
        //새롭게 선택된 학생 리스트
        console.log(
          "assign에서 현재 클래스 아이디 불러오고싷ㅍ음 selectedClass",
          selectedClassRowData.classId
        );
        console.log("selectedRightStudents", newSelctedRightStudent);
        newSelctedRightStudent.map((item) => {
          deleteClassMember(selectedClassRowData, item.username)
            .then((result) => {
              if (result) {
                console.log("delete class member result", result, "item name");
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 2000); // 2초 후 알림 숨김
              } else {
                alert(item.name, " student deallocated failed.");
              }
            })
            .catch((err) => {
              alert(err, item.name, " student deallocated failed.");
            });
        });
      }
      // 이니셜에 있었는데 현재 선택된 리스트에 없는 경우 - 티쳐 삭제
      initalSelectedTeacher.forEach((initialTeacher) => {
        if (!selectedTeachers.includes(initialTeacher.username)) {
          deleteClassMember(selectedClassRowData, initialTeacher.username)
            .then((result) => {
              setShowAlert(true);
              setTimeout(() => setShowAlert(false), 2000); // 2초 후 알림 숨김
              console.log(
                `Teacher ${initialTeacher.username} removed successfully`
              );
              fetchData();
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
          assignClassMember(selectedClassRowData, selectedTeacher)
            .then((result) => {
              setShowAlert(true);
              setTimeout(() => setShowAlert(false), 2000); // 2초 후 알림 숨김
              console.log(`Teacher ${selectedTeacher} assigned successfully`);
              fetchData();
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
          totalRowCount={totalRowCount}
          onRowSelection={(row) => handleSelectedClassRowData(row)}
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
