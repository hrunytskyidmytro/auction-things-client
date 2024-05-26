import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export function baseQueryWithJwt(url = "/") {
  return fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + url,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authSlice.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  });
}
