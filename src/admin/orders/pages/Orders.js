import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { ukUA } from "@mui/x-data-grid/locales";
import {
  Box,
  CircularProgress,
  Button,
  Typography,
  Chip,
  Modal,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import {
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
  useUpdateOrderStatusMutation,
} from "../../../api/orderApi";
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

const Orders = () => {
  const { data: orders, error, isLoading, refetch } = useGetAllOrdersQuery();
  const [deleteOrder, { isLoading: isDeleting, error: isError }] =
    useDeleteOrderMutation();

  const [
    updateOrderStatus,
    { isLoading: isLoadingUpdate, error: isErrorUpdate },
  ] = useUpdateOrderStatusMutation();

  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [openErrorAlertForDeleting, setOpenErrorAlertForDeleting] =
    useState(false);

  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [isDeletingOrders, setIsDeletingOrders] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    refetch();
    if (error || isErrorUpdate) {
      setOpenErrorAlert(true);
    }
    if (isError) {
      setOpenErrorAlertForDeleting(true);
    }
  }, [error, isError, isErrorUpdate, refetch]);

  const handleDeleteSelectedCategories = () => {
    setOpenDeleteConfirmation(true);
  };

  const handleCloseModalForDeleting = () => {
    setOpenDeleteConfirmation(false);
  };

  const handleConfirmDelete = async () => {
    setIsDeletingOrders(true);
    try {
      for (const id of selectedOrders) {
        await deleteOrder(id).unwrap();
      }
      setSelectedOrders([]);
      refetch();
      handleCloseModalForDeleting();
    } catch (error) {
      setOpenErrorAlertForDeleting(true);
    }
    setIsDeletingOrders(false);
  };

  const handleStatusChange = async () => {
    if (currentOrderId && newStatus) {
      try {
        await updateOrderStatus({
          id: currentOrderId,
          status: newStatus,
        }).unwrap();
        refetch();
        setCurrentOrderId(null);
        setNewStatus("");
      } catch (error) {
        setOpenErrorAlert(true);
      }
    }
  };

  if (isLoading || isLoadingUpdate) {
    return <LoadingSpinner size={50} />;
  }

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "Користувач",
      width: 250,
      valueGetter: (params) =>
        `${params.row.user.firstName} ${params.row.user.lastName}`,
    },
    {
      field: "lot",
      headerName: "Лот",
      width: 350,
      valueGetter: (params) => `${params.row.lot.title}`,
    },
    {
      field: "amount",
      headerName: "Сума",
      width: 150,
      valueGetter: (params) => `${params.row.amount} грн.`,
    },
    {
      field: "status",
      headerName: "Статус",
      width: 250,
      renderCell: (params) => {
        const status = params.value;
        let color;

        if (status === "PROCESSING") {
          color = "warning";
        } else if (status === "COMPLETED") {
          color = "success";
        } else if (status === "CANCELLED") {
          color = "FAILED";
        }

        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Chip label={status} color={color} />
            <Button
              sx={{ ml: 1 }}
              variant="text"
              size="small"
              onClick={() => setCurrentOrderId(params.row.id)}
            >
              Змінити
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <>
      <Box sx={{ height: "100hv", width: "100%", mb: 5 }}>
        {selectedOrders.length > 0 && (
          <Button
            variant="contained"
            color="error"
            sx={{ mb: 2 }}
            onClick={handleDeleteSelectedCategories}
          >
            <DeleteOutlineTwoToneIcon />
          </Button>
        )}
        {!orders || orders.length === 0 ? (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h5" align="center" fontWeight={600}>
              Список замовлень порожній!
            </Typography>
          </Box>
        ) : (
          <DataGrid
            rows={orders || []}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
            onRowSelectionModelChange={(newSelection) => {
              setSelectedOrders(newSelection);
            }}
            disableRowSelectionOnClick
            getRowId={(row) => row.id}
            localeText={ukUA.components.MuiDataGrid.defaultProps.localeText}
          />
        )}
      </Box>
      <Modal
        open={Boolean(currentOrderId)}
        onClose={() => setCurrentOrderId(null)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>
            Змінити статус замовлення
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="status-select-label">Статус</InputLabel>
            <Select
              labelId="status-select-label"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              label="Статус"
            >
              <MenuItem value="PROCESSING">В процесі</MenuItem>
              <MenuItem value="COMPLETED">Завершено</MenuItem>
              <MenuItem value="CANCELLED">Скасовано</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              sx={{ m: 1 }}
              onClick={handleStatusChange}
              disabled={isDeleting}
            >
              Зберегти
            </Button>
            <Button
              variant="outlined"
              sx={{ m: 1 }}
              onClick={() => setCurrentOrderId(null)}
            >
              Скасувати
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={openDeleteConfirmation}
        onClose={() => setOpenDeleteConfirmation(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>
            Видалити замовлення?
          </Typography>
          <Typography variant="body2">
            Ви впевнені, що хочете видалити це замовлення? Ця дія є
            незворотньою.
          </Typography>
          {isDeletingOrders ? (
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

export default Orders;
