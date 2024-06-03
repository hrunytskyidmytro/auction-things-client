import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useCreateCheckoutSessionMutation } from "../../api/paymentApi";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.REACT_APP_API_KEY_STRIPE_PUBLISHABLE
);

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const lotId = searchParams.get("lotId");

  const [createCheckoutSession, { isLoading, error }] =
    useCreateCheckoutSessionMutation();

  useEffect(() => {
    if (lotId) {
      const handleCheckout = async () => {
        try {
          const result = await createCheckoutSession({ lotId }).unwrap();
          const stripe = await stripePromise;
          await stripe.redirectToCheckout({ sessionId: result.id });
        } catch (error) {
          console.error("Error:", error);
        }
      };

      handleCheckout();
    }
  }, [createCheckoutSession, lotId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Перенаправлення на оплату...</h1>
    </div>
  );
};

export default PaymentPage;
