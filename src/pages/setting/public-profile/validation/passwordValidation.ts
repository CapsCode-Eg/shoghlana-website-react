import * as yup from 'yup';

export const changePasswordSchema = yup.object().shape({
  current_password: yup
    .string()
    .required("Current password is required")
    .min(6, "Current password must be at least 6 characters"),

  password: yup
    .string()
    .required("New password is required")
    .min(6, "New password must be at least 6 characters"),

  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Password confirmation is required"),
});