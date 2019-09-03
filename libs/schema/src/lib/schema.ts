import * as yup from 'yup';

export const registerInputSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(8)
    .max(30)
    .required(),
});