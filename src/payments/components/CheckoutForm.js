import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = ({ amount, handlePayment }) => {
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
      handlePayment(null, error);
    } else {
      handlePayment(paymentMethod.id, null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={amount} disabled />
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Поповнити баланс
      </button>
    </form>
  );
};

export default CheckoutForm;
