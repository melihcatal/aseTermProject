import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function createDateObject(isArray, dateString) {
  if (isArray) {
    let from = new Date(dateString[0]);

    const fromMonth = ("0" + (from.getMonth() + 1)).slice(-2);
    const fromDay = ("0" + from.getDate()).slice(-2);
    const fromYear = from.getFullYear();
    const fromDate = fromYear + "-" + fromMonth + "-" + fromDay;

    const to = new Date(dateString[1]);

    const toMonth = ("0" + (to.getMonth() + 1)).slice(-2);
    const toDay = ("0" + to.getDate()).slice(-2);
    const toYear = to.getFullYear();
    const toDate = toYear + "-" + toMonth + "-" + toDay;

    return [fromDate, toDate];
  } else {
    let from = new Date(dateString[0]);

    const fromMonth = ("0" + (from.getMonth() + 1)).slice(-2);
    const fromDay = ("0" + from.getDate()).slice(-2);
    const fromYear = from.getFullYear();
    const fromDate = fromYear + "-" + fromMonth + "-" + fromDay;

    return [fromDate, fromDate];
  }
}

function dateChanged(dateString, setFromDate, setToDate) {
  let fromDate, toDate;
  if (dateString.length > 1) {
    [fromDate, toDate] = createDateObject(true, dateString);
  } else {
    [fromDate, toDate] = createDateObject(false, dateString);
  }

  setFromDate(fromDate);
  setToDate(toDate);
}

function openCalendar() {
  try {
    document.getElementsByClassName("calendar")[0].style.display == "none"
      ? (document.getElementsByClassName("calendar")[0].style.display = "block")
      : (document.getElementsByClassName("calendar")[0].style.display = "none");
  } catch (error) {
    console.log("error");
  }
}

function GameCalendar(props) {
  const [fromDate, setFromDate] = useState("2021-05-08");
  const [toDate, setToDate] = useState("2021-05-08");
  return (
    <div id="calendarDiv">
      <Calendar
        onChange={(dateString) => {
          dateChanged(dateString, setFromDate, setToDate);
        }}
        selectRange={true}
        locale="en"
        allowPartialRange={true}
        defaultValue={[new Date(2021, 4, 8), new Date(2021, 4, 9)]}
        className="calendar"
      />
      <div id="calendarInputDiv">
        <p
          onClick={() => {
            openCalendar();
          }}
        >
          {fromDate}
        </p>

        <p
          onClick={() => {
            openCalendar();
          }}
        >
          {toDate}
        </p>
        <button
          onClick={() => {
            openCalendar();
            props.getFixtures(fromDate, toDate);
          }}
          id="calendarSearchButton"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default GameCalendar;
