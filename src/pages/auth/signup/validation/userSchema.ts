import * as yup from 'yup';

export const userSchema = yup.object().shape({
    email:yup.string().test("email", "Email is not valid", (value) => {
        if (!value) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ;
        })
        .required(`Email is required`),
    first_name:yup.string().required(`First name is required`),
    last_name:yup.string().required(`Last name is required`),
    password:yup.string().required(`Password is required`),
    terms_and_conditions:yup.string().required('Terms and conditions is required'),
})