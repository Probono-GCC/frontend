import React, { useState, useNavigate } from "react";

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
import { textAlign } from "@mui/system";
import { Typography, Box } from "@mui/material";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const columns = [
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

const rows = [
  {
    sn: 1,
    gender: "Male",
    name: "Jon",
    birth: "20.02.24",
    id: "a0000",
    grade: "PlayGroup",
  },
  {
    sn: 2,
    gender: "Female",
    name: "Cersei",
    birth: "20.01.04",
    id: "a0001",
    grade: "PlayGroup",
  },
  {
    sn: 3,
    gender: "Male",
    name: "Jaime",
    birth: "20.12.24",
    id: "a0002",
    grade: "PlayGroup",
  },
  {
    sn: 4,
    gender: "Male",
    name: "Arya",
    birth: "20.05.27",
    id: "a0003",
    grade: "PlayGroup",
  },
  {
    sn: 5,
    gender: "Male",
    name: "Daenerys",
    birth: "20.08.14",
    id: "a0004",
    grade: "PlayGroup",
  },
  {
    sn: 6,
    gender: "Male",
    name: "nell",
    birth: "20.12.24",
    id: "a0005",
    grade: "PlayGroup",
  },
  {
    sn: 7,
    gender: "Female",
    name: "Ferrara",
    birth: "19.07.05",
    id: "b0006",
    grade: "UnderKG",
  },
  {
    sn: 8,
    gender: "Female",
    name: "Rossini",
    birth: "19.07.25",
    id: "b0007",
    grade: "UnderKG",
  },
  {
    sn: 9,
    gender: "Female",
    name: "Harvey",
    birth: "19.07.04",
    id: "b0008",
    grade: "UnderKG",
  },
];

function StudentView() {
  // const [selectedRows, setSelectedRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRowData, setModalRowData] = useState("default row data");
  const [alert, setAlert] = useState(false);
  const [checkedRows, setCheckedRows] = useState([]);
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
    // {
    //   field: "Detail",
    //   headerName: "Detail",
    //   flex: 0.1,
    //   renderCell: (params) => (
    //     <IconButton
    //       aria-label="info"
    //       onClick={() => handleModalOpen(params.row)}
    //     >
    //       <InfoIcon />
    //     </IconButton>
    //   ),
    // },
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
            Student Board
          </Typography>
        </Box>
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
      />
    </div>
  );
}

export default StudentView;
