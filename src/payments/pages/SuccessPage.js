import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Container,
  Box,
  Grid,
  Paper,
  Stack,
  CircularProgress,
} from "@mui/material";
import MessageSnackbar from "../../shared/components/UIElements/MessageSnackbar";
import { Link as RouterLink } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useConfirmPurchaseMutation } from "../../api/paymentApi";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const lotId = searchParams.get("lotId");
  const [confirmPurchase, { isLoading, error }] = useConfirmPurchaseMutation();

  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  useEffect(() => {
    if (lotId) {
      const handleConfirmPurchase = async () => {
        try {
          await confirmPurchase(lotId).unwrap();
        } catch (error) {
          setOpenErrorAlert(true);
        }
      };

      handleConfirmPurchase();
    }
  }, [lotId, confirmPurchase]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size={50} thickness={3.6} />
      </Box>
    );
  }

  return (
    <Container component="main" maxWidth="xs" style={{ paddingTop: "50px" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4, mx: 6 }}>
        <img alt="Bid&Win" src="/logo.png" style={{ width: 300 }} />
      </Box>
      <Grid item xs={12} sm={8} md={5} component={Paper}>
        <Stack
          spacing={2}
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
          useFlexGap
        >
          <Typography variant="h1">📦</Typography>
          <Typography variant="h5">Дякуємо за покупку!</Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: "center" }}
          >
            Номер Вашого замовлення було відправлено на пошту. Збережіть його
            для подальших дій. Дякуємо, що Ви з нами!
          </Typography>
          <Button
            variant="contained"
            sx={{
              alignSelf: "center",
              width: { xs: "100%", sm: "auto" },
            }}
            component={RouterLink}
            to="/"
          >
            На головну
          </Button>
        </Stack>
      </Grid>
      <MessageSnackbar
        open={openErrorAlert}
        onClose={() => setOpenErrorAlert(false)}
        severity="error"
        message={
          error?.data?.message ||
          "Виникла помилка. Будь ласка, спробуйте ще раз."
        }
      />
    </Container>
  );
};

export default SuccessPage;
