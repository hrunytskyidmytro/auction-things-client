import React from "react";
import { Paper, Typography } from "@mui/material";

const StatsCard = ({ title, value }) => {
  return (
    <Paper elevation={5} sx={{ p: 3 }}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h4">{value}</Typography>
    </Paper>
  );
};

export default StatsCard;
