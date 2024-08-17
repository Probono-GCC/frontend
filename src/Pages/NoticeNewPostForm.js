import React, { useState, useMemo, useRef } from "react";
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

//API
import { postNewNotice, postImage } from "../Apis/Api/Notice";
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
  // const [grade, setGrade] = useState("All");
  const [content, setContent] = useState("");
  const [imgURL, setimgURL] = useState("");
  const { isSmallScreen } = useMediaQueryContext();
  const quillRef = useRef();
  const handleSave = () => {
    // 저장 시 새로운 페이지 생성하는 코드 필요!
    const postingData = {
      title: title,
      content: content.replace(/<\/?[^>]+(>|$)/g, ""),
      type: "SCHOOL",
    };
    // console.log("postingData", postingData);
    postNewNotice(postingData).then((result) => {
      if (result && imgURL) {
        console.log(result.noticeId, "+", imgURL);
        console.log("post result?", result);
        alert("게시글 포스팅 완료");
      }
    });
    navigate("/notice-board");
  };

  const handleCancel = () => {
    navigate("/notice-board");
  };

  const imageHandler = async (e) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          // URL.createObjectURL 대신 FileReader 사용
          setimgURL(reader.result);
        };

        reader.readAsDataURL(file); // 이미지 파일을 Data URL로 읽어들임
      }
    };

    input.click();
  };

  const checkImage = (file) => {
    let err = "";

    if (!file) return (err = "File does not exist.");
    if (file.size > 1024 * 1024) {
      err = "The largest image size is 1mb.";
    }
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      err = "Image format is incorrect.";
    }

    return err;
  };
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ["image"],
          [{ header: [1, 2, 3, false] }, { font: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
        ],
        handlers: {
          // 이미지 처리는 imageHandler라는 함수로 처리할 것이다.
          image: imageHandler,
        },
      },
    };
  }, []);

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "image",
  ];
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
        component={isSmallScreen ? "div" : Paper}
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: 2,
          maxWidth: isSmallScreen ? "100%" : "80%",
          margin: "0 auto",
          marginBottom: 2,
          height: "auto",
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
              ref={quillRef}
              modules={modules}
              value={content}
              onChange={setContent}
              placeholder="Write your content here..."
              style={{
                height: "300px",
                marginBottom: isSmallScreen ? "80px" : "50px",
              }}
            />
            <Typography sx={{ marginBottom: isSmallScreen ? "1px" : "8px" }}>
              Attached Image
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                minHeight: "50px", // 기본 높이 설정
                height: "auto", // 이미지에 따라 자동 조정
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "8px",
              }}
            >
              {imgURL && (
                <img
                  src={imgURL}
                  alt="Selected"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
              )}
            </Box>
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
