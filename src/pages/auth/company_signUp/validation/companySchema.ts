import * as yup from 'yup';

export const companySignUp = yup.object().shape({
    email:yup.string().test("email", "Email is not valid", (value) => {
        if (!value) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ;
        })
        .required(`Email is required`),
    first_name:yup.string().required(`First name is required`),
    password:yup.string().required(`Password is required`),
    terms_and_conditions:yup.string().required('Terms and conditions is required'),
    hiring_title:yup.string().required('Hiring title is required'),
    mobile:yup.string().required('Mobile is required').min(4,"Mobile is required"),
})