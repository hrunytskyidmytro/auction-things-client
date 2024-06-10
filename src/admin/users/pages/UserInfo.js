import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Divider } from "@mui/material";
import { useGetUserByIdQuery } from "../../../api/userApi";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import Breadcrumbs from "../../../shared/components/UIElements/Breadcrumbs";

const UserInfo = () => {
  const { id } = useParams();
  const { data: user, error, isLoading, refetch } = useGetUserByIdQuery(id);

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user, refetch]);

  if (isLoading) {
    return <LoadingSpinner size={50} />;
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" sx={{ textAlign: "center" }}>
        Помилка завантаження інформації про користувача.
      </Typography>
    );
  }

  return (
    <>
      <Box sx={{ mt: 5 }}>
        <Breadcrumbs
          links={[
            { label: "Користувачі", url: "/admin/users" },
            {
              label: `${user.firstName} ${user.lastName}`,
              url: `/admin/users/${user.firstName} ${user.lastName}`,
            },
          ]}
        />
      </Box>
      <Box sx={{ p: 3 }}>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", mb: 5 }}
          gutterBottom
        >
          {` ${user.lastName} ${user.firstName} ${user.patronymic}`}
        </Typography>
        <Divider sx={{ m: 2 }} />
        <Typography variant="body1" gutterBottom>
          Електронна адреса: {user.email}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Номер телефону: {user.phoneNumber}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Назва компанії: {user.companyName || "Інформація відсутня"}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Сайт компанії: {user.companySite || "Інформація відсутня"}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Позиція в компанії: {user.position || "Інформація відсутня"}
        </Typography>
        <Divider sx={{ m: 2 }} />
      </Box>
    </>
  );
};

export default UserInfo;
