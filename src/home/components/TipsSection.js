import React from "react";
import { Paper, Typography } from "@mui/material";

const TipsSection = ({ title, tips }) => {
  return (
    <Paper elevation={5} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      {tips.map((tip, index) => (
        <Typography variant="body1" key={index}>
          {index + 1}. {tip}
        </Typography>
      ))}
    </Paper>
  );
};

export default TipsSection;
