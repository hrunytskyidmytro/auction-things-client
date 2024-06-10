import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { TextField, Box, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import "@ckeditor/ckeditor5-build-classic/build/translations/uk";
import { useNavigate } from "react-router-dom";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../../api/userApi";
import { validationSchemaForUserInAdmin } from "../../../shared/utils/validatorsSchemes";
import MessageSnackbar from "../../../shared/components/UIElements/MessageSnackbar";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import Breadcrumbs from "../../../shared/components/UIElements/Breadcrumbs";

const UpdateUser = () => {
  const { id } = useParams();

  const {
    data: user,
    isLoading: isFetching,
    error: fetchError,
    refetch: refetchUser,
  } = useGetUserByIdQuery(id);

  const [updateUser, { isLoading, error }] = useUpdateUserMutation();

  const navigate = useNavigate();
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (user) {
      refetchUser();
    }
  }, [user, refetchUser]);

  useEffect(() => {
    if (fetchError) {
      setOpenErrorAlert(true);
    }
  }, [fetchError]);

  if (isFetching) {
    return <LoadingSpinner size={30} />;
  }

  return (
    <>
      <Breadcrumbs
        links={[
          { label: "Користувачі", url: "/admin/users" },
          {
            label: `${user.firstName} ${user.lastName}`,
            url: `/admin/users/${user.firstName} ${user.lastName}`,
          },
        ]}
      />
      <Box
        sx={{
          my: 5,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Formik
          initialValues={{
            firstName: user.firstName,
            lastName: user.lastName,
            patronymic: user.patronymic,
            email: user.email,
            phoneNumber: user.phoneNumber,
          }}
          validationSchema={validationSchemaForUserInAdmin}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const response = await updateUser({
                id,
                ...values,
              }).unwrap();
              setOpenSuccessAlert(true);
              setSuccessMessage(response.message);
              navigate("/admin/users");
            } catch (err) {
              setOpenErrorAlert(true);
            }
            setSubmitting(false);
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Field
                as={TextField}
                label="Ім'я користувача"
                name="firstName"
                required
                margin="normal"
                fullWidth
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={<ErrorMessage name="firstName" />}
              />
              <Field
                as={TextField}
                label="Прізвище користувача"
                name="lastName"
                required
                margin="normal"
                fullWidth
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={<ErrorMessage name="lastName" />}
              />
              <Field
                as={TextField}
                label="По-батькові"
                name="patronymic"
                required
                margin="normal"
                fullWidth
                error={touched.patronymic && Boolean(errors.patronymic)}
                helperText={<ErrorMessage name="patronymic" />}
              />
              <Field
                as={TextField}
                label="Електронна адреса"
                name="email"
                required
                margin="normal"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">@</InputAdornment>
                  ),
                }}
                error={touched.email && Boolean(errors.email)}
                helperText={<ErrorMessage name="email" />}
              />
              <Field
                as={TextField}
                label="Номер телефону"
                name="phoneNumber"
                required
                margin="normal"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+</InputAdornment>
                  ),
                }}
                error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                helperText={<ErrorMessage name="phoneNumber" />}
              />
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isLoading}
                disabled={isSubmitting}
                sx={{ mt: 3, mb: 2 }}
              >
                Оновити інформацію про користувача
              </LoadingButton>
            </Form>
          )}
        </Formik>
      </Box>
      <MessageSnackbar
        open={openSuccessAlert}
        onClose={() => setOpenSuccessAlert(false)}
        severity="error"
        message={successMessage}
      />
      <MessageSnackbar
        open={openErrorAlert}
        onClose={() => setOpenErrorAlert(false)}
        severity="error"
        message={
          error?.data?.message ||
          "Не вдалося оновити користувача. Будь ласка, спробуйте ще раз."
        }
      />
    </>
  );
};

export default UpdateUser;
