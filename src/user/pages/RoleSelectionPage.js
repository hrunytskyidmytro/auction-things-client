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
  Grid,
  Paper,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import MessageSnackbar from "../../shared/components/UIElements/MessageSnackbar";

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
    <Container component="main" maxWidth="xs" style={{ paddingTop: "50px" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4, mx: 6 }}>
        <img alt="Bid&Win" src="/logo.png" style={{ width: 300 }} />
      </Box>
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
          <Typography
            variant="body1"
            sx={{ mb: 2, textAlign: "center" }}
            gutterBottom
          >
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
      {error && (
        <MessageSnackbar
          open={error}
          onClose={() => setError(false)}
          severity="error"
          message={" Роль не було вибрано! Будь ласка, виберіть роль."}
        />
      )}
    </Container>
  );
};

export default RoleSelectionPage;
