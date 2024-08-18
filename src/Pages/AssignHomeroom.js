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
} from "@mui/material";
import AppBar from "../Components/AppBar";
import Table from "../Components/Table";
import Radio from "@mui/material/Radio";
import CustomButton from "../Components/Button";
import SelectButton from "../Components/SelectButton";
import SelectButtonContainer from "../Components/SelectButtonContatiner";
import { getTeachers, getStudents } from "../Apis/Api/User";
import { getClasses, putClass } from "../Apis/Api/Class";

const label = { inputProps: { "aria-label": "Radio button demo" } };
const checkLabel = { inputProps: { "aria-label": "Checkbox demo" } };

function createData(sn, gender, name, birth, id, grade) {
  return { sn, gender, name, birth, id, grade };
}

const studentColumns = [
  { field: "sn", headerName: "SN", flex: 0.1 },
  { field: "name", headerName: "Name", flex: 0.2 },
  { field: "gender", headerName: "Gender", flex: 0.1 },
  { field: "birth", headerName: "Birth", flex: 0.2 },
  { field: "id", headerName: "ID", flex: 0.2 },
  { field: "grade", headerName: "Grade", flex: 0.2 },
];

function AssignHomeroom() {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [leftStudents, setLeftStudents] = useState([]);
  const [rightStudents, setRightStudents] = useState([]);
  const [selectedLeftStudents, setSelectedLeftStudents] = useState([]);
  const [selectedRightStudents, setSelectedRightStudents] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [allStudentData, setAllStudentDatas] = useState([]);

  const [checkedRows, setCheckedRows] = useState([]);

  useEffect(() => {
    // Fetch classes and teachers data on component mount
    // Fetching class data when the component mounts
    getClasses().then((result) => {
      console.log(result);
      const tempRow = result.content.map((item, index) => ({
        id: index + 1, // Assuming an index for table rows
        year: item.year,
        grade: item.grade,
        section: item.section,
        classId: item.classId, // classId를 가져와서 삭제에 활용
      }));
      setClasses(tempRow);
    });

    getTeachers().then((result) => {
      setTeachers(result.content || []); // Fetch teachers from API
    });
  }, []);

  useEffect(() => {
    getStudents().then((result) => {
      console.log(result);
      const students = result.content || []; // content 배열 가져오기
      console.log(students);
      setAllStudentDatas(students);
      if (students.length > 0) {
        const tempRow = students.map((item) =>
          createData(
            item.serialNumber,
            item.sex,
            item.name,
            item.birth,
            item.username,
            item.grade,
            item.phoneNum
          )
        );
        setLeftStudents(tempRow);
      }
    });
  }, []);

  const handleRowSelection = (id) => {
    setCheckedRows((prevCheckedRows) =>
      prevCheckedRows.includes(id)
        ? prevCheckedRows.filter((rowId) => rowId !== id)
        : [...prevCheckedRows, id]
    );
  };

  const handleClassRowSelection = (id) => {
    setSelectedClass(id);

    // 선택된 클래스의 GRADE 정보 가져오기
    const selectedClassData = classes.find((cls) => cls.id === id);

    if (selectedClassData) {
      const selectedGrade = selectedClassData.grade;

      // 해당 GRADE와 일치하는 학생들 필터링
      const filteredStudents = allStudentData.filter(
        (student) => student.grade === selectedGrade
      );

      // 필터링된 학생들을 LeftStudents에 설정
      setLeftStudents(filteredStudents);
    }
  };

  const handleLeftStudentRowSelection = (_id) => {
    console.log("체크: ", _id);
    setLeftStudents((prevCheckedRows) => {
      const newCheckedRows = prevCheckedRows.includes(_id)
        ? prevCheckedRows.filter((rowId) => rowId !== _id)
        : [...prevCheckedRows, _id];
      console.log("업데이트된 선택된 행:", newCheckedRows);
      return newCheckedRows;
    });
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

  const handleStudentTransfer = (
    from,
    to,
    setFrom,
    setTo,
    selected,
    setSelected
  ) => {
    const newFrom = from.filter((student) => !selected.includes(student.sn));
    const newTo = [
      ...to,
      ...selected.map((id) => from.find((student) => student.sn === id)),
    ];
    setFrom(newFrom);
    setTo(newTo);
    setSelected([]);
  };

  const handleSave = async () => {
    if (!selectedClass) {
      alert("Please select a class.");
      return;
    }

    const selectedClassData = classes.find((cls) => cls.id === selectedClass);
    const updatedClassData = {
      ...selectedClassData,
      teacher1:
        teachers.find((teacher) => teacher.id === selectedTeachers[0])?.name ||
        "",
      teacher2:
        teachers.find((teacher) => teacher.id === selectedTeachers[1])?.name ||
        "",
      // Include other fields if necessary
    };

    try {
      await putClass(updatedClassData);
      alert("Homeroom assigned successfully!");
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
                  sx={{ width: "100%" }} // 왼쪽 테이블의 너비 설정
                  columns={studentColumns}
                  rows={leftStudents}
                  onRowSelection={handleLeftStudentRowSelection}
                  getRowId={(row) => row.username}
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
                    handleStudentTransfer(
                      leftStudents,
                      rightStudents,
                      setLeftStudents,
                      setRightStudents,
                      selectedLeftStudents,
                      setSelectedLeftStudents
                    )
                  }
                  disabled={selectedLeftStudents.length === 0}
                />
                <Box sx={{ marginTop: 2, marginBottom: 2 }} />
                <CustomButton
                  title={"<"}
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
                  disabled={selectedRightStudents.length === 0}
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
                  getRowId={(row) => row.username}
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
