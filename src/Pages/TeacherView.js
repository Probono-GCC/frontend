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
import { getTeachers, deleteTeacher } from "../Apis/Api/User"; // deleteTeacher 함수를 가져옵니다.
import { getClassTeacher } from "../Apis/Api/Class";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

function createData(gender, name, birth, id, phone_num) {
  return { gender, name, id, birth, phone_num };
}

function TeacherView() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRowData, setModalRowData] = useState("default row data");
  const [alert, setAlert] = useState(false);

  const [errorAlert, setErrorAlert] = useState(false);
  const [checkedRows, setCheckedRows] = useState([]);
  const [rows, setRows] = useState([]);
  const { isSmallScreen } = useMediaQueryContext();
  //pagination
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const [totalRowCount, setTotalRowCount] = useState(0); //서버에서 총 학생수 받아와서 설정

  // 기본 컬럼 정의
  const basic_columns = isSmallScreen
    ? [
        { field: "id", headerName: "ID", flex: 0.35 },
        { field: "name", headerName: "Name", flex: 0.35 },
        { field: "gender", headerName: "Gender", flex: 0.3 },
      ]
    : [
        { field: "id", headerName: "ID", flex: 0.2 },
        { field: "name", headerName: "Name", flex: 0.2 },
        { field: "gender", headerName: "Gender", flex: 0.1 },
        { field: "birth", headerName: "Birth", flex: 0.1 },
        { field: "phone_num", headerName: "Phone", flex: 0.3 },
      ];

  // 체크박스를 포함한 컬럼 정의
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

  // 상세 정보 모달에 사용되는 컬럼 정의
  const detail_columns = [
    { field: "name", headerName: "Name", flex: 0.2 },
    { field: "gender", headerName: "Gender", flex: 0.1 },
    { field: "birth", headerName: "Birth", flex: 0.1 },
    { field: "id", headerName: "ID", flex: 0.2 },
    { field: "phone_num", headerName: "Phone" },
    { field: "home_room", headerName: "Home room" },
  ];

  const handleRowSelection = (id) => {
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
      console.log("checkedros?", checkedRows);
      // 선택된 각 행에 대해 삭제 로직을 수행
      checkedRows.forEach((userId) => {
        deleteTeacher(userId).then((result) => {
          console.log("status?", result);
          if (result && result.status == 200) {
            fetchTeacher(page, pageSize);
            setCheckedRows([]);
            setAlert(true);
            setTimeout(() => setAlert(false), 2000); // 2초 후 알림 숨김
            setRows((prevRows) =>
              prevRows.filter((row) => !checkedRows.includes(row.id))
            );
          }
          if (result && result.response && result.response.status == 500) {
            setErrorAlert(true);
            setTimeout(() => setErrorAlert(false), 2000); // 2초 후 알림 숨김
          }
        });
      });

      // 삭제된 행을 rows에서 제거
    } catch (error) {
      console.error("Error deleting rows:", error);
    }
  };
  const fetchTeacher = () => {
    getTeachers(page, pageSize).then((result) => {
      console.log("teacherinfo", result);
      const teachers = result.content || []; // content 배열 가져오기
      setTotalRowCount(result.totalElements);

      // const homeRoom=getClassTeacher().then((result)=>{
      //   return result.map((teacher) => teacher.username)
      // })
      if (teachers.length > 0) {
        const tempRow = teachers.map((item) =>
          createData(
            item.sex,
            item.name,
            item.birth,
            item.username,
            item.phoneNum
          )
        );
        setRows(tempRow);
      } else {
        setRows([]);
      }
    });
  };
  useEffect(() => {
    fetchTeacher();
  }, []);

  return (
    <div id="page_content">
      <AppBar />
      {alert ? (
        <Stack
          sx={{ width: "100%", position: "fixed", top: "65px" }}
          spacing={2}
        >
          <Alert severity="success">Delete Complete.</Alert>
        </Stack>
      ) : (
        <div></div>
      )}
      {errorAlert ? (
        <Stack
          sx={{ width: "100%", position: "fixed", top: "65px" }}
          spacing={2}
        >
          <Alert severity="error">Delete Failed. Try again</Alert>
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
              marginTop: isSmallScreen ? "5px" : "10px",
              marginBottom: isSmallScreen ? "10px" : "30px",
              marginLeft: isSmallScreen ? "10px" : "",
            }}
          >
            Teacher Board
          </Typography>
        </Box>
        <Table
          totalRowCount={totalRowCount}
          columns={isSmallScreen ? basic_columns : updatedColumns}
          rows={rows}
          onSelectedAllRow={handleRowSelection}
          onRowDoubleClick={handleRowDoubleClick}
          getRowId={(row) => row.id}
          id={isSmallScreen ? "" : "table_body"}
          isStudentTable={true} //row클릭시 체크박스 활성화 안되게 하기위해 커스텀
          // columns={isSmallScreen ? basic_columns : updatedColumns}
          // rows={rows}
          // onRowSelection={handleRowSelection}
          // onRowDoubleClick={handleRowDoubleClick}
          // getRowId={(row) => row.id}
          // id={isSmallScreen ? "" : "table_body"}
          // isRadioButton={false}
          // isStudentTable={true} // 필요에 따라 다른 커스텀 플래그를 사용할 수 있습니다.
          // checkedRows={checkedRows} // 체크된 행 상태 전달
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
        title={"Teacher Detail Info"}
        rowData={modalRowData}
        rowsHeader={detail_columns}
      />
    </div>
  );
}

export default TeacherView;
