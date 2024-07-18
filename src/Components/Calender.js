import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
//오픈 라이브러리
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
//사용자 정의 컴포넌트
import ModalComponent from "./CalendarEventModal.js";
//css
import styles from "../Styles/css/Calendar.module.css";

function Calender() {
  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

  // const user = useSelector((state) => state.user);
  const [modalOpen, setModalOpen] = useState(false);

  const handleEventClick = (clickInfo) => {
    // 클릭된 이벤트의 URL로 새 창 열기
    const eventUrl = clickInfo.event.url;
    if (eventUrl) {
      window.open(eventUrl, "_blank");
    }
    clickInfo.jsEvent.preventDefault(); // 기본 동작 막기
  };

  return (
    <div>
      <div>
        {modalOpen && <ModalComponent onClose={() => setModalOpen(false)} />}
      </div>
      <div id={styles.myCalendar}>
        <FullCalendar
          plugins={[dayGridPlugin, googleCalendarPlugin]}
          initialView="dayGridMonth"
          googleCalendarApiKey={API_KEY}
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
            right: "addButton",
            // right: user.account === 0 ? "addButton" : "", // Display the custom "Add" button on the right side for account === 1
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
          eventClick={handleEventClick} // 이벤트 클릭 핸들러 추가
        />
      </div>
    </div>
  );
}

export default Calender;
