import React, { useState } from "react";
import axios from "axios";
import { convertDateFormat, convertTimeFormat } from "../Util/DateUtils";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import TextField from "@mui/material/TextField";
import Textarea from "@mui/joy/Textarea";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import styles from "../Styles/css/Modal.module.css";

function CalendarEventModal({ onClose }) {
  const [dateValue, setDateValue] = useState();
  const [startTimeValue, setStartTimeValue] = useState();
  const [endTimeValue, setEndTimeValue] = useState();
  const [titleValue, setTitleValue] = useState("");
  const [contentsValue, setContentsValue] = useState("");
  const access_token = process.env.REACT_APP_GOOGLE_ACCESS_TOKEN;

  const handleTitleChange = (event) => {
    setTitleValue(event.target.value);
  };

  const handleContentsChange = (event) => {
    setContentsValue(event.target.value);
  };
  const apiUrl =
    "https://www.googleapis.com/calendar/v3/calendars/gofn2023@gmail.com/events";
  const handleAddEvent = async () => {
    try {
      // Google Calendar API에 요청 보내기
      const response = await axios.post(
        apiUrl,
        {
          summary: "Sample Event",
          description: "A sample event added using axios",
          start: {
            dateTime: "2024-07-03T12:00:00",
            timeZone: "Asia/Seoul",
          },
          end: {
            dateTime: "2024-07-03T13:00:00", // 종료 일시
            timeZone: "Asia/Seoul", // 사용자의 시간대로 변경
          },
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`, // 여기에 Google Calendar API에 대한 액세스 토큰을 넣어야 합니다.
          },
        }
      );

      // 성공적으로 이벤트가 추가되었을 때의 처리
      console.log("Event added successfully:", response);
    } catch (error) {
      // 오류 처리
      console.error("Error adding event:", error.response);
    }
  };

  const registerEvent = async () => {
    const startDate =
      convertDateFormat(dateValue) + convertTimeFormat(startTimeValue);
    const endDate =
      convertDateFormat(dateValue) + convertTimeFormat(endTimeValue);
    console.log("startDate" + startDate);
    console.log("endDate" + endDate);

    try {
      // Google Calendar API에 요청 보내기
      const response = await axios.post(
        apiUrl,
        {
          summary: titleValue,
          description: contentsValue,
          start: {
            dateTime: startDate,
            timeZone: "Asia/Seoul",
          },
          end: {
            dateTime: endDate, // 종료 일시
            timeZone: "Asia/Seoul", // 사용자의 시간대로 변경
          },
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`, // 여기에 Google Calendar API에 대한 액세스 토큰을 넣어야 합니다.
          },
        }
      );

      // 성공적으로 이벤트가 추가되었을 때의 처리
      console.log("Event added successfully:", response);
    } catch (error) {
      // 오류 처리
      console.error("Error adding event:", error.response);
    }
  };
  return (
    <div className={styles.modal_container}>
      <div className={styles.modal_content}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoItem label="Date">
            <DatePicker
              value={dateValue}
              onChange={(newValue) => {
                setDateValue(newValue);

                // console.log(convertDateFormat(newValue));
              }}
            />
          </DemoItem>
          <DemoItem label="Start Time">
            <TimeField
              defaultValue={dayjs(`${convertDateFormat(dateValue)}` + "T00:00")}
              value={startTimeValue}
              onChange={(newValue) => {
                console.log(
                  "defaultVal:" + `${convertDateFormat(dateValue)}` + "T00:00"
                );
                console.log(convertTimeFormat(newValue));
                setStartTimeValue(newValue);
              }}
            />
          </DemoItem>
          <DemoItem label="End Time">
            <TimeField
              defaultValue={dayjs(`${convertDateFormat(dateValue)}` + "T00:00")}
              value={endTimeValue}
              onChange={(newValue) => {
                console.log(
                  "defaultVal:" + `${convertDateFormat(dateValue)}` + "T00:00"
                );
                setEndTimeValue(newValue);
              }}
            />
          </DemoItem>
          <DemoItem label="Title">
            <TextField
              required
              id="outlined-required"
              value={titleValue}
              onChange={handleTitleChange}
            />
          </DemoItem>

          <DemoItem label="Contents">
            <Textarea
              className={styles.customTextarea}
              placeholder="Type anything…"
              value={contentsValue}
              onChange={handleContentsChange}
            />
          </DemoItem>

          <button
            className={`${styles.modal_btn} ${styles.close_btn}`}
            size="sm"
            color="info"
            onClick={handleAddEvent}
          >
            Register
          </button>
          <button
            className={`${styles.modal_btn} ${styles.close_btn}`}
            size="sm"
            color="alert"
            onClick={onClose}
          >
            close
          </button>

          <DemoContainer
            components={[
              "DateField",
              "TimeField",
              "DateTimeField",
              "MultiInputDateTimeRangeField",
              "MultiInputTimeRangeField",
              "MultiInputDateTimeRangeField",
            ]}
          ></DemoContainer>
        </LocalizationProvider>
      </div>
    </div>
  );
}

export default CalendarEventModal;
