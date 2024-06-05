import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link as RouterLink } from "react-router-dom";
import { format } from "date-fns";

import MessageSnackbar from "../../shared/components/UIElements/MessageSnackbar";
import { useDeleteFromWatchlistMutation } from "../../api/watchlistApi";

const WatchlistModal = ({
  openWatchlistModal,
  handleCloseWatchlistModal,
  watchlist,
  user,
}) => {
  const [deleteFromWatchlist, { isLoading, error }] =
    useDeleteFromWatchlistMutation();
  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  const handleRemoveFromWatchlist = async (lotId) => {
    try {
      await deleteFromWatchlist({ userId: user.id, lotId: lotId }).unwrap();
    } catch (error) {
      setOpenErrorAlert(true);
    }
  };

  return (
    <>
      <Dialog
        open={openWatchlistModal}
        onClose={handleCloseWatchlistModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Список відстеження
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 0 }}>
          <List sx={{ pt: 0 }}>
            {watchlist?.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mt: 5,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Список відстеження порожній!
                </Typography>
                <Typography variant="body1">
                  Додайте лоти, які вас цікавлять, щоб відстежувати їх тут.
                </Typography>
                <Button
                  color="primary"
                  component={RouterLink}
                  to="/lots"
                  sx={{ mt: 3 }}
                  onClick={handleCloseWatchlistModal}
                >
                  Додати лот
                </Button>
              </Box>
            ) : (
              watchlist?.map((item) => (
                <ListItem
                  key={item?.Lot?.id}
                  sx={{
                    py: 2,
                    px: 2,
                    mb: 2,
                    border: "1px solid grey",
                    borderRadius: 5,
                    color: "black",
                  }}
                  component={RouterLink}
                  to={`/lots/${item.Lot.id}`}
                  onClick={handleCloseWatchlistModal}
                >
                  <ListItemAvatar>
                    <img
                      src={`http://localhost:5001/${item?.Lot?.imageUrls[0]}`}
                      alt={item?.Lot?.title}
                      style={{ width: 100, height: 100, objectFit: "cover" }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item?.Lot?.title}
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {`Поточна ціна: ${item?.Lot?.currentPrice} грн.`}
                        <br />
                        {`Закривається ${format(
                          new Date(item?.Lot?.endDate),
                          "dd.MM.yyyy HH:mm"
                        )}`}
                      </Typography>
                    }
                    sx={{ ml: 2 }}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleRemoveFromWatchlist(item.Lot.id)}
                    >
                      {isLoading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        <DeleteIcon />
                      )}
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            )}
          </List>
        </DialogContent>
      </Dialog>
      <MessageSnackbar
        open={openErrorAlert}
        onClose={() => setOpenErrorAlert(false)}
        severity="error"
        message={
          error?.data?.message ||
          "Виникла помилка. Будь ласка, спробуйте ще раз."
        }
      />
    </>
  );
};

export default WatchlistModal;
