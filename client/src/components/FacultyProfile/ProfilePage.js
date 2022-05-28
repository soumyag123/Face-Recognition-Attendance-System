import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

let facultydata = {};

const ProfilePage = () => {
  const navigate = useNavigate();

  window.onpopstate = () => {
    navigate("/profile/faculty");
  };

  const [facultyData, setFacultyData] = useState({});
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    department: "",
    email: "",
    gender: "",
    phone_number: "",
    password: "",
    confirm_password: "",
  });

  // fetch faculty details
  const callFacultyProfile = async () => {
    try {
      const res = await fetch("/profile/faculty", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      setUser(data);
      Object.assign(facultydata, data);
      setFacultyData(data);
      localStorage.setItem("faculty", JSON.stringify(data));

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
      navigate("/login/faculty");
    }
  };

  useEffect(() => {
    callFacultyProfile();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  // edit faculty profile

  const updateData = async () => {
    const f_email = facultyData.email;
    const response = await fetch("/updateFaculty", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        f_email,
        user,
      }),
    });
    const result = await response.json();

    if (result.message === "data updated") {
      window.alert("Profile updated successfully");
    } else {
      window.alert("Profile failed to update");
    }
  };

  return (
    <>
      <div style={{ marginLeft: "350px" }} className="profile-container">
        <h2 style={{marginLeft:'20%'}}>Welcome , {user.firstname}</h2>
        <div className="edit-form">
          <h2 style={{ fontWeight: "bolder",marginLeft:'36%' }}>Edit Profile</h2>
          <div className="editbox">
            <div className="left">
              <input
                type="text"
                name="firstname"
                id=""
                className="editinput"
                placeholder="Enter your name"
                value={user.firstname}
                onChange={handleInputs}
                required
              />
              <input
                type="text"
                name="lastname"
                id=""
                className="editinput"
                placeholder="Enter your name"
                value={user.lastname}
                onChange={handleInputs}
                required
              />
              <input
                type="text"
                name="email"
                id=""
                className="editinput"
                placeholder="Enter your email"
                value={user.email}
                onChange={handleInputs}
                required
              />

            </div>
            <div className="right">
              <input
                type="text"
                name="phone_number"
                id=""
                className="editinput"
                placeholder="Enter your number"
                value={user.phone_number}
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
            </div>
          </div>
          <div className="button">
                <input
                  style={{ border: "none", width: "6rem", padding: "6px",marginLeft:'40%',}}
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

export { facultydata };
export default ProfilePage;
