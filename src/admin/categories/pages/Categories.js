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
import {
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "../../../api/categoryApi";

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

const Categories = () => {
  const { data: users, error, isLoading, refetch } = useGetAllCategoriesQuery();
  const [deleteCategory, { isLoading: isDeleting, error: isError }] =
    useDeleteCategoryMutation();

  const navigate = useNavigate();

  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [openErrorAlertForDeleting, setOpenErrorAlertForDeleting] =
    useState(false);

  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [isDeletingCategories, setIsDeletingCategories] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleDeleteSelectedCategories = () => {
    setOpenDeleteConfirmation(true);
  };

  const handleCloseModalForDeleting = () => {
    setOpenDeleteConfirmation(false);
  };

  const handleConfirmDelete = async () => {
    setIsDeletingCategories(true);
    try {
      for (const id of selectedCategories) {
        await deleteCategory(id).unwrap();
      }
      setSelectedCategories([]);
      refetch();
      handleCloseModalForDeleting();
    } catch (error) {
      setOpenErrorAlertForDeleting(true);
    }
    setIsDeletingCategories(false);
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
    { field: "name", headerName: "Назва", width: 250 },
    { field: "description", headerName: "Опис", width: 250 },
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
            onClick={() => navigate(`/admin/categories/${params.row.id}`)}
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
          onClick={() => navigate("/admin/categories/new")}
          sx={{ mb: 2, mr: 1 }}
        >
          Додати категорію
        </Button>
        {selectedCategories.length > 0 && (
          <Button
            variant="contained"
            color="error"
            sx={{ mb: 2 }}
            onClick={handleDeleteSelectedCategories}
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
            setSelectedCategories(newSelection);
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
            Видалити категорію?
          </Typography>
          <Typography variant="body2">
            Ви впевнені, що хочете видалити цю категорію? Ця дія є незворотньою.
          </Typography>
          {isDeletingCategories ? (
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

export default Categories;
