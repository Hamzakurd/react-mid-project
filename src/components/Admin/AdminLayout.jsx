import { Box, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";

export default function AdminLayout() {
  const isMobile = useMediaQuery("(max-width:600px)");

  const [isOpen, setIsOpen] = useState(!isMobile);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        maxWidth: "100%",
        minHeight: "100vh",
        backgroundColor: "#eff7fd",
        boxSizing: "border-box",
        overflowX: "clip"
      }}
    >
      {/* ADMIN SIDEBAR */}

      <Sidebar
        open={isOpen}
        onclick={handleClick}
      />

      {/* ADMIN PAGE CONTENT */}

      <Box
        component="main"
        sx={{
          flex: "1 1 0%",
          minWidth: 0,
          minHeight: "100vh",
          boxSizing: "border-box",
          backgroundColor: "#eff7fd",
          overflowX: "auto"
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}