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
import { getStudents, deleteStudent } from "../Apis/Api/User";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function createData(sn, gender, name, birth, id, grade, phone_num) {
  return { sn, gender, name, birth, id, grade, phone_num };
}

function StudentView() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRowData, setModalRowData] = useState("default row data");
  const [alert, setAlert] = useState(false);
  const [checkedRows, setCheckedRows] = useState([]);
  const [rows, setRows] = useState([]);
  const { isSmallScreen } = useMediaQueryContext();

  //student view default table column
  const basic_columns = isSmallScreen
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
  const updatedColumns = [
    {
      field: "check",
      headerName: "",
      flex: 0.05,
      renderCell: (params) => (
        <Checkbox
          {...label}
          checked={checkedRows.includes(params.row.sn)}
          onChange={() => handleRowSelection(params.row.sn)}
        />
      ),
    },
    ...basic_columns,
  ];
  //student detail modal에 들어가는 col
  const detail_columns = [
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
    { field: "phone_num", headerName: "Phone" },
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
        const studentData = rows.find((row) => row.sn === rowIndex);

        if (studentData) {
          // 각 학생에 대해 deleteStudent 호출
          await deleteStudent({ username: studentData.id });
        }
      }

      console.log("Deleting rows:", checkedRows);

      // 성공적으로 삭제 후 알림 표시
      setAlert(true);
      setTimeout(() => setAlert(false), 2000); // 3초 후 알림 숨김

      setCheckedRows([]);

      // 삭제된 행을 rows에서 제거
      setRows((prevRows) =>
        prevRows.filter((row) => !checkedRows.includes(row.sn))
      );
    } catch (error) {
      console.error("Error deleting rows:", error);
    }
  };

  useEffect(() => {
    getStudents().then((result) => {
      console.log(result);
      if (result.length > 0) {
        const tempRow = result.map((item) =>
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
        setRows(tempRow);
      }
    });
  }, []);
  // [] 안에 rows를 넣으면 이 값이 바뀔때마다 useEffect가 실행됨!

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
            Student Board
          </Typography>
        </Box>
        <Table
          columns={isSmallScreen ? basic_columns : updatedColumns}
          rows={rows}
          onRowSelection={handleRowSelection}
          onRowDoubleClick={handleRowDoubleClick}
          getRowId={(row) => row.sn}
          id={isSmallScreen ? "" : "table_body"}
          isRadioButton={false}
          isStudentTable={true} //row클릭시 체크박스 활성화 안되게 하기위해 커스텀
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

export default StudentView;
