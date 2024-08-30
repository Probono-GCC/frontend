import React, { useState, useEffect } from "react";

import AppBar from "../Components/AppBar";
import Table from "../Components/ViewTable";
import Button from "../Components/Button";
import styles from "../Styles/css/Table.module.css";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import * as XLSX from "xlsx";

import Modal from "../Components/Modal";
import { Typography, Box } from "@mui/material";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useMediaQueryContext } from "../store/MediaQueryContext";
import { getStudents, deleteStudent, getGradeStudents } from "../Apis/Api/User";
import { useTranslation } from "react-i18next";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function createData(
  serialNumber,
  gender,
  name,
  birth,
  id,
  grade,

  phone_num,
  motherPhoneNum,
  fatherPhoneNum,
  guardiansPhoneNum
) {
  return {
    serialNumber,
    gender,
    name,
    birth,
    id,
    grade,
    phone_num,
    motherPhoneNum,
    fatherPhoneNum,
    guardiansPhoneNum,
  };
}

function StudentView() {
  const { t } = useTranslation();
  const [grade, setGrade] = useState("ALL");
  const grades = [
    { value: "ALL", label: "ALL" },
    { value: "PLAYGROUP", label: "PlayGroup" },
    { value: "NURSERY", label: "Nursery" },
    { value: "LOWER_KG", label: "LowerKG" },
    { value: "UPPER_KG", label: "UpperKG" },
    { value: "CLASS1", label: "Class 1" },
    { value: "CLASS2", label: "Class 2" },
    { value: "CLASS3", label: "Class 3" },
    { value: "CLASS4", label: "Class 4" },
    { value: "CLASS5", label: "Class 5" },
    { value: "CLASS6", label: "Class 6" },
    { value: "CLASS7", label: "Class 7" },
    { value: "CLASS8", label: "Class 8" },
    { value: "CLASS9", label: "Class 9" },
    { value: "CLASS10", label: "Class 10" },
    { value: "GRADUATED", label: "Graduated" },
  ];
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRowData, setModalRowData] = useState("default row data");
  const [alert, setAlert] = useState(false);
  const [checkedRows, setCheckedRows] = useState([]);
  const [rows, setRows] = useState([]);
  const { isSmallScreen } = useMediaQueryContext();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(400);
  const [totalRowCount, setTotalRowCount] = useState(0); //서버에서 총 학생수 받아와서 설정
  //student view default table column
  const basic_columns = isSmallScreen
    ? [
        {
          field: "serialNumber",
          headerName: "SN",
          flex: 0.3,
          cellClassName: styles.centerAlign,
        },
        { field: "name", headerName: "Name", flex: 0.35 },

        { field: "id", headerName: "Username", flex: 0.35 },
      ]
    : [
        {
          field: "serialNumber",
          headerName: "SN",
          flex: 0.1,
          cellClassName: styles.centerAlign,
        },
        { field: "name", headerName: "Name", flex: 0.15 },
        { field: "gender", headerName: "Gender", flex: 0.1 },
        { field: "birth", headerName: "Birth", flex: 0.1 },
        { field: "id", headerName: "ID", flex: 0.2 },
        { field: "grade", headerName: "Grade", flex: 0.3 },
      ];
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
    ...basic_columns,
  ];
  //student detail modal에 들어가는 col
  const detail_columns = [
    {
      field: "serialNumber",
      headerName: "SN",
      flex: 0.05,
      cellClassName: styles.centerAlign,
    },
    { field: "name", headerName: "Name", flex: 0.2 },
    { field: "gender", headerName: "Gender", flex: 0.1 },
    { field: "birth", headerName: "Birth", flex: 0.1 },
    { field: "id", headerName: "ID", flex: 0.2 },
    { field: "grade", headerName: "Grade", flex: 0.3 },

    { field: "phone_num", headerName: "Phone" },
    { field: "motherPhoneNum", headerName: "mother Ph" },
    { field: "fatherPhoneNum", headerName: "father Ph" },
    { field: "guardiansPhoneNum", headerName: "guardian Ph" },
  ];
  // 페이지 변경 시 처리
  const handlePageChange = (newPage, size) => {
    setPage(newPage);
    fetchStudents(newPage, size);
  };

  // 페이지 크기 변경 시 처리
  const handlePageSizeChange = (page, newSize) => {
    setPageSize(newSize);
    fetchStudents(page, newSize);
  };
  const handleRowSelection = (id) => {
    console.log(id, "idtyupe");
    if (!Array.isArray(id)) {
      console.log(id, "idtyupe");
      setCheckedRows((prevCheckedRows) => {
        if (prevCheckedRows.includes(id)) {
          // 이미 존재하는 id면 배열에서 제거
          const newCheckedRows = prevCheckedRows.filter(
            (rowId) => rowId !== id
          );
          console.log("업데이트된 선택된 행:", newCheckedRows);
          return newCheckedRows;
        } else {
          // 존재하지 않으면 배열에 추가
          const newCheckedRows = [...prevCheckedRows, id];
          console.log("업데이트된 선택된 행:", newCheckedRows);
          return newCheckedRows;
        }
      });
    }
  };

  const handleModalOpen = (row) => {
    setModalRowData(row);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalRowData(null);
  };

  const handleRowDoubleClick = (params) => {
    handleModalOpen(params.row);
  };
  const handleExportToExcel = () => {
    const exportData = rows.map((row) => ({
      SN: row.serialNumber,
      Name: row.name,
      Username: row.id,
      Grade: row.grade,
    }));

    // Create a new workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    // Export the workbook to an Excel file
    XLSX.writeFile(workbook, "CLA_Students_List.xlsx");
  };

  const handleGradeChange = (event) => {
    setGrade(event.target.value);
    console.log("다시받아오기");
    // if (event.target.value != "ALL") {
    //   fetchGradeStudents(event.target.value, page, pageSize);
    // } else {
    //   fetchStudents(page, pageSize);
    // }
  };
  const deleteRow = async () => {
    try {
      // 선택된 각 행에 대해 삭제 로직을 수행
      checkedRows.forEach((userId) => {
        deleteStudent(userId).then((result) => {
          console.log(result);

          if (result.status == 200) {
            fetchStudents(page, pageSize);
            setCheckedRows([]);
            setAlert(true);
            setTimeout(() => setAlert(false), 2000); // 2초 후 알림 숨김
          }
        });
      });

      // 삭제된 행을 rows에서 제거
      setRows((prevRows) =>
        prevRows.filter((row) => !checkedRows.includes(row.serialNumber))
      );
    } catch (error) {
      console.error("Error deleting rows:", error);
    }
  };

  const fetchStudents = (page, pageSize) => {
    getStudents(page, pageSize).then((result) => {
      // console.log("????", result);
      const students = result.content || []; // content 배열 가져오기
      // console.log(students);
      setTotalRowCount(result.totalElements);
      if (students.length > 0) {
        const tempRow = students.map((item) =>
          createData(
            item.serialNumber,
            item.sex,
            item.name,
            item.birth,
            item.username,
            item.grade,

            item.phoneNum,
            item.motherPhoneNum,
            item.fatherPhoneNum,
            item.guardiansPhoneNum
          )
        );
        setRows(tempRow);
      } else {
        setRows([]);
      }
    });
  };
  const fetchGradeStudents = (grade, page, pageSize) => {
    getGradeStudents(grade, page, pageSize).then((result) => {
      const students = result.content || []; // content 배열 가져오기
      console.log(students);
      setTotalRowCount(result.totalElements);
      if (students.length > 0) {
        const tempRow = students.map((item) =>
          createData(
            item.serialNumber,
            item.sex,
            item.name,
            item.birth,
            item.username,
            item.grade,

            item.phoneNum,
            item.motherPhoneNum,
            item.fatherPhoneNum,
            item.guardiansPhoneNum
          )
        );
        setRows(tempRow);
      } else {
        setRows([]);
      }
    });
  };
  useEffect(() => {
    if (grade === "ALL") {
      fetchStudents(page, pageSize);
    } else {
      fetchGradeStudents(grade, page, pageSize);
    }
  }, [grade]);

  return (
    <div id="page_content">
      <AppBar />
      {alert ? (
        <Stack
          sx={{ width: "100%", position: "fixed", top: "65px" }}
          spacing={2}
        >
          <Alert severity="success">Success.</Alert>
        </Stack>
      ) : (
        <div></div>
      )}

      <div id={styles.table_container}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between", // 전체 영역에서 Select와 가운데 Typography 간의 여유 공간을 확보
            position: "relative",
            width: "90vw",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: isSmallScreen ? "block" : "flex", // 작은 화면에서는 세로 배치, 큰 화면에서는 가로 배치
              alignItems: isSmallScreen ? "start" : "center", // 작은 화면에서 각 요소를 시작 부분에 맞추기
              textAlign: isSmallScreen ? "center" : "left", // 작은 화면에서 텍스트 중앙 정렬
            }}
          >
            <Typography
              variant={isSmallScreen ? "h6" : "h3"}
              sx={{
                fontFamily: "Copperplate",
                marginTop: isSmallScreen ? "5px" : "10px",
                marginBottom: isSmallScreen ? "10px" : "30px",
                textAlign: "center", // 작은 화면에서 중앙 정렬
              }}
            >
              {t("Student Board")}
            </Typography>
          </div>
          <FormControl
            sx={{
              m: isSmallScreen ? 0 : 1,
              width: isSmallScreen ? "120px" : "150px",
              marginBottom: isSmallScreen ? "10px" : "0", // 작은 화면에서 아래 여백 추가
            }}
          >
            <Select
              value={grade}
              onChange={handleGradeChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              sx={{ height: "5vh" }}
            >
              {grades.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box
          sx={{
            padding: "10px",
          }}
        >
          <Table
            columns={isSmallScreen ? basic_columns : updatedColumns}
            rows={rows}
            totalRowCount={totalRowCount}
            onSelectedAllRow={handleRowSelection}
            onRowDoubleClick={handleRowDoubleClick}
            getRowId={(row) => row.id}
            id={isSmallScreen ? "" : "table_body"}
            isStudentTable={true} //row클릭시 체크박스 활성화 안되게 하기위해 커스텀
            // onPageChange={handlePageChange} // 페이지 변경 핸들러 추가
            // onPageSizeChange={handlePageSizeChange} // 페이지 크기 변경 핸들러 추가
          />
        </Box>
        {isSmallScreen ? (
          <div>&nbsp;</div>
        ) : (
          <Box
            sx={{
              position: "relative",
              margin: "50px 5vw",
              display: "flex",
              textAlign: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              size="bg"
              title={"Export Excel"}
              id={"cancel"}
              onClick={handleExportToExcel}
            />
            <Button
              title={"Delete"}
              disabled={checkedRows.length === 0}
              onClick={deleteRow}
              id={"view_btn"}
              size={"bg"}
            />
          </Box>
        )}
      </div>

      <Modal
        open={modalOpen}
        handleClose={handleModalClose}
        title={"Student Detail Info"}
        rowData={modalRowData}
        rowsHeader={detail_columns}
      />
    </div>
  );
}

export default StudentView;
