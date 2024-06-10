import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  TextField,
  Box,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  InputAdornment,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "@ckeditor/ckeditor5-build-classic/build/translations/uk";
import { useNavigate } from "react-router-dom";
import { useGetLotByIdQuery, useUpdateLotMutation } from "../../../api/lotApi";
import { useGetAllCategoriesQuery } from "../../../api/categoryApi";
import { validationSchemaForUpdateLot } from "../../../shared/utils/validatorsSchemes";
import MessageSnackbar from "../../../shared/components/UIElements/MessageSnackbar";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import Breadcrumbs from "../../../shared/components/UIElements/Breadcrumbs";

const UpdateLot = () => {
  const { id } = useParams();

  const {
    data: lot,
    isLoading: isFetching,
    error: fetchError,
    refetch: refetchLot,
  } = useGetLotByIdQuery(id);

  const [updateLot, { isLoading, error }] = useUpdateLotMutation();

  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    error: categoriesError,
    refetch: refetchCategories,
  } = useGetAllCategoriesQuery();

  const navigate = useNavigate();
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [description, setDescription] = useState(lot?.description || "");

  useEffect(() => {
    if (lot) {
      refetchLot();
      refetchCategories();
      setDescription(lot.description);
    }
  }, [lot, refetchLot, refetchCategories]);

  useEffect(() => {
    if (fetchError || categoriesError) {
      setOpenErrorAlert(true);
    }
  }, [fetchError, categoriesError]);

  if (isFetching || isCategoriesLoading) {
    return <LoadingSpinner size={30} />;
  }

  return (
    <>
      <Breadcrumbs
        links={[
          { label: "Лоти", url: "/admin/lots" },
          { label: lot.title, url: `/admin/lots/${lot.id}` },
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
            title: lot.title,
            description: lot.description,
            startingPrice: lot.startingPrice,
            endDate: lot.endDate,
            categoryId: lot.categoryId,
            buyNowPrice: lot.buyNowPrice,
            bidIncrement: lot.bidIncrement,
            reservePrice: lot.reservePrice,
          }}
          validationSchema={validationSchemaForUpdateLot}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const response = await updateLot({
                id,
                ...values,
                description,
              }).unwrap();
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
              <CKEditor
                editor={ClassicEditor}
                config={{ language: "uk" }}
                data={description}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setDescription(data);
                }}
              />
              <Field
                as={TextField}
                label="Початкова ціна"
                name="startingPrice"
                type="number"
                required
                margin="normal"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₴</InputAdornment>
                  ),
                }}
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
                InputLabelProps={{ shrink: true }}
                error={touched.endDate && Boolean(errors.endDate)}
                helperText={<ErrorMessage name="endDate" />}
                value={
                  lot.endDate
                    ? new Date(lot.endDate).toISOString().slice(0, 16)
                    : ""
                }
              />
              <FormControl
                fullWidth
                margin="normal"
                error={touched.categoryId && Boolean(errors.categoryId)}
              >
                <InputLabel>Категорія</InputLabel>
                <Field as={Select} name="categoryId" required>
                  {categoriesData &&
                    categoriesData.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                </Field>
              </FormControl>
              <Field
                as={TextField}
                label="Ціна купівлі зараз"
                name="buyNowPrice"
                type="number"
                margin="normal"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₴</InputAdornment>
                  ),
                }}
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₴</InputAdornment>
                  ),
                }}
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₴</InputAdornment>
                  ),
                }}
                error={touched.reservePrice && Boolean(errors.reservePrice)}
                helperText={<ErrorMessage name="reservePrice" />}
              />
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isLoading}
                disabled={isSubmitting}
                sx={{ mt: 3, mb: 2 }}
              >
                Оновити лот
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
          "Не вдалося оновити лот. Будь ласка, спробуйте ще раз."
        }
      />
    </>
  );
};

export default UpdateLot;
