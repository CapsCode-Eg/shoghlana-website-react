import * as yup from 'yup';

export const jobSchema = yup.object().shape({
  years_of_experience: yup
    .number()
    .typeError('Years of experience must be a number')
    .min(0, 'Must be at least 0')
    .required('Years of experience is required'),

  job_title: yup
    .string()
    .trim()
    .min(2, 'Job title is too short')
    .required('Job title is required'),

  company: yup
    .string()
    .trim()
    .min(2, 'Company name is too short')
    .required('Company name is required'),

  job_category_id: yup
    .number()
    .typeError('Job category must be a number')
    .required('Job category is required'),

  start_month: yup
    .number()
    .typeError('Start month must be a number')
    .min(1, 'Start month must be between 1 and 12')
    .max(12, 'Start month must be between 1 and 12')
    .required('Start month is required'),

  start_year: yup
    .number()
    .typeError('Start year must be a number')
    .min(1900, 'Invalid start year')
    .required('Start year is required'),

  end_month: yup
    .number()
    .typeError('End month must be a number')
    .min(1, 'End month must be between 1 and 12')
    .max(12, 'End month must be between 1 and 12')
    .when('still_working', {
      is: (val: string | number) => val === '0' || val === 0,
      then: schema => schema.required('End month is required'),
      otherwise: schema => schema.notRequired()
    }),

  end_year: yup
    .number()
    .typeError('End year must be a number')
    .min(1900, 'Invalid end year')
    .when('still_working', {
      is: (val: string | number) => val === '0' || val === 0,
      then: schema => schema.required('End year is required'),
      otherwise: schema => schema.notRequired()
    }),

  still_working: yup
    .mixed<0 | 1>()
    .oneOf([0, 1])
    .required('Still working status is required'),
});