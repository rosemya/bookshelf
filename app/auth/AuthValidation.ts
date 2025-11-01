import * as Yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(Yup);

export const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .email('Invalid email address'),
    password: Yup.string()
        .required('Password is required')
        .password()
        .minNumbers(1, 'Password must be at least 1 number')
        .minUppercase(1, 'Password must be at least 1 uppercase')
        .minLowercase(1, 'Password must be at least 1 lowercase')
        .minSymbols(0)
        .min(8, 'Password must be at least 8 characters'),
});

export const SignupSchema = LoginSchema.shape({
    firstName: Yup.string()
        .required('First name is required')
        .min(2, 'First name must be at least 2 characters long')
        .max(25, 'First name must be at most 25 characters long'),
    lastName: Yup.string()
        .required('Last name is required')
        .min(2, 'Last name must be at least 2 characters long')
        .max(25, 'Last name must be at most 25 characters long'),
})