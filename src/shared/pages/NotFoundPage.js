import React from "react";
import { Button, Typography, Container, Box, Grid, Paper } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <Container component="main" maxWidth="xs" sx={{ mt: 20 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4, mx: 6 }}>
          <img alt="Bid&Win" src="/logo.png" style={{ width: 300 }} />
        </Box>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          sx={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              px: 4,
              py: 4,
              marginTop: 15,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h3" gutterBottom>
              404
            </Typography>
            <Typography variant="h5" gutterBottom>
              Сторінка не знайдена
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 2, textAlign: "center" }}
              gutterBottom
            >
              Сторінка, яку Ви шукаєте, могла бути видалена, якщо її назва або
              вона тимчасово недоступна.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 1 }}
              component={RouterLink}
              to="/"
            >
              Повернутися на головну
            </Button>
          </Box>
        </Grid>
      </Container>
    </>
  );
};

export default NotFoundPage;
