import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const LotsButton = ({ text, buttonText, buttonLink }) => {
  return (
    <Box sx={{ mt: 6, textAlign: "center" }}>
      <Typography variant="h4" component="h2" gutterBottom>
        {text}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        component={RouterLink}
        to={buttonLink}
      >
        {buttonText}
      </Button>
    </Box>
  );
};

export default LotsButton;
