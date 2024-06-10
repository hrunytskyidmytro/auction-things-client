import React from "react";
import { Box, Toolbar, Typography, Divider } from "@mui/material";
import { useAuth } from "../../../shared/hooks/useAuth";

const MainAdmin = () => {
  const { user } = useAuth();
  return (
    <Box>
      <Toolbar />
      <Typography variant="h4" textAlign={"center"} gutterBottom>
        Ласкаво просимо до Адмін-Панелі,{" "}
        {`${user?.firstName} ${user?.lastName}`}!
      </Typography>
      <Typography textAlign={"center"} paragraph>
        Це головна сторінка адміністративної панелі. Тут ви можете керувати
        замовленнями, користувачами та налаштуваннями системи.
      </Typography>
      <Divider />
      <Typography variant="h5" textAlign={"center"} gutterBottom sx={{ mt: 1 }}>
        Інструкції:
      </Typography>
      <Typography paragraph>
        1. Для перегляду списку замовлень перейдіть на вкладку "Замовлення".
      </Typography>
      <Typography paragraph>
        2. Для перегляду та редагування інформації про користувачів перейдіть на
        вкладку "Користувачі".
      </Typography>
      <Typography paragraph>
        3. Для управління лотами та аукціонами перейдіть на вкладку "Лоти".
      </Typography>
      <Typography paragraph>
        4. Для перегляду та аналізу статистики роботи системи перейдіть на
        вкладку "Статистика".
      </Typography>
      <Typography paragraph>
        Будь ласка, використовуйте бічне меню для навігації між розділами
        адміністративної панелі.
      </Typography>
      <Divider />
    </Box>
  );
};

export default MainAdmin;
