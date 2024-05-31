import React from "react";
import { Snackbar, Alert } from "@mui/material";

const MessageSnackbar = ({ open, onClose, severity, message }) => {
  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={onClose}>
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default MessageSnackbar;
