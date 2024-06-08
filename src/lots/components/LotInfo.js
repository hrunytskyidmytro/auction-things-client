import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  Paper,
  Divider,
  Button,
  Chip,
  Tooltip,
  Box,
  Stack,
} from "@mui/material";
import { red, grey } from "@mui/material/colors";
import LoadingButton from "@mui/lab/LoadingButton";

import GavelIcon from "@mui/icons-material/Gavel";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import { format } from "date-fns";

const stringAvatar = (name) => {
  return {
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
};

const LotInfo = ({
  lot,
  timeLeftColor,
  timeLeft,
  handleToggleBids,
  isLotEnded,
  handleToggleBidModal,
  handleBuyNowClick,
  checkWatchlistExist,
  isLoadingWatchlist,
  handleAddToWatchlist,
  isBuyLotNow,
}) => {
  return (
    <Card sx={{ borderRadius: 2 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="lot"
            {...stringAvatar(
              `${lot?.creator?.firstName} ${lot?.creator?.lastName}`
            )}
          />
        }
        title={`${lot?.creator?.firstName} ${lot?.creator?.lastName}`}
        subheader={
          lot?.createdAt && format(new Date(lot.createdAt), "dd.MM.yyyy")
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
          {lot?.title}{" "}
          <Chip
            variant="filled"
            color="info"
            size="medium"
            label={`#${lot?.id}`}
          />
        </Typography>
        <Paper elevation={2} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
          <Typography
            variant="h6"
            color="text.primary"
            sx={{ display: "flex", flexDirection: "row" }}
            gutterBottom
          >
            <MonetizationOnIcon sx={{ mr: 1 }} />
            Поточна ціна
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: grey[800], fontWeight: "bold" }}
            gutterBottom
          >
            {lot?.currentPrice} грн.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Крок ставки: {lot?.bidIncrement} грн.
            <Tooltip
              title="Крок ставки - це мінімальна різниця між двома сусідніми ставками. Якщо буде введено ціну, не врахувавши крок ставки, то ставка не пройде."
              arrow
            >
              <HelpOutlineIcon sx={{ ml: 1, fontSize: "1rem" }} />
            </Tooltip>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Резервна ціна: {lot?.reservePrice} грн.
            <Tooltip
              title="Резервна ціна - це мінімальна ціна, за якої продавець погоджується продати лот. Поточна ціна повинна перевищувати резервну ціну. Якщо ціну не перевищено ставками, то лот не буде продано."
              arrow
            >
              <HelpOutlineIcon sx={{ ml: 1, fontSize: "1rem" }} />
            </Tooltip>
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              mt: 1,
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
              Кількість зроблених ставок: {lot?.bidCount}
            </Typography>
            {lot && lot.bidCount > 0 && (
              <Button variant="text" onClick={handleToggleBids}>
                Переглянути всі ставки
              </Button>
            )}
          </Box>
        </Paper>
        <Paper elevation={2} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
          <Typography
            variant="h6"
            color="text.primary"
            sx={{ display: "flex", flexDirection: "row" }}
            gutterBottom
          >
            <LocalOfferIcon sx={{ mr: 1 }} />
            Ціна купівлі відразу
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: grey[800], fontWeight: "bold" }}
            gutterBottom
          >
            {lot?.buyNowPrice} грн.
          </Typography>
        </Paper>
        <Paper elevation={2} sx={{ p: 2, mt: 2, borderRadius: 2 }}>
          <Typography
            variant="h6"
            color="text.primary"
            sx={{ display: "flex", flexDirection: "row" }}
            gutterBottom
          >
            <AccessTimeIcon sx={{ mr: 1 }} />
            Завершення лоту
          </Typography>
          <Typography variant="h5" sx={{ color: timeLeftColor }} gutterBottom>
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
                Купити зараз за {lot?.buyNowPrice} грн.
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
  );
};

export default LotInfo;
