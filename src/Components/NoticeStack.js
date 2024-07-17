import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

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

export default function NoticeStack() {
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
          //onClick={handleAddClick}
          sx={{
            "&:hover": { backgroundColor: "#BBDEFB" },
          }}
        >
          <AddIcon sx={{ color: "#1B8EF2" }} />
        </IconButton>
      </Box>
      <Stack spacing={2}>
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
      </Stack>
    </Box>
  );
}
