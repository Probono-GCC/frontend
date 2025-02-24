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
import { useTranslation } from "react-i18next";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function createData(sn, name, gender, birth, id, grade) {
  return { sn, name, gender, birth, id, grade };
}
function createTeacherData(name, gender, birth, id) {
  return { name, gender, birth, id };
}
function ChangePassword() {
  const { t } = useTranslation();
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
  const [pageSize, setPageSize] = useState(400);
  const [totalRowCount, setTotalRowCount] = useState(0); //서버에서 총 학생수 받아와서 설정

  const { isSmallScreen } = useMediaQueryContext();
  const handleChange = (event) => {
    setUserType(event.target.value);
  };
  // 페이지 변경 핸들러
  const handlePageChange = (newPage, pageSize) => {
    //console.log("페이지 변경:", newPage, "페이지 크기:", pageSize);
    // 페이지 변경에 따른 데이터 로드 등의 작업을 수행합니다.
    // 예를 들어, 서버에서 새 데이터를 가져오는 함수 호출
    fetchStudents();
  };

  // 페이지 크기 변경 핸들러
  const handlePageSizeChange = (newPage, newPageSize) => {
    //console.log("페이지 크기 변경:", newPageSize, "현재 페이지:", newPage);
    // 페이지 크기 변경에 따른 데이터 로드 등의 작업을 수행합니다.
    fetchTeachers();
  };
  const fetchStudents = () => {
    getStudents(page, pageSize).then((result) => {
      //console.log("학셍", result);
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
  const fetchTeachers = () => {
    getTeachers(page, pageSize).then((result) => {
      //console.log("result", result);
      const teachers = result.content || []; // 교사 데이터 추출
      setTotalRowCount(result.totalElements);
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
    fetchStudents();
    //console.log("page,pagesize", page, pageSize);
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
    //console.log("rowselectuon프롭전달", _loginId);
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
      flex: 0.01,
      renderCell: (params) => (
        <Radio
          {...label}
          checked={checkedRowId ? checkedRowId.id === params.row.id : null}
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
          <Alert severity="success">Success</Alert>
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
            {t("Change Password")}
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
        <Box
          sx={{
            padding: "10px", // 패딩 추가 (선택사항)
          }}
        >
          <Table
            columns={isSmallScreen ? columns : updatedColumns}
            rows={rows}
            onRowSelection={handleRowSelection}
            onRowSelectedId={() => {}}
            id={isSmallScreen ? "" : "table_body"}
            totalRowCount={totalRowCount}
            onRowDoubleClick={(params) => handleModalOpen(params.row)}
            getRowId={(row) => row.id}
            isRadioButton={true}
            handlePageNumber={handlePageChange} // 페이지 변경 핸들러 추가
            onPageSizeChange={handlePageSizeChange} // 페이지 크기 변경 핸들러 추가
            pageSizeOptions={[10, 30, 50, 100]}
          />
        </Box>

        <Button
          title={"Change"}
          onClick={handleModalOpen}
          disabled={checkedRowId == null}
          id={"view_btn"}
          size={"md"}
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
