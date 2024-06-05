import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { format } from "date-fns";

const BidHistoryDialog = ({ lot, showBids, handleToggleBids, bidsData }) => {
  return (
    <>
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
    </>
  );
};

export default BidHistoryDialog;
