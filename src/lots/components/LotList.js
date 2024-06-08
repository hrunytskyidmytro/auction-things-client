import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import LotCard from "./LotCard";

const LotList = ({ lotsData, userSeller }) => {
  return (
    <Grid container spacing={3}>
      {lotsData && lotsData.length !== 0 ? (
        lotsData.map((lot) => (
          <Grid item xs={12} sm={6} md={4} key={lot.id}>
            <LotCard lot={lot} userSeller={userSeller} />
          </Grid>
        ))
      ) : (
        <Box
          sx={{
            width: { sm: "100%", md: "100%" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" sx={{ mt: 5 }}>
            Нічого не знайдено.
          </Typography>
        </Box>
      )}
    </Grid>
  );
};

export default LotList;
