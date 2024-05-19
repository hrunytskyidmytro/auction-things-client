import React, { useState, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Alert,
  Snackbar,
  Avatar,
  Paper,
  CssBaseline,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useRequestPasswordResetMutation } from "../../api/passwordResetApi";

const defaultTheme = createTheme();

const RequestPasswordReset = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

  const [openErrorAlert, setOpenErrorAlert] = useState("");

  const [showCloseMessage, setShowCloseMessage] = useState(false);

  const [requestPasswordReset, { isLoading, error }] =
    useRequestPasswordResetMutation();

  useEffect(() => {
    if (error) {
      setOpenErrorAlert(true);
    }
  }, [error]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      await requestPasswordReset({ email: data.get("email") }).unwrap();
      //   setSuccessMessage("Запит успішно надіслано!");
      setSuccessMessage(true);
      setEmail("");
      setTimeout(() => setShowCloseMessage(true), 10000);
    } catch (err) {}
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Запит на скидання пароля
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <LoadingButton
                loading={isLoading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Надіслати запит
              </LoadingButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={successMessage}
        autoHideDuration={5000}
        onClose={() => setSuccessMessage(false)}
      >
        <Alert
          onClose={() => setSuccessMessage(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {/* {successMessage} */}
          Запит успішно надіслано!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openErrorAlert}
        autoHideDuration={5000}
        onClose={() => setOpenErrorAlert(false)}
      >
        <Alert
          onClose={() => setOpenErrorAlert(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error?.data?.message}
        </Alert>
      </Snackbar>
      {showCloseMessage && (
        <Snackbar open={showCloseMessage} autoHideDuration={null}>
          <Alert
            onClose={() => setShowCloseMessage(false)}
            severity="info"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Якщо все успішно, можете закрити цю вкладку.
          </Alert>
        </Snackbar>
      )}
    </ThemeProvider>
  );
};

export default RequestPasswordReset;
