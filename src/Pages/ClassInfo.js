import React, { useState, useEffect } from "react";

import AppBar from "../Components/AppBar";
import Table from "../Components/ViewTable";
import CourseTable from "../Components/Table";
import styles from "../Styles/css/Table.module.css";

import InfoIcon from "@mui/icons-material/Info";
import Modal from "../Components/Modal";
import { Typography, Box } from "@mui/material";
import InfoBox from "../Components/InfoBox";
import { useMediaQueryContext } from "../store/MediaQueryContext";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getClassStudent, getClassTeacher } from "../Apis/Api/Class";
import { getClassCourse, getCourseTeachers } from "../Apis/Api/Course";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

//id: courseId임
function createCourseData(year, grade, section, subject, teacher, id) {
  return { year, grade, section, subject, teacher, id };
}
function ClassInfo() {
  // const [selectedRows, setSelectedRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRowData, setModalRowData] = useState("default row data");
  const [alert, setAlert] = useState(false);
  const [checkedRows, setCheckedRows] = useState([]);
  const [courseRows, setCourseRows] = useState([]);
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
          flex: 0.1,
          cellClassName: styles.centerAlign,
        },
        { field: "name", headerName: "Name", flex: 0.15 },
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
    { field: "sex", headerName: "Gender", flex: 0.1 },
    { field: "birth", headerName: "Birth", flex: 0.1 },
    { field: "id", headerName: "ID", flex: 0.2 },
    { field: "grade", headerName: "Grade", flex: 0.3 },

    { field: "phoneNum", headerName: "Phone" },
  ];

  const courseColumns = [
    !isSmallScreen && { field: "year", headerName: "Batch", flex: 0.1 },
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
      } else {
        setTotalRowCount(0);
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
  const fetchCourseTeachers = (courseId) => {
    return getCourseTeachers(courseId).then((result) => {
      console.log("item", result);
      if (result && result.data.userResponse) {
        console.log("item", result.data.userResponse);
        const userResponses = Array.isArray(result.data.userResponse)
          ? result.data.userResponse
          : [result.data.userResponse];

        const teachers = userResponses
          .filter((item) => item.role === "ROLE_TEACHER")
          .map((item) => ({
            username: item.username,
            name: item.name,
          }));

        return teachers; // 여기서 teachers 배열을 반환
      } else {
        return []; // 교사가 없을 경우 빈 배열 반환
      }
    });
  };
  const fetchCourse = () => {
    getClassCourse(classData.classId, page, pageSize).then(async (result) => {
      if (result && result.content) {
        const coursePromises = result.content.map(async (courseItem) => {
          const teachers = await fetchCourseTeachers(courseItem.courseId);
          console.log("tea", teachers);
          if (teachers) {
            const teacherName = teachers[0].name;

            return createCourseData(
              courseItem.classResponse.year,
              courseItem.classResponse.grade,
              courseItem.classResponse.section,
              courseItem.subjectResponseDTO.name,
              teacherName,
              courseItem.courseId
            );
          } else {
            return createCourseData(
              courseItem.classResponse.year,
              courseItem.classResponse.grade,
              courseItem.classResponse.section,
              courseItem.subjectResponseDTO.name,
              "",
              courseItem.courseId
            );
          }
        });
        // 모든 courseItem의 정보를 Promise.all로 처리
        const NewCourses = await Promise.all(coursePromises);

        setCourseRows(NewCourses);
      } else {
        console.log("course fetch failed");
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
    fetchCourse();
  }, [classData]);
  return (
    <div id="page_content">
      <AppBar />

      <div id={styles.table_container}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 0,
            // marginBottom: 3,
          }}
        >
          <Typography
            variant={isSmallScreen ? "h5" : "h3"}
            sx={{
              fontFamily: "Copperplate",
            }}
          >
            Class Info
          </Typography>
        </Box>
        <InfoBox
          batch={classData.year}
          grade={classData.grade}
          section={classData.section}
          teacher={classTeacher.length != 0 ? classTeacher : "Not assigned yet"}
          studentCount={totalRowCount}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 5,
            marginBottom: 2,
          }}
        >
          <Typography
            component="div"
            variant={isSmallScreen ? "h5" : "h3"}
            sx={{
              fontFamily: "Copperplate",
            }}
          >
            Course Info
          </Typography>
        </Box>
        <Box
          sx={{
            overflowY: "none", // 스크롤 추가
            padding: "10px", // 패딩 추가 (선택사항)
          }}
        >
          <CourseTable
            columns={courseColumns}
            rows={courseRows}
            onRowSelection={handleRowSelection}
            isReadOnly={true}
            getRowId={(row) => row.id}
            id={isSmallScreen ? "" : "table_body"}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 5,
            marginBottom: 2,
          }}
        >
          <Typography
            variant={isSmallScreen ? "h5" : "h3"}
            sx={{
              fontFamily: "Copperplate",
            }}
          >
            Student Info
          </Typography>
        </Box>
        <Box
          sx={{
            overflowY: "none", // 스크롤 추가
            padding: "10px", // 패딩 추가 (선택사항)
          }}
        >
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
        </Box>
        &nbsp;
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

export default ClassInfo;
