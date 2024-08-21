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
import Table from "../Components/Table";
import { postClass, getClasses, deleteClass } from "../Apis/Api/Class";

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
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setBatch(batchYears[0]);

    // Fetching class data when the component mounts
    getClasses(currentYear).then((result) => {
      if (result && result.content) {
        const tempRow = result.content.map((item, index) => ({
          id: index + 1, // Assuming an index for table rows
          year: item.year,
          grade: item.grade,
          section: item.section,
          classId: item.classId, // classId를 가져와서 삭제에 활용
        }));
        setRows(tempRow);
      } else {
        setRows([]);
      }
    });
  }, [checkedRows]);

  const handleCreate = async () => {
    const newClassData = {
      year: batch,
      grade: grade,
      section: section,
    };
    try {
      const response = await postClass(newClassData);
      setRows((prevRows) => [
        ...prevRows,
        { id: prevRows.length + 1, ...response },
      ]);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000); // 2초 후 알림 숨김
      setBatch("");
      setGrade("");
      setSection("");
    } catch (err) {
      console.error("Failed to create class:", err);
      window.alert("Failed to create class.");
    }
  };

  const handleRowSelection = (_row) => {
    console.log("onselectrow?", _row);
    setCheckedRows(_row);
  };

  const deleteRow = async () => {
    try {
      for (const id of checkedRows) {
        if (id) {
          deleteClass({ classId: rows[id - 1].classId })
            .then((result) => {
              setShowAlert(true);
              setTimeout(() => setShowAlert(false), 2000); // 2초 후 알림 숨김
              setCheckedRows([]);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }

      console.log(rows, "현재 남은 row");
      // 성공적으로 삭제되었음을 알림
    } catch (err) {
      console.error("Failed to delete class:", err);
      window.alert("Failed to delete class.");
    }
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
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreate}
              sx={{ flex: "none" }}
            >
              Create
            </Button>
          </Box>
          <Divider sx={{ marginTop: 5, marginBottom: 5 }} />
          <Table
            columns={columns}
            rows={rows}
            checkboxSelection
            // onSelectionModelChange={handleRowSelection}
            onRowSelection={handleRowSelection}
            getRowId={(row) => row.id}
            // checkedRows={checkedRows}
            isRadioButton={false}
          />
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 3 }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: checkedRows.length > 0 ? "#1976d2" : "#d8edff",
                color: checkedRows.length > 0 ? "#fff" : "#1976d2",
              }}
              onClick={deleteRow}
              disabled={checkedRows.length === 0}
            >
              DELETE
            </Button>
          </Box>
        </Paper>
      </Box>
    </div>
  );
}

export default CreateClass;
