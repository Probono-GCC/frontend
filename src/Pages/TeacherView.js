import React, { useState, useEffect, useMemo } from "react";

import AppBar from "../Components/AppBar";
import Table from "../Components/Table";
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

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const columns = [
  { field: "name", headerName: "Name", flex: 0.2 },
  { field: "sex", headerName: "Gender", flex: 0.1 },
  { field: "birth", headerName: "Birth", flex: 0.1 },
  { field: "login_id", headerName: "ID", flex: 0.2 },
  { field: "phone_num", headerName: "Phone", flex: 0.3 },
];

function createData(id, sex, name, birth, login_id, phone_num) {
  return { id, sex, name, birth, login_id, phone_num };
}

const initialRows = [
  createData(0, "Male", "Jon", "92.02.24", "b0000", "01021143454"),
  createData(1, "Female", "Cersei", "92.01.04", "b0001", "01021143454"),
  createData(2, "Male", "Jaime", "92.12.24", "b0002", "01021143454"),
  createData(3, "Male", "Arya", "92.05.27", "b0003", "01021143454"),
];

function TeacherView() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRowData, setModalRowData] = useState("default row data");
  const [alert, setAlert] = useState(false);
  const [checkedRows, setCheckedRows] = useState([]);
  const [rows, setRows] = useState(initialRows);

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

  const updatedColumns = useMemo(
    () => [
      {
        field: "check",
        headerName: "",
        flex: 0.05,
        renderCell: (params) => (
          <Checkbox
            {...label}
            checked={checkedRows.includes(params.row.id)}
            onChange={() => handleRowSelection(params.row.id)}
          />
        ),
      },
      ...columns,
    ],
    [checkedRows]
  );

  useEffect(() => {
    getTeachers()
      .then((result) => {
        console.log(result); // 결과값은 배열로 저장됨
        const formattedRows = result.map((teacher, index) =>
          createData(
            index,
            teacher.sex,
            teacher.name,
            teacher.birth,
            teacher.login_id,
            teacher.phone_num
          )
        );
        setRows(formattedRows);
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error);
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 0,
            marginBottom: 3,
          }}
        >
          <Typography
            variant="h3"
            component="div"
            sx={{ fontFamily: "Copperplate" }}
          >
            Teacher Board
          </Typography>
        </Box>
        <Table
          columns={updatedColumns}
          rows={rows}
          onRowSelection={handleRowSelection}
          onRowDoubleClick={(params) => handleModalOpen(params.row)}
          getRowId={(row) => row.id}
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
        rowsHeader={columns}
      />
    </div>
  );
}

export default TeacherView;
