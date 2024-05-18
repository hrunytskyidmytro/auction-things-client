import React, { useState } from "react";
import {
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

const RoleSelectionPage = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!role) {
      return <Alert severity="error">Роль не було вибрано!</Alert>;
    }
    navigate(`/signup/${role.toLowerCase()}`);
  };

  return (
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
          <Typography variant="h5" gutterBottom>
            Виберіть роль
          </Typography>
          <Typography variant="body1" gutterBottom>
            Виберіть, ким ви хочете бути на нашому аукціоні речей: покупцем або
            продавцем.
          </Typography>
          <RadioGroup
            value={role}
            onChange={handleRoleChange}
            aria-label="role"
            name="role"
          >
            <FormControlLabel
              value="BUYER"
              control={<Radio />}
              label="Покупець"
            />
            <Divider />
            <FormControlLabel
              value="SELLER"
              control={<Radio />}
              label="Продавець"
            />
          </RadioGroup>
          <Divider />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Продовжити
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default RoleSelectionPage;
