import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Divider, Avatar } from "@mui/material";
import { format } from "date-fns";
import { useGetLotByIdQuery } from "../../../api/lotApi";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import Breadcrumbs from "../../../shared/components/UIElements/Breadcrumbs";

const LotInfo = () => {
  const { id } = useParams();
  const { data: lot, error, isLoading, refetch } = useGetLotByIdQuery(id);

  useEffect(() => {
    if (lot) {
      refetch();
    }
  }, [lot]);

  if (isLoading) {
    return <LoadingSpinner size={50} />;
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" sx={{ textAlign: "center" }}>
        Помилка завантаження інформації про лот.
      </Typography>
    );
  }

  return (
    <>
      <Box sx={{ mt: 5 }}>
        <Breadcrumbs
          links={[
            { label: "Лоти", url: "/admin/lots" },
            { label: lot.title, url: `/admin/lots/${lot.id}` },
          ]}
        />
      </Box>
      <Box sx={{ p: 3 }}>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", mb: 5 }}
          gutterBottom
        >
          {lot.title}
        </Typography>
        <div
          dangerouslySetInnerHTML={{
            __html: lot?.description || "",
          }}
        />
        <Divider sx={{ m: 2 }} />
        <Typography variant="body1" gutterBottom>
          Початкова ціна: {lot.startingPrice} грн.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Ціна купівлі зараз: {lot.buyNowPrice || "Немає"} грн.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Підвищення ставки: {lot.bidIncrement || "Немає"} грн.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Резервна ціна: {lot.reservePrice || "Немає"} грн.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Дата закінчення: {format(new Date(lot.endDate), "dd.MM.yyyy HH:mm")}
        </Typography>
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
          {lot.imageUrls &&
            lot.imageUrls.map((image, index) => (
              <Avatar
                key={index}
                alt={`Фото ${index + 1}`}
                src={`http://localhost:5001/${image}`}
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
            ))}
        </Box>
      </Box>
    </>
  );
};

export default LotInfo;
