import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import getLPTheme from "../../shared/components/getLPTheme";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  const [mode, setMode] = useState("light");
  const LPtheme = createTheme(getLPTheme(mode));

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <NavBar mode={mode} toggleColorMode={toggleColorMode} />
      <Box sx={{ bgcolor: "background.default" }}>
        <Outlet />
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default UserLayout;
