import * as yup from 'yup'

export const jobDataSchema = yup.object().shape({
    skills: yup.array().of(yup.number()).min(1, 'At least one skill is required').required(),
    max_salary: yup.number().min(1, 'Max salary must be greater than 0').required('Max salary is required'),
    min_salary: yup.number().min(1, 'Min salary must be greater than 0').required('Min salary is required'),
    max_year: yup.number().min(1, 'Max year must be greater than 0').required('Max year is required'),
    min_year: yup.number().min(0, 'Min year must be greater than 0').required('Min year is required'),
    description: yup.string().required('Description is required'),
    requirements: yup.string().required('Requirements is required'),
    title: yup.string().required('Job title is required'),
    country_id: yup.number().required('Country is required'),
    city_id: yup.number().required('City is required'),
    job_category_id: yup.number().required('Job category is required'),
    status: yup.number().required('Status is required'),
    level: yup.string().required('Level is required'),
    work_place: yup.string().required('Work place is required'),
    post_type: yup.string().required('Post type is required'),
  });