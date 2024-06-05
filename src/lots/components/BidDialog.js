import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const BidDialog = ({
  lot,
  showBidModal,
  handleToggleBidModal,
  isCreatingBid,
  handlePlaceBid,
}) => {
  const [bidAmount, setBidAmount] = useState("");

  const handleBidChange = (e) => {
    setBidAmount(e.target.value);
  };

  return (
    <>
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
              inputProps={{
                min: 100,
                max: 5000,
              }}
              error={bidAmount > 5000}
              helperText={
                bidAmount > 5000 ? "Максимальна сума ставки - 5000 грн." : ""
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleToggleBidModal} color="primary">
              Відмінити
            </Button>
            <Button
              onClick={() => handlePlaceBid(bidAmount)}
              color="primary"
              disabled={isCreatingBid}
            >
              Зробити ставку
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default BidDialog;
