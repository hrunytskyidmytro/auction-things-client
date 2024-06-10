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
} from "@mui/material";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import {
  useGetAllPaymentsQuery,
  useDeletePaymentMutation,
} from "../../../api/paymentApi";
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

const Payments = () => {
  const {
    data: payments,
    error,
    isLoading,
    refetch,
  } = useGetAllPaymentsQuery();

  const [deletePayment, { isLoading: isDeleting, error: isError }] =
    useDeletePaymentMutation();

  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [openErrorAlertForDeleting, setOpenErrorAlertForDeleting] =
    useState(false);

  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [isDeletingPayments, setIsDeletingPayments] = useState(false);
  const [selectedPayments, setSelectedPayments] = useState([]);

  const handleDeleteSelectedPayments = () => {
    setOpenDeleteConfirmation(true);
  };

  const handleCloseModalForDeleting = () => {
    setOpenDeleteConfirmation(false);
  };

  const handleConfirmDelete = async () => {
    setIsDeletingPayments(true);
    try {
      for (const id of selectedPayments) {
        await deletePayment(id).unwrap();
      }
      setSelectedPayments([]);
      refetch();
      handleCloseModalForDeleting();
    } catch (error) {
      setOpenErrorAlertForDeleting(true);
    }
    setIsDeletingPayments(false);
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
      field: "amount",
      headerName: "Сума",
      width: 150,
      valueGetter: (params) => `${params.row.amount} грн.`,
    },
    {
      field: "User",
      headerName: "Користувач",
      width: 250,
      valueGetter: (params) =>
        `${params.row.User.firstName} ${params.row.User.lastName}`,
    },
    { field: "lotId", headerName: "Лот", width: 150 },
    {
      field: "status",
      headerName: "Статус",
      width: 200,
      renderCell: (params) => {
        const status = params.value;
        let color;

        if (status === "COMPLETED") {
          color = "success";
        } else if (status === "PENDING") {
          color = "primary";
        } else if (status === "BUYER") {
          color = "FAILED";
        }

        return <Chip label={status} color={color} />;
      },
    },
    {
      field: "commission",
      headerName: "Комісія",
      width: 150,
      valueGetter: (params) => `${params.row.commission} грн.`,
    },
    {
      field: "type",
      headerName: "Тип платежу",
      width: 150,
      renderCell: (params) => {
        const type = params.value;
        let color;

        if (type === "SALE") {
          color = "success";
        } else if (type === "DEPOSIT") {
          color = "primary";
        } else if (type === "FAILED") {
          color = "warning";
        }

        return <Chip label={type} color={color} />;
      },
    },
  ];

  return (
    <>
      <Box sx={{ height: "100hv", width: "100%", mb: 5 }}>
        {selectedPayments.length > 0 && (
          <Button
            variant="contained"
            color="error"
            sx={{ mb: 2 }}
            onClick={handleDeleteSelectedPayments}
          >
            <DeleteOutlineTwoToneIcon />
          </Button>
        )}
        {!payments || payments.length === 0 ? (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h5" align="center" fontWeight={600}>
              Список платежів порожній!
            </Typography>
          </Box>
        ) : (
          <DataGrid
            rows={payments || []}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
            onRowSelectionModelChange={(newSelection) => {
              setSelectedPayments(newSelection);
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
            Видалити платіж/тежі?
          </Typography>
          <Typography variant="body2">
            Ви впевнені, що хочете видалити цю платіж/тежі? Ця дія є
            незворотньою.
          </Typography>
          {isDeletingPayments ? (
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

export default Payments;
