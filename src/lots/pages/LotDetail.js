import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  useGetLotByIdQuery,
  useGetLotBidsQuery,
  useBuyLotNowMutation,
} from "../../api/lotApi";
import { useCreateBidMutation } from "../../api/bidApi";
import {
  useAddToWatchlistMutation,
  useCheckWatchlistExistQuery,
} from "../../api/watchlistApi";

import { useAuth } from "../../shared/hooks/useAuth";

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
  Skeleton,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { red, grey, orange } from "@mui/material/colors";
import { format } from "date-fns";

import GavelIcon from "@mui/icons-material/Gavel";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Fancybox from "../components/FancyBox";
// import { Fancybox } from "@fancyapps/ui";

import Breadcrumbs from "../../shared/components/UIElements/Breadcrumbs";
import MessageSnackbar from "../../shared/components/UIElements/MessageSnackbar";

const LotDetail = () => {
  const { id } = useParams();

  const {
    data: lot,
    isFetching: isFetchingLot,
    error: errorLot,
    refetch: refetchLot,
  } = useGetLotByIdQuery(id);

  const {
    data: bidsData,
    error: errorBids,
    refetch: refetchBids,
  } = useGetLotBidsQuery(id);

  const [createBid, { isLoading: isCreatingBid }] = useCreateBidMutation();

  const [addToWatchlist, { isLoading: isLoadingWatchlist }] =
    useAddToWatchlistMutation();

  const [buyLotNow, { isLoading: isBuyLotNow }] = useBuyLotNowMutation();

  const { data: checkWatchlistExist } = useCheckWatchlistExistQuery(id);

  const { user } = useAuth();

  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const [timeLeftColor, setTimeLeftColor] = useState(grey[700]);

  const [showBids, setShowBids] = useState(false);
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidAmount, setBidAmount] = useState("");

  const [isLotEnded, setIsLotEnded] = useState(false);

  useEffect(() => {
    if (lot && lot.endDate) {
      const endDate = new Date(lot.endDate);
      const now = new Date();
      setIsLotEnded(endDate <= now || lot.status === "CLOSED");
    }
  }, [lot]);

  useEffect(() => {
    if (errorLot || errorBids) {
      setErrorMessage(
        errorLot?.data?.message ||
          errorBids?.data?.message ||
          "Виникла помилка. Будь ласка, спробуйте ще раз."
      );
      setOpenErrorAlert(true);
    }
  }, [errorLot, errorBids]);

  useEffect(() => {
    let newIntervalId;

    if (lot && lot.endDate) {
      const newIntervalId = setInterval(() => {
        const endDate = new Date(lot.endDate);
        const now = new Date();
        const difference = endDate - now;

        if (difference <= 0 || lot.status === "CLOSED") {
          setTimeLeft("Лот завершено.");
          setTimeLeftColor(red[500]);
          handleCloseLot();
          clearInterval(newIntervalId);
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
    }

    return () => clearInterval(newIntervalId);
  }, [lot]);

  if (isFetchingLot) {
    return (
      <Container sx={{ mt: "8%" }}>
        <Skeleton variant="rectangular" width="100%" height="700px" />
      </Container>
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
    try {
      const response = await createBid({
        amount: bidAmount,
        lotId: id,
      }).unwrap();
      refetchLot();
      refetchBids();
      setShowBidModal(false);
      setOpenSuccessAlert(true);
      setSuccessMessage(response.message);
    } catch (error) {
      setOpenErrorAlert(true);
      setErrorMessage(
        error?.data?.message || "Виникла помилка. Будь ласка, спробуйте ще раз."
      );
    }
  };

  const handleCloseLot = async () => {
    if (!id || !lot || lot.endDate <= new Date()) {
      console.error("Пропущено ідентифікатор лоту або лот вже закритий.");
      return;
    }

    try {
      if (lot.status !== "CLOSED") {
        setSuccessMessage(
          "Лот завершився. Листи з результатами розіслані на вашу поштову скриньку. Будь ласка, перевірте свою електронну пошту для отримання додаткової інформації."
        );
        setOpenSuccessAlert(true);
        refetchLot();
      }
    } catch (error) {
      setOpenErrorAlert(true);
      setErrorMessage(
        error?.data?.message || "Виникла помилка при закритті лоту."
      );
    }
  };

  const handleBuyNowClick = async () => {
    try {
      const response = await buyLotNow({ lotId: id, buyNow: true }).unwrap();
      if (response.redirectUrl) {
        window.location.href = response.redirectUrl;
      }
    } catch (error) {
      setOpenErrorAlert(true);
      setErrorMessage(
        error?.data?.message ||
          "Не вдалося здійснити купівлю. Будь ласка, спробуйте пізніше."
      );
    }
  };

  const handleAddToWatchlist = async () => {
    try {
      await addToWatchlist({ userId: user.id, lotId: id }).unwrap();
    } catch (error) {
      setOpenErrorAlert(true);
      setErrorMessage(
        error?.data?.message || "Виникла помилка. Будь ласка, спробуйте ще раз."
      );
    }
  };

  return (
    <Container
      sx={{
        py: { xs: 8, sm: 16 },
      }}
    >
      <MessageSnackbar
        open={openErrorAlert}
        onClose={() => setOpenErrorAlert(false)}
        severity="error"
        message={
          errorMessage || "Виникла помилка. Будь ласка, спробуйте ще раз."
        }
      />
      <MessageSnackbar
        open={openSuccessAlert}
        onClose={() => setOpenSuccessAlert(false)}
        severity="success"
        message={successMessage}
      />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ mt: 5 }}>
            <Breadcrumbs
              links={[
                { label: "Bid&Win", url: "/" },
                { label: "Лоти", url: "/lots" },
                { label: lot?.title, url: `/lots/${id}` },
              ]}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            {lot.imageUrls && lot.imageUrls.length > 0 && (
              <Fancybox>
                <Carousel
                  showStatus={false}
                  autoPlay
                  interval={3000}
                  infiniteLoop
                >
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
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  ))}
                </Carousel>
              </Fancybox>
            )}
          </Paper>
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
                  {lot && lot.bidCount > 0 && (
                    <Button variant="text" onClick={handleToggleBids}>
                      Переглянути всі ставки
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
              {!isLotEnded && (
                <>
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
                    <LoadingButton
                      variant="contained"
                      color="secondary"
                      loading={isBuyLotNow}
                      onClick={handleBuyNowClick}
                    >
                      Купити зараз за {lot.buyNowPrice} грн.
                    </LoadingButton>
                    <LoadingButton
                      variant="outlined"
                      color="primary"
                      startIcon={
                        checkWatchlistExist?.exist ? (
                          <FavoriteIcon />
                        ) : (
                          <FavoriteBorderIcon />
                        )
                      }
                      disabled={checkWatchlistExist?.exist}
                      loading={isLoadingWatchlist}
                      onClick={handleAddToWatchlist}
                    >
                      {checkWatchlistExist?.exist
                        ? "У списку відстеження"
                        : "Додати в список відстеження"}
                    </LoadingButton>
                  </Stack>
                </>
              )}
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
          <DialogTitle>Історія ставок для лоту "{lot.title}"</DialogTitle>
          <DialogContent>
            {bidsData ? (
              bidsData.map((bid, index) => (
                <Card key={index} sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      <PersonIcon sx={{ mr: 1 }} />
                      {bid.User.firstName} {bid.User.lastName}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      Сума: {bid.amount} грн
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Дата:{" "}
                      {format(new Date(bid.createdAt), "dd.MM.yyyy HH:mm")}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                <CircularProgress size={30} thickness={3.6} />
              </Box>
            )}
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
