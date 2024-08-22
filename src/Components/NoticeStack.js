import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useLocation } from "react-router-dom";
import { getNoticePostList } from "../Apis/Api/Notice";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress"; 


export default function NoticeStack() {
  const [rows, setRows] = useState([]); // Initialize rows state
  const [loading, setLoading] = useState(true); // Initialize loading state
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getNoticePostList(0, 5); // 첫 페이지의 5개의 공지를 가져옴
        if (result && Array.isArray(result.content)) {
          setRows(result.content); // 데이터를 상태로 설정
        } else {
          setRows([]); // 만약 데이터가 없으면 빈 배열
        }
      } catch (error) {
        console.error("Error fetching notice posts", error);
        setRows([]); // 에러 발생 시 빈 배열로 설정
      } finally {
        setLoading(false); // 로딩 완료 후 로딩 상태 false로 설정
      }
    };
    fetchData();
  }, []); // 컴포넌트가 마운트될 때만 데이터를 가져옴

  const Item = styled(Paper)(({ theme }) => ({
    width: "100%",
    padding: theme.spacing(2),
    textAlign: "left",
    borderLeft: "5px solid #1B8EF2", // 하늘색 윤곽선 추가
    transition: "background-color 0.3s", // 배경색 전환 효과
    "&:hover": {
      backgroundColor: theme.palette.action.hover, // hover 시 배경색 변경
    },
  }));

  const handleRowClick = (rowData) => {
    if (rowData.noticeId) {
      navigate(`/notice/${rowData.noticeId}`, { state: rowData });
    } else {
      console.error("Row data does not contain an 'id' field:", rowData);
    }
  };

  const NoticeTitle = styled(Box)(({ theme }) => ({
    color: "black",
    fontSize: "24px",
    fontWeight: "500",
    fontFamily: "Copperplate",
  }));

  const NoticeDate = styled(Box)(({ theme }) => ({
    color: "#B3B3B3",
    fontSize: "16px",
    fontWeight: "400",
    fontFamily: "Copperplate",
  }));

  const goNoticeBoard = () => {
    navigate("/notice-board");
  };
  return (
    <Box
      sx={{
        width: "95%",
        marginLeft: "2.5%",
        padding: (theme) => theme.spacing(2),
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: (theme) => theme.spacing(2),
        }}
      >
        <Box
          sx={{
            fontSize: "200%",
            fontWeight: "bold",
            fontFamily: "Copperplate",
          }}
        >
          Notice Board
        </Box>
        <IconButton
          onClick={goNoticeBoard}
          sx={{
            "&:hover": { backgroundColor: "#BBDEFB" },
          }}
        >
          <AddIcon sx={{ color: "#1B8EF2" }} />
        </IconButton>
      </Box>
      {/* <Stack spacing={2}>
        <Item>
          <NoticeTitle>Midterm Notice</NoticeTitle>
          <NoticeDate>2024. 04. 24.</NoticeDate>
        </Item>
        <Item>
          <NoticeTitle>School Anniversary</NoticeTitle>
          <NoticeDate>2024. 04. 21.</NoticeDate>
        </Item>
        <Item>
          <NoticeTitle>2024 Session Start</NoticeTitle>
          <NoticeDate>2024. 04. 19.</NoticeDate>
        </Item>
      </Stack> */}
       {loading ? ( // 로딩 중일 때 로딩 스피너 표시
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Stack spacing={2}>
          {rows.map((row, index) => (
            <Item key={index} onClick={() => handleRowClick(row)}>
              <NoticeTitle>{row.title}</NoticeTitle>
              <NoticeDate>{new Date(row.createdAt).toLocaleDateString()}</NoticeDate>
            </Item>
          ))}
        </Stack>
      )}
    </Box>
  );
}
