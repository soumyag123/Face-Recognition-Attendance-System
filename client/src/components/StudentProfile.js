import React from "react";
import SideNav from "./StudentProfile/SideNav";
import { Outlet } from "react-router-dom";

const StudentProfile = () => {
  return (
    <>
      <SideNav />
      <Outlet />
    </>
  );
};

export default StudentProfile;
