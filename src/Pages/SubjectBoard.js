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
//권한
import { useAuth } from "../store/AuthContext"; // Context API에서 인증 상태를 가져옵니다
function createData(title, date, author, viewCount) {
  return { title, date, author, viewCount };
}

const rows = [
  createData("Midterm Notice", "2024. 04. 24.", "Mozart", 123),
  createData("School Aniversary", "2024. 04. 21.", "AMozart", 256),
  createData("Library Open", "2023. 04. 04.", "Euler", 7890),
  createData("Summer Camp", "2023. 03. 03.", "Mozart", 456),
  createData("Parent Meeting", "2023. 02. 02.", "Fermat", 6781),
];

function SubjectBoard() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const { isSmallScreen } = useMediaQueryContext();

  //권한 체크
  const { userRole, isLoading } = useAuth(); // 인증 토큰 확인

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleNewPost = () => {
    navigate("/subject-new-post-form");
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
            marginTop: "20px",
            marginBottom: "30px",
          }}
        >
          Subject Board
        </Typography>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          width: isSmallScreen ? "100%" : "80%", // 반응형 설정
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
                  width: isSmallScreen ? "50%" : "50%",
                }}
              >
                Title
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  fontWeight: "bold",
                  width: isSmallScreen ? "35%" : "25%",
                }}
              >
                Author
              </TableCell>
              {!isSmallScreen && (
                <TableCell
                  sx={{
                    textAlign: "right",
                    fontWeight: "bold",
                    width: "20%",
                    padding: "16px 30px 16px 16px",
                  }}
                >
                  View Count
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
                  {row.author}
                </TableCell>
                {!isSmallScreen && (
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
      {userRole === "ROLE_ADMIN" ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "20px 10%",
          }}
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
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default SubjectBoard;
