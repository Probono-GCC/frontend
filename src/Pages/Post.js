import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Paper, Divider, Grid } from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import AppBar from "../Components/AppBar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonIcon from "@mui/icons-material/Person";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { convertDateFormat } from "../Util/DateUtils";

import { useMediaQueryContext } from "../store/MediaQueryContext";
//api
import { deleteNoticePost, getNoticePost } from "../Apis/Api/Notice";


import { postTranslationData } from "../Apis/Api/Translate";

import i18n from "../i18n/i18n";

import { useAuth } from "../store/AuthContext";

function Post() {
  const navigate = useNavigate();
  const [tempImageList, setTempImageList] = useState([]);
  const [postedData, setPostedData] = useState([]); //서버에서 받아온 포스팅 데이터

  const [translatedContent, setTranslatedContent] = useState(""); //번역
  const [translatedTitle, setTranslatedTitle] = useState("");

  const { isSmallScreen } = useMediaQueryContext();
  // const [postData, setPostData] = useState(null);
  const location = useLocation();
  const postData = location.state;
  const className = postData.className;

  // 현재 URL에서 경로(path)를 가져옴
  const path = window.location.pathname;

  const { userRole, roleArray, userData } = useAuth();

  // 경로를 슬래시(/)로 분리하여 배열로 변환
  const pathSegments = path.split("/");

  // 배열의 마지막 요소를 가져옴
  const noticeName = pathSegments[pathSegments.length - 2];
  const currentClassId = pathSegments[pathSegments.length - 1];
  const handleEdit = () => {
    if (noticeName == "class-notice") {
      //class notice
      navigate(`/private/class-new-post-form/${currentClassId}`, {
        state: postData,
      });
    } else {
      //전체 notice
      navigate("/private/notice-new-post-form", { state: postData });
    }
  };

  const handleDelete = () => {
    if (window.confirm("Do you want to delete the post?")) {
      deleteNoticePost(postData.noticeId).then(() => {
        window.alert("Deleted");
        navigate(-1);
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. 먼저 공지사항 데이터를 가져옴
        const result = await getNoticePost(postData.noticeId);
        console.log("get notice post", result);

        // 2. 공지사항 데이터를 상태로 먼저 업데이트
        if (result) {
          setPostedData({
            title: result.title,
            content: result.content, // 초기에는 원본 content로 설정
            updatedAt: result.updatedAt,
            views: result.views,
          });
        }

        // 3. 번역 요청
        if (result && result.content) {
          try {
            //content 번역

            const translationContentResult = await postTranslationData(
              result.content,
              i18n.language
            );
            console.log(
              "Translation content result:",
              translationContentResult
            );

            // 번역 결과가 있으면 상태를 업데이트
            setTranslatedContent(translationContentResult.translatedText);

            //title 번역
            const translationTitleResult = await postTranslationData(
              result.title,
              i18n.language
            );
            console.log("Translation Title result:", translationTitleResult);

            // 번역 결과가 있으면 상태를 업데이트
            setTranslatedTitle(translationTitleResult.translatedText);
          } catch (error) {
            console.error("Failed to translate:", error);
          }
        }

        // 4. 이미지 리스트가 있으면 상태 업데이트
        if (result && result.imageList != null) {
          postData.imageList = result.imageList;
          setTempImageList(result.imageList);
        } else {
          setTempImageList([]);
          postData.imageList = null;
        }
      } catch (error) {
        console.error("Error fetching notice post:", error);
      }

    };

    fetchData(); // 데이터 불러오기 함수 호출
  }, [postData.noticeId]);

  // 번역된 텍스트가 설정되면 content 업데이트
  useEffect(() => {
    if (translatedTitle || translatedContent) {
      setPostedData((prevData) => ({
        ...prevData,
        title: translatedTitle || prevData.title,
        content: translatedContent || prevData.content, // 번역된 텍스트로 content를 업데이트
      }));
    }
  }, [translatedContent, translatedTitle]);



  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };
  if (!postData) {
    return <div>Loading...</div>; // 데이터를 로딩 중일 때 보여줄 내용
  }
  if (!tempImageList) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <AppBar />

      <Box sx={{ width: "90vw", margin: "0 auto" }}>
        <IconButton
          sx={{
            marginLeft: 2,
          }}
          onClick={handleBack}
          color="primary"
          aria-label="go back"
        >
          <ArrowBackIcon />
        </IconButton>
        <Paper
          sx={{
            paddingTop: 1,
            paddingBottom: 2,
            paddingLeft: 3,
            paddingRight: 3,
          }}
          elevation={0}
        >
          <Typography
            sx={{
              backgroundColor: "#d8edff",
              padding: "4px 8px",
              borderRadius: "8px",
              color: "#1976d2",
              fontSize: isSmallScreen ? "12px" : "16px",
              display: "inline-block",
              marginBottom: 1,
            }}
          >
            {className ? className : "All"}
          </Typography>
          <Grid
            container
            alignItems="flex-end"
            sx={{ marginBottom: isSmallScreen ? 0 : 1 }}
          >
            <Grid item xs={12} sm={12} md={6} lg={8}>
              <Typography
                variant={isSmallScreen ? "body1" : "h4"}
                style={isSmallScreen ? { fontWeight: "bold" } : {}}
              >
                {postedData.title}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              container
              direction="column"
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: isSmallScreen ? "flex-start" : "flex-end",
                }}
              >
                <Typography
                  sx={{ marginRight: 0.5, color: isSmallScreen ? "grey" : "" }}
                >
                  {postedData.author}
                </Typography>

                <PersonIcon
                  sx={{ color: isSmallScreen ? "grey" : "" }}
                  fontSize="small"
                />
              </Box>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={8} lg={8}>
              <Typography variant="subtitle2" sx={{ color: "#999" }}>
                {convertDateFormat(postedData.updatedAt)}
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              lg={4}
              container
              direction="column"
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isSmallScreen ? "flex-start" : "flex-end",
                }}
              >
                <Typography
                  sx={{ marginRight: 0.5, color: isSmallScreen ? "grey" : "" }}
                >
                  {postedData.views}
                </Typography>
                <VisibilityIcon
                  sx={{ color: isSmallScreen ? "grey" : "" }}
                  fontSize="small"
                />
              </Box>
            </Grid>
          </Grid>

          <Typography
            variant="body1"
            sx={{
              marginBottom: 3,
              marginTop: 2,
              minHeight: "20vh",
              maxWidth: "100vw", // 컨텐츠가 부모 요소를 넘지 않도록 함
              // overflowY: "scroll",
              border: "1px solid #e0e0e0",
              // borderTop: "1px solid #e0e0e0",
              // borderBottom: "1px solid #e0e0e0",
              borderRadius: "8px",
              padding: 2,
              wordBreak: "break-word", // 긴 단어를 줄 바꿈하여 보더 밖으로 넘치지 않도록 함
              boxSizing: "border-box", // 보더와 패딩을 포함하여 요소의 전체 크기를 계산
            }}
            dangerouslySetInnerHTML={{ __html: postedData.content }}
          ></Typography>

          {tempImageList && tempImageList.length !== 0 ? (
            <Box
              sx={{
                textAlign: "center",
                marginBottom: 3,
                maxWidth: "95%", // body1과 동일한 너비
                margin: "0 auto", // 가운데 정렬
              }}
            >
              {tempImageList.map((image, index) => (
                <img
                  key={index}
                  src={image.imagePath}
                  alt={`Image ${index + 1}`}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    margin: "10px 0", // 이미지 간격 조정
                  }}
                />
              ))}
            </Box>
          ) : (
            <div></div>
          )}

          {(userRole === "ROLE_ADMIN" ||
            (noticeName === "class-notice" && userRole === "ROLE_TEACHER")) && (
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                color="error"
                sx={{
                  marginRight: 2,
                  minHeight: isSmallScreen ? "40px" : "50px",
                  minWidth: isSmallScreen ? "80px" : "120px",
                }}
                onClick={handleDelete}
              >
                Delete
              </Button>

              <Button
                variant="contained"
                sx={{
                  marginRight: isSmallScreen ? 0 : 2,
                  minHeight: isSmallScreen ? "40px" : "50px",
                  minWidth: isSmallScreen ? "80px" : "120px",
                }}
                color="primary"
                onClick={handleEdit}
              >
                Edit
              </Button>
            </Box>
          )}
        </Paper>
      </Box>
    </div>
  );
}

export default Post;
