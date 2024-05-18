import React, { useState, useEffect } from "react";
import { Box, Grid, Link, Avatar, Typography, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";

import { useCreateUserMutation } from "../../api/userApi";

const defaultTheme = createTheme();

const BuyerSignUp = () => {
  const [createUser, { isLoading, error }] = useCreateUserMutation();
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const path = window.location.pathname.split("/");
    const roleFromPath = path[path.length - 1].toUpperCase();
    setRole(roleFromPath);
  }, []);

  const handleChange = (value) => {
    setPhoneNumber(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      await createUser({
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        patronymic: data.get("patronymic"),
        email: data.get("email"),
        password: data.get("password"),
        confirmPassword: data.get("confirmPassword"),
        role,
        phoneNumber: phoneNumber,
      }).unwrap();
      navigate(`/check-pin-code?email=${data.get("email")}`);
    } catch (err) {
      console.error("Error:", err);
    }
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
            {error && error.data.message}
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Реєстрація покупця
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="Ім'я"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Прізвище"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="patronymic"
                    label="По-батькові"
                    name="patronymic"
                    autoComplete="surname"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Пароль"
                    type="password"
                    id="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Пароль ще раз"
                    type="password"
                    id="confirmPassword"
                  />
                </Grid>
                <Grid item xs={12}>
                  <PhoneInput
                    country={"ua"}
                    value={phoneNumber}
                    onChange={handleChange}
                    placeholder="Введіть номер телефону"
                    inputProps={{ required: true }}
                    inputStyle={{ width: "100%" }}
                    dropdownStyle={{ width: "100%", minWidth: "736px" }}
                    searchStyle={{ width: "670px" }}
                    enableSearch={true}
                  />
                </Grid>
              </Grid>
              <LoadingButton
                loading={isLoading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Зареєструватися
              </LoadingButton>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Вже маєш аккаунт? Увійти
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default BuyerSignUp;
