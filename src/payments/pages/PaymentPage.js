import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useCreateCheckoutSessionMutation } from "../../api/paymentApi";
import { loadStripe } from "@stripe/stripe-js";

import { useNavigate } from "react-router-dom";

import { CircularProgress, Box, Typography } from "@mui/material";

import MessageSnackbar from "../../shared/components/UIElements/MessageSnackbar";

const stripePromise = loadStripe(
  process.env.REACT_APP_API_KEY_STRIPE_PUBLISHABLE
);

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const lotId = searchParams.get("lotId");
  const navigate = useNavigate();

  const [createCheckoutSession, { isLoading, error }] =
    useCreateCheckoutSessionMutation();

  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  useEffect(() => {
    if (lotId) {
      const handleCheckout = async () => {
        try {
          const result = await createCheckoutSession({ lotId }).unwrap();
          const stripe = await stripePromise;
          await stripe.redirectToCheckout({ sessionId: result.id });
        } catch (error) {
          setOpenErrorAlert(true);
          setTimeout(() => navigate("/"), 2000);
        }
      };

      handleCheckout();
    }
  }, [createCheckoutSession, lotId, navigate]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size={50} thickness={3.6} />
      </Box>
    );
  }

  if (error) {
    return (
      <>
        <MessageSnackbar
          open={openErrorAlert}
          onClose={() => setOpenErrorAlert(false)}
          severity="error"
          message={
            error?.data?.message ||
            "Виникла помилка. Будь ласка, спробуйте ще раз."
          }
        />
      </>
    );
  }

  return (
    <Box>
      <Typography variant="h4">Перенаправлення на оплату...</Typography>
    </Box>
  );
};

export default PaymentPage;
