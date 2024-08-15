import React, { useState, useEffect } from "react";

import AppBar from "../Components/AppBar";
import Table from "../Components/ViewTable";
import Button from "../Components/Button";
import styles from "../Styles/css/Table.module.css";
import Modal from "../Components/ChangePasswordModal";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import { Typography, Box } from "@mui/material";
import { useMediaQueryContext } from "../store/MediaQueryContext";
import { putStudent, getStudents } from "../Apis/Api/User";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function createData(sn, gender, name, birth, id, grade) {
  return { sn, gender, name, birth, id, grade };
}

function ChangePassword() {
  // const [selectedRows, setSelectedRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRowData, setModalRowData] = useState("default row data");
  const [alert, setAlert] = useState(false);
  const [checkedRowId, setCheckedRowId] = useState(null);
  const [checkedRowData, setCheckedRowData] = useState(null);
  const [allStudentData, setAllStudentDatas] = useState([]);
  const [rows, setRows] = useState([]);
  const { isSmallScreen } = useMediaQueryContext();

  useEffect(() => {
    getStudents().then((result) => {
      setAllStudentDatas(result);
      if (result.length > 0) {
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
      }
    });
  }, []);

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
    setCheckedRowData(
      allStudentData.filter((item) => item.loginId === _loginId)[0]
    );
    console.log("CHECKED: ", checkedRowData);
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
          checked={checkedRowId === params.row.id}
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
          id={isSmallScreen ? "" : "table_body"}
          onRowClick={handleRowSelection}
          onRowDoubleClick={(params) => handleModalOpen(params.row)}
          getRowId={(row) => row.sn}
          isRadioButton={true}
          checkedRows={(params) => null}
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
        rowData={checkedRowData}
        rowsHeader={columns}
      />
    </div>
  );
}

export default ChangePassword;
