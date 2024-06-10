import React from "react";
import { Grid, Box, Typography, Container } from "@mui/material";
import { useGetLatestLotsQuery } from "../../api/lotApi";
import LotCard from "../../lots/components/LotCard";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const LatestLots = () => {
  const { data: latestLots, error, isLoading } = useGetLatestLotsQuery();

  if (isLoading) {
    return <LoadingSpinner size={50} />;
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Typography
          variant="h4"
          textAlign={"center"}
          fontWeight={600}
          sx={{ my: 5 }}
        >
          Нещодавні лоти
        </Typography>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {latestLots && latestLots.length !== 0 ? (
              latestLots.map((lot) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={lot.id}>
                  <LotCard lot={lot} />
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
                <Typography variant="h5" sx={{ mt: 2 }}>
                  Нічого не знайдено.
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
        <Typography variant="h5">{error?.data?.message}</Typography>
      </Container>
    </>
  );
};

export default LatestLots;
