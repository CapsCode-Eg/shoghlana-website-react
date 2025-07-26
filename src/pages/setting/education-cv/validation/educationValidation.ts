import * as yup from 'yup';

export const educationValidation = yup.object().shape({
  education_level: yup
    .number()
    .required()
    .integer()
    .min(0, 'Education level must be at least 1')
    .max(10, 'Education level must be at most 10'),
  field_of_study: yup
    .string()
    .required(),
  university: yup
    .string()
    .required(),
  enroll_year: yup
    .number()
    .required()
    .integer()
    .min(1900, 'Enroll year must be after 1900')
    .max(new Date().getFullYear(), 'Enroll year cannot be in the future'),
  graduation_year: yup
    .number()
    .required()
    .integer()
    .min(1900, 'Graduation year must be after 1900')
    .max(new Date().getFullYear() + 5, 'Graduation year seems too far in future')
    .moreThan(yup.ref('enroll_year'), 'Graduation year must be after enroll year'),
  grade: yup
    .number()
    .required()
    .integer()
    .min(0, 'Grade must be at least 0')
    .max(4, 'Grade must be at most 4')
});