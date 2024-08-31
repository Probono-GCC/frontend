import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import {
  Grid,
  Checkbox,
  Typography,
  Box,
  FormControlLabel,
  Button,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";

import AppBar from "../Components/AppBar";
import CustomButton from "../Components/Button";
import { useMediaQueryContext } from "../store/MediaQueryContext";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const Attendance = () => {
  // 학생 목록 정의
  const students = [
    "Abik Lama",
    "Amir Lama",
    "Chhyoing Yanji Lama",
    "Kristina Shrestha",
    "Niraj Basnet",
    "Sawal kapali",
    "Ichhya Tamang",
    "Amika Ghising",
    "Aruna Basnet",
    "Dikesh koju",
  ];
  const location = useLocation();
  const NepaliDate = require("nepali-date");
  const todayNepaliDate = new NepaliDate();
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState(students.map(() => false));
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };
  // 네팔력을 JavaScript Date 객체로 변환
  const [dateValue, setDateValue] = useState(
    dayjs(
      new Date(
        todayNepaliDate.getYear(),
        todayNepaliDate.getMonth() - 1, // JS Date 객체는 월이 0부터 시작하므로 -1 필요
        todayNepaliDate.getDate()
      )
    )
  );
  const { isSmallScreen } = useMediaQueryContext();

  const pathname = location.pathname;

  const className = pathname.substring(pathname.lastIndexOf("/") + 1);

  // 출석 상태 토글
  const toggleAttendance = (index) => {
    const newAttendance = [...attendance];
    newAttendance[index] = !newAttendance[index];
    setAttendance(newAttendance);
  };

  // 학생 컬럼 분할
  const columnCount = isSmallScreen
    ? students.length
    : Math.ceil(students.length / 3);
  const columns = isSmallScreen
    ? [students.slice(0, columnCount)]
    : [
        students.slice(0, columnCount),
        students.slice(columnCount, columnCount * 2),
        students.slice(columnCount * 2),
      ];

  const absences = attendance.filter((isPresent) => !isPresent).length;
  const presentStudents = attendance.filter((isPresent) => isPresent).length;

  const handleCancel = () => {
    setAttendance(students.map(() => false));
  };
  const handleSave = () => {
    navigate(-1);
  };
  useEffect(() => {
    console.log("columns?", todayNepaliDate);
  }, []);

  return (
    <Box>
      <AppBar />
      <IconButton
        sx={{
          marginLeft: 2,
        }}
        onClick={handleBack}
        color="primary"
        aria-label="go back"
      >
        <ArrowBackIcon />
      </IconButton>
      <div style={{ textAlign: "center" }}>
        <Typography
          variant={isSmallScreen ? "h5" : "h3"}
          sx={{
            display: "inline",
            marginBottom: 2,
            fontFamily: "Copperplate",
          }}
        >
          {className}
        </Typography>
        <Typography
          variant={isSmallScreen ? "h5" : "h3"}
          sx={{
            display: "inline",
            marginBottom: 2,
            fontFamily: "Copperplate",
          }}
        >
          &nbsp; Attendence
        </Typography>
      </div>

      <Box
        sx={{
          margin: "0 auto",
          width: "80%",
          height: isSmallScreen ? "auto" : "60vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoItem
            sx={{ width: isSmallScreen ? "200px" : "400px" }}
            label={
              <strong style={{ fontSize: isSmallScreen ? "15px" : "20px" }}>
                Today is{" "}
              </strong>
            }
          >
            <DatePicker
              value={dateValue}
              onChange={(newValue) => setDateValue(newValue)}
            />
          </DemoItem>
        </LocalizationProvider>
        <Grid
          sx={{
            margin: "0 auto",
            width: "100%",
            height: "auto",
            border: "1px solid",
            overflowY: isSmallScreen ? "" : "scroll",
            overflowX: "hidden",
            marginTop: 2,
            borderRadius: "10px",
          }}
          container
          spacing={2}
          justifyContent="center"
        >
          {/* 학생을 3개의 컬럼으로 나누어 렌더링 */}
          {columns.map((column, colIndex) => (
            <Grid
              sx={{
                margin: "0 auto",
                padding: isSmallScreen ? "0 20px" : "0 50px",
              }}
              item
              xs={isSmallScreen ? 12 : 4}
              key={colIndex}
            >
              {column.map((student, index) => (
                <FormControlLabel
                  key={index}
                  label={student}
                  labelPlacement="start"
                  control={
                    <Checkbox
                      checked={attendance[students.indexOf(student)]}
                      onChange={() =>
                        toggleAttendance(students.indexOf(student))
                      }
                      icon={
                        <span
                          style={{
                            width: isSmallScreen ? 20 : 50,
                            height: isSmallScreen ? 20 : 50,
                            backgroundColor: "white",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "red",
                            fontSize: isSmallScreen ? 20 : 30,
                            fontWeight: "bold",
                          }}
                        >
                          X
                        </span>
                      }
                      checkedIcon={
                        <span
                          style={{
                            width: isSmallScreen ? 30 : 50,
                            height: isSmallScreen ? 30 : 50,
                            backgroundColor: "#4CAF50",
                            borderRadius: "50%",
                          }}
                        ></span>
                      }
                    />
                  }
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 2,
                    "& .MuiFormControlLabel-label": {
                      fontSize: isSmallScreen ? "0.8rem" : "1.4rem",
                    },
                  }}
                />
              ))}
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ textAlign: "center" }}>
        <Typography
          sx={{ fontWeight: "bold", fontSize: "20px" }}
          variant="body1"
        >
          No. of absences: {absences}
        </Typography>
        <Typography
          sx={{ fontWeight: "bold", fontSize: "20px" }}
          variant="body1"
        >
          No. of present students: {presentStudents}
        </Typography>
      </Box>

      <Box
        sx={{
          margin: "30px auto",
          width: "100vw",
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <Button
          style={{
            backgroundColor: "white",
            color: "#405c8b",
            // border: "#405c8b 1px solid",
            padding: "10px 20px",
            marginBottom: "30px",
            "&:hover": {
              backgroundColor: "#f5f5f5",
              border: "#2e4a6d 1px solid",
              color: "#bd2304",
            },
          }}
          variant="contained"
          onClick={handleCancel}
        >
          undo
        </Button>

        <Button
          style={{
            backgroundColor: "#405c8b",
            color: "#F2F2F2",
            // border: "#405c8b 1px solid",
            padding: "10px 20px",
            marginBottom: "30px",
            marginLeft: "15px",
            "&:hover": {
              backgroundColor: "#7187a3",
              border: "#42566e 1px solid",
              color: "#1e293b",
            },
          }}
          variant="contained"
          onClick={handleSave}
        >
          save
        </Button>
      </Box>
    </Box>
  );
};

export default Attendance;
