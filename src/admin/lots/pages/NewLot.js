import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  TextField,
  FormControl,
  InputAdornment,
  Box,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "@ckeditor/ckeditor5-build-classic/build/translations/uk";
import { Dropzone, FileMosaic } from "@files-ui/react";
import { useNavigate } from "react-router-dom";
import { useCreateLotMutation } from "../../../api/lotApi";
import { validationSchemaForNewLot } from "../../../shared/utils/validatorsSchemes";
import { useGetAllCategoriesQuery } from "../../../api/categoryApi";
import MessageSnackbar from "../../../shared/components/UIElements/MessageSnackbar";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import Breadcrumbs from "../../../shared/components/UIElements/Breadcrumbs";

const NewLot = () => {
  const [createLot, { isLoading, error }] = useCreateLotMutation();
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useGetAllCategoriesQuery();
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (categoriesError) {
      setOpenErrorAlert(true);
    }
  }, [categoriesError]);

  const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles);
  };

  const removeFile = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  if (isCategoriesLoading) {
    return <LoadingSpinner size={30} />;
  }

  return (
    <>
      <Breadcrumbs
        links={[
          { label: "Лоти", url: "/admin/lots" },
          { label: "Додавання нового лоту", url: `/admin/lots/new` },
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
            title: "",
            description: "",
            startingPrice: 0.0,
            endDate: "",
            status: "OPEN",
            categoryId: "",
            buyNowPrice: 0.0,
            bidIncrement: 0.0,
            reservePrice: 0.0,
          }}
          validationSchema={validationSchemaForNewLot}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const formData = new FormData();
              formData.append("title", values.title);
              formData.append("description", description);
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
              <FormControl
                fullWidth
                margin="normal"
                error={touched.imageFiles && Boolean(errors.imageFiles)}
              >
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
                config={{
                  language: "uk",
                  ckfinder: {
                    // uploadUrl: "http://localhost:3000/public",
                  },
                }}
                data="Тут повинен бути опис до лоту (про товар)..."
                onReady={(editor) => {
                  console.log("CKEditor5: ", editor);
                }}
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
                margin="normal"
                required
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
                InputLabelProps={{
                  shrink: true,
                }}
                error={touched.endDate && Boolean(errors.endDate)}
                helperText={<ErrorMessage name="endDate" />}
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
                required
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
                required
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
                required
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
        severity="error"
        message={successMessage}
      />
    </>
  );
};

export default NewLot;
