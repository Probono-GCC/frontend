import React, { useState, useEffect } from "react";
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
import { useNavigate, useParams, useLocation } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useMediaQueryContext } from "../store/MediaQueryContext";
import { getNoticePostList } from "../Apis/Api/ClassNotice";
import { useAuth } from "../store/AuthContext";

function createData(title, date, author, viewCount) {
  return { title, date, author, viewCount };
}

function ClassBoard() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosting, setTotalPosting] = useState(0);
  const itemsPerPage = 10;
  const { isSmallScreen } = useMediaQueryContext();
  const [rows, setRows] = useState([]);
  const { userRole } = useAuth();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const currentClassItem = location.state;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getNoticePostList(
          currentClassItem.classId,
          page - 1,
          itemsPerPage
        );
        if (result && Array.isArray(result.content)) {
          console.log("view있는지 확인", result.content);
          setRows(result.content);
          setTotalPages(result.totalPages);
          setTotalPosting(result.totalElements);
        } else {
          setRows([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error("Error fetching notice posts", error);
        setRows([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, currentClassItem]);

  const handleChangePage = (event, newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleNewPost = () => {
    navigate(`/private/class-new-post-form/${currentClassItem.classId}`);
  };

  const handlePreviousGroup = () => {
    setPage((prevPage) => Math.max(prevPage - 5, 1));
  };

  const handleNextGroup = () => {
    setPage((prevPage) => Math.min(prevPage + 5, totalPages));
  };

  const handleRowClick = (rowData) => {
    console.log("rowData", rowData);
    // 현재 경로의 마지막 부분을 추출
    const lastSegment = location.pathname.split("/").pop();

    if (rowData && rowData.noticeId) {
      navigate(`/class-notice/${rowData.noticeId}`, {
        state: { ...rowData, className: lastSegment },
      });
    } else {
      console.error("Row data does not contain an 'noticeId' field:", rowData);
    }
  };

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

  const getItemNumber = (index) => {
    return totalPosting - index - (page - 1) * 10;
  };

  return (
    <div>
      <AppBar />
      <Box>
        <Typography
          variant={isSmallScreen ? "h4" : "h3"}
          sx={{
            textAlign: "center",
            fontFamily: "Copperplate",
            marginTop: isSmallScreen ? "10px" : "20px",
            marginBottom: isSmallScreen ? "15px" : "30px",
          }}
        >
          Class Board
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
        <Table sx={{ tableLayout: "auto", width: "100%" }}>
          <TableHead sx={{ backgroundColor: "#d8edff" }}>
            <TableRow>
              <TableCell
                sx={{
                  textAlign: "left",
                  fontWeight: "bold",
                  width: isSmallScreen ? "19%" : "6%",
                  padding: isSmallScreen ? "16px" : "16px 16px 16px 30px",
                }}
              >
                No
              </TableCell>
              <TableCell
                sx={{
                  width: isSmallScreen ? "53%" : "65%",
                  textAlign: "left",
                  fontWeight: "bold",
                }}
              >
                Title
              </TableCell>
              {!isSmallScreen && (
                <TableCell sx={{ width: "20%", fontWeight: "bold" }}>
                  Author
                </TableCell>
              )}
              <TableCell
                sx={{
                  textAlign: "right",
                  fontWeight: "bold",
                  width: isSmallScreen ? "19%" : "12%",
                  padding: "16px 30px 16px 16px",
                }}
              >
                View
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
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
                  {getItemNumber(index)}
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
                </TableCell>
                {!isSmallScreen && (
                  <TableCell
                    sx={{
                      padding: "16px 30px 16px 16px",
                      textAlign: "left",
                      borderBottom: "1px solid #e0e0e0",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row.createdChargeId}
                  </TableCell>
                )}

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
            {Array.from({
              length: itemsPerPage - rows.length,
            }).map((_, index) => (
              <TableRow
                key={`empty-${index}`}
                sx={{ height: "50px", width: "100%" }}
              >
                <TableCell colSpan={isSmallScreen ? 3 : 4}></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {(userRole === "ROLE_ADMIN" || userRole === "ROLE_TEACHER") && (
        <Box
          sx={{
            width: isSmallScreen ? "98%" : "80%",
            margin: "20px auto",
            display: "flex",

            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1b8ef2",
              color: "white",
              "&:hover": { backgroundColor: "#1565c0" },
              minWidth: isSmallScreen ? "80px" : "100px",
              minHeight: isSmallScreen ? "30px" : "50px",
              marginRight: isSmallScreen ? "5px" : "",
            }}
            onClick={handleNewPost}
          >
            New
          </Button>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          margin: "20px 0",
          position: "relative",

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
    </div>
  );
}

export default ClassBoard;
