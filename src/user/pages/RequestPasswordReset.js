import React, { useState } from "react";
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
  createTheme,
  ThemeProvider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { Formik, Field, Form } from "formik";
import { validationSchemaRequestPasswordReset } from "../../shared/utils/validatorsSchemes";
import { useRequestPasswordResetMutation } from "../../api/passwordResetApi";

const defaultTheme = createTheme();

const RequestPasswordReset = () => {
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [showCloseMessage, setShowCloseMessage] = useState(false);

  const [requestPasswordReset, { isLoading, error }] =
    useRequestPasswordResetMutation();

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
            <Formik
              initialValues={{
                email: "",
              }}
              validationSchema={validationSchemaRequestPasswordReset}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const response = await requestPasswordReset({
                    email: values.email,
                  }).unwrap();
                  values.email = "";
                  setOpenSuccessAlert(true);
                  setSuccessMessage(response.message);
                  setTimeout(() => setShowCloseMessage(true), 10000);
                } catch (err) {
                  setOpenErrorAlert(true);
                }
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form noValidate sx={{ mt: 1 }}>
                  <Field
                    as={TextField}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <LoadingButton
                    loading={isSubmitting || isLoading}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Надіслати запит
                  </LoadingButton>
                </Form>
              )}
            </Formik>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={openSuccessAlert}
        autoHideDuration={5000}
        onClose={() => setOpenSuccessAlert(false)}
      >
        <Alert
          onClose={() => setOpenSuccessAlert(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {successMessage}
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
