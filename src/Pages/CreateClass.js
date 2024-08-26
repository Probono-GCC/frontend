import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  MenuItem,
  Paper,
  Select,
  Typography,
  Alert,
  Stack,
  Checkbox,
} from "@mui/material";
import AppBar from "../Components/AppBar";
import CustomButton from "../Components/Button";

import Table from "../Components/Table";
import { postClass, getClasses, deleteClass } from "../Apis/Api/Class";
import { useAuth } from "../store/AuthContext";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const grades = [
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
];

const sections = ["A", "B"];

const NepaliDate = require("nepali-date");
const todayNepaliDate = new NepaliDate();
const currentYear = todayNepaliDate.getYear();

const batchYears = [];
for (let year = currentYear; year <= currentYear + 4; year++) {
  batchYears.push(year);
}

function CreateClass() {
  const [batch, setBatch] = useState("");
  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [checkedRows, setCheckedRows] = useState([]);
  const [allCheckedRows, setAllCheckedRows] = useState([]);

  const [rows, setRows] = useState([]);
  //pagination for table
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const [totalRowCount, setTotalRowCount] = useState(0); //서버에서 총 학생수 받아와서 설정

  const fetchClass = () => {
    getClasses(page, pageSize, currentYear).then((result) => {
      if (result && result.content) {
        const tempRow = result.content.map((item, index) => ({
          id: item.classId, // Assuming an index for table rows
          year: item.year,
          grade: item.grade,
          section: item.section,
          classId: item.classId, // classId를 가져와서 삭제에 활용
        }));
        console.log("temp row?", tempRow);
        setRows(tempRow);
        setTotalRowCount(result.totalElements);
      } else {
        console.log("결과없음", result);
        setRows([]);
      }
    });
  };
  useEffect(() => {
    fetchClass();
    setBatch(batchYears[0]);
  }, []);

  const handleCreate = async () => {
    const newClassData = {
      year: batch,
      grade: grade,
      section: section,
    };
    try {
      postClass(newClassData).then((result) => {
        if (result && result.classId) {
          setRows((prevRows) => [
            ...prevRows,
            { id: prevRows.length + 1, ...result },
          ]);
          console.log(result, "wnddy");
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 2000); // 2초 후 알림 숨김
          setBatch("");
          setGrade("");
          setSection("");
          fetchClass();
        } else if (result && result.response && result.response.status == 409) {
          alert("This class already exists");
        }
      });
    } catch (err) {
      console.error("Failed to create class:", err);
      window.alert("Failed to create class.");
    }
  };

  // const handleRowSelection = (_row) => {
  //   console.log("onselectrow?", _row);
  //   setCheckedRows(_row);
  // };

  const deleteRow = () => {
    try {
      console.log(checkedRows, "delete대상");
      if (Array.isArray(checkedRows)) {
        checkedRows.map((item) => {
          deleteClass({ classId: item })
            .then((result) => {
              setShowAlert(true);
              setTimeout(() => setShowAlert(false), 2000); // 2초 후 알림 숨김
              setCheckedRows([]);
              fetchClass();
            })
            .catch((error) => {
              console.log(error);
            });
        });
      }

      console.log(rows, "현재 남은 row");
      // 성공적으로 삭제되었음을 알림
    } catch (err) {
      console.error("Failed to delete class:", err);
      window.alert("Failed to delete class.");
    }
  };
  const handleClassRowIdSelection = (id) => {
    console.log("rowid???", id);
    setCheckedRows(id);
  };
  const handleClassRowSelection = (data) => {
    console.log("all checked", data);
    setAllCheckedRows(data);
  };
  const columns = [
    { field: "year", headerName: "Batch", flex: 0.25 },
    { field: "grade", headerName: "Grade", flex: 0.25 },
    { field: "section", headerName: "Section", flex: 0.25 },
  ];

  return (
    <div>
      <AppBar />
      {showAlert && (
        <Stack
          sx={{ width: "100%", position: "fixed", top: "65px", zIndex: 10 }}
          spacing={2}
        >
          <Alert severity="success">Operation successful!</Alert>
        </Stack>
      )}
      <Box sx={{ padding: 3 }}>
        <Typography
          variant="h3"
          sx={{ textAlign: "center", fontFamily: "Copperplate", marginTop: 2 }}
        >
          Create Class
        </Typography>
        <Paper sx={{ padding: 3, marginTop: 3, boxShadow: 0 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 2,
              flexWrap: "wrap",
            }}
          >
            <Select
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              displayEmpty
              sx={{ marginRight: 2, minWidth: 120, flex: 1 }}
            >
              <MenuItem value="" disabled>
                Batch
              </MenuItem>
              {batchYears.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
            <Select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              displayEmpty
              sx={{ marginRight: 2, minWidth: 150, flex: 1 }}
            >
              <MenuItem value="" disabled>
                Grade
              </MenuItem>
              {grades.map((grade) => (
                <MenuItem key={grade.value} value={grade.value}>
                  {grade.label}
                </MenuItem>
              ))}
            </Select>
            <Select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              displayEmpty
              sx={{ marginRight: 2, minWidth: 100, flex: 1 }}
            >
              <MenuItem value="" disabled>
                Section
              </MenuItem>
              {sections.map((section) => (
                <MenuItem key={section} value={section}>
                  {section}
                </MenuItem>
              ))}
            </Select>
            <CustomButton
              title={"Create"}
              disabled={!batch || !grade || !section}
              onClick={handleCreate}
            />
          </Box>
          <Divider sx={{ marginTop: 5, marginBottom: 5 }} />
          <Table
            columns={columns}
            rows={rows}
            totalRowCount={totalRowCount}
            onRowSelectedId={handleClassRowIdSelection}
            onRowSelection={handleClassRowSelection}
            getRowId={(row) => row.id}
            // onRowSelectedId={(rowId) => handleClassRowIdSelection(rowId)}
            // checkedRows={checkedRows}
            isRadioButton={false}
            id={"student_select_body"}
          />
          {/* <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          > */}
          <CustomButton
            title={"Delete"}
            id={"view_btn"}
            size={"bg"}
            onClick={deleteRow}
            disabled={checkedRows && checkedRows.length === 0}
          />
          &nbsp;
          {/* </Box> */}
        </Paper>
        &nbsp;
      </Box>
    </div>
  );
}

export default CreateClass;
