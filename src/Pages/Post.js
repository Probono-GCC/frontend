import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppBar from "../Components/AppBar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonIcon from "@mui/icons-material/Person";

function Post() {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/new-post-form");
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
      <Box sx={{ padding: 3 }}>
        <Typography
          variant="h3"
          sx={{ textAlign: "center", fontFamily: "Copperplate", marginTop: 2 }}
        >
          Notice Board
        </Typography>
        <Paper sx={{ padding: 3, marginTop: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                backgroundColor: "#d8edff",
                padding: "4px 8px",
                borderRadius: "8px",
                color: "#1976d2",
                fontSize: "16px",
              }}
            >
              All
            </Typography>
            <Box
              sx={{
                textAlign: "right",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="subtitle1" sx={{ marginRight: 0.5 }}>
                  Administrator
                </Typography>
                <PersonIcon fontSize="small" />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="subtitle1" sx={{ marginRight: 0.5 }}>
                  1024
                </Typography>
                <VisibilityIcon fontSize="small" />
              </Box>
            </Box>
          </Box>
          <Typography variant="h4">2024 Session Start</Typography>
          <Typography
            variant="subtitle2"
            sx={{ color: "#999", marginBottom: 3 }}
          >
            2024. 04. 24. 19:25:42
          </Typography>
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
