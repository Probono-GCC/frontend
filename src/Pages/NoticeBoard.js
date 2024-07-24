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
import styles from "../Styles/css/NoticeBoard.module.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

function createData(title, date, grade, author, viewCount) {
  return { title, date, grade, author, viewCount };
}

const rows = [
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleNewPost = () => {
    navigate("/new-post-form");
  };

  const handlePreviousGroup = () => {
    setPage((prevPage) => Math.max(prevPage - 5, 1));
  };

  const handleNextGroup = () => {
    setPage((prevPage) => Math.min(prevPage + 5, totalPages));
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
        <Typography variant="h3" className={styles.title}>
          Notice Board
        </Typography>
      </Box>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table className={styles.table}>
          <TableHead className={styles.tableHeader}>
            <TableRow>
              <TableCell
                className={`${styles.tableHeaderCell} ${styles.tableCellTitle}`}
              >
                Title
              </TableCell>
              <TableCell
                className={`${styles.tableHeaderCell} ${styles.tableCellGrade}`}
              >
                Grade
              </TableCell>
              <TableCell
                className={`${styles.tableHeaderCell} ${styles.tableCellAuthor}`}
              >
                Author
              </TableCell>
              <TableCell
                className={`${styles.tableHeaderCell} ${styles.tableCellViewCount}`}
              >
                View Count
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row, index) => (
              <TableRow key={index} className={styles.tableRow}>
                <TableCell
                  className={`${styles.tableCell} ${styles.tableCellTitle}`}
                >
                  {row.title}
                  <Typography variant="body2" className={styles.secondaryText}>
                    {row.date}
                  </Typography>
                </TableCell>
                <TableCell
                  className={`${styles.tableCell} ${styles.tableCellGrade}`}
                >
                  {row.grade}
                </TableCell>
                <TableCell
                  className={`${styles.tableCell} ${styles.tableCellAuthor}`}
                >
                  {row.author}
                </TableCell>
                <TableCell
                  className={`${styles.tableCell} ${styles.tableCellViewCount}`}
                >
                  {row.viewCount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className={styles.pagination}>
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
      <Box className={styles.newButtonContainer}>
        <Button
          variant="contained"
          className={styles.newButton}
          onClick={handleNewPost}
        >
          New
        </Button>
      </Box>
    </div>
  );
}

export default NoticeBoard;
