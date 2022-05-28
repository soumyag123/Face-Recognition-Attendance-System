import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CaptureImage from "./CaptureImage";
import { imageSrc } from "./CaptureImage";
import Swal from "sweetalert2";

const StudentRegister = () => {
  let navigate = useNavigate();

  const [render, setRender] = useState(false);
  const [message, setMessage] = useState("");

  const [student, setStudent] = useState({
    name: "",
    enrollment_no: "",
    birth_date: "",
    email: "",
    department: "",
    semester: "",
    gender: "",
    phone_number: "",
    password: "",
    confirm_password: "",
    image: "",
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setStudent({ ...student, [name]: value });
  };

  const captureImage = () => {
    setRender(!render);
    if (render === true && imageSrc !== "") {
      student.image = imageSrc;
      setStudent(student);
    }
  };

  const sendData = async (e) => {
    e.preventDefault();

    // console.log(student);

    const {
      name,
      enrollment_no,
      birth_date,
      email,
      department,
      semester,
      gender,
      phone_number,
      password,
      confirm_password,
      image,
    } = student;

    const studentdata = await fetch("/register/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        enrollment_no,
        birth_date,
        email,
        department,
        semester,
        gender,
        phone_number,
        password,
        confirm_password,
        image,
      }),
    });

    const newStudentData = await studentdata.json();

    if (studentdata.status === 422 || !newStudentData) {
      setMessage(newStudentData.message);
    } else {
      Swal.fire({
        icon: "success",
        title: "Registration Successfull",
      });

      navigate("/login/student");
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

      <div className="main-Class">
        {message.length !== 0 && (
          <div
            className="alert-msg"
            style={{ maxWidth: "680px", margin: "0 auto" }}
          >
            <div
              className="alert alert-danger d-flex align-items-center"
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
              <div>{message}</div>
            </div>
          </div>
        )}
        <div className="wrapperClass">
          <div className="registerCard">
            <div className="cardBody">
              <div className="title">STUDENT REGISTRATION FORM</div>
              <form method="post">
                <div className="row-grp">
                  <div className="col1">
                    <div className="inputGrp">
                      <label className="Label">Name</label>
                      <input
                        type="text"
                        name="name"
                        className="inputBx"
                        placeholder="Enter your name"
                        value={student.name}
                        onChange={handleInputs}
                        required
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="col1">
                    <div className="inputGrp">
                      <label className="Label">Enrollment No.</label>
                      <input
                        type="text"
                        name="enrollment_no"
                        className="inputBx"
                        placeholder="Enter Enrollment No"
                        value={student.enrollment_no}
                        onChange={handleInputs}
                        required
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
                <div className="row-grp">
                  <div className="col1">
                    <div className="inputGrp">
                      <label className="Label">Email</label>
                      <input
                        type="text"
                        name="email"
                        className="inputBx"
                        placeholder="Enter your email"
                        value={student.email}
                        onChange={handleInputs}
                        required
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="col1">
                    <div className="inputGrp">
                      <label className="Label">Phone Number</label>
                      <input
                        type="text"
                        name="phone_number"
                        className="inputBx"
                        placeholder="Enter your number"
                        value={student.phone_number}
                        onChange={handleInputs}
                        required
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
                <div className="row-grp">
                  <div className="col1">
                    <div className="inputGrp">
                      <label className="Label">Password</label>
                      <input
                        type="password"
                        name="password"
                        className="inputBx"
                        placeholder="Enter your password"
                        value={student.password}
                        onChange={handleInputs}
                        required
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="col1">
                    <div className="inputGrp">
                      <label className="Label">Confirm Password</label>
                      <input
                        type="password"
                        name="confirm_password"
                        className="inputBx"
                        placeholder="Confirm your password"
                        value={student.confirm_password}
                        onChange={handleInputs}
                        required
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
                <div className="row-grp">
                  <div className="col1">
                    <div className="inputGrp">
                      <label className="Label">Birthday</label>
                      <input
                        type="date"
                        name="birth_date"
                        className="inputBx"
                        placeholder=""
                        value={student.birth_date}
                        onChange={handleInputs}
                        required
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="col1">
                    <div className="inputGrp">
                      <label className="Label">Gender</label>
                      <select
                        name="gender"
                        value={student.gender}
                        onChange={handleInputs}
                        className="select"
                      >
                        <option value="">Choose option</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row-grp">
                  <div className="col1">
                    <label className="Label">Department</label>
                    <select
                      name="department"
                      value={student.department}
                      onChange={handleInputs}
                      className="select"
                    >
                      <option value="">Choose option</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Electronics and Communication">
                        Electronics and Communication
                      </option>
                      <option value="Mechanical">Mechanical</option>
                      <option value="Civil">Civil</option>
                      <option value="Electrical">Electrical</option>
                    </select>
                  </div>
                  <div className="col1">
                    <label className="Label">Semester</label>
                    <select
                      name="semester"
                      value={student.semester}
                      onChange={handleInputs}
                      className="select"
                    >
                      <option value="">Choose option</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: "flex"}}>
                  <button
                    className="btn btn-success"
                    type="button"
                    onClick={captureImage}
                    style={{ marginTop: "1rem", backgroundColor:'rgb(35 58 159)' }}
                  >
                    Capture Image
                  </button>
                  {imageSrc && (
                    <div
                      className="alert alert-success d-flex align-items-center"
                      style={{
                        marginTop: "1rem",
                        marginLeft: "1rem",
                        padding: "6px",
                      }}
                      role="alert"
                    >
                      <svg
                        className="bi flex-shrink-0 me-2"
                        width="25"
                        height="25"
                        role="img"
                        aria-label="Success:"
                      >
                        <use xlinkHref="#check-circle-fill" />
                      </svg>
                      <div>Image Uploaded Successfully</div>
                    </div>
                  )}
                </div>
                <div className="button" style={{ marginTop: "1rem" }}>
                  <input
                    type="submit"
                    value="Register"
                    name="register"
                    className="btn btn-success"
                    onClick={sendData}
                    style={{ width: "100%", height: "3rem",backgroundColor:'rgb(35 58 159)' }}
                  />
                </div>
              </form>
              {render && (
                <CaptureImage trigger={render} handleClose={captureImage} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentRegister;
