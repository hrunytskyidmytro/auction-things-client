import * as yup from "yup";

export const validationSchemaForBuyer = yup.object().shape({
  firstName: yup.string().required("Введіть ім'я"),
  lastName: yup.string().required("Введіть прізвище"),
  patronymic: yup.string().required("Введіть по-батькові"),
  email: yup.string().required("Введіть email").email("Неправильний email"),
  password: yup
    .string()
    .required("Введіть пароль")
    .min(8, "Пароль повинен бути не менше 8 символів")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,}$/,
      "Пароль повинен містити принаймні одну велику літеру, одну маленьку літеру, одну цифру і один спеціальний символ"
    ),
  confirmPassword: yup
    .string()
    .required("Повторіть пароль")
    .oneOf([yup.ref("password"), null], "Паролі не співпадають"),
});

export const validationSchemaForSeller = yup.object().shape({
  firstName: yup.string().required("Введіть ім'я"),
  lastName: yup.string().required("Введіть прізвище"),
  patronymic: yup.string().required("Введіть по-батькові"),
  email: yup.string().required("Введіть email").email("Неправильний email"),
  password: yup
    .string()
    .required("Введіть пароль")
    .min(8, "Пароль повинен бути не менше 8 символів")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,}$/,
      "Пароль повинен містити принаймні одну велику літеру, одну маленьку літеру, одну цифру і один спеціальний символ"
    ),
  confirmPassword: yup
    .string()
    .required("Повторіть пароль")
    .oneOf([yup.ref("password"), null], "Паролі не співпадають"),
});

export const validationSchemaLogin = yup.object().shape({
  email: yup.string().required("Введіть email").email("Неправильний email"),
  password: yup.string().required("Введіть пароль"),
});

export const validationSchemaRequestPasswordReset = yup.object().shape({
  email: yup.string().required("Введіть email").email("Неправильний email"),
});

export const validationSchemaResetPassword = yup.object().shape({
  newPassword: yup
    .string()
    .required("Введіть новий пароль")
    .min(8, "Пароль повинен містити щонайменше 8 символів")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,}$/,
      "Пароль повинен містити принаймні одну велику літеру, одну маленьку літеру, одну цифру і один спеціальний символ"
    ),
  confirmPassword: yup
    .string()
    .required("Підтвердіть новий пароль")
    .oneOf([yup.ref("newPassword"), null], "Паролі повинні співпадати"),
});
