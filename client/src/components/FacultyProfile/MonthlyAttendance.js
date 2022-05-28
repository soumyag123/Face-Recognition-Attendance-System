import React, { useState } from "react";
import "./MonthlyAttendance.css";

const MonthlyAttendance = () => {
  const [inputData, setInputData] = useState({
    fromDate: "",
    toDate: "",
    subject: "",
  });

  const [attendanceData, setAttendanceData] = useState([]);

  let name, value;

  const handleInput = (e) => {
    e.preventDefault();

    name = e.target.name;
    value = e.target.value;

    setInputData({ ...inputData, [name]: value });
  };

  // fetch monthly/date-wise attendance sheet

  const showTable = async () => {
    if (
      inputData.fromDate === "" ||
      inputData.toDate === "" ||
      inputData.subject === ""
    ) {
      window.alert("Please fill in details properly");
    } else {
      const fromDate = inputData.fromDate;
      const toDate = inputData.toDate;
      const subject = inputData.subject;

      const resp = await fetch("/attendanceMonthly", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fromDate,
          toDate,
          subject,
        }),
      });

      const data = await resp.json();
      setAttendanceData(data);
    }
  };

  // to calculate no. of lectures attended by student and percentage attendance

  const getLectures = (num) => {
    let lectures = 0;
    let total_lectures = Math.floor(
      (Date.parse(inputData.toDate) - Date.parse(inputData.fromDate)) / 86400000
    );

    attendanceData.forEach((ele) => {
      if (ele.student_enrollment_no === num) {
        lectures = lectures + 1;
      }
    });

    let percentage = (lectures / total_lectures) * 100;
    percentage = Math.round(percentage);
    return { lectures, percentage };
  };

  return (
    <>
      <div className="first-container">
        <h2 style={{ fontWeight: "bolder" }}>Monthly Attendance</h2>
        <div className="inputDiv">
          <div className="inputField">
            <h4>From Date : </h4>
            <input
              className="input"
              type="date"
              name="fromDate"
              value={inputData.fromDate}
              onChange={handleInput}
            />
          </div>
          <div className="inputField">
            <h4>To Date : </h4>
            <input
              className="input"
              type="date"
              name="toDate"
              value={inputData.toDate}
              onChange={handleInput}
            />
          </div>
          <div className="inputField">
            <h4>Subject : </h4>
            <input
              className="input"
              type="text"
              name="subject"
              value={inputData.subject}
              autoComplete="off"
              placeholder="Enter Subject"
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="btnDiv">
          <input type="submit" onClick={showTable} value="View Sheet" />
        </div>
      </div>
      {attendanceData.length !== 0 && (
        <div className="daily-table">
          <table>
            <tbody>
              <tr>
                <th>Enrollment No.</th>
                <th>Name</th>
                <th>Lectures Attended</th>
                <th>Percentage</th>
              </tr>
              {attendanceData.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{val.student_enrollment_no}</td>
                    <td>{val.student_name}</td>
                    <td>{getLectures(val.student_enrollment_no).lectures}</td>
                    <td>
                      {getLectures(val.student_enrollment_no).percentage +
                        ".00"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default MonthlyAttendance;
