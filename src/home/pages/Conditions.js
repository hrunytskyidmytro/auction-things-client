import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import InfoSection from "../components/InfoSection";

const Conditions = () => {
  const sections = [
    {
      title: "1. Правила використання платформи",
      content: [
        "За використанням платформи Ви погоджуєтесь дотримуватися правил, встановлених у наших Умовах користування. Будь ласка, ознайомтеся з цими умовами перед реєстрацією або використанням послуг.",
      ],
    },
    {
      title: "2. Відповідальність",
      content: [
        "Ми не несемо відповідальності за будь-які втрати чи шкоди, спричинені в результаті використання нашої платформи або зв'язку з нею. Користувачі повинні самостійно нести відповідальність за свої дії.",
      ],
    },
    {
      title: "3. Власність контенту",
      content: [
        "Весь контент, розміщений на платформі, захищений авторським правом. Будь-яке використання матеріалів без належного дозволу заборонено.",
      ],
    },
    {
      title: "4. Зміни умов",
      content: [
        "Ми залишаємо за собою право змінювати ці умови у будь-який час. Будь ласка, періодично перевіряйте цю сторінку для ознайомлення з оновленнями.",
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
          Умови надання послуг
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

export default Conditions;
