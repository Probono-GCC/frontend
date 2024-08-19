import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Paper,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import AppBar from "../Components/AppBar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMediaQueryContext } from "../store/MediaQueryContext";

//API
import { postNewNotice, putNoticePost } from "../Apis/Api/Notice";

const grades = [
  { value: "PLAYGROUP", label: "PlayGroup" },
  { value: "NURSERY", label: "Nursery" },
  { value: "LOWERKG", label: "LowerKG" },
  { value: "UPPERKG", label: "UpperKG" },
  { value: "CLASS1", label: "Class 1" },
  { value: "CLASS2", label: "Class 2" },
  { value: "CLASS3", label: "Class 3" },
  { value: "CLASS4", label: "Class 4" },
  { value: "CLASS5", label: "Class 5" },
  { value: "CLASS6", label: "Class 6" },
  { value: "CLASS7", label: "Class 7" },
  { value: "CLASS8", label: "Class 8" },
  { value: "CLASS9", label: "Class 9" },
  { value: "CLASS10", label: "Class 10" },
];

function NoticeNewPostForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  // const [grade, setGrade] = useState("All");
  const [content, setContent] = useState("");
  const [imgURL, setImgURL] = useState([]); //server에 이미지 보내는 용도(파일형태)
  const [thumbnail, setThumbnail] = useState([]); //화면에 이미지 띄워주는 용도(url string형태)
  const { isSmallScreen } = useMediaQueryContext();
  const location = useLocation();
  const postData = location.state;

  const quillRef = useRef();

  const handleSave = () => {
    const formData = new FormData();

    // 필수 필드 추가
    formData.append("title", title);
    formData.append("content", content.replace(/<\/?[^>]+(>|$)/g, ""));
    formData.append("type", "SCHOOL");
    console.log(imgURL, "img있는지");
    if (imgURL) {
      console.log(imgURL);
      imgURL.forEach((url, index) => {
        formData.append(`imageList`, url);
      });
    }

    if (postData) {
      putNoticePost(formData).then((result) => {
        console.log(result);
        if (result) {
          alert("Edit complete");
          navigate("/notice-board");
        } else {
          alert("Edit failed");
        }
      });
    } else {
      // FormData를 서버에 POST 요청으로 전송
      console.log("뭘보내는지");
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      postNewNotice(formData).then((result) => {
        if (result && imgURL) {
          console.log("result", result);
          alert("Post complete");
          navigate("/notice-board");
        } else {
          alert("Post failed");
        }
      });
    }
  };

  const handleCancel = () => {
    navigate("/notice-board");
  };
  const imageHandler = async (e) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      const checkMsg = checkImage(file);

      if (checkMsg) {
        return alert(checkMsg);
      }
      setImgURL((prev) => [...prev, file]); // imgURL에 파일 객체 추가

      const reader = new FileReader();

      reader.onloadend = () => {
        // 이전 이미지 배열에 새로운 이미지를 추가
        setThumbnail((prevURLs) => [...prevURLs, reader.result]);
      };
      reader.readAsDataURL(file); // 이미지 파일을 Data URL로 읽어들임
    };

    input.click();
  };
  useEffect(() => {
    if (postData) {
      setTitle(postData.title || "");
      setContent(postData.content || "");
      // Initialize thumbnail and imgURL if postData contains images
      if (postData.imageList) {
        setThumbnail(postData.imageList);
        // Assuming imageList is an array of URLs
      }
    }
  }, [postData]); // Adding postData as a dependency
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
                flexDirection: "row",
                alignItems: "start",
                minHeight: "50px", // 기본 높이 설정
                height: "auto", // 이미지에 따라 자동 조정
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "8px",
              }}
            >
              {thumbnail.map((url, index) => (
                <img
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    borderRadius: "8px",
                    objectFit: "cover",
                    // margin: "0 5px",
                  }}
                  key={index}
                  src={url}
                  alt={`Uploaded ${index}`}
                />
              ))}
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
