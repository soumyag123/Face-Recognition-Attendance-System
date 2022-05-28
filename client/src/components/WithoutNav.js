import React from "react";
import { Outlet } from "react-router-dom";

const WithoutNav = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default WithoutNav;
