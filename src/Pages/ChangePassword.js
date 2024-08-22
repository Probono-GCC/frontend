import React, { useState, useEffect } from "react";

import AppBar from "../Components/AppBar";
import Table from "../Components/PaginationTable";
import Button from "../Components/Button";
import styles from "../Styles/css/Table.module.css";
import Modal from "../Components/ChangePasswordModal";
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Alert,
  Stack,
  Radio,
  Typography,
} from "@mui/material";

import { useMediaQueryContext } from "../store/MediaQueryContext";
import { getTeachers, getStudents } from "../Apis/Api/User";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function createData(sn, name, gender, birth, id, grade) {
  return { sn, name, gender, birth, id, grade };
}
function createTeacherData(name, gender, birth, id) {
  return { name, gender, birth, id };
}
function ChangePassword() {
  const [modalOpen, setModalOpen] = useState(false);
  const [userType, setUserType] = useState("student");
  const [modalRowData, setModalRowData] = useState("default row data");
  const [alert, setAlert] = useState(false);
  const [checkedRowId, setCheckedRowId] = useState(null);
  const [checkedRowData, setCheckedRowData] = useState(null);
  const [allStudentData, setAllStudentDatas] = useState([]);
  const [allTeacherData, setAllTeacherDatas] = useState([]);
  const [rows, setRows] = useState([]);
  //pagination for table
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const [totalRowCount, setTotalRowCount] = useState(0); //서버에서 총 학생수 받아와서 설정

  const { isSmallScreen } = useMediaQueryContext();
  const handleChange = (event) => {
    setUserType(event.target.value);
  };
  // 페이지 변경 핸들러
  const handlePageChange = (newPage, pageSize) => {
    console.log("페이지 변경:", newPage, "페이지 크기:", pageSize);
    // 페이지 변경에 따른 데이터 로드 등의 작업을 수행합니다.
    // 예를 들어, 서버에서 새 데이터를 가져오는 함수 호출
    fetchStudents(newPage, pageSize);
  };

  // 페이지 크기 변경 핸들러
  const handlePageSizeChange = (newPage, newPageSize) => {
    console.log("페이지 크기 변경:", newPageSize, "현재 페이지:", newPage);
    // 페이지 크기 변경에 따른 데이터 로드 등의 작업을 수행합니다.
    fetchTeachers(newPage, newPageSize);
  };
  const fetchStudents = (newPage, newSize) => {
    getStudents(newPage, newSize).then((result) => {
      console.log("학셍", result);
      const students = result.content || []; // 학생 데이터 추출
      setTotalRowCount(result.totalElements);
      // 학생과 교사 데이터를 합치기
      const studentRows = students.map((item) =>
        createData(
          item.serialNumber,
          item.name,
          item.sex,
          item.birth,
          item.username,
          item.grade
        )
      );
      setRows(studentRows);
    });
  };
  const fetchTeachers = (newPage, newSize) => {
    getTeachers(newPage, newSize).then((result) => {
      const teachers = result.content || []; // 학생 데이터 추출
      setTotalRowCount(result.totalElements);
      // 학생과 교사 데이터를 합치기
      const teacherRows = teachers.map((item) =>
        createTeacherData(item.name, item.sex, item.birth, item.username)
      );
      setRows(teacherRows);
    });
  };
  useEffect(() => {
    if (userType == "student") {
      fetchStudents();
    } else if (userType == "teacher") {
      fetchTeachers();
    } else {
      console.error("userType error");
    }
  }, [userType]);

  useEffect(() => {
    console.log("checkedRowId", checkedRowId);
    if (checkedRowId) {
      //학생에서 찾기
      const selectedData = allStudentData.find(
        (item) => item.username === checkedRowId
      );
      if (selectedData) {
        setCheckedRowData(selectedData);
      }
      //교사에서 찾기
      else {
        const selectedData = allTeacherData.find(
          (item) => item.username === checkedRowId
        );
        setCheckedRowData(selectedData);
      }
    }
  }, [checkedRowId, allStudentData]);
  useEffect(() => {
    // Fetch new data whenever page or pageSize changes
    fetchStudents(page, pageSize);
    console.log("page,pagesize", page, pageSize);
  }, [page, pageSize]);

  const columns = isSmallScreen
    ? [
        {
          field: "sn",
          headerName: "SN",
          flex: 0.25,
          cellClassName: styles.centerAlign,
        },
        { field: "name", headerName: "Name", flex: 0.4 },
        { field: "id", headerName: "ID", flex: 0.35 },
      ]
    : userType === "teacher"
    ? [
        { field: "name", headerName: "Name", flex: 0.2 },
        { field: "gender", headerName: "Gender", flex: 0.1 },
        { field: "birth", headerName: "Birth", flex: 0.1 },
        { field: "id", headerName: "ID", flex: 0.2 },
      ]
    : [
        {
          field: "sn",
          headerName: "SN",
          flex: 0.05,
          cellClassName: styles.centerAlign,
        },
        { field: "name", headerName: "Name", flex: 0.2 },
        { field: "gender", headerName: "Gender", flex: 0.1 },
        { field: "birth", headerName: "Birth", flex: 0.1 },
        { field: "id", headerName: "ID", flex: 0.2 },
        { field: "grade", headerName: "Grade", flex: 0.3 },
      ];

  const handleRowSelection = (_loginId) => {
    console.log("rowselectuon프롭전달");
    setCheckedRowId(_loginId);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const updatedColumns = [
    {
      field: "check",
      headerName: "",
      flex: 0.05,
      renderCell: (params) => (
        <Radio
          {...label}
          checked={checkedRowId ? checkedRowId.id === params.row.id : null}
          onChange={() => handleRowSelection(params.row.id)}
        />
      ),
    },
    ...columns,
  ];

  return (
    <div id="page_content">
      <AppBar />
      {alert ? (
        <Stack
          sx={{ width: "100%", position: "fixed", top: "65px" }}
          spacing={2}
        >
          <Alert severity="success">This is a success Alert.</Alert>
        </Stack>
      ) : (
        <div></div>
      )}

      <div id={styles.table_container}>
        <Box>
          <Typography
            variant={isSmallScreen ? "h6" : "h3"}
            sx={{
              textAlign: isSmallScreen ? "left" : "center",
              fontFamily: "Copperplate",
              marginTop: isSmallScreen ? "" : "10px",
              marginBottom: isSmallScreen ? "10px" : "30px",
              marginLeft: isSmallScreen ? "10px" : "",
            }}
          >
            Change Password
          </Typography>
        </Box>
        <Box
          sx={{
            width: "90vw",

            margin: "10px auto",
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">User</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={userType}
              label="user"
              onChange={handleChange}
            >
              <MenuItem sx={{ height: "60px" }} value={"teacher"}>
                Teacher
              </MenuItem>
              <MenuItem sx={{ height: "60px" }} value={"student"}>
                Student
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Table
          columns={updatedColumns}
          rows={rows}
          onRowSelection={handleRowSelection}
          onRowSelectedId={() => {}}
          id={isSmallScreen ? "" : "table_body"}
          totalRowCount={totalRowCount}
          // onRowClick={handleRowSelection}
          onRowDoubleClick={(params) => handleModalOpen(params.row)}
          getRowId={(row) => row.id}
          isRadioButton={true}
          handlePageNumber={handlePageChange} // 페이지 변경 핸들러 추가
          onPageSizeChange={handlePageSizeChange} // 페이지 크기 변경 핸들러 추가
          // pageSizeOptions={[5, 10, 15]} // 여기서도 전달 가능
        />
        <Button
          title={"Change"}
          onClick={handleModalOpen}
          disabled={checkedRowId == null}
          id={"view_btn"}
          size={"bg"}
        />
      </div>

      <Modal
        open={modalOpen}
        handleClose={handleModalClose}
        title={"Change Password"}
        rowData={checkedRowId}
        rowsHeader={columns}
      />
    </div>
  );
}

export default ChangePassword;
