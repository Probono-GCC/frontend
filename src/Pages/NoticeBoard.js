import React, { useState } from "react";
import AppBar from "../Components/AppBar";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useMediaQueryContext } from "../store/MediaQueryContext";

function createData(title, date, grade, author, viewCount) {
  return { title, date, grade, author, viewCount };
}

const rows = [
  createData("Midterm Notice", "2024. 04. 24.", "All", "Admin", 123),
  createData("School Aniversary", "2024. 04. 21.", "All", "Admin", 256),
  createData("Library Open", "2023. 04. 04.", "All", "Admin", 7890),
  createData("Summer Camp", "2023. 03. 03.", "All", "Admin", 456),
  createData("Parent Meeting", "2023. 02. 02.", "All", "Admin", 678),
  createData("Event Notice", "2023. 11. 1x1.", "All", "Admin", 345),
  createData("Holiday Announcement", "2023. 10. 10.", "All", "Admin", 567),
  createData("New Curriculum", "2023. 09. 09.", "All", "Admin", 789),
  createData("Exam Schedule", "2023. 08. 08.", "All", "Admin", 890),
  createData("Field Trip", "2023. 07. 07.", "All", "Admin", 3456),
  createData("Extra Class", "2023. 06. 06.", "All", "Admin", 234),
  createData("New Teacher", "2023. 05. 05.", "All", "Admin", 1234),
  createData("Library Open", "2023. 04. 04.", "All", "Admin", 7890),
  createData("Summer Camp", "2023. 03. 03.", "All", "Admin", 456),
  createData("Parent Meeting", "2023. 02. 02.", "All", "Admin", 678),
  createData("Extra Class", "2023. 06. 06.", "All", "Admin", 234),
  createData("New Teacher", "2023. 05. 05.", "All", "Admin", 1234),
  createData("Library Open", "2023. 04. 04.", "All", "Admin", 7890),
  createData("Summer Camp", "2023. 03. 03.", "All", "Admin", 456),
  createData("Parent Meeting", "2023. 02. 02.", "All", "Admin", 678),
  createData("Midterm Notice", "2024. 04. 24.", "All", "Admin", 123),
  createData("School Aniversary", "2024. 04. 21.", "All", "Admin", 256),
  createData("Library Open", "2023. 04. 04.", "All", "Admin", 7890),
  createData("Summer Camp", "2023. 03. 03.", "All", "Admin", 456),
  createData("Parent Meeting", "2023. 02. 02.", "All", "Admin", 678),
  createData("Event Notice", "2023. 11. 11.", "All", "Admin", 345),
  createData("Holiday Announcement", "2023. 10. 10.", "All", "Admin", 567),
  createData("New Curriculum", "2023. 09. 09.", "All", "Admin", 789),
  createData("Exam Schedule", "2023. 08. 08.", "All", "Admin", 890),
  createData("Field Trip", "2023. 07. 07.", "All", "Admin", 3456),
  createData("Extra Class", "2023. 06. 06.", "All", "Admin", 234),
  createData("New Teacher", "2023. 05. 05.", "All", "Admin", 1234),
  createData("Library Open", "2023. 04. 04.", "All", "Admin", 7890),
  createData("Summer Camp", "2023. 03. 03.", "All", "Admin", 456),
  createData("Parent Meeting", "2023. 02. 02.", "All", "Admin", 678),
  createData("Extra Class", "2023. 06. 06.", "All", "Admin", 234),
  createData("New Teacher", "2023. 05. 05.", "All", "Admin", 1234),
  createData("Library Open", "2023. 04. 04.", "All", "Admin", 7890),
  createData("Summer Camp", "2023. 03. 03.", "All", "Admin", 456),
  createData("Parent Meeting", "2023. 02. 02.", "All", "Admin", 678),
  createData("Midterm Notice", "2024. 04. 24.", "All", "Admin", 123),
  createData("School Aniversary", "2024. 04. 21.", "All", "Admin", 256),
  createData("Library Open", "2023. 04. 04.", "All", "Admin", 7890),
  createData("Summer Camp", "2023. 03. 03.", "All", "Admin", 456),
  createData("Parent Meeting", "2023. 02. 02.", "All", "Admin", 678),
  createData("Event Notice", "2023. 11. 11.", "All", "Admin", 345),
  createData("Holiday Announcement", "2023. 10. 10.", "All", "Admin", 567),
  createData("New Curriculum", "2023. 09. 09.", "All", "Admin", 789),
  createData("Exam Schedule", "2023. 08. 08.", "All", "Admin", 890),
  createData("Field Trip", "2023. 07. 07.", "All", "Admin", 3456),
  createData("Extra Class", "2023. 06. 06.", "All", "Admin", 234),
  createData("New Teacher", "2023. 05. 05.", "All", "Admin", 1234),
  createData("Library Open", "2023. 04. 04.", "All", "Admin", 7890),
  createData("Summer Camp", "2023. 03. 03.", "All", "Admin", 456),
  createData("Parent Meeting", "2023. 02. 02.", "All", "Admin", 678),
  createData("Extra Class", "2023. 06. 06.", "All", "Admin", 234),
  createData("New Teacher", "2023. 05. 05.", "All", "Admin", 1234),
  createData("Library Open", "2023. 04. 04.", "All", "Admin", 7890),
  createData("Summer Camp", "2023. 03. 03.", "All", "Admin", 456),
];

