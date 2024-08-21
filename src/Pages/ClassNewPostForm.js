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
import { postNewNotice, putNoticePost } from "../Apis/Api/ClassNotice";

function ClassNewPostForm() {
  const navigate = useNavigate();
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

  const quillRef = useRef();

  const handleSave = () => {
    const formData = new FormData();

    // 필수 필드 추가 PUT용
    formData.append("title", title);
    formData.append("content", content.replace(/<\/?[^>]+(>|$)/g, ""));
    formData.append("type", "CLASS");
    formData.append("classId", currentClassId);

    // console.log(imgURL, "img있는지");
    if (imgURL) {
      console.log(imgURL);
      imgURL.forEach((url, index) => {
        formData.append(`imageList`, url);
      });
    }

    //Patch 의미(only바뀐것만)
    // if (title !== initialTitle) formData.append("title", title);
    // if (content !== initialContent) formData.append("content", content.replace(/<\/?[^>]+(>|$)/g, ""));
    // if (imgURL.length > 0) {
    //   imgURL.forEach((file) => {
    //     formData.append("imageList", file);
    //   });
    // }

    if (postData) {
      // initialImageList에서 imageId 값만 추출하여 새로운 배열로 만듦
      const imageIdList = initialImageList.map((item) => item.imageId);

      // 배열을 콤마로 구분된 문자열로 변환
      const imageIdString = imageIdList.join(",");

      // FormData 객체에 콤마로 구분된 imageId 문자열을 추가
      formData.append("maintainImageList", imageIdString);
      console.log("initialImageList", initialImageList);
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      putNoticePost(currentClassId, formData).then((result) => {
        // console.log("formData", formData);
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
  };
  useEffect(() => {
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
  // useEffect(() => {
  //   if (postData) {
  //     setTitle(postData.title || "");
  //     setContent(postData.content || "");
  //     if (postData.imageList) {
  //       setPrevImage(postData.imageList);

  //     }
  //   }
  // }, [postData]);
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
              {prevImage.map((item, index) => (
                <img
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    borderRadius: "8px",
                    objectFit: "cover",
                    // margin: "0 5px",
                  }}
                  key={index}
                  src={item.imagePath}
                  alt={`Uploaded ${index}`}
                />
              ))}
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

export default ClassNewPostForm;
