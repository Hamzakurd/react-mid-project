
import { Box, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./SideBar";
import AdminThemeProvider from "../Context/AdminThemeProvider";

export default function AdminLayout() {
  const isMobile = useMediaQuery("(max-width:600px)");

  const [isOpen, setIsOpen] = useState(!isMobile);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <AdminThemeProvider>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          maxWidth: "100%",
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
          boxSizing: "border-box",
          overflowX: "clip"
        }}
      >
        <Sidebar
          open={isOpen}
          onclick={handleClick}
        />

        <Box
          component="main"
          sx={{
            flex: "1 1 0%",
            minWidth: 0,
            minHeight: "100vh",
            boxSizing: "border-box",
            bgcolor: "background.default",
            color: "text.primary",
            overflowX: "auto"
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </AdminThemeProvider>
  );
}
