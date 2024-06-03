import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const WithdrawFundsForm = ({ amount, handleWithdraw }) => {
  const stripe = useStripe();
  const elements = useElements();

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
      console.error(error);
      handleWithdraw(null, error);
    } else {
      handleWithdraw(paymentMethod.id, null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={amount} disabled />
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Вивести кошти
      </button>
    </form>
  );
};

export default WithdrawFundsForm;
