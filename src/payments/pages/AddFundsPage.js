import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { useAddFundsMutation } from "../../api/paymentApi";

import { useNavigate } from "react-router-dom";

import CheckoutForm from "../components/CheckoutForm";
import MessageSnackbar from "../../shared/components/UIElements/MessageSnackbar";

import {
  TextField,
  Typography,
  Box,
  CssBaseline,
  Grid,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
} from "@mui/material";

import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";

const stripePromise = loadStripe(
  process.env.REACT_APP_API_KEY_STRIPE_PUBLISHABLE
);

const AddFundsPage = () => {
  const [amount, setAmount] = useState("");
  const [addFunds, { isLoading, isSuccess, isError, error }] =
    useAddFundsMutation();

  const navigate = useNavigate();

  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlePayment = async (paymentMethodId, error) => {
    if (error) {
      setOpenErrorAlert(true);
      return;
    }

    try {
      await addFunds({
        amount,
        payment_method_id: paymentMethodId,
      }).unwrap();
      setOpenSuccessAlert(true);
      setAmount("");
      setTimeout(() => navigate("/"), 5000);
    } catch (err) {
      setOpenErrorAlert(true);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://info.exmo.com/wp-content/uploads/2023/03/1000h503_uah.png)",
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
          }}
        >
          <Typography variant="h4" component="h1" sx={{ mb: 4 }} gutterBottom>
            Поповнення балансу
          </Typography>
          <Stepper activeStep={activeStep} orientation="vertical">
            <Step>
              <StepLabel>Введення суми для поповнення балансу</StepLabel>
              <StepContent>
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  label="Введіть суму"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  inputProps={{
                    min: 100,
                    max: 5000,
                  }}
                  error={amount < 100 || amount > 5000}
                  helperText={
                    amount < 100 || amount > 5000
                      ? "Сума повинна бути від 100 до 5000"
                      : ""
                  }
                />
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 1 }}
                  onClick={handleNext}
                >
                  Продовжити
                </Button>
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Дані про картку</StepLabel>
              <StepContent>
                <Button
                  variant="outlined"
                  startIcon={<KeyboardArrowLeftRoundedIcon />}
                  onClick={handleBack}
                  sx={{ mb: 1 }}
                >
                  Повернутися назад
                </Button>
                <Elements stripe={stripePromise}>
                  <CheckoutForm
                    handlePayment={handlePayment}
                    isLoading={isLoading}
                  />
                </Elements>
              </StepContent>
            </Step>
          </Stepper>
        </Box>
        <Grid container sx={{ mt: 4 }}>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "center", mt: "auto" }}
          >
            <img alt="Bid&Win" src="/logo.png" style={{ width: 200 }} />
          </Grid>
        </Grid>
      </Grid>
      {isSuccess && (
        <MessageSnackbar
          open={openSuccessAlert}
          onClose={() => setOpenSuccessAlert(false)}
          severity="success"
          message={
            "Баланс успішно поповнено! Через 5 секунд Вас поверне на головну сторінку."
          }
        />
      )}
      {isError && (
        <MessageSnackbar
          open={openErrorAlert}
          onClose={() => setOpenErrorAlert(false)}
          severity="error"
          message={
            error?.data?.message ||
            "Виникла помилка. Будь ласка, спробуйте ще раз."
          }
        />
      )}
    </Grid>
  );
};

export default AddFundsPage;
