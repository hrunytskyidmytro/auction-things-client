import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material";
import { Outlet } from "react-router-dom";

const defaultTheme = createTheme();

const BasicLayout = () => {

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box sx={{ bgcolor: "background.default" }}>
        <Outlet />
      </Box>
    </ThemeProvider>
  );
};

export default BasicLayout;
