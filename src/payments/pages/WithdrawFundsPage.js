import React, { useState } from "react";
import { useWithdrawFundsMutation } from "../../api/paymentApi";
import WithdrawForm from "../components/WithdrawFundsForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.REACT_APP_API_KEY_STRIPE_PUBLISHABLE
);

const WithdrawFundsPage = () => {
  const [amount, setAmount] = useState("");
  const [withdraw, { isLoading, isSuccess, isError, error }] =
    useWithdrawFundsMutation();

  const handleWithdraw = async (paymentMethodId, error) => {
    if (error) {
      console.error("Payment error:", error);
      return;
    }

    try {
      await withdraw({
        amount,
        payment_method_id: paymentMethodId,
      }).unwrap();
    } catch (err) {
      console.error("Server error:", err);
    }
  };

  return (
    <div>
      <h1>Виведення коштів</h1>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <Elements stripe={stripePromise}>
        <WithdrawForm amount={amount} handleWithdraw={handleWithdraw} />
      </Elements>
      {isLoading && <div>Loading...</div>}
      {isSuccess && <div>Кошти успішно виведені!</div>}
      {isError && <div>Error: {error?.data?.message}</div>}
    </div>
  );
};

export default WithdrawFundsPage;
