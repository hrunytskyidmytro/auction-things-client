import React from "react";
import { Grid, Box, Container, Button, Pagination } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAuth } from "../../shared/hooks/useAuth";
import { useGetLotsByCategoryQuery } from "../../api/categoryApi";

import Breadcrumbs from "../../shared/components/UIElements/Breadcrumbs";
import MessageSnackbar from "../../shared/components/UIElements/MessageSnackbar";

import LotCard from "../components/LotCard";

const LotsPageByCategory = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const { data: lots, error, isLoading } = useGetLotsByCategoryQuery(id);

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
      {/* <MessageSnackbar
        open={openErrorAlert}
        onClose={() => setOpenErrorAlert(false)}
        severity="error"
        message={
          error?.data?.message ||
          "Виникла помилка. Будь ласка, спробуйте ще раз."
        }
      /> */}
    </Container>
  );
};

export default LotsPageByCategory;
