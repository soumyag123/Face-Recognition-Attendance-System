import React, { useState } from "react";
import "./DailyAttendance.css";
import { facultydata } from "./ProfilePage";

// change date to desired format to be displayed in table
const formatDate = (date) => {
  const dArr = date.split("-");
  return dArr[2] + "-" + dArr[1] + "-" + dArr[0];
};

const DailyAttendance = () => {
  const [subject, setSubject] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [emailSent, setEmailSent] = useState(null);

  const handleInput = (e) => {
    e.preventDefault();

    setSubject(e.target.value);
  };

  // fetch daily attendance data from database
  const showValue = async () => {
    const date = new Date().toISOString().slice(0, 10);

    if (subject === "") {
      window.alert("Please fill the details properly");
    } else {
      const resp = await fetch("/attendanceDaily", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject,
          date,
        }),
      });

      const data = await resp.json();
      setAttendanceData(data);
      setSubject("");
    }
  };

  // send email to all the students absent in the class

  const sendEmail = async () => {
    const date = new Date().toISOString().slice(0, 10);

    if (subject === "") {
      window.alert("Please fill the details properly");
    } else {
      const resp = await fetch("/sendEmailAbsentees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject,
          date,
          facultydata,
        }),
      });

      const data = await resp.json();

      if (data.message === "Email sent successfully") {
        setEmailSent(true);
      } else {
        setEmailSent(false);
      }
    }
  };

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </symbol>
        <symbol
          id="exclamation-triangle-fill"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </symbol>
      </svg>
      {emailSent !== null &&
        (emailSent ? (
          <div
            className="alert alert-success d-flex align-items-center"
            style={{
              marginLeft: "350px",
              marginRight: "4rem",
              marginTop: "2rem",
            }}
            role="alert"
          >
            <svg
              className="bi flex-shrink-0 me-2"
              width="24"
              height="24"
              role="img"
              aria-label="Success:"
            >
              <use xlinkHref="#check-circle-fill" />
            </svg>
            <div>Email sent successfully</div>
          </div>
        ) : (
          <div
            class="alert alert-danger d-flex align-items-center"
            style={{
              marginLeft: "350px",
              marginRight: "4rem",
              marginTop: "2rem",
            }}
            role="alert"
          >
            <svg
              className="bi flex-shrink-0 me-2"
              width="24"
              height="24"
              role="img"
              aria-label="Danger:"
            >
              <use xlinkHref="#exclamation-triangle-fill" />
            </svg>
            <div>Failed to send email</div>
          </div>
        ))}
      <div style={{ marginLeft: "350px" }} className="main-container">
        <h2 style={{ fontWeight: 700 }}>Today's Attendance</h2>
        <div
          style={{ display: "flex", flexDirection: "row", marginTop: "2rem" }}
        >
          <h4 style={{ fontWeight: "bold", marginRight: "1rem" }}>Subject :</h4>
          <input
            autoComplete="off"
            style={{ border: "none", padding: "4px" }}
            type="text"
            name="subject"
            value={subject}
            onChange={handleInput}
            placeholder="Enter Subject"
          />
        </div>
        <div style={{ marginTop: "1rem", paddingLeft: "60%" }}>
          <input
            style={{ padding: "4px", border: "none" }}
            type="submit"
            onClick={showValue}
            value="View Sheet"
          />
          <input
            style={{ padding: "4px", border: "none", marginLeft: "20px" }}
            type="submit"
            onClick={sendEmail}
            value="Send Email to Absentees"
          />
        </div>
      </div>
      {attendanceData.length !== 0 && (
        <div className="daily-table">
          <table>
            <tbody>
              <tr>
                <th>Enrollment No.</th>
                <th>Name</th>
                <th>Subject</th>
                <th>Time</th>
                <th>Date</th>
              </tr>
              {attendanceData.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{val.student_enrollment_no}</td>
                    <td>{val.student_name}</td>
                    <td>{val.subject_name}</td>
                    <td>{val.attendance_time}</td>
                    <td>{formatDate(val.date)}</td>
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

export default DailyAttendance;
