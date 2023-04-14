import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const Layout = () => {
  const isNoneMobile: boolean = useMediaQuery("(min-width: 600px)");

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  return (
    <Box display={isNoneMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        isNoneMobile={isNoneMobile}
        drawerWidth="250px"
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
      <Box>
        <Navbar    isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen} />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
