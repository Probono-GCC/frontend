import React, { useState, useEffect, useMemo } from "react";

import AppBar from "../Components/AppBar";
import Table from "../Components/ViewTable";
import Button from "../Components/Button";
import styles from "../Styles/css/Table.module.css";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import Modal from "../Components/Modal";
import Checkbox from "@mui/material/Checkbox";
import { Typography, Box } from "@mui/material";
import { getTeachers } from "../Apis/Api/User";
import axios from "axios";
import { useMediaQueryContext } from "../store/MediaQueryContext";

//student detail modal에 들어가는 col
const detail_columns = [
  { field: "name", headerName: "Name", flex: 0.2 },
  { field: "gender", headerName: "Gender", flex: 0.1 },
  { field: "birth", headerName: "Birth", flex: 0.1 },
  { field: "login_id", headerName: "ID", flex: 0.2 },
  { field: "phone_num", headerName: "Phone" },
  { field: "home_room", headerName: "Home room" },
  { field: "course", headerName: "Course", flex: 0.3 },
];
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

  const basic_columns = isSmallScreen
    ? [
        { field: "login_id", headerName: "ID", flex: 0.35 },
        { field: "name", headerName: "Name", flex: 0.35 },
        {
          field: "home_room",
          headerName: "Home room",
          flex: 0.3,
        },
      ]
    : [
        { field: "login_id", headerName: "ID", flex: 0.2 },
        { field: "name", headerName: "Name", flex: 0.2 },
        { field: "gender", headerName: "Gender", flex: 0.1 },
        { field: "birth", headerName: "Birth", flex: 0.1 },
        { field: "phone_num", headerName: "Phone", flex: 0.3 },
      ];

  const handleRowSelection = (id) => {
    setCheckedRows((prevCheckedRows) =>
      prevCheckedRows.includes(id)
        ? prevCheckedRows.filter((rowId) => rowId !== id)
        : [...prevCheckedRows, id]
    );
  };

  const handleModalOpen = (row) => {
    setModalRowData(row);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalRowData(null);
  };

  const deleteRow = () => {
    setAlert(true);
    setTimeout(() => setAlert(false), 2000); // Hide the alert after 3 seconds

    console.log("Deleting rows:", checkedRows);
    setCheckedRows([]);
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
            item.loginId,
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
          columns={basic_columns}
          rows={rows}
          onRowSelection={handleRowSelection}
          onRowDoubleClick={(params) => handleModalOpen(params.row)}
          getRowId={(row) => row.login_id}
          id={"table_body"}
        />
      </div>
      <Button
        title={"Delete"}
        disabled={checkedRows.length === 0}
        onClick={deleteRow}
        id={"view_btn"}
        size={"bg"}
      />

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
