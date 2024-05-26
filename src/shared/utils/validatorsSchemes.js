import * as yup from "yup";

export const validationSchemaForBuyer = yup.object().shape({
  firstName: yup
    .string()
    .required("Введіть ім'я")
    .min(2, "Ім'я повинно містити не менше 2 символів")
    .max(32, "Ім'я не може містити більше 32 символів"),
  lastName: yup
    .string()
    .required("Введіть прізвище")
    .min(2, "Прізвище повинно містити не менше 2 символів")
    .max(32, "Прізвище не може містити більше 32 символів"),
  patronymic: yup
    .string()
    .required("Введіть по-батькові")
    .min(2, "По-батькові повинно містити не менше 2 символів")
    .max(32, "По-батькові не може містити більше 32 символів"),
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
  firstName: yup
    .string()
    .required("Введіть ім'я")
    .min(2, "Ім'я повинно містити не менше 2 символів")
    .max(32, "Ім'я не може містити більше 32 символів"),
  lastName: yup
    .string()
    .required("Введіть прізвище")
    .min(2, "Прізвище повинно містити не менше 2 символів")
    .max(32, "Прізвище не може містити більше 32 символів"),
  patronymic: yup
    .string()
    .required("Введіть по-батькові")
    .min(2, "По-батькові повинно містити не менше 2 символів")
    .max(32, "По-батькові не може містити більше 32 символів"),
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
  companyName: yup
    .string()
    .required("Введіть назву компанії.")
    .min(2, "Назва компанії повинна містити не менше 2 символів"),
  companySite: yup.string().url("Неправильний формат URL-адреси.").nullable(),
  position: yup
    .string()
    .required("Введіть свою посаду.")
    .min(2, "Посада повинна містити не менше 2 символів"),
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

////////////////////////////////////////////////////////////////////////////

export const validationSchemaForNewLot = yup.object().shape({
  title: yup.string().required("Назва є обов'язковою"),
  description: yup.string().required("Опис є обов'язковим"),
  startingPrice: yup.number().required("Початкова ціна є обов'язковою"),
  endDate: yup.date().required("Дата закінчення є обов'язковою"),
  status: yup
    .string()
    .oneOf(["OPEN", "CLOSED", "PENDING"])
    .required("Статус є обов'язковим"),
  categoryId: yup.number().required("Категорія є обов'язковою"),
  buyNowPrice: yup.number(),
  bidIncrement: yup.number(),
  reservePrice: yup.number(),
});
