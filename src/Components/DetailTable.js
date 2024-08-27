import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useMediaQueryContext } from "../store/MediaQueryContext";

export default function DetailTable({ data, rowsHeader }) {
  const { isSmallScreen } = useMediaQueryContext();

  useEffect(() => {
    // console.log("data", data, "rowHeader", rowsHeader);
  }, [data]);

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table
        sx={{ minWidth: isSmallScreen ? "250px" : 400, minHeight: 240 }}
        aria-label="simple table"
      >
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
                width="115px"
              >
                {rowHeader.headerName}
              </TableCell>

              <TableCell align="left">
                {data && data[rowHeader.field] ? data[rowHeader.field] : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
