import React, { useState } from "react";

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

function ChangeGrade() {
  // const [selectedRows, setSelectedRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [warningModalOpen, setWarningModalOpen] = useState(false);
  const [modalRowData, setModalRowData] = useState("default row data");
  const [alert, setAlert] = useState(false);
  const [checkedRowId, setCheckedRowId] = useState(null); // 단일 값으로 변경
  const [checkedRowData, setCheckedRowData] = useState(null);
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
  //table의 선택된 row id를 checkedRowId 변수에 저장
  const handleSelectedRowId = (id) => {
    console.log("id", id);
    setCheckedRowId(id);
  };

  //table의 선택된 row data를 checkedRowData 변수에 저장
  const handleSelectedRowData = (params) => {
    console.log(params, "data");
    setCheckedRowData(params);
  };
  //change grade 모달 open함수 호출
  const handleModalOpen = () => {
    setModalRowData(checkedRowId);
    setModalOpen(true);
  };

  //모달 닫기 함수
  const handleModalClose = () => {
    setModalOpen(false);
    setModalRowData(null);
  };

  //change all grade 경고 모달 open

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
          onRowSelection={handleSelectedRowId} //라디오 버튼과 같은 선택 상자가 클릭 될 때의 event
          // onRowSelectionData={handleSelectedRowData}
          id={isSmallScreen ? "" : "table_body"}
          getRowId={(row) => row.sn}
          isRadioButton={true}
          checkedRows={(params) => setCheckedRowData(params)}
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
        rowsHeader={columns}
      />
    </div>
  );
}

export default ChangeGrade;
