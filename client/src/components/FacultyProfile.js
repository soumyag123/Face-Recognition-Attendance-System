import React from "react";
import { Outlet } from "react-router-dom";

import NavBar from "./FacultyProfile/NavBar";

const FacultyProfile = () => {
  return (
    <>
      <div>
        <NavBar />
        <Outlet />
      </div>
    </>
  );
};

export default FacultyProfile;
