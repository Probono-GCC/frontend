import React, { useState, useMemo, useEffect } from "react";
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

//api
import { getNoticePostList } from "../Apis/Api/Notice";

//권한
import { useAuth } from "../store/AuthContext"; // Context API에서 인증 상태를 가져옵니다

function NoticeBoard() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const { isSmallScreen } = useMediaQueryContext();
  const [rows, setRows] = useState([]);

  //권한 체크
  const { userRole, isLoading } = useAuth(); // 인증 토큰 확인

  useEffect(() => {
    getNoticePostList(page, 10)
      .then((result) => {
        if (result != undefined && Array.isArray(result.content)) {
          setRows(result.content);
        } else {
          setRows([]);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          console.error("404 Not Found");
          setRows([]);
        } else {
          console.error("Error fetching notice posts", error);
        }
        return { content: [] }; // 에러 발생 시 빈 배열 반환
      });

    console.log(userRole);
  }, [userRole]); // userRole을 의존성 배열에 추가

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleNewPost = () => {
    navigate("/private/notice-new-post-form");
  };

  const handlePreviousGroup = () => {
    setPage((prevPage) => Math.max(prevPage - 5, 1));
  };

  const handleNextGroup = () => {
    setPage((prevPage) => Math.min(prevPage + 5, totalPages));
  };

  const handleRowClick = (rowData) => {
    navigate(`/post/${rowData.id}`, { state: rowData });
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

  const displayedRows = Array.isArray(rows)
    ? rows.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    : [];

  return (
    <div>
      <AppBar />
      <Box>
        <Typography
          variant={isSmallScreen ? "h6" : "h3"}
          sx={{
            textAlign: isSmallScreen ? "left" : "center",
            fontFamily: "Copperplate",
            marginTop: isSmallScreen ? "5px" : "10px",
            marginBottom: isSmallScreen ? "10px" : "30px",
            marginLeft: isSmallScreen ? "10px" : "",
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
                  width: isSmallScreen ? "15%" : "6%",
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
              {/* <TableCell
                sx={{
                  textAlign: "left",
                  fontWeight: "bold",
                  width: "20%",
                  padding: "5px",
                }}
              >
                Grade
              </TableCell> */}

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
                onClick={() => handleRowClick(row)}
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
                    padding: "16px 30px 16px 16px",
                    textAlign: "right",
                    borderBottom: "1px solid #e0e0e0",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {row.views}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",

          margin: "20px 0",
          position: "fixed",
          bottom: 20,
          width: "100%",

          zIndex: 1000, // 다른 콘텐츠 위에 표시되도록 z-index를 조정
        }}
      >
        <Box
          sx={{
            display: "flex",

            margin: "20px 0",
            position: "fixed",
            bottom: "20px",
            width: "100%",

            zIndex: 1000, // 다른 콘텐츠 위에 표시되도록 z-index를 조정
            justifyContent: "center",
          }}
        >
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
          sx={{
            display: "flex",

            margin: "20px 0px",
            padding: "0px 20px",
            position: "fixed",
            bottom: 20,
            width: "100%",

            zIndex: 1000, // 다른 콘텐츠 위에 표시되도록 z-index를 조정

            justifyContent: "flex-end",
          }}
        >
          {userRole === "ROLE_ADMIN" ? (
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
          ) : (
            <div></div>
          )}
        </Box>
      </Box>
    </div>
  );
}

export default NoticeBoard;
