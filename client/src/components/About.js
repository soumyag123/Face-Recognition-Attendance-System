import React from "react";
import { FaCheck } from "react-icons/fa";

const About = () => {
  return (
    <div id="about" className="about">
      <div className="subDiv">
        <div className="leftCol"></div>
        <div className="rightCol">
          <h2 style={{ fontWeight: "700", color: "#4e1781" }}>
            FACE RECOGNITION BASED ATTENDANCE SYSTEM
          </h2>
          <p style={{ color: "#666" }}>
            A system for recognizing human faces fast and precisely for
            attendance
          </p>
          <div style={{ marginTop: "3rem" }}>
            <div style={{ display: "flex" }}>
              <div style={{ color: "#4e1781", marginRight: "7px" }}>
                <FaCheck />
              </div>
              <div>
                <h4 style={{ fontWeight: "600", color: "#4e1781" }}>
                  FACE SCANNING
                </h4>
                <p style={{ color: "#666" }}>
                  Scan faces of students in few seconds and marks attendance
                </p>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ color: "#4e1781", marginRight: "7px" }}>
                <FaCheck />
              </div>
              <div>
                <h4 style={{ fontWeight: "600", color: "#4e1781" }}>
                  USER FRIENDLY
                </h4>
                <p style={{ color: "#666" }}>
                  Easily accessible and understandable
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
