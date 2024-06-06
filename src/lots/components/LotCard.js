import React, { useState } from "react";
import {
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  Chip,
  Skeleton,
  CircularProgress,
  Divider,
} from "@mui/material";
import { red, green, grey, yellow } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MessageSnackbar from "../../shared/components/UIElements/MessageSnackbar";
import {
  StyledCard,
  StyledImage,
  StyledCardActions,
} from "../styles/cardStyles";
import { useAuth } from "../../shared/hooks/useAuth";

import { Link as RouterLink } from "react-router-dom";
import { format } from "date-fns";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import {
  useAddToWatchlistMutation,
  useCheckWatchlistExistQuery,
  useDeleteFromWatchlistMutation,
} from "../../api/watchlistApi";

const LotCard = ({ lot }) => {
  const { user } = useAuth();
  const [addToWatchlist, { error: errorAdd, isLoading: isLoadingAdd }] =
    useAddToWatchlistMutation();
  const [
    deleteFromWatchlist,
    { error: errorDelete, isLoading: isLoadingDelete },
  ] = useDeleteFromWatchlistMutation();

  const { data: checkWatchlistExist, refetch: refetchCheckWatchlistExist } =
    useCheckWatchlistExistQuery(lot.id);

  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  const stringAvatar = (name) => {
    return {
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  };

  const handleWatchlist = async () => {
    try {
      if (checkWatchlistExist?.exist) {
        await deleteFromWatchlist({
          userId: user.id,
          lotId: lot.id,
        }).unwrap();
      } else {
        await addToWatchlist({
          userId: user.id,
          lotId: lot.id,
        }).unwrap();
      }
      refetchCheckWatchlistExist();
    } catch (error) {
      setOpenErrorAlert(true);
    }
  };

  return (
    <>
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
          title={
            `${lot.creator?.firstName} ${lot.creator?.lastName}` || (
              <Skeleton variant="text" width={150} />
            )
          }
          subheader={format(new Date(lot?.createdAt), "dd.MM.yyyy")}
        />
        <CardContent sx={{ marginTop: "auto", padding: 0 }}>
          {lot.imageUrls && lot.imageUrls.length > 0 ? (
            <Carousel showThumbs={false} showStatus={false} infiniteLoop>
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
        <CardContent
          sx={{
            marginTop: "auto",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            component={RouterLink}
            to={`/lots/${lot.id}`}
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            {lot.title}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography
            variant="h5"
            color="text.primary"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            {lot.currentPrice} грн
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            {`Закривається ${format(
              new Date(lot?.endDate),
              "dd.MM.yyyy HH:mm"
            )}`}
          </Typography>
        </CardContent>
        <StyledCardActions disableSpacing>
          <IconButton
            aria-label="додати до списку відстеження"
            sx={{
              position: "absolute",
              right: 16,
              bottom: 16,
              color: red[500],
            }}
            disabled={isLoadingAdd || isLoadingDelete}
            onClick={() => handleWatchlist()}
          >
            {isLoadingAdd || isLoadingDelete ? (
              <CircularProgress size={24} color="inherit" />
            ) : checkWatchlistExist?.exist ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
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
      <MessageSnackbar
        open={openErrorAlert}
        onClose={() => setOpenErrorAlert(false)}
        severity="error"
        message={
          errorAdd?.data?.message ||
          errorDelete?.data?.message ||
          "Виникла помилка. Будь ласка, спробуйте ще раз."
        }
      />
    </>
  );
};

export default LotCard;
