import React, { useState, useEffect } from "react";

import AppBar from "../Components/AppBar";
import Table from "../Components/ViewTable";
import CourseTable from "../Components/Table";
import Button from "../Components/Button";
import styles from "../Styles/css/Table.module.css";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import InfoIcon from "@mui/icons-material/Info";
import Modal from "../Components/Modal";
import Checkbox from "@mui/material/Checkbox";
import { maxWidth, textAlign } from "@mui/system";
import { Typography, Box } from "@mui/material";
import InfoBox from "../Components/InfoBox";
import { useMediaQueryContext } from "../store/MediaQueryContext";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getClassStudent, getClassTeacher } from "../Apis/Api/Class";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const courseRows = [
  {
    id: 1,
    batch: 2084,
    grade: "Class 10",
    section: "A",
    teacher: "Mozart",
    subject: "Nepali",
  },
  {
    id: 2,
    batch: 2084,
    grade: "Class 10",
    section: "A",
    teacher: "Fermat",
    subject: "Math",
  },
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

function ClassInfo() {
  // const [selectedRows, setSelectedRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRowData, setModalRowData] = useState("default row data");
  const [alert, setAlert] = useState(false);
  const [checkedRows, setCheckedRows] = useState([]);
  const { isSmallScreen } = useMediaQueryContext();
  const [classTeacher, setClassTeachers] = useState([]);
  const [classStudents, setClassStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalRowCount, setTotalRowCount] = useState(0); //서버에서 총 학생수 받아와서 설정

  const location = useLocation();
  const classData = location.state;
  //student view default table column
  const basic_columns = isSmallScreen
    ? [
        {
          field: "serialNumber",
          headerName: "SN",
          flex: 0.25,
          cellClassName: styles.centerAlign,
        },
        { field: "name", headerName: "Name", flex: 0.4 },

        { field: "id", headerName: "ID", flex: 0.35 },
      ]
    : [
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
      ];

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
  ];

  const courseColumns = [
    !isSmallScreen && { field: "batch", headerName: "Batch", flex: 0.1 },
    !isSmallScreen && { field: "grade", headerName: "Grade", flex: 0.2 },
    !isSmallScreen && { field: "section", headerName: "Section", flex: 0.1 },
    {
      field: "teacher",
      headerName: "Teacher",
      flex: isSmallScreen ? 0.5 : 0.3,
      sx: {
        textAlign: "left",
      },
    },
    {
      field: "subject",
      headerName: "Subject",
      flex: isSmallScreen ? 0.5 : 0.1,
      sx: {
        textAlign: "left",
      },
    },
  ].filter(Boolean); // 배열에서 false, null, undefined 제거
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
  const handleRowDoubleClick = (params) => {
    handleModalOpen(params.row);
  };
  const handleRowSelection = (id) => {
    if (!Array.isArray(id)) {
      console.log(id, "idtyupe");
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

  const fetchStudents = (page, pageSize) => {
    getClassStudent(classData.classId, page, pageSize).then((result) => {
      if (result && result.totalElements) {
        console.log(result.totalElements, "전체 클래스 학생?");
        setTotalRowCount(result.totalElements);
      }

      if (result && result.content) {
        const resultStudents = result.content.map((item) => ({
          ...item,
          id: item.username,
        }));
        // console.log(resultStudents);
        setClassStudents(resultStudents);
      }
    });
  };

  useEffect(() => {
    console.log("currentclss", classData, "currentclss");
    getClassTeacher(classData.classId).then((result) => {
      const resultTeachers = result.map((item) => item.name);
      console.log(resultTeachers);
      setClassTeachers(resultTeachers);
    });
    fetchStudents(page, pageSize);
  }, []);
  return (
    <div id="page_content">
      <AppBar />

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
            Class Info
          </Typography>
        </Box>
        <InfoBox
          batch={classData.year}
          grade={classData.grade}
          section={classData.section}
          teacher={classTeacher}
          studentCount={9}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            marginTop: 10,
            marginBottom: 3,
            paddingLeft: "5%",
          }}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{ fontFamily: "Copperplate" }}
          >
            Course Info
          </Typography>
        </Box>
        <CourseTable
          columns={courseColumns}
          rows={courseRows}
          onRowSelection={handleRowSelection}
          isReadOnly={true}
          getRowId={(row) => row.id}
          id={isSmallScreen ? "" : "table_body"}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            marginTop: 10,
            marginBottom: 3,
            paddingLeft: "5%",
          }}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{ fontFamily: "Copperplate" }}
          >
            Student Info
          </Typography>
        </Box>
        <Table
          columns={basic_columns}
          rows={classStudents}
          onSelectedAllRow={handleRowSelection}
          onRowDoubleClick={handleRowDoubleClick}
          getRowId={(row) => row.id}
          totalRowCount={totalRowCount}
          id={isSmallScreen ? "" : "table_body"}
          isStudentTable={true} //row클릭시 체크박스 활성화 안되게 하기위해 커스텀
          onPageChange={handlePageChange} // 페이지 변경 핸들러 추가
          onPageSizeChange={handlePageSizeChange} // 페이지 크기 변경 핸들러 추가
        />
        &nbsp;
      </div>

      <Modal
        open={modalOpen}
        handleClose={handleModalClose}
        title={"Detail Information"}
        rowData={modalRowData}
        rowsHeader={detail_columns}
      />
    </div>
  );
}

export default ClassInfo;
