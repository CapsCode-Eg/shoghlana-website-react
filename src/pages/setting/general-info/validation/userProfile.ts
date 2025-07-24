import * as yup from "yup";

export const userSchemaForProfile = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  job_title: yup.string().required("Job title is required"),
  birth_day: yup
    .date()
    .required("Birth date is required")
    .max(new Date(), "Birth date cannot be in the future"),
  gender: yup
    .mixed<0 | 1>()
    .oneOf([0, 1], "Gender must be '0' (Male) or '1' (Female)")
    .required("Gender is required"),
  nationality_id: yup
    .number()
    .typeError("Nationality ID must be a number")
    .required("Nationality ID is required"),
  country_id: yup
    .number()
    .typeError("Country ID must be a number")
    .required("Country ID is required"),
  city_id: yup
    .number()
    .typeError("City ID must be a number")
    .required("City ID is required"),
  mobile: yup
    .string()
    .required("Mobile is required"),
});