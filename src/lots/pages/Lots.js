import React, { useState, useEffect } from "react";
import {
  CardHeader,
  CardContent,
  Grid,
  Skeleton,
  Box,
  Container,
  Button,
  Pagination,
} from "@mui/material";
import { StyledCard, StyledCardActions } from "../styles/cardStyles";
import Breadcrumbs from "../../shared/components/UIElements/Breadcrumbs";
import MessageSnackbar from "../../shared/components/UIElements/MessageSnackbar";

import LotCard from "../components/LotCard";

import { useAuth } from "../../shared/hooks/useAuth";
import { useGetAllLotsQuery } from "../../api/lotApi";

const LotsForBuyers = () => {
  const { user } = useAuth();

  // const [sortBy, setSortBy] = useState("");
  // const [sortOrder, setSortOrder] = useState("");
  // const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(10);

  const { data: lots, isLoading, error } = useGetAllLotsQuery();

  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  useEffect(() => {
    if (error) {
      setOpenErrorAlert(true);
    }
  }, [error]);

  if (isLoading) {
    return (
      <Grid container spacing={3} sx={{ mt: 15, justifyContent: "center" }}>
        {Array.from({ length: lots?.length || 4 }).map((_, index) => (
          <Grid item key={index}>
            <StyledCard>
              <CardHeader
                avatar={<Skeleton variant="circular" width={40} height={40} />}
                action={
                  <Skeleton variant="rectangular" width={24} height={24} />
                }
                title={<Skeleton variant="text" width={150} />}
                subheader={<Skeleton variant="text" width={100} />}
              />
              <Skeleton variant="rectangular" width={280} height={250} />
              <CardContent sx={{ marginTop: "auto", padding: 0 }}>
                <Skeleton variant="text" animation="wave" width={280} />
              </CardContent>
              <CardContent sx={{ marginTop: "auto" }}>
                <Skeleton variant="text" animation="wave" width={280} />
              </CardContent>
              <StyledCardActions disableSpacing>
                <Skeleton variant="text" animation="wave" width={150} />
              </StyledCardActions>
              <CardContent sx={{ marginTop: "auto" }}>
                <Skeleton variant="text" animation="wave" width={280} />
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    );
  }

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
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Box sx={{ mt: 15 }}>
              <Breadcrumbs
                links={[
                  { label: "Bid&Win", url: "/" },
                  { label: "Лоти", url: "/lots" },
                ]}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                mt: 1,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button>Сортування</Button>
            </Box>
          </Grid>
          {lots &&
            lots.map((lot) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={lot.id}>
                <LotCard lot={lot} />
              </Grid>
            ))}
          <Grid item xs={12}>
            <Box
              sx={{
                mt: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Pagination
                // count={Math.ceil(total / limit)}
                count={10}
                // page={page}
                // onChange={handlePageChange}
                variant="outlined"
                color="primary"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <MessageSnackbar
        open={openErrorAlert}
        onClose={() => setOpenErrorAlert(false)}
        severity="error"
        message={
          error?.data?.message ||
          "Виникла помилка. Будь ласка, спробуйте ще раз."
        }
      />
    </Container>
  );
};

export default LotsForBuyers;
