import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import { format } from "date-fns";

import { DataGrid } from "@mui/x-data-grid";
import { ukUA } from "@mui/x-data-grid/locales";
import {
  Box,
  CircularProgress,
  Button,
  Avatar,
  Modal,
  Snackbar,
  Alert,
  Typography,
  Chip,
} from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";

import { useNavigate } from "react-router-dom";
import { useGetAllLotsQuery, useDeleteLotMutation } from "../../../api/lotApi";

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

const Lots = () => {
  const { data: lots, error, isLoading, refetch } = useGetAllLotsQuery();
  const [deleteLot, { isLoading: isDeleting, error: isError }] =
    useDeleteLotMutation();
  const navigate = useNavigate();

  const [photoIndex, setPhotoIndex] = useState(0);
  const [photoUrls, setPhotoUrls] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [openErrorAlertForDeleting, setOpenErrorAlertForDeleting] =
    useState(false);

  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [isDeletingLots, setIsDeletingLots] = useState(false);
  const [selectedLots, setSelectedLots] = useState([]);

  const handleAvatarClick = (value) => {
    setPhotoIndex(0);
    setPhotoUrls(value.map((p) => `http://localhost:5001/${p}`));
    setOpenModal(true);
  };

  const handleCloseModalForPhotos = () => {
    setOpenModal(false);
    setPhotoUrls([]);
  };

  const handleDeleteSelectedLots = () => {
    setOpenDeleteConfirmation(true);
  };

  const handleCloseModalForDeleting = () => {
    setOpenDeleteConfirmation(false);
  };

  const handleConfirmDelete = async () => {
    setIsDeletingLots(true);
    try {
      for (const id of selectedLots) {
        await deleteLot(id).unwrap();
      }
      setSelectedLots([]);
      refetch();
      handleCloseModalForDeleting();
    } catch (error) {
      setOpenErrorAlertForDeleting(true);
    }
    setIsDeletingLots(false);
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
    { field: "title", headerName: "Назва", width: 250 },
    { field: "description", headerName: "Опис", width: 250 },
    {
      field: "startingPrice",
      headerName: "Початкова ціна",
      width: 130,
      renderCell: (params) => (
        <Typography variant="body2">
          {params.value && `${params.value} грн.`}
        </Typography>
      ),
    },
    {
      field: "endDate",
      headerName: "Дата закінчення",
      width: 200,
      renderCell: (params) => (
        <div>
          {params.value && format(new Date(params.value), "dd.MM.yyyy HH:mm")}
        </div>
      ),
    },
    {
      field: "status",
      headerName: "Статус",
      width: 120,
      renderCell: (params) => {
        const status = params.value;
        let color;

        if (status === "OPEN") {
          color = "success";
        } else if (status === "PENDING") {
          color = "warning";
        } else if (status === "CLOSED") {
          color = "error";
        }

        return <Chip label={status} color={color} />;
      },
    },
    {
      field: "buyNowPrice",
      headerName: "Ціна",
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2">
          {params.value && `${params.value} грн.`}
        </Typography>
      ),
    },
    {
      field: "bidIncrement",
      headerName: "Підвищення ставки",
      width: 150,
      renderCell: (params) => (
        <Typography variant="body2">
          {params.value && `${params.value} грн.`}
        </Typography>
      ),
    },
    {
      field: "reservePrice",
      headerName: "Резервна ціна",
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2">
          {params.value && `${params.value} грн.`}
        </Typography>
      ),
    },
    {
      field: "imageUrls",
      headerName: "Фотографії",
      width: 300,
      renderCell: (params) => (
        <div style={{ display: "flex" }}>
          {params.value &&
            params.value.map((photo, index) => (
              <Avatar
                key={index}
                alt={`Фото ${index + 1}`}
                src={`http://localhost:5001/${photo}`}
                variant="square"
                sx={{ m: 1, cursor: "pointer" }}
                onClick={() => handleAvatarClick(params.value)}
              />
            ))}
        </div>
      ),
    },
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
            onClick={() => navigate(`/admin/lots/${params.row.id}`)}
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
          onClick={() => navigate("/admin/lots/new")}
          sx={{ mb: 2, mr: 1 }}
        >
          Додати лот
        </Button>
        {selectedLots.length > 0 && (
          <Button
            variant="contained"
            color="error"
            sx={{ mb: 2 }}
            onClick={handleDeleteSelectedLots}
          >
            <DeleteOutlineTwoToneIcon />
          </Button>
        )}
        <DataGrid
          rows={lots || []}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          onRowSelectionModelChange={(newSelection) => {
            setSelectedLots(newSelection);
          }}
          disableRowSelectionOnClick
          getRowId={(row) => row.id}
          localeText={ukUA.components.MuiDataGrid.defaultProps.localeText}
        />
      </Box>
      <Modal
        open={openModal}
        onClose={handleCloseModalForPhotos}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ width: "80vw", height: "80vh", mx: "auto", my: "auto" }}>
          <ImageGallery
            items={photoUrls.map((url) => ({ original: url }))}
            startIndex={photoIndex}
            showPlayButton={false}
            showThumbnails={false}
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
            Видалити лот?
          </Typography>
          <Typography variant="body2">
            Ви впевнені, що хочете видалити цей лот? Ця дія є незворотньою.
          </Typography>
          {isDeletingLots ? (
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
                Ні
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Lots;
