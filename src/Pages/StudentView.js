import React, { useState, useNavigate } from "react";

import AppBar from "../Components/AppBar";
import Table from "../Components/Table";
import Button from "../Components/Button";
import styles from "../Styles/css/Table.module.css";
import IconButton from "@mui/material/IconButton";

import InfoIcon from "@mui/icons-material/Info";
import Modal from "../Components/Modal";
const columns = [
  { field: "sn", headerName: "SN", type: "number", flex: 0.05 },
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
  const [selectedRows, setSelectedRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRowData, setModalRowData] = useState("default row data");

  const handleRowSelection = (newSelection) => {
    setSelectedRows(newSelection);
  };

  const handleModalOpen = (row) => {
    setModalRowData(row);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalRowData(null);
  };

  const updatedColumns = [
    ...columns,
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.1,
      renderCell: (params) => (
        <IconButton
          aria-label="info"
          onClick={() => handleModalOpen(params.row)}
        >
          <InfoIcon />
        </IconButton>
      ),
    },
  ];
  return (
    <div id="page_content">
      <AppBar />
      <div id={styles.table_container}>
        {" "}
        <div class="header_title">
          {" "}
          <h1>Student Board</h1>
        </div>
        <Table
          columns={updatedColumns}
          rows={rows}
          onRowSelection={handleRowSelection}
        />
      </div>
      <Button title={"Delete"} disabled={selectedRows.length === 0} />
      <Modal
        open={modalOpen}
        handleClose={handleModalClose}
        rowData={modalRowData}
      />
    </div>
  );
}

export default StudentView;
