import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useGetLotByIdQuery } from "../../api/lotApi";
import { useCreateBidMutation } from "../../api/bidApi";

import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  TextField,
  Grid,
  Container,
  Box,
  Stack,
  Button,
  Chip,
  Paper,
  Divider,
  Snackbar,
  Alert,
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { red, grey, orange } from "@mui/material/colors";
import { format } from "date-fns";

// import Fancybox from "../components/FancyBox";
// import { Fancybox } from "@fancyapps/ui";

import Breadcrumbs from "../../shared/components/UIElements/Breadcrumbs";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import GavelIcon from "@mui/icons-material/Gavel";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const LotDetail = () => {
  const { id } = useParams();
  const { data: lot, isLoading, error, refetch } = useGetLotByIdQuery(id);

  const [createBid, { isLoading: isCreatingBid, isError: isErrorBid }] =
    useCreateBidMutation();

  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [timeLeftColor, setTimeLeftColor] = useState(grey[700]);

  const [showBids, setShowBids] = useState(false);
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidAmount, setBidAmount] = useState("");

  useEffect(() => {
    if (error || isErrorBid) {
      setOpenErrorAlert(true);
    }

    if (lot && lot.endDate) {
      const interval = setInterval(() => {
        const endDate = new Date(lot.endDate);
        const now = new Date();
        const difference = endDate - now;

        if (difference <= 0) {
          setTimeLeft("Лот завершено.");
          setTimeLeftColor(red[500]);
          clearInterval(interval);
        } else {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((difference / 1000 / 60) % 60);
          const seconds = Math.floor((difference / 1000) % 60);
          setTimeLeft(`${days}д ${hours}год. ${minutes}хв. ${seconds}с.`);

          if (days < 1) {
            setTimeLeftColor(orange[500]);
          }

          if (days === 0 && hours < 1) {
            setTimeLeftColor(red[500]);
          }
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [error, isErrorBid, lot]);

  if (isLoading) {
    return (
      <Container sx={{ mt: "8%" }}>
        <Skeleton variant="rectangular" width="100%" height="700px" />
      </Container>
    );
  }

  if (error || isErrorBid) {
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
          {error?.data?.message || isErrorBid?.data?.message}
        </Alert>
      </Snackbar>
    );
  }

  const stringAvatar = (name) => {
    return {
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  };

  const handleToggleBids = () => {
    setShowBids(!showBids);
  };

  const handleToggleBidModal = () => {
    setShowBidModal(!showBidModal);
  };

  const handleBidChange = (e) => {
    setBidAmount(e.target.value);
  };

  const handlePlaceBid = async () => {
    // if (!user) {
    //   alert("Ви повинні бути авторизовані, щоб зробити ставку.");
    //   return;
    // }

    try {
      await createBid({ lotId: id, amount: bidAmount }).unwrap();
      refetch();
      alert("Ставка успішно зроблена!");
      setShowBidModal(false);
    } catch (error) {
      setOpenErrorAlert(true);
      console.log("Не вдалося зробити ставку", error);
      alert("Не вдалося зробити ставку. Спробуйте ще раз.");
    }
  };

  return (
    <Container
      sx={{
        py: { xs: 8, sm: 16 },
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ mt: 5 }}>
            <Breadcrumbs
              links={[
                { label: "Bid&Win", url: "/" },
                { label: "Лоти", url: "/lots" },
                { label: lot.title, url: `/lots/${id}` },
              ]}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          {lot.imageUrls && lot.imageUrls.length > 0 && (
            // <Fancybox>
            <Carousel showStatus={false} autoPlay interval={3000} infiniteLoop>
              {lot.imageUrls.map((url, index) => (
                <div
                  key={url}
                  data-fancybox="gallery"
                  data-src={`http://localhost:5001/${url}`}
                  data-thumb-src={`http://localhost:5001/${url}`}
                  data-caption={`Фото ${index + 1}`}
                >
                  <img
                    src={`http://localhost:5001/${url}`}
                    alt={`Фото ${index + 1}`}
                    style={{
                      width: "100%",
                      maxHeight: "500px",
                      objectFit: "cover",
                      marginBottom: "8px",
                      cursor: "pointer",
                    }}
                  />
                </div>
              ))}
            </Carousel>
            // </Fancybox>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
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
              title={`${lot.creator?.firstName} ${lot.creator?.lastName}`}
              subheader={
                lot.createdAt && format(new Date(lot.createdAt), "dd.MM.yyyy")
              }
            />
            <CardContent>
              <Typography
                variant="h5"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  mb: 2,
                }}
                gutterBottom
              >
                {lot.title}{" "}
                <Chip
                  variant="filled"
                  color="info"
                  size="medium"
                  label={`#${lot.id}`}
                />
              </Typography>
              <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                <Typography
                  variant="h6"
                  color="text.primary"
                  sx={{ display: "flex", flexDirection: "row" }}
                  gutterBottom
                >
                  <MonetizationOnIcon sx={{ mr: 1 }} />
                  Поточна ціна
                </Typography>
                <Typography variant="h5" sx={{ color: grey[700] }} gutterBottom>
                  {lot.currentPrice} грн.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Крок ставки: {lot.bidIncrement} грн.
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    Кількість зроблених ставок: {lot.bidCount}
                  </Typography>
                  {showBids && (
                    <Button variant="text" onClick={handleToggleBids}>
                      {showBids ? "Приховати ставки" : "Переглянути всі ставки"}
                    </Button>
                  )}
                </Box>
              </Paper>
              <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                <Typography
                  variant="h6"
                  color="text.primary"
                  sx={{ display: "flex", flexDirection: "row" }}
                  gutterBottom
                >
                  <LocalOfferIcon sx={{ mr: 1 }} />
                  Ціна купівлі відразу
                </Typography>
                <Typography variant="h5" sx={{ color: grey[700] }} gutterBottom>
                  {lot.buyNowPrice} грн.
                </Typography>
              </Paper>
              <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
                <Typography
                  variant="h6"
                  color="text.primary"
                  sx={{ display: "flex", flexDirection: "row" }}
                  gutterBottom
                >
                  <AccessTimeIcon sx={{ mr: 1 }} />
                  Завершення лоту
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ color: timeLeftColor }}
                  gutterBottom
                >
                  {timeLeft}
                </Typography>
              </Paper>
              <Divider sx={{ my: 2 }} />
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<GavelIcon />}
                  onClick={handleToggleBidModal}
                >
                  Зробити ставку
                </Button>
                <Button variant="contained" color="secondary">
                  Купити зараз за {lot.buyNowPrice} грн.
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<FavoriteBorderIcon />}
                >
                  Додати в список відстеження
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Box mt={3}>
            <Typography variant="h6" gutterBottom>
              Опис
            </Typography>
            <Typography variant="body1" paragraph>
              {lot.description}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      {showBids && (
        <Dialog open={showBids} onClose={handleToggleBids}>
          <DialogTitle>Ставки для лоту {lot.title}</DialogTitle>
          <DialogContent>
            {/* {lot.bids.map((bid, index) => (
              <Typography key={index} variant="body1">
                {bid.user}: {bid.amount} грн
              </Typography>
            ))} */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleToggleBids} color="primary">
              Закрити
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {showBidModal && (
        <Dialog open={showBidModal} onClose={handleToggleBidModal}>
          <DialogTitle>Зробити ставку на "{lot.title}"</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Сума ставки"
              type="number"
              fullWidth
              value={bidAmount}
              onChange={handleBidChange}
              disabled={isCreatingBid}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleToggleBidModal} color="primary">
              Відмінити
            </Button>
            <Button
              onClick={handlePlaceBid}
              color="primary"
              disabled={isCreatingBid}
            >
              Зробити ставку
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default LotDetail;
