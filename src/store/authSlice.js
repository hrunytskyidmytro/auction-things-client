import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: null, token: null };

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logOut(state) {
      state.user = null;
      state.token = null;
    },
    setUser(state, { payload }) {
      state.user = payload;
    },
    setToken(state, { payload }) {
      state.token = payload;
    },
  },
});

export const { logOut, setUser, setToken } = authSlice.actions;

export const selectToken = (state) => state.authSlice.token;
export const selectUser = (state) => state.authSlice.user;
