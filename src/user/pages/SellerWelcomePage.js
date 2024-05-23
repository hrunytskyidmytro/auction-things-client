import React from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

const SellerWelcomePage = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            marginTop: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom>
            Ласкаво просимо до платформи для продавців!
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{ mb: 4, textAlign: "center" }}
          >
            Ми раді вітати вас серед наших продавців. Почніть створювати свої
            аукціони вже сьогодні!
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="h6">Створити новий аукціон</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Додайте новий аукціон, заповнивши необхідну інформацію про
                  товар.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  //   onClick={() => navigate("/create-auction")}
                >
                  Створити аукціон
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="h6">Управління аукціонами</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Переглядайте та керуйте вашими активними та завершеними
                  аукціонами.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  //   onClick={() => navigate("/manage-auctions")}
                >
                  Переглянути аукціони
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="h6">Підтримка та FAQ</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Ознайомтесь з частими запитаннями або зв'яжіться з нашою
                  підтримкою для допомоги.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  //   onClick={() => navigate("/support")}
                >
                  Отримати допомогу
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SellerWelcomePage;
