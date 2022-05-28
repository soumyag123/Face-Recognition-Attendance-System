import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// handling faculty registration

const FacultyRegister = () => {
  let navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [faculty, setFaculty] = useState({
    firstname: "",
    lastname: "",
    department: "",
    email: "",
    gender: "",
    phone_number: "",
    password: "",
    confirm_password: "",
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setFaculty({ ...faculty, [name]: value });
  };

  const sendData = async (e) => {
    e.preventDefault();

    const {
      firstname,
      lastname,
      department,
      email,
      gender,
      phone_number,
      password,
      confirm_password,
    } = faculty;

    const facultydata = await fetch("/register/faculty", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        department,
        email,
        gender,
        phone_number,
        password,
        confirm_password,
      }),
    });

    const newFacultyData = await facultydata.json();
    console.log(newFacultyData);

    if (facultydata.status === 422 || !newFacultyData) {
      setMessage(newFacultyData.message);
      console.log("Invalid registration");
    } else {
      Swal.fire({
        icon: "success",
        title: "Registration Successfull",
      });
      console.log("registered");

      navigate("/login/faculty");
    }
  };

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
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
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            <div
              class="alert alert-danger d-flex align-items-center"
              role="alert"
            >
              <svg
                class="bi flex-shrink-0 me-2"
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
              <div className="title">FACULTY REGISTRATION FORM</div>
              <form method="post">
                <div className="row-grp">
                  <div className="col1">
                    <div className="inputGrp">
                      <label className="Label">First Name</label>
                      <input
                        type="text"
                        name="firstname"
                        className="inputBx"
                        placeholder="Enter your name"
                        value={faculty.firstname}
                        onChange={handleInputs}
                        required
                      />
                    </div>
                  </div>
                  <div className="col1">
                    <div className="inputGrp">
                      <label className="Label">Last Name</label>
                      <input
                        type="text"
                        name="lastname"
                        className="inputBx"
                        placeholder="Enter your name"
                        value={faculty.lastname}
                        onChange={handleInputs}
                        required
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
                        value={faculty.email}
                        onChange={handleInputs}
                        required
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
                        value={faculty.phone_number}
                        onChange={handleInputs}
                        required
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
                        value={faculty.password}
                        onChange={handleInputs}
                        required
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
                        value={faculty.confirm_password}
                        onChange={handleInputs}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row-grp">
                  <div className="col1">
                    <div className="inputGrp">
                      <label className="Label">Gender</label>
                      <select
                        className="select"
                        name="gender"
                        value={faculty.gender}
                        onChange={handleInputs}
                      >
                        <option value="">Choose option</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>
                  <div className="col1">
                    <div className="inputGrp">
                      <label className="Label">Department</label>
                      <select
                        className="select"
                        name="department"
                        value={faculty.department}
                        onChange={handleInputs}
                      >
                        <option value="">Choose option</option>
                        <option value="Computer Science">
                          Computer Science
                        </option>
                        <option value="Electronics and Communication">
                          Electronics and Communication
                        </option>
                        <option value="Mechanical">Mechanical</option>
                        <option value="Civil">Civil</option>
                        <option value="Electrical">Electrical</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="button" style={{ marginTop: "1rem" }}>
                  <input
                    type="submit"
                    style={{ width: "100%", height: "3rem",backgroundColor:'rgb(35 58 159)' }}
                    className="btn btn-success"
                    value="Register"
                    name="register"
                    onClick={sendData}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FacultyRegister;
