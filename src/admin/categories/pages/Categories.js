import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { ukUA } from "@mui/x-data-grid/locales";
import {
  Box,
  CircularProgress,
  Button,
  Typography,
  Avatar,
  Modal,
} from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import {
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "../../../api/categoryApi";
import { useNavigate } from "react-router-dom";
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

const Categories = () => {
  const {
    data: categories,
    error,
    isLoading,
    refetch,
  } = useGetAllCategoriesQuery();
  const [deleteCategory, { isLoading: isDeleting, error: isError }] =
    useDeleteCategoryMutation();

  const navigate = useNavigate();

  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [openErrorAlertForDeleting, setOpenErrorAlertForDeleting] =
    useState(false);

  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [isDeletingCategories, setIsDeletingCategories] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [imageUrl, setImageUrl] = useState("");
  const [openImageModal, setOpenImageModal] = useState(false);

  const handleImageClick = (imageUrl) => {
    setImageUrl(imageUrl);
    setOpenImageModal(true);
  };

  const handleCloseImageModal = () => {
    setOpenImageModal(false);
  };

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
    return <LoadingSpinner size={50} />;
  }

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Назва", width: 250 },
    { field: "description", headerName: "Опис", width: 500 },
    {
      field: "image",
      headerName: "Зображення",
      width: 200,
      renderCell: (params) => (
        <div style={{ display: "flex" }}>
          <Avatar
            variant="square"
            sx={{ m: 1, cursor: "pointer" }}
            src={`http://localhost:5001/${params.value}`}
            alt="Зображення категорії"
            onClick={() =>
              handleImageClick(`http://localhost:5001/${params.value}`)
            }
          />
        </div>
      ),
    },
    {
      field: "actions",
      headerName: "Дії",
      width: 220,
      renderCell: (params) => (
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ m: 1 }}
            onClick={() => navigate(`/admin/categories/info/${params.row.id}`)}
          >
            <VisibilityIcon />
          </Button>
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
          sx={{ mb: 2, mr: 1, mt: "10px" }}
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
        {!categories || categories.length === 0 ? (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h5" align="center" fontWeight={600}>
              Список категорій порожній!
            </Typography>
          </Box>
        ) : (
          <DataGrid
            rows={categories || []}
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
        )}
      </Box>
      <Modal
        open={openImageModal}
        onClose={handleCloseImageModal}
        aria-labelledby="image-modal-title"
        aria-describedby="image-modal-description"
      >
        <Box sx={style}>
          <Typography
            variant="h6"
            gutterBottom
            id="image-modal-title"
            textAlign={"center"}
          >
            Зображення категорії
          </Typography>
          <Avatar
            variant="square"
            src={imageUrl}
            alt="Зображення категорії"
            sx={{ width: "100%", height: "auto" }}
          />
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
            Видалити категорію/ї?
          </Typography>
          <Typography variant="body2">
            Ви впевнені, що хочете видалити цю категорію/ї? Ця дія є
            незворотньою.
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

export default Categories;
