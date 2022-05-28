import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const StudentLogin = () => {
  const navigate = useNavigate();

  window.onpopstate = () => {
    navigate("/login/student");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMsg, setLoginMsg] = useState("");

  // student login
  const studentLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("/login/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const loginData = await response.json();

    if (response.status === 400 || !loginData) {
      setLoginMsg(loginData.message);
    } else {
      window.alert("Student Login Successfull");
      navigate("/profile/student");
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
      <div className="main">
        <div id="login/student" className="login-page">
          {loginMsg.length !== 0 && (
            <div
              className="alert alert-danger d-flex align-items-center"
              role="alert"
              style={{ maxWidth: "360px", margin: "0 auto 20px" }}
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
              <div>{loginMsg}</div>
            </div>
          )}
          <div className="form">
            <div className="heading">
              <h1
                style={{
                  fontSize: "35px",
                  marginBottom: "3rem",
                  fontWeight: "bolder",
                  color: "rgb(35 58 159)",
                }}
              >
                STUDENT LOGIN
              </h1>
            </div>
            <form className="login-form" method="POST">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button type="submit" name="studentLogin" onClick={studentLogin}>
                login
              </button>
              <p className="message">
                Not registered?{" "}
                <NavLink to="/register/student">Create an account</NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentLogin;
