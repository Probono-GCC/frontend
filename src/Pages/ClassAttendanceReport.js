import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CustomButton from "../Components/Button";
import * as XLSX from "xlsx";
import {
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

import AppBar from "../Components/AppBar";
import style from "../Styles/css/Attendance.module.css";

const nepaliMonths = [
  "बैशाख",
  "जेष्ठ",
  "आषाढ",
  "साउन",
  "भाद्र",
  "आश्वयज",
  "कार्तिक",
  "माघ",
  "फाल्गुन",
  "चैत",
];
const currentNepaliYear = 2081;
const nepaliYears = Array.from({ length: 5 }, (_, i) => currentNepaliYear - i);

// Students and days definitions
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
];
const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

const absentDays = {
  1: [0, 1],
  2: [3],
  3: [2, 6, 7, 8],
  4: [9, 10],

  6: [5],
  7: [0, 3, 6],
};

function ClassAttendanceReport() {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState(nepaliMonths[0]);
  const [selectedYear, setSelectedYear] = useState(currentNepaliYear);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const className = pathname.substring(pathname.lastIndexOf("/") + 1);

  const [attendanceData, setAttendanceData] = useState(() => {
    return students.map((_, studentIndex) => {
      const data = Array(31).fill(false);
      for (let day = 1; day <= 14; day++) {
        if (absentDays[day]?.includes(studentIndex)) {
          data[day - 1] = false;
        } else {
          data[day - 1] = true;
        }
      }
      return data;
    });
  });

  const goTodaysAttendance = () => {
    navigate(`/private/class-attendance/today/${className}`);
  };

  const toggleAttendance = (studentIndex, day) => {
    if (day >= 15) {
      const newAttendanceData = [...attendanceData];
      newAttendanceData[studentIndex][day - 1] =
        !newAttendanceData[studentIndex][day - 1];
      setAttendanceData(newAttendanceData);
    }
  };

  const handleExportToExcel = () => {
    const wb = XLSX.utils.book_new();

    // 메타데이터와 출석 정보 데이터 헤더
    const metadataRow = [`${selectedYear}`, `${selectedMonth}`, `${className}`];
    const headers = ["No", "Name", ...daysInMonth.map((day) => `${day}`)];

    // 학생 출석 정보
    const rows = students.map((student, studentIndex) => {
      const attendanceRow = [
        studentIndex + 1,
        student,
        ...daysInMonth.map((_, dayIndex) => {
          return attendanceData[studentIndex][dayIndex] ? "O" : "X";
        }),
      ];
      return attendanceRow;
    });

    // 날짜별 통계 추가
    const statsTitle = ["Monthly Statistics"];
    const statsHeaders = ["Day", "No. of Absences", "No. of Present Students"];

    const stats = daysInMonth.map((day, dayIndex) => {
      const absences = students.filter(
        (_, studentIndex) => !attendanceData[studentIndex][dayIndex]
      ).length;
      const presents = students.length - absences;
      return [`Day ${day}`, absences, presents];
    });

    //시트 데이터 생성
    const wsData = [
      metadataRow, // 날짜, 클래스 명
      headers, // 헤더
      ...rows, // 출석 정보
      [],
      [],
      statsTitle,
      statsHeaders, // 통계 헤더
      ...stats, // 통계 데이터
    ];

    // 시트 생성
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // 시트 엑셀 파일에 추가
    XLSX.utils.book_append_sheet(wb, ws, "Attendance Report");

    // 파일 작성
    XLSX.writeFile(
      wb,
      `${className}_Attendance_${selectedYear}_${selectedMonth}.xlsx`
    );
  };

  return (
    <Box>
      <AppBar />

      <Box
        sx={{
          width: "85vw",
          margin: "25px auto",
        }}
      >
        <FormControl>
          <InputLabel>महिना</InputLabel>
          <Select
            sx={{ marginRight: "20px", width: "100px" }}
            value={selectedMonth}
            onChange={handleMonthChange}
            renderValue={(month) => month}
          >
            {nepaliMonths.map((month) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>वर्ष</InputLabel>
          <Select value={selectedYear} onChange={handleYearChange}>
            {nepaliYears.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography
          variant="h4"
          sx={{
            margin: "20px auto",
            fontFamily: "Copperplate",
          }}
        >
          {className} Monthly Attendance
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            margin: "0 auto",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Name</TableCell>
                {daysInMonth.map((day) => (
                  <TableCell
                    className={style.day_cell}
                    key={day}
                    sx={{ width: "40px" }}
                  >
                    {day}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student, studentIndex) => (
                <TableRow key={studentIndex}>
                  <TableCell>{studentIndex + 1}</TableCell>
                  <TableCell>{student}</TableCell>
                  {daysInMonth.map((_, dayIndex) =>
                    dayIndex < 14 ? (
                      absentDays[dayIndex + 1]?.includes(studentIndex) ? (
                        <TableCell className={style.day_cell} key={dayIndex}>
                          <div>❌</div>
                        </TableCell>
                      ) : (
                        <TableCell className={style.day_cell} key={dayIndex}>
                          <div>🟢</div>
                        </TableCell>
                      )
                    ) : (
                      <TableCell className={style.day_cell} key={dayIndex}>
                        <div>-</div>
                      </TableCell>
                    )
                  )}
                </TableRow>
              ))}
              <TableRow>
                <TableCell
                  colSpan={2}
                  sx={{ fontWeight: "bold", fontSize: "medium" }}
                >
                  No. of Absences
                </TableCell>
                {daysInMonth.map((_, dayIndex) => {
                  const absences = students.filter(
                    (_, studentIndex) => !attendanceData[studentIndex][dayIndex]
                  ).length;
                  return dayIndex < 14 ? (
                    <TableCell
                      key={dayIndex}
                      sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        fontSize: "medium",
                        color: absences != 0 ? "red" : "",
                      }}
                    >
                      {absences}
                    </TableCell>
                  ) : (
                    <TableCell
                      key={dayIndex}
                      sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        fontSize: "medium",
                      }}
                    >
                      -
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow>
                <TableCell
                  colSpan={2}
                  sx={{ fontWeight: "bold", fontSize: "medium" }}
                >
                  No. of Present Students
                </TableCell>
                {daysInMonth.map((_, dayIndex) => {
                  const absences = students.filter(
                    (_, studentIndex) => !attendanceData[studentIndex][dayIndex]
                  ).length;
                  const presents = students.length - absences;
                  return dayIndex < 14 ? (
                    <TableCell
                      key={dayIndex}
                      sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        fontSize: "medium",
                      }}
                    >
                      {presents}
                    </TableCell>
                  ) : (
                    <TableCell
                      key={dayIndex}
                      sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        fontSize: "medium",
                      }}
                    >
                      -
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            position: "relative",
            marginRight: "auto",
            marginLeft: "auto",
            marginBottom: "100px",
            display: "flex",
            textAlign: "center",
            justifyContent: "space-between",
          }}
        >
          <CustomButton
            size="bg"
            title={"Export Excel"}
            id={"cancel"}
            onClick={handleExportToExcel}
          />
          <CustomButton
            title={"Today's Attendance"}
            size="bg"
            id={"view_btn"}
            color="primary"
            onClick={goTodaysAttendance}
          />
        </Box>
        &nbsp; &nbsp; &nbsp;
      </Box>
    </Box>
  );
}

export default ClassAttendanceReport;
