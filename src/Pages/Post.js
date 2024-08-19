import React, { useEffect } from "react";
import { Box, Typography, Button, Paper, Divider, Grid } from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import AppBar from "../Components/AppBar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonIcon from "@mui/icons-material/Person";
import { useMediaQueryContext } from "../store/MediaQueryContext";

//api
import { deleteNoticePost } from "../Apis/Api/Notice";

function Post() {
  const navigate = useNavigate();

  const { isSmallScreen } = useMediaQueryContext();
  // const [postData, setPostData] = useState(null);
  const location = useLocation();
  const postData = location.state;

  const handleEdit = () => {
    navigate("/private/notice-new-post-form", { state: postData });
  };

  const handleDelete = () => {
    if (window.confirm("Do you want to delete the post?")) {
      deleteNoticePost(postData.noticeId).then(() => {
        window.alert("Deleted");
        navigate("/notice-board");
      });
    }
  };
  useEffect(() => {
    console.log(postData, "sdf");
  });
  if (!postData) {
    return <div>Loading...</div>; // 데이터를 로딩 중일 때 보여줄 내용
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
          <Divider sx={{ marginBottom: 5 }} />
          {postData.imageList && postData.imageList.length != 0 ? (
            <Box sx={{ textAlign: "center", marginBottom: 3 }}>
              <img
                src="./images/profile_temp.png"
                alt="Notice Image"
                style={{ width: "20%", maxWidth: "100%", height: "auto" }}
              />
            </Box>
          ) : (
            <div></div>
          )}

          <Typography
            variant="body1"
            sx={{
              marginBottom: 3,
              marginLeft: 3,
              marginRight: 3,
              minHeight: "50vh",
              overflowY: "scroll",
              borderBottom: "1px solid #e0e0e0", // 회색 실선 추가
            }}
          >
            {postData.content}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              color="error"
              sx={{ marginRight: 2 }}
              onClick={handleDelete}
            >
              Delete
            </Button>
            <Button variant="contained" color="primary" onClick={handleEdit}>
              Edit
            </Button>
          </Box>
        </Paper>
      </Box>
    </div>
  );
}

export default Post;
