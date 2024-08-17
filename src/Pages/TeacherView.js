import React, { useState, useEffect } from "react";

import AppBar from "../Components/AppBar";
import Table from "../Components/ViewTable";
import Button from "../Components/Button";
import styles from "../Styles/css/Table.module.css";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";

import Modal from "../Components/Modal";
import { Typography, Box } from "@mui/material";
import { useMediaQueryContext } from "../store/MediaQueryContext";
import { getTeachers, deleteTeacher } from "../Apis/Api/User"; // deleteTeacher 함수를 가져옵니다.

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function createData(
  gender,
  name,
  birth,
  login_id,
  phone_num,
  home_room,
  course
) {
  return { gender, name, login_id, birth, phone_num, home_room, course };
}

function TeacherView() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRowData, setModalRowData] = useState("default row data");
  const [alert, setAlert] = useState(false);
  const [checkedRows, setCheckedRows] = useState([]);
  const [rows, setRows] = useState([]);
  const { isSmallScreen } = useMediaQueryContext();

  // 기본 컬럼 정의
  const basic_columns = isSmallScreen
    ? [
        { field: "login_id", headerName: "ID", flex: 0.35 },
        { field: "name", headerName: "Name", flex: 0.35 },
        { field: "home_room", headerName: "Home room", flex: 0.3 },
      ]
    : [
        { field: "login_id", headerName: "ID", flex: 0.2 },
        { field: "name", headerName: "Name", flex: 0.2 },
        { field: "gender", headerName: "Gender", flex: 0.1 },
        { field: "birth", headerName: "Birth", flex: 0.1 },
        { field: "phone_num", headerName: "Phone", flex: 0.3 },
      ];

  // 체크박스를 포함한 컬럼 정의
  const updatedColumns = [
    {
      field: "check",
      headerName: "",
      flex: 0.05,
      renderCell: (params) => (
        <Checkbox
          {...label}
          checked={checkedRows.includes(params.row.login_id)}
          onChange={() => handleRowSelection(params.row.login_id)}
        />
      ),
    },
    ...basic_columns,
  ];

  // 상세 정보 모달에 사용되는 컬럼 정의
  const detail_columns = [
    { field: "name", headerName: "Name", flex: 0.2 },
    { field: "gender", headerName: "Gender", flex: 0.1 },
    { field: "birth", headerName: "Birth", flex: 0.1 },
    { field: "login_id", headerName: "ID", flex: 0.2 },
    { field: "phone_num", headerName: "Phone" },
    { field: "home_room", headerName: "Home room" },
    { field: "course", headerName: "Course", flex: 0.3 },
  ];

  const handleRowSelection = (id) => {
    setCheckedRows((prevCheckedRows) => {
      const newCheckedRows = prevCheckedRows.includes(id)
        ? prevCheckedRows.filter((rowId) => rowId !== id)
        : [...prevCheckedRows, id];
      console.log("업데이트된 선택된 행:", newCheckedRows);
      return newCheckedRows;
    });
  };

  const handleModalOpen = (row) => {
    setModalRowData(row);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalRowData(null);
  };

  const handleRowDoubleClick = (params) => {
    handleModalOpen(params.row);
  };

  const deleteRow = async () => {
    try {
      // 선택된 각 행에 대해 삭제 로직을 수행
      for (const rowIndex of checkedRows) {
        const teacherData = rows.find((row) => row.login_id === rowIndex);

        if (teacherData) {
          // 각 교사에 대해 deleteTeacher 호출
          await deleteTeacher({ username: teacherData.login_id });
        }
      }

      console.log("Deleting rows:", checkedRows);

      // 성공적으로 삭제 후 알림 표시
      setAlert(true);
      setTimeout(() => setAlert(false), 2000); // 3초 후 알림 숨김

      setCheckedRows([]);

      // 삭제된 행을 rows에서 제거
      setRows((prevRows) =>
        prevRows.filter((row) => !checkedRows.includes(row.login_id))
      );
    } catch (error) {
      console.error("Error deleting rows:", error);
    }
  };

  useEffect(() => {
    getTeachers().then((result) => {
      console.log(result);
      if (result.length > 0) {
        const tempRow = result.map((item) =>
          createData(
            item.sex,
            item.name,
            item.birth,
            item.username,
            item.phoneNum,
            item.home_room,
            item.course
          )
        );
        setRows(tempRow);
      }
    });
  }, []);

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
            variant={isSmallScreen ? "h5" : "h3"}
            sx={{
              textAlign: isSmallScreen ? "left" : "center",
              fontFamily: "Copperplate",
              marginTop: isSmallScreen ? "5px" : "10px",
              marginBottom: isSmallScreen ? "10px" : "30px",
              marginLeft: isSmallScreen ? "10px" : "",
            }}
          >
            Teacher Board
          </Typography>
        </Box>
        <Table
          columns={isSmallScreen ? basic_columns : updatedColumns}
          rows={rows}
          onRowSelection={handleRowSelection}
          onRowDoubleClick={handleRowDoubleClick}
          getRowId={(row) => row.login_id}
          id={isSmallScreen ? "" : "table_body"}
          isRadioButton={false}
          isStudentTable={true} // 필요에 따라 다른 커스텀 플래그를 사용할 수 있습니다.
          checkedRows={checkedRows} // 체크된 행 상태 전달
        />
        {isSmallScreen ? (
          <div>&nbsp;</div>
        ) : (
          <Button
            title={"Delete"}
            disabled={checkedRows.length === 0}
            onClick={deleteRow}
            id={"view_btn"}
            size={"bg"}
          />
        )}
      </div>

      <Modal
        open={modalOpen}
        handleClose={handleModalClose}
        title={"Detail Information"}
        rowData={modalRowData}
        rowsHeader={detail_columns}
      />
    </div>
  );
}

export default TeacherView;
