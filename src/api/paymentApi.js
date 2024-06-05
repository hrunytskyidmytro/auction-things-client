import { api } from "./api";

export const paymentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (paymentData) => ({
        url: "/payments/create-checkout-session",
        method: "POST",
        body: paymentData,
      }),
    }),
    confirmPurchase: builder.mutation({
      query: (lotId) => ({
        url: "/payments/confirm-purchase",
        method: "POST",
        body: { lotId },
      }),
    }),
    addFunds: builder.mutation({
      query: ({ amount, payment_method_id }) => ({
        url: `/payments/add-funds`,
        method: "POST",
        body: { amount, payment_method_id },
      }),
    }),
    withdrawFunds: builder.mutation({
      query: ({ amount, payment_method_id }) => ({
        url: `/payments/withdraw-funds`,
        method: "POST",
        body: { amount, payment_method_id },
      }),
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useAddFundsMutation,
  useWithdrawFundsMutation,
  useConfirmPurchaseMutation,
} = paymentApi;
