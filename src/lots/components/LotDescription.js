import React from "react";
import { Typography, Box } from "@mui/material";

const LotDescription = ({ lot }) => {
  return (
    <>
      <Box mt={3}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Опис
        </Typography>
        <Typography variant="body1" paragraph>
          {lot?.description}
        </Typography>
      </Box>
    </>
  );
};

export default LotDescription;
