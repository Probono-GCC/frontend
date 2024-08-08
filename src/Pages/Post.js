import React, { useContext } from "react";
import { Box, Typography, Button, Paper, Divider, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppBar from "../Components/AppBar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonIcon from "@mui/icons-material/Person";
import { useMediaQueryContext } from "../store/MediaQueryContext";
function Post() {
  const navigate = useNavigate();
  const { isSmallScreen } = useMediaQueryContext();

  const handleEdit = () => {
    navigate("/notice-new-post-form");
  };

  const handleDelete = () => {
    if (window.confirm("Do you want to delete the post?")) {
      window.alert("Deleted");
      // 추가적인 삭제 로직을 여기에 추가할 수 있습니다.
    }
  };

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
                2024 Session Start
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
                2024. 04. 24. 19:25:42
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
                  1024
                </Typography>
                <VisibilityIcon
                  sx={{ color: isSmallScreen ? "grey" : "" }}
                  fontSize="small"
                />
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ marginBottom: 5 }} />
          <Box sx={{ textAlign: "center", marginBottom: 3 }}>
            <img
              src="./images/profile_temp.png"
              alt="Notice Image"
              style={{ width: "20%", maxWidth: "100%", height: "auto" }}
            />
          </Box>
          <Typography variant="body1" sx={{ marginBottom: 3 }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
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
