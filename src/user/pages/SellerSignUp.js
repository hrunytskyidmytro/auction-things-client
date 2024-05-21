import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Avatar,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Alert,
  Snackbar,
  createTheme,
  ThemeProvider,
  Paper,
  CssBaseline,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { Formik, Field, Form } from "formik";
import { validationSchemaForSeller } from "../../shared/utils/validatorsSchemes";

import { useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../../api/userApi";

const defaultTheme = createTheme();

const SellerSignUp = () => {
  const [createUser, { isLoading, error }] = useCreateUserMutation();
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const path = window.location.pathname.split("/");
    const roleFromPath = path[path.length - 1].toUpperCase();
    setRole(roleFromPath);
  }, []);

  const handleChange = (value) => {
    setPhoneNumber(value);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
              height: "80vh",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
              Реєстрація продавця
            </Typography>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                patronymic: "",
                email: "",
                password: "",
                confirmPassword: "",
                companyName: "",
                companySite: "",
                position: "",
              }}
              validationSchema={validationSchemaForSeller}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const response = await createUser({
                    firstName: values.firstName,
                    lastName: values.lastName,
                    patronymic: values.patronymic,
                    email: values.email,
                    password: values.password,
                    confirmPassword: values.confirmPassword,
                    role,
                    phoneNumber,
                    companyName: values.companyName,
                    companySite: values.companySite,
                    position: values.position,
                  }).unwrap();
                  navigate(
                    `/check-pin-code?email=${values.email}&userId=${response.userId}`
                  );
                } catch (err) {
                  setOpenErrorAlert(true);
                }
                setSubmitting(false);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <Stepper activeStep={activeStep} orientation="vertical">
                    <Step>
                      <StepLabel>Контактні дані</StepLabel>
                      <StepContent>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Field
                              as={TextField}
                              autoComplete="given-name"
                              name="firstName"
                              required
                              fullWidth
                              id="firstName"
                              label="Ім'я"
                              error={Boolean(
                                touched.firstName && errors.firstName
                              )}
                              helperText={touched.firstName && errors.firstName}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Field
                              as={TextField}
                              required
                              fullWidth
                              id="lastName"
                              label="Прізвище"
                              name="lastName"
                              autoComplete="family-name"
                              error={Boolean(
                                touched.lastName && errors.lastName
                              )}
                              helperText={touched.lastName && errors.lastName}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Field
                              as={TextField}
                              fullWidth
                              required
                              id="patronymic"
                              label="По-батькові"
                              name="patronymic"
                              autoComplete="surname"
                              error={Boolean(
                                touched.patronymic && errors.patronymic
                              )}
                              helperText={
                                touched.patronymic && errors.patronymic
                              }
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Field
                              as={TextField}
                              required
                              fullWidth
                              id="email"
                              label="Email"
                              name="email"
                              autoComplete="email"
                              error={Boolean(touched.email && errors.email)}
                              helperText={touched.email && errors.email}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Field
                              as={TextField}
                              required
                              fullWidth
                              name="password"
                              label="Пароль"
                              type={showPassword ? "text" : "password"}
                              id="password"
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                      edge="end"
                                    >
                                      {showPassword ? (
                                        <VisibilityOff />
                                      ) : (
                                        <Visibility />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                              error={Boolean(
                                touched.password && errors.password
                              )}
                              helperText={touched.password && errors.password}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Field
                              as={TextField}
                              required
                              fullWidth
                              name="confirmPassword"
                              label="Пароль ще раз"
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
                                      {showPassword ? (
                                        <VisibilityOff />
                                      ) : (
                                        <Visibility />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                              error={Boolean(
                                touched.confirmPassword &&
                                  errors.confirmPassword
                              )}
                              helperText={
                                touched.confirmPassword &&
                                errors.confirmPassword
                              }
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <PhoneInput
                              country={"ua"}
                              value={phoneNumber}
                              onChange={handleChange}
                              placeholder="Введіть номер телефону*"
                              inputProps={{ required: true }}
                              inputStyle={{ width: "100%" }}
                              enableSearch={true}
                              defaultErrorMessage="Будь ласка, введіть коректний номер телефону"
                              isValid={(value) => {
                                if (value === "") {
                                  return false;
                                }
                                return true;
                              }}
                            />
                          </Grid>
                        </Grid>
                        <Button
                          type="button"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                          onClick={handleNext}
                        >
                          Продовжити
                        </Button>
                      </StepContent>
                    </Step>
                    <Step>
                      <StepLabel>Дані про компанію</StepLabel>
                      <StepContent>
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                          <Grid item xs={12}>
                            <Field
                              as={TextField}
                              required
                              fullWidth
                              id="companyName"
                              label="Назва компанії"
                              name="companyName"
                              error={Boolean(
                                touched.companyName && errors.companyName
                              )}
                              helperText={
                                touched.companyName && errors.companyName
                              }
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Field
                              as={TextField}
                              fullWidth
                              id="companySite"
                              label="Сайт компанії"
                              name="companySite"
                              error={Boolean(
                                touched.companySite && errors.companySite
                              )}
                              helperText={
                                touched.companySite && errors.companySite
                              }
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Field
                              as={TextField}
                              required
                              fullWidth
                              id="position"
                              label="Посада"
                              name="position"
                              error={Boolean(
                                touched.position && errors.position
                              )}
                              helperText={touched.position && errors.position}
                            />
                          </Grid>
                        </Grid>
                        <Box sx={{ my: 2 }}>
                          <Button
                            variant="outlined"
                            startIcon={<KeyboardArrowLeftRoundedIcon />}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                          >
                            Повернутися назад
                          </Button>
                        </Box>
                        <LoadingButton
                          loading={isLoading}
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mb: 2 }}
                        >
                          Зареєструватися
                        </LoadingButton>
                      </StepContent>
                    </Step>
                  </Stepper>
                </Form>
              )}
            </Formik>
          </Box>
        </Grid>
      </Grid>
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
  );
};

export default SellerSignUp;
