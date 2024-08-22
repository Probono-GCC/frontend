import React, { useState, useEffect } from "react";

import AppBar from "../Components/AppBar";
import Table from "../Components/PaginationTable";
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
import { getStudents, changeGradeApi } from "../Apis/Api/User";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function createData(sn, name, gender, birth, id, grade) {
  return { sn, name, gender, birth, id, grade };
}

function ChangeGrade() {
  const [modalOpen, setModalOpen] = useState(false);
  const [warningModalOpen, setWarningModalOpen] = useState(false);
  const [modalRowData, setModalRowData] = useState("default row data");
  // const [alert, setAlert] = useState(false);
  const [checkedRowId, setCheckedRowId] = useState(null);
  const [checkedRowData, setCheckedRowData] = useState(null);
  const [rows, setRows] = useState([]);
  const [allStudentData, setAllStudentDatas] = useState([]);
  const { isSmallScreen } = useMediaQueryContext();
  //pagination for table
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalRowCount, setTotalRowCount] = useState(0); //서버에서 총 학생수 받아와서 설정

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
    console.log("CHECKED: ", _loginId);
    setCheckedRowId(_loginId);
    setCheckedRowData(_loginId);
  };
  // 페이지 변경 시 처리
  const handlePageChange = (newPage, size) => {
    console.log("page change", newPage, size);
    setPage(newPage);
    fetchStudents(newPage, size);
  };

  // 페이지 크기 변경 시 처리
  const handlePageSizeChange = (page, newSize) => {
    console.log("page change", newSize, page);

    setPageSize(newSize);
    fetchStudents(page, newSize);
  };
  const handleModalOpen = () => {
    console.log("OPENING: ", checkedRowId);
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
        <Radio
          checked={checkedRowId ? checkedRowId.id === params.row.id : null}
          // onChange={() => handleRowSelection(params.row.id)}
        />
      ),
    },
    ...columns,
  ];
  const fetchStudents = (page, pageSize) => {
    getStudents(page, pageSize).then((result) => {
      if (result && result.content) {
        const students = result.content || []; // content 배열 가져오기
        setAllStudentDatas(students);
        console.log(result.totalElements, "??");
        setTotalRowCount(result.totalElements);
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
      } else if (result.response.status == 400) {
        alert("page error");
      }
    });
  };
  const advanceGrade = (prevGrade) => {
    let newGrade;

    // 현재 학년을 기반으로 새로운 학년을 결정
    switch (prevGrade) {
      case "PLAYGROUP":
        newGrade = "NURSERY";
        break;
      case "NURSERY":
        newGrade = "LOWER_KG";
        break;
      case "LOWER_KG":
        newGrade = "UPPER_KG";
        break;
      case "UPPER_KG":
        newGrade = "CLASS1";
        break;
      case "CLASS1":
        newGrade = "CLASS2";
        break;
      case "CLASS2":
        newGrade = "CLASS3";
        break;
      case "CLASS3":
        newGrade = "CLASS4";
        break;
      case "CLASS4":
        newGrade = "CLASS5";
        break;
      case "CLASS5":
        newGrade = "CLASS6";
        break;
      case "CLASS6":
        newGrade = "CLASS7";
        break;
      case "CLASS7":
        newGrade = "CLASS8";
        break;
      case "CLASS8":
        newGrade = "CLASS9";
        break;
      case "CLASS9":
        newGrade = "CLASS10";
        break;
      case "CLASS10":
        newGrade = "GRADUATED";
        break;
      default:
        newGrade = prevGrade; // 학년이 이미 GRADUATED인 경우 그대로 유지
    }
    return newGrade;
  };
  const handleChangeAllGrade = () => {
    // allStudentData.forEach((student) => {
    //   const newGrade = advanceGrade(student.grade);
    //   const updatedGradeData = { grade: newGrade };
    //   changeGradeApi(updatedGradeData, student.username).then((result) => {
    //     if (result && result.grade) {
    //       console.log("page", page, pageSize);
    //       fetchStudents(page, pageSize);
    //       handleClose();
    //     } else if (result && result.response && result.response.status == 400) {
    //       alert("Changing grade failed");
    //     }
    //   });
    // });
  };
  useEffect(() => {
    console.log("page change", page, pageSize);
    fetchStudents(page, pageSize);
  }, []);

  useEffect(() => {
    console.log("checkedrowid", checkedRowId);
    if (checkedRowId) {
      const selectedData = allStudentData.find(
        (item) => item.username === checkedRowId.id
      );
      if (selectedData) {
        setCheckedRowData(selectedData);
        console.log(selectedData, "selectedDta?");
      }
    }
  }, [checkedRowId, allStudentData]);
  return (
    <div id="page_content">
      <AppBar />
      {/* {alert ? (
        <Stack
          sx={{ width: "100%", position: "fixed", top: "65px" }}
          spacing={2}
        >
          <Alert severity="success">Work complete</Alert>
        </Stack>
      ) : (
        <div></div>
      )} */}

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
          totalRowCount={totalRowCount}
          onRowSelection={handleRowSelection}
          onRowSelectedId={() => {}}
          id={isSmallScreen ? "" : "table_body"}
          // onRowClick={handleRowSelection}
          onRowDoubleClick={() => {}}
          getRowId={(row) => row.id}
          isRadioButton={true}
          onPageChange={handlePageChange} // 페이지 변경 핸들러 추가
          onPageSizeChange={handlePageSizeChange} // 페이지 크기 변경 핸들러 추가
          // checkedRows={(params) => null}
        />
        <Grid container>
          <Grid sx={{ display: "flex", justifyContent: "flex-start" }}>
            {isSmallScreen ? (
              <div></div>
            ) : (
              <CustomButton
                disabled={true}
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
          <Button onClick={handleChangeAllGrade}>Agree</Button>
        </DialogActions>
      </Dialog>
      <Modal
        open={modalOpen}
        handleClose={handleModalClose}
        title={"Change Grade"}
        rowData={checkedRowData}
        onSave={() => {
          fetchStudents(page, pageSize);
        }}
      />
    </div>
  );
}

export default ChangeGrade;