function NoticeBoard() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const { isSmallScreen } = useMediaQueryContext();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleNewPost = () => {
    navigate("/notice-new-post-form");
  };

  const handlePreviousGroup = () => {
    setPage((prevPage) => Math.max(prevPage - 5, 1));
  };

  const handleNextGroup = () => {
    setPage((prevPage) => Math.min(prevPage + 5, totalPages));
  };

  const handleRowClick = () => {
    navigate("/post");
  };

  const totalPages = Math.ceil(rows.length / itemsPerPage);
  const maxDisplayPages = 5;
  const currentBlock = Math.ceil(page / maxDisplayPages);
  const displayedPages = [];

  for (
    let i = (currentBlock - 1) * maxDisplayPages + 1;
    i <= Math.min(currentBlock * maxDisplayPages, totalPages);
    i++
  ) {
    displayedPages.push(i);
  }

  const displayedRows = rows.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div>
      <AppBar />
      <Box>
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            fontFamily: "Copperplate",
            marginTop: "10px",
            marginBottom: "30px",
          }}
        >
          Notice Board
        </Typography>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          width: isSmallScreen ? "100%" : "80%",
          margin: "0 auto",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Table sx={{ tableLayout: "fixed", width: "100%" }}>
          <TableHead sx={{ backgroundColor: "#d8edff" }}>
            <TableRow>
              <TableCell
                sx={{
                  textAlign: "left",
                  fontWeight: "bold",
                  width: "15%",
                  padding: isSmallScreen ? "16px" : "16px 16px 16px 30px",
                }}
              >
                No
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  fontWeight: "bold",
                  width: isSmallScreen ? "65%" : "40%",
                }}
              >
                Title
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  fontWeight: "bold",
                  width: "20%",
                  padding: "5px",
                }}
              >
                Grade
              </TableCell>
              {isSmallScreen ? (
                <div></div>
              ) : (
                <TableCell
                  sx={{
                    textAlign: "right",
                    fontWeight: "bold",
                    width: "12%",
                    padding: "16px 30px 16px 16px",
                  }}
                >
                  View
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
                onClick={handleRowClick}
              >
                <TableCell
                  sx={{
                    padding: isSmallScreen ? "16px" : "16px 16px 16px 30px",
                    textAlign: "left",
                    borderBottom: "1px solid #e0e0e0",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {rows.length - (index + (page - 1) * itemsPerPage)}
                </TableCell>
                <TableCell
                  sx={{
                    padding: "16px",
                    textAlign: "left",
                    borderBottom: "1px solid #e0e0e0",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {row.title}
                  <Typography
                    variant="body2"
                    sx={{ color: "#999", fontSize: "0.875em" }}
                  >
                    {row.date}
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    padding: "16px",
                    textAlign: "left",
                    borderBottom: "1px solid #e0e0e0",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {row.grade}
                </TableCell>
                {isSmallScreen ? (
                  <div></div>
                ) : (
                  <TableCell
                    sx={{
                      padding: "16px 30px 16px 16px",
                      textAlign: "right",
                      borderBottom: "1px solid #e0e0e0",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row.viewCount}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
        <IconButton onClick={handlePreviousGroup} disabled={page <= 1}>
          <KeyboardDoubleArrowLeftIcon />
        </IconButton>
        <IconButton
          onClick={() => handleChangePage(null, page - 1)}
          disabled={page === 1}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        {displayedPages.map((p) => (
          <Button
            key={p}
            onClick={() => handleChangePage(null, p)}
            sx={{ minWidth: 0, padding: 1, margin: "0 5px" }}
            variant={p === page ? "contained" : "text"}
          >
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {p}
            </Typography>
          </Button>
        ))}
        <IconButton
          onClick={() => handleChangePage(null, page + 1)}
          disabled={page === totalPages}
        >
          <KeyboardArrowRightIcon />
        </IconButton>
        <IconButton onClick={handleNextGroup} disabled={page >= totalPages}>
          <KeyboardDoubleArrowRightIcon />
        </IconButton>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", margin: "20px 10%" }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1b8ef2",
            color: "white",
            "&:hover": { backgroundColor: "#1565c0" },
          }}
          onClick={handleNewPost}
        >
          New
        </Button>
      </Box>
    </div>
  );
}

export default NoticeBoard;
