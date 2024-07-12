import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import { useSelector } from "react-redux";
import styles from '../Styles/css/calendar.module.css';

function Calender() {
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

    const [modalOpen, setModalOpen] = useState(false);

    const user = useSelector((state) => state.user);

    return (
        <div id={styles.myCalendar}>
        <FullCalendar
          plugins={[dayGridPlugin, googleCalendarPlugin]}
          initialView="dayGridMonth"
          googleCalendarApiKey={apiKey}
          events={{
            googleCalendarId: "gofn2023@gmail.com",
          }}
          eventDisplay={"block"}
          eventTextColor={"#fff"}
          eventColor={"#0343CB"}
          height={"auto"}
          width={"100%"}
          // Toolbar
          headerToolbar={{
            left: "prev,next", // Display today, prev, and next buttons
            center: "title", // Display the title in the center of the header
            right: user.account === 0 ? "addButton" : "", // Display the custom "Add" button on the right side for account === 1
          }}
          customButtons={{
            // Define the custom "Add" button
            addButton: {
              text: "Add", // Button text
              click: () => {
                setModalOpen(true);
              },
            },
          }}
        />
      </div>
    )
}

export default Calender;