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

//다국어지원
import { useTranslation } from "react-i18next";

import i18n from "../i18n/i18n";
import { PostTranslation } from "../Apis/Api/Translate";

export default function NoticeStack() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const result = await getNoticePostList(0, 5); // 공지사항 데이터 가져오기

        if (result && Array.isArray(result.content)) {
          // 제목 번역
          const translatedTitlesPromises = result.content.map(
            // map안에 async를 두어 모든 컨텐츠가 번역이 될 때까지 기다림 추후 Promise.all처리
            async (notice) => {
              try {
                const translatingData = {
                  text: notice.title,
                  to: i18n.language, // 현재 선택된 언어
                };

                const translationResult = await PostTranslation(
                  translatingData
                );
                return {
                  ...notice,
                  title: translationResult.translatedText, // 번역된 제목
                };
              } catch (error) {
                console.error("Failed to translate title:", error);
                return { ...notice, title: notice.title }; // 번역 실패 시 원본 제목 사용
              }
            }
          );

          const translatedNotices = await Promise.all(translatedTitlesPromises);
          // //console.log("Translated notices:", translatedNotices); // 번역된 공지사항 로그
          setRows(translatedNotices); // 번역된 제목을 포함한 공지사항 상태 업데이트
        } else {
          //console.log("No content found in result.");
          setRows([]); // 데이터가 없으면 빈 배열 설정
        }
      } catch (error) {
        console.error("Error fetching notice posts", error);
        setRows([]); // 오류 발생 시 빈 배열 설정
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchData(); // 데이터 가져오기 함수 호출
  }, [i18n.language]); // 언어 변경 시 데이터 다시 가져오기

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
    console.log("rowData", rowData);
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
    overflow: "hidden", // 내용이 박스를 넘지 않도록 설정
    textOverflow: "ellipsis", // 넘치는 텍스트를 생략 부호(...)로 대체
    whiteSpace: "nowrap", // 텍스트가 한 줄로 유지되도록 설정
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
          {t("noticeBoard")}
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

      {loading ? ( // 로딩 중일 때 로딩 스피너 표시
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Stack spacing={2}>
          {rows.map((row, index) => (
            <Item key={index} onClick={() => handleRowClick(row)}>
              <NoticeTitle>{row.title}</NoticeTitle>
              <NoticeDate>
                {new Date(row.createdAt).toLocaleDateString()}
              </NoticeDate>
            </Item>
          ))}
        </Stack>
      )}
    </Box>
  );
}
