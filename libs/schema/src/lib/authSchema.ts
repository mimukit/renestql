import { Roles } from '@nx-intro/roles';
import * as yup from 'yup';

export const registerInputSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(8)
    .max(50)
    .required(),
  role: yup.string().oneOf(Object.keys(Roles)),
});

export const loginInputSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(8)
    .max(50)
    .required(),
});
