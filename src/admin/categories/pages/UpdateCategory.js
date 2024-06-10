import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { TextField, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "@ckeditor/ckeditor5-build-classic/build/translations/uk";
import { useNavigate } from "react-router-dom";
import {
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "../../../api/categoryApi";
import { validationSchemaForUpdateLot } from "../../../shared/utils/validatorsSchemes";
import MessageSnackbar from "../../../shared/components/UIElements/MessageSnackbar";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import Breadcrumbs from "../../../shared/components/UIElements/Breadcrumbs";

const UpdateCategory = () => {
  const { id } = useParams();

  const {
    data: category,
    isLoading: isFetching,
    error: fetchError,
    refetch: refetchCategory,
  } = useGetCategoryByIdQuery(id);

  const [updateCategory, { isLoading, error }] = useUpdateCategoryMutation();

  const navigate = useNavigate();
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [description, setDescription] = useState(category?.description || "");

  useEffect(() => {
    if (category) {
      refetchCategory();
      setDescription(category.description);
    }
  }, [category, refetchCategory]);

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
          { label: "Категорії", url: "/admin/categories" },
          { label: category.name, url: `/admin/categories/${category.name}` },
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
            name: category.name,
            description: description,
          }}
          validationSchema={validationSchemaForUpdateLot}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const response = await updateCategory({
                id,
                ...values,
                description,
              }).unwrap();
              setOpenSuccessAlert(true);
              setSuccessMessage(response.message);
              navigate("/admin/categories");
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
                name="name"
                required
                margin="normal"
                fullWidth
                error={touched.name && Boolean(errors.name)}
                helperText={<ErrorMessage name="name" />}
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
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isLoading}
                disabled={isSubmitting}
                sx={{ mt: 3, mb: 2 }}
              >
                Оновити категорію
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

export default UpdateCategory;
