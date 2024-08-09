import React, { useState } from "react";

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

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function createData(sn, gender, name, birth, id, grade) {
  return { sn, gender, name, birth, id, grade };
}

const rows = [
  createData(1, "Male", "Jon", "20.02.24", "a0000", "PlayGroup"),
  createData(2, "Female", "Cersei", "20.01.04", "a0001", "PlayGroup"),
  createData(3, "Male", "Jaime", "20.12.24", "a0002", "PlayGroup"),
  createData(4, "Male", "Arya", "20.05.27", "a0003", "PlayGroup"),
  createData(5, "Male", "Daenerys", "20.08.14", "a0004", "PlayGroup"),
  createData(6, "Male", "nell", "20.12.24", "a0005", "PlayGroup"),
  createData(7, "Female", "Ferrara", "19.07.05", "b0006", "UnderKG"),
  createData(8, "Female", "Rossini", "19.07.25", "b0007", "UnderKG"),
  createData(9, "Female", "Harvey", "19.07.04", "b0008", "UnderKG"),
];

function ChangePassword() {
  // const [selectedRows, setSelectedRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRowData, setModalRowData] = useState("default row data");
  const [alert, setAlert] = useState(false);
  const [checkedRow, setCheckedRow] = useState(null); // 단일 값으로 변경

  const { isSmallScreen } = useMediaQueryContext();

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
  const handleRowSelection = (id) => {
    setCheckedRow(id);
  };
  const handleModalOpen = (row) => {
    setModalRowData(row);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalRowData(null);
  };
  const goChangePasswordView = (rowData) => {
    handleModalOpen(rowData);
  };
  const updatedColumns = [
    {
      field: "check",
      headerName: "",
      flex: 0.05,
      renderCell: (params) => (
        <Radio
          {...label}
          checked={checkedRow === params.row.id}
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
          id={isSmallScreen ? "" : "table_body"}
          onRowClick={(params) => handleRowSelection(params.row.id)}
          onRowDoubleClick={(params) => handleModalOpen(params.row)}
          getRowId={(row) => row.sn}
          isRadioButton={true}
        />
      </div>
      <Button
        title={"Change"}
        onClick={goChangePasswordView}
        disabled={checkedRow == null}
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

export default ChangePassword;
