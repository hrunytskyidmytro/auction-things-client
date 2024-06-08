import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import TipsSection from "../components/TipsSection";
import LotsButton from "../components/LotsButton";

const BuyingTips = () => {
  const buyingTips = [
    "Ретельно досліджуйте товари перед покупкою.",
    "Звертайте увагу на покупців.",
    "Порівнюйте різні варіанти товарів.",
    "Перевіряйте товар на зображенях.",
    "Враховуйте свої особисті потреби та вимоги до товару.",
  ];

  const sellerTips = [
    "Перевіряйте репутацію продавця та його історію.",
    "Звертайте увагу на сторінку лотів покупців.",
    "Обирайте продавців з високим рівнем надійності.",
    "Перевіряйте наявність сертифікатів та ліцензій.",
    "Користуйтеся безпечними платіжними методами.",
  ];

  return (
    <Box
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        mt: 5,
      }}
    >
      <Container
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Typography variant="h3" component="h1" fontWeight={600} gutterBottom>
          Поради щодо купівлі
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <TipsSection title="Поради щодо вибору товару:" tips={buyingTips} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TipsSection
              title="Поради щодо вибору продавця:"
              tips={sellerTips}
            />
          </Grid>
        </Grid>
        <LotsButton
          text="Готові розпочати приймати участь в лотах?"
          buttonText="Перейти до лотів"
          buttonLink="/lots"
        />
      </Container>
    </Box>
  );
};

export default BuyingTips;
