import React, { useState, useEffect } from "react";

import AppBar from "../Components/AppBar";
import Table from "../Components/ViewTable";
import CustomButton from "../Components/Button";
import styles from "../Styles/css/Table.module.css";
import Modal from "../Components/ChangeGradeModal";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import { Typography, Box, Grid } from "@mui/material";
import { useMediaQueryContext } from "../store/MediaQueryContext";
import { getStudents } from "../Apis/Api/User";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function createData(sn, name, gender, birth, id, grade) {
  return { sn, name, gender, birth, id, grade };
}

function ChangeGrade() {
  const [modalOpen, setModalOpen] = useState(false);
  const [warningModalOpen, setWarningModalOpen] = useState(false);
  const [modalRowData, setModalRowData] = useState("default row data");
  const [alert, setAlert] = useState(false);
  const [checkedRowId, setCheckedRowId] = useState(null);
  const [checkedRowData, setCheckedRowData] = useState(null);
  const [rows, setRows] = useState([]);
  const [allStudentData, setAllStudentDatas] = useState([]);
  const { isSmallScreen } = useMediaQueryContext();

  useEffect(() => {
    getStudents().then((result) => {
      console.log(result);
      const students = result.content || []; // content 배열 가져오기
      setAllStudentDatas(students);
      console.log(students);
      if (students.length > 0) {
        const tempRow = students.map((item) =>
          createData(
            item.serialNumber,
            item.name,
            item.sex,
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

  useEffect(() => {
    if (checkedRowId) {
      const selectedData = allStudentData.find(
        (item) => item.username === checkedRowId
      );
      setCheckedRowData(selectedData);
    }
  }, [checkedRowId, allStudentData]);

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

  const handleSelectedRowId = (_loginId) => {
    console.log("CHECKED: ", _loginId);
    setCheckedRowId(_loginId);
  };

  const handleModalOpen = () => {
    console.log("OPENING: ", checkedRowData);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleClickOpen = () => {
    setWarningModalOpen(true);
  };

  const handleClose = () => {
    setWarningModalOpen(false);
  };

  const updatedColumns = [
    {
      field: "check",
      headerName: "",
      flex: 0.05,
      renderCell: (params) => (
        <Radio {...label} checked={checkedRowId === params.row.id} />
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
            Change Grade
          </Typography>
        </Box>

        <Table
          columns={updatedColumns}
          rows={rows}
          onRowSelection={handleSelectedRowId}
          onRowClick={handleSelectedRowId}
          id={isSmallScreen ? "" : "table_body"}
          getRowId={(row) => row.id}
          isRadioButton={true}
          checkedRows={(params) => null}
          onRowDoubleClick={(params) => handleModalOpen(params.row)}
        />
        <Grid container>
          <Grid xs={6} sx={{ display: "flex", justifyContent: "flex-start" }}>
            {isSmallScreen ? (
              <div></div>
            ) : (
              <CustomButton
                title={"Change All Grade"}
                variant="contained"
                color="primary"
                size={"bg"}
                onClick={handleClickOpen}
                id={"left_btn"}
              />
            )}
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <CustomButton
              title={"Change"}
              onClick={handleModalOpen}
              disabled={checkedRowId == null}
              id={"view_btn"}
              size={"bg"}
            />
          </Grid>
        </Grid>
      </div>
      <Dialog
        open={warningModalOpen}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"⚠️WARNING"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            All of section, course information will be deleted. If current grade
            is final grade, the grade value will be “Graduated”.
          </DialogContentText>
          <br />
          <DialogContentText
            id="alert-dialog-slide-description"
            sx={{ color: "red" }}
          >
            If you really want to increase all students’ grade, press the “Yes”
            button.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
      <Modal
        open={modalOpen}
        handleClose={handleModalClose}
        title={"Change Grade"}
        rowData={checkedRowData}
      />
    </div>
  );
}

export default ChangeGrade;
