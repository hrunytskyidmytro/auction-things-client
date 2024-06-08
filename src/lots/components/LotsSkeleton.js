import React from "react";
import {
  CardHeader,
  CardContent,
  Grid,
  Skeleton,
  Box,
  Container,
} from "@mui/material";
import {
  StyledCard,
  StyledCardActions,
  StyledFilterCard,
} from "../styles/cardStyles";

const LotsSkeleton = () => {
  return (
    <Container
      id="lots"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: "100%", md: "100%" },
        }}
      >
        <Grid container spacing={3} sx={{ mt: 15 }}>
          <Grid item xs={12} md={3}>
            <StyledFilterCard>
              <CardHeader
                title={<Skeleton variant="text" width={120} />}
                subheader={<Skeleton variant="text" width={80} />}
              />
              <CardContent sx={{ marginTop: "auto", ml: 1, padding: 0 }}>
                <Skeleton variant="text" animation="wave" width={250} />
              </CardContent>
              <CardContent sx={{ marginTop: "auto", ml: 1, padding: 0 }}>
                <Skeleton variant="text" animation="wave" width={250} />
              </CardContent>
              <CardContent sx={{ marginTop: "auto", ml: 1, padding: 0 }}>
                <Skeleton variant="text" animation="wave" width={250} />
              </CardContent>
            </StyledFilterCard>
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container spacing={3}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <StyledCard>
                    <CardHeader
                      avatar={
                        <Skeleton variant="circular" width={40} height={40} />
                      }
                      title={<Skeleton variant="text" width={120} />}
                      subheader={<Skeleton variant="text" width={80} />}
                    />
                    <Skeleton
                      variant="rectangular"
                      width={"100%"}
                      height={280}
                    />
                    <CardContent sx={{ marginTop: "auto", padding: 0 }}>
                      <Skeleton variant="text" animation="wave" width={250} />
                    </CardContent>
                    <CardContent sx={{ marginTop: "auto" }}>
                      <Skeleton variant="text" animation="wave" width={220} />
                    </CardContent>
                    <StyledCardActions disableSpacing>
                      <Skeleton variant="text" animation="wave" width={120} />
                    </StyledCardActions>
                    <StyledCardActions disableSpacing>
                      <Skeleton variant="text" animation="wave" width={180} />
                    </StyledCardActions>
                    <CardContent sx={{ marginTop: "auto" }}>
                      <Skeleton variant="text" animation="wave" width={250} />
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default LotsSkeleton;
