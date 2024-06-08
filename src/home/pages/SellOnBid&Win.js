import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import CardComponent from "../components/CardComponent";
import StepList from "../components/StepList";
import StartButton from "../components/StartButton";

const SellOnBidAndWin = () => {
  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }
  };

  const steps = [
    {
      primary: "1. Зареєструйтесь",
      secondary: "Створіть обліковий запис, щоб почати продавати на Bid&Win.",
    },
    {
      primary: "2. Додайте товари",
      secondary:
        "Заповніть інформацію про ваші товари та додайте їх до списку продажу.",
    },
    {
      primary: "3. Розмістіть лот",
      secondary: "Розмістіть лот на аукціон та стежте за його ходом.",
    },
    {
      primary: "4. Отримуйте пропозиції (ставки)",
      secondary: "Слідкуйте за пропозиціями покупців.",
    },
    {
      primary: "5. Дочекайтесь до завершення часу лоту",
      secondary: "Як тільки час лоту завершиться, лот набуває статус закритий.",
    },
    {
      primary: "6. Оплата",
      secondary:
        "Якщо поточна ціна лоту перетинає резервну ціну, то користувач, який переміг, оплачує свою покупку.",
    },
    {
      primary: "7. Баланс",
      secondary:
        "Гроші приходять на баланс і далі Ви маєте змогу їх або вивести, або також спробувати взяти участь в лоті.",
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
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Typography variant="h3" component="h1" fontWeight={600} gutterBottom>
          Продати на Bid&Win
        </Typography>
        <Typography variant="h5" component="p" align="center" gutterBottom>
          Приєднуйтесь до нашої платформи та продавайте свої товари легко та
          безпечно. Дізнайтеся про всі переваги продажу на Bid&Win.
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <CardComponent
              image="https://www.quasa.io/storage/photos/%D0%A4%D0%BE%D1%82%D0%BE%2014/%D0%B0%D1%83%2014.jpeg"
              title="Як почати продавати?"
              description="Зареєструйтесь на нашій платформі, заповніть інформацію про
                  себе та почніть додавати свої товари для продажу. Ми
                  допоможемо Вам з усіма налаштуваннями."
              buttonText="Дізнатись більше"
              handleClick={() => scrollToSection("registration")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardComponent
              image="https://fractus.com.ua/wp-content/uploads/2021/09/kompljeksnyje-prodazgy.jpg"
              title="Переваги продажу на Bid&Win"
              description="Наш сервіс пропонує низькі комісії, широку аудиторію покупців
                  та зручний інтерфейс для управління вашими продажами."
              buttonText="Чому обрати нас?"
              buttonLink="/faq"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardComponent
              image="https://solarweb.com.ua/wp-content/uploads/2022/08/uvelichenie-prodazh.png"
              title="Поради для успішного продажу"
              description="Використовуйте поради, щоб збільшити Ваші шанси на успішний
                  продаж. Додавайте якісні фотографії товару. Ретельно
                  заповнюйте опис товару. Встановлюйте конкурентоспроможні ціни."
              buttonText="Дізнатись більше"
              buttonLink="#"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardComponent
              image="https://lh3.googleusercontent.com/proxy/szNPuhNmW-Pj9ibDOuUlD9LjM5TeNrfa3apEnBWkOI6sLdex6H_2qVL_yuF3ZYJkVG3cV0ah48BT90ZGnU9Eet5psSES7DIHmv-zC-UENI0yLQ"
              title="Підтримка продавців"
              description=" Наша команда підтримки завжди готова допомогти Вам з
                  будь-якими питаннями чи проблемами. Ми забезпечимо Вас всім
                  необхідним для успішного продажу."
              buttonText="Контакти підтримки"
              buttonLink="/about-us"
            />
          </Grid>
        </Grid>
        <StepList steps={steps} />
        <StartButton />
      </Container>
    </Box>
  );
};

export default SellOnBidAndWin;
