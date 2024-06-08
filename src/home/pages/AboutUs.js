import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import InfoSection from "../components/InfoSection";

const AboutUs = () => {
  const aboutMyContent = [
    "Студент із спеціалізацією в інженерії програмного забезпечення.",
    "Моя мета - створити інноваційну платформу для онлайн-аукціону, де кожен зможе знайти щось для себе.",
  ];

  const valuesContent = [
    "- Якість: прагну до найвищих стандартів у всьому, що роблю.",
    "- Інновації: постійно шукаю нові ідеї та можливості для вдосконалення.",
    "- Користувач: ставлю користувачів на перше місце, намагаючись зробити їх досвід максимально зручним та приємним.",
  ];

  const contactContent = [
    "Якщо у вас є будь-які питання або пропозиції, будь ласка, зв'яжіться зі мною за допомогою нашої електронної пошти: contact@bid&win.com",
    "Також Ви можете зв'язатися за телефоном: +380987345632",
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
          Про нас
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <InfoSection
              title="Привіт, я Дмитро Груницький!"
              content={aboutMyContent}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoSection title="Мої цінності:" content={valuesContent} />
          </Grid>
          <Grid item xs={12}>
            <InfoSection title="Зв'яжіться зі мною:" content={contactContent} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutUs;
