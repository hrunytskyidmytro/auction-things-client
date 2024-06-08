import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const StartButton = () => {
  return (
    <Box sx={{ mt: 6, textAlign: "center" }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Готові почати?
      </Typography>
      <Button
        variant="contained"
        color="success"
        size="large"
        component={RouterLink}
        to="/select-role"
      >
        Створити обліковий запис
      </Button>
    </Box>
  );
};

export default StartButton;
