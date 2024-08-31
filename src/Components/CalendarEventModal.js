import React, { useState } from "react";
import axios from "axios";
import { convertDateFormat, convertTimeFormat } from "../Util/DateUtils";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import Textarea from "@mui/joy/Textarea";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import styles from "../Styles/css/Modal.module.css";

function CalendarEventModal({ onClose }) {
  const [dateValue, setDateValue] = useState();
  const [startTimeValue, setStartTimeValue] = useState();
  const [endTimeValue, setEndTimeValue] = useState();
  const [titleValue, setTitleValue] = useState("");
  const [contentsValue, setContentsValue] = useState("");
  const [titleError, setTitleError] = useState(false);

  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
  const REFRESH_TOKEN = process.env.REACT_APP_REFRESH_TOKEN;
  const API_URL = process.env.REACT_APP_API_URL;

  const handleTitleChange = (event) => {
    setTitleValue(event.target.value);
    setTitleError(false);
  };

  const handleContentsChange = (event) => {
    setContentsValue(event.target.value);
  };

  const fetchAccessToken = async () => {
    try {
      const response = await axios.post(
        "https://oauth2.googleapis.com/token",
        null,
        {
          params: {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            refresh_token: REFRESH_TOKEN,
            grant_type: "refresh_token",
          },
        }
      );
      return response.data.access_token;
    } catch (error) {
      console.error("Error fetching access token", error);
    }
  };

  const registerEvent = async () => {
    if (!titleValue) {
      setTitleError(true);
      return;
    }
    const access_token = await fetchAccessToken();

    const startDate =
      convertDateFormat(dateValue) +
      (startTimeValue ? convertTimeFormat(startTimeValue) : "T00:00:00");
    const endDate =
      convertDateFormat(dateValue) +
      (endTimeValue ? convertTimeFormat(endTimeValue) : "T23:59:59");

    const event = {
      summary: titleValue,
      description: contentsValue ? contentsValue : "",
      start: {
        dateTime: startTimeValue ? startDate : undefined,
        date: !startTimeValue ? convertDateFormat(dateValue) : undefined,
        timeZone: "Asia/Kathmandu",
      },
      end: {
        dateTime: endTimeValue ? endDate : undefined,
        date: !endTimeValue ? convertDateFormat(dateValue) : undefined,
        timeZone: "Asia/Kathmandu",
      },
    };

    try {
      const response = await axios.post(API_URL, event, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      //console.log("Event added successfully:", response);
      onClose(true);
    } catch (error) {
      console.error("Error adding event:", error.response, event);
    }
  };

  return (
    <div className={styles.modal_container}>
      <div className={styles.modal_content}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoItem
            sx={{ marginBottom: 3 }}
            className={styles.demoItem}
            label={<strong>Date *</strong>}
          >
            <DatePicker
              value={dateValue}
              onChange={(newValue) => setDateValue(newValue)}
            />
          </DemoItem>
          <DemoItem
            sx={{ marginBottom: 3 }}
            className={styles.demoItem}
            label="Start Time"
          >
            <TimePicker
              value={startTimeValue}
              onChange={(newValue) => setStartTimeValue(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </DemoItem>
          <DemoItem
            sx={{ marginBottom: 3 }}
            className={styles.demoItem}
            label="End Time"
          >
            <TimePicker
              value={endTimeValue}
              onChange={(newValue) => setEndTimeValue(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </DemoItem>
          <DemoItem
            sx={{ marginBottom: 3 }}
            className={styles.demoItem}
            label={<strong>Title *</strong>}
          >
            <TextField
              required
              id="outlined-required"
              value={titleValue}
              onChange={handleTitleChange}
              error={titleError}
              helperText={titleError ? "Title is required" : ""}
              className={styles.textField}
            />
          </DemoItem>

          <DemoItem
            sx={{ marginBottom: 3 }}
            className={styles.demoItem}
            label="Contents"
          >
            <Textarea
              className={styles.customTextarea}
              placeholder="Type anything…"
              value={contentsValue}
              onChange={handleContentsChange}
            />
          </DemoItem>

          <button
            className={`${styles.modal_btn} ${styles.register_btn}`}
            size="sm"
            onClick={registerEvent}
          >
            Register
          </button>
          <button
            className={`${styles.modal_btn} ${styles.close_btn}`}
            size="sm"
            onClick={() => onClose(false)}
          >
            Close
          </button>
        </LocalizationProvider>
      </div>
    </div>
  );
}

export default CalendarEventModal;
