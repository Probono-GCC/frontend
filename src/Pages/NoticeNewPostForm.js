import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppBar from "../Components/AppBar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMediaQueryContext } from "../store/MediaQueryContext";
const grades = [
  { value: "PlayGroup", label: "PlayGroup" },
  { value: "Nursery", label: "Nursery" },
  { value: "LowerKG", label: "LowerKG" },
  { value: "UpperKG", label: "UpperKG" },
  { value: "Class1", label: "Class 1" },
  { value: "Class2", label: "Class 2" },
  { value: "Class3", label: "Class 3" },
  { value: "Class4", label: "Class 4" },
  { value: "Class5", label: "Class 5" },
  { value: "Class6", label: "Class 6" },
  { value: "Class7", label: "Class 7" },
  { value: "Class8", label: "Class 8" },
  { value: "Class9", label: "Class 9" },
  { value: "Class10", label: "Class 10" },
];

function NoticeNewPostForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [grade, setGrade] = useState("All");
  const [content, setContent] = useState("");
  const { isSmallScreen } = useMediaQueryContext();
  const handleSave = () => {
    // 저장 시 새로운 페이지 생성하는 코드 필요!

    navigate("/notice-board");
  };

  const handleCancel = () => {
    navigate("/notice-board");
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
  };
  return (
    <div>
      <AppBar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 1,
          marginBottom: 1,
        }}
      >
        <Typography
          variant="h4"
          component="div"
          sx={{ fontFamily: "Copperplate" }}
        >
          Notice Board
        </Typography>
      </Box>
      <Box
        component={isSmallScreen ? "" : Paper}
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: 2,
          maxWidth: isSmallScreen ? "100%" : "80%",
          margin: "0 auto",
          marginBottom: 5,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Grade"
              variant="outlined"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            >
              {grades.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Author"
              variant="outlined"
              value="Admin"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Date"
              variant="outlined"
              value={new Date().toLocaleDateString()}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <ReactQuill
              theme="snow"
              modules={modules}
              value={content}
              onChange={setContent}
              placeholder="Write your content here..."
              style={{
                height: "300px",
                marginBottom: "90px",
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              variant="outlined"
              color="error"
              onClick={handleCancel}
              sx={{ marginRight: 2 }}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default NoticeNewPostForm;
