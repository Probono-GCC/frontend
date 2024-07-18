import React, { useState, useNavigate } from "react";

import AppBar from "../Components/AppBar";
import Table from "../Components/Table";
const columns = [
  { field: "id", headerName: "SN", flex: 0.05 },
  { field: "firstName", headerName: "Name", flex: 0.2 },
  { field: "lastName", headerName: "Gender", flex: 0.1 },
  { field: "birth", headerName: "Age", type: "number", flex: 0.1 },
  { field: "fullName", headerName: "Full name", flex: 0.25 },
  { field: "grade", headerName: "Grade", flex: 0.3 },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

function StudentView() {
  return (
    <div>
      <AppBar />
      <div class="header_title">
        {" "}
        <h1>Student Board</h1>
        <Table columns={columns} rows={rows} />
      </div>
    </div>
  );
}

export default StudentView;
