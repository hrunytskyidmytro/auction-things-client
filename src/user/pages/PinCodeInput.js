import React, { useState } from "react";
import Box from "@mui/material/Box";
import { LoadingButton } from "@mui/lab";
import Container from "@mui/material/Container";
import { MuiOtpInput } from "mui-one-time-password-input";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useCheckPinCodeMutation } from "../../api/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";

import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../shared/hooks/useAuth";

const defaultTheme = createTheme();

const PinCodeInput = () => {
  const [checkPinCode, { data, isLoading, isError, error }] =
    useCheckPinCodeMutation();

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const { saveToken: setToken } = useAuth();

  const [otp, setOtp] = useState("");

  const handleSubmit = async () => {
    try {
      const { token, ...response } = await checkPinCode({
        email: searchParams.get("email"),
        pinCode: otp,
      }).unwrap();
      setToken(token);
      dispatch(setUser(response));
      navigate("/");
    } catch (err) {}
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 15,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <MuiOtpInput value={otp} onChange={setOtp} length={6} autoFocus />
            <LoadingButton
              onClick={handleSubmit}
              loading={isLoading}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Продовжити
            </LoadingButton>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default PinCodeInput;
