import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Divider, Avatar } from "@mui/material";
import { useGetCategoryByIdQuery } from "../../../api/categoryApi";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import Breadcrumbs from "../../../shared/components/UIElements/Breadcrumbs";

const Categorynfo = () => {
  const { id } = useParams();
  const {
    data: category,
    error,
    isLoading,
    refetch,
  } = useGetCategoryByIdQuery(id);

  useEffect(() => {
    if (category) {
      refetch();
    }
  }, [category]);

  if (isLoading) {
    return <LoadingSpinner size={50} />;
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" sx={{ textAlign: "center" }}>
        Помилка завантаження інформації про категорію.
      </Typography>
    );
  }

  return (
    <>
      <Box sx={{ mt: 5 }}>
        <Breadcrumbs
          links={[
            { label: "Категорії", url: "/admin/categories" },
            { label: category.name, url: `/admin/categories/${category.name}` },
          ]}
        />
      </Box>
      <Box sx={{ p: 3 }}>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", mb: 5 }}
          gutterBottom
        >
          {category.name}
        </Typography>
        <div
          dangerouslySetInnerHTML={{
            __html: category?.description || "",
          }}
        />
        <Divider sx={{ m: 2 }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
          }}
        >
          {category.image && (
            <Avatar
              alt={category.image}
              src={`http://localhost:5001/${category.image}`}
              variant="square"
              sx={{
                m: 1,
                width: {
                  xs: "200px",
                  sm: "150px",
                  md: "500px",
                },
                height: {
                  xs: "200px",
                  sm: "150px",
                  md: "500px",
                },
              }}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default Categorynfo;
