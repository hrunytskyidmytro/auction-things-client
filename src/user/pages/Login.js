import React, { useState, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Grid,
  Link,
  Avatar,
  Typography,
  TextField,
  Alert,
  Snackbar,
  Divider,
  Chip,
  IconButton,
  InputAdornment,
  Button,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useNavigate, useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";

import { useLoginUserMutation } from "../../api/userApi";

const defaultTheme = createTheme();

const Login = () => {
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const [googleAuthError, setGoogleAuthError] = useState(null);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("error")) {
      setGoogleAuthError(params.get("error"));
      params.delete("error");
      window.history.replaceState({}, document.title, location.pathname);
    }
  }, [location]);

  useEffect(() => {
    if (error) {
      setOpenErrorAlert(true);
    }
  }, [error]);

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const response = await loginUser({
        email: data.get("email"),
        password: data.get("password"),
      }).unwrap();
      navigate(
        `/check-pin-code?email=${data.get("email")}&userId=${response.userId}`
      );
    } catch (err) {}
  };

  return (
    <>
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
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
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
                Авторизація
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
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Пароль"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <LoadingButton
                  loading={isLoading}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Увійти
                </LoadingButton>
                <Grid container>
                  <Grid item xs>
                    <Link
                      to="/request-password-reset"
                      component={RouterLink}
                      variant="body2"
                    >
                      Забули пароль?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      to="/select-role"
                      component={RouterLink}
                      variant="body2"
                    >
                      Не маєш аккаунту? Зареєструватися
                    </Link>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 2, width: "100%" }}>
                  <Chip label="Або" size="small" />
                </Divider>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleGoogleLogin}
                  sx={{ mt: 1, mb: 2 }}
                  startIcon={
                    <img
                      src="https://img.icons8.com/color/16/000000/google-logo.png"
                      alt="google icon"
                    />
                  }
                >
                  Увійти через Google
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Snackbar
          open={Boolean(googleAuthError)}
          autoHideDuration={5000}
          onClose={() => setGoogleAuthError(null)}
        >
          <Alert
            onClose={() => setGoogleAuthError(null)}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {googleAuthError}
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
      </ThemeProvider>
    </>
  );
};

export default Login;
