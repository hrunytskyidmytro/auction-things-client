import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const lotApi = createApi({
  reducerPath: "lotApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + "/lots",
  }),
  endpoints: (builder) => ({
    createLot: builder.mutation({
      query: ({data, token}) => ({
        url: "/",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useCreateLotMutation } = lotApi;
