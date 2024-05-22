import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

import { useAuth } from "../../shared/hooks/useAuth";

const UserProfile = () => {
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);
  };

  const handleCancel = () => {
    setUserData({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
    });
    setEditMode(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Card sx={{ maxWidth: 600, width: "100%", p: 2 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Avatar
              sx={{ width: 100, height: 100, mb: 2 }}
              alt={`${userData.firstName} ${userData.lastName}`}
            />
            {editMode ? (
              <TextField
                name="firstName"
                label="Ім'я"
                value={userData.firstName}
                onChange={handleChange}
                margin="normal"
                fullWidth
              />
            ) : (
              <Typography variant="h5" component="div">
                {`${userData.firstName} ${userData.lastName}`}
              </Typography>
            )}
            {editMode ? (
              <TextField
                name="lastName"
                label="Прізвище"
                value={userData.lastName}
                onChange={handleChange}
                margin="normal"
                fullWidth
              />
            ) : null}
            {editMode ? (
              <TextField
                name="email"
                label="Email"
                value={userData.email}
                onChange={handleChange}
                margin="normal"
                fullWidth
              />
            ) : (
              <Typography variant="body2" color="text.secondary">
                {userData.email}
              </Typography>
            )}
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          {editMode ? (
            <>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={handleSave}
              >
                Зберегти
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<CancelIcon />}
                onClick={handleCancel}
              >
                Закрити
              </Button>
            </>
          ) : (
            <Tooltip title="Edit Profile">
              <IconButton color="primary" onClick={handleEdit}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};

export default UserProfile;
