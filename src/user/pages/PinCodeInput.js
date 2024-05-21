import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Container,
  Box,
  Typography,
  Link,
  Snackbar,
  Alert,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import {
  Link as RouterLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  useCheckPinCodeMutation,
  useResendPinCodeMutation,
} from "../../api/userApi";
import { useAuth } from "../../shared/hooks/useAuth";

import { setUser } from "../../store/authSlice";

const defaultTheme = createTheme();

const PinCodeInput = () => {
  const [checkPinCode, { isLoading, error }] = useCheckPinCodeMutation();
  const [resendPinCode] = useResendPinCodeMutation();

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

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
    } catch (err) {
      setOpenErrorAlert(true);
    }
  };

  const handleResendPinCode = async () => {
    try {
      const response = await resendPinCode({
        email: searchParams.get("email"),
        userId: searchParams.get("userId"),
      }).unwrap();
      setOpenSuccessAlert(true);
      setSuccessMessage(response.message);
    } catch (err) {
      setOpenErrorAlert(true);
    }
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
            <Typography variant="overline" component="div" sx={{ mb: 2 }}>
              Вам було надіслано пін-код на електронну адресу.
            </Typography>
            <Typography variant="h6" component="div" sx={{ mb: 2 }}>
              Введіть пін-код для пошти:
            </Typography>
            <Typography
              variant="body1"
              component="div"
              sx={{
                mb: 4,
                padding: 2,
                border: "1px solid #ccc",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
              }}
            >
              {searchParams.get("email")}
            </Typography>
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
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
              Не отримали пін-код{" "}
              <Link component={RouterLink} onClick={handleResendPinCode}>
                Повторна відправка
              </Link>
            </Typography>
          </Box>
        </Container>
        <Snackbar
          open={openSuccessAlert}
          autoHideDuration={5000}
          onClose={() => setOpenSuccessAlert(false)}
        >
          <Alert
            onClose={() => setOpenSuccessAlert(false)}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {successMessage}
          </Alert>
        </Snackbar>
        <Snackbar
          open={openErrorAlert}
          autoHideDuration={5000}
          onClose={() => setOpenErrorAlert(false)}
        >
          <Alert
            onClose={() => setOpenErrorAlert(false)}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {error?.data?.message}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </>
  );
};

export default PinCodeInput;
