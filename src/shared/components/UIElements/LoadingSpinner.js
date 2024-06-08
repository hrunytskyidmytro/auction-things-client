import React from "react";
import { Box, CircularProgress } from "@mui/material";

const LoadingSpinner = ({ size }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress size={size} thickness={3.6} />
    </Box>
  );
};

export default LoadingSpinner;
