import React, { useState, useEffect } from "react";

import AppBar from "../Components/AppBar";
import Table from "../Components/ViewTable";
import Button from "../Components/Button";
import styles from "../Styles/css/Table.module.css";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";

import Modal from "../Components/Modal";
import { Typography, Box } from "@mui/material";
import { useMediaQueryContext } from "../store/MediaQueryContext";
import { getStudents, deleteStudent, getStudent } from "../Apis/Api/User";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRowData, setModalRowData] = useState("default row data");
  const [alert, setAlert] = useState(false);
  const [checkedRows, setCheckedRows] = useState([]);
  const [rows, setRows] = useState([]);
  const { isSmallScreen } = useMediaQueryContext();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(100);
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

        { field: "id", headerName: "ID", flex: 0.35 },
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
      console.log("????", result);
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
  useEffect(() => {
    fetchStudents(page, pageSize);
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
        <Box>
          <Typography
            variant={isSmallScreen ? "h5" : "h3"}
            sx={{
              textAlign: isSmallScreen ? "left" : "center",
              fontFamily: "Copperplate",
              marginTop: isSmallScreen ? "5px" : "10px",
              marginBottom: isSmallScreen ? "10px" : "30px",
              marginLeft: isSmallScreen ? "10px" : "",
            }}
          >
            Student Board
          </Typography>
        </Box>
        <Table
          columns={isSmallScreen ? basic_columns : updatedColumns}
          rows={rows}
          totalRowCount={totalRowCount}
          onSelectedAllRow={handleRowSelection}
          onRowDoubleClick={handleRowDoubleClick}
          getRowId={(row) => row.id}
          id={isSmallScreen ? "" : "table_body"}
          isStudentTable={true} //row클릭시 체크박스 활성화 안되게 하기위해 커스텀
          onPageChange={handlePageChange} // 페이지 변경 핸들러 추가
          onPageSizeChange={handlePageSizeChange} // 페이지 크기 변경 핸들러 추가
        />
        {isSmallScreen ? (
          <div>&nbsp;</div>
        ) : (
          <Button
            title={"Delete"}
            disabled={checkedRows.length === 0}
            onClick={deleteRow}
            id={"view_btn"}
            size={"bg"}
          />
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
