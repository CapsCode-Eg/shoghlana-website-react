import * as Yup from 'yup';

export const SingUpAsUser = Yup.object().shape({
  job_title: Yup.string().required('Job title is required'),
  birth_day: Yup.date()
    .max(new Date(new Date().setFullYear(new Date().getFullYear() - 21)))
    .required('Birth date is required'),  gender: Yup.number().oneOf([0, 1]).required('Gender is required'),
  nationality_id: Yup.number().required('Nationality is required'),
  country_id: Yup.number().required('Country is required'),
  city_id: Yup.number().required('City is required'),
  cv: Yup.mixed().required('CV is required'),
  enroll_year: Yup.number().typeError('Enroll year is required').min(1900).max(new Date().getFullYear() + 10).required('Enroll year is required'),
  mobile:Yup.string().required('Mobile is required').min(4,"Mobile is required"),
  field_of_study: Yup.string().required('Field of study is required'),
  university: Yup.string().required('University is required'),
  graduation_year: Yup.number().typeError('Graduation year is required').min(1900).max(new Date().getFullYear() + 10).required('Graduation year is required'),
  grade: Yup.number().typeError('Grade is required').required('Grade is required'),
  education_level: Yup.number().typeError('Education level is required').required('Education level is required'),

  years_of_experience: Yup.number().typeError('Years of experience is required').min(0).required('Years of experience is required'),
  experience_job_title: Yup.string().required('Experience job title is required'),
  company: Yup.string().required('Company is required'),
  job_category_id: Yup.string().required('Job category is required'),
  interested_job_category: Yup.string().required('Job category is required'),

  start_month: Yup.number().typeError('Start month is required ').min(1).max(12).required('Start month is required'),
  start_year: Yup.number().typeError('Start year is required ').min(1900).max(3000).required('Start year is required'),
  
still_working: Yup.number()
  .oneOf([0, 1])
  .required('Still working field is required'),
  
end_month: Yup.mixed()
  .when('still_working', {
    is: 0,
    then: (schema) => schema
        // @ts-expect-error: Type mismatch
      .test('is-number', 'End month must be a number', value => !isNaN(value))
      .required('End month is required')
      .test('min-month', 'End month must be after or equal to start month', 
        function(value) {
          return value >= this.parent.start_month
        })
      .test('max-month', 'End month must be less than or equal to 12', 
                // @ts-expect-error: Type mismatch
        value => value <= 12),
    otherwise: (schema) => schema.notRequired()
  }),

  end_year: Yup.mixed()
  .when('still_working', {
    is: 0,
    then: (schema) => schema
        // @ts-expect-error: Type mismatch
      .test('is-number', 'End year must be a number', value => !isNaN(value))
      .required('End year is required')
      .test('min-year', 'End year must be after start year', 
        function(value) {
          // First check if both years are equal
          if (value === this.parent.start_year) {
            // If years are equal, then the end month must be >= start month
            // (This check would be in the month validation)
            return true;
          }
          return value > this.parent.start_year;
        })
      .test('max-year', 'End year must be less than or equal to 3000', 
        // @ts-expect-error: Type mismatch
        value => value <= 3000),
    otherwise: (schema) => schema.notRequired()
  }),

  career_level: Yup.number().oneOf([0, 1, 2]).required('Career level is required'),
  job_type: Yup.number().oneOf([0, 1, 2]).required('Job type is required'),
  workplace: Yup.number().oneOf([0, 1, 2]).required('Workplace is required'),

  min_salary: Yup.number().min(0).required('Minimum salary is required'),
  hide_salary: Yup.number().oneOf([0, 1]).required(),

  languages: Yup.array().required(),

  skills: Yup.array().required(),
});
