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
import { getStudents } from "../Apis/Api/User";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function createData(sn, gender, name, birth, id, grade, phone_num) {
  return { sn, gender, name, birth, id, grade, phone_num };
}

const rows = [
  createData(
    1,
    "Male",
    "Jon",
    "20.02.24",
    "a0000",
    "PlayGroup",
    "0112331541354132123asdf0"
  ),
  createData(2, "Female", "Cersei", "20.01.04", "a0001", "PlayGroup", "101"),
  createData(3, "Male", "Jaime", "20.12.24", "a0002", "PlayGroup", "010"),
  createData(4, "Male", "Arya", "20.05.27", "a0003", "PlayGroup", "010"),
  createData(5, "Male", "Daenerys", "20.08.14", "a0004", "PlayGroup", "010"),
  createData(6, "Male", "nell", "20.12.24", "a0005", "PlayGroup", "010"),
  createData(7, "Female", "Ferrara", "19.07.05", "b0006", "UnderKG", "010"),
  createData(8, "Female", "Rossini", "19.07.25", "b0007", "UnderKG", "010"),
  createData(9, "Female", "Harvey", "19.07.04", "b0008", "UnderKG", "010"),
];

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
  const deleteRow = () => {
    setAlert(true);
    setTimeout(() => setAlert(false), 2000); // Hide the alert after 3 seconds

    console.log("Deleting rows:", checkedRows);
    setCheckedRows([]);
  };

  useEffect(() => {
    getStudents().then((result) => {
      console.log(result);

      const tempRow = result.map((item) =>
        createData(
          item.serialNumber,
          item.sex,
          item.name,
          item.birth,
          item.loginId,
          item.grade,
          item.phoneNum
        )
      );
      setRows(tempRow);
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
      </div>
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
