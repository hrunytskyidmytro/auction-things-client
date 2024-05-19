import React, { useState } from "react";
import {
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Container,
  Box,
  Divider,
  Alert,
} from "@mui/material";

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
      <Container
        component="main"
        maxWidth="xs"
        style={{ textAlign: "center", paddingTop: "50px" }}
      >
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
            style={{ marginTop: "10px" }}
          >
            <FormControlLabel
              value="BUYER"
              control={<Radio style={{ fontSize: "24px" }} />}
              label="Покупець"
            />
            <Divider style={{ margin: "10px 0", width: "100%" }} />
            <FormControlLabel
              value="SELLER"
              control={<Radio style={{ fontSize: "24px" }} />}
              label="Продавець"
            />
          </RadioGroup>
          <Divider style={{ margin: "10px 0", width: "100%" }} />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ marginTop: "20px" }}
          >
            Продовжити
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default RoleSelectionPage;
