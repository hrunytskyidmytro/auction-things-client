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
  startingPrice: yup
    .number()
    .required("Початкова ціна є обов'язковою")
    .min(20, "Початкова ціна повинна починатися від 20 грн. і більше")
    .max(10000, "Початкова ціна може бути максимум - 10000 грн."),
  buyNowPrice: yup
    .number()
    .required("Ціна купівлі зараз є обов'язковою")
    .min(20, "Ціна купівлі зараз повинна починатися від 20 грн. і більше")
    .max(10000, "Ціна купівлі зараз може бути максимум - 10000 грн."),
  bidIncrement: yup
    .number()
    .required("Крок ставки є обов'язковим")
    .min(20, "Крок ставки повинен починатися від 20 грн. і більше")
    .max(1000, "Крок ставки може бути максимум - 1000 грн."),
  reservePrice: yup
    .number()
    .required("Резервна ціна є обов'язковим")
    .min(20, "Резервна ціна повинна починатися від 20 грн. і більше")
    .max(10000, "Резервна ціна може бути максимум - 10000 грн."),
  endDate: yup.date().required("Дата закінчення є обов'язковою"),
  categoryId: yup.number().required("Категорія є обов'язковою"),
});

export const validationSchemaForUpdateLot = yup.object().shape({
  title: yup.string(),
  startingPrice: yup
    .number()
    .min(20, "Початкова ціна повинна починатися від 20 грн. і більше")
    .max(10000, "Початкова ціна може бути максимум - 10000 грн."),
  buyNowPrice: yup
    .number()
    .min(20, "Ціна купівлі зараз повинна починатися від 20 грн. і більше")
    .max(10000, "Ціна купівлі зараз може бути максимум - 10000 грн."),
  bidIncrement: yup
    .number()
    .min(20, "Крок ставки повинен починатися від 20 грн. і більше")
    .max(1000, "Крок ставки може бути максимум - 1000 грн."),
  reservePrice: yup
    .number()
    .min(20, "Резервна ціна повинна починатися від 20 грн. і більше")
    .max(10000, "Резервна ціна може бути максимум - 10000 грн."),
  endDate: yup.date(),
  categoryId: yup.number(),
});

////////////////////////////////////////////////////////////////////////////

export const validationSchemaForUserProfile = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "Ім'я повинно містити не менше 2 символів")
    .max(32, "Ім'я не може містити більше 32 символів"),
  lastName: yup
    .string()
    .min(2, "Прізвище повинно містити не менше 2 символів")
    .max(32, "Прізвище не може містити більше 32 символів"),
  patronymic: yup
    .string()
    .optional()
    .required("Обов'язкове поле")
    .min(2, "По-батькові повинно містити не менше 2 символів")
    .max(32, "По-батькові не може містити більше 32 символів"),
  email: yup.string().email("Невірний email"),
  phoneNumber: yup
    .string()
    .optional()
    .min(5, "Номер телефону повинно містити не менше 5 цифр")
    .max(15, "Номер телефону не може містити більше 15 цифр"),
  companySite: yup
    .string()
    .optional()
    .url("Це повинно бути посилання на сайт."),
});

////////////////////////////////////////////////////////////////////////////

export const validationSchemaForUserInAdmin = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "Ім'я повинно містити не менше 2 символів")
    .max(32, "Ім'я не може містити більше 32 символів"),
  lastName: yup
    .string()
    .min(2, "Прізвище повинно містити не менше 2 символів")
    .max(32, "Прізвище не може містити більше 32 символів"),
  patronymic: yup
    .string()
    .optional()
    .required("Обов'язкове поле")
    .min(2, "По-батькові повинно містити не менше 2 символів")
    .max(32, "По-батькові не може містити більше 32 символів"),
  email: yup.string().email("Невірний email"),
  phoneNumber: yup
    .string()
    .optional()
    .min(5, "Номер телефону повинно містити не менше 5 цифр")
    .max(15, "Номер телефону не може містити більше 15 цифр"),
});

////////////////////////////////////////////////////////////////////////////

export const validationSchemaForNewCategory = yup.object().shape({
  name: yup
    .string()
    .min(2, "Назва категорії повинна містити не менше 2 символів")
    .max(32, "Назва категорії повинна  містити більше 32 символів"),
  description: yup
    .string()
    .min(6, "Опис до категорії повинен містити не менше 6 символів"),
});