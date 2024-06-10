import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { ukUA } from "@mui/x-data-grid/locales";
import {
  Box,
  CircularProgress,
  Button,
  Typography,
  Modal,
} from "@mui/material";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import {
  useGetAllAuctionHistoriesQuery,
  useDeleteAuctionHistoryMutation,
} from "../../../api/auctionHistoryApi";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import MessageSnackbar from "../../../shared/components/UIElements/MessageSnackbar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "1%",
  boxShadow: 24,
  p: 4,
};

const AuctionHistories = () => {
  const {
    data: auctionHistories,
    error,
    isLoading,
    refetch,
  } = useGetAllAuctionHistoriesQuery();

  const [deleteAuctionHistory, { isLoading: isDeleting, error: isError }] =
    useDeleteAuctionHistoryMutation();

  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [openErrorAlertForDeleting, setOpenErrorAlertForDeleting] =
    useState(false);

  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [isDeletingAuctionHistories, setIsDeletingAuctionHistories] =
    useState(false);
  const [selectedAuctionHistories, setSelectedAuctionHistories] = useState([]);

  const handleDeleteSelectedAuctionHistories = () => {
    setOpenDeleteConfirmation(true);
  };

  const handleCloseModalForDeleting = () => {
    setOpenDeleteConfirmation(false);
  };

  const handleConfirmDelete = async () => {
    setIsDeletingAuctionHistories(true);
    try {
      for (const id of selectedAuctionHistories) {
        await deleteAuctionHistory(id).unwrap();
      }
      setSelectedAuctionHistories([]);
      refetch();
      handleCloseModalForDeleting();
    } catch (error) {
      setOpenErrorAlertForDeleting(true);
    }
    setIsDeletingAuctionHistories(false);
  };

  useEffect(() => {
    refetch();
    if (error) {
      setOpenErrorAlert(true);
    }
    if (isError) {
      setOpenErrorAlertForDeleting(true);
    }
  }, [error, isError, refetch]);

  if (isLoading) {
    return <LoadingSpinner size={50} />;
  }

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "lot",
      headerName: "Лот",
      width: 500,
      valueGetter: (params) => params.row.Lot.title,
    },
    {
      field: "bid",
      headerName: "Ставка",
      width: 200,
      valueGetter: (params) => `${params.row.Bid.amount} грн.`,
    },
    {
      field: "oldPrice",
      headerName: "Початкова ставка",
      width: 200,
      valueGetter: (params) => `${params.row.oldPrice} грн.`,
    },
    {
      field: "newPrice",
      headerName: "Поточна ставка",
      width: 200,
      valueGetter: (params) => `${params.row.newPrice} грн.`,
    },
  ];

  return (
    <>
      <Box sx={{ height: "100hv", width: "100%", mb: 5 }}>
        {selectedAuctionHistories.length > 0 && (
          <Button
            variant="contained"
            color="error"
            sx={{ mb: 2 }}
            onClick={handleDeleteSelectedAuctionHistories}
          >
            <DeleteOutlineTwoToneIcon />
          </Button>
        )}
        {!auctionHistories || auctionHistories.length === 0 ? (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h5" align="center" fontWeight={600}>
              Список історії лотів порожній!
            </Typography>
          </Box>
        ) : (
          <DataGrid
            rows={auctionHistories || []}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
            onRowSelectionModelChange={(newSelection) => {
              setSelectedAuctionHistories(newSelection);
            }}
            disableRowSelectionOnClick
            getRowId={(row) => row.id}
            localeText={ukUA.components.MuiDataGrid.defaultProps.localeText}
          />
        )}
      </Box>
      <Modal
        open={openDeleteConfirmation}
        onClose={() => setOpenDeleteConfirmation(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>
            Видалити історію/ї?
          </Typography>
          <Typography variant="body2">
            Ви впевнені, що хочете видалити цю історію/ї? Ця дія є незворотньою.
          </Typography>
          {isDeletingAuctionHistories ? (
            <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
              <CircularProgress size={30} thickness={3.6} />
            </Box>
          ) : (
            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                sx={{ m: 1 }}
                onClick={handleConfirmDelete}
                disabled={isDeleting}
              >
                Так
              </Button>
              <Button
                variant="outlined"
                sx={{ m: 1 }}
                onClick={handleCloseModalForDeleting}
              >
                Скасувати
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
      <MessageSnackbar
        open={openErrorAlert}
        onClose={() => setOpenErrorAlert(false)}
        severity="error"
        message={
          error?.data?.message ||
          "Виникла помилка. Будь ласка, спробуйте ще раз."
        }
      />
      <MessageSnackbar
        open={openErrorAlertForDeleting}
        onClose={() => setOpenErrorAlertForDeleting(false)}
        severity="error"
        message={
          isError?.data?.message ||
          "Виникла помилка. Будь ласка, спробуйте ще раз."
        }
      />
    </>
  );
};

export default AuctionHistories;
