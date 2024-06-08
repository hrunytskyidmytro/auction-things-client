import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import InfoSection from "../components/InfoSection";

const Privacy = () => {
  const sections = [
    {
      title: "Наш підхід до конфіденційності",
      content: [
        "Я зобов'язаний забезпечити конфіденційність і безпеку всіх користувачів платформи. Використовую різноманітні технічні та організаційні заходи для захисту вашої особистої інформації та даних про транзакції.",
      ],
    },
    {
      title: "Збір та використання інформації",
      content: [
        "Збираю різноманітні дані від користувачів платформи, включаючи особисту інформацію, таку як ім'я, адреса електронної пошти та інша контактна інформація. Ці дані використовуються виключно для забезпечення послуг та покращення досвіду користувачів.",
      ],
    },
    {
      title: "Зберігання даних",
      content: [
        "Ваша особиста інформація зберігається на захищених серверах і не буде передана третім особам без вашої згоди. Я вживаю всі необхідні заходи для захисту даних від несанкціонованого доступу.",
      ],
    },
    {
      title: "Права користувачів",
      content: [
        "Ви маєте право на доступ, виправлення та видалення своєї особистої інформації. Якщо у Вас є будь-які питання або зауваження щодо обробки ваших даних, будь ласка, зв'яжіться зі мною.",
      ],
    },
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
          gap: { xs: 3, sm: 3 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link to="/">
            <img alt="Bid&Win" src="/logo.png" style={{ width: 300 }} />
          </Link>
        </Box>
        <Typography
          variant="h3"
          component="h1"
          fontWeight={600}
          mt={1}
          gutterBottom
        >
          Конфіденційність
        </Typography>
        <Grid container spacing={4}>
          {sections.map((section, index) => (
            <Grid item xs={12} md={6} key={index}>
              <InfoSection title={section.title} content={section.content} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Privacy;
