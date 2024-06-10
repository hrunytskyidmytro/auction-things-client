import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { TextField, FormControl, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "@ckeditor/ckeditor5-build-classic/build/translations/uk";
import { Dropzone, FileMosaic } from "@files-ui/react";
import { useNavigate } from "react-router-dom";
import { useCreateCategoryMutation } from "../../../api/categoryApi";
import { validationSchemaForNewCategory } from "../../../shared/utils/validatorsSchemes";
import MessageSnackbar from "../../../shared/components/UIElements/MessageSnackbar";
import Breadcrumbs from "../../../shared/components/UIElements/Breadcrumbs";

const NewCategory = () => {
  const [createCategory, { isLoading, error }] = useCreateCategoryMutation();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [description, setDescription] = useState("");

  const updateFile = (incomingFile) => {
    setFile(incomingFile[0]);
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <>
      <Breadcrumbs
        links={[
          { label: "Категорії", url: "/admin/categories" },
          { label: "Додавання нової категорії", url: `/admin/categories/new` },
        ]}
      />
      <Box
        sx={{
          my: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Formik
          initialValues={{
            name: "",
            description: "",
          }}
          validationSchema={validationSchemaForNewCategory}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const formData = new FormData();
              formData.append("name", values.name);
              formData.append("description", description);

              if (file) {
                console.log(file);
                formData.append("image", file.file);
              }

              const response = await createCategory(formData).unwrap();
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
              <FormControl
                fullWidth
                margin="normal"
                error={touched.imageFile && Boolean(errors.imageFile)}
              >
                <Dropzone
                  onChange={updateFile}
                  value={file ? [file] : []}
                  label={"Перетягніть файл сюди або натисніть, щоб вибрати"}
                  accept={"image/*"}
                  maxFileSize={28 * 1024 * 1024}
                  maxFiles={1}
                  footerConfig={{
                    customMessage: "Підтримуються типи: png, jpeg, jpg",
                  }}
                  fakeUpload
                >
                  {file && (
                    <FileMosaic {...file} onDelete={removeFile} info preview />
                  )}
                </Dropzone>
                <ErrorMessage
                  name="imageFile"
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
                config={{
                  language: "uk",
                }}
                data="Тут повинен бути опис до категорії..."
                onReady={(editor) => {
                  console.log("CKEditor5: ", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setDescription(data);
                }}
              />
              <LoadingButton
                type="submit"
                variant="contained"
                color="primary"
                loading={isLoading}
                disabled={isSubmitting}
                sx={{ mt: 3 }}
              >
                Додати категорію
              </LoadingButton>
            </Form>
          )}
        </Formik>
      </Box>
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
        open={openSuccessAlert}
        onClose={() => setOpenSuccessAlert(false)}
        severity="success"
        message={successMessage}
      />
    </>
  );
};

export default NewCategory;
