import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Container,
  Box,
  Typography,
  Link,
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
import MessageSnackbar from "../../shared/components/UIElements/MessageSnackbar";

const PinCodeInput = () => {
  const [checkPinCode, { isLoading, error }] = useCheckPinCodeMutation();
  const [resendPinCode] = useResendPinCodeMutation();

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const { saveToken: setToken } = useAuth();

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
      <MessageSnackbar
        open={openSuccessAlert}
        onClose={() => setOpenSuccessAlert(false)}
        severity="success"
        message={successMessage}
      />
      <MessageSnackbar
        open={openErrorAlert}
        onClose={() => setOpenErrorAlert(false)}
        severity="error"
        message={error?.data?.message}
      />
    </>
  );
};

export default PinCodeInput;
