import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
  Card,
  Avatar,
} from "@mui/material";
import { useGetAllCategoriesQuery } from "../../api/categoryApi";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import MessageSnackbar from "../../shared/components/UIElements/MessageSnackbar";

const CategoriesList = () => {
  const navigate = useNavigate();
  const { data: categories, error, isLoading } = useGetAllCategoriesQuery();
  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  useEffect(() => {
    if (error) {
      setOpenErrorAlert(true);
    }
  }, [error]);

  const handleCategorySelect = (categoryId) => {
    navigate(`/categories/${categoryId}`);
  };

  if (isLoading) return <LoadingSpinner size={30} />;

  return (
    <Box
      id="categories_list"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: "white",
        bgcolor: "#204EA5",
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
        <Typography component="h3" variant="h4" sx={{ fontWeight: "bold" }}>
          Категорії
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "grey.300", textAlign: "center" }}
        >
          Ласкаво просимо до нашого розділу категорій! Тут Ви знайдете
          різноманітні товари, що відповідають Вашим потребам та бажанням.
          Обирайте з широкого асортименту продуктів, створених для забезпечення
          Вашого комфорту та задоволення. Перегляньте наші категорії, щоб знайти
          ідеальні рішення для себе!
        </Typography>
        <Box
          sx={{
            width: { sm: "100%", md: "100%" },
            textAlign: { sm: "left" },
          }}
        >
          <Grid container spacing={2.5}>
            {categories &&
              categories.map((category, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Stack
                    direction="column"
                    color="inherit"
                    component={Card}
                    spacing={1}
                    useFlexGap
                    sx={{
                      p: 3,
                      height: "100%",
                      border: "1px solid",
                      borderColor: "grey.200",
                      background: "transparent",
                      cursor: "pointer",
                      transition: "box-shadow 0.3s ease-in-out",
                      "&:hover": {
                        boxShadow: "0 4px 20px rgba(255, 255, 255, 0.5)",
                      },
                    }}
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    <div>
                      <Avatar
                        src={`http://localhost:5001/${category.image}`}
                        sx={{ width: 70, height: 70 }}
                      />
                      <Typography
                        fontWeight="medium"
                        sx={{ mt: 2 }}
                        gutterBottom
                      >
                        {category.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "grey.400" }}
                        dangerouslySetInnerHTML={{
                          __html: category.description || "",
                        }}
                      />
                    </div>
                  </Stack>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Container>
      <MessageSnackbar
        open={openErrorAlert}
        onClose={() => setOpenErrorAlert(false)}
        severity="error"
        message={
          error?.data?.message ||
          "Виникла помилка при загрузці категорій. Будь ласка, спробуйте ще раз."
        }
      />
    </Box>
  );
};

export default CategoriesList;
