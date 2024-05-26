import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  TextField,
  FormControl,
  InputLabel,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Dropzone, FileMosaic } from "@files-ui/react";

import { useNavigate } from "react-router-dom";

import { useCreateLotMutation } from "../../api/lotApi";

import { validationSchemaForNewLot } from "../../shared/utils/validatorsSchemes";

const NewLot = () => {
  const [createLot, { isLoading, error }] = useCreateLotMutation();
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles);
  };

  const removeFile = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  return (
    <>
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
            title: "",
            description: "",
            startingPrice: 0.0,
            endDate: "",
            status: "PENDING",
            categoryId: "",
            buyNowPrice: "",
            bidIncrement: "",
            reservePrice: "",
          }}
          validationSchema={validationSchemaForNewLot}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const formData = new FormData();
              formData.append("title", values.title);
              formData.append("description", values.description);
              formData.append("startingPrice", values.startingPrice);
              formData.append("endDate", values.endDate);
              formData.append("status", "PENDING");
              formData.append("categoryId", values.categoryId);
              formData.append("buyNowPrice", values.buyNowPrice);
              formData.append("bidIncrement", values.bidIncrement);
              formData.append("reservePrice", values.reservePrice);

              if (files.length > 0) {
                files.forEach((file) => {
                  formData.append("images", file.file);
                });
              }

              const response = await createLot(formData).unwrap();
              setOpenSuccessAlert(true);
              setSuccessMessage(response.message);
              navigate("/admin/lots");
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
                label="Назва"
                name="title"
                required
                margin="normal"
                fullWidth
                error={touched.title && Boolean(errors.title)}
                helperText={<ErrorMessage name="title" />}
              />
              <Field
                as={TextField}
                label="Опис"
                name="description"
                required
                margin="normal"
                fullWidth
                multiline
                rows={4}
                error={touched.description && Boolean(errors.description)}
                helperText={<ErrorMessage name="description" />}
              />
              <Field
                as={TextField}
                label="Початкова ціна"
                name="startingPrice"
                type="number"
                required
                margin="normal"
                fullWidth
                error={touched.startingPrice && Boolean(errors.startingPrice)}
                helperText={<ErrorMessage name="startingPrice" />}
              />
              <Field
                as={TextField}
                label="Дата закінчення"
                name="endDate"
                type="datetime-local"
                required
                margin="normal"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                error={touched.endDate && Boolean(errors.endDate)}
                helperText={<ErrorMessage name="endDate" />}
              />
              <FormControl
                fullWidth
                margin="normal"
                error={touched.imageFiles && Boolean(errors.imageFiles)}
              >
                <InputLabel shrink>Зображення</InputLabel>
                <Dropzone
                  onChange={updateFiles}
                  value={files}
                  label={"Перетягніть файли сюди або натисніть, щоб вибрати"}
                  accept={"image/*"}
                  maxFileSize={28 * 1024 * 1024}
                  maxFiles={5}
                  footerConfig={{
                    customMessage: "Підтримуються типи: png, jpeg, jpg",
                  }}
                  fakeUpload
                >
                  {files.map((file) => (
                    <FileMosaic
                      key={file.id}
                      {...file}
                      onDelete={removeFile}
                      info
                      preview
                    />
                  ))}
                </Dropzone>
                <ErrorMessage
                  name="imageFiles"
                  component="div"
                  style={{
                    color: "red",
                    fontSize: "0.75rem",
                    marginTop: "0.25rem",
                  }}
                />
              </FormControl>
              <Field
                as={TextField}
                label="Категорія"
                name="categoryId"
                type="number"
                required
                margin="normal"
                fullWidth
                error={touched.categoryId && Boolean(errors.categoryId)}
                helperText={<ErrorMessage name="categoryId" />}
              />
              <Field
                as={TextField}
                label="Ціна купівлі зараз"
                name="buyNowPrice"
                type="number"
                margin="normal"
                fullWidth
                error={touched.buyNowPrice && Boolean(errors.buyNowPrice)}
                helperText={<ErrorMessage name="buyNowPrice" />}
              />
              <Field
                as={TextField}
                label="Крок ставки"
                name="bidIncrement"
                type="number"
                margin="normal"
                fullWidth
                error={touched.bidIncrement && Boolean(errors.bidIncrement)}
                helperText={<ErrorMessage name="bidIncrement" />}
              />
              <Field
                as={TextField}
                label="Резервна ціна"
                name="reservePrice"
                type="number"
                margin="normal"
                fullWidth
                error={touched.reservePrice && Boolean(errors.reservePrice)}
                helperText={<ErrorMessage name="reservePrice" />}
              />
              <LoadingButton
                type="submit"
                variant="contained"
                color="primary"
                loading={isLoading}
                disabled={isSubmitting}
                sx={{ mt: 3 }}
              >
                Створити лот
              </LoadingButton>
            </Form>
          )}
        </Formik>
      </Box>
      <Snackbar
        open={openSuccessAlert}
        autoHideDuration={5000}
        onClose={() => setOpenSuccessAlert(false)}
      >
        <Alert
          onClose={() => setOpenSuccessAlert(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
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
    </>
  );
};

export default NewLot;
