import * as Yup from 'yup';
import parsePhoneNumberFromString from 'libphonenumber-js';

export const SingUpAsUser = Yup.object().shape({
  job_title: Yup.string().required('Job title is required'),
  birth_day: Yup.date().max(new Date().getFullYear() + 21).required('Birth date is required'),
  gender: Yup.number().oneOf([0, 1]).required('Gender is required'),
  nationality_id: Yup.number().required('Nationality is required'),
  country_id: Yup.number().required('Country is required'),
  city_id: Yup.number().required('City is required'),
  cv: Yup.mixed().required('CV is required'),
  enroll_year: Yup.number().min(1900).max(new Date().getFullYear() + 10).required('Enroll year is required'),
  mobile:Yup.string().test("mobile", `Mobile is not valid`, (value) => {
  if (!value) return false;
  const phoneNumberObj = parsePhoneNumberFromString(`+${value}`);
  return (phoneNumberObj?.isValid());
  }),
  field_of_study: Yup.string().required('Field of study is required'),
  university: Yup.string().required('University is required'),
  graduation_year: Yup.number().min(1900).max(new Date().getFullYear() + 10).required('Graduation year is required'),
  grade: Yup.number().required('Grade is required'),
  education_level: Yup.number().required('Education level is required'),

  years_of_experience: Yup.number().min(0).required('Years of experience is required'),
  experience_job_title: Yup.string().required('Experience job title is required'),
  company: Yup.string().required('Company is required'),
  job_category_id: Yup.number().required('Job category is required'),

  start_month: Yup.number().min(1).max(12).required('Start month is required'),
  start_year: Yup.number().min(1900).max(3000).required('Start year is required'),
  end_month: Yup.number().min(1).max(12).required('End month is required'),
  end_year: Yup.number().min(1900).max(3000).required('End year is required'),
  still_working: Yup.number().oneOf([0, 1]).required('Still working field is required'),

  career_level: Yup.number().oneOf([0, 1, 2]).required('Career level is required'),
  job_type: Yup.number().oneOf([0, 1, 2]).required('Job type is required'),
  workplace: Yup.number().oneOf([0, 1, 2]).required('Workplace is required'),

  min_salary: Yup.number().min(0).required('Minimum salary is required'),
  hide_salary: Yup.number().oneOf([0, 1]).required(),

  languages: Yup.array().required(),

  skills: Yup.array()
    .of(Yup.number().required('Skill ID must be a number'))
    .min(1, 'At least one skill is required').length(1, 'At least one skill is required'),
});
