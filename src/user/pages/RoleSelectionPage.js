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
  Snackbar,
  Alert,
  Grid,
  Paper,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

const RoleSelectionPage = () => {
  const [role, setRole] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!role) {
      setError(true);
      return;
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
        <Grid item xs={12} sm={8} md={5} component={Paper}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              px: 4,
              py: 4,
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
              Виберіть, ким ви хочете бути на нашому аукціоні речей: покупцем
              або продавцем.
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
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              style={{ marginTop: "20px" }}
            >
              Продовжити
            </Button>
          </Box>
        </Grid>
      </Container>
      {error && (
        <Snackbar
          open={error}
          autoHideDuration={5000}
          onClose={() => setError(false)}
        >
          <Alert
            onClose={() => setError(false)}
            severity="error"
            variant="filled"
            style={{ width: "100%", marginBottom: "10px" }}
          >
            Роль не було вибрано! Будь ласка, виберіть роль.
          </Alert>
        </Snackbar>
      )}
    </ThemeProvider>
  );
};

export default RoleSelectionPage;
