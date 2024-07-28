import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const rowsHeader = [
  { field: "sn", name: "SN", type: "number" },
  { field: "name", name: "Name" },
  { field: "gender", name: "Gender" },
  { field: "birth", name: "Birth" },
  { field: "id", name: "ID" },
  { field: "grade", name: "Grade" },
];

export default function DetailTable({ data, rowsHeader }) {
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {rowsHeader.map((rowHeader, index) => (
            <TableRow key={index}>
              <TableCell
                sx={{
                  backgroundColor: "#D8EDFF",
                  color: "#1B8EF2",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
                align="left"
                width="100px"
              >
                {rowHeader.headerName}
              </TableCell>

              <TableCell align="left">
                {data && data[rowHeader.field] ? data[rowHeader.field] : "null"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {columns.map((row) => (
            <TableRow
              key={row.field}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.headerName}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody> */}
      </Table>
    </TableContainer>
  );
}
