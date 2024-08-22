import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Paper, Divider, Grid } from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import AppBar from "../Components/AppBar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonIcon from "@mui/icons-material/Person";
import { useMediaQueryContext } from "../store/MediaQueryContext";
//api
import { deleteNoticePost, getNoticePost } from "../Apis/Api/Notice";

function Post() {
  const navigate = useNavigate();
  const [tempImageList, setTempImageList] = useState([]);
  const { isSmallScreen } = useMediaQueryContext();
  // const [postData, setPostData] = useState(null);
  const location = useLocation();
  const postData = location.state;
  // 현재 URL에서 경로(path)를 가져옴
  const path = window.location.pathname;

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
    console.log("postdagtaaaaa", postData);
    getNoticePost(postData.noticeId).then((result) => {
      if (result && result.imageList != null) {
        postData.imageList = result.imageList;
        setTempImageList(result.imageList);
      } else {
        setTempImageList([]);
        postData.imageList = null;
      }
    });
  }, []);

  if (!postData) {
    return <div>Loading...</div>; // 데이터를 로딩 중일 때 보여줄 내용
  }
  if (!tempImageList) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <AppBar />
      <Box>
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
              fontSize: "16px",
              display: "inline-block",
              marginBottom: 1,
            }}
          >
            All
          </Typography>
          <Grid
            container
            alignItems="flex-end"
            sx={{ marginBottom: isSmallScreen ? 0 : 1 }}
          >
            <Grid item xs={12} sm={12} md={6} lg={8}>
              <Typography variant={isSmallScreen ? "h5" : "h4"}>
                {postData.title}
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
                  Administrator
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
                {postData.createdAt}
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
                  {postData.views}
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
              marginLeft: 3,
              marginRight: 3,
              minHeight: "60vh",
              overflowY: "scroll",
            }}
          >
            {postData.content}
          </Typography>

          {tempImageList && tempImageList.length !== 0 ? (
            <Box sx={{ textAlign: "center", marginBottom: 3, width: "90vw" }}>
              {tempImageList.map((image, index) => (
                <img
                  key={index} // 또는 image.imageId, 혹은 유일한 id 값을 사용하는 것이 좋습니다.
                  src={image.imagePath}
                  alt={`Image ${index + 1}`}
                  style={{
                    maxWidth: isSmallScreen ? "90%" : "100%",
                    height: "auto",
                    margin: "10px",
                  }}
                />
              ))}
            </Box>
          ) : (
            <div></div>
          )}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              color="error"
              sx={{ marginRight: 2, minHeight: "50px", minWidth: "120px" }}
              onClick={handleDelete}
            >
              Delete
            </Button>

            <Button
              variant="contained"
              sx={{ marginRight: 2, minHeight: "50px", minWidth: "100px" }}
              color="primary"
              onClick={handleEdit}
            >
              Edit
            </Button>
          </Box>
        </Paper>
      </Box>
    </div>
  );
}

export default Post;
