import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

import { useCreateLotMutation } from "../../api/lotApi";

import { useAuth } from "../../shared/hooks/useAuth";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Назва є обов'язковою"),
  description: Yup.string().required("Опис є обов'язковим"),
  startingPrice: Yup.number().required("Початкова ціна є обов'язковою"),
  currentPrice: Yup.number().required("Поточна ціна є обов'язковою"),
  endDate: Yup.date().required("Дата закінчення є обов'язковою"),
  // imageUrl: Yup.string()
  //   .url("Некоректна URL-адреса")
  //   .required("URL зображення є обов'язковою"),
  status: Yup.string()
    .oneOf(["OPEN", "CLOSED", "PENDING"])
    .required("Статус є обов'язковим"),
  categoryId: Yup.number().required("Категорія є обов'язковою"),
  buyNowPrice: Yup.number(),
  bidIncrement: Yup.number(),
  reservePrice: Yup.number(),
});

const NewLot = () => {
  const [fieldValue, setFieldValue] = useState();
  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  const [createLot, { error }] = useCreateLotMutation();

  const { token } = useAuth();

  console.log(token);

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
            currentPrice: 0.0,
            endDate: "",
            // imageUrl: "",
            // status: "PENDING",
            categoryId: "",
            buyNowPrice: "",
            bidIncrement: "",
            reservePrice: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await createLot(
                {
                  title: values.title,
                  description: values.description,
                  startingPrice: values.startingPrice,
                  currentPrice: values.currentPrice,
                  endDate: values.endDate,
                  // imageUrl: values.imageUrl,
                  // status: "PENDING",
                  categoryId: values.categoryId,
                  buyNowPrice: values.buyNowPrice,
                  bidIncrement: values.bidIncrement,
                  reservePrice: values.reservePrice,
                },
                token
              ).unwrap();
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
                label="Поточна ціна"
                name="currentPrice"
                type="number"
                required
                margin="normal"
                fullWidth
                error={touched.currentPrice && Boolean(errors.currentPrice)}
                helperText={<ErrorMessage name="currentPrice" />}
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
                <input
                  type="file"
                  name="imageUrl"
                  accept="image/*"
                  multiple
                  onChange={(event) => {
                    setFieldValue("imageFiles", event.currentTarget.files);
                  }}
                  style={{ display: "block", marginTop: "16px" }}
                />
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                sx={{ mt: 3 }}
              >
                Створити лот
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
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
