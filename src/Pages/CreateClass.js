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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppBar from "../Components/AppBar";
import Table from "../Components/Table"; // Import the Table component
import Checkbox from "@mui/material/Checkbox";

import axios from "axios";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const grades = [
  { value: "PlayGroup", label: "PlayGroup" },
  { value: "Nursery", label: "Nursery" },
  { value: "LowerKG", label: "LowerKG" },
  { value: "UpperKG", label: "UpperKG" },
  { value: "Class1", label: "Class 1" },
  { value: "Class2", label: "Class 2" },
  { value: "Class3", label: "Class 3" },
  { value: "Class4", label: "Class 4" },
  { value: "Class5", label: "Class 5" },
  { value: "Class6", label: "Class 6" },
  { value: "Class7", label: "Class 7" },
  { value: "Class8", label: "Class 8" },
  { value: "Class9", label: "Class 9" },
  { value: "Class10", label: "Class 10" },
];

const sections = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];

const batchYears = [];
for (let year = 2020; year <= 2030; year++) {
  batchYears.push(year);
}

function CreateClass() {
  const navigate = useNavigate();
  const [batch, setBatch] = useState("");
  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");
  const [alert, setAlert] = useState(false);
  const [checkedRows, setCheckedRows] = useState([]);

  const handleCreate = () => {
    // Implement the create functionality here
  };

  const handleRowSelection = (id) => {
    setCheckedRows((prevCheckedRows) =>
      prevCheckedRows.includes(id)
        ? prevCheckedRows.filter((rowId) => rowId !== id)
        : [...prevCheckedRows, id]
    );
  };

  const deleteRow = () => {
    setAlert(true);
    setTimeout(() => setAlert(false), 2000); // Hide the alert after 2 seconds
    setCheckedRows([]);
  };

  const columns = [
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
    { field: "batch", headerName: "Batch", flex: 0.33 },
    { field: "grade", headerName: "Grade", flex: 0.33 },
    { field: "section", headerName: "Section", flex: 0.33 },
  ];

  const rows = [
    { id: 1, batch: "2084", grade: "PlayGroup", section: "A" },
    { id: 2, batch: "2084", grade: "LowerKG", section: "A" },
    { id: 3, batch: "2084", grade: "LowerKG", section: "B" },
    { id: 4, batch: "2084", grade: "UpperKG", section: "A" },
    { id: 5, batch: "2084", grade: "UpperKG", section: "B" },
  ];

  return (
    <div>
      <AppBar />
      {alert && (
        <Stack
          sx={{ width: "100%", position: "fixed", top: "65px", zIndex: 10 }}
          spacing={2}
        >
          <Alert severity="success">Deleted successfully!</Alert>
        </Stack>
      )}
      <Box sx={{ padding: 3 }}>
        <Typography
          variant="h3"
          sx={{ textAlign: "center", fontFamily: "Copperplate", marginTop: 2 }}
        >
          Create Class
        </Typography>
        <Paper sx={{ padding: 3, marginTop: 3 }}>
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
            onRowSelection={handleRowSelection}
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
