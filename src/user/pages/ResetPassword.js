import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../api/passwordResetApi";
import {
  Box,
  TextField,
  Typography,
  Alert,
  Snackbar,
  Avatar,
  Grid,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import { Formik, Form, Field } from "formik";

import { validationSchemaResetPassword } from "../../shared/utils/validatorsSchemes";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

const ResetPassword = () => {
  const { token } = useParams();

  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Встановлення нового паролю
            </Typography>
            <Formik
              initialValues={{
                newPassword: "",
                confirmPassword: "",
              }}
              validationSchema={validationSchemaResetPassword}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  await resetPassword({
                    resetPasswordToken: token,
                    newPassword: values.newPassword,
                    confirmPassword: values.confirmPassword,
                  }).unwrap();
                  setOpenSuccessAlert(true);
                  setTimeout(() => navigate("/login"), 10000);
                } catch (err) {
                  setOpenErrorAlert(true);
                }
                setSubmitting(false);
              }}
            >
              {({ errors, touched }) => (
                <Form noValidate sx={{ mt: 3, width: "100%" }}>
                  <Field
                    as={TextField}
                    margin="normal"
                    required
                    fullWidth
                    name="newPassword"
                    label="Новий пароль"
                    type={showPassword ? "text" : "password"}
                    id="newPassword"
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
                    error={errors.newPassword && touched.newPassword}
                    helperText={
                      errors.newPassword &&
                      touched.newPassword &&
                      errors.newPassword
                    }
                  />
                  <Field
                    as={TextField}
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Підтвердіть новий пароль"
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
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
                    error={errors.confirmPassword && touched.confirmPassword}
                    helperText={
                      errors.confirmPassword &&
                      touched.confirmPassword &&
                      errors.confirmPassword
                    }
                  />
                  <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={isLoading}
                  >
                    Встановити
                  </LoadingButton>
                </Form>
              )}
            </Formik>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={openSuccessAlert}
        autoHideDuration={6000}
        onClose={() => setOpenSuccessAlert(false)}
      >
        <Alert
          onClose={() => setOpenSuccessAlert(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Пароль успішно встановлено! Через 5 секунд Вас перекине на сторінку
          авторизації.
        </Alert>
      </Snackbar>
      <Snackbar
        open={openErrorAlert}
        autoHideDuration={6000}
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
  );
};

export default ResetPassword;