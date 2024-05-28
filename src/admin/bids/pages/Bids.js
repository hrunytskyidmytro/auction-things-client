import React, { useState, useEffect } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { ukUA } from "@mui/x-data-grid/locales";
import {
  Box,
  CircularProgress,
  Button,
  Modal,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import { useDeleteBidMutation, useGetAllBidsQuery } from "../../../api/bidApi";

import { useNavigate } from "react-router-dom";

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

const Bids = () => {
  const { data: users, error, isLoading, refetch } = useGetAllBidsQuery();
  const [deleteBid, { isLoading: isDeleting, error: isError }] =
    useDeleteBidMutation();

  const navigate = useNavigate();

  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [openErrorAlertForDeleting, setOpenErrorAlertForDeleting] =
    useState(false);

  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [isDeletingBids, setIsDeletingBids] = useState(false);
  const [selectedBids, setSelectedBids] = useState([]);

  const handleDeleteSelectedBids = () => {
    setOpenDeleteConfirmation(true);
  };

  const handleCloseModalForDeleting = () => {
    setOpenDeleteConfirmation(false);
  };

  const handleConfirmDelete = async () => {
    setIsDeletingBids(true);
    try {
      for (const id of selectedBids) {
        await deleteBid(id).unwrap();
      }
      setSelectedBids([]);
      refetch();
      handleCloseModalForDeleting();
    } catch (error) {
      setOpenErrorAlertForDeleting(true);
    }
    setIsDeletingBids(false);
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
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size={50} thickness={3.6} />
      </Box>
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

  if (isError) {
    return (
      <Snackbar
        open={openErrorAlertForDeleting}
        autoHideDuration={5000}
        onClose={() => setOpenErrorAlertForDeleting(false)}
      >
        <Alert
          onClose={() => setOpenErrorAlertForDeleting(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {isError?.data?.message}
        </Alert>
      </Snackbar>
    );
  }

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "amount", headerName: "Ставка", width: 250 },
    { field: "lotId", headerName: "Лот", width: 250 },
    { field: "userId", headerName: "Користувач", width: 250 },
    {
      field: "actions",
      headerName: "Дії",
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ m: 1 }}
            onClick={() => navigate(`/admin/bids/${params.row.id}`)}
          >
            <EditTwoToneIcon />
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Box sx={{ height: "100hv", width: "100%", mb: 5 }}>
        {selectedBids.length > 0 && (
          <Button
            variant="contained"
            color="error"
            sx={{ mb: 2 }}
            onClick={handleDeleteSelectedBids}
          >
            <DeleteOutlineTwoToneIcon />
          </Button>
        )}
        <DataGrid
          rows={users || []}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          onRowSelectionModelChange={(newSelection) => {
            setSelectedBids(newSelection);
          }}
          disableRowSelectionOnClick
          getRowId={(row) => row.id}
          localeText={ukUA.components.MuiDataGrid.defaultProps.localeText}
        />
      </Box>
      <Modal
        open={openDeleteConfirmation}
        onClose={() => setOpenDeleteConfirmation(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>
            Видалити ставку?
          </Typography>
          <Typography variant="body2">
            Ви впевнені, що хочете видалити цю ставку? Ця дія є незворотньою.
          </Typography>
          {isDeletingBids ? (
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
    </>
  );
};

export default Bids;
