import * as yup from 'yup'


export const changeCompanyPassword = yup.object().shape({
    current_password: yup.string().required('Current password is required'),
    password: yup.string().required('New password is required'),
    password_confirmation: yup
      .string()
      .required('Confirm password is required')
      .oneOf([yup.ref('password')], 'Passwords must match'),
})