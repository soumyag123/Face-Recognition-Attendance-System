import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

let studentdata = {};

const StudentProfilePage = () => {
  const navigate = useNavigate();

  const [studentData, setStudentData] = useState({});
  const [user, setUser] = useState({
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

  // fetching student data
  const callStudentProfile = async () => {
    try {
      const res = await fetch("/profile/student", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      setUser(data);
      Object.assign(studentdata, data);
      localStorage.setItem("student", JSON.stringify(data));
      setStudentData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
      navigate("/login/student");
    }
  };

  useEffect(() => {
    callStudentProfile();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  // edit student profile

  const updateData = async () => {
    const s_email = studentData.email;
    const response = await fetch("/updateStudent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        s_email,
        user,
      }),
    });
    const result = await response.json();

    if (result.message === "data updated") {
      // setUser('');
      window.alert("Profile updated successfully");
    } else {
      window.alert("Profile failed to update");
    }
  };

  return (
    <>
      <div
        style={{ marginLeft: "350px", marginTop: "2rem" }}
        className="form-container"
      >
        <div className="imgBox">
          <img
            style={{
              borderRadius: "3rem",
              height: "280px",
              border: "4px solid blue",
            }}
            src={studentData.image}
            alt="imagestudent"
          ></img>
          <div className="welcomeDiv">
            <h2
              style={{
                fontWeight: "bolder",
                marginTop: "2rem",
                marginBottom: "1rem",
              }}
            >
              Welcome , {user.name}
            </h2>
            <p style={{ marginBottom: "0rem !important" }}>
              Enrollment No. : {user.enrollment_no}
            </p>
            <p>Department : {user.department}</p>
          </div>
        </div>
        <div className="edit-form" style={{ marginRight: "5rem" }}>
          <h2 style={{ fontWeight: "bolder",marginLeft:'37%' }}>Edit Profile</h2>
          <div className="editbox">
            <div className="left">
              <input
                type="text"
                name="name"
                className="editinput"
                placeholder="Enter your name"
                value={user.name}
                onChange={handleInputs}
                required
              />
              <input
                type="text"
                name="enrollment_no"
                className="editinput"
                placeholder="Enter Enrollment No"
                value={user.enrollment_no}
                onChange={handleInputs}
                required
              />
              <input
                type="text"
                name="email"
                className="editinput"
                placeholder="Enter your email"
                value={user.email}
                onChange={handleInputs}
                required
              />
              <input
                type="text"
                name="phone_number"
                className="editinput"
                placeholder="Enter your number"
                value={user.phone_number}
                onChange={handleInputs}
                required
              />

            </div>
            <div className="right">
              <input
                type="date"
                name="birth_date"
                className="editinput"
                placeholder=""
                value={user.birth_date}
                onChange={handleInputs}
                required
              />
              <select
                name="gender"
                className="editinput"
                value={user.gender}
                onChange={handleInputs}
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <select
                name="department"
                className="editinput"
                value={user.department}
                onChange={handleInputs}
              >
                <option value="">Department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Electronics and Communication">
                  Electronics and Communication
                </option>
                <option value="Mechanical">Mechanical</option>
                <option value="Civil">Civil</option>
                <option value="Electrical">Electrical</option>
              </select>
              <select
                name="semester"
                className="editinput"
                value={user.semester}
                onChange={handleInputs}
              >
                <option value="">Choose option</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>
          <div className="button">
                <input
                  style={{ border: "none", width: "6rem", padding: "4px",marginLeft:'40%' }}
                  type="submit"
                  value="Save Profile"
                  name="update"
                  onClick={updateData}
                />
              </div>
        </div>
      </div>
    </>
  );
};

export { studentdata };
export default StudentProfilePage;
