import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Typography, Grid, Paper, Container } from "@mui/material";

const BalanceActionPage = () => {
  return (
    <Container component="main" maxWidth="xs" style={{ paddingTop: "50px" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4, mx: 6 }}>
        <img alt="Bid&Win" src="/logo.png" style={{ width: 300 }} />
      </Box>
      <Grid item xs={12} sm={8} md={5} component={Paper}>
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
          <Typography variant="h4" sx={{ mb: 1 }} gutterBottom>
            Оберіть дію
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 2, textAlign: "center" }}
            gutterBottom
          >
            Можливість поповнення або зняття коштів.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/add-funds"
            sx={{ mb: 2 }}
          >
            Поповнити баланс
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={RouterLink}
            to="/withdraw-funds"
          >
            Вивести кошти
          </Button>
        </Box>
      </Grid>
    </Container>
  );
};

export default BalanceActionPage;
