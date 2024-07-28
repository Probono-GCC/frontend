import React, { useState, useNavigate, useEffect, useMemo } from "react";

import AppBar from "../Components/AppBar";
import Table from "../Components/Table";
import Button from "../Components/Button";
import styles from "../Styles/css/Table.module.css";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import InfoIcon from "@mui/icons-material/Info";
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
  { field: "phone_num", headerName: "phone", flex: 0.3 },
];

const rows = [
  {
    id: 0,
    sex: "Male",
    name: "Jon",
    birth: "92.02.24",
    login_id: "b0000",
    phone_num: "01021143454",
  },
  {
    id: 1,
    sex: "Female",
    name: "Cersei",
    birth: "92.01.04",
    login_id: "b0001",
    phone_num: "01021143454",
  },
  {
    id: 2,
    sex: "Male",
    name: "Jaime",
    birth: "92.12.24",
    login_id: "b0002",
    phone_num: "01021143454",
  },
  {
    id: 3,
    sex: "Male",
    name: "Arya",
    birth: "92.05.27",
    login_id: "b0003",
    phone_num: "01021143454",
  },
];

function TeacherView() {
  // const [selectedRows, setSelectedRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRowData, setModalRowData] = useState("default row data");
  const [alert, setAlert] = useState(false);
  const [checkedRows, setCheckedRows] = useState([]);
  // const rows = "";
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

  const updatedColumns = [
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
  ];
  useEffect(() => {
    // const result = getTeachers();
    // console.log(result);
    const result = axios
      .get("http://localhost:8080/teachers")
      .then((result) => {
        console.log(result);
      });
  });
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
        {" "}
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
        </Box>{" "}
        <Table
          columns={updatedColumns}
          rows={rows}
          onRowSelection={handleRowSelection}
          onRowDoubleClick={(params) => handleModalOpen(params.row)}
        />
      </div>
      <Button
        title={"Delete"}
        disabled={checkedRows.length === 0}
        onClick={deleteRow}
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
