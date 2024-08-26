import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
// import { IconButton } from '@mui/material';

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
  const [prevImage, setPrevImage] = useState([]);
  const [thumbnail, setThumbnail] = useState([]); //화면에 이미지 띄워주는 용도(url string형태)
  const { isSmallScreen } = useMediaQueryContext();
  const location = useLocation();
  const postData = location.state;
  // const [maintainImageIdList, setMaintainImageIdList] = useState([]);
  const [initialTitle, setInitialTitle] = useState("");
  const [initialContent, setInitialContent] = useState("");
  const [initialImageList, setInitialImageList] = useState([]);

  const quillRef = useRef();

  const handleSave = () => {
    const formData = new FormData();

    // 필수 필드 추가
    formData.append("title", title);
    formData.append("content", content);
    formData.append("type", "SCHOOL");
    console.log(imgURL, "img있는지");
    if (imgURL) {
      imgURL.forEach((url, index) => {
        formData.append(`imageList`, url);
      });
    }

    //수정인 경우
    if (postData) {
      // initialImageList에서 imageId 값만 추출하여 새로운 배열로 만듦
      const imageIdList = initialImageList.map((item) => item.imageId);
      // console.log("image id list", imageIdList);
      // 배열을 콤마로 구분된 문자열로 변환
      const imageIdString = imageIdList.join(",");

      // FormData 객체에 콤마로 구분된 imageId 문자열을 추가
      formData.append("maintainImageList", imageIdString);

      putNoticePost(postData.noticeId, formData).then((result) => {
        if (result) {
          alert("Edit complete");
          navigate(-1);
        } else {
          console.log("뭘보내는지");
          for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
          }
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
    navigate(-1);
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
  };
  const handleDeletePrevImage = (index) => {
    setPrevImage((prev) => prev.filter((_, i) => i !== index));
    setInitialImageList((initial) => initial.filter((_, i) => i !== index));
  };

  const handleDeleteThumbnail = (index) => {
    setThumbnail((thumbnail) => thumbnail.filter((_, i) => i !== index));
    setImgURL((imgURL) => imgURL.filter((_, i) => i !== index));
  };
  useEffect(() => {
    if (postData) {
      setTitle(postData.title || "");
      setContent(postData.content || "");
      setPrevImage(postData.imageList || []);
      setInitialTitle(postData.title || "");
      setInitialContent(postData.content || "");
      setInitialImageList(postData.imageList || []);
    }
  }, [postData]);

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
                minHeight: "50px",
                height: "auto",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "8px",
              }}
            >
              {prevImage.map((item, index) => (
                <Box key={index} sx={{ position: "relative", marginRight: 2 }}>
                  <img
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                    src={item.imagePath}
                    alt={`Uploaded ${index}`}
                  />
                  <IconButton
                    size="small"
                    onClick={() => handleDeletePrevImage(index)}
                    sx={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      color: "#f44336",
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
              {thumbnail.map((url, index) => (
                <Box key={index} sx={{ position: "relative", marginRight: 2 }}>
                  <img
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                    src={url}
                    alt={`Uploaded ${index}`}
                  />
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteThumbnail(index)}
                    sx={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      color: "#f44336",
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
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
