import React, { useState, useEffect } from "react";

import AppBar from "../Components/AppBar";
import Table from "../Components/Table";
import Button from "../Components/Button";
import styles from "../Styles/css/Table.module.css";
import Modal from "../Components/ChangePasswordModal";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import { Typography, Box } from "@mui/material";
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
  const [modalRowData, setModalRowData] = useState("default row data");
  const [alert, setAlert] = useState(false);
  const [checkedRowId, setCheckedRowId] = useState(null);
  const [checkedRowData, setCheckedRowData] = useState(null);
  const [allStudentData, setAllStudentDatas] = useState([]);
  const [allTeacherData, setAllTeacherDatas] = useState([]);
  const [rows, setRows] = useState([]);
  const { isSmallScreen } = useMediaQueryContext();

  useEffect(() => {
    Promise.all([getStudents(), getTeachers()]).then(
      ([studentsResult, teachersResult]) => {
        const students = studentsResult.content || []; // 학생 데이터 추출
        const teachers = teachersResult.content || []; // 교사 데이터 추출

        // 상태 업데이트
        setAllStudentDatas(students);
        setAllTeacherDatas(teachers);

        // 학생과 교사 데이터를 합치기
        const studentRows = students.map((item) =>
          createData(
            item.serialNumber,
            item.name,
            item.sex,
            item.birth,
            item.username,
            item.grade,
            item.phoneNum
          )
        );

        const teacherRows = teachers.map((item) =>
          createTeacherData(item.name, item.sex, item.birth, item.username)
        );

        // 학생과 교사 데이터를 합쳐서 상태 업데이트
        setRows([...studentRows, ...teacherRows]);
      }
    );
  }, []);

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
          checked={checkedRowId ? checkedRowId.id === params.row.id : ""}
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
        <Table
          columns={updatedColumns}
          rows={rows}
          onRowSelection={handleRowSelection}
          onRowSelectedId={() => {}}
          id={isSmallScreen ? "" : "table_body"}
          // onRowClick={handleRowSelection}
          onRowDoubleClick={(params) => handleModalOpen(params.row)}
          getRowId={(row) => row.id}
          isRadioButton={true}
          // checkedRows={(params) => null}
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
