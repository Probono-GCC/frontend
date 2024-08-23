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
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useMediaQueryContext } from "../store/MediaQueryContext";
import { getNoticePostList } from "../Apis/Api/Notice";
import { useAuth } from "../store/AuthContext";

function NoticeBoard() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosting, setTotalPosting] = useState(0);
  const itemsPerPage = 10;
  const { isSmallScreen } = useMediaQueryContext();
  const [rows, setRows] = useState([]);
  const { userRole } = useAuth();
  const [loading, setLoading] = useState(false); // 추가된 부분

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getNoticePostList(page - 1, itemsPerPage);
        if (result && Array.isArray(result.content)) {
          console.log("새로운 페이지 컨텐츠 받아왔나?", result.content);
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
  }, [page]);

  const handleChangePage = (event, newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleNewPost = () => {
    navigate("/private/notice-new-post-form");
  };

  const handlePreviousGroup = () => {
    console.log("Previous group button clicked"); // 버튼 클릭 확인
    setPage((prevPage) => Math.max(prevPage - 5, 1));
  };

  const handleNextGroup = () => {
    console.log("Next group button clicked"); // 버튼 클릭 확인
    setPage((prevPage) => Math.min(prevPage + 5, totalPages));
  };

  const handleRowClick = (rowData) => {
    if (rowData.noticeId) {
      navigate(`/notice/${rowData.noticeId}`, { state: rowData });
    } else {
      console.error("Row data does not contain an 'id' field:", rowData);
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
    return (page - 1) * itemsPerPage + totalPosting - index;
  };

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
                  width: isSmallScreen ? "14%" : "6%",
                  padding: isSmallScreen ? "16px" : "16px 16px 16px 30px",
                }}
              >
                No
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  fontWeight: "bold",
                  width: isSmallScreen ? "63%" : "40%",
                }}
              >
                Title
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "right",
                  fontWeight: "bold",
                  width: isSmallScreen ? "14%" : "12%",
                  padding: "16px",
                }}
              >
                View
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? ( // 로딩 중일 때 스피너 표시
              <TableRow>
                <TableCell colSpan={3} sx={{ textAlign: "center" }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              <>
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
                    <TableCell
                      sx={{
                        padding: "16px",
                        textAlign: "right",
                        borderBottom: "1px solid #e0e0e0",
                      }}
                    >
                      {row.views}
                    </TableCell>
                  </TableRow>
                ))}
                {Array.from({
                  length: itemsPerPage - rows.length,
                }).map((_, index) => (
                  <TableRow key={`empty-${index}`} sx={{ height: "50px" }}>
                    <TableCell colSpan={3}></TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {userRole === "ROLE_ADMIN" && (
        <Box
          sx={{
            width: "80%",
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

export default NoticeBoard;
