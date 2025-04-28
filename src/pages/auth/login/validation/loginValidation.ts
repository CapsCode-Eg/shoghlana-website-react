import * as yup from 'yup';
export const loginValidation = yup.object().shape({
    email:yup.string().test("email", "Email is not valid", (value) => {
        if (!value) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ;
        })
        .required(`Email is required`),
    password:yup.string().required(`Password is required`),
})