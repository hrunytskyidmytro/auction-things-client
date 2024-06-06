import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllCategoriesQuery } from "../../api/categoryApi";
import { CircularProgress, List, ListItem, Button } from "@mui/material";

const CategoriesList = () => {
  const navigate = useNavigate();
  const { data: categories, error, isLoading } = useGetAllCategoriesQuery();

  const handleCategorySelect = (categoryId) => {
    navigate(`/categories/${categoryId}`);
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Error: {error?.data?.message}</div>;

  return (
    <div>
      <h2>Категорії</h2>
      <List>
        {categories.map((category) => (
          <ListItem key={category.id} disablePadding>
            <Button 
              variant="outlined"
              onClick={() => handleCategorySelect(category.id)}
              sx={{ m: 1 }}
            >
              {category.name}
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default CategoriesList;
