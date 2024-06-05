import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import cardStyle from "../styles/cardElementStyles";

const WithdrawFundsForm = ({ handleWithdraw, isLoading }) => {
  const stripe = useStripe();
  const elements = useElements();

  const cardOptions = {
    style: cardStyle.style,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      handleWithdraw(null, error);
    } else {
      handleWithdraw(paymentMethod.id, null);
      cardElement.clear();
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Box component="section" sx={{ p: 2, border: "1px dashed grey" }}>
        <CardElement options={cardOptions} />
      </Box>
      <LoadingButton
        fullWidth
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        loading={isLoading}
        disabled={!stripe}
      >
        Вивести кошти
      </LoadingButton>
    </Box>
  );
};

export default WithdrawFundsForm;
