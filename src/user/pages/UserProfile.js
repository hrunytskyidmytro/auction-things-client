import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  TextField,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { validationSchemaForUserProfile } from "../../shared/utils/validatorsSchemes";
import TableUserProfile from "../components/TableUserProfile";
import { useAuth } from "../../shared/hooks/useAuth";
import { useUpdateUserMutation } from "../../api/userApi";

const UserProfile = () => {
  const { user, isSeller } = useAuth();
  const [editMode, setEditMode] = useState(false);

  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const navigate = useNavigate();

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
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
        mt: 8,
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          width: "100%",
          p: 2,
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
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
              sx={{ width: 100, height: 100, mb: 2, mt: 2 }}
              alt={`${user?.firstName} ${user?.lastName}`}
            />

            {!editMode && <TableUserProfile user={user} isSeller={isSeller} />}
            {editMode && (
              <Formik
                initialValues={{
                  firstName: user?.firstName,
                  lastName: user?.lastName,
                  patronymic: user?.patronymic || "",
                  email: user?.email,
                  phoneNumber: user?.phoneNumber || "",
                  companySite: user?.companySite || "",
                }}
                validationSchema={validationSchemaForUserProfile}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    await updateUser({ id: user.id, ...values }).unwrap();
                    setEditMode(false);
                  } catch (error) {
                    console.log(error);
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Field
                      as={TextField}
                      name="firstName"
                      label="Ім'я"
                      margin="normal"
                      fullWidth
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      style={{ color: "red" }}
                    />
                    <Field
                      as={TextField}
                      name="lastName"
                      label="Прізвище"
                      margin="normal"
                      fullWidth
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      style={{ color: "red" }}
                    />
                    <Field
                      as={TextField}
                      name="patronymic"
                      label="По-батькові"
                      margin="normal"
                      fullWidth
                    />
                    <ErrorMessage
                      name="patronymic"
                      component="div"
                      style={{ color: "red" }}
                    />
                    <Field
                      as={TextField}
                      name="email"
                      label="Email"
                      margin="normal"
                      fullWidth
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      style={{ color: "red" }}
                    />
                    <Field
                      as={TextField}
                      name="phoneNumber"
                      label="Номер телефону"
                      margin="normal"
                      fullWidth
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      style={{ color: "red" }}
                    />
                    {isSeller && (
                      <>
                        <Field
                          as={TextField}
                          name="companySite"
                          label="Сайт компанії"
                          margin="normal"
                          fullWidth
                        />
                        <ErrorMessage
                          name="companySite"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </>
                    )}
                    <LoadingButton
                      fullWidth
                      loading={isLoading}
                      variant="contained"
                      type="submit"
                      startIcon={<SaveIcon />}
                      disabled={isSubmitting}
                      sx={{ mt: 2 }}
                    >
                      Зберегти
                    </LoadingButton>
                  </Form>
                )}
              </Formik>
            )}
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          {!editMode ? (
            <>
              <Tooltip title="Редагувати профіль">
                <IconButton color="primary" onClick={handleEdit}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Змінити пароль">
                <IconButton
                  color="primary"
                  onClick={() => navigate("/request-password-reset")}
                >
                  <LockOpenIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              <LoadingButton
                fullWidth
                variant="outlined"
                color="secondary"
                startIcon={<CancelIcon />}
                onClick={handleCancel}
                loading={isLoading}
              >
                Скасувати
              </LoadingButton>
            </>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};

export default UserProfile;
