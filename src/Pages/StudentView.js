import React, { useState, useNavigate } from "react";

import AppBar from "../Components/AppBar";
import Table from "../Components/Table";

import styles from "../Styles/css/Table.module.css";
const columns = [
  { field: "sn", headerName: "SN", type: "number", flex: 0.05 },
  { field: "name", headerName: "Name", flex: 0.2 },
  { field: "gender", headerName: "Gender", flex: 0.1 },
  { field: "birth", headerName: "Birth", flex: 0.1 },
  { field: "id", headerName: "ID", flex: 0.2 },
  { field: "grade", headerName: "Grade", flex: 0.3 },
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

function StudentView() {
  return (
    <div>
      <AppBar />
      <div id={styles.table_container}>
        {" "}
        <div class="header_title">
          {" "}
          <h1>Student Board</h1>
        </div>
        <Table columns={columns} rows={rows} />
      </div>
    </div>
  );
}

export default StudentView;
