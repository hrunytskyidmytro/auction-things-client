import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import getLPTheme from "../../shared/components/getLPTheme";
import { Outlet } from "react-router-dom";

const BasicLayout = () => {
  const [mode, setMode] = useState("light");
  const LPtheme = createTheme(getLPTheme(mode));

  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <Box sx={{ bgcolor: "background.default" }}>
        <Outlet />
      </Box>
    </ThemeProvider>
  );
};

export default BasicLayout;
