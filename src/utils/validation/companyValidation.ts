import * as yup from 'yup'

export const editCompanyValidation= yup.object({
    // Main Data
    first_name: yup.string().required('First name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    mobile: yup.string().matches(/^\d+$/, 'Mobile must be a valid number').required('Mobile is required'),
  
    // General Data
    hiring_title: yup.string().required('Hiring title is required'),
    country_id: yup.string().required('Country is required'),
    city_id: yup.string().required('City is required'),
    company_size: yup.string().required('Company size is required'),
    founded_year: yup.string().matches(/^\d{4}$/, 'Invalid year').required('Founded year is required'),
    about: yup.string().required('About section is required'),
    industry: yup.array().min(1, 'At least one industry is required').required(),
  });
  