import React, { useState } from "react";
import { useAddFundsMutation } from "../../api/paymentApi";
import CheckoutForm from "../components/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.REACT_APP_API_KEY_STRIPE_PUBLISHABLE
);

const AddFundsPage = () => {
  const [amount, setAmount] = useState("");
  const [addFunds, { isLoading, isSuccess, isError, error }] =
    useAddFundsMutation();

  const handlePayment = async (paymentMethodId, error) => {
    if (error) {
      console.error("Payment error:", error);
      return;
    }

    try {
      await addFunds({
        amount,
        payment_method_id: paymentMethodId,
      }).unwrap();
    } catch (err) {
      console.error("Server error:", err);
    }
  };

  return (
    <div>
      <h1>Поповнення балансу</h1>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <Elements stripe={stripePromise}>
        <CheckoutForm amount={amount} handlePayment={handlePayment} />
      </Elements>
      {isLoading && <div>Loading...</div>}
      {isSuccess && <div>Баланс поповнено успішно!</div>}
      {isError && <div>Error: {error?.data?.message}</div>}
    </div>
  );
};

export default AddFundsPage;
