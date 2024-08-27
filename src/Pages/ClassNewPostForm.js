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
import DeleteIcon from "@mui/icons-material/Delete";

import AppBar from "../Components/AppBar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMediaQueryContext } from "../store/MediaQueryContext";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { jwtDecode } from "jwt-decode";

import { getTeacher } from "../Apis/Api/User";

//API
import { postNewNotice, putNoticePost } from "../Apis/Api/ClassNotice";

function ClassNewPostForm() {
  const navigate = useNavigate();
  const role = ["ROLE_ADMIN", "ROLE_TEACHER", "ROLE_STUDENT"];
  const [title, setTitle] = useState("");
  // const [grade, setGrade] = useState("All");
  const [content, setContent] = useState("");
  const [imgURL, setImgURL] = useState([]); //server에 이미지 보내는 용도(파일형태)
  const [prevImage, setPrevImage] = useState([]);
  const [thumbnail, setThumbnail] = useState([]); //화면에 이미지 띄워주는 용도(url string형태)
  const { isSmallScreen } = useMediaQueryContext();
  const location = useLocation();
  const path = window.location.pathname;
  // 경로를 슬래시(/)로 분리하여 배열로 변환
  const pathSegments = path.split("/");
  const currentClassId = pathSegments[pathSegments.length - 1];

  const postData = location.state;
  const [initialTitle, setInitialTitle] = useState("");
  const [initialContent, setInitialContent] = useState("");
  const [initialImageList, setInitialImageList] = useState([]);

  const [authorName, setAuthorName] = useState("");

  const quillRef = useRef();

  const storedToken = localStorage.getItem("jwt");
  const decodedToken = jwtDecode(storedToken);

  const handleSave = () => {
    const formData = new FormData();

    // 필수 필드 추가 PUT용
    formData.append("title", title);
    formData.append("content", content);
    formData.append("type", "CLASS");
    formData.append("classId", currentClassId);

    // console.log(imgURL, "img있는지");
    if (imgURL) {
      console.log(imgURL);
      imgURL.forEach((url, index) => {
        formData.append(`imageList`, url);
      });
    }

    if (postData) {
      // initialImageList에서 imageId 값만 추출하여 새로운 배열로 만듦
      const imageIdList = initialImageList.map((item) => item.imageId);

      // 배열을 콤마로 구분된 문자열로 변환
      const imageIdString = imageIdList.join(",");

      // FormData 객체에 콤마로 구분된 imageId 문자열을 추가
      formData.append("maintainImageList", imageIdString);

      putNoticePost(currentClassId, formData).then((result) => {
        // console.log("formData", formData);
        if (result) {
          alert("Edit complete");
          navigate(-1);
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
          navigate(-1);
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
    if (decodedToken.role == role[0]) {
      setAuthorName("Admin");
    }
    if (decodedToken.role == role[1]) {
      getTeacher(decodedToken.username).then((result) => {
        setAuthorName(result.name);
      });
    }

    console.log(postData, "postData");
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
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["image"],
          [{ header: [1, 2, 3, false] }, { font: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link"],
          ["bold", "italic", "underline", "strike", "blockquote"],
        ],
        handlers: {
          image: imageHandler,
          link: () => {
            const url = prompt("Enter the URL");
            if (url) {
              const editor = quillRef.current.getEditor();
              const range = editor.getSelection();

              // 링크를 삽입하고 바로 텍스트로 보이도록 설정
              editor.insertText(range.index, url, "link", url);
            }
          },
        },
      },
    }),
    []
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "image",
    "link",
  ];
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };
  return (
    <div>
      <AppBar />
      <Box sx={{ width: "80%", margin: "0 auto" }}>
        <IconButton onClick={handleBack} color="primary" aria-label="go back">
          <ArrowBackIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 1,
          marginBottom: 1,
        }}
      >
        <Typography
          variant={isSmallScreen ? "h5" : "h4"}
          component="div"
          sx={{ fontFamily: "Copperplate" }}
        >
          Class Notice Board
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
              value={authorName} // 현재 접속한 사용자의 이름
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
            <Button
              variant="contained"
              color="primary"
              sx={{ backgroundColor: "#405c8b", color: "#F2F2F2" }}
              onClick={handleSave}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default ClassNewPostForm;
