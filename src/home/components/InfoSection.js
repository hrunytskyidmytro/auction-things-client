import React from "react";
import { Paper, Typography } from "@mui/material";

const InfoSection = ({ title, content }) => {
  return (
    <Paper elevation={5} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      {content.map((paragraph, index) => (
        <Typography variant="body1" key={index} gutterBottom>
          {paragraph}
        </Typography>
      ))}
    </Paper>
  );
};

export default InfoSection;
