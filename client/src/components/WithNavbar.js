import React from "react";
import NavBar from "./Navbar";
import { Outlet } from "react-router-dom";

const WithNavbar = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default WithNavbar;
