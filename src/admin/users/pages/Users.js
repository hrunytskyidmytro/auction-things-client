import React, { useState, useEffect } from "react";

import { parsePhoneNumberFromString } from "libphonenumber-js";

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
  Chip,
} from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import FileCopyIcon from "@mui/icons-material/FileCopy";

import { useNavigate } from "react-router-dom";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
} from "../../../api/userApi";

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

const Users = () => {
  const { data: users, error, isLoading, refetch } = useGetAllUsersQuery();
  const [deleteUser, { isLoading: isDeleting, error: isError }] =
    useDeleteUserMutation();
  const navigate = useNavigate();

  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [openErrorAlertForDeleting, setOpenErrorAlertForDeleting] =
    useState(false);

  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [isDeletingUsers, setIsDeletingUsers] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleDeleteSelectedUsers = () => {
    setOpenDeleteConfirmation(true);
  };

  const handleCloseModalForDeleting = () => {
    setOpenDeleteConfirmation(false);
  };

  const handleConfirmDelete = async () => {
    setIsDeletingUsers(true);
    try {
      for (const id of selectedUsers) {
        await deleteUser(id).unwrap();
      }
      setSelectedUsers([]);
      refetch();
      handleCloseModalForDeleting();
    } catch (error) {
      setOpenErrorAlertForDeleting(true);
    }
    setIsDeletingUsers(false);
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
    { field: "firstName", headerName: "Ім'я", width: 200 },
    { field: "lastName", headerName: "Прізвище", width: 200 },
    {
      field: "patronymic",
      headerName: "По-батькові",
      width: 200,
    },
    {
      field: "email",
      headerName: "Електронна адреса",
      width: 250,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2">{params.value}</Typography>
          <FileCopyIcon
            onClick={() => navigator.clipboard.writeText(params.value)}
            sx={{ cursor: "pointer", ml: 1, color: "primary" }}
          />
        </Box>
      ),
    },
    {
      field: "role",
      headerName: "Роль в системі",
      width: 150,
      renderCell: (params) => {
        const role = params.value;
        let color;

        if (role === "ADMIN") {
          color = "primary";
        } else if (role === "SELLER") {
          color = "success";
        } else if (role === "BUYER") {
          color = "warning";
        }

        return <Chip label={role} color={color} />;
      },
    },
    {
      field: "phoneNumber",
      headerName: "Номер телефону",
      width: 150,
      renderCell: (params) => {
        const phoneNumberValue = params.value || "";
        const phoneNumber = parsePhoneNumberFromString(phoneNumberValue, "UA");
        const formattedPhoneNumber = phoneNumber
          ? phoneNumber.formatInternational()
          : "";

        return <Typography variant="body2">{formattedPhoneNumber}</Typography>;
      },
    },
    {
      field: "actions",
      headerName: "Дії",
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ m: 1 }}
            onClick={() => navigate(`/admin/users/${params.row.id}`)}
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
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/admin/users/new")}
          sx={{ mb: 2, mr: 1 }}
        >
          Додати користувача
        </Button>
        {selectedUsers.length > 0 && (
          <Button
            variant="contained"
            color="error"
            sx={{ mb: 2 }}
            onClick={handleDeleteSelectedUsers}
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
            setSelectedUsers(newSelection);
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
            Видалити користувача?
          </Typography>
          <Typography variant="body2">
            Ви впевнені, що хочете видалити цього користувача? Ця дія є
            незворотньою.
          </Typography>
          {isDeletingUsers ? (
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

export default Users;
