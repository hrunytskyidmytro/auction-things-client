import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Grid,
  Chip,
  Skeleton,
  Snackbar,
  Alert,
  Box,
  Container,
} from "@mui/material";
import { red, green, grey, yellow } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { format } from "date-fns";

import { useGetAllLotsQuery } from "../../api/lotApi";
import { Link as RouterLink } from "react-router-dom";

const StyledCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  flexGrow: 1,
  p: 1,
  height: "530px",
});

const StyledImage = styled("img")({
  width: "100%",
  height: "250px",
  objectFit: "cover",
});

const StyledCardActions = styled(CardActions)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "auto",
});

const LotsForBuyers = () => {
  const { data: lots, isLoading, error } = useGetAllLotsQuery();

  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  useEffect(() => {
    if (error) {
      setOpenErrorAlert(true);
    }
  }, [error]);

  if (isLoading) {
    return (
      <Grid container spacing={2} sx={{ mt: 15, justifyContent: "center" }}>
        {Array.from({ length: lots?.length || 4 }).map((_, index) => (
          <Grid item key={index}>
            <StyledCard>
              <CardHeader
                avatar={<Skeleton variant="circular" width={40} height={40} />}
                action={
                  <Skeleton variant="rectangular" width={24} height={24} />
                }
                title={<Skeleton variant="text" width={150} />}
                subheader={<Skeleton variant="text" width={100} />}
              />
              <Skeleton variant="rectangular" width={280} height={250} />
              <CardContent sx={{ marginTop: "auto", padding: 0 }}>
                <Skeleton variant="text" animation="wave" width={280} />
              </CardContent>
              <CardContent sx={{ marginTop: "auto" }}>
                <Skeleton variant="text" animation="wave" width={280} />
              </CardContent>
              <StyledCardActions disableSpacing>
                <Skeleton variant="text" animation="wave" width={150} />
              </StyledCardActions>
              <CardContent sx={{ marginTop: "auto" }}>
                <Skeleton variant="text" animation="wave" width={280} />
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (error) {
    return (
      <Snackbar
        open={openErrorAlert}
        autoHideDuration={5000}
        onClose={() => setOpenErrorAlert(false)}
      >
        <Alert
          onClose={() => setOpenErrorAlert(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error?.data?.message}
        </Alert>
      </Snackbar>
    );
  }

  const stringAvatar = (name) => {
    return {
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  };

  return (
    <Container
      id="lots"
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: "100%", md: "100%" },
          //   textAlign: { sm: "left", md: "center" },
        }}
      >
        <Grid container spacing={3} justifyContent="center" sx={{ mt: 15 }}>
          {lots.map((lot) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={lot.id}>
              <StyledCard>
                <CardHeader
                  avatar={
                    <Avatar
                      sx={{ bgcolor: red[500] }}
                      aria-label="lot"
                      {...stringAvatar(
                        `${lot.creator?.firstName} ${lot.creator?.lastName}`
                      )}
                    />
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={
                    `${lot.creator?.firstName} ${lot.creator?.lastName}` || (
                      <Skeleton variant="text" width={150} />
                    )
                  }
                  subheader={
                    lot.createdAt &&
                    format(new Date(lot.createdAt), "dd.MM.yyyy")
                  }
                />
                <CardContent sx={{ marginTop: "auto", padding: 0 }}>
                  {lot.imageUrls && lot.imageUrls.length > 0 ? (
                    <Carousel
                      showThumbs={false}
                      showStatus={false}
                      infiniteLoop
                    >
                      {lot.imageUrls.map((url, index) => (
                        <div key={index}>
                          <StyledImage
                            src={`http://localhost:5001/${url}`}
                            alt={`Опис фотографії ${index + 1}`}
                          />
                        </div>
                      ))}
                    </Carousel>
                  ) : (
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width="100%"
                      height="250px"
                    />
                  )}
                </CardContent>
                <CardContent sx={{ marginTop: "auto" }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    component={RouterLink}
                    to={`/lots/${lot.id}`}
                    sx={{ textDecoration: "none", color: "inherit" }}
                  >
                    {lot.title}
                  </Typography>
                </CardContent>
                <StyledCardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteBorderIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </StyledCardActions>
                <CardContent sx={{ marginTop: "auto" }}>
                  <Chip
                    label={
                      lot.status === "OPEN"
                        ? "Відкритий"
                        : lot.status === "CLOSED"
                        ? "Закритий"
                        : "Очікується"
                    }
                    sx={{
                      bgcolor:
                        lot.status === "OPEN"
                          ? green[500]
                          : lot.status === "CLOSED"
                          ? grey[500]
                          : yellow[900],
                      color: "white",
                    }}
                  />
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default LotsForBuyers;
