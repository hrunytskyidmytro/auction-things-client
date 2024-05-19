import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../api/passwordResetApi";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Snackbar,
  Avatar,
  Grid,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

const ResetPassword = () => {
  const { token } = useParams();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [openErrorAlert, setOpenErrorAlert] = useState("");
  const [openSuccessAlert, setOpenSuccessAlert] = useState("");

  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (newPassword !== confirmPassword) {
      setOpenErrorAlert(true);
      return;
    }

    try {
      //   await resetPassword({
      //     resetPasswordToken: token,
      //     newPassword,
      //     confirmPassword,
      //   }).unwrap();
      await resetPassword({
        resetPasswordToken: token,
        newPassword: data.get("newPassword"),
        confirmPassword: data.get("confirmPassword"),
      }).unwrap();
      navigate("/login");
      setOpenSuccessAlert("Пароль успішно встановлено!");
    } catch (error) {
      setOpenErrorAlert(error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid item xs={12} sm={8} md={5}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            my: 8,
            mx: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Встановлення нового паролю
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="Новий пароль"
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Підтвердіть новий пароль"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            Встановити
          </Button>
          <Snackbar
            open={Boolean(openErrorAlert)}
            autoHideDuration={6000}
            onClose={() => setOpenErrorAlert("")}
          >
            <Alert
              onClose={() => setOpenErrorAlert("")}
              severity="error"
              variant="filled"
              sx={{ width: "100%" }}
            >
              {error?.data?.message}
            </Alert>
          </Snackbar>
          <Snackbar
            open={openSuccessAlert}
            autoHideDuration={6000}
            onClose={() => setOpenSuccessAlert("")}
          >
            <Alert
              onClose={() => setOpenSuccessAlert("")}
              severity="success"
              variant="filled"
              sx={{ width: "100%" }}
            >
              Пароль успішно встановлено!
              {/* {openSuccessAlert} */}
            </Alert>
          </Snackbar>
        </Box>
      </Grid>
    </ThemeProvider>
  );
};

export default ResetPassword;
